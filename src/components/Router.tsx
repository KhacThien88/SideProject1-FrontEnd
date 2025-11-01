import React, { useState, useTransition, createContext, useContext, useEffect } from 'react';
import { addTransitionType } from '../hooks/useViewTransition';

interface RouterContextType {
  currentRoute: string;
  navigate: (route: string, transitionType?: string) => void;
  navigateBack: (route: string, transitionType?: string) => void;
  isPending: boolean;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

interface RouterProviderProps {
  children: React.ReactNode;
  initialRoute?: string;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ 
  children, 
  initialRoute = '/' 
}) => {
  const [currentRoute, setCurrentRoute] = useState(initialRoute);
  const [isPending, startTransition] = useTransition();

  const navigate = (route: string, transitionType?: string) => {
    if (transitionType) {
      addTransitionType(transitionType);
    }
    
    startTransition(() => {
      setCurrentRoute(route);
      // Update browser URL
      window.history.pushState({}, '', route);
    });
  };

  const navigateBack = (route: string, transitionType?: string) => {
    if (transitionType) {
      addTransitionType(transitionType);
    }
    
    startTransition(() => {
      setCurrentRoute(route);
      // Update browser URL
      window.history.pushState({}, '', route);
    });
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentRoute(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Set initial URL state
  useEffect(() => {
    if (currentRoute !== window.location.pathname) {
      window.history.replaceState({}, '', currentRoute);
    }
  }, []);

  return (
    <RouterContext.Provider 
      value={{ 
        currentRoute, 
        navigate, 
        navigateBack, 
        isPending 
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

// Route component for conditional rendering
interface RouteProps {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export const Route: React.FC<RouteProps> = ({ 
  path, 
  component: Component, 
  exact = false 
}) => {
  const { currentRoute } = useRouter();
  
  let matches = false;
  
  if (exact) {
    matches = currentRoute === path;
  } else {
    // For non-exact routes, check if it starts with the path
    // and ensure we're not matching exact routes by mistake
    matches = currentRoute.startsWith(path) && currentRoute !== path.replace(/\/$/, '');
  }
  
  // Debug logging
  if (path.includes('job-postings')) {
    console.log(`Route check: path="${path}", exact=${exact}, currentRoute="${currentRoute}", matches=${matches}`);
  }
    
  if (!matches) return null;
  
  return <Component />;
};

// Link component for navigation
interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  transitionType?: string;
  replace?: boolean;
}

export const Link: React.FC<LinkProps> = ({ 
  to, 
  children, 
  className, 
  transitionType
}) => {
  const { navigate, currentRoute } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentRoute !== to) {
      navigate(to, transitionType);
    }
  };

  const isActive = currentRoute === to;

  return (
    <a
      href={to}
      onClick={handleClick}
      className={`${className || ''} ${isActive ? 'router-link-active' : ''}`}
      data-active={isActive}
    >
      {children}
    </a>
  );
};