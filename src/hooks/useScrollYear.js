import { useEffect, useRef, useState } from 'react';
import { basics } from '../constants/basics';

export const useScrollYear = (timelineYears, timelineItemsByRow, yearColumnX) => {
  const [activeYear, setActiveYear] = useState(String(basics.currentYear));
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef(null);
  const frameRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const initialScrollDoneRef = useRef(false);

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
        if (rect.right < containerRect.left || rect.left > containerRect.right) return;
        const distance = Math.abs(rect.left + rect.width / 2 - focalPoint);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestMarker = marker;
        }
      });

      const year =
        container.scrollLeft <= 1 ? highestYear : closestMarker?.dataset.yearMarker;
      if (year) {
        setActiveYear((current) => (current === year ? current : year));
      }
    };

    const onScroll = () => {
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(updateActiveYear);
      }
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 300);
    };

    updateActiveYear();
    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [timelineItemsByRow, timelineYears]);

  // Scroll to current year on first render
  useEffect(() => {
    if (initialScrollDoneRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = yearColumnX[basics.currentYear];
    if (x === undefined) return;
    container.scrollLeft = 24 + x; // 24px = px-6 left padding
    initialScrollDoneRef.current = true;
  }, [yearColumnX]);

  return { activeYear, isScrolling, scrollContainerRef };
};
