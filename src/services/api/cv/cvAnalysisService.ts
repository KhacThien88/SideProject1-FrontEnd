import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface CVAnalysisResult {
  file_id: string;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  extracted_text?: string;
  analysis?: {
    skills: string[];
    experience_years?: number;
    education?: string[];
    certifications?: string[];
    languages?: string[];
    summary?: string;
    contact_info?: {
      email?: string;
      phone?: string;
      location?: string;
    };
  };
  ai_insights?: {
    strengths: string[];
    improvements: string[];
    job_recommendations: string[];
    skill_gaps: string[];
  };
  created_at: string;
  updated_at: string;
}

export interface CVSearchRequest {
  keywords?: string[];
  skills?: string[];
  experience_years?: number;
  location?: string;
  education_level?: string;
  page?: number;
  limit?: number;
}

export interface CVSearchResult {
  file_id: string;
  filename: string;
  match_score: number;
  matched_skills: string[];
  candidate_info: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    experience_years?: number;
  };
  summary: string;
}

class CVAnalysisService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  async analyzeCV(fileId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cv/${fileId}/analyze`,
        {},
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('CV analysis failed:', error);
      throw new Error(error.response?.data?.detail || 'Failed to analyze CV');
    }
  }

  async getAnalysisResult(fileId: string): Promise<CVAnalysisResult> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/cv/${fileId}/analysis-result`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to get analysis result:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get analysis result');
    }
  }

  async getAIInsights(fileId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/cv/${fileId}/ai-insights`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to get AI insights:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get AI insights');
    }
  }

  async searchCVs(searchRequest: CVSearchRequest): Promise<{
    results: CVSearchResult[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cv/search`,
        searchRequest,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('CV search failed:', error);
      throw new Error(error.response?.data?.detail || 'Failed to search CVs');
    }
  }

  async aiSearchCVs(searchRequest: CVSearchRequest): Promise<{
    results: CVSearchResult[];
    total: number;
    ai_insights: any;
  }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cv/ai-search`,
        searchRequest,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('AI CV search failed:', error);
      throw new Error(error.response?.data?.detail || 'Failed to perform AI search');
    }
  }

  async updateCV(fileId: string, updateData: any): Promise<any> {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/cv/${fileId}`,
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
      console.error('Failed to update CV:', error);
      throw new Error(error.response?.data?.detail || 'Failed to update CV');
    }
  }

  async exportCV(fileId: string, format: 'pdf' | 'json' | 'csv' = 'pdf'): Promise<{
    download_url: string;
    expires_at: string;
  }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cv/${fileId}/export`,
        { format },
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to export CV:', error);
      throw new Error(error.response?.data?.detail || 'Failed to export CV');
    }
  }

  async getCVAnalytics(userId?: string): Promise<any> {
    try {
      const url = userId 
        ? `${API_BASE_URL}/cv/analytics/${userId}`
        : `${API_BASE_URL}/cv/analytics`;

      const response = await axios.get(url, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get CV analytics:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get analytics');
    }
  }
}

export const cvAnalysisService = new CVAnalysisService();