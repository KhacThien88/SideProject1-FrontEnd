import { useState, useCallback } from 'react';
import { textractService } from '../../services/api/textract/textractService';
import type {
  TextExtractionResponse,
  ExtractionStatusResponse,
  ExtractionResultResponse,
  ExtractionStatusCallback,
} from '../../services/api/textract/textractService';
import { useApiStatus } from './useApiStatus';

export interface UseTextractOptions {
  onProgress?: (status: ExtractionStatusResponse) => void;
  onComplete?: (result: ExtractionResultResponse) => void;
  onError?: (error: string) => void;
  autoStartPolling?: boolean;
}

export const useTextract = (options: UseTextractOptions = {}) => {
  const { onProgress, onComplete, onError, autoStartPolling = true } = options;
  
  const submitStatus = useApiStatus<TextExtractionResponse>();
  const statusStatus = useApiStatus<ExtractionStatusResponse>();
  const resultStatus = useApiStatus<ExtractionResultResponse>();
  const historyStatus = useApiStatus<any>();
  
  const [currentExtractionId, setCurrentExtractionId] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  /**
   * Submit document for text extraction
   */
  const submitExtraction = useCallback(async (
    s3Key: string,
    documentType: 'cv' | 'jd' = 'cv',
    force: boolean = false
  ) => {
    const result = await submitStatus.execute(() =>
      textractService.submitExtraction(s3Key, documentType, force)
    );

    if (result?.extraction_id) {
      setCurrentExtractionId(result.extraction_id);
      
      if (autoStartPolling) {
        startPolling(result.extraction_id);
      }
    }

    return result;
  }, [submitStatus, autoStartPolling]);

  /**
   * Get extraction status
   */
  const getExtractionStatus = useCallback(async (extractionId: string) => {
    return statusStatus.execute(() =>
      textractService.getExtractionStatus(extractionId)
    );
  }, [statusStatus]);

  /**
   * Get extraction result
   */
  const getExtractionResult = useCallback(async (extractionId: string) => {
    return resultStatus.execute(() =>
      textractService.getExtractionResult(extractionId)
    );
  }, [resultStatus]);

  /**
   * Start polling for extraction status
   */
  const startPolling = useCallback(async (extractionId: string) => {
    if (isPolling) return;
    
    setIsPolling(true);
    setCurrentExtractionId(extractionId);

    const callbacks: ExtractionStatusCallback = {
      onProgress: (status) => {
        statusStatus.setSuccess(status);
        onProgress?.(status);
      },
      onComplete: (result) => {
        resultStatus.setSuccess(result);
        setIsPolling(false);
        onComplete?.(result);
      },
      onError: (error) => {
        setIsPolling(false);
        statusStatus.setError(new Error(error));
        onError?.(error);
      },
    };

    try {
      await textractService.pollExtractionStatus(extractionId, callbacks);
    } catch (error) {
      setIsPolling(false);
      statusStatus.setError(error);
      onError?.(error instanceof Error ? error.message : 'Polling failed');
    }
  }, [isPolling, statusStatus, resultStatus, onProgress, onComplete, onError]);

  /**
   * Cancel ongoing extraction
   */
  const cancelExtraction = useCallback(async (extractionId: string) => {
    setIsPolling(false);
    return textractService.cancelExtraction(extractionId);
  }, []);

  /**
   * Extract text and wait for completion (convenience method)
   */
  const extractTextAndWait = useCallback(async (
    s3Key: string,
    documentType: 'cv' | 'jd' = 'cv'
  ) => {
    return textractService.extractTextAndWait(s3Key, documentType, (status) => {
      statusStatus.setSuccess(status);
      onProgress?.(status);
    });
  }, [statusStatus, onProgress]);

  /**
   * Get extraction history
   */
  const getExtractionHistory = useCallback(async (limit: number = 20, offset: number = 0) => {
    return historyStatus.execute(() =>
      textractService.getExtractionHistory(limit, offset)
    );
  }, [historyStatus]);

  /**
   * Check service health
   */
  const checkHealth = useCallback(async () => {
    return textractService.healthCheck();
  }, []);

  /**
   * Retry failed extraction
   */
  const retryExtraction = useCallback(async (extractionId: string) => {
    const result = await submitStatus.execute(() =>
      textractService.retryExtraction(extractionId)
    );

    if (result?.extraction_id && autoStartPolling) {
      startPolling(result.extraction_id);
    }

    return result;
  }, [submitStatus, autoStartPolling, startPolling]);

  /**
   * Reset all states
   */
  const reset = useCallback(() => {
    submitStatus.reset();
    statusStatus.reset();
    resultStatus.reset();
    historyStatus.reset();
    setCurrentExtractionId(null);
    setIsPolling(false);
  }, [submitStatus, statusStatus, resultStatus, historyStatus]);

  // Helper functions
  const getCurrentStatus = useCallback(() => {
    return statusStatus.data;
  }, [statusStatus.data]);

  const getCurrentResult = useCallback(() => {
    return resultStatus.data;
  }, [resultStatus.data]);

  const isExtractionComplete = useCallback(() => {
    return getCurrentStatus()?.status === 'completed';
  }, [getCurrentStatus]);

  const isExtractionFailed = useCallback(() => {
    return getCurrentStatus()?.status === 'failed';
  }, [getCurrentStatus]);

  return {
    // States
    submitStatus: submitStatus.status,
    statusStatus: statusStatus.status,
    resultStatus: resultStatus.status,
    historyStatus: historyStatus.status,
    
    // Data
    submissionData: submitStatus.data,
    currentStatus: statusStatus.data,
    currentResult: resultStatus.data,
    historyData: historyStatus.data,
    
    // Flags
    isSubmitting: submitStatus.isLoading,
    isGettingStatus: statusStatus.isLoading,
    isGettingResult: resultStatus.isLoading,
    isLoadingHistory: historyStatus.isLoading,
    isPolling,
    
    // Current extraction info
    currentExtractionId,
    
    // Actions
    submitExtraction,
    getExtractionStatus,
    getExtractionResult,
    startPolling,
    cancelExtraction,
    extractTextAndWait,
    getExtractionHistory,
    checkHealth,
    retryExtraction,
    reset,
    
    // Helpers
    getCurrentStatus,
    getCurrentResult,
    isExtractionComplete,
    isExtractionFailed,
    
    // Errors
    submitError: submitStatus.error,
    statusError: statusStatus.error,
    resultError: resultStatus.error,
    historyError: historyStatus.error,
  };
};
