import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface Application {
  application_id: string;
  job_id: string;
  user_id: string;
  cv_id?: string;
  cover_letter?: string;
  expected_salary?: number;
  availability_date?: string;
  additional_notes?: string;
  status: 'submitted' | 'under_review' | 'interview' | 'accepted' | 'rejected' | 'withdrawn';
  submitted_at: string;
  updated_at: string;
  job_info?: {
    title: string;
    company: string;
    location: string;
  };
}

export interface CreateApplicationRequest {
  job_id: string;
  cv_id?: string;
  cover_letter?: string;
  expected_salary?: number;
  availability_date?: string;
  additional_notes?: string;
}

export interface UpdateApplicationRequest {
  cover_letter?: string;
  expected_salary?: number;
  availability_date?: string;
  additional_notes?: string;
}

export interface ApplicationStats {
  total_applications: number;
  status_breakdown: {
    submitted: number;
    under_review: number;
    interview: number;
    accepted: number;
    rejected: number;
    withdrawn: number;
  };
  recent_applications: Application[];
  success_rate: number;
}

class ApplicationService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  // Get all applications for current user
  async getApplications(
    status?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{
    applications: Application[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const params: any = { page, limit };
      if (status) params.status = status;

      const response = await axios.get(`${API_BASE_URL}/applications`, {
        headers: this.getAuthHeaders(),
        params
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get applications:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get applications');
    }
  }

  // Create a new application
  async createApplication(applicationData: CreateApplicationRequest): Promise<{
    application_id: string;
    message: string;
  }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/applications`, applicationData, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to create application:', error);
      throw new Error(error.response?.data?.detail || 'Failed to create application');
    }
  }

  // Get a specific application
  async getApplication(applicationId: string): Promise<Application> {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/${applicationId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get application:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get application');
    }
  }

  // Update an application
  async updateApplication(
    applicationId: string,
    updateData: UpdateApplicationRequest
  ): Promise<{ message: string }> {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/applications/${applicationId}`,
        updateData,
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to update application:', error);
      throw new Error(error.response?.data?.detail || 'Failed to update application');
    }
  }

  // Delete/withdraw an application
  async deleteApplication(applicationId: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`${API_BASE_URL}/applications/${applicationId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to delete application:', error);
      throw new Error(error.response?.data?.detail || 'Failed to delete application');
    }
  }

  // Update application status (for recruiters/admins)
  async updateApplicationStatus(
    applicationId: string,
    status: string,
    notes?: string
  ): Promise<{ message: string }> {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/applications/${applicationId}/status`,
        { status, notes },
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to update application status:', error);
      throw new Error(error.response?.data?.detail || 'Failed to update status');
    }
  }

  // Get applications for a specific job (for recruiters)
  async getJobApplications(
    jobId: string,
    status?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{
    applications: Application[];
    total: number;
    job_info: any;
  }> {
    try {
      const params: any = { page, limit };
      if (status) params.status = status;

      const response = await axios.get(`${API_BASE_URL}/applications/job/${jobId}`, {
        headers: this.getAuthHeaders(),
        params
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get job applications:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get job applications');
    }
  }

  // Get application statistics
  async getApplicationStats(): Promise<ApplicationStats> {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/stats`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get application stats:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get statistics');
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; service: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/health`);
      return response.data;
    } catch (error: any) {
      console.error('Application service health check failed:', error);
      throw new Error('Application service is not available');
    }
  }

  // Helper method to get status display text
  getStatusDisplayText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'submitted': 'Đã nộp',
      'under_review': 'Đang xem xét',
      'interview': 'Phỏng vấn',
      'accepted': 'Được chấp nhận',
      'rejected': 'Bị từ chối',
      'withdrawn': 'Đã rút lại'
    };

    return statusMap[status] || status;
  }

  // Helper method to get status color
  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'submitted': 'blue',
      'under_review': 'orange',
      'interview': 'purple',
      'accepted': 'green',
      'rejected': 'red',
      'withdrawn': 'gray'
    };

    return colorMap[status] || 'gray';
  }
}

export const applicationService = new ApplicationService();