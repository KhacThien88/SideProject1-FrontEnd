import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Types & Interfaces
export interface FeedbackSubmissionRequest {
  feature: string; // Feature being reviewed (e.g., 'cv_analysis', 'job_matching', 'ui_design')
  rating: 1 | 2 | 3 | 4 | 5; // Star rating
  comments?: string;
  category?: 'bug_report' | 'feature_request' | 'improvement' | 'praise' | 'complaint' | 'other';
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  contact_for_followup?: boolean;
  user_context?: {
    page_url?: string;
    user_agent?: string;
    screen_resolution?: string;
    additional_info?: any;
  };
  attachments?: {
    screenshot?: string; // Base64 encoded image
    log_data?: string;
  };
}

export interface FeedbackResponse {
  feedback_id: string;
  user_id: string;
  feature: string;
  rating: number;
  comments?: string;
  category: string;
  urgency: string;
  status: 'submitted' | 'in_review' | 'acknowledged' | 'resolved' | 'closed';
  contact_for_followup: boolean;
  created_at: string;
  updated_at: string;
  admin_response?: string;
  admin_responded_at?: string;
  admin_responder_id?: string;
  resolution_notes?: string;
  user_context?: any;
  attachments?: {
    screenshot_url?: string;
    log_data?: string;
  };
}

