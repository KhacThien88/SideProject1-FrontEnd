import { useEffect, useState } from 'react';
import { TokenManager } from '../../services/api/authService';
import { LoadingScreen } from '../ui/LoadingScreen';
import { useTranslation } from '../../hooks/useTranslation';

interface PublicRouteProps {
  component: React.ComponentType;
}

/**
 * PublicRoute wrapper for pages like Login, Register, Landing
 * If user is already authenticated (has tokens), redirect to dashboard immediately
 * Otherwise, render the public page
 */
export const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component }) => {
  const [isChecking, setIsChecking] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Check for tokens synchronously (fast)
    const accessToken = TokenManager.getAccessToken();
    const refreshToken = TokenManager.getRefreshToken();

    if (accessToken && refreshToken) {
      // User is authenticated, redirect immediately
      window.location.href = '/dashboard';
      // Keep showing loading screen during redirect
      return;
    }

    // No tokens, safe to show public page
    setIsChecking(false);
  }, []);

  // Show loading while checking or redirecting
  if (isChecking) {
    return <LoadingScreen message={t.common.loadingScreen.redirecting} />;
  }

  // No tokens, render public page
  return <Component />;
};
