// CV Management
export { cvUploadService } from './cv/cvUploadService';
export { cvAnalysisService } from './cv/cvAnalysisService';

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