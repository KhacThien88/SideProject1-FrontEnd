import React, { useState, useCallback } from 'react';
import { feedbackService } from '../../services/api';
import type { FeedbackSubmissionRequest, QuickFeedbackRequest } from '../../services/api';
import { useApiStatus } from '../../hooks/api/useApiStatus';
import { ErrorMessage } from '../shared/ErrorMessage';
import { designSystem } from '../../styles/tokens';
// import { Button } from '../ui/Button';

export interface FeedbackFormProps {
  featureName?: string;
  onSubmitSuccess?: (feedbackId: string) => void;
  onCancel?: () => void;
  variant?: 'full' | 'quick' | 'modal';
  className?: string;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  featureName = '',
  onSubmitSuccess,
  onCancel,
  variant = 'full',
  className = '',
}) => {
  const [formData, setFormData] = useState<FeedbackSubmissionRequest>({
    feature: featureName,
    rating: 5,
    comments: '',
    category: 'improvement',
    urgency: 'low',
    contact_for_followup: false,
  });

  const submitStatus = useApiStatus();

  const availableFeatures = feedbackService.getAvailableFeatures();

  const handleInputChange = useCallback((
    field: keyof FeedbackSubmissionRequest,
    value: any
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitStatus.execute(() => 
      feedbackService.submitFeedback(formData)
    );

    if (result) {
      onSubmitSuccess?.(result.feedback_id);
      
      // Reset form
      setFormData({
        feature: featureName,
        rating: 5,
        comments: '',
        category: 'improvement',
        urgency: 'low',
        contact_for_followup: false,
      });
    }
  }, [formData, submitStatus, onSubmitSuccess, featureName]);

  const handleQuickSubmit = useCallback(async (rating: 1 | 2 | 3 | 4 | 5, quickComment?: string) => {
    const quickFeedback: QuickFeedbackRequest = {
      feature: formData.feature,
      rating,
      quick_comment: quickComment as any,
    };

    const result = await submitStatus.execute(() =>
      feedbackService.submitQuickFeedback(quickFeedback)
    );

    if (result) {
      onSubmitSuccess?.(result.feedback_id);
    }
  }, [formData.feature, submitStatus, onSubmitSuccess]);

  const getRatingEmoji = (rating: number): string => {
    const emojis = ['😡', '😞', '😐', '🙂', '😍'];
    return emojis[rating - 1] || '😐';
  };

  if (variant === 'quick') {
    return (
      <div className={`bg-white rounded-lg border shadow-sm p-4 ${className}`}>
        <h3 className="font-medium text-gray-900 mb-3">
          💬 Quick Feedback
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feature
            </label>
            <select
              value={formData.feature}
              onChange={(e) => handleInputChange('feature', e.target.value)}
              className={designSystem.forms.input}
            >
              {availableFeatures.map((feature) => (
                <option key={feature.value} value={feature.value}>
                  {feature.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleQuickSubmit(rating as any)}
                  disabled={submitStatus.isLoading}
                  className="flex flex-col items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-2xl">{getRatingEmoji(rating)}</span>
                  <span className="text-xs text-gray-600">{rating}★</span>
                </button>
              ))}
            </div>
          </div>

          {submitStatus.isLoading && (
            <div className="flex items-center text-sm text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
              Sending feedback...
            </div>
          )}
        </div>

        {submitStatus.error && (
          <div className="mt-3">
            <ErrorMessage error={submitStatus.error} variant="inline" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            💬 Submit Feedback
          </h2>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="feature" className="block text-sm font-medium text-gray-700 mb-1">
              Feature <span className="text-red-500">*</span>
            </label>
            <select
              id="feature"
              value={formData.feature}
              onChange={(e) => handleInputChange('feature', e.target.value)}
              className={designSystem.forms.input}
              required
            >
              <option value="">Select a feature</option>
              {availableFeatures.map((feature) => (
                <option key={feature.value} value={feature.value}>
                  {feature.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleInputChange('rating', rating)}
                  className={`text-2xl transition-colors ${
                    rating <= formData.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                >
                  ⭐
                </button>
              ))}
              <span className="ml-3 text-sm text-gray-600">
                {feedbackService.getRatingDisplayText(formData.rating)}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              Comments
            </label>
            <textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => handleInputChange('comments', e.target.value)}
              rows={4}
              className={designSystem.forms.textarea}
              placeholder="Tell us about your experience..."
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.comments?.length || 0}/2000 characters
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={designSystem.forms.input}
              >
                <option value="improvement">Improvement</option>
                <option value="bug_report">Bug Report</option>
                <option value="feature_request">Feature Request</option>
                <option value="praise">Praise</option>
                <option value="complaint">Complaint</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
                Urgency
              </label>
              <select
                id="urgency"
                value={formData.urgency}
                onChange={(e) => handleInputChange('urgency', e.target.value)}
                className={designSystem.forms.input}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="contact_for_followup"
              checked={formData.contact_for_followup}
              onChange={(e) => handleInputChange('contact_for_followup', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="contact_for_followup" className="ml-2 text-sm text-gray-700">
              I'm available for follow-up questions
            </label>
          </div>

          {submitStatus.error && (
            <ErrorMessage error={submitStatus.error} variant="card" />
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={submitStatus.isLoading || !formData.feature || !formData.rating}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {submitStatus.isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>📤 Submit Feedback</>
              )}
            </button>
            
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {submitStatus.isSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex">
              <span className="text-green-600 mr-2">✅</span>
              <div className="text-sm text-green-800">
                <p className="font-medium">Feedback submitted successfully!</p>
                <p>Thank you for helping us improve our service.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
