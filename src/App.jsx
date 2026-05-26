import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import resumeData from './data/resume.json';

const basics = {
  name: 'Rohan Aditya Ram',
  email: 'rr5055@nyu.edu',
  phone: '+1 (929) 774 4207',
  location: 'New York, USA',
  linkedin: 'https://www.linkedin.com/in/rohan-aditya/',
  github: 'https://github.com/rohanaditya/',
  credly: 'https://www.credly.com',
  summary: 'Computer Science graduate student with strong expertise in full stack software development, microservices architecture and cross-functional team collaboration. Passionate about building robust enterprise applications on multi-cloud infrastructure and advanced AI technologies.',
  currentYear: 2026
};

const timelineRows = [
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education & Learning' },
  { key: 'projects', label: 'Projects' },
  { key: 'volunteership', label: 'Volunteership & Extracurricular' }
];

const displayRows = [
  { key: 'skills', label: 'Skills' },
  ...timelineRows
];

const skills = [
  'Agentic AI',
  'RAG Architectures',
  'LLM Implementation',
  'Python',
  'Java',
  'C#',
  'Node.js',
  'React.js',
  'Angular',
  'Spring Boot',
  'AWS',
  'Azure',
  'Google Cloud Platform',
  'Kubernetes',
  'Docker',
  'SQL',
  'MongoDB',
  'Apache Spark'
];

const logoAssets = {
  chainguard: '/assets/chainguard.png',
};

const getAllTimelineItems = (timelineData) => (
  timelineRows.flatMap((row) => (
    timelineData.flatMap((yearGroup) => (
      (yearGroup[row.key] ?? []).map((item) => ({
        ...item,
        rowKey: row.key,
        startYear: Number(item.startDate),
        endYear: Number(item.endDate)
      }))
    ))
  ))
);

const getTimelineYears = (timelineData) => {
  const years = getAllTimelineItems(timelineData).flatMap((item) => [item.startYear, item.endYear]);
  const highestYear = Math.max(...years);
  const lowestYear = Math.min(...years);

  return Array.from({ length: highestYear - lowestYear + 1 }, (_, index) => highestYear - index);
};

const TILE_WIDTH = 320;
const TILE_GAP = 16;

