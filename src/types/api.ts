// Common API response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ApiError {
  detail: string;
  status_code: number;
  error_code?: string;
}

// Common request types
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface SearchParams extends PaginationParams {
  keywords?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

// File upload types
export interface FileUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface FileValidation {
  valid: boolean;
  error?: string;
  warnings?: string[];
}

// Authentication types
export interface AuthHeaders {
  'Authorization': string;
  'Content-Type'?: string;
}

// Status types
export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
export type ApplicationStatus = 'submitted' | 'under_review' | 'interview' | 'accepted' | 'rejected' | 'withdrawn';
export type JobStatus = 'active' | 'inactive' | 'archived' | 'expired';
export type UserStatus = 'active' | 'inactive' | 'pending_verification' | 'suspended';

// Common utility types
export interface DateRange {
  start_date: string;
  end_date: string;
}

export interface Location {
  city?: string;
  state?: string;
  country?: string;
  remote?: boolean;
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  negotiable?: boolean;
}

// Export format types
export type ExportFormat = 'json' | 'csv' | 'pdf' | 'xlsx';

// Notification types
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'job_match' | 'application_update' | 'system';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';
export type FontSize = 'small' | 'medium' | 'large';
export type Language = 'vi' | 'en';

// Role types
export type UserRole = 'candidate' | 'recruiter' | 'admin';

// Job types
export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'FREELANCE';
export type ExperienceLevel = 'ENTRY' | 'JUNIOR' | 'MIDDLE' | 'SENIOR' | 'LEAD' | 'EXECUTIVE';

// CV types
export type CVStatus = 'uploading' | 'uploaded' | 'analyzing' | 'analyzed' | 'failed';
export type FileType = 'pdf' | 'doc' | 'docx' | 'jpg' | 'jpeg' | 'png';

// Analytics types
export interface AnalyticsData {
  period: string;
  value: number;
  change?: number;
  change_percentage?: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
}

// WebSocket types
export interface WebSocketMessage<T = any> {
  type: string;
  data: T;
  timestamp: string;
}

export interface ConnectionStatus {
  connected: boolean;
  reconnecting: boolean;
  last_connected?: string;
  error?: string;
}