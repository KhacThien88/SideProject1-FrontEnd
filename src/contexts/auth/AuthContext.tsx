import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, AuthUser, AuthTokens } from '../../types/auth';
import { AuthApiService, TokenManager, ApiErrorHandler } from '../../services/api/authService';

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
  verifyOTP: (email: string, otpCode: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
  updateUser: (user: AuthUser) => void;
  
  // Utilities
  getAuthHeader: () => Record<string, string> | null;
  isTokenExpired: () => boolean;
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

  // Initialize auth state from stored tokens
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = TokenManager.getAccessToken();
        const refreshToken = TokenManager.getRefreshToken();

        if (!accessToken || !refreshToken) {
          dispatch({ type: 'AUTH_FAILURE', payload: 'No stored tokens' });
          return;
        }

        if (TokenManager.isTokenExpired()) {
          // Try to refresh token
          try {
            const tokenResponse = await AuthApiService.refreshToken(refreshToken);
            TokenManager.storeTokens(tokenResponse);
            
            const userResponse = await AuthApiService.getCurrentUser(tokenResponse.access_token);
            
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
          } catch (refreshError) {
            // Refresh failed, clear tokens
            TokenManager.clearTokens();
            dispatch({ type: 'AUTH_FAILURE', payload: 'Session expired' });
          }
        } else {
          // Token is still valid, get user info
          try {
            const userResponse = await AuthApiService.getCurrentUser(accessToken);
            
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: {
                user: userResponse,
                tokens: {
                  access_token: accessToken,
                  refresh_token: refreshToken,
                  expires_in: 0, // We don't store expiry time, so set to 0
                },
              },
            });
          } catch (userError) {
            // User fetch failed, clear tokens
            TokenManager.clearTokens();
            dispatch({ type: 'AUTH_FAILURE', payload: 'Invalid session' });
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch({ type: 'AUTH_FAILURE', payload: 'Failed to initialize auth' });
      }
    };

    initializeAuth();
  }, []);

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

  // Logout function
  const logout = async (): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const accessToken = TokenManager.getAccessToken();
      if (accessToken) {
        await AuthApiService.logout(accessToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens regardless of API call success
      TokenManager.clearTokens();
      dispatch({ type: 'AUTH_LOGOUT' });
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

  // Context value
  const contextValue: AuthContextType = {
    ...state,
    register,
    login,
    verifyOTP,
    resendOTP,
    logout,
    refreshToken,
    clearError,
    updateUser,
    getAuthHeader,
    isTokenExpired,
  };

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
