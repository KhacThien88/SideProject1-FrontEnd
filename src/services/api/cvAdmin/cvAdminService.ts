import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Types & Interfaces
export interface AdminCVInfo {
  cv_id: string;
  user_id: string;
  user_email: string;
  user_full_name: string;
  candidate_name: string; // Alias for user_full_name
  filename: string;
  file_size: number;
  file_type: string;
  file_url: string;
  status: 'uploaded' | 'processing' | 'processed' | 'failed' | 'archived';
  created_at: string;
  updated_at: string;
  uploaded_at: string; // Alias for created_at
  processed_at?: string;
  
  // Admin fields
  quality_score?: number;
  tags?: string[];
  notes?: string;
  
  // CV Processing Information
  processing_info: {
    text_extracted: boolean;
    structured_data_extracted: boolean;
    embedding_generated: boolean;
    analysis_completed: boolean;
    quality_score?: number;
    processing_time?: number;
    error_message?: string;
  };

  // Extracted CV Data
  extracted_data?: {
    text: string;
    structured_json?: any;
    personal_info?: {
      full_name?: string;
      email?: string;
      phone?: string;
      address?: string;
      linkedin?: string;
      github?: string;
    };
    experience?: Array<{
      company: string;
      position: string;
      duration: string;
      description: string;
    }>;
    education?: Array<{
      institution: string;
      degree: string;
      field: string;
      year: string;
    }>;
    skills?: string[];
    certifications?: string[];
    languages?: Array<{
      language: string;
      proficiency: string;
    }>;
  };

  // Analytics Information
  analytics: {
    view_count: number;
    match_count: number;
    download_count: number;
    search_appearances: number;
    last_accessed?: string;
    match_success_rate?: number;
  };

  // Quality Metrics
  quality_metrics: {
    completeness_score: number; // 0-100
    readability_score: number; // 0-100
    relevance_score: number; // 0-100
    format_score: number; // 0-100
    overall_score: number; // 0-100
  };

  // Flags and Moderation
  flags: {
    is_flagged: boolean;
    flag_reason?: string;
    flagged_by?: string;
    flagged_at?: string;
    is_reviewed: boolean;
    reviewed_by?: string;
    reviewed_at?: string;
    review_notes?: string;
  };
}

export interface CVAdminListResponse {
  cvs: AdminCVInfo[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
  filters_applied: CVAdminListFilters;
  summary_stats: {
    total_cvs: number;
    processing_cvs: number;
    failed_cvs: number;
    flagged_cvs: number;
    avg_quality_score: number;
  };
}

export interface CVAdminListFilters {
  status?: 'uploaded' | 'processing' | 'processed' | 'failed' | 'archived';
  quality_range?: 'high' | 'medium' | 'low';
  quality_score_min?: number;
  quality_score_max?: number;
  uploaded_after?: string;
  user_email?: string;
  file_type?: string;
  date_from?: string;
  date_to?: string;
  is_flagged?: boolean;
  is_reviewed?: boolean;
  has_matches?: boolean;
  search?: string; // Search in filename, user name, email
  sort_by?: 'created_at' | 'quality_score' | 'view_count' | 'match_count' | 'file_size';
  sort_order?: 'asc' | 'desc';
}

export interface CVUpdateRequest {
  filename?: string;
  status?: 'uploaded' | 'processing' | 'processed' | 'failed' | 'archived';
  quality_score?: number; // Manual quality score override
  tags?: string[];
  notes?: string;
  admin_notes?: string;
  flag_cv?: {
    flag: boolean;
    reason?: string;
  };
  review_cv?: {
    approved: boolean;
    notes: string;
  };
}

export interface CVAnalytics {
  overview: {
    total_cvs: number;
    active_cvs: number;
    processed_cvs: number;
    failed_processing: number;
    avg_processing_time: number;
    total_storage_used: number; // In bytes
  };

