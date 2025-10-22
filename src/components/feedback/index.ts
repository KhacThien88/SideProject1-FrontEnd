/**
 * Feedback Components - Central Export
 */

export { FeedbackForm } from './FeedbackForm';
export type { FeedbackFormProps } from './FeedbackForm';

export { FeedbackHistory } from './FeedbackHistory';
export type { FeedbackHistoryProps } from './FeedbackHistory';

export { FeedbackWidget } from './FeedbackWidget';
export type { FeedbackWidgetProps } from './FeedbackWidget';

// Re-export for convenience
export {
  FeedbackForm as Form,
  FeedbackHistory as History,
  FeedbackWidget as Widget,
} from './index';
