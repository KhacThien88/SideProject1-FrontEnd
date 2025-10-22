/**
 * API Interceptor for handling global errors
 * Especially 401 Unauthorized errors for automatic logout
 */

import { TokenManager } from './authService';

// Track if we're already redirecting to prevent multiple redirects
let isRedirecting = false;

/**
 * Handle 401 Unauthorized errors globally
 * Clear tokens and redirect to login with message
 */
export const handle401Error = (error: any): void => {
  // Check if this is a 401 error
  if (error?.response?.status === 401) {
    // Prevent multiple simultaneous redirects
    if (isRedirecting) return;
    isRedirecting = true;

    // Clear all auth data
    TokenManager.clearTokens();

    // Store message for display on login page
    sessionStorage.setItem('authMessage', JSON.stringify({
      type: 'warning',
      message: 'Phiên đăng nhập đã hết hạn',
      subtitle: 'Vui lòng đăng nhập lại để tiếp tục'
    }));

    // Redirect immediately to login
    window.location.href = '/login';
  }
};

/**
 * Wrap API calls with 401 error handling
 */
export const withErrorHandling = async <T>(
  apiCall: () => Promise<T>
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    // Handle 401 errors globally
    handle401Error(error);
    throw error;
  }
};

/**
 * Check if current path is a public route
 */
export const isPublicRoute = (path: string): boolean => {
  const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/verify-otp'];
  return publicRoutes.includes(path) || path.startsWith('/reset-password');
};

/**
 * Reset redirecting flag (for testing or edge cases)
 */
export const resetRedirectFlag = (): void => {
  isRedirecting = false;
};

export default {
  handle401Error,
  withErrorHandling,
  isPublicRoute,
  resetRedirectFlag
};
