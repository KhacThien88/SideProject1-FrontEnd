import React, { useState, useCallback } from 'react';
import { feedbackService } from '../../services/api';
import type { QuickFeedbackRequest } from '../../services/api';
import { useApiStatus } from '../../hooks/api/useApiStatus';

export interface FeedbackWidgetProps {
  featureName: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'inline';
  showOnHover?: boolean;
  compact?: boolean;
  className?: string;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  featureName,
  position = 'bottom-right',
  showOnHover = false,
  compact = false,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(!showOnHover);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  
  const submitStatus = useApiStatus();

  const handleQuickFeedback = useCallback(async (rating: 1 | 2 | 3 | 4 | 5) => {
    const quickFeedback: QuickFeedbackRequest = {
      feature: featureName,
      rating,
    };

    const result = await submitStatus.execute(() =>
      feedbackService.submitQuickFeedback(quickFeedback)
    );

    if (result) {
      setSelectedRating(rating);
      setTimeout(() => {
        setIsExpanded(false);
        setSelectedRating(null);
      }, 2000);
    }
  }, [featureName, submitStatus]);

  const getRatingEmoji = (rating: number): string => {
    const emojis = ['😡', '😞', '😐', '🙂', '😍'];
    return emojis[rating - 1] || '😐';
  };

  const getPositionClasses = (): string => {
    if (position === 'inline') return '';
    
    const positions = {
      'bottom-right': 'fixed bottom-4 right-4 z-50',
      'bottom-left': 'fixed bottom-4 left-4 z-50',
      'top-right': 'fixed top-4 right-4 z-50',
      'top-left': 'fixed top-4 left-4 z-50',
    };
    
    return positions[position] || positions['bottom-right'];
  };

  const renderCompactWidget = () => (
    <div
      className={`${getPositionClasses()} ${className}`}
      onMouseEnter={() => showOnHover && setIsVisible(true)}
      onMouseLeave={() => showOnHover && setIsVisible(false)}
    >
      {isVisible && (
        <div className="bg-white rounded-lg shadow-lg border max-w-xs">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">💬</span>
                <span className="text-sm font-medium text-gray-900">
                  How's this feature?
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Quick feedback for {feedbackService.getAvailableFeatures().find(f => f.value === featureName)?.label || featureName}
              </div>
            </button>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900">Rate this feature</span>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-xs">✕</span>
                </button>
              </div>

              {submitStatus.isSuccess && selectedRating ? (
                <div className="text-center py-2">
                  <div className="text-2xl mb-2">{getRatingEmoji(selectedRating)}</div>
                  <div className="text-sm text-green-600 font-medium">
                    Thanks for your feedback!
                  </div>
                </div>
              ) : (
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleQuickFeedback(rating as any)}
                      disabled={submitStatus.isLoading}
                      className="p-1 hover:scale-110 transition-transform disabled:opacity-50"
                      title={`${rating} stars`}
                    >
                      <span className="text-xl">{getRatingEmoji(rating)}</span>
                    </button>
                  ))}
                </div>
              )}

              {submitStatus.isLoading && (
                <div className="text-center py-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mx-auto"></div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderFullWidget = () => (
    <div
      className={`${getPositionClasses()} ${className}`}
      onMouseEnter={() => showOnHover && setIsVisible(true)}
      onMouseLeave={() => showOnHover && setIsVisible(false)}
    >
      {isVisible && (
        <div className="bg-white rounded-lg shadow-lg border p-4 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-medium text-gray-900">💬 Feedback</h3>
              <p className="text-xs text-gray-500">
                {feedbackService.getAvailableFeatures().find(f => f.value === featureName)?.label || featureName}
              </p>
            </div>
            {!showOnHover && (
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-sm">✕</span>
              </button>
            )}
          </div>

          {submitStatus.isSuccess && selectedRating ? (
            <div className="text-center py-4">
              <div className="text-3xl mb-2">{getRatingEmoji(selectedRating)}</div>
              <div className="text-sm text-green-600 font-medium mb-1">
                Thank you for your feedback!
              </div>
              <div className="text-xs text-gray-500">
                Your input helps us improve
              </div>
            </div>
          ) : (
            <div>
              <div className="text-sm text-gray-700 mb-3">
                How would you rate this feature?
              </div>
              
              <div className="grid grid-cols-5 gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleQuickFeedback(rating as any)}
                    disabled={submitStatus.isLoading}
                    className="flex flex-col items-center p-2 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    <span className="text-lg">{getRatingEmoji(rating)}</span>
                    <span className="text-xs text-gray-600">{rating}</span>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <a
                  href="/feedback"
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Detailed feedback
                </a>
              </div>
            </div>
          )}

          {submitStatus.isLoading && (
            <div className="flex items-center justify-center py-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
              <span className="text-sm text-gray-600">Sending...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (position === 'inline') {
    return (
      <div className={`inline-block ${className}`}>
        {compact ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="mr-1">💬</span>
            Feedback
          </button>
        ) : (
          <div className="bg-white border rounded-lg p-3">
            <div className="text-sm font-medium text-gray-900 mb-2">
              Quick Feedback
            </div>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleQuickFeedback(rating as any)}
                  disabled={submitStatus.isLoading}
                  className="text-lg hover:scale-110 transition-transform disabled:opacity-50"
                >
                  {getRatingEmoji(rating)}
                </button>
              ))}
            </div>
            {submitStatus.isSuccess && (
              <div className="text-xs text-green-600 mt-1">Thank you!</div>
            )}
          </div>
        )}
      </div>
    );
  }

  return compact ? renderCompactWidget() : renderFullWidget();
};

export default FeedbackWidget;
