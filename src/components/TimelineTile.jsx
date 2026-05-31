import { logoTints, darkLogoTints } from '../constants/theme';

const TimelineTile = ({
  item,
  row,
  isDarkMode,
  activeYear,
  onOpen,
  isPreview = false,
  forceActive = false,
}) => {
  const isActive =
    forceActive ||
    (Number(activeYear) >= item.startYear && Number(activeYear) <= item.endYear);

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

  const organization = item.company || item.institution;
  const tileOrg = organization?.replace(/\s*\(.*\)$/, '');

  const sizeClasses = isPreview ? 'h-48 w-80' : 'h-full w-full';
  const interactiveClasses = isPreview ? '' : 'hover:-translate-y-1';

  const handleClick = isPreview ? undefined : () => onOpen(item, row);
  const handleKeyDown = isPreview
    ? undefined
    : (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(item, row);
        }
      };

  return (
    <article
      key={item.id}
      role={isPreview ? undefined : 'button'}
      tabIndex={isPreview ? undefined : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`relative ${sizeClasses} p-4 rounded shadow-sm transition-all duration-300 overflow-hidden ${interactiveClasses} ${
        isActive ? 'opacity-100' : 'opacity-30'
      }`}
      style={{ backgroundColor: tileBg }}
      data-timeline-card={isPreview ? undefined : true}
      data-start-year={isPreview ? undefined : item.startDate}
      data-end-year={isPreview ? undefined : item.endDate}
    >
      {projectImageSrc ? (
        <>
          <img
            src={projectImageSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(3px)', transform: 'scale(1.05)' }}
          />
          <div className="absolute inset-0 bg-black/45" />
        </>
      ) : logoSrc ? (
        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded flex items-center justify-center overflow-hidden ${
            isDarkMode ? 'bg-slate-300' : 'bg-white'
          }`}
        >
          <img
            src={logoSrc}
            alt={`${item.logoId} logo`}
            className="max-h-8 max-w-8 object-contain"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
      ) : null}

      <div className={`h-full flex items-center relative z-10 ${projectImageSrc ? 'pr-4' : 'pr-14'}`}>
        <h3
          className={`font-bold text-sm leading-tight ${
            projectImageSrc ? 'text-white' : isDarkMode ? 'text-slate-100' : 'text-slate-800'
          }`}
        >
          {row.key === 'education' && item.type === 'degree' && tileOrg
            ? `${item.title} - ${tileOrg}`
            : item.title}
        </h3>
      </div>
    </article>
  );
};

export default TimelineTile;
