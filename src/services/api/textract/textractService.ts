import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Types & Interfaces
export interface TextExtractionRequest {
  s3_key: string;
  document_type: 'cv' | 'jd';
  force?: boolean;
}

export interface TextExtractionResponse {
  success: boolean;
  message: string;
  extraction_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  estimated_completion_time?: string;
}

export interface ExtractionStatusResponse {
  extraction_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  message: string;
  started_at: string;
  completed_at?: string;
  error_message?: string;
  processing_time?: number;
}

export interface ExtractionResultResponse {
  success: boolean;
  extraction_id: string;
  text: string;
  confidence: number;
  sections?: {
    [key: string]: string;
  };
  key_information?: {
    [key: string]: any;
  };
  quality_metrics?: {
    readability_score: number;
    confidence_score: number;
    completeness_score: number;
  };
  processing_time: number;
  extraction_timestamp: string;
  structured_json?: {
    [key: string]: any;
  };
  structured_json_s3_key?: string;
}

export interface ExtractionStatusCallback {
  onProgress: (status: ExtractionStatusResponse) => void;
  onComplete: (result: ExtractionResultResponse) => void;
  onError: (error: string) => void;
}

export interface PollingOptions {
  interval: number; // milliseconds
  maxAttempts: number;
  exponentialBackoff: boolean;
}

// Default polling configuration
const DEFAULT_POLLING_OPTIONS: PollingOptions = {
  interval: 2000, // 2 seconds
  maxAttempts: 150, // 5 minutes maximum
  exponentialBackoff: true,
};

class TextractService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  /**
   * Submit a document for text extraction
   */
  async submitExtraction(
    s3Key: string, 
    documentType: 'cv' | 'jd' = 'cv',
    force: boolean = false
  ): Promise<TextExtractionResponse> {
    try {
      const requestData: TextExtractionRequest = {
        s3_key: s3Key,
        document_type: documentType,
        force,
      };

      const response = await axios.post(
        `${API_BASE_URL}/textract/extract`,
        requestData,
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to submit text extraction:', error);
      this.handleError(error, 'Failed to submit document for extraction');
      throw error;
    }
  }

  /**
   * Get extraction status by ID
   */
  async getExtractionStatus(extractionId: string): Promise<ExtractionStatusResponse> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/textract/extract/${extractionId}/status`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to get extraction status:', error);
      this.handleError(error, 'Failed to get extraction status');
      throw error;
    }
  }

  /**
   * Get extraction result by ID
   */
  async getExtractionResult(extractionId: string): Promise<ExtractionResultResponse> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/textract/extract/${extractionId}/result`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to get extraction result:', error);
      this.handleError(error, 'Failed to get extraction result');
      throw error;
    }
  }

  /**
   * Cancel an ongoing extraction
   */
  async cancelExtraction(extractionId: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/textract/extract/${extractionId}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to cancel extraction:', error);
      this.handleError(error, 'Failed to cancel extraction');
      throw error;
    }
  }

  /**
   * Health check for Textract service
   */
  async healthCheck(): Promise<{
    status: string;
    service: string;
    textract_available: boolean;
    timestamp: string;
  }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/textract/health`);
      return response.data;
    } catch (error: any) {
      console.error('Textract health check failed:', error);
      throw new Error('Textract service is not available');
    }
  }

  /**
   * Poll extraction status with callbacks (Advanced polling mechanism)
   */
  async pollExtractionStatus(
    extractionId: string,
    callbacks: ExtractionStatusCallback,
    options: Partial<PollingOptions> = {}
  ): Promise<ExtractionResultResponse> {
    const config = { ...DEFAULT_POLLING_OPTIONS, ...options };
    let attempts = 0;
    let interval = config.interval;

    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          attempts++;

          const status = await this.getExtractionStatus(extractionId);
          callbacks.onProgress(status);

          if (status.status === 'completed') {
            try {
              const result = await this.getExtractionResult(extractionId);
              callbacks.onComplete(result);
              resolve(result);
              return;
            } catch (error) {
              callbacks.onError('Failed to get extraction result');
              reject(error);
              return;
            }
          }

          if (status.status === 'failed') {
            const errorMessage = status.error_message || 'Extraction failed';
            callbacks.onError(errorMessage);
            reject(new Error(errorMessage));
            return;
          }

          if (attempts >= config.maxAttempts) {
            const timeoutError = 'Extraction timeout - maximum polling attempts reached';
            callbacks.onError(timeoutError);
            reject(new Error(timeoutError));
            return;
          }

          // Schedule next poll with exponential backoff
          if (config.exponentialBackoff && attempts > 5) {
            interval = Math.min(interval * 1.2, 10000); // Max 10 seconds
          }

          setTimeout(poll, interval);
        } catch (error: any) {
          callbacks.onError(`Polling error: ${error.message}`);
          reject(error);
        }
      };

      // Start polling
      poll();
    });
  }

  /**
   * Submit extraction and wait for completion (Convenience method)
   */
  async extractTextAndWait(
    s3Key: string,
    documentType: 'cv' | 'jd' = 'cv',
    onProgress?: (status: ExtractionStatusResponse) => void
  ): Promise<ExtractionResultResponse> {
    try {
      // Submit extraction
      const submission = await this.submitExtraction(s3Key, documentType);
      
      if (!submission.success) {
        throw new Error(submission.message);
      }

      // Poll for completion
      return await this.pollExtractionStatus(
        submission.extraction_id,
        {
          onProgress: onProgress || (() => {}),
          onComplete: () => {},
          onError: (error) => {
            console.error('Extraction error:', error);
          },
        }
      );
    } catch (error: any) {
      console.error('Failed to extract text:', error);
      throw error;
    }
  }

  /**
   * Batch text extraction for multiple documents
   */
  async extractMultipleTexts(
    documents: Array<{ s3Key: string; documentType: 'cv' | 'jd' }>,
    onProgress?: (completed: number, total: number, currentDoc?: string) => void
  ): Promise<ExtractionResultResponse[]> {
    const results: ExtractionResultResponse[] = [];
    let completed = 0;

    for (const doc of documents) {
      try {
        onProgress?.(completed, documents.length, doc.s3Key);
        
        const result = await this.extractTextAndWait(doc.s3Key, doc.documentType);
        results.push(result);
        completed++;
        
        onProgress?.(completed, documents.length);
      } catch (error) {
        console.error(`Failed to extract text from ${doc.s3Key}:`, error);
        // Continue with other documents
      }
    }

    return results;
  }

  /**
   * Get extraction history for current user
   */
  async getExtractionHistory(
    limit: number = 20,
    offset: number = 0
  ): Promise<{
    extractions: ExtractionStatusResponse[];
    total: number;
    has_more: boolean;
  }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/textract/history`, {
        headers: this.getAuthHeaders(),
        params: { limit, offset },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get extraction history:', error);
      this.handleError(error, 'Failed to get extraction history');
      throw error;
    }
  }

  /**
   * Retry failed extraction
   */
  async retryExtraction(extractionId: string): Promise<TextExtractionResponse> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/textract/extract/${extractionId}/retry`,
        {},
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to retry extraction:', error);
      this.handleError(error, 'Failed to retry extraction');
      throw error;
    }
  }

  /**
   * Error handling helper
   */
  private handleError(error: any, defaultMessage: string): void {
    const errorMessage = error.response?.data?.detail || error.message || defaultMessage;
    
    // Log detailed error for debugging
    console.error('Textract Service Error:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });

    // You can add more sophisticated error handling here
    // e.g., retry logic, user notifications, etc.
  }

  /**
   * Helper methods for UI components
   */
  getStatusDisplayText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'Đang chờ xử lý',
      'processing': 'Đang trích xuất văn bản',
      'completed': 'Hoàn thành',
      'failed': 'Thất bại'
    };

    return statusMap[status] || status;
  }

  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'pending': 'orange',
      'processing': 'blue',
      'completed': 'green',
      'failed': 'red'
    };

    return colorMap[status] || 'gray';
  }

  formatProcessingTime(milliseconds?: number): string {
    if (!milliseconds) return 'N/A';
    
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  }

  calculateETA(progress: number, startTime: string): string {
    if (progress <= 0) return 'Calculating...';
    
    const elapsed = Date.now() - new Date(startTime).getTime();
    const estimated = (elapsed / progress) * (100 - progress);
    
    return this.formatProcessingTime(estimated);
  }
}

export const textractService = new TextractService();
