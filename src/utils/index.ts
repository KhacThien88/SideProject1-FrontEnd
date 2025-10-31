/**
 * Utilities Index
 * Central export for all utility modules
 */

// Performance Monitoring
export {
  performanceMonitor,
  realTimeMonitor,
  performanceTester,
  regressionDetector,
  preloadCriticalResources,
  optimizeImages,
  checkPerformanceBudget,
  type WebVitals,
  type PerformanceMetrics,
  type PerformanceBudget,
  type PerformanceAlert,
  type PerformanceTestResult,
  type RegressionReport,
} from './performance';

// Error Monitoring
export {
  errorMonitor,
  sessionRecorder,
  errorAlerter,
  type ErrorContext,
  type ErrorLog,
  type ErrorStats,
  type AlertRule,
} from './errorMonitoring';

// Content Management
export {
  contentManager,
  multiLangContentManager,
  type ContentVersion,
  type ContentApproval,
  type ContentMetadata,
} from './contentManagement';

// System Monitoring
export {
  systemMonitor,
  backupManager,
  loadTester,
  type SystemHealth,
  type Alert,
} from './monitoring';

// Debug Tools
export {
  debugLogger,
  debugPanel,
  networkMonitor,
  initializeDebugTools,
} from './debugTools';

// Content Error Handler
export {
  ContentErrorHandler,
  validateContent,
  type ContentValidationResult,
} from './contentErrorHandler';

// Accessibility
export { accessibility } from './accessibility';

// SEO
export { generateSitemapXML } from './sitemap';

// A/B Testing
export {
  abTestManager,
  type ABTestConfig,
  type ABTestResult,
} from './abTesting';

// Conversion Tracking
export { conversionTracker } from './conversionTracking';

// Lead Scoring
export { type LeadScore } from './leadScoring';