function App() {
  const [data] = useState(resumeData);
  const timelineYears = useMemo(() => getTimelineYears(data), [data]);
  const [activeYear, setActiveYear] = useState(String(getTimelineYears(resumeData)[0]));
  const [selectedTile, setSelectedTile] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  const frameRef = useRef(null);

  const timelineItemsByRow = useMemo(() => (
    timelineRows.reduce((rows, row) => {
      rows[row.key] = data
        .flatMap((yearGroup) => (
          (yearGroup[row.key] ?? []).map((item) => ({
            ...item,
            startYear: Number(item.startDate),
            endYear: Number(item.endDate)
          }))
        ))
        .sort((firstItem, secondItem) => (
          secondItem.endYear - firstItem.endYear || secondItem.startYear - firstItem.startYear
        ));

      return rows;
    }, {})
  ), [data]);

  const timelineItemsByRowAndYear = useMemo(() => (
    timelineRows.reduce((rows, row) => {
      rows[row.key] = timelineYears.reduce((years, year) => {
        years[year] = (timelineItemsByRow[row.key] ?? []).filter((item) => (
          year >= item.startYear && year <= item.endYear
        ));

        return years;
      }, {});

      return rows;
    }, {})
  ), [timelineItemsByRow, timelineYears]);

  const yearColumnWidths = useMemo(() => (
    timelineYears.reduce((widths, year) => {
      const maxItemsInYear = Math.max(
        1,
        ...timelineRows.map((row) => timelineItemsByRowAndYear[row.key]?.[year]?.length ?? 0)
      );

      widths[year] = (maxItemsInYear * TILE_WIDTH) + ((maxItemsInYear - 1) * TILE_GAP);

      return widths;
    }, {})
  ), [timelineItemsByRowAndYear, timelineYears]);

  const closeDetailView = () => {
    setIsDetailOpen(false);
    window.setTimeout(() => setSelectedTile(null), 300);
  };

  const openDetailView = (item, row) => {
    setSelectedTile({ item, row });
    window.requestAnimationFrame(() => setIsDetailOpen(true));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return undefined;

    const updateActiveYear = () => {
      frameRef.current = null;

      const yearMarkers = container.querySelectorAll('[data-year-marker]');
      const containerRect = container.getBoundingClientRect();
      const focalPoint = containerRect.left + containerRect.width / 2;
      const highestYear = String(timelineYears[0]);

      let closestMarker = null;
      let closestDistance = Infinity;

      yearMarkers.forEach((marker) => {
        const rect = marker.getBoundingClientRect();

        if (rect.right < containerRect.left || rect.left > containerRect.right) {
          return;
        }

        const markerCenter = rect.left + rect.width / 2;
        const distance = Math.abs(markerCenter - focalPoint);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestMarker = marker;
        }
      });

      const year = container.scrollLeft <= 1 ? highestYear : closestMarker?.dataset.yearMarker;
      if (year) {
        setActiveYear((currentYear) => (currentYear === year ? currentYear : year));
      }
    };

    const scheduleActiveYearUpdate = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(updateActiveYear);
    };

    updateActiveYear();
    container.addEventListener('scroll', scheduleActiveYearUpdate, { passive: true });
    window.addEventListener('resize', scheduleActiveYearUpdate);

    return () => {
      container.removeEventListener('scroll', scheduleActiveYearUpdate);
      window.removeEventListener('resize', scheduleActiveYearUpdate);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [timelineItemsByRow, timelineYears]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && selectedTile) {
        closeDetailView();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTile]);

  if (!data) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  }

  const renderTimelineTile = (item, row, options = {}) => {
    const organization = item.company || item.institution;
    const meta = [organization, item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : null]
      .filter(Boolean)
      .join(' | ');
    const isActive = options.forceActive || (Number(activeYear) >= item.startYear && Number(activeYear) <= item.endYear);
    const interactiveClasses = options.isPreview
      ? ''
      : 'cursor-pointer hover:-translate-y-1';
    const logoSrc = logoAssets[item.logoId];
    const sizeClasses = options.isPreview ? 'h-48 w-80' : 'h-full w-full';

    return (
      <article
        key={item.id}
        role={options.isPreview ? undefined : 'button'}
        tabIndex={options.isPreview ? undefined : 0}
        onClick={options.isPreview ? undefined : () => openDetailView(item, row)}
        onKeyDown={
          options.isPreview
            ? undefined
            : (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openDetailView(item, row);
              }
            }
        }
        className={`relative ${sizeClasses} bg-[#F5F5F7] p-4 rounded shadow-sm text-slate-800 transition-all duration-300 ${interactiveClasses} ${
          isActive ? 'opacity-100' : 'opacity-30'
        }`}
        data-timeline-card={options.isPreview ? undefined : true}
        data-start-year={options.isPreview ? undefined : item.startDate}
        data-end-year={options.isPreview ? undefined : item.endDate}
      >
        <div className="absolute right-4 top-4 h-10 w-10 rounded bg-[#F5F5F7] shadow-sm flex items-center justify-center overflow-hidden">
          {logoSrc && (
            <img
              src={logoSrc}
              alt={`${item.logoId} logo`}
              className="max-h-8 max-w-8 object-contain"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          )}
        </div>

        <div className="h-full flex items-center pr-14 pb-6">
          <h3 className="font-bold text-sm leading-tight">{item.title}</h3>
        </div>

        {organization && (
          <p className="absolute bottom-4 left-4 right-4 truncate text-xs font-semibold text-slate-800">
            {organization}
          </p>
        )}
      </article>
    );
  };

  const renderSkillTile = (skill) => (
    <div
      key={skill}
      className="h-8 flex-shrink-0 bg-[#F5F5F7] rounded shadow-sm px-3 flex items-center text-xs font-semibold text-slate-800"
    >
      {skill}
    </div>
  );

  const renderDetailPanel = () => {
    if (!selectedTile) return null;

    const { item, row } = selectedTile;
    const meta = [item.company || item.institution, item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : null]
      .filter(Boolean)
      .join(' | ');

    return (
      <div
        className={`fixed inset-0 z-50 bg-white transition-all duration-300 ${
          isDetailOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={closeDetailView}
          aria-label="Close detail view"
          className="absolute right-6 top-6 z-10 h-9 w-9 rounded bg-white text-slate-800 text-sm font-bold shadow-sm transition-opacity hover:opacity-70"
        >
          X
        </button>

        <div
          className={`h-full w-full flex transition-transform duration-300 ${
            isDetailOpen ? 'translate-x-0' : 'translate-x-6'
          }`}
        >
          <section className="w-1/2 h-full px-12 py-16 overflow-y-auto flex flex-col justify-center">
            <p className="text-xs uppercase tracking-wide font-bold text-slate-800 mb-3">{row.label} | {item.startDate} - {item.endDate}</p>
            <h2 className="text-4xl font-black text-slate-800 mb-4">{item.title}</h2>
            {meta && <p className="text-sm font-semibold text-slate-800 mb-8">{meta}</p>}

            <div className="space-y-5 text-sm leading-relaxed text-slate-800">
              {item.description && <p>{item.description}</p>}
              {item.details && <p>{item.details}</p>}

              {item.highlights && (
                <div>
                  <h3 className="text-xs uppercase tracking-wide font-bold text-slate-800 mb-3">Responsibilities</h3>
                  <ul className="space-y-2">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="pl-4">{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {item.technologies && (
                <div>
                  <h3 className="text-xs uppercase tracking-wide font-bold text-slate-800 mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span key={tech} className="text-xs bg-white text-slate-800 px-3 py-1 rounded shadow-sm">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {item.certId && (
                <p className="text-xs text-slate-800">
                  Certification ID: {item.certId}
                </p>
              )}
            </div>
          </section>

          <aside className="w-1/2 h-full flex items-center justify-center bg-white px-12">
            {renderTimelineTile(item, row, { isPreview: true, forceActive: true })}
          </aside>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-white text-slate-800">
      {/* SIDEBAR: 1/5 width (20%) */}
      
      <aside className="w-1/5 bg-white text-slate-800 flex flex-col overflow-hidden">
        <div className="h-1/4 p-6 flex items-end justify-center">
            <img 
                src="../assets/rohan.png" 
                alt="Profile"
                className="photo-placeholder"
            />
        </div>
        <nav className="h-3/4 flex flex-col">
          <div className="h-1/5 px-6 flex items-center">
            <span className="text-sm font-semibold text-slate-800">Skills</span>
          </div>
          <div className="h-4/5 flex flex-col">
            {timelineRows.map((row) => (
              <div key={row.key} className="h-1/4 px-6 flex items-center">
                <span className="text-sm font-semibold text-slate-800">{row.label}</span>
              </div>
            ))}
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT WRAPPER: 4/5 width (80%) */}
      <main className="w-4/5 bg-white flex flex-col">

        <Header basics={basics} activeYear={activeYear} />

        <div className="h-[15%] px-6 py-4 overflow-hidden">
          <div className="h-full flex flex-wrap content-center gap-2 overflow-hidden">
            {skills.map(renderSkillTile)}
          </div>
        </div>

        {/* MAIN SCROLL AREA: 60vh height - HORIZONTAL SCROLL */}
        <div className="h-[60%] horizontal-scroll-container" ref={scrollContainerRef}>
          <div className="h-full w-max flex flex-col">
            {timelineRows.map((row) => (
              <div key={row.key} className="h-1/4 px-6 py-4">
                <div className="h-full flex gap-4">
                  {timelineYears.map((year) => (
                    <div
                      key={`${row.key}-${year}`}
                      data-year-marker={row.key === timelineRows[0].key ? year : undefined}
                      className="h-full flex flex-row gap-4 flex-shrink-0"
                      style={{ width: `${yearColumnWidths[year]}px` }}
                    >
                      {(timelineItemsByRowAndYear[row.key]?.[year] ?? []).map((item) => (
                        renderTimelineTile(item, row)
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      {renderDetailPanel()}
    </div>
  );
}

export default App;
