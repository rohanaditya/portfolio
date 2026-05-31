import Header from './Header';
import SkillStrip from './SkillStrip';
import DetailPanel from './DetailPanel';
import LanedRow from './rows/LanedRow';
import EducationRow from './rows/EducationRow';
import ProjectsRow from './rows/ProjectsRow';

const ROW_COMPONENTS = {
  experience: LanedRow,
  volunteership: LanedRow,
  education: EducationRow,
  projects: ProjectsRow,
};

const DesktopView = ({
  basics,
  skills,
  timelineRows,
  timeline,
  scroll,
  detail,
  isDarkMode,
  toggleDarkMode,
  viewportWidth,
}) => {
  const {
    timelineItemsByRow,
    timelineItemsByRowAndYear,
    yearColumnX,
    yearColumnWidths,
    totalContentWidth,
    timelineYears,
  } = timeline;
  const { activeYear, isScrolling, scrollContainerRef } = scroll;
  const { selectedTile, isDetailOpen, openDetailView, closeDetailView } = detail;
  const dm = isDarkMode;

  const sharedRowProps = {
    yearColumnX,
    yearColumnWidths,
    totalContentWidth,
    isDarkMode: dm,
    activeYear,
    onOpen: openDetailView,
  };

  return (
    <div
      className={`h-screen w-screen overflow-hidden flex ${
        dm ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-1/5 flex flex-col overflow-hidden ${
          dm ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'
        }`}
      >
        <div className="h-1/4 p-6 flex items-center justify-center">
          <img
            src={`${import.meta.env.BASE_URL}assets/rohan.jpeg`}
            alt="Profile"
            className="photo-placeholder"
          />
        </div>
        <nav className="h-3/4 flex flex-col">
          <div
            className={`h-1/5 px-6 flex items-center border-b ${
              dm ? 'border-slate-700' : 'border-slate-100'
            }`}
          >
            <span className="text-sm font-semibold">Skills</span>
          </div>
          <div
            className={`h-4/5 flex flex-col divide-y ${
              dm ? 'divide-slate-700' : 'divide-slate-100'
            }`}
          >
            {timelineRows.map((row) => (
              <div key={row.key} className="h-1/4 px-6 flex items-center">
                <span className="text-sm font-semibold">{row.label}</span>
              </div>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className={`relative w-4/5 flex flex-col ${dm ? 'bg-slate-900' : 'bg-white'}`}>
        {/* Dark mode toggle */}
        <button
          type="button"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="absolute top-4 right-6 z-10 flex items-center gap-2"
        >
          <span className="text-xs font-semibold text-slate-400">
            {dm ? 'Light' : 'Dark'}
          </span>
          <div
            className={`h-6 w-11 rounded-full border transition-colors duration-300 flex items-center px-0.5 ${
              dm ? 'bg-slate-600 border-slate-500' : 'bg-slate-200 border-slate-300'
            }`}
          >
            <div
              className={`h-5 w-5 rounded-full shadow transition-transform duration-300 ${
                dm ? 'bg-slate-200 translate-x-5' : 'bg-white translate-x-0'
              }`}
            />
          </div>
        </button>

        <Header basics={basics} isDarkMode={dm} />

        <SkillStrip
          skills={skills}
          activeYear={activeYear}
          isScrolling={isScrolling}
          isDarkMode={dm}
        />

        {/* Horizontal scroll timeline */}
        <div className="h-[60%] horizontal-scroll-container" ref={scrollContainerRef}>
          <div
            className={`h-full flex flex-col divide-y ${
              dm ? 'divide-slate-700' : 'divide-slate-100'
            }`}
            style={{ width: `${totalContentWidth + 48}px` }}
          >
            {timelineRows.map((row) => {
              const RowComponent = ROW_COMPONENTS[row.key] ?? ProjectsRow;
              const items = timelineItemsByRow[row.key] ?? [];
              return (
                <RowComponent
                  key={row.key}
                  row={row}
                  items={items}
                  timelineYears={timelineYears}
                  timelineItemsByRowAndYear={timelineItemsByRowAndYear}
                  {...sharedRowProps}
                />
              );
            })}
          </div>
        </div>
      </main>

      <DetailPanel
        selectedTile={selectedTile}
        isDetailOpen={isDetailOpen}
        isDarkMode={dm}
        viewportWidth={viewportWidth}
        onClose={closeDetailView}
      />
    </div>
  );
};

export default DesktopView;
