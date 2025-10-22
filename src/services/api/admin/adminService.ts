import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Types & Interfaces
export interface AdminUser {
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'admin' | 'candidate' | 'recruiter';
  status: 'active' | 'inactive' | 'pending_verification' | 'suspended';
  email_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
  login_count?: number;
  auth_provider: 'email' | 'google' | 'linkedin';
  google_id?: string;
  avatar_url?: string;
  profile_data?: {
    bio?: string;
    location?: string;
    skills?: string[];
    experience_years?: number;
    company?: string;
    position?: string;
  };
  activity_stats?: {
    cvs_uploaded: number;
    jobs_posted: number;
    applications_made: number;
    logins_this_month: number;
  };
}

export interface CreateUserRequest {
  email: string;
  full_name: string;
  phone?: string;
  role: 'admin' | 'candidate' | 'recruiter';
  password?: string; // Optional for admin-created users
  send_welcome_email?: boolean;
  initial_status?: 'active' | 'pending_verification';
  profile_data?: {
    bio?: string;
    location?: string;
    company?: string;
    position?: string;
  };
}

export interface UpdateUserRequest {
  email?: string;
  full_name?: string;
  phone?: string;
  role?: 'admin' | 'candidate' | 'recruiter';
  status?: 'active' | 'inactive' | 'suspended';
  email_verified?: boolean;
  profile_data?: any;
}

export interface UserListResponse {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
  filters_applied: UserListFilters;
}

export interface UserListFilters {
  role?: 'admin' | 'candidate' | 'recruiter';
  status?: 'active' | 'inactive' | 'pending_verification' | 'suspended';
  email_verified?: boolean;
  auth_provider?: 'email' | 'google' | 'linkedin';
  date_from?: string;
  date_to?: string;
  search?: string; // Search in email, name, phone
  sort_by?: 'created_at' | 'last_login' | 'full_name' | 'email';
  sort_order?: 'asc' | 'desc';
}

export interface DashboardStats {
  // Flattened user stats for easier access
  total_users: number;
  new_users_today: number;
  new_users_this_week: number;
  new_users_this_month: number;
  active_users_today: number;
  role_breakdown: {
    admin: number;
    candidate: number;
    recruiter: number;
  };
  status_breakdown: {
    active: number;
    inactive: number;
    pending_verification: number;
    suspended: number;
  };
  activity: {
    total_logins_today: number;
    total_cvs_uploaded: number;
    total_jobs_posted: number;
    total_applications: number;
    total_feedback_submissions: number;
  };
  system: {
    system_health: 'healthy' | 'warning' | 'critical';
    uptime: string;
    api_response_time: number;
    database_status: 'connected' | 'disconnected' | 'slow';
    storage_usage: {
      used_gb: number;
      total_gb: number;
      percentage: number;
    };
  };
  revenue?: {
    total_revenue: number;
    monthly_recurring_revenue: number;
    subscription_breakdown: {
      [plan: string]: number;
    };
  };
  recent_activities: {
    timestamp: string;
    activity_type: 'user_registration' | 'login' | 'cv_upload' | 'job_post' | 'application' | 'system_event';
    user_id?: string;
    user_name?: string;
    description: string;
    ip_address?: string;
  }[];
}

export interface SystemHealthResponse {
  status: 'healthy' | 'warning' | 'critical';
  timestamp: string;
  services: {
    database: string;
    s3: string;
    ai_services: string;
  };
  database: {
    status: 'connected' | 'disconnected' | 'slow';
    connection_count: number;
    query_performance: {
      avg_query_time: number;
      slow_queries: number;
    };
  };
  storage: {
    total_space: number;
    used_space: number;
    available_space: number;
    usage_percentage: number;
  };
  memory: {
    total_memory: number;
    used_memory: number;
    free_memory: number;
    usage_percentage: number;
  };
}

export interface AuditLogEntry {
  id: string; // Alias for log_id 
  log_id: string;
  timestamp: string;
  user_id?: string;
  user_email?: string;
  action: string;
  resource: string;
  resource_type: string;
  resource_id?: string;
  ip_address: string;
  user_agent: string;
  success: boolean;
  error_message?: string;
  details?: any;
  metadata?: any;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
}

