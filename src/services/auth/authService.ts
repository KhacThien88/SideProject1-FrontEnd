import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  RefreshTokenResponse, 
  User,
  GoogleAuthResponse
} from '../../contexts/auth/authTypes';
import { tokenService } from './tokenService';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for automatic token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenService.getRefreshToken();
        if (refreshToken) {
          // Attempt to refresh token
          const response = await authService.refreshToken();
          
          // Update stored tokens
          tokenService.setTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            expiresIn: response.expiresIn,
            expiresAt: Date.now() + (response.expiresIn * 1000)
          });

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        tokenService.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

class AuthService {
  // Login with email and password
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Register new user
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post('/auth/register', data);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Refresh access token
  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response: AxiosResponse<RefreshTokenResponse> = await api.post('/auth/refresh', {
        refreshToken,
      });

      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Logout (invalidate tokens on server)
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error: any) {
      // Continue with local logout even if server logout fails
      console.error('Server logout failed:', error);
    }
  }

  // Get current user info
  async getCurrentUser(): Promise<{ user: User }> {
    try {
      const response: AxiosResponse<{ user: User }> = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Google OAuth login - sends credential to backend for verification
  async googleSignIn(credential: string): Promise<GoogleAuthResponse> {
    try {
      const response: AxiosResponse<GoogleAuthResponse> = await api.post('/auth/google', {
        credential,
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(token: string, password: string): Promise<void> {
    try {
      await api.post('/auth/reset-password', { token, password });
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    try {
      await api.post('/auth/verify-email', { token });
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Resend verification email
  async resendVerificationEmail(): Promise<void> {
    try {
      await api.post('/auth/resend-verification');
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await api.post('/auth/change-password', { currentPassword, newPassword });
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<{ user: User }> {
    try {
      const response: AxiosResponse<{ user: User }> = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Handle API errors
  private handleError(error: any): void {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 401) {
        // Unauthorized - token may be expired
        console.error('Authentication failed');
      } else if (status === 403) {
        // Forbidden
        console.error('Access forbidden');
      } else if (status >= 500) {
        // Server error
        console.error('Server error:', data.message || 'Internal server error');
      }
      
      // Attach meaningful error message
      error.message = data.message || `Request failed with status ${status}`;
    } else if (error.request) {
      // Network error
      error.message = 'Network error. Please check your connection.';
    } else {
      // Other error
      error.message = error.message || 'An unexpected error occurred';
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
