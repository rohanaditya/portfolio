import resumeData from './data/resume.json';
import { basics } from './constants/basics';
import { skills } from './constants/skills';
import { timelineRows } from './constants/theme';
import { useDarkMode } from './hooks/useDarkMode';
import { useViewportWidth } from './hooks/useViewportWidth';
import { useTimeline } from './hooks/useTimeline';
import { useScrollYear } from './hooks/useScrollYear';
import { useDetailPanel } from './hooks/useDetailPanel';
import MobileView from './components/MobileView';
import DesktopView from './components/DesktopView';

const MOBILE_BREAKPOINT = 768;

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const viewportWidth = useViewportWidth();
  const timeline = useTimeline(resumeData);
  const scroll = useScrollYear(
    timeline.timelineYears,
    timeline.timelineItemsByRow,
    timeline.yearColumnX
  );
  const detail = useDetailPanel();

  const sharedProps = {
    basics,
    skills,
    timelineRows,
    isDarkMode,
    toggleDarkMode,
    detail,
    viewportWidth,
  };

  if (viewportWidth < MOBILE_BREAKPOINT) {
    return (
      <MobileView
        {...sharedProps}
        timelineItemsByRow={timeline.timelineItemsByRow}
      />
    );
  }

  return (
    <DesktopView
      {...sharedProps}
      timeline={timeline}
      scroll={scroll}
    />
  );
}

export default App;
