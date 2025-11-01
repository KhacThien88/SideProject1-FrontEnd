import React, { createContext, useContext, useReducer, useEffect, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, AuthUser, AuthTokens } from '../../types/auth';
import { AuthApiService, TokenManager, ApiErrorHandler } from '../../services/api/authService';
import { LoadingScreen } from '../../components/ui/LoadingScreen';
import { handle401Error } from '../../services/api/apiInterceptor';
import { useTranslation } from '../../hooks/useTranslation';

// Auth Action Types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: AuthUser; tokens: AuthTokens } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_CLEAR_ERROR' }
  | { type: 'AUTH_UPDATE_USER'; payload: AuthUser };

// Initial Auth State
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'AUTH_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'AUTH_UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

// Auth Context Type
interface AuthContextType extends AuthState {
  // Actions
  register: (userData: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  googleSignIn: (credential: string) => Promise<void>;
  completeGoogleRegistration: (userData: GoogleRegistrationData) => Promise<void>;
  verifyOTP: (email: string, otpCode: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
  updateUser: (user: AuthUser) => void;
  
  // Utilities
  getAuthHeader: () => Record<string, string> | null;
  isTokenExpired: () => boolean;
  isInitialized: boolean;
  hasRole: (roles: string | string[]) => boolean;
}

// Google Registration Data interface
interface GoogleRegistrationData {
  email: string;
  name: string;
  googleId: string;
  avatar?: string;
  role: 'candidate' | 'recruiter';
  googleToken: string;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);
  const { t } = useTranslation();
  
  // Prevent multiple initializations
  const initializingRef = React.useRef(false);

  // Initialize auth state from stored tokens
  useEffect(() => {
    const initializeAuth = async () => {
      // Prevent race condition on rapid F5
      if (initializingRef.current) {
        return;
      }
      initializingRef.current = true;

      try {
        // Check for tokens first
        const accessToken = TokenManager.getAccessToken();
        const refreshToken = TokenManager.getRefreshToken();

        // Get current route
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        const isRoleSelectionRoute = currentPath === '/role-selection' || currentHash === '#role-selection';
        
        const isPublicRoute = currentPath === '/' || currentPath === '/login' || currentPath === '/register' || 
                            currentPath === '/forgot-password' || currentPath === '/reset-password' ||
                            currentPath === '/verify-otp';
        
        // If no tokens and on public route, skip auth initialization
        if ((!accessToken || !refreshToken) && (isRoleSelectionRoute || isPublicRoute)) {
          dispatch({ type: 'AUTH_FAILURE', payload: '' });
          setIsInitialized(true);
          return;
        }

        // If no tokens at all, logout
        if (!accessToken || !refreshToken) {
          dispatch({ type: 'AUTH_FAILURE', payload: 'No stored tokens' });
          setIsInitialized(true);
          return;
        }

        // Try to restore user from localStorage first (faster on F5)
        const cachedUser = TokenManager.getUserInfo();
        if (cachedUser) {
          // Immediately set auth state with cached user for instant UI
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: {
              user: cachedUser,
              tokens: {
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: 0,
              },
            },
          });

          // Warm settings cache in background
          try {
            // fire-and-forget
            (await import('../../services/api/settings/settingsService')).settingsService.refreshSettings().catch(() => null);
          } catch (e) {
            // ignore dynamic import errors
          }

          setIsInitialized(true);
          
          // If authenticated and on public page, redirect immediately
          if (isPublicRoute) {
            window.location.href = '/dashboard';
            return;
          }

          // Revalidate user info in background and update stored info when available
          AuthApiService.getCurrentUser(accessToken)
            .then((fresh) => {
              TokenManager.storeUserInfo(fresh);
              dispatch({ type: 'AUTH_UPDATE_USER', payload: fresh });
            })
            .catch(() => {
              // Silent fail - will be handled by interceptors or next request
            });

          return;
        }

        // Always try to get user info first (token might still be valid on server)
        try {
          const userResponse = await AuthApiService.getCurrentUser(accessToken);
          
          // Store user info for faster restore on F5
          TokenManager.storeUserInfo(userResponse);
          
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: {
              user: userResponse,
              tokens: {
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: 0,
              },
            },
          });
          // Clear and warm settings cache for this user so Settings page loads instantly later
          try { (await import('../../services/api/settings/settingsService')).settingsService.clearCacheForCurrentUser(); } catch (e) { /* ignore */ }
          try { (await import('../../services/api/settings/settingsService')).settingsService.refreshSettings().catch(() => null); } catch (e) { /* ignore */ }
          setIsInitialized(true);
          
          // If authenticated and on public page, redirect immediately
          if (isPublicRoute) {
            window.location.href = '/dashboard';
          }
        } catch (userError: any) {
          // Handle 401 errors globally with interceptor
          handle401Error(userError);
          
          // If 401, try to refresh token
          if (userError?.response?.status === 401 && refreshToken) {
            try {
              const tokenResponse = await AuthApiService.refreshToken(refreshToken);
              TokenManager.storeTokens(tokenResponse);
              
              const userResponse = await AuthApiService.getCurrentUser(tokenResponse.access_token);
              
              // Store user info for faster restore on F5
              TokenManager.storeUserInfo(userResponse);
              
              dispatch({
                type: 'AUTH_SUCCESS',
                payload: {
                  user: userResponse,
                  tokens: {
                    access_token: tokenResponse.access_token,
                    refresh_token: tokenResponse.refresh_token,
                    expires_in: tokenResponse.expires_in,
                  },
                },
              });
              // Clear and warm settings cache for this user after token refresh
              try { (await import('../../services/api/settings/settingsService')).settingsService.clearCacheForCurrentUser(); } catch (e) { /* ignore */ }
              try { (await import('../../services/api/settings/settingsService')).settingsService.refreshSettings().catch(() => null); } catch (e) { /* ignore */ }
              setIsInitialized(true);
              
              // If authenticated and on public page, redirect immediately
              if (isPublicRoute) {
                window.location.href = '/dashboard';
              }
            } catch (refreshError: any) {
              // Refresh failed - handle with interceptor
              handle401Error(refreshError);
              
              TokenManager.clearTokens();
              dispatch({ type: 'AUTH_FAILURE', payload: 'Session expired' });
              setIsInitialized(true);
            }
          } else {
            // Other error (not 401), clear tokens
            TokenManager.clearTokens();
            dispatch({ type: 'AUTH_FAILURE', payload: 'Invalid session' });
            setIsInitialized(true);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        TokenManager.clearTokens();
        dispatch({ type: 'AUTH_FAILURE', payload: 'Failed to initialize auth' });
        setIsInitialized(true);
      } finally {
        initializingRef.current = false;
      }
    };

    initializeAuth();
  }, []);

  // Auto-redirect to dashboard if authenticated and on public page
  useEffect(() => {
    if (!isInitialized || state.isLoading) return;
    
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    
    // Public routes that should redirect to dashboard when authenticated
    const publicRoutes = ['/', '/login', '/register'];
    const isPublicPage = publicRoutes.includes(currentPath) || 
                        currentHash === '#login' || 
                        currentHash === '#register';
    
    // If authenticated and on public page, redirect to dashboard
    if (state.isAuthenticated && isPublicPage) {
      window.location.href = '/dashboard';
    }
  }, [state.isAuthenticated, isInitialized, state.isLoading]);

  // Register function
  const register = async (userData: any): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      await AuthApiService.register(userData);
      
      // Registration successful, but user needs to verify email
      dispatch({ type: 'AUTH_FAILURE', payload: 'Please verify your email' });
    } catch (error) {
      const errorMessage = ApiErrorHandler.handleError(error);
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await AuthApiService.login({ email, password });
      
      // Store tokens
      TokenManager.storeTokens(response);
      
      // Store user info for faster restore on F5
      TokenManager.storeUserInfo(response.user);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          tokens: {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            expires_in: response.expires_in,
          },
        },
      });
      // Clear any settings cache and prefetch settings for the newly registered user
      try { (await import('../../services/api/settings/settingsService')).settingsService.clearCacheForCurrentUser(); } catch (e) { /* ignore */ }
      try { (await import('../../services/api/settings/settingsService')).settingsService.refreshSettings().catch(() => null); } catch (e) { /* ignore */ }
      // Clear any existing settings cache for this user to avoid stale data
      try { (await import('../../services/api/settings/settingsService')).settingsService.clearCacheForCurrentUser(); } catch (e) { /* ignore */ }
      // Prefetch settings for this user in background to warm the cache
      try { (await import('../../services/api/settings/settingsService')).settingsService.refreshSettings().catch(() => null); } catch (e) { /* ignore */ }
    } catch (error) {
      const errorMessage = ApiErrorHandler.handleError(error);
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  // Google Sign In function
  const googleSignIn = async (credential: string): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await AuthApiService.googleAuth(credential);
      
      // Store tokens for existing user
      TokenManager.storeTokens(response);
      
      // Store user info for faster restore on F5
      TokenManager.storeUserInfo(response.user);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          tokens: {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            expires_in: response.expires_in,
          },
        },
      });
      // Clear any existing settings cache for this user to avoid stale data
      try { (await import('../../services/api/settings/settingsService')).settingsService.clearCacheForCurrentUser(); } catch (e) { /* ignore */ }
      // Prefetch settings in background to warm cache
      try { (await import('../../services/api/settings/settingsService')).settingsService.refreshSettings().catch(() => null); } catch (e) { /* ignore */ }
    } catch (error: any) {
      // Check if this is a role selection required error (HTTP 202)
      if (error?.message?.includes('ROLE_SELECTION_REQUIRED')) {
        dispatch({ type: 'AUTH_FAILURE', payload: '' });
        throw new Error('ROLE_SELECTION_REQUIRED');
      }
      
      const errorMessage = ApiErrorHandler.handleError(error);
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  // Complete Google Registration function
  const completeGoogleRegistration = async (userData: GoogleRegistrationData): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await AuthApiService.completeGoogleRegistration({
        googleToken: userData.googleToken,
        role: userData.role,
      });
      
      // Store tokens
      TokenManager.storeTokens(response);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          tokens: {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            expires_in: response.expires_in,
          },
        },
      });
    } catch (error: any) {
      const errorMessage = ApiErrorHandler.handleError(error);
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  // Verify OTP function
  const verifyOTP = async (email: string, otpCode: string): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      await AuthApiService.verifyOTP({ email, otp_code: otpCode });
      
      // OTP verified successfully
      dispatch({ type: 'AUTH_CLEAR_ERROR' });
    } catch (error) {
      const errorMessage = ApiErrorHandler.handleError(error);
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  // Resend OTP function
  const resendOTP = async (email: string): Promise<void> => {
    try {
      await AuthApiService.resendOTP(email);
    } catch (error) {
      const errorMessage = ApiErrorHandler.handleError(error);
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  // Logout function - Optimized for fast logout
  const logout = async (): Promise<void> => {
    const accessToken = TokenManager.getAccessToken();
    
    // Clear tokens and update state immediately for instant logout
    TokenManager.clearTokens();
    dispatch({ type: 'AUTH_LOGOUT' });
    
    // Call logout API in background (fire and forget)
    // This invalidates the token on server but doesn't block the UI
    if (accessToken) {
      AuthApiService.logout(accessToken).catch((error) => {
        console.error('Background logout API error:', error);
        // Silently fail - user is already logged out locally
      });
    }
  };

  // Refresh token function
  const refreshToken = async (): Promise<void> => {
    try {
      const refreshTokenValue = TokenManager.getRefreshToken();
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      const response = await AuthApiService.refreshToken(refreshTokenValue);
      TokenManager.storeTokens(response);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          tokens: {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            expires_in: response.expires_in,
          },
        },
      });
    } catch (error) {
      // Refresh failed, logout user
      TokenManager.clearTokens();
      dispatch({ type: 'AUTH_LOGOUT' });
      throw error;
    }
  };

  // Clear error function
  const clearError = (): void => {
    dispatch({ type: 'AUTH_CLEAR_ERROR' });
  };

  // Update user function
  const updateUser = (user: AuthUser): void => {
    dispatch({ type: 'AUTH_UPDATE_USER', payload: user });
  };

  // Get auth header function
  const getAuthHeader = (): Record<string, string> | null => {
    return TokenManager.getAuthHeader();
  };

  // Check if token is expired
  const isTokenExpired = (): boolean => {
    return TokenManager.isTokenExpired();
  };

  // Check if user has specific role(s)
  const hasRole = (roles: string | string[]): boolean => {
    if (!state.user?.role) return false;
    
    if (typeof roles === 'string') {
      return state.user.role === roles;
    }
    
    return roles.includes(state.user.role);
  };

  // Context value - memoized to prevent unnecessary re-renders
  const contextValue: AuthContextType = useMemo(() => ({
    ...state,
    register,
    login,
    googleSignIn,
    completeGoogleRegistration,
    verifyOTP,
    resendOTP,
    logout,
    refreshToken,
    clearError,
    updateUser,
    getAuthHeader,
    isTokenExpired,
    isInitialized,
    hasRole,
  }), [
    state,
    register,
    login,
    googleSignIn,
    completeGoogleRegistration,
    verifyOTP,
    resendOTP,
    logout,
    refreshToken,
    clearError,
    updateUser,
    getAuthHeader,
    isTokenExpired,
    isInitialized,
    hasRole,
  ]);

  // Show loading screen logic
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/verify-otp', '/role-selection'];
  const isPublicPage = publicRoutes.includes(currentPath) || 
                      currentHash === '#login' || 
                      currentHash === '#register';
  const isProtectedRoute = !isPublicPage;
  
  // Check if user has tokens (might be authenticated)
  const hasTokens = TokenManager.getAccessToken() && TokenManager.getRefreshToken();
  
  // Show loading screen in these cases:
  // 1. Protected route while initializing
  // 2. Public route + has tokens (will redirect to dashboard)
  const shouldShowLoading = !isInitialized && state.isLoading && (
    isProtectedRoute || 
    (isPublicPage && hasTokens)
  );
  
  if (shouldShowLoading) {
    const loadingMessage = hasTokens 
      ? t.common.loadingScreen.redirecting 
      : t.common.loadingScreen.authenticating;
    
    return (
      <AuthContext.Provider value={contextValue}>
        <LoadingScreen message={loadingMessage} />
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Export AuthContext for advanced usage
export { AuthContext };
