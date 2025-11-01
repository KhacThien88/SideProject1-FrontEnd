import axios from 'axios';
import { TokenManager } from '../authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance with 30s timeout
const apiClient = axios.create({
  timeout: 30000, // 30 seconds
});

export interface CVUploadResponse {
  success: boolean;
  message?: string;
  file_id?: string;
  cv_id?: string;
  id?: string;  // Alternative ID field
  upload_url?: string;
  file_url?: string;
  file_size?: number;
  file_type?: string;
  upload_timestamp?: string;
  analysis_status?: string;
  status?: string;  // Alternative status field
  is_duplicate?: boolean;  // Deduplication flag
  match_type?: string;  // 'hash' or 'filename'
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
    const token = TokenManager.getAccessToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  async uploadCV(file: File, onProgress?: (progress: number) => void): Promise<CVUploadResponse> {
    console.log('🚀 Starting REAL CV upload for:', file.name);
    
    try {
      // Always try real API first with test token
      console.log('🔐 Auth headers:', this.getAuthHeaders());
      console.log('📤 Uploading file to real API:', { name: file.name, size: file.size, type: file.type });
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post(
        `${API_BASE_URL}/cv`,
        formData,
        {
          timeout: 120000, // 120 seconds for upload (increased from 30s)
          headers: {
            ...this.getAuthHeaders(),
            // Don't set Content-Type manually for FormData, let axios handle it
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              console.log(`📊 Real API upload progress: ${progress}%`);
              onProgress(progress);
            }
          },
        }
      );

      console.log('✅ Real API upload response:', response.data);

      // Ensure response has required fields
      const responseData = response.data;
      if (!responseData) {
        throw new Error('No response data received');
      }

      // Add success flag if not present
      if (responseData.success === undefined) {
        responseData.success = response.status >= 200 && response.status < 300;
      }

      // Ensure file_id is present
      if (!responseData.file_id && !responseData.cv_id) {
        console.error('❌ No file_id or cv_id in response:', responseData);
        throw new Error('No file ID returned from server');
      }

      return responseData;
    } catch (error: any) {
      console.error('❌ Real API upload failed:', error.response?.data || error.message);
      
      // Handle specific error types
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error(`Authentication failed: ${error.response?.data?.detail || 'Invalid token'}`);
      }
      
      if (error.response?.status === 429) {
        const detail = error.response?.data?.detail || 'Too many requests';
        throw new Error(`Rate limit exceeded: ${detail}. Please wait before trying again.`);
      }
      
      if (error.response?.status === 413) {
        throw new Error(`File too large: Maximum file size is 10MB`);
      }
      
      if (error.response?.status === 415) {
        throw new Error(`Unsupported file type: Please upload PDF, DOC, or DOCX files only`);
      }

      // Handle timeout - try polling for completion
      if (error.code === 'ECONNABORTED' || String(error.message).includes('timeout')) {
        console.warn('⏳ Upload timed out, checking if file was actually uploaded...');
        
        // Try to find the uploaded file by polling recent uploads
        try {
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s
          const recentFiles = await this.getUserCVs();
          
          // Look for a file with matching name and recent timestamp
          const recentFile = recentFiles.find(f => 
            f.filename === file.name && 
            new Date(f.upload_date).getTime() > Date.now() - 300000 // Within last 5 minutes
          );
          
          if (recentFile) {
            console.log('✅ Found uploaded file after timeout:', recentFile);
            return {
              success: true,
              message: 'CV uploaded successfully (recovered after timeout)',
              file_id: recentFile.file_id,
              file_url: '', // Will be populated by backend if needed
              file_size: recentFile.file_size,
              file_type: 'application/pdf',
              upload_timestamp: recentFile.upload_date
            };
          }
        } catch (pollError) {
          console.warn('Failed to poll for uploaded file:', pollError);
        }
        
        throw new Error('Upload timeout - please try again. Server may be busy.');
      }
      
      // Re-throw other errors with better messages
      const errorDetail = error.response?.data?.detail || error.message;
      throw new Error(`Upload failed: ${errorDetail}`);
    }
  }

  async getUploadStatus(fileId: string): Promise<CVUploadStatusResponse> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/cv/${fileId}/status`,
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
        ? `${API_BASE_URL}/cv/user/${userId}`
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
      await axios.delete(`${API_BASE_URL}/cv/${fileId}`, {
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