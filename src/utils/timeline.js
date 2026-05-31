import { timelineRows } from '../constants/theme';

export const TILE_WIDTH = 320;
export const TILE_GAP = 16;

export const getAllTimelineItems = (timelineData) =>
  timelineRows.flatMap((row) =>
    timelineData.flatMap((yearGroup) =>
      (yearGroup[row.key] ?? []).map((item) => ({
        ...item,
        rowKey: row.key,
        startYear: Number(item.startDate),
        endYear: Number(item.endDate),
      }))
    )
  );

export const getTimelineYears = (timelineData) => {
  const years = getAllTimelineItems(timelineData).flatMap((item) => [
    item.startYear,
    item.endYear,
  ]);
  const highest = Math.max(...years);
  const lowest = Math.min(...years);
  return Array.from({ length: highest - lowest + 1 }, (_, i) => highest - i);
};

export const assignLanes = (items) => {
  const sorted = [...items].sort(
    (a, b) => b.endYear - a.endYear || b.startYear - a.startYear
  );
  const lanes = [];
  for (const item of sorted) {
    let placed = false;
    for (let i = 0; i < lanes.length; i++) {
      if (
        !lanes[i].some(
          (e) => item.endYear >= e.startYear && item.startYear <= e.endYear
        )
      ) {
        lanes[i].push(item);
        placed = true;
        break;
      }
    }
    if (!placed) lanes.push([item]);
  }
  return lanes;
};
