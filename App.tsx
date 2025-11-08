import React, { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import MainApp from './components/MainApp';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  switch (currentPage) {
    case Page.App:
      return <MainApp onNavigate={navigateTo} />;
    case Page.Landing:
    default:
      return <LandingPage onNavigate={navigateTo} />;
  }
};

export default App;
