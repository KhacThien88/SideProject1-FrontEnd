/**
 * CV Analysis Service
 * Handles CV analysis API calls
 */

import axios from 'axios';
import { TokenManager } from '../authService';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export interface CVAnalysisResponse {
  success: boolean;
  file_id: string;
  message: string;
  status: string;
  analysis_id?: string;
  is_cached?: boolean;
  cached_timestamp?: string;
  structured_data?: any;
  analysis_result?: any;
  ai_insights?: any;
  raw_content?: any;
}

export interface CVAnalysisResult {
  success: boolean;
  file_id: string;
  status: string;
  extracted_data?: any;
  analysis_result?: any;
  ai_insights?: any;
  upload_timestamp?: string;
  analysis_timestamp?: string;
  is_cached?: boolean;  // Analysis caching flag
  cached_timestamp?: string;  // When analysis was originally done
  structured_data?: any;  // Direct structured data from cached response
}

class CVAnalysisService {
  private getAuthHeaders() {
    const token = TokenManager.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Wait until backend has persisted the upload record
   */
  private async waitUntilUploaded(
    fileId: string,
    maxAttempts: number = 20,
    intervalMs: number = 1000
  ): Promise<void> {
    console.log(`🔍 Waiting for upload record to be visible: ${fileId}`);
    let attempts = 0;
    while (attempts < maxAttempts) {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/cv/${fileId}/status`,
          { headers: this.getAuthHeaders() }
        );
        if (res?.data?.file_id === fileId) {
          console.log(`✅ Upload record found after ${attempts + 1} attempts`);
          return; // record exists
        }
      } catch (err: any) {
        console.log(`⏳ Attempt ${attempts + 1}/${maxAttempts}: Record not yet visible (${err.response?.status || 'error'})`);
      }
      await new Promise(r => setTimeout(r, intervalMs));
      attempts++;
    }
    console.warn(`⚠️ Upload record still not visible after ${maxAttempts} attempts`);
  }

  /**
   * Start CV analysis for a file
   */
  async startAnalysis(fileId: string): Promise<CVAnalysisResponse> {
    try {
      console.log(`🔄 Starting analysis for fileId: ${fileId}`);
      
      const response = await axios.post(
        `${API_BASE_URL}/cv/${fileId}/analyze`,
        {},
        {
          headers: this.getAuthHeaders(),
          timeout: 30000, // 30s timeout for analysis start
        }
      );

      console.log(`✅ Analysis started successfully`);
      // Return full response data from backend (may include is_cached, structured_data, etc.)
      return {
        success: true,
        file_id: fileId,
        message: response.data.message || 'Analysis started successfully',
        status: response.data.status || 'processing',
        analysis_id: response.data.analysis_id,
        is_cached: response.data.is_cached,
        cached_timestamp: response.data.cached_timestamp,
        structured_data: response.data.structured_data,
        analysis_result: response.data.analysis_result,
        ai_insights: response.data.ai_insights,
        raw_content: response.data.raw_content
      };
    } catch (error: any) {
      console.error('❌ Analysis failed:', error.response?.status, error.response?.data?.detail);
      throw new Error(
        error?.response?.data?.detail || 
        error?.response?.data?.message || 
        'Failed to start CV analysis'
      );
    }
  }

  /**
   * Get analysis results
   */
  async getAnalysisResult(fileId: string): Promise<CVAnalysisResult> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/cv/${fileId}/analysis-result`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      return {
        success: true,
        file_id: fileId,
        status: response.data.status || 'completed',
        extracted_data: response.data.extracted_data,
        analysis_result: response.data.analysis_result,
        ai_insights: response.data.ai_insights,
        upload_timestamp: response.data.upload_timestamp,
        analysis_timestamp: response.data.analysis_timestamp
      };
    } catch (error: any) {
      console.error('Failed to get analysis result:', error);
      throw new Error(
        error.response?.data?.detail || 
        error.response?.data?.message || 
        'Failed to get analysis result'
      );
    }
  }

  /**
   * Poll analysis status until complete
   */
  async pollAnalysisStatus(
    fileId: string, 
    onProgress?: (status: string) => void,
    maxAttempts: number = 30,
    intervalMs: number = 2000
  ): Promise<CVAnalysisResult> {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        const result = await this.getAnalysisResult(fileId);
        
        if (onProgress) {
          onProgress(result.status);
        }

        // Check if analysis is complete
        if (result.status === 'analyzed' || result.status === 'completed') {
          return result;
        }
        
        // Check for error states
        if (result.status === 'failed' || result.status === 'error') {
          throw new Error(`Analysis failed: ${result.status}`);
        }

        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, intervalMs));
        attempts++;
      } catch (error: any) {
        // If it's a 404 or analysis not ready, continue polling
        if (error.response?.status === 404 || error.message?.includes('not ready')) {
          await new Promise(resolve => setTimeout(resolve, intervalMs));
          attempts++;
          continue;
        }
        throw error;
      }
    }
    
    throw new Error('Analysis timeout - please check manually');
  }

  /**
   * Start analysis and wait for completion
   */
  async analyzeCV(
    fileId: string,
    onProgress?: (stage: string, percentage: number) => void
  ): Promise<CVAnalysisResponse> {
    console.log('🚀 Starting REAL CV analysis for fileId:', fileId);
    
    try {
      // Always call real API - no token check, let backend handle auth
      if (onProgress) {
        onProgress('Starting analysis...', 10);
      }

      // Start analysis via real API
      console.log('📡 Calling real API: POST /cv/{file_id}/analyze');
      const startResponse = await this.startAnalysis(fileId);
      
      // If analysis is cached, return immediately
      if (startResponse.is_cached) {
        console.log('✅ Analysis cached - returning immediately');
        if (onProgress) {
          onProgress('Cached result loaded', 100);
        }
        return startResponse;
      }
      
      if (onProgress) {
        onProgress('Analysis started, polling status...', 20);
      }

      // Poll for completion
      const result = await this.pollAnalysisStatus(fileId, (status) => {
        console.log(`📊 Analysis status: ${status}`);
        
        if (onProgress) {
          let percentage = 30;
          let stage = 'Processing...';
          
          switch (status) {
            case 'processing':
              percentage = 50;
              stage = 'Extracting text...';
              break;
            case 'analyzing':
              percentage = 80;
              stage = 'AI analyzing content...';
              break;
            case 'analyzed':
            case 'completed':
              percentage = 100;
              stage = 'Analysis complete!';
              break;
            default:
              percentage = 40;
              stage = `Status: ${status}`;
          }
          
          onProgress(stage, percentage);
        }
      });

      console.log('✅ Real API analysis completed:', result);
      // Convert CVAnalysisResult to CVAnalysisResponse format
      return {
        success: result.success,
        file_id: result.file_id,
        message: 'Analysis completed',
        status: result.status,
        structured_data: result.extracted_data,
        analysis_result: result.analysis_result,
        ai_insights: result.ai_insights
      };
      
    } catch (error: any) {
      console.error('❌ Real API analysis failed:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Re-throw error - no fallback to mock
      throw new Error(`Analysis failed: ${error.response?.data?.detail || error.message}`);
    }
  }
}

export const cvAnalysisService = new CVAnalysisService();