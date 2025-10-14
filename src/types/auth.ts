// API Types for Authentication
export interface UserRegisterRequest {
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
  phone?: string;
  role: 'candidate' | 'recruiter' | 'admin';
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface OTPVerificationRequest {
  email: string;
  otp_code: string;
}

export interface ResendOTPRequest {
  email: string;
}

export interface UserResponse {
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'candidate' | 'recruiter' | 'admin';
  status: 'active' | 'inactive' | 'pending_verification' | 'suspended';
  email_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
  google_id?: string;
  auth_provider: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: UserResponse;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface GoogleAuthRequest {
  google_token: string;
}

export interface GoogleAuthResponse {
  status: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: UserResponse;
  is_new_user: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  status?: string;
  email?: string;
}

export interface ApiError {
  detail: string;
  status_code?: number;
}

// Auth Context Types
export interface AuthUser {
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'candidate' | 'recruiter' | 'admin';
  status: 'active' | 'inactive' | 'pending_verification' | 'suspended';
  email_verified: boolean;
  auth_provider: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface GoogleRegistrationData {
  googleToken: string;
  role: 'candidate' | 'recruiter';
}
