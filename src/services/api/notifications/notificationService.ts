import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface Notification {
  notification_id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'job_match' | 'application_update' | 'system';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  is_read: boolean;
  created_at: string;
  updated_at: string;
  data?: any; // Additional data for the notification
  action_url?: string; // URL to navigate when notification is clicked
}

export interface CreateNotificationRequest {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'job_match' | 'application_update' | 'system';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  data?: any;
  action_url?: string;
}

export interface NotificationStats {
  total_notifications: number;
  unread_count: number;
  type_breakdown: {
    info: number;
    success: number;
    warning: number;
    error: number;
    job_match: number;
    application_update: number;
    system: number;
  };
  priority_breakdown: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
}

class NotificationService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  // Get all notifications for current user
  async getNotifications(
    page: number = 1,
    limit: number = 20,
    unread_only: boolean = false
  ): Promise<{
    notifications: Notification[];
    total: number;
    unread_count: number;
    page: number;
    limit: number;
  }> {
    try {
      const params: any = { page, limit };
      if (unread_only) params.unread_only = true;

      const response = await axios.get(`${API_BASE_URL}/notifications`, {
        headers: this.getAuthHeaders(),
        params
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get notifications:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get notifications');
    }
  }

  // Create a new notification (admin only)
  async createNotification(notificationData: CreateNotificationRequest): Promise<{
    notification_id: string;
    message: string;
  }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/notifications`, notificationData, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to create notification:', error);
      throw new Error(error.response?.data?.detail || 'Failed to create notification');
    }
  }

  // Get a specific notification
  async getNotification(notificationId: string): Promise<Notification> {
    try {
      const response = await axios.get(`${API_BASE_URL}/notifications/${notificationId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get notification:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get notification');
    }
  }

  // Mark a notification as read
  async markAsRead(notificationId: string): Promise<{ message: string }> {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/notifications/${notificationId}/read`,
        {},
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to mark notification as read:', error);
      throw new Error(error.response?.data?.detail || 'Failed to mark as read');
    }
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<{ message: string; updated_count: number }> {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/notifications/mark-all-read`,
        {},
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to mark all notifications as read:', error);
      throw new Error(error.response?.data?.detail || 'Failed to mark all as read');
    }
  }

  // Delete a notification
  async deleteNotification(notificationId: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`${API_BASE_URL}/notifications/${notificationId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to delete notification:', error);
      throw new Error(error.response?.data?.detail || 'Failed to delete notification');
    }
  }

  // Get unread notification count
  async getUnreadCount(): Promise<{ unread_count: number }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/notifications/unread-count`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get unread count:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get unread count');
    }
  }

  // Get notification statistics
  async getNotificationStats(): Promise<NotificationStats> {
    try {
      const response = await axios.get(`${API_BASE_URL}/notifications/stats`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get notification stats:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get statistics');
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; service: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/notifications/health`);
      return response.data;
    } catch (error: any) {
      console.error('Notification service health check failed:', error);
      throw new Error('Notification service is not available');
    }
  }

  // Helper methods for UI
  getNotificationIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'info': '📢',
      'success': '✅',
      'warning': '⚠️',
      'error': '❌',
      'job_match': '💼',
      'application_update': '📝',
      'system': '⚙️'
    };

    return iconMap[type] || '📢';
  }

  getNotificationColor(type: string): string {
    const colorMap: { [key: string]: string } = {
      'info': 'blue',
      'success': 'green',
      'warning': 'orange',
      'error': 'red',
      'job_match': 'purple',
      'application_update': 'indigo',
      'system': 'gray'
    };

    return colorMap[type] || 'blue';
  }

  getPriorityColor(priority: string): string {
    const colorMap: { [key: string]: string } = {
      'low': 'gray',
      'medium': 'blue',
      'high': 'orange',
      'urgent': 'red'
    };

    return colorMap[priority] || 'gray';
  }

  formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Vừa xong';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} phút trước`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} giờ trước`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ngày trước`;
    }
  }
}

export const notificationService = new NotificationService();