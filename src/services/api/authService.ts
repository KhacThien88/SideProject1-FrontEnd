import type {
  UserRegisterRequest,
  UserLoginRequest,
  OTPVerificationRequest,
  TokenResponse,
  GoogleAuthResponse,
  ApiResponse,
  ApiError,
  UserResponse,
} from '../../types/auth';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
const API_TIMEOUT = 10000; // 10 seconds

// Token refresh queue to prevent race conditions
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
}

// HTTP Client with error handling
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.timeout),
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          detail: `HTTP ${response.status}: ${response.statusText}`,
          status_code: response.status,
        }));
        
        // Create enhanced error with status code
        const error: any = new Error(errorData.detail);
        error.response = {
          status: response.status,
          data: errorData
        };
        throw error;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout. Please try again.');
        }
        throw error;
      }
      throw new Error('Network error. Please check your connection.');
    }
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers,
    });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  async delete<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers,
    });
  }
}

// Create API client instance
const apiClient = new ApiClient(API_BASE_URL);

// Authentication API Services
export class AuthApiService {
  /**
   * Register a new user account
   */
  static async register(userData: UserRegisterRequest): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/register', userData);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Login user and get tokens
   */
  static async login(loginData: UserLoginRequest): Promise<TokenResponse> {
    try {
      const response = await apiClient.post<TokenResponse>('/auth/login', loginData);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Verify OTP code for email verification
   */
  static async verifyOTP(otpData: OTPVerificationRequest): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/verify-otp', otpData);
      return response;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  }

  /**
   * Resend OTP verification code
   */
  static async resendOTP(email: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/resend-otp', { email });
      return response;
    } catch (error) {
      console.error('Resend OTP error:', error);
      throw error;
    }
  }