  processing_stats: {
    success_rate: number;
    avg_processing_time: number;
    processing_errors: Array<{
      error_type: string;
      count: number;
      percentage: number;
    }>;
    processing_time_trend: Array<{
      date: string;
      avg_time: number;
      count: number;
    }>;
  };

  quality_metrics: {
    avg_quality_score: number;
    quality_distribution: {
      excellent: number; // 90-100
      good: number; // 70-89
      fair: number; // 50-69
      poor: number; // 0-49
    };
    quality_trends: Array<{
      date: string;
      avg_score: number;
      count: number;
    }>;
  };

  user_behavior: {
    avg_cvs_per_user: number;
    most_active_users: Array<{
      user_id: string;
      user_email: string;
      cv_count: number;
      last_upload: string;
    }>;
    upload_patterns: Array<{
      hour: number;
      count: number;
    }>;
    file_type_distribution: {
      [file_type: string]: {
        count: number;
        percentage: number;
        avg_quality: number;
      };
    };
  };

  matching_performance: {
    total_matches: number;
    avg_matches_per_cv: number;
    match_success_rate: number;
    top_matched_skills: Array<{
      skill: string;
      match_count: number;
    }>;
  };

  storage_analytics: {
    total_storage: number;
    storage_by_type: {
      [file_type: string]: number;
    };
    storage_growth: Array<{
      date: string;
      total_storage: number;
      new_uploads: number;
    }>;
  };
}

export interface BulkCVOperation {
  cv_ids: string[];
  action: 'reprocess' | 'archive' | 'delete' | 'flag' | 'approve' | 'export'; // Alias for operation
  operation: 'reprocess' | 'archive' | 'delete' | 'flag' | 'approve' | 'export';
  operation_data?: {
    flag_reason?: string;
    review_notes?: string;
    export_format?: 'json' | 'csv' | 'xlsx';
    notification_email?: boolean;
  };
}

export interface BulkCVOperationResult {
  total_cvs: number;
  successful_operations: number;
  failed_operations: number;
  results: Array<{
    cv_id: string;
    success: boolean;
    error?: string;
    result_data?: any;
  }>;
  export_url?: string; // For export operations
}

export interface CVQualityReport {
  // Summary stats
  total_cvs: number;
  average_score: number;
  high_quality_count: number;
  pending_count: number;
  
  // Individual CV report
  cv_id?: string;
  overall_score?: number;
  detailed_scores?: {
    completeness: {
      score: number;
      missing_fields: string[];
      recommendations: string[];
    };
    readability: {
      score: number;
      issues: string[];
      suggestions: string[];
    };
    relevance: {
      score: number;
      relevant_skills: string[];
      irrelevant_content: string[];
    };
    format: {
      score: number;
      format_issues: string[];
      format_recommendations: string[];
    };
  };
  improvement_suggestions?: string[];
  estimated_match_potential?: number;
}

class CVAdminService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  /**
   * Check if current user has admin privileges for CV management
   */
  private async checkAdminAccess(): Promise<void> {
    // Backend will handle admin authorization
  }

