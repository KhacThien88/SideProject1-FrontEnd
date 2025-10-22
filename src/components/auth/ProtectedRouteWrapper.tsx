import { useEffect, useState } from 'react';
import { TokenManager } from '../../services/api/authService';
import { LoadingScreen } from '../ui/LoadingScreen';
import { useTranslation } from '../../hooks/useTranslation';

interface ProtectedRouteWrapperProps {
  component: React.ComponentType;
}

/**
 * ProtectedRouteWrapper for protected pages like Dashboard, Settings, etc.
 * If user is NOT authenticated (no tokens), redirect to login immediately with message
 * Otherwise, render the protected page
 */
export const ProtectedRouteWrapper: React.FC<ProtectedRouteWrapperProps> = ({ component: Component }) => {
  const [isChecking, setIsChecking] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Check for tokens synchronously (fast)
    const accessToken = TokenManager.getAccessToken();
    const refreshToken = TokenManager.getRefreshToken();

    if (!accessToken || !refreshToken) {
      // User is NOT authenticated, redirect to login with message
      sessionStorage.setItem('authMessage', JSON.stringify({
        type: 'warning',
        message: 'Vui lòng đăng nhập để tiếp tục',
        subtitle: 'Bạn cần đăng nhập để truy cập trang này'
      }));
      
      window.location.href = '/login';
      // Keep showing loading screen during redirect
      return;
    }

    // Has tokens, safe to show protected page
    setIsChecking(false);
  }, []);

  // Show loading while checking or redirecting
  if (isChecking) {
    return <LoadingScreen message={t.common.loadingScreen.authenticating} />;
  }

  // Has tokens, render protected page
  return <Component />;
};
