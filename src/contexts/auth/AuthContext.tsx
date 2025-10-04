import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { 
  AuthContextType, 
  LoginCredentials, 
  RegisterData, 
  User 
} from './authTypes';
import { authReducer, initialAuthState } from './authReducer';
import { authService } from '../../services/auth/authService';
import { tokenService } from '../../services/auth/tokenService';
import { useToast } from '../ToastContext';
import { useTranslation } from '../../hooks/useTranslation';

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const { showErrorToast, showSuccessToast } = useToast();
  const { getContent } = useTranslation();

  // Initialize auth state on app start
  const initializeAuth = useCallback(async () => {
    dispatch({ type: 'AUTH_INIT_START' });

    try {
      // Check if user has valid tokens
      if (tokenService.isAuthenticated()) {
        // Try to get current user info from server
        const response = await authService.getCurrentUser();
        
        dispatch({
          type: 'AUTH_INIT_SUCCESS',
          payload: {
            user: response.user,
            isAuthenticated: true
          }
        });
      } else {
        // No valid tokens, user is not authenticated
        tokenService.clearTokens();
        dispatch({
          type: 'AUTH_INIT_SUCCESS',
          payload: {
            user: null,
            isAuthenticated: false
          }
        });
      }
    } catch (error) {
      // Failed to validate user, clear tokens and set as unauthenticated
      tokenService.clearTokens();
      dispatch({
        type: 'AUTH_INIT_SUCCESS',
        payload: {
          user: null,
          isAuthenticated: false
        }
      });
    }
  }, []);

  // Setup token refresh interval
  useEffect(() => {
    let refreshInterval: number;

    if (state.isAuthenticated && state.user) {
      // Refresh token every 14 minutes (tokens typically expire after 15 minutes)
      refreshInterval = setInterval(() => {
        refreshToken();
      }, 14 * 60 * 1000);
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [state.isAuthenticated]);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });

      const response = await authService.login(credentials);
      
      // Store tokens securely
      tokenService.setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
        expiresAt: Date.now() + (response.expiresIn * 1000)
      });

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          isAuthenticated: true
        }
      });

      showSuccessToast(getContent('validation.loginSuccess'));
    } catch (error: any) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error.message || getContent('validation.loginFailed')
      });
      
      showErrorToast(
        error.message || getContent('validation.loginFailed')
      );
      throw error;
    }
  };

  // Register function
  const register = async (data: RegisterData): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });

      const response = await authService.register(data);
      
      // Store tokens securely
      tokenService.setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
        expiresAt: Date.now() + (response.expiresIn * 1000)
      });

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          isAuthenticated: true
        }
      });

      showSuccessToast(getContent('validation.registerSuccess'));
    } catch (error: any) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error.message || getContent('validation.registerFailed')
      });
      
      showErrorToast(
        error.message || getContent('validation.registerFailed')
      );
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      // Call logout endpoint to invalidate tokens on server
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local auth state regardless of server response
      clearAuth();
      showSuccessToast(getContent('auth.logoutSuccess'));
    }
  };

  // Clear auth state locally
  const clearAuth = () => {
    tokenService.clearTokens();
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  // Google Sign In with OAuth service
  const googleSignIn = async (): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });

      // Use Google OAuth service for sign-in
      const { googleOAuthService } = await import('../../services/auth/googleOAuthService');
      const response = await googleOAuthService.signIn();
      
      // Store tokens securely
      tokenService.setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
        expiresAt: Date.now() + (response.expiresIn * 1000)
      });

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          isAuthenticated: true
        }
      });

      showSuccessToast(getContent('auth.googleSignInSuccess'));
    } catch (error: any) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error.message || 'Google sign-in failed'
      });
      
      showErrorToast(error.message || 'Google sign-in failed');
      throw error;
    }
  };

  // Refresh token function
  const refreshToken = async (): Promise<void> => {
    try {
      const response = await authService.refreshToken();
      
      // Update stored tokens
      tokenService.setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
        expiresAt: Date.now() + (response.expiresIn * 1000)
      });

      // Update user if provided in refresh response
      if (response.user) {
        dispatch({
          type: 'UPDATE_USER',
          payload: response.user
        });
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout user
      clearAuth();
      throw error;
    }
  };

  // Update user function
  const updateUser = (userData: Partial<User>): void => {
    dispatch({
      type: 'UPDATE_USER',
      payload: userData
    });
  };

  // Clear error function
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Check if token is expired
  const isTokenExpired = (): boolean => {
    return tokenService.isTokenExpired();
  };

  // Check if user has specific role(s)
  const hasRole = (role: string | string[]): boolean => {
    if (!state.user) return false;

    if (Array.isArray(role)) {
      return role.includes(state.user.role);
    }
    
    return state.user.role === role;
  };

  // Context value
  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    googleSignIn,
    refreshToken,
    updateUser,
    clearError,
    isTokenExpired,
    hasRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
