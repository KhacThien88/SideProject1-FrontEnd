import axios from 'axios';
import type { CandidateMatch, CandidateDetail, MatchFilters } from '../../../types/candidateMatch';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface CandidateMatchRequest {
  job_profile_id: string;
  filters?: MatchFilters;
  limit?: number;
  min_score?: number;
}

export interface CandidateMatchResponse {
  job_profile_id: string;
  matches: CandidateMatch[];
  total_matches: number;
  filters_applied: MatchFilters;
  generated_at: string;
}

class CandidateMatchService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  // Get candidate matches for a job profile
  async getCandidateMatches(
    jobProfileId: string,
    filters?: MatchFilters,
    limit: number = 20
  ): Promise<CandidateMatchResponse> {
    try {
      const requestData: CandidateMatchRequest = {
        job_profile_id: jobProfileId,
        filters,
        limit,
        min_score: 60
      };

      const response = await axios.get(`${API_BASE_URL}/jobs/candidates/${jobProfileId}`, {
        headers: this.getAuthHeaders(),
        params: requestData
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get candidate matches:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get candidate matches');
    }
  }

  // Get detailed candidate information
  async getCandidateDetail(candidateId: string): Promise<CandidateDetail> {
    try {
      const response = await axios.get(`${API_BASE_URL}/cv/${candidateId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get candidate detail:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get candidate detail');
    }
  }

  // Search candidates with AI
  async searchCandidatesAI(
    searchQuery: string,
    filters?: MatchFilters,
    limit: number = 20
  ): Promise<{
    candidates: CandidateMatch[];
    total: number;
    ai_insights: any;
  }> {
    try {
      const searchRequest = {
        keywords: [searchQuery],
        ...filters,
        limit
      };

      const response = await axios.post(`${API_BASE_URL}/cv/ai-search`, searchRequest, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to search candidates with AI:', error);
      throw new Error(error.response?.data?.detail || 'Failed to search candidates');
    }
  }

  // Get candidate analytics
  async getCandidateAnalytics(jobProfileId: string): Promise<{
    total_candidates: number;
    average_match_score: number;
    top_skills: string[];
    location_distribution: { [key: string]: number };
    experience_distribution: { [key: string]: number };
  }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/match/${jobProfileId}/analytics`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get candidate analytics:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get analytics');
    }
  }

  // Refresh candidate matches
  async refreshMatches(jobProfileId: string): Promise<CandidateMatchResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/jobs/match`, 
        { job_profile_id: jobProfileId },
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to refresh matches:', error);
      throw new Error(error.response?.data?.detail || 'Failed to refresh matches');
    }
  }

  // Get match history
  async getMatchHistory(jobProfileId: string): Promise<{
    history: {
      match_id: string;
      generated_at: string;
      total_matches: number;
      filters_used: MatchFilters;
    }[];
  }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/match/${jobProfileId}/history`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get match history:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get match history');
    }
  }

  // Helper methods for UI
  getMatchScoreColor(score: number): string {
    if (score >= 90) return 'green';
    if (score >= 80) return 'blue';
    if (score >= 70) return 'orange';
    return 'red';
  }

  getMatchScoreText(score: number): string {
    if (score >= 90) return 'Xuất sắc';
    if (score >= 80) return 'Tốt';
    if (score >= 70) return 'Khá';
    return 'Trung bình';
  }

  formatExperience(years: number): string {
    if (years === 0) return 'Mới tốt nghiệp';
    if (years === 1) return '1 năm kinh nghiệm';
    return `${years} năm kinh nghiệm`;
  }

  // Legacy method for backward compatibility
  async getCandidateMatchesLegacy(jobProfileId: string): Promise<CandidateMatch[]> {
    const response = await this.getCandidateMatches(jobProfileId);
    return response.matches;
  }

  // Toggle saved/bookmark status (legacy method)
  async toggleSaved(candidateId: string): Promise<CandidateMatch> {
    try {
      // This would typically call a saved candidates API
      // For now, we'll simulate the toggle
      const response = await axios.post(`${API_BASE_URL}/saved-candidates/toggle`, 
        { candidate_id: candidateId },
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.candidate;
    } catch (error: any) {
      console.error('Failed to toggle saved candidate:', error);
      throw new Error(error.response?.data?.detail || 'Failed to toggle saved status');
    }
  }

  // Download resume (legacy method)
  async downloadResume(resumeUrl: string): Promise<Blob> {
    try {
      const response = await axios.get(resumeUrl, {
        headers: this.getAuthHeaders(),
        responseType: 'blob'
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to download resume:', error);
      throw new Error(error.response?.data?.detail || 'Failed to download resume');
    }
  }
}

export const candidateMatchService = new CandidateMatchService();

