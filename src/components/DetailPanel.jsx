import TimelineTile from './TimelineTile';

const DetailPanel = ({
  selectedTile,
  isDetailOpen,
  isDarkMode,
  viewportWidth,
  onClose,
}) => {
  if (!selectedTile) return null;

  const { item, row } = selectedTile;
  const dp = isDarkMode;
  const isMobile = viewportWidth < 768;

  const org = item.company || item.institution;
  const dateDisplay =
    item.startDate === item.endDate
      ? item.startDate
      : `${item.startDate} - ${item.endDate}`;

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${dp ? 'bg-slate-900' : 'bg-white'} ${
        isDetailOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close detail view"
        className={`absolute right-6 top-6 z-10 h-9 w-9 rounded text-sm font-bold shadow-sm transition-opacity hover:opacity-70 ${
          dp ? 'bg-slate-700 text-slate-100' : 'bg-white text-slate-800'
        }`}
      >
        X
      </button>

      <div
        className={`h-full w-full flex ${isMobile ? 'flex-col overflow-y-auto' : ''} transition-transform duration-300 ${
          isDetailOpen ? 'translate-x-0' : 'translate-x-6'
        }`}
      >
        {/* Text section */}
        <section
          className={`${
            isMobile
              ? 'w-full flex-shrink-0 px-6 py-10 flex flex-col'
              : 'w-1/2 h-full px-12 py-16 overflow-y-auto flex flex-col justify-center'
          } ${dp ? 'text-slate-100' : 'text-slate-800'}`}
        >
          <p className={`text-xs uppercase tracking-wide font-bold mb-3 ${dp ? 'text-slate-300' : 'text-slate-800'}`}>
            {row.label}
          </p>
          <h2 className="text-4xl font-black mb-1">{item.title}</h2>
          <p className={`text-sm mb-6 ${dp ? 'text-slate-400' : 'text-slate-500'}`}>{dateDisplay}</p>
          {org && (
            <p className={`text-sm font-semibold ${item.cgpa ? 'mb-2' : 'mb-8'}`}>{org}</p>
          )}
          {item.cgpa && (
            <p className={`text-sm mb-8 ${dp ? 'text-slate-400' : 'text-slate-500'}`}>
              CGPA: {item.cgpa}
            </p>
          )}

          <div className="space-y-5 text-sm leading-relaxed">
            {item.description && <p>{item.description}</p>}
            {item.details && <p>{item.details}</p>}

            {item.coursework && (
              <div>
                <h3 className={`text-xs uppercase tracking-wide font-bold mb-3 ${dp ? 'text-slate-300' : 'text-slate-800'}`}>
                  Coursework
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.coursework.map((course) => (
                    <span
                      key={course}
                      className={`text-xs px-3 py-1 rounded shadow-sm ${dp ? 'bg-slate-700 text-slate-100' : 'bg-white text-slate-800'}`}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.highlights && (
              <div>
                <h3 className={`text-xs uppercase tracking-wide font-bold mb-3 ${dp ? 'text-slate-300' : 'text-slate-800'}`}>
                  Responsibilities
                </h3>
                <ul className="space-y-2">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="pl-4">{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            {item.technologies && (
              <div>
                <h3 className={`text-xs uppercase tracking-wide font-bold mb-3 ${dp ? 'text-slate-300' : 'text-slate-800'}`}>
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`text-xs px-3 py-1 rounded shadow-sm ${dp ? 'bg-slate-700 text-slate-100' : 'bg-white text-slate-800'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.certId && (
              <p className={`text-xs ${dp ? 'text-slate-400' : 'text-slate-800'}`}>
                Certification ID: {item.certId}
              </p>
            )}
          </div>

          <div className={`flex gap-4 mt-8 pt-8 border-t ${dp ? 'border-slate-700' : 'border-slate-200'}`}>
            {item.credly && (
              <a
                href={item.credly}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
              >
                View on Credly
              </a>
            )}
            {item.repoLink && (
              <a
                href={item.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-2 text-white text-sm font-semibold rounded transition-colors ${
                  dp ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-800 hover:bg-slate-900'
                }`}
              >
                View Repository
              </a>
            )}
            {item.liveLink && (
              <a
                href={item.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 transition-colors"
              >
                View Live
              </a>
            )}
          </div>
        </section>

        {/* Image / preview section */}
        <aside
          className={`${
            isMobile
              ? 'w-full flex-shrink-0 px-6 pb-10 flex items-center justify-center'
              : 'w-1/2 h-full flex items-center justify-center px-12'
          } ${dp ? 'bg-slate-900' : 'bg-white'}`}
        >
          {item.imageId ? (
            <img
              src={`${import.meta.env.BASE_URL}assets/${item.imageId}.png`}
              alt={item.title}
              className="max-w-full max-h-full object-contain rounded"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.09)' }}
            />
          ) : (
            <TimelineTile
              item={item}
              row={row}
              isDarkMode={isDarkMode}
              activeYear={null}
              isPreview
              forceActive
            />
          )}
        </aside>
      </div>
    </div>
  );
};

export default DetailPanel;
