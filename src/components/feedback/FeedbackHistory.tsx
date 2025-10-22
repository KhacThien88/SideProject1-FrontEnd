import React, { useState, useEffect, useCallback } from 'react';
import { feedbackService } from '../../services/api';
import type { FeedbackResponse, FeedbackListFilters } from '../../services/api';
import { StatusDisplay } from '../shared/StatusDisplay';
import { ErrorMessage } from '../shared/ErrorMessage';
import { usePaginatedApiStatus } from '../../hooks/api/useApiStatus';

export interface FeedbackHistoryProps {
  onSelectFeedback?: (feedback: FeedbackResponse) => void;
  onEditFeedback?: (feedbackId: string) => void;
  refreshTrigger?: number;
  className?: string;
}

export const FeedbackHistory: React.FC<FeedbackHistoryProps> = ({
  onSelectFeedback,
  onEditFeedback,
  refreshTrigger,
  className = '',
}) => {
  const [filters, setFilters] = useState<Partial<FeedbackListFilters>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

  const {
    items: feedbacks,
    total,
    page,
    hasNext,
    hasPrev,
    isLoading,
    error,
    loadPage,
    nextPage,
    prevPage,
  } = usePaginatedApiStatus<FeedbackResponse>(1, 10);

  // Load feedbacks with current filters
  const loadFeedbacks = useCallback((newPage?: number) => {
    const currentFilters = {
      ...filters,
      search: searchTerm || undefined,
    };

    return loadPage(
      (page, limit) => 
        feedbackService.getFeedbackList(page, limit, currentFilters)
          .then(response => ({
            items: response.feedbacks,
            total: response.total,
            page: response.page,
            limit: response.limit,
            hasNext: response.has_next,
            hasPrev: response.has_prev,
          })),
      newPage
    );
  }, [loadPage, filters, searchTerm]);

  // Load on mount and when filters change
  useEffect(() => {
    loadFeedbacks();
  }, [loadFeedbacks, refreshTrigger]);

  const handleSelectFeedback = useCallback((feedback: FeedbackResponse) => {
    setSelectedFeedback(feedback.feedback_id);
    onSelectFeedback?.(feedback);
  }, [onSelectFeedback]);

  const handleFilterChange = useCallback((newFilters: Partial<FeedbackListFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const formatDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Vừa xong';
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return diffInDays < 7 ? `${diffInDays} ngày trước` : date.toLocaleDateString('vi-VN');
    }
  }, []);

  const getRatingStars = useCallback((rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  }, []);

  if (error) {
    return (
      <div className={className}>
        <ErrorMessage
          error={error}
          type="server"
          retryAction={() => loadFeedbacks()}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            💬 My Feedback History
          </h2>
          
          <button
            onClick={() => loadFeedbacks()}
            disabled={isLoading}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent mr-2"></div>
                Loading...
              </>
            ) : (
              <>🔄 Refresh</>
            )}
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={filters.feature || ''}
              onChange={(e) => handleFilterChange({ feature: e.target.value || undefined })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Features</option>
              {feedbackService.getAvailableFeatures().map((feature) => (
                <option key={feature.value} value={feature.value}>
                  {feature.label}
                </option>
              ))}
            </select>
            
            <select
              value={filters.status || ''}
              onChange={(e) => handleFilterChange({ status: e.target.value || undefined })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="in_review">In Review</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            
            <select
              value={filters.rating?.toString() || ''}
              onChange={(e) => handleFilterChange({ rating: e.target.value ? parseInt(e.target.value) : undefined })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Ratings</option>
              {[1, 2, 3, 4, 5].map(rating => (
                <option key={rating} value={rating}>
                  {rating} Stars
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && feedbacks.length === 0 && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading feedback...</span>
        </div>
      )}

      {/* Feedback List */}
      {!isLoading && feedbacks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No feedback found
          </h3>
          <p className="text-gray-500">
            You haven't submitted any feedback yet. Share your thoughts to help us improve!
          </p>
        </div>
      ) : (
        <>
          {/* Feedback Items */}
          <div className="divide-y divide-gray-200">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.feedback_id}
                className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedFeedback === feedback.feedback_id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => handleSelectFeedback(feedback)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-gray-900">
                        {feedbackService.getAvailableFeatures().find(f => f.value === feedback.feature)?.label || feedback.feature}
                      </span>
                      
                      <div className="text-sm text-yellow-500">
                        {getRatingStars(feedback.rating)}
                      </div>
                      
                      <StatusDisplay
                        status={feedback.status}
                        size="sm"
                        variant="badge"
                      />
                    </div>

                    {feedback.comments && (
                      <div className="text-sm text-gray-700 mb-2 line-clamp-2">
                        {feedback.comments}
                      </div>
                    )}

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Category: {feedbackService.getCategoryDisplayText(feedback.category)}</span>
                      <span>•</span>
                      <span>Submitted: {formatDate(feedback.created_at)}</span>
                      {feedback.updated_at !== feedback.created_at && (
                        <>
                          <span>•</span>
                          <span>Updated: {formatDate(feedback.updated_at)}</span>
                        </>
                      )}
                    </div>

                    {/* Admin Response */}
                    {feedback.admin_response && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex items-start">
                          <span className="text-blue-600 mr-2">👨‍💼</span>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-blue-900">Admin Response:</div>
                            <div className="text-sm text-blue-800 mt-1">{feedback.admin_response}</div>
                            {feedback.admin_responded_at && (
                              <div className="text-xs text-blue-600 mt-1">
                                {formatDate(feedback.admin_responded_at)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {feedback.status === 'submitted' && onEditFeedback && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditFeedback(feedback.feedback_id);
                        }}
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit Feedback"
                      >
                        <span className="text-sm">✏️</span>
                      </button>
                    )}
                    
                    <div className={`
                      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${feedbackService.getUrgencyColor(feedback.urgency) === 'red' ? 'bg-red-100 text-red-800' :
                        feedbackService.getUrgencyColor(feedback.urgency) === 'orange' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'}
                    `}>
                      {feedback.urgency}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedFeedback === feedback.feedback_id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Feedback ID:</span>
                        <span className="ml-2 text-gray-600 font-mono">{feedback.feedback_id}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Contact for follow-up:</span>
                        <span className="ml-2 text-gray-600">
                          {feedback.contact_for_followup ? 'Yes' : 'No'}
                        </span>
                      </div>
                      {feedback.resolution_notes && (
                        <div className="md:col-span-2">
                          <span className="font-medium text-gray-700">Resolution Notes:</span>
                          <div className="mt-1 text-gray-600">{feedback.resolution_notes}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {total > 10 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {((page - 1) * 10) + 1} - {Math.min(page * 10, total)} of {total} feedbacks
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => prevPage()}
                    disabled={!hasPrev}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-sm text-gray-700">
                    Page {page}
                  </span>
                  <button
                    onClick={() => nextPage()}
                    disabled={!hasNext}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackHistory;
