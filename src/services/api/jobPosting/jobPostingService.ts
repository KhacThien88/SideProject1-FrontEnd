import axios from 'axios';
import type { 
  JobProfile, 
  CreateJobProfileData, 
  UpdateJobProfileData
} from '../../../types/jobPosting';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface JobProfileResponse {
  profile_id: string;
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  description: string;
  requirements: any;
  salary_range?: any;
  benefits?: string[];
  status: 'active' | 'inactive' | 'archived';
  created_at: string;
  updated_at: string;
  applications_count?: number;
}

export interface JobProfileSearchRequest {
  keywords?: string;
  location?: string;
  job_type?: string;
  salary_min?: number;
  salary_max?: number;
  experience_level?: string;
  page?: number;
  limit?: number;
}

class JobPostingService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  // Get all job profiles
  async getJobProfiles(page: number = 1, limit: number = 20): Promise<{
    profiles: JobProfileResponse[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/job-profiles`, {
        headers: this.getAuthHeaders(),
        params: { page, limit }
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get job profiles:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get job profiles');
    }
  }

  // Get a single job profile by ID
  async getJobProfile(profileId: string): Promise<JobProfileResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/job-profiles/${profileId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get job profile:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get job profile');
    }
  }

  // Create a new job profile
  async createJobProfile(data: CreateJobProfileData): Promise<{ profile_id: string; message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/job-profiles`, data, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to create job profile:', error);
      throw new Error(error.response?.data?.detail || 'Failed to create job profile');
    }
  }

  // Update a job profile
  async updateJobProfile(profileId: string, data: UpdateJobProfileData): Promise<{ message: string }> {
    try {
      const response = await axios.put(`${API_BASE_URL}/job-profiles/${profileId}`, data, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to update job profile:', error);
      throw new Error(error.response?.data?.detail || 'Failed to update job profile');
    }
  }

  // Delete a job profile
  async deleteJobProfile(profileId: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/job-profiles/${profileId}`, {
        headers: this.getAuthHeaders(),
      });
    } catch (error: any) {
      console.error('Failed to delete job profile:', error);
      throw new Error(error.response?.data?.detail || 'Failed to delete job profile');
    }
  }

  // Search job profiles
  async searchJobProfiles(searchRequest: JobProfileSearchRequest): Promise<{
    profiles: JobProfileResponse[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/job-profiles/search`, searchRequest, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to search job profiles:', error);
      throw new Error(error.response?.data?.detail || 'Failed to search job profiles');
    }
  }

  // Publish job profile
  async publishJobProfile(profileId: string): Promise<{ message: string }> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/job-profiles/${profileId}/publish`, {}, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to publish job profile:', error);
      throw new Error(error.response?.data?.detail || 'Failed to publish job profile');
    }
  }

  // Archive job profile
  async archiveJobProfile(profileId: string): Promise<{ message: string }> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/job-profiles/${profileId}/archive`, {}, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to archive job profile:', error);
      throw new Error(error.response?.data?.detail || 'Failed to archive job profile');
    }
  }

  // Get job profile statistics
  async getJobProfileStats(): Promise<any> {
    try {
      const response = await axios.get(`${API_BASE_URL}/job-profiles/stats`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get job profile stats:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get statistics');
    }
  }

  // Get all job profiles (admin)
  async getAllJobProfiles(): Promise<JobProfileResponse[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/job-profiles/all`, {
        headers: this.getAuthHeaders(),
      });

      return response.data.profiles || [];
    } catch (error: any) {
      console.error('Failed to get all job profiles:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get all job profiles');
    }
  }

  // Convert to legacy format for compatibility
  private convertToLegacyFormat(profile: JobProfileResponse): JobProfile {
    return {
      id: profile.profile_id,
      title: profile.title,
      description: profile.description,
      experience: profile.requirements?.experience || 'Not specified',
      requiredSkills: profile.requirements?.skills || [],
      preferredSkills: profile.requirements?.preferred_skills || [],
      activeMatches: profile.applications_count || 0,
      createdAt: new Date(profile.created_at),
      updatedAt: new Date(profile.updated_at),
      status: profile.status,
    };
  }

  // Legacy methods for backward compatibility
  async getJobProfilesLegacy(): Promise<JobProfile[]> {
    const response = await this.getJobProfiles();
    return response.profiles.map(profile => this.convertToLegacyFormat(profile));
  }

  async getJobProfileLegacy(id: string): Promise<JobProfile | null> {
    try {
      const profile = await this.getJobProfile(id);
      return this.convertToLegacyFormat(profile);
    } catch (error) {
      return null;
    }
  }
}

export const jobPostingService = new JobPostingService();
