import React from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { useRouter } from '../Router';
import { LoadingScreen } from '../ui/LoadingScreen';
import type { RouteProtection } from '../../contexts/auth/authTypes';

// Props for ProtectedRoute component
interface ProtectedRouteProps extends RouteProtection {
  children: ReactNode;
  fallback?: ReactNode; // Custom loading/error component
}

// Props for PublicRoute (inverse of ProtectedRoute)
interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string; // Where to redirect authenticated users
  fallback?: ReactNode;
}

// Protected Route Component - requires authentication
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles = [],
  redirectTo = '/login',
  fallback,
}) => {
  const { 
    isAuthenticated, 
    isLoading, 
    isInitialized, 
    hasRole 
  } = useAuth();
  const { navigate } = useRouter();

  // Show loading while auth state is being initialized
  if (!isInitialized || isLoading) {
    return fallback || <LoadingScreen message="Đang tải..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Store message for display after redirect
    sessionStorage.setItem('authMessage', JSON.stringify({
      type: 'warning',
      message: 'Vui lòng đăng nhập để tiếp tục',
      subtitle: 'Bạn cần đăng nhập để truy cập trang này'
    }));
    
    // Use hard redirect for clean state
    window.location.href = redirectTo;
    return null;
  }

  // Check role-based access if roles are specified
  if (roles.length > 0 && !hasRole(roles)) {
    navigate('/unauthorized');
    return null;
  }

  // Render protected content
  return <>{children}</>;
};

// Public Route Component - for login/register pages (redirects if already authenticated)
export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = '/dashboard',
  fallback,
}) => {
  const { 
    isAuthenticated, 
    isLoading, 
    isInitialized 
  } = useAuth();
  const { navigate } = useRouter();

  // Show loading while auth state is being initialized
  if (!isInitialized || isLoading) {
    return fallback || <LoadingScreen message="Đang tải..." />;
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    navigate(redirectTo);
    return null;
  }

  // Render public content (login/register forms)
  return <>{children}</>;
};

// Role-based Route Component
interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
  unauthorizedRedirect?: string;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  allowedRoles,
  fallback,
  unauthorizedRedirect = '/unauthorized',
}) => {
  const { 
    isAuthenticated, 
    isLoading, 
    isInitialized, 
    hasRole 
  } = useAuth();
  const { navigate } = useRouter();

  // Show loading while auth state is being initialized
  if (!isInitialized || isLoading) {
    return fallback || <LoadingScreen message="Đang tải..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // Check if user has required role
  if (!hasRole(allowedRoles)) {
    navigate(unauthorizedRedirect);
    return null;
  }

  return <>{children}</>;
};

// Higher-order component for protecting routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: RouteProtection = {}
) {
  const AuthenticatedComponent = (props: P) => {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  
  return AuthenticatedComponent;
}

// Higher-order component for public routes
export function withPublicRoute<P extends object>(
  Component: React.ComponentType<P>,
  redirectTo: string = '/dashboard'
) {
  const PublicComponent = (props: P) => {
    return (
      <PublicRoute redirectTo={redirectTo}>
        <Component {...props} />
      </PublicRoute>
    );
  };

  PublicComponent.displayName = `withPublicRoute(${Component.displayName || Component.name})`;
  
  return PublicComponent;
}

// Custom hook for route protection logic
export const useRouteProtection = () => {
  const { isAuthenticated, user, hasRole } = useAuth();
  const { navigate } = useRouter();

  const requireAuth = (redirectTo: string = '/login') => {
    if (!isAuthenticated) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  const requireRole = (
    roles: string | string[], 
    unauthorizedRedirect: string = '/unauthorized'
  ) => {
    if (!isAuthenticated) {
      navigate('/login');
      return false;
    }

    if (!hasRole(roles)) {
      navigate(unauthorizedRedirect);
      return false;
    }

    return true;
  };

  const requireGuest = (redirectTo: string = '/dashboard') => {
    if (isAuthenticated) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  return {
    requireAuth,
    requireRole,
    requireGuest,
    isAuthenticated,
    user,
    hasRole,
  };
};

export default ProtectedRoute;