  /**
   * Get all CVs with admin details
   */
  async getAllCVs(
    page: number = 1,
    limit: number = 20,
    filters?: CVAdminListFilters
  ): Promise<CVAdminListResponse> {
    try {
      await this.checkAdminAccess();
      
      const params: any = { page, limit };
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params[key] = value;
          }
        });
      }

      const response = await axios.get(`${API_BASE_URL}/admin/cvs/`, {
        headers: this.getAuthHeaders(),
        params,
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get all CVs:', error);
      this.handleError(error, 'Failed to get CVs list');
      throw error;
    }
  }

  /**
   * Alias for getAllCVs (used by CVManagement component)
   */
  async getCVList(
    page: number = 1,
    limit: number = 20,
    filters?: CVAdminListFilters
  ): Promise<CVAdminListResponse> {
    return this.getAllCVs(page, limit, filters);
  }

  /**
   * Get specific CV details (Admin view)
   */
  async getCVDetails(cvId: string): Promise<AdminCVInfo> {
    try {
      await this.checkAdminAccess();

      const response = await axios.get(`${API_BASE_URL}/admin/cvs/${cvId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get CV details:', error);
      this.handleError(error, 'Failed to get CV details');
      throw error;
    }
  }

  /**
   * Update CV (Admin only)
   */
  async updateCV(cvId: string, updates: CVUpdateRequest): Promise<AdminCVInfo> {
    try {
      await this.checkAdminAccess();

      const response = await axios.put(
        `${API_BASE_URL}/admin/cvs/${cvId}`,
        updates,
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to update CV:', error);
      this.handleError(error, 'Failed to update CV');
      throw error;
    }
  }

  /**
   * Delete CV (Admin only)
   */
  async deleteCV(cvId: string, reason?: string): Promise<{ message: string }> {
    try {
      await this.checkAdminAccess();

      const response = await axios.delete(`${API_BASE_URL}/admin/cvs/${cvId}`, {
        headers: this.getAuthHeaders(),
        data: reason ? { reason } : undefined,
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to delete CV:', error);
      this.handleError(error, 'Failed to delete CV');
      throw error;
    }
  }

  /**
   * Perform bulk operations on CVs
   */
  async performBulkCVOperation(operation: BulkCVOperation): Promise<BulkCVOperationResult> {
    try {
      await this.checkAdminAccess();

      if (!operation.cv_ids || operation.cv_ids.length === 0) {
        throw new Error('No CVs selected for bulk operation');
      }

      const response = await axios.post(
        `${API_BASE_URL}/admin/cvs/bulk-operation`,
        operation,
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to perform bulk CV operation:', error);
      this.handleError(error, 'Failed to perform bulk operation');
      throw error;
    }
  }

  /**
   * Alias for performBulkCVOperation (used by CVManagement component)
   */
  async bulkCVOperation(operation: BulkCVOperation): Promise<BulkCVOperationResult> {
    return this.performBulkCVOperation(operation);
  }

  /**
   * Get CV analytics and reports
   */
  async getCVAnalytics(
    period?: '7d' | '30d' | '90d' | '1y' | 'all'
  ): Promise<CVAnalytics> {
    try {
      await this.checkAdminAccess();

      const params = period ? { period } : {};

      const response = await axios.get(`${API_BASE_URL}/admin/cvs/analytics`, {
        headers: this.getAuthHeaders(),
        params,
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get CV analytics:', error);
      this.handleError(error, 'Failed to get CV analytics');
      throw error;
    }
  }

  /**
   * Get detailed quality report for a CV
   */
  async getCVQualityReport(cvId: string): Promise<CVQualityReport> {
    try {
      await this.checkAdminAccess();

      const response = await axios.get(`${API_BASE_URL}/admin/cvs/${cvId}/quality-report`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get CV quality report:', error);
      this.handleError(error, 'Failed to get CV quality report');
      throw error;
    }
  }

  /**
   * Reprocess CV (Force re-analysis)
   */
  async reprocessCV(cvId: string): Promise<{ message: string; processing_id: string }> {
    try {
      await this.checkAdminAccess();

      const response = await axios.post(
        `${API_BASE_URL}/admin/cvs/${cvId}/reprocess`,
        {},
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to reprocess CV:', error);
      this.handleError(error, 'Failed to reprocess CV');
      throw error;
    }
  }

  /**
   * Archive CV (Soft delete)
   */
  async archiveCV(cvId: string, reason?: string): Promise<{ message: string }> {
    return this.updateCV(cvId, {
      status: 'archived',
      admin_notes: reason || 'Archived by admin',
    }).then(() => ({ message: 'CV archived successfully' }));
  }

  /**
   * Flag CV for review
   */
  async flagCV(cvId: string, reason: string): Promise<{ message: string }> {
    return this.updateCV(cvId, {
      flag_cv: {
        flag: true,
        reason,
      },
    }).then(() => ({ message: 'CV flagged successfully' }));
  }

  /**
   * Review flagged CV
   */
  async reviewCV(cvId: string, approved: boolean, notes: string): Promise<{ message: string }> {
    return this.updateCV(cvId, {
      review_cv: {
        approved,
        notes,
      },
    }).then(() => ({ message: 'CV review completed successfully' }));
  }

  /**
   * Export CVs data
   */
  async exportCVs(
    filters?: CVAdminListFilters,
    format: 'json' | 'csv' | 'xlsx' = 'csv'
  ): Promise<{ download_url: string; expires_at: string }> {
    try {
      await this.checkAdminAccess();

      const params: any = { format };
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params[key] = value;
          }
        });
      }

      const response = await axios.get(`${API_BASE_URL}/admin/cvs/export`, {
        headers: this.getAuthHeaders(),
        params,
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to export CVs:', error);
      this.handleError(error, 'Failed to export CVs');
      throw error;
    }
  }

  /**
   * Get processing queue status
   */
  async getProcessingQueue(): Promise<{
    queue_length: number;
    processing_count: number;
    failed_count: number;
    estimated_wait_time: number;
    recent_failures: Array<{
      cv_id: string;
      error_message: string;
      failed_at: string;
    }>;
  }> {
    try {
      await this.checkAdminAccess();

      const response = await axios.get(`${API_BASE_URL}/admin/cvs/processing-queue`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get processing queue:', error);
      this.handleError(error, 'Failed to get processing queue status');
      throw error;
    }
  }

  /**
   * Error handling helper
   */
  private handleError(error: any, defaultMessage: string): void {
    const errorMessage = error.response?.data?.detail || error.message || defaultMessage;
    
    // Check for admin access errors
    if (error.response?.status === 403) {
      throw new Error('Access denied. CV admin privileges required.');
    }

    console.error('CV Admin Service Error:', {
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
      'uploaded': 'Đã tải lên',
      'processing': 'Đang xử lý',
      'processed': 'Đã xử lý',
      'failed': 'Thất bại',
      'archived': 'Đã lưu trữ'
    };

    return statusMap[status] || status;
  }

  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'uploaded': 'blue',
      'processing': 'orange',
      'processed': 'green',
      'failed': 'red',
      'archived': 'gray'
    };

    return colorMap[status] || 'gray';
  }

  getQualityScoreColor(score: number): string {
    if (score >= 90) return 'green';
    if (score >= 70) return 'blue';
    if (score >= 50) return 'orange';
    return 'red';
  }

  getQualityScoreText(score: number): string {
    if (score >= 90) return 'Xuất sắc';
    if (score >= 70) return 'Tốt';
    if (score >= 50) return 'Trung bình';
    return 'Cần cải thiện';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  calculateMatchSuccessRate(analytics: AdminCVInfo['analytics']): number {
    const { match_count, search_appearances } = analytics;
    
    if (search_appearances === 0) return 0;
    return Math.round((match_count / search_appearances) * 100);
  }

  getFileTypeIcon(fileType: string): string {
    const iconMap: { [key: string]: string } = {
      'application/pdf': '📄',
      'application/msword': '📝',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
      'text/plain': '📄'
    };

    return iconMap[fileType] || '📄';
  }

  isProcessingStuck(cv: AdminCVInfo): boolean {
    if (cv.status !== 'processing') return false;
    
    const processingStart = new Date(cv.updated_at).getTime();
    const now = new Date().getTime();
    const hoursStuck = (now - processingStart) / (1000 * 60 * 60);
    
    return hoursStuck > 2; // Consider stuck if processing for more than 2 hours
  }

  needsReview(cv: AdminCVInfo): boolean {
    return cv.flags.is_flagged && !cv.flags.is_reviewed;
  }

  hasQualityIssues(cv: AdminCVInfo): boolean {
    return cv.quality_metrics.overall_score < 50;
  }
}

export const cvAdminService = new CVAdminService();
