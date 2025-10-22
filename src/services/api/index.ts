// CV Management
export { cvUploadService } from './cv/cvUploadService';
export { cvAnalysisService } from './cv/cvAnalysisService';

// Text Extraction
export { textractService } from './textract/textractService';

// Job Description Upload
export { jdUploadService } from './jd/jdUploadService';

// Feedback System
export { feedbackService } from './feedback/feedbackService';

// Admin Management
export { adminService } from './admin/adminService';

// CV Admin Management
export { cvAdminService } from './cvAdmin/cvAdminService';

// Job Management
export { jobPostingService } from './jobPosting/jobPostingService';
export { jobMatchingService } from './jobs/jobMatchingService';

// Applications
export { applicationService } from './applications/applicationService';

// Notifications
export { notificationService } from './notifications/notificationService';
export { realTimeNotificationService } from './notifications/realTimeNotifications';

// Settings & Profile
export { settingsService } from './settings/settingsService';

// Saved Jobs (existing)
export { savedJobsService } from './jobs/savedJobsService';

// Candidate Matching
export { candidateMatchService } from './candidateMatch/candidateMatchService';

// Auth (existing)
export { AuthApiService, TokenManager, ApiErrorHandler } from './authService';

// Types
export * from '../../types/api';

// Re-export specific types for convenience
export type {
  CVUploadResponse,
  CVUploadStatusResponse,
  CVListItem,
} from './cv/cvUploadService';

export type {
  TextExtractionRequest,
  TextExtractionResponse,
  ExtractionStatusResponse,
  ExtractionResultResponse,
  ExtractionStatusCallback,
  PollingOptions,
} from './textract/textractService';

export type {
  JDUploadRequest,
  JDUploadResponse,
  JDUploadStatusResponse,
  JDFileInfo,
  JDListResponse,
  JDListFilters,
  FileValidationResult,
  UploadProgress,
  BulkUploadResult,
} from './jd/jdUploadService';

export type {
  FeedbackSubmissionRequest,
  FeedbackResponse,
  FeedbackListResponse,
  FeedbackListFilters,
  FeedbackUpdateRequest,
  FeedbackStatistics,
  QuickFeedbackRequest,
} from './feedback/feedbackService';

export type {
  AdminUser,
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
  UserListFilters,
  DashboardStats,
  SystemHealthResponse,
  AuditLogEntry,
  AuditLogResponse,
  AuditLogFilters,
  BulkUserOperation,
  BulkOperationResult,
} from './admin/adminService';

export type {
  AdminCVInfo,
  CVAdminListResponse,
  CVAdminListFilters,
  CVUpdateRequest,
  CVAnalytics,
  BulkCVOperation,
  BulkCVOperationResult,
  CVQualityReport,
} from './cvAdmin/cvAdminService';

export type {
  CVAnalysisResult,
  CVSearchRequest,
  CVSearchResult,
} from './cv/cvAnalysisService';

export type {
  JobProfileResponse,
  JobProfileSearchRequest,
} from './jobPosting/jobPostingService';

export type {
  JobMatchRequest,
  JobMatchResult,
  JobMatchResponse,
  JobApplicationRequest,
  JobApplicationResponse,
} from './jobs/jobMatchingService';

export type {
  Application,
  CreateApplicationRequest,
  UpdateApplicationRequest,
  ApplicationStats,
} from './applications/applicationService';

export type {
  Notification,
  CreateNotificationRequest,
  NotificationStats,
} from './notifications/notificationService';

export type {
  NotificationEventData,
  NotificationEventHandler,
} from './notifications/realTimeNotifications';