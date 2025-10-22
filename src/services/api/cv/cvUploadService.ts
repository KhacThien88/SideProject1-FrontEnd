import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface CVUploadResponse {
  success: boolean;
  message: string;
  file_id?: string;
  cv_id?: string;
  upload_url?: string;
  analysis_status?: string;
}

export interface CVUploadStatusResponse {
  file_id: string;
  status: 'uploading' | 'uploaded' | 'analyzing' | 'analyzed' | 'failed';
  progress?: number;
  message?: string;
  analysis_result?: any;
}

export interface CVListItem {
  file_id: string;
  filename: string;
  upload_date: string;
  status: string;
  file_size: number;
  analysis_status?: string;
}

class CVUploadService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  async uploadCV(file: File, onProgress?: (progress: number) => void): Promise<CVUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${API_BASE_URL}/upload/cv`,
        formData,
        {
          headers: {
            ...this.getAuthHeaders(),
            // Don't set Content-Type manually for FormData, let axios handle it
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              onProgress(progress);
            }
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('CV upload failed:', error);
      throw new Error(error.response?.data?.detail || 'Failed to upload CV');
    }
  }

  async getUploadStatus(fileId: string): Promise<CVUploadStatusResponse> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/upload/cv/${fileId}/status`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to get upload status:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get upload status');
    }
  }

  async getUserCVs(userId?: string): Promise<CVListItem[]> {
    try {
      const url = userId 
        ? `${API_BASE_URL}/upload/cv/user/${userId}`
        : `${API_BASE_URL}/cv/list`;

      const response = await axios.get(url, {
        headers: this.getAuthHeaders(),
      });

      return response.data.cvs || response.data || [];
    } catch (error: any) {
      console.error('Failed to get user CVs:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get CVs');
    }
  }

  async deleteCV(fileId: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/upload/cv/${fileId}`, {
        headers: this.getAuthHeaders(),
      });
    } catch (error: any) {
      console.error('Failed to delete CV:', error);
      throw new Error(error.response?.data?.detail || 'Failed to delete CV');
    }
  }

  async getCVDetails(fileId: string): Promise<any> {
    try {
      const response = await axios.get(`${API_BASE_URL}/cv/${fileId}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to get CV details:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get CV details');
    }
  }

  validateFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

    if (file.size > maxSize) {
      return { valid: false, error: 'File size must be less than 10MB' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Only PDF, JPG, JPEG, and PNG files are allowed' };
    }

    return { valid: true };
  }
}

export const cvUploadService = new CVUploadService();