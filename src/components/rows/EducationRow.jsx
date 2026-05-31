import { useMemo } from 'react';
import TimelineTile from '../TimelineTile';
import { TILE_WIDTH } from '../../utils/timeline';

const EducationRow = ({
  row,
  items,
  timelineYears,
  yearColumnX,
  yearColumnWidths,
  totalContentWidth,
  isDarkMode,
  activeYear,
  onOpen,
}) => {
  const degrees = useMemo(
    () => items.filter((item) => item.type === 'degree'),
    [items]
  );
  const certs = useMemo(
    () => items.filter((item) => item.type === 'certification'),
    [items]
  );
  const hasSplit = useMemo(
    () =>
      degrees.some((deg) =>
        certs.some(
          (cert) => cert.endYear >= deg.startYear && cert.startYear <= deg.endYear
        )
      ),
    [degrees, certs]
  );

  const certsByYear = useMemo(
    () =>
      timelineYears.reduce((acc, year) => {
        acc[year] = certs.filter((c) => year >= c.startYear && year <= c.endYear);
        return acc;
      }, {}),
    [certs, timelineYears]
  );

  return (
    <div className="h-1/4 px-6 py-4">
      <div className="h-full flex flex-col" style={{ gap: hasSplit ? '4px' : '0' }}>
        {/* Degree lane */}
        <div
          className="relative min-h-0 flex-shrink-0"
          style={{
            width: `${totalContentWidth}px`,
            height: hasSplit ? 'calc(50% - 2px)' : '100%',
          }}
        >
          {degrees.map((degree) => {
            const left = yearColumnX[degree.endYear] ?? 0;
            const right =
              (yearColumnX[degree.startYear] ?? 0) +
              (yearColumnWidths[degree.startYear] ?? TILE_WIDTH);
            return (
              <div
                key={degree.id}
                className="absolute top-0 bottom-0"
                style={{ left: `${left}px`, width: `${right - left}px` }}
              >
                <TimelineTile
                  item={degree}
                  row={row}
                  isDarkMode={isDarkMode}
                  activeYear={activeYear}
                  onOpen={onOpen}
                />
              </div>
            );
          })}
        </div>

        {/* Certification lane */}
        {hasSplit && (
          <div
            className="min-h-0 flex gap-4 flex-shrink-0"
            style={{ height: 'calc(50% - 2px)' }}
          >
            {timelineYears.map((year) => (
              <div
                key={`edu-cert-${year}`}
                className="h-full flex flex-row gap-4 flex-shrink-0"
                style={{ width: `${yearColumnWidths[year]}px` }}
              >
                {certsByYear[year].map((cert) => (
                  <TimelineTile
                    key={cert.id}
                    item={cert}
                    row={row}
                    isDarkMode={isDarkMode}
                    activeYear={activeYear}
                    onOpen={onOpen}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationRow;
