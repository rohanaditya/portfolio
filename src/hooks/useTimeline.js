import { useMemo } from 'react';
import { timelineRows } from '../constants/theme';
import {
  TILE_GAP,
  TILE_WIDTH,
  getTimelineYears,
} from '../utils/timeline';

export const useTimeline = (data) => {
  const timelineYears = useMemo(() => getTimelineYears(data), [data]);

  const timelineItemsByRow = useMemo(
    () =>
      timelineRows.reduce((acc, row) => {
        acc[row.key] = data
          .flatMap((yearGroup) =>
            (yearGroup[row.key] ?? []).map((item) => ({
              ...item,
              startYear: Number(item.startDate),
              endYear: Number(item.endDate),
            }))
          )
          .sort(
            (a, b) => b.endYear - a.endYear || b.startYear - a.startYear
          );
        return acc;
      }, {}),
    [data]
  );

  const timelineItemsByRowAndYear = useMemo(
    () =>
      timelineRows.reduce((acc, row) => {
        acc[row.key] = timelineYears.reduce((years, year) => {
          years[year] = (timelineItemsByRow[row.key] ?? []).filter(
            (item) => year >= item.startYear && year <= item.endYear
          );
          return years;
        }, {});
        return acc;
      }, {}),
    [timelineItemsByRow, timelineYears]
  );

  const yearColumnWidths = useMemo(
    () =>
      timelineYears.reduce((widths, year) => {
        const maxItems = Math.max(
          1,
          ...timelineRows.map((row) => {
            if (row.key === 'education') {
              return (timelineItemsByRowAndYear[row.key]?.[year] ?? []).filter(
                (item) => item.type === 'certification'
              ).length;
            }
            if (row.key === 'experience' || row.key === 'volunteership') {
              return (timelineItemsByRowAndYear[row.key]?.[year] ?? []).filter(
                (item) => item.startYear === item.endYear
              ).length;
            }
            return timelineItemsByRowAndYear[row.key]?.[year]?.length ?? 0;
          })
        );
        widths[year] = maxItems * TILE_WIDTH + (maxItems - 1) * TILE_GAP;
        return widths;
      }, {}),
    [timelineItemsByRowAndYear, timelineYears]
  );

  const yearColumnX = useMemo(() => {
    const offsets = {};
    let x = 0;
    timelineYears.forEach((year) => {
      offsets[year] = x;
      x += yearColumnWidths[year] + TILE_GAP;
    });
    return offsets;
  }, [yearColumnWidths, timelineYears]);

  const totalContentWidth = useMemo(
    () =>
      timelineYears.reduce(
        (w, year) => w + yearColumnWidths[year] + TILE_GAP,
        -TILE_GAP
      ),
    [yearColumnWidths, timelineYears]
  );

  const educationItems = timelineItemsByRow['education'] ?? [];
  const educationDegrees = useMemo(
    () => educationItems.filter((item) => item.type === 'degree'),
    [educationItems]
  );
  const educationCerts = useMemo(
    () => educationItems.filter((item) => item.type === 'certification'),
    [educationItems]
  );
  const educationHasSplit = useMemo(
    () =>
      educationDegrees.some((deg) =>
        educationCerts.some(
          (cert) => cert.endYear >= deg.startYear && cert.startYear <= deg.endYear
        )
      ),
    [educationDegrees, educationCerts]
  );

  return {
    timelineYears,
    timelineItemsByRow,
    timelineItemsByRowAndYear,
    yearColumnWidths,
    yearColumnX,
    totalContentWidth,
    educationDegrees,
    educationCerts,
    educationHasSplit,
  };
};