export interface FeedbackListResponse {
  feedbacks: FeedbackResponse[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
  filters_applied: FeedbackListFilters;
}

export interface FeedbackListFilters {
  feature?: string;
  rating?: number;
  category?: string;
  status?: string;
  urgency?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
  sort_by?: 'created_at' | 'rating' | 'urgency' | 'status';
  sort_order?: 'asc' | 'desc';
}

export interface FeedbackUpdateRequest {
  comments?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  category?: string;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  contact_for_followup?: boolean;
}

export interface FeedbackStatistics {
  total_feedbacks: number;
  average_rating: number;
  rating_distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  category_breakdown: {
    bug_report: number;
    feature_request: number;
    improvement: number;
    praise: number;
    complaint: number;
    other: number;
  };
  status_breakdown: {
    submitted: number;
    in_review: number;
    acknowledged: number;
    resolved: number;
    closed: number;
  };
  feature_breakdown: {
    [feature: string]: {
      count: number;
      average_rating: number;
    };
  };
  recent_trends: {
    period: string;
    total_feedbacks: number;
    average_rating: number;
  }[];
  most_requested_features: {
    feature: string;
    request_count: number;
  }[];
  top_issues: {
    issue: string;
    occurrence_count: number;
    severity: string;
  }[];
}

export interface QuickFeedbackRequest {
  feature: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quick_comment?: 'love_it' | 'good' | 'okay' | 'needs_work' | 'frustrated';
}

// Anti-spam and validation
const SPAM_DETECTION = {
  MIN_COMMENT_LENGTH: 10,
  MAX_COMMENT_LENGTH: 2000,
  MIN_TIME_BETWEEN_SUBMISSIONS: 30000, // 30 seconds
  SUSPICIOUS_KEYWORDS: ['spam', 'test', 'asdf', '123'],
  MAX_SUBMISSIONS_PER_HOUR: 10,
};

class FeedbackService {
  private lastSubmissionTime: number = 0;
  private submissionHistory: number[] = [];

  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  /**
   * Validate feedback before submission (Anti-spam measures)
   */
  private validateFeedback(feedback: FeedbackSubmissionRequest): {
    valid: boolean;
    error?: string;
    warnings?: string[];
  } {
    const warnings: string[] = [];

    // Check time between submissions
    const now = Date.now();
    if (now - this.lastSubmissionTime < SPAM_DETECTION.MIN_TIME_BETWEEN_SUBMISSIONS) {
      return {
        valid: false,
        error: 'Please wait before submitting another feedback.',
      };
    }

    // Check submission rate
    const oneHourAgo = now - (60 * 60 * 1000);
    const recentSubmissions = this.submissionHistory.filter(time => time > oneHourAgo);
    if (recentSubmissions.length >= SPAM_DETECTION.MAX_SUBMISSIONS_PER_HOUR) {
      return {
        valid: false,
        error: 'You have reached the maximum number of feedback submissions per hour.',
      };
    }

    // Validate comments
    if (feedback.comments) {
      if (feedback.comments.length < SPAM_DETECTION.MIN_COMMENT_LENGTH) {
        warnings.push('Your comment seems quite short. Consider providing more details.');
      }

      if (feedback.comments.length > SPAM_DETECTION.MAX_COMMENT_LENGTH) {
        return {
          valid: false,
          error: `Comments must be less than ${SPAM_DETECTION.MAX_COMMENT_LENGTH} characters.`,
        };
      }

      // Check for suspicious content
      const suspiciousWords = SPAM_DETECTION.SUSPICIOUS_KEYWORDS.filter(keyword =>
        feedback.comments!.toLowerCase().includes(keyword)
      );
      
      if (suspiciousWords.length > 0) {
        warnings.push('Please provide meaningful feedback to help us improve.');
      }
    }

    // Validate rating
    if (feedback.rating < 1 || feedback.rating > 5) {
      return {
        valid: false,
        error: 'Rating must be between 1 and 5 stars.',
      };
    }

    // Validate feature
    if (!feedback.feature || feedback.feature.trim().length === 0) {
      return {
        valid: false,
        error: 'Please specify which feature you are providing feedback about.',
      };
    }

    return {
      valid: true,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  }

  /**
   * Submit feedback
   */
  async submitFeedback(feedbackData: FeedbackSubmissionRequest): Promise<{
    feedback_id: string;
    message: string;
    warnings?: string[];
  }> {
    try {
      // Validate feedback
      const validation = this.validateFeedback(feedbackData);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Add user context automatically
      const enhancedFeedback = {
        ...feedbackData,
        user_context: {
          page_url: window.location.href,
          user_agent: navigator.userAgent,
          screen_resolution: `${screen.width}x${screen.height}`,
          timestamp: new Date().toISOString(),
          ...feedbackData.user_context,
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/feedback/`,
        enhancedFeedback,
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      // Update anti-spam tracking
      this.lastSubmissionTime = Date.now();
      this.submissionHistory.push(this.lastSubmissionTime);
      
      // Keep only last hour of submissions
      const oneHourAgo = this.lastSubmissionTime - (60 * 60 * 1000);
      this.submissionHistory = this.submissionHistory.filter(time => time > oneHourAgo);

      return {
        ...response.data,
        warnings: validation.warnings,
      };
    } catch (error: any) {
      console.error('Failed to submit feedback:', error);
      this.handleError(error, 'Failed to submit feedback');
      throw error;
    }
  }

  /**
   * Submit quick feedback (simplified version)
   */
  async submitQuickFeedback(quickFeedback: QuickFeedbackRequest): Promise<{
    feedback_id: string;
    message: string;
  }> {
    const fullFeedback: FeedbackSubmissionRequest = {
      feature: quickFeedback.feature,
      rating: quickFeedback.rating,
      comments: quickFeedback.quick_comment ? this.getQuickCommentText(quickFeedback.quick_comment) : undefined,
      category: 'other',
      urgency: 'low',
      contact_for_followup: false,
    };

    const result = await this.submitFeedback(fullFeedback);
    return {
      feedback_id: result.feedback_id,
      message: result.message,
    };
  }

  /**
   * Get specific feedback
   */
  async getFeedback(feedbackId: string): Promise<FeedbackResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/feedback/${feedbackId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get feedback:', error);
      this.handleError(error, 'Failed to get feedback');
      throw error;
    }
  }

  /**
   * Get feedback list for current user
   */
  async getFeedbackList(
    page: number = 1,
    limit: number = 20,
    filters?: FeedbackListFilters
  ): Promise<FeedbackListResponse> {
    try {
      const params: any = { page, limit };
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params[key] = value;
          }
        });
      }

      const response = await axios.get(`${API_BASE_URL}/feedback/`, {
        headers: this.getAuthHeaders(),
        params,
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get feedback list:', error);
      this.handleError(error, 'Failed to get feedback list');
      throw error;
    }
  }

  /**
   * Update feedback
   */
  async updateFeedback(
    feedbackId: string,
    updates: FeedbackUpdateRequest
  ): Promise<FeedbackResponse> {
    try {
      // Validate updates
      if (updates.rating && (updates.rating < 1 || updates.rating > 5)) {
        throw new Error('Rating must be between 1 and 5 stars.');
      }

      if (updates.comments && updates.comments.length > SPAM_DETECTION.MAX_COMMENT_LENGTH) {
        throw new Error(`Comments must be less than ${SPAM_DETECTION.MAX_COMMENT_LENGTH} characters.`);
      }

      const response = await axios.put(
        `${API_BASE_URL}/feedback/${feedbackId}`,
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
      console.error('Failed to update feedback:', error);
      this.handleError(error, 'Failed to update feedback');
      throw error;
    }
  }

  /**
   * Delete feedback
   */
  async deleteFeedback(feedbackId: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`${API_BASE_URL}/feedback/${feedbackId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to delete feedback:', error);
      this.handleError(error, 'Failed to delete feedback');
      throw error;
    }
  }

  /**
   * Get feedback statistics (Admin only)
   */
  async getFeedbackStatistics(): Promise<FeedbackStatistics> {
    try {
      const response = await axios.get(`${API_BASE_URL}/feedback/admin/statistics`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get feedback statistics:', error);
      this.handleError(error, 'Failed to get feedback statistics');
      throw error;
    }
  }

  /**
   * Error handling helper
   */
  private handleError(error: any, defaultMessage: string): void {
    const errorMessage = error.response?.data?.detail || error.message || defaultMessage;
    
    console.error('Feedback Service Error:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
  }

  /**
   * Helper methods for UI components
   */
  private getQuickCommentText(quickComment: string): string {
    const commentMap: { [key: string]: string } = {
      'love_it': 'Tôi rất thích tính năng này!',
      'good': 'Tính năng tốt, hoạt động như mong đợi.',
      'okay': 'Tính năng ổn, nhưng có thể cải thiện thêm.',
      'needs_work': 'Tính năng cần được cải thiện.',
      'frustrated': 'Tôi gặp khó khăn khi sử dụng tính năng này.',
    };

    return commentMap[quickComment] || '';
  }

  getRatingDisplayText(rating: number): string {
    const ratingMap: { [key: number]: string } = {
      1: 'Rất không hài lòng',
      2: 'Không hài lòng', 
      3: 'Bình thường',
      4: 'Hài lòng',
      5: 'Rất hài lòng'
    };

    return ratingMap[rating] || `${rating} sao`;
  }

  getStatusDisplayText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'submitted': 'Đã gửi',
      'in_review': 'Đang xem xét',
      'acknowledged': 'Đã tiếp nhận',
      'resolved': 'Đã giải quyết',
      'closed': 'Đã đóng'
    };

    return statusMap[status] || status;
  }

  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'submitted': 'blue',
      'in_review': 'orange',
      'acknowledged': 'purple',
      'resolved': 'green',
      'closed': 'gray'
    };

    return colorMap[status] || 'gray';
  }

  getCategoryDisplayText(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'bug_report': 'Báo lỗi',
      'feature_request': 'Đề xuất tính năng',
      'improvement': 'Cải thiện',
      'praise': 'Khen ngợi',
      'complaint': 'Khiếu nại',
      'other': 'Khác'
    };

    return categoryMap[category] || category;
  }

  getUrgencyColor(urgency: string): string {
    const colorMap: { [key: string]: string } = {
      'low': 'green',
      'medium': 'orange',
      'high': 'red',
      'critical': 'red'
    };

    return colorMap[urgency] || 'gray';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Hôm nay';
    } else if (diffInDays === 1) {
      return 'Hôm qua';
    } else if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  }

  // Feature list for dropdown
  getAvailableFeatures(): { value: string; label: string }[] {
    return [
      { value: 'cv_analysis', label: 'Phân tích CV' },
      { value: 'job_matching', label: 'Matching công việc' },
      { value: 'job_search', label: 'Tìm kiếm công việc' },
      { value: 'profile_management', label: 'Quản lý hồ sơ' },
      { value: 'notifications', label: 'Thông báo' },
      { value: 'ui_design', label: 'Giao diện người dùng' },
      { value: 'performance', label: 'Hiệu suất' },
      { value: 'mobile_app', label: 'Ứng dụng di động' },
      { value: 'other', label: 'Khác' },
    ];
  }
}

export const feedbackService = new FeedbackService();