  /**
   * Refresh access token with queue to prevent race conditions
   */
  static async refreshToken(refreshToken: string): Promise<TokenResponse> {
    // If already refreshing, wait for the current refresh to complete
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          // Get cached user info
          const cachedUser = TokenManager.getUserInfo();
          resolve({
            access_token: token,
            refresh_token: refreshToken,
            expires_in: 3600,
            token_type: 'bearer',
            user: cachedUser || {} as any
          });
        });
      });
    }

    isRefreshing = true;

    try {
      const response = await apiClient.post<TokenResponse>('/auth/refresh', {
        refresh_token: refreshToken,
      });
      
      // Store new tokens
      TokenManager.storeTokens(response);
      
      // Store user info if present
      if (response.user) {
        TokenManager.storeUserInfo(response.user);
      }
      
      // Notify all waiting requests
      onTokenRefreshed(response.access_token);
      
      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      
      // Clear tokens on refresh failure
      TokenManager.clearTokens();
      
      throw error;
    } finally {
      isRefreshing = false;
    }
  }

  /**
   * Logout user
   */
  static async logout(accessToken: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>(
        '/auth/logout',
        {},
        {
          Authorization: `Bearer ${accessToken}`,
        }
      );
      return response;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  /**
   * Get current user information
   */
  static async getCurrentUser(accessToken: string): Promise<UserResponse> {
    try {
      const response = await apiClient.get<UserResponse>(
        '/auth/me',
        {
          Authorization: `Bearer ${accessToken}`,
        }
      );
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  /**
   * Google OAuth authentication
   */
  static async googleAuth(googleToken: string): Promise<GoogleAuthResponse> {
    try {
      const response = await apiClient.post<any>('/auth/google-auth', {
        google_token: googleToken,
      }, {
        'X-Google-Client-Id': (import.meta as any)?.env?.VITE_GOOGLE_CLIENT_ID || '',
        'X-Page-Origin': (typeof window !== 'undefined' ? window.location.origin : ''),
      });
      
      // Handle backend flow that returns 202 with { detail: 'ROLE_SELECTION_REQUIRED' }
      if (response && typeof response === 'object' && 'detail' in response && response.detail === 'ROLE_SELECTION_REQUIRED') {
        // Throw a special error so upper layers can navigate to role selection
        throw new Error('ROLE_SELECTION_REQUIRED');
      }
      
      return response;
    } catch (error) {
      console.error('Google auth error:', error);
      throw error;
    }
  }

  /**
   * Complete Google registration with role selection
   */
  static async completeGoogleRegistration(userData: {
    googleToken: string;
    role: 'candidate' | 'recruiter';
  }): Promise<TokenResponse> {
    try {
      const response = await apiClient.post<TokenResponse>('/auth/google-complete-registration', {
        google_token: userData.googleToken,
        role: userData.role,
      });
      return response;
    } catch (error) {
      console.error('Complete Google registration error:', error);
      throw error;
    }
  }

  /**
   * Forgot password
   */
  static async forgotPassword(email: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>(
        '/auth/forgot-password',
        { email }
      );
      return response;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  /**
   * Reset password
   */
  static async resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>(
        '/auth/reset-password',
        { token, new_password: newPassword }
      );
      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }
}

// Utility functions for token management
export class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly TOKEN_EXPIRY_KEY = 'token_expiry';
  private static readonly USER_INFO_KEY = 'user_info';

  /**
   * Store tokens in localStorage
   */
  static storeTokens(tokens: { access_token: string; refresh_token: string; expires_in: number }): void {
    try {
      const expiryTime = Date.now() + (tokens.expires_in * 1000);
      
      localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access_token);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh_token);
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
    } catch (error) {
      console.error('Error storing tokens:', error);
    }
  }

  /**
   * Store user info in localStorage
   */
  static storeUserInfo(user: any): void {
    try {
      localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error storing user info:', error);
    }
  }

  /**
   * Get stored user info
   */
  static getUserInfo(): any | null {
    try {
      const userInfo = localStorage.getItem(this.USER_INFO_KEY);
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error('Error getting user info:', error);
      return null;
    }
  }

  /**
   * Get stored access token
   */
  static getAccessToken(): string | null {
    try {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  /**
   * Get stored refresh token
   */
  static getRefreshToken(): string | null {
    try {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(): boolean {
    try {
      const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
      if (!expiryTime) return true;
      
      return Date.now() >= parseInt(expiryTime);
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true;
    }
  }

  /**
   * Clear all stored tokens
   */
  static clearTokens(): void {
    try {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
      localStorage.removeItem(this.USER_INFO_KEY);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  /**
   * Get authorization header
   */
  static getAuthHeader(): Record<string, string> | null {
    const token = this.getAccessToken();
    if (!token) return null;
    
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}

// Error handling utilities
export class ApiErrorHandler {
  /**
   * Handle API errors and return user-friendly messages
   */
  static handleError(error: any): string {
    if (typeof error === 'string') {
      return error;
    }

    if (error?.message) {
      // Handle specific error messages
      const message = error.message.toLowerCase();
      
      if (message.includes('timeout')) {
        return 'Kết nối quá chậm. Vui lòng thử lại.';
      }
      
      if (message.includes('network')) {
        return 'Lỗi kết nối mạng. Vui lòng kiểm tra internet.';
      }
      
      if (message.includes('unauthorized')) {
        return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
      }
      
      if (message.includes('forbidden')) {
        return 'Bạn không có quyền truy cập.';
      }
      
      if (message.includes('not found')) {
        return 'Không tìm thấy dữ liệu.';
      }
      
      if (message.includes('validation')) {
        return 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.';
      }
      
      if (message.includes('email')) {
        return 'Email không hợp lệ hoặc đã được sử dụng.';
      }
      
      if (message.includes('password')) {
        return 'Mật khẩu không đúng hoặc không đủ mạnh.';
      }
      
      if (message.includes('otp')) {
        return 'Mã OTP không đúng hoặc đã hết hạn.';
      }
      
      if (message.includes('token') && message.includes('invalid')) {
        return 'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.';
      }
      
      if (message.includes('token') && message.includes('expired')) {
        return 'Liên kết đặt lại mật khẩu đã hết hạn. Vui lòng yêu cầu liên kết mới.';
      }
      
      if (message.includes('user not found')) {
        return 'Không tìm thấy tài khoản với email này.';
      }
      
      return error.message;
    }

    return 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.';
  }

  /**
   * Check if error is network related
   */
  static isNetworkError(error: any): boolean {
    return error?.message?.toLowerCase().includes('network') ||
           error?.message?.toLowerCase().includes('timeout') ||
           error?.message?.toLowerCase().includes('fetch');
  }

  /**
   * Check if error is authentication related
   */
  static isAuthError(error: any): boolean {
    return error?.message?.toLowerCase().includes('unauthorized') ||
           error?.message?.toLowerCase().includes('forbidden') ||
           error?.message?.toLowerCase().includes('token');
  }
}

// Export default API service
export default AuthApiService;
