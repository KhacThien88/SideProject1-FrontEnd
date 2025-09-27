import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Landing } from './pages/Landing';
import { Login } from './pages/Auth/Login';

function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('landing');

  useEffect(() => {
    // Simple hash-based routing
    const handleRouteChange = () => {
      const hash = window.location.hash.slice(1) || 'landing';
      setCurrentRoute(hash);
    };

    // Set initial route
    handleRouteChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleRouteChange);
    
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const renderPage = () => {
    switch (currentRoute) {
      case 'login':
        return <Login />;
      case 'landing':
      default:
        return <Landing />;
    }
  };

  return (
    <LanguageProvider>
      {renderPage()}
    </LanguageProvider>
  );
}

export default App
