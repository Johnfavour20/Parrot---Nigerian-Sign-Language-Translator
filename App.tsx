import React, { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import MainApp from './components/MainApp';
import AuthPage from './components/AuthPage';
import OnboardingUserType from './components/OnboardingUserType';
import OnboardingPermissions from './components/OnboardingPermissions';
import { Page, UserType } from './types';

// Define the steps for the application flow after leaving the landing page
type AppStep = 'auth' | 'user-type' | 'permissions' | 'main';

/**
 * This component manages the state of the application after a user
 * decides to "Get Started" from the landing page. It handles
 * authentication, user type selection, permissions, and finally
 * renders the main application.
 */
const AppContent: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [step, setStep] = useState<AppStep>('auth');
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleAuthSuccess = () => setStep('user-type');
  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep('permissions');
  };
  const handlePermissionsGranted = () => setStep('main');
  
  const handleBackToHome = useCallback(() => {
    onNavigate(Page.Landing);
  }, [onNavigate]);

  const initialTab = userType === 'signer' ? 'conversation' : 'dictionary';

  switch(step) {
    case 'auth':
      return <AuthPage onAuthSuccess={handleAuthSuccess} onNavigateHome={handleBackToHome} />;
    case 'user-type':
      return <OnboardingUserType onSelect={handleUserTypeSelect} />;
    case 'permissions':
      return <OnboardingPermissions onGranted={handlePermissionsGranted} />;
    case 'main':
      return <MainApp onNavigate={onNavigate} initialTab={initialTab} />;
    default:
      return <AuthPage onAuthSuccess={handleAuthSuccess} onNavigateHome={handleBackToHome} />;
  }
};


/**
 * The root component that switches between the main landing page
 * and the interactive application content.
 */
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  switch (currentPage) {
    case Page.App:
      return <AppContent onNavigate={navigateTo} />;
    case Page.Landing:
    default:
      return <LandingPage onNavigate={navigateTo} />;
  }
};

export default App;