export interface AuditLogResponse {
  logs: AuditLogEntry[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
  filters_applied: AuditLogFilters;
}

export interface AuditLogFilters {
  user_id?: string;
  action?: string;
  resource?: string;
  resource_type?: string;
  success?: boolean;
  risk_level?: 'low' | 'medium' | 'high' | 'critical';
  date_from?: string;
  date_to?: string;
  ip_address?: string;
  search?: string;
}

export interface BulkUserOperation {
  user_ids: string[];
  action: 'activate' | 'deactivate' | 'suspend' | 'delete' | 'send_email'; // Alias for operation
  operation: 'activate' | 'deactivate' | 'suspend' | 'delete' | 'send_email';
  operation_data?: {
    email_template?: string;
    email_subject?: string;
    reason?: string;
  };
}

export interface BulkOperationResult {
  total_users: number;
  successful_operations: number;
  failed_operations: number;
  results: Array<{
    user_id: string;
    success: boolean;
    error?: string;
  }>;
}

class AdminService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  /**
   * Check if current user has admin privileges
   */
  private async checkAdminAccess(): Promise<void> {
    // This would typically verify admin role from token/context
    // For now, we'll let the backend handle the authorization
  }

  /**
   * Get all users (Admin only)
   */
  async getAllUsers(
    page: number = 1,
    limit: number = 20,
    filters?: UserListFilters
  ): Promise<UserListResponse> {
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

      const response = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: this.getAuthHeaders(),
        params,
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get all users:', error);
      this.handleError(error, 'Failed to get users list');
      throw error;
    }
  }

  /**
   * Alias for getAllUsers (used by UserManagement component)
   */
  async getUsers(
    page: number = 1,
    limit: number = 20,
    filters?: UserListFilters
  ): Promise<UserListResponse> {
    return this.getAllUsers(page, limit, filters);
  }

  /**
   * Create new user (Admin only)
   */
  async createUser(userData: CreateUserRequest): Promise<{
    user_id: string;
    message: string;
    temporary_password?: string;
  }> {
    try {
      await this.checkAdminAccess();

      // Validate user data
      if (!userData.email || !userData.full_name || !userData.role) {
        throw new Error('Email, full name, and role are required');
      }

      const response = await axios.post(
        `${API_BASE_URL}/admin/users`,
        userData,
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to create user:', error);
      this.handleError(error, 'Failed to create user');
      throw error;
    }
  }

  /**
   * Update user (Admin only)
   */
  async updateUser(userId: string, updates: UpdateUserRequest): Promise<AdminUser> {
    try {
      await this.checkAdminAccess();

      const response = await axios.put(
        `${API_BASE_URL}/admin/users/${userId}`,
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
      console.error('Failed to update user:', error);
      this.handleError(error, 'Failed to update user');
      throw error;
    }
  }

  /**
   * Delete user (Admin only)
   */
  async deleteUser(userId: string, reason?: string): Promise<{ message: string }> {
    try {
      await this.checkAdminAccess();

      const response = await axios.delete(`${API_BASE_URL}/admin/users/${userId}`, {
        headers: this.getAuthHeaders(),
        data: reason ? { reason } : undefined,
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to delete user:', error);
      this.handleError(error, 'Failed to delete user');
      throw error;
    }
  }


  /**
   * Get dashboard statistics (Admin only)
   */
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      await this.checkAdminAccess();

      const response = await axios.get(`${API_BASE_URL}/admin/dashboard`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get dashboard stats:', error);
      this.handleError(error, 'Failed to get dashboard statistics');
      throw error;
    }
  }

  /**
   * Get system health information (Admin only)
   */
  async getSystemHealth(): Promise<SystemHealthResponse> {
    try {
      await this.checkAdminAccess();

      const response = await axios.get(`${API_BASE_URL}/admin/system/health`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get system health:', error);
      this.handleError(error, 'Failed to get system health');
      throw error;
    }
  }

  /**
   * Get audit logs (Admin only)
   */
  async getAuditLogs(
    page: number = 1,
    limit: number = 50,
    filters?: AuditLogFilters
  ): Promise<AuditLogResponse> {
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

      const response = await axios.get(`${API_BASE_URL}/admin/audit-logs`, {
        headers: this.getAuthHeaders(),
        params,
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get audit logs:', error);
      this.handleError(error, 'Failed to get audit logs');
      throw error;
    }
  }

  /**
   * Perform bulk operations on users (Admin only)
   */
  async performBulkUserOperation(operation: BulkUserOperation): Promise<BulkOperationResult> {
    try {
      await this.checkAdminAccess();

      if (!operation.user_ids || operation.user_ids.length === 0) {
        throw new Error('No users selected for bulk operation');
      }

      const response = await axios.post(
        `${API_BASE_URL}/admin/users/bulk-operation`,
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
      console.error('Failed to perform bulk operation:', error);
      this.handleError(error, 'Failed to perform bulk operation');
      throw error;
    }
  }

  /**
   * Alias for performBulkUserOperation (used by UserManagement component)
   */
  async bulkUserOperation(operation: BulkUserOperation): Promise<BulkOperationResult> {
    return this.performBulkUserOperation(operation);
  }

  /**
   * Send system notification to all users (Admin only)
   */
  async sendSystemNotification(notification: {
    title: string;
    message: string;
    type: 'info' | 'warning' | 'maintenance';
    target_users?: 'all' | 'candidates' | 'recruiters' | 'admins';
    scheduled_for?: string;
  }): Promise<{ message: string; notification_id: string }> {
    try {
      await this.checkAdminAccess();

      const response = await axios.post(
        `${API_BASE_URL}/admin/notifications/broadcast`,
        notification,
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to send system notification:', error);
      this.handleError(error, 'Failed to send system notification');
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
      throw new Error('Access denied. Admin privileges required.');
    }

    console.error('Admin Service Error:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
  }

  /**
   * Helper methods for UI components
   */
  getRoleDisplayText(role: string): string {
    const roleMap: { [key: string]: string } = {
      'admin': 'Quản trị viên',
      'candidate': 'Ứng viên',
      'recruiter': 'Nhà tuyển dụng'
    };

    return roleMap[role] || role;
  }

  getStatusDisplayText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'active': 'Hoạt động',
      'inactive': 'Không hoạt động',
      'pending_verification': 'Chờ xác thực',
      'suspended': 'Tạm khóa'
    };

    return statusMap[status] || status;
  }

  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'active': 'green',
      'inactive': 'gray',
      'pending_verification': 'orange',
      'suspended': 'red'
    };

    return colorMap[status] || 'gray';
  }

  getRiskLevelColor(riskLevel: string): string {
    const colorMap: { [key: string]: string } = {
      'low': 'green',
      'medium': 'orange',
      'high': 'red',
      'critical': 'red'
    };

    return colorMap[riskLevel] || 'gray';
  }

  formatLastLogin(lastLogin?: string): string {
    if (!lastLogin) return 'Chưa từng đăng nhập';

    const loginDate = new Date(lastLogin);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - loginDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Vừa mới đăng nhập';
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else if (diffInHours < 24 * 7) {
      const days = Math.floor(diffInHours / 24);
      return `${days} ngày trước`;
    } else {
      return loginDate.toLocaleDateString('vi-VN');
    }
  }

  getSystemHealthStatus(health: SystemHealthResponse): {
    status: 'healthy' | 'warning' | 'critical';
    color: string;
    description: string;
  } {
    const { status } = health;
    
    const statusInfo = {
      'healthy': {
        color: 'green',
        description: 'Tất cả hệ thống hoạt động bình thường'
      },
      'warning': {
        color: 'orange', 
        description: 'Một số dịch vụ đang gặp vấn đề nhỏ'
      },
      'critical': {
        color: 'red',
        description: 'Hệ thống đang gặp sự cố nghiêm trọng'
      }
    };

    return {
      status,
      ...statusInfo[status]
    };
  }
}

export const adminService = new AdminService();
