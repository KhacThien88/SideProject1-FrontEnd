// User interface representing authenticated user data
export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'candidate' | 'recruiter' | 'admin';
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  // Google OAuth specific fields
  googleId?: string;
  provider?: 'email' | 'google';
}

// Authentication state interface
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean; // Track if auth state has been initialized
}

// Login credentials interface
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Registration data interface
export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone?: string;
  role: 'candidate' | 'recruiter';
  acceptTerms: boolean;
}

// Auth response from API
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // Token expiry in seconds
  message?: string;
}

// Refresh token response
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user?: User; // Optional updated user info
}

// Google OAuth response
export interface GoogleAuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Token data for storage
export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expiresAt: number; // Calculated expiry timestamp
}

// Google user info from OAuth
export interface GoogleUserInfo {
  sub: string; // Google user ID
  email: string;
  name: string;
  picture?: string;
  email_verified: boolean;
  given_name?: string;
  family_name?: string;
}

// Auth context interface
export interface AuthContextType {
  // State properties from AuthState
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  // Methods
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
  
  // Utils
  isTokenExpired: () => boolean;
  hasRole: (role: string | string[]) => boolean;
}

// Auth action types for reducer
export type AuthAction =
  | { type: 'AUTH_INIT_START' }
  | { type: 'AUTH_INIT_SUCCESS'; payload: { user: User | null; isAuthenticated: boolean } }
  | { type: 'AUTH_INIT_ERROR'; payload: string }
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; isAuthenticated: boolean } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

// API Error response interface
export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  details?: any;
}

// Authentication error with additional properties
export interface AuthError extends Error {
  code?: string;
  status?: number;
  isAuthError?: boolean;
  isNetworkError?: boolean;
  timestamp?: string;
}

// OAuth provider types
export type OAuthProvider = 'google' | 'facebook' | 'github';

// OAuth configuration
export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  scope?: string;
}

// Route protection configuration
export interface RouteProtection {
  requireAuth?: boolean;
  roles?: string[];
  redirectTo?: string;
}

// All interfaces and types are exported above individually
