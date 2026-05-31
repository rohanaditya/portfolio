import TimelineTile from '../TimelineTile';

const ProjectsRow = ({
  row,
  timelineYears,
  timelineItemsByRowAndYear,
  yearColumnWidths,
  isDarkMode,
  activeYear,
  onOpen,
}) => (
  <div className="h-1/4 px-6 py-4">
    <div className="h-full flex gap-4">
      {timelineYears.map((year) => (
        <div
          key={`${row.key}-${year}`}
          data-year-marker={year}
          className="h-full flex flex-row gap-4 flex-shrink-0"
          style={{ width: `${yearColumnWidths[year]}px` }}
        >
          {(timelineItemsByRowAndYear[row.key]?.[year] ?? []).map((item) => (
            <TimelineTile
              key={item.id}
              item={item}
              row={row}
              isDarkMode={isDarkMode}
              activeYear={activeYear}
              onOpen={onOpen}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default ProjectsRow;
