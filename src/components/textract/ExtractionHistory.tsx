import React, { useState, useEffect, useCallback } from 'react';
import { useTextract } from '../../hooks/api/useTextract';
import { StatusDisplay } from '../shared/StatusDisplay';
import { ErrorMessage } from '../shared/ErrorMessage';
// import type { ExtractionStatusResponse } from '../../services/api';

export interface ExtractionHistoryProps {
  onSelectExtraction?: (extractionId: string) => void;
  onViewResult?: (extractionId: string) => void;
  refreshTrigger?: number;
  className?: string;
}

export const ExtractionHistory: React.FC<ExtractionHistoryProps> = ({
  onSelectExtraction,
  onViewResult,
  refreshTrigger,
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedExtraction, setSelectedExtraction] = useState<string | null>(null);
  
  const {
    getExtractionHistory,
    getExtractionStatus,
    retryExtraction,
    historyData,
    currentStatus,
    isLoadingHistory,
    historyError,
    statusError,
  } = useTextract();

  // Load extraction history
  const loadHistory = useCallback(async (offset: number = 0) => {
    await getExtractionHistory(20, offset);
  }, [getExtractionHistory]);

  // Load history on mount and refresh trigger
  useEffect(() => {
    loadHistory(currentPage * 20);
  }, [loadHistory, currentPage, refreshTrigger]);

  const handleSelectExtraction = useCallback(async (extractionId: string) => {
    setSelectedExtraction(extractionId);
    await getExtractionStatus(extractionId);
    onSelectExtraction?.(extractionId);
  }, [getExtractionStatus, onSelectExtraction]);

  const handleRetryExtraction = useCallback(async (extractionId: string) => {
    try {
      await retryExtraction(extractionId);
      // Refresh the history to show updated status
      loadHistory(currentPage * 20);
    } catch (error) {
      console.error('Failed to retry extraction:', error);
    }
  }, [retryExtraction, loadHistory, currentPage]);

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
      if (diffInDays < 7) {
        return `${diffInDays} ngày trước`;
      } else {
        return date.toLocaleDateString('vi-VN');
      }
    }
  }, []);

  const formatProcessingTime = useCallback((milliseconds?: number): string => {
    if (!milliseconds) return 'N/A';
    
    const seconds = Math.floor(milliseconds / 1000);
    if (seconds < 60) {
      return `${seconds}s`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    }
  }, []);

  const error = historyError || statusError;

  if (error) {
    return (
      <div className={className}>
        <ErrorMessage
          error={error}
          type="server"
          retryAction={() => loadHistory(currentPage * 20)}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            📋 Extraction History
          </h2>
          
          <button
            onClick={() => loadHistory(currentPage * 20)}
            disabled={isLoadingHistory}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoadingHistory ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent mr-2"></div>
                Refreshing...
              </>
            ) : (
              <>🔄 Refresh</>
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoadingHistory && !historyData && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading history...</span>
        </div>
      )}

      {/* History List */}
      {historyData && (
        <>
          {historyData.extractions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No extraction history
              </h3>
              <p className="text-gray-500">
                Start your first text extraction to see results here
              </p>
            </div>
          ) : (
            <>
              {/* History Items */}
              <div className="divide-y divide-gray-200">
                {historyData.extractions.map((extraction: any) => (
                  <div
                    key={extraction.extraction_id}
                    className={`px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedExtraction === extraction.extraction_id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => handleSelectExtraction(extraction.extraction_id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-mono text-sm text-gray-600">
                            {extraction.extraction_id}
                          </span>
                          <StatusDisplay
                            status={extraction.status}
                            size="sm"
                            variant="badge"
                          />
                        </div>

                        <div className="text-sm text-gray-600 mb-2">
                          <p>{extraction.message}</p>
                        </div>

                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>
                            Started: {formatDate(extraction.started_at)}
                          </span>
                          
                          {extraction.completed_at && (
                            <span>
                              Completed: {formatDate(extraction.completed_at)}
                            </span>
                          )}
                          
                          {extraction.processing_time && (
                            <span>
                              Duration: {formatProcessingTime(extraction.processing_time)}
                            </span>
                          )}

                          <span>Progress: {extraction.progress}%</span>
                        </div>

                        {/* Error Message */}
                        {extraction.status === 'failed' && extraction.error_message && (
                          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                            <span className="font-medium">Error:</span> {extraction.error_message}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        {extraction.status === 'completed' && onViewResult && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewResult(extraction.extraction_id);
                            }}
                            className="p-1 text-green-600 hover:text-green-800 transition-colors"
                            title="View Result"
                          >
                            <span className="text-sm">👁️</span>
                          </button>
                        )}
                        
                        {extraction.status === 'failed' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRetryExtraction(extraction.extraction_id);
                            }}
                            className="p-1 text-orange-600 hover:text-orange-800 transition-colors"
                            title="Retry"
                          >
                            <span className="text-sm">🔄</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Selected Extraction Details */}
                    {selectedExtraction === extraction.extraction_id && currentStatus && (
                      <div className="mt-4 p-3 bg-gray-50 rounded border">
                        <h4 className="font-medium text-gray-900 mb-2">Live Status</h4>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <StatusDisplay
                              status={currentStatus.status}
                              size="sm"
                              variant="badge"
                            />
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Progress:</span>
                            <span>{currentStatus.progress}%</span>
                          </div>
                          
                          {currentStatus.started_at && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Started:</span>
                              <span>{new Date(currentStatus.started_at).toLocaleString('vi-VN')}</span>
                            </div>
                          )}
                          
                          {currentStatus.completed_at && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Completed:</span>
                              <span>{new Date(currentStatus.completed_at).toLocaleString('vi-VN')}</span>
                            </div>
                          )}

                          {currentStatus.processing_time && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Processing Time:</span>
                              <span>{formatProcessingTime(currentStatus.processing_time)}</span>
                            </div>
                          )}

                          <div className="pt-2">
                            <div className="text-gray-600 mb-1">Message:</div>
                            <div className="text-gray-800">{currentStatus.message}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {historyData.total > 20 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing {(currentPage * 20) + 1} - {Math.min((currentPage + 1) * 20, historyData.total)} of {historyData.total} extractions
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      <span className="px-3 py-1 text-sm text-gray-700">
                        Page {currentPage + 1}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={!historyData.has_more}
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
        </>
      )}
    </div>
  );
};

export default ExtractionHistory;
