import { useEffect, useState } from 'react';

export const useDetailPanel = () => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const closeDetailView = () => {
    setIsDetailOpen(false);
    window.setTimeout(() => setSelectedTile(null), 300);
  };

  const openDetailView = (item, row) => {
    setSelectedTile({ item, row });
    window.requestAnimationFrame(() => setIsDetailOpen(true));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeDetailView();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { selectedTile, isDetailOpen, openDetailView, closeDetailView };
};
