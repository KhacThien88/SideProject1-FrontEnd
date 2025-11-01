/**
 * JD Upload Service
 * Handles Job Description file upload operations
 */

import axios, { type AxiosProgressEvent } from 'axios';
import { apiClient } from '../client';

export interface JDUploadResponse {
  success: boolean;
  message: string;
  file_id: string;
  file_url?: string;
  file_size?: number;
  file_type?: string;
  upload_timestamp?: string;
  is_duplicate?: boolean;
  match_type?: string;
}

class JDUploadService {
  /**
   * Upload JD file to server with progress tracking and duplicate detection
   */
  async uploadJD(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<JDUploadResponse> {
    try {
      console.log(`🚀 Starting JD upload for: ${file.name}`);

      const formData = new FormData();
      formData.append('file', file);

      console.log('📤 Uploading JD to API...');

      const response = await apiClient.post<JDUploadResponse>(
        '/jd',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log(`📊 Upload progress: ${progress}%`);
              if (onProgress) {
                onProgress(progress);
              }
            }
          },
          timeout: 120000 // 120s timeout (same as CV)
        }
      );

      console.log('✅ Upload response:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Upload failed');
      }

      return response.data;

    } catch (error: any) {
      console.error('❌ JD upload error:', error);

      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          // Timeout - try to poll for the file
          console.warn('⏰ Upload timeout - checking if file was uploaded...');
          throw new Error('Upload timeout - please try again or check your network');
        }

        const serverMessage = error.response?.data?.detail || error.response?.data?.message;
        throw new Error(serverMessage || 'Upload failed - server error');
      }

      throw error;
    }
  }

  /**
   * Delete JD file from server
   */
  async deleteJD(fileId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.delete(`/jd/${fileId}`);
      return response.data;
    } catch (error: any) {
      console.error('Delete JD error:', error);
      throw new Error(error.response?.data?.detail || 'Failed to delete JD');
    }
  }

  /**
   * Get JD upload status
   */
  async getJDStatus(fileId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/jd/${fileId}/status`);
      return response.data;
    } catch (error: any) {
      console.error('Get JD status error:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get JD status');
    }
  }

  /**
   * Get user's uploaded JDs
   */
  async getUserJDs(limit: number = 20, offset: number = 0): Promise<any> {
    try {
      const response = await apiClient.get(`/jd/user/jds`, {
        params: { limit, offset }
      });
      return response.data;
    } catch (error: any) {
      console.error('Get user JDs error:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get JDs');
    }
  }
}

export const jdUploadService = new JDUploadService();
export default jdUploadService;
