import React, { useState, useTransition, createContext, useContext } from 'react';
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
    });
  };

  const navigateBack = (route: string, transitionType?: string) => {
    if (transitionType) {
      addTransitionType(transitionType);
    }
    
    startTransition(() => {
      setCurrentRoute(route);
    });
  };

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
  
  const matches = exact 
    ? currentRoute === path 
    : currentRoute.startsWith(path);
    
  if (!matches) return null;
  
  return <Component />;
};