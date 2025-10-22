import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Types & Interfaces
export interface JDUploadRequest {
  file: File;
  metadata?: {
    company_name?: string;
    position_title?: string;
    department?: string;
    location?: string;
    job_type?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'FREELANCE';
    experience_level?: 'ENTRY' | 'JUNIOR' | 'MIDDLE' | 'SENIOR' | 'LEAD' | 'EXECUTIVE';
    priority?: 'low' | 'normal' | 'high';
    tags?: string[];
  };
}

export interface JDUploadResponse {
  success: boolean;
  message: string;
  file_id: string;
  file_url: string;
  file_size: number;
  file_type: string;
  upload_timestamp: string;
  status: 'uploading' | 'uploaded' | 'processing' | 'processed' | 'failed';
  processing_progress?: number;
}

export interface JDUploadStatusResponse {
  file_id: string;
  status: 'uploading' | 'uploaded' | 'processing' | 'processed' | 'failed';
  progress: number; // 0-100
  error_message?: string;
  created_at: string;
  updated_at: string;
  file_info: {
    filename: string;
    file_size: number;
    file_type: string;
    file_url: string;
  };
  processing_info?: {
    text_extracted: boolean;
    structured_data_extracted: boolean;
    analysis_completed: boolean;
    job_profile_created: boolean;
  };
  extracted_data?: {
    text: string;
    structured_json?: any;
    job_details?: {
      title?: string;
      company?: string;
      location?: string;
      requirements?: string[];
      responsibilities?: string[];
      benefits?: string[];
      salary_range?: {
        min: number;
        max: number;
        currency: string;
      };
    };
  };
}

export interface JDFileInfo {
  file_id: string;
  filename: string;
  file_size: number;
  file_type: string;
  file_url: string;
  status: 'uploading' | 'uploaded' | 'processing' | 'processed' | 'failed';
  uploaded_at: string;
  processed_at?: string;
  metadata?: any;
  tags?: string[];
  company_name?: string;
  position_title?: string;
}

export interface JDListResponse {
  jd_files: JDFileInfo[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface JDListFilters {
  status?: 'uploading' | 'uploaded' | 'processing' | 'processed' | 'failed';
  company_name?: string;
  position_title?: string;
  job_type?: string;
  date_from?: string;
  date_to?: string;
  tags?: string[];
  search?: string;
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  warnings?: string[];
  file_info?: {
    size: number;
    type: string;
    name: string;
  };
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
  file_id?: string;
  filename: string;
}

export interface BulkUploadResult {
  total_files: number;
  successful_uploads: number;
  failed_uploads: number;
  results: Array<{
    filename: string;
    success: boolean;
    file_id?: string;
    error?: string;
  }>;
}

// File validation constants
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/rtf'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MIN_FILE_SIZE = 1024; // 1KB

class JDUploadService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  /**
   * Validate JD file before upload
   */
  validateFile(file: File): FileValidationResult {
    const warnings: string[] = [];

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        file_info: {
          size: file.size,
          type: file.type,
          name: file.name,
        },
      };
    }

    if (file.size < MIN_FILE_SIZE) {
      return {
        valid: false,
        error: 'File is too small to contain meaningful content',
        file_info: {
          size: file.size,
          type: file.type,
          name: file.name,
        },
      };
    }

    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: 'Unsupported file type. Please upload PDF, DOC, DOCX, TXT, or RTF files.',
        file_info: {
          size: file.size,
          type: file.type,
          name: file.name,
        },
      };
    }

    // Add warnings for file size
    if (file.size > 5 * 1024 * 1024) { // 5MB
      warnings.push('Large files may take longer to process');
    }

    // Check file name
    if (file.name.length > 100) {
      warnings.push('File name is very long and may be truncated');
    }

    return {
      valid: true,
      warnings: warnings.length > 0 ? warnings : undefined,
      file_info: {
        size: file.size,
        type: file.type,
        name: file.name,
      },
    };
  }

  /**
   * Upload JD file with metadata
   */
  async uploadJD(
    uploadRequest: JDUploadRequest,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<JDUploadResponse> {
    try {
      // Validate file first
      const validation = this.validateFile(uploadRequest.file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Create form data
      const formData = new FormData();
      formData.append('file', uploadRequest.file);
      
      if (uploadRequest.metadata) {
        formData.append('metadata', JSON.stringify(uploadRequest.metadata));
      }

      // Configure axios with progress tracking
      const config = {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          if (onProgress && progressEvent.total) {
            const progress: UploadProgress = {
              loaded: progressEvent.loaded,
              total: progressEvent.total,
              percentage: Math.round((progressEvent.loaded * 100) / progressEvent.total),
              filename: uploadRequest.file.name,
            };
            onProgress(progress);
          }
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/upload/jd`,
        formData,
        config
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to upload JD file:', error);
      this.handleError(error, 'Failed to upload job description file');
      throw error;
    }
  }

  /**
   * Get JD upload status
   */
  async getJDUploadStatus(fileId: string): Promise<JDUploadStatusResponse> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/upload/jd/${fileId}/status`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to get JD upload status:', error);
      this.handleError(error, 'Failed to get upload status');
      throw error;
    }
  }

  /**
   * Get list of uploaded JD files
   */
  async getJDList(
    page: number = 1,
    limit: number = 20,
    filters?: JDListFilters
  ): Promise<JDListResponse> {
    try {
      const params: any = { page, limit };
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              params[key] = value.join(',');
            } else {
              params[key] = value;
            }
          }
        });
      }

      const response = await axios.get(`${API_BASE_URL}/upload/jd/list`, {
        headers: this.getAuthHeaders(),
        params,
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get JD list:', error);
      this.handleError(error, 'Failed to get job description list');
      throw error;
    }
  }

  /**
   * Delete JD file
   */
  async deleteJD(fileId: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`${API_BASE_URL}/upload/jd/${fileId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to delete JD file:', error);
      this.handleError(error, 'Failed to delete job description file');
      throw error;
    }
  }

  /**
   * Bulk upload multiple JD files
   */
  async bulkUploadJDs(
    files: File[],
    commonMetadata?: JDUploadRequest['metadata'],
    onProgress?: (fileProgress: UploadProgress, overallProgress: { completed: number; total: number }) => void
  ): Promise<BulkUploadResult> {
    const results: BulkUploadResult['results'] = [];
    let completed = 0;

    for (const file of files) {
      try {
        const uploadRequest: JDUploadRequest = {
          file,
          metadata: commonMetadata,
        };

        const result = await this.uploadJD(uploadRequest, (progress) => {
          onProgress?.(progress, { completed, total: files.length });
        });

        results.push({
          filename: file.name,
          success: true,
          file_id: result.file_id,
        });

        completed++;
        
        // Update overall progress
        onProgress?.(
          { loaded: 100, total: 100, percentage: 100, filename: file.name },
          { completed, total: files.length }
        );

      } catch (error: any) {
        results.push({
          filename: file.name,
          success: false,
          error: error.message || 'Upload failed',
        });
        completed++;
      }
    }

    return {
      total_files: files.length,
      successful_uploads: results.filter(r => r.success).length,
      failed_uploads: results.filter(r => !r.success).length,
      results,
    };
  }

  /**
   * Get JD file info with extracted data
   */
  async getJDFileInfo(fileId: string): Promise<JDUploadStatusResponse> {
    return this.getJDUploadStatus(fileId);
  }

  /**
   * Create job profile from JD file
   */
  async createJobProfileFromJD(
    fileId: string,
    profileData?: {
      title?: string;
      description?: string;
      requirements?: any;
      location?: string;
      salary_range?: {
        min: number;
        max: number;
        currency: string;
      };
    }
  ): Promise<{
    success: boolean;
    job_profile_id: string;
    message: string;
  }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/upload/jd/${fileId}/create-job-profile`,
        profileData || {},
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to create job profile from JD:', error);
      this.handleError(error, 'Failed to create job profile');
      throw error;
    }
  }

  /**
   * Reprocess JD file (retry analysis)
   */
  async reprocessJD(fileId: string): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/upload/jd/${fileId}/reprocess`,
        {},
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to reprocess JD file:', error);
      this.handleError(error, 'Failed to reprocess job description');
      throw error;
    }
  }

  /**
   * Error handling helper
   */
  private handleError(error: any, defaultMessage: string): void {
    const errorMessage = error.response?.data?.detail || error.message || defaultMessage;
    
    console.error('JD Upload Service Error:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
  }

  /**
   * Helper methods for UI components
   */
  getStatusDisplayText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'uploading': 'Đang tải lên',
      'uploaded': 'Đã tải lên',
      'processing': 'Đang xử lý',
      'processed': 'Đã xử lý',
      'failed': 'Thất bại'
    };

    return statusMap[status] || status;
  }

  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'uploading': 'blue',
      'uploaded': 'orange',
      'processing': 'blue',
      'processed': 'green',
      'failed': 'red'
    };

    return colorMap[status] || 'gray';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileTypeIcon(fileType: string): string {
    const iconMap: { [key: string]: string } = {
      'application/pdf': '📄',
      'application/msword': '📝',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
      'text/plain': '📄',
      'text/rtf': '📝'
    };

    return iconMap[fileType] || '📄';
  }

  isProcessingComplete(status: JDUploadStatusResponse): boolean {
    return status.status === 'processed' && 
           status.processing_info?.text_extracted === true &&
           status.processing_info?.structured_data_extracted === true;
  }

  canCreateJobProfile(status: JDUploadStatusResponse): boolean {
    return this.isProcessingComplete(status) && 
           status.extracted_data?.job_details !== undefined;
  }
}

export const jdUploadService = new JDUploadService();
