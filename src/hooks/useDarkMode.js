import { useState } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true'
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem('darkMode', String(!prev));
      return !prev;
    });
  };

  return { isDarkMode, toggleDarkMode };
};
