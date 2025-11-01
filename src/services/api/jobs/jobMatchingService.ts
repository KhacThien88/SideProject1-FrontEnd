import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface JobMatchRequest {
  cv_id: string;
  job_preferences?: {
    location?: string;
    salary_min?: number;
    salary_max?: number;
    job_type?: string;
    experience_level?: string;
  };
  limit?: number;
}

export interface JobMatchResult {
  job_id: string;
  title: string;
  company: string;
  location: string;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  salary_match: boolean;
  location_match: boolean;
  experience_match: boolean;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface JobMatchResponse {
  cv_id: string;
  matches: JobMatchResult[];
  total_matches: number;
  match_criteria: {
    skills_weight: number;
    experience_weight: number;
    location_weight: number;
    salary_weight: number;
  };
  generated_at: string;
}

export interface JobApplicationRequest {
  job_id: string;
  cv_id?: string;
  cover_letter?: string;
  expected_salary?: number;
  availability_date?: string;
  additional_notes?: string;
}

export interface JobApplicationResponse {
  application_id: string;
  job_id: string;
  status: 'submitted' | 'under_review' | 'interview' | 'accepted' | 'rejected';
  submitted_at: string;
  message: string;
}

export interface JobMatchHistory {
  match_id: string;
  cv_id: string;
  generated_at: string;
  total_matches: number;
  top_match_score: number;
  criteria_used: any;
}

export interface JobMatchAnalytics {
  cv_id: string;
  total_matches_generated: number;
  average_match_score: number;
  top_skills: string[];
  skill_gaps: string[];
  location_preferences: string[];
  salary_expectations: {
    min: number;
    max: number;
    average: number;
  };
  match_trends: {
    date: string;
    match_count: number;
    average_score: number;
  }[];
}

class JobMatchingService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  // Get job matches for a CV
  async getJobMatches(cvId: string): Promise<JobMatchResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/match/${cvId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get job matches:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get job matches');
    }
  }

  // Create new job matches
  async createJobMatches(matchRequest: JobMatchRequest): Promise<JobMatchResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/jobs/match`, matchRequest, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to create job matches:', error);
      throw new Error(error.response?.data?.detail || 'Failed to create job matches');
    }
  }

  // Apply for a job
  async applyForJob(applicationRequest: JobApplicationRequest): Promise<JobApplicationResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/applications`, applicationRequest, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to apply for job:', error);
      throw new Error(error.response?.data?.detail || 'Failed to apply for job');
    }
  }

  // Get job match history
  async getJobMatchHistory(cvId: string): Promise<JobMatchHistory[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/match/${cvId}/history`, {
        headers: this.getAuthHeaders(),
      });

      return response.data.history || [];
    } catch (error: any) {
      console.error('Failed to get job match history:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get match history');
    }
  }

  // Get job match analytics
  async getJobMatchAnalytics(cvId: string): Promise<JobMatchAnalytics> {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/match/${cvId}/analytics`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get job match analytics:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get match analytics');
    }
  }

  // Get candidates for a job (recruiter view)
  async getCandidatesForJob(jobId: string): Promise<{
    candidates: any[];
    total: number;
    job_info: any;
  }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/candidates/${jobId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get candidates for job:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get candidates');
    }
  }

  // Get job list
  async getJobList(limit: number = 20, offset: number = 0): Promise<{
    jobs: any[];
    total: number;
    limit: number;
    offset: number;
  }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/list`, {
        headers: this.getAuthHeaders(),
        params: { limit, offset }
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get job list:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get job list');
    }
  }

  // Create a new job
  async createJob(jobData: any): Promise<{ job_id: string; message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/jobs/create`, jobData, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to create job:', error);
      throw new Error(error.response?.data?.detail || 'Failed to create job');
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; service: string; timestamp: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/health`);
      return response.data;
    } catch (error: any) {
      console.error('Job service health check failed:', error);
      throw new Error('Job service is not available');
    }
  }
}

export const jobMatchingService = new JobMatchingService();