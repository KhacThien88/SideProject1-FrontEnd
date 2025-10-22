import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface SavedJob {
  job_id: string;
  user_id: string;
  saved_at: string;
  notes?: string;
  tags?: string[];
  job_info: {
    title: string;
    company: string;
    location: string;
    salary_range?: {
      min: number;
      max: number;
      currency: string;
    };
    job_type: string;
    description: string;
  };
}

export interface SaveJobRequest {
  job_id: string;
  notes?: string;
  tags?: string[];
}

export interface UpdateSavedJobRequest {
  notes?: string;
  tags?: string[];
}

export interface SavedJobStats {
  total_saved: number;
  recent_saves: number;
  categories: {
    [key: string]: number;
  };
}

class SavedJobsService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  // Get all saved jobs for current user
  async getSavedJobs(
    page: number = 1,
    limit: number = 20,
    tags?: string[]
  ): Promise<{
    saved_jobs: SavedJob[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const params: any = { page, limit };
      if (tags && tags.length > 0) {
        params.tags = tags.join(',');
      }

      const response = await axios.get(`${API_BASE_URL}/saved-jobs`, {
        headers: this.getAuthHeaders(),
        params
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get saved jobs:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get saved jobs');
    }
  }

  // Save a job
  async saveJob(saveRequest: SaveJobRequest): Promise<{ message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/saved-jobs`, saveRequest, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to save job:', error);
      throw new Error(error.response?.data?.detail || 'Failed to save job');
    }
  }

  // Unsave a job
  async unsaveJob(jobId: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`${API_BASE_URL}/saved-jobs/${jobId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to unsave job:', error);
      throw new Error(error.response?.data?.detail || 'Failed to unsave job');
    }
  }

  // Update saved job (notes, tags)
  async updateSavedJob(jobId: string, updateData: UpdateSavedJobRequest): Promise<{ message: string }> {
    try {
      const response = await axios.put(`${API_BASE_URL}/saved-jobs/${jobId}`, updateData, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to update saved job:', error);
      throw new Error(error.response?.data?.detail || 'Failed to update saved job');
    }
  }

  // Update job notes
  async updateJobNotes(jobId: string, notes: string): Promise<{ message: string }> {
    try {
      const response = await axios.put(`${API_BASE_URL}/saved-jobs/${jobId}/note`, 
        { notes }, 
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to update job notes:', error);
      throw new Error(error.response?.data?.detail || 'Failed to update notes');
    }
  }

  // Get saved job statistics
  async getSavedJobStats(): Promise<SavedJobStats> {
    try {
      const response = await axios.get(`${API_BASE_URL}/saved-jobs/stats`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get saved job stats:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get statistics');
    }
  }

  // Check if job is saved
  async isJobSaved(jobId: string): Promise<boolean> {
    try {
      const savedJobs = await this.getSavedJobs(1, 1000); // Get all to check
      return savedJobs.saved_jobs.some(job => job.job_id === jobId);
    } catch (error) {
      console.error('Failed to check if job is saved:', error);
      return false;
    }
  }

  // Toggle save status
  async toggleSaveJob(jobId: string, saveRequest?: SaveJobRequest): Promise<{ saved: boolean; message: string }> {
    try {
      const isSaved = await this.isJobSaved(jobId);
      
      if (isSaved) {
        await this.unsaveJob(jobId);
        return { saved: false, message: 'Job unsaved successfully' };
      } else {
        await this.saveJob(saveRequest || { job_id: jobId });
        return { saved: true, message: 'Job saved successfully' };
      }
    } catch (error: any) {
      console.error('Failed to toggle save job:', error);
      throw new Error(error.message || 'Failed to toggle save status');
    }
  }

  // Helper methods for UI
  formatSavedDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Hôm nay';
    } else if (diffInDays === 1) {
      return 'Hôm qua';
    } else if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} tuần trước`;
    } else {
      const months = Math.floor(diffInDays / 30);
      return `${months} tháng trước`;
    }
  }

  getJobTypeDisplayText(jobType: string): string {
    const typeMap: { [key: string]: string } = {
      'FULL_TIME': 'Toàn thời gian',
      'PART_TIME': 'Bán thời gian',
      'CONTRACT': 'Hợp đồng',
      'INTERNSHIP': 'Thực tập',
      'FREELANCE': 'Tự do'
    };

    return typeMap[jobType] || jobType;
  }

  // Legacy method for backward compatibility
  async removeSavedJob(jobId: string): Promise<void> {
    await this.unsaveJob(jobId);
  }

  // Legacy method for backward compatibility
  async refreshSavedJobs(): Promise<SavedJob[]> {
    const response = await this.getSavedJobs();
    return response.saved_jobs;
  }

  // Legacy method for backward compatibility
  async addNote(jobId: string, note: string): Promise<SavedJob | null> {
    try {
      await this.updateJobNotes(jobId, note);
      const response = await this.getSavedJobs();
      return response.saved_jobs.find(job => job.job_id === jobId) || null;
    } catch (error) {
      return null;
    }
  }
}

export const savedJobsService = new SavedJobsService();
