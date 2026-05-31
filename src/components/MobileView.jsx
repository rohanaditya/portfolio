import { logoTints, darkLogoTints } from '../constants/theme';
import DetailPanel from './DetailPanel';

const MobileTile = ({ item, row, isDarkMode, onOpen }) => {
  const tileBg = isDarkMode
    ? darkLogoTints[item.logoId] || '#2d3748'
    : logoTints[item.logoId] || '#F5F5F7';
  const logoSrc = item.logoId
    ? `${import.meta.env.BASE_URL}assets/${item.logoId}.png`
    : null;
  const projectImageSrc =
    row.key === 'projects' && item.imageId
      ? `${import.meta.env.BASE_URL}assets/${item.imageId}.png`
      : null;
  const yearLabel =
    item.startYear === item.endYear
      ? String(item.startYear)
      : `${item.startYear}–${item.endYear}`;

  return (
    <article
      key={item.id}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item, row)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(item, row);
        }
      }}
      className="relative flex-shrink-0 rounded shadow-sm overflow-hidden cursor-pointer active:opacity-70 h-full"
      style={{ backgroundColor: tileBg, width: '140px' }}
    >
      {projectImageSrc && (
        <>
          <img
            src={projectImageSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(3px)', transform: 'scale(1.05)' }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}
      {!projectImageSrc && logoSrc && (
        <div
          className={`absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded flex items-center justify-center overflow-hidden ${
            isDarkMode ? 'bg-slate-300' : 'bg-white'
          }`}
        >
          <img
            src={logoSrc}
            alt=""
            className="max-h-5 max-w-5 object-contain"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
      )}
      <span
        className={`absolute top-2 left-2.5 text-[9px] font-bold z-10 ${
          projectImageSrc ? 'text-white/60' : 'text-slate-400'
        }`}
      >
        {yearLabel}
      </span>
      <div
        className={`h-full flex items-center relative z-10 px-2.5 pt-3 ${
          projectImageSrc ? 'pr-2.5' : logoSrc ? 'pr-9' : 'pr-2.5'
        }`}
      >
        <h3
          className={`font-bold text-xs leading-tight ${
            projectImageSrc ? 'text-white' : isDarkMode ? 'text-slate-100' : 'text-slate-800'
          }`}
        >
          {item.title}
        </h3>
      </div>
    </article>
  );
};

const MobileView = ({
  basics,
  skills,
  timelineRows,
  timelineItemsByRow,
  isDarkMode,
  toggleDarkMode,
  detail,
  viewportWidth,
}) => {
  const { selectedTile, isDetailOpen, openDetailView, closeDetailView } = detail;
  const dm = isDarkMode;

  return (
    <div
      className={`h-screen w-screen overflow-hidden flex flex-col ${
        dm ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'
      }`}
    >
      {/* Header */}
      <div
        className={`flex-none px-4 pt-4 pb-3 border-b ${
          dm ? 'border-slate-700' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}assets/rohan.jpeg`}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover flex-shrink-0"
          />
          <h1 className="text-xl font-black flex-1 leading-tight">{basics.name}</h1>
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="flex items-center gap-1.5 flex-shrink-0"
          >
            <span className="text-[10px] font-semibold text-slate-400">
              {dm ? 'Light' : 'Dark'}
            </span>
            <div
              className={`h-5 w-9 rounded-full border flex items-center px-0.5 transition-colors ${
                dm ? 'bg-slate-600 border-slate-500' : 'bg-slate-200 border-slate-300'
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full shadow transition-transform duration-300 ${
                  dm ? 'bg-slate-200 translate-x-4' : 'bg-white translate-x-0'
                }`}
              />
            </div>
          </button>
        </div>
        <p
          className={`text-[11px] leading-relaxed mt-2 ${
            dm ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          {basics.summary}
        </p>
        <div
          className={`flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5 text-[11px] ${
            dm ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <a href={`mailto:${basics.email}`} className="hover:underline">
            {basics.email}
          </a>
          <a href={basics.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
            LinkedIn
          </a>
          <a href={basics.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </a>
        </div>
      </div>

      {/* Skills strip */}
      <div
        className={`flex-none px-4 pt-2.5 pb-3 border-b ${
          dm ? 'border-slate-700' : 'border-slate-100'
        }`}
      >
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1.5">
          Skills
        </span>
        <div
          className="flex gap-2 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {skills.map((skill) => (
            <span
              key={skill}
              className={`flex-shrink-0 text-[11px] font-semibold px-3 py-1 rounded shadow-sm ${
                dm ? 'bg-slate-700 text-slate-100' : 'bg-[#F5F5F7] text-slate-800'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline rows — fill remaining height equally */}
      <div
        className={`flex-1 flex flex-col divide-y min-h-0 ${
          dm ? 'divide-slate-700' : 'divide-slate-100'
        }`}
      >
        {timelineRows.map((row) => {
          const items = timelineItemsByRow[row.key] ?? [];
          return (
            <div key={row.key} className="flex-1 flex flex-col min-h-0 px-4 pt-2 pb-2">
              <span className="flex-none text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1.5">
                {row.label}
              </span>
              <div
                className="flex-1 flex gap-3 overflow-x-auto min-h-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {items.map((item) => (
                  <MobileTile
                    key={item.id}
                    item={item}
                    row={row}
                    isDarkMode={dm}
                    onOpen={openDetailView}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

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

export default MobileView;
