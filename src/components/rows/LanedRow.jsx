import TimelineTile from '../TimelineTile';
import { assignLanes } from '../../utils/timeline';

const LanedRow = ({
  row,
  items,
  yearColumnX,
  yearColumnWidths,
  totalContentWidth,
  isDarkMode,
  activeYear,
  onOpen,
}) => {
  const lanes = assignLanes(items);
  const hasSplit = lanes.length > 1;

  return (
    <div className="h-1/4 px-6 py-4">
      <div className="h-full flex flex-col" style={{ gap: hasSplit ? '4px' : '0' }}>
        {lanes.map((laneItems, laneIndex) => (
          <div
            key={laneIndex}
            className="relative min-h-0 flex-1"
            style={{ width: `${totalContentWidth}px` }}
          >
            {laneItems.map((item) => {
              const left = yearColumnX[item.endYear] ?? 0;
              const right =
                (yearColumnX[item.startYear] ?? 0) +
                (yearColumnWidths[item.startYear] ?? 320);
              return (
                <div
                  key={item.id}
                  className="absolute top-0 bottom-0"
                  style={{ left: `${left}px`, width: `${right - left}px` }}
                >
                  <TimelineTile
                    item={item}
                    row={row}
                    isDarkMode={isDarkMode}
                    activeYear={activeYear}
                    onOpen={onOpen}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanedRow;
