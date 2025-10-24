/**
 * JD Analysis Service
 * Handles Job Description analysis and CV matching operations
 */

import { apiClient } from '../client';
import type { JDAnalysisResult, CVMatchesData, JDUploadFilters } from '../../../types/jdAnalysis';

export interface JDAnalysisResponse extends JDAnalysisResult {
  // Extended response
}

class JDAnalysisService {
  /**
   * Analyze JD with AI processing (Textract + Bedrock + CV matching)
   */
  async analyzeJD(
    fileId: string,
    onProgress?: (stage: string, percentage: number) => void
  ): Promise<JDAnalysisResponse> {
    try {
      console.log(`🚀 Starting JD analysis for fileId: ${fileId}`);

      if (onProgress) {
        onProgress('Starting analysis', 10);
      }

      // Start analysis
      const startResponse = await this.startAnalysis(fileId);

      // If analysis is cached, return immediately
      if (startResponse.is_cached) {
        console.log('✅ Analysis cached - returning immediately');
        if (onProgress) {
          onProgress('Cached result loaded', 100);
        }
        return startResponse;
      }

      // Poll for analysis results
      if (onProgress) {
        onProgress('Processing with AI', 30);
      }

      const result = await this.pollAnalysisStatus(fileId, onProgress);

      return result;

    } catch (error: any) {
      console.error('❌ JD analysis error:', error);
      throw error;
    }
  }

  /**
   * Start JD analysis
   */
  async startAnalysis(fileId: string): Promise<JDAnalysisResponse> {
    try {
      console.log(`🔄 Starting analysis for fileId: ${fileId}`);

      const response = await apiClient.post(`/jd/${fileId}/analyze`);

      console.log('📊 Analysis status:', response.data.status);

      return {
        success: true,
        file_id: fileId,
        message: response.data.message || 'Analysis started successfully',
        status: response.data.status || 'processing',
        is_cached: response.data.is_cached,
        cached_timestamp: response.data.cached_timestamp,
        structured_data: response.data.structured_data,
        ai_insights: response.data.ai_insights,
        cv_matches: response.data.cv_matches
      };

    } catch (error: any) {
      console.error('❌ Failed to start analysis:', error);
      throw new Error(error.response?.data?.detail || 'Failed to start analysis');
    }
  }

  /**
   * Poll for analysis results
   */
  private async pollAnalysisStatus(
    fileId: string,
    onProgress?: (stage: string, percentage: number) => void
  ): Promise<JDAnalysisResponse> {
    const maxRetries = 15; // ~45 seconds (JD processing might be slower)
    let retries = 0;

    while (retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds

      try {
        const result = await this.getAnalysisResult(fileId);

        // Update progress
        const progress = 30 + Math.round((retries / maxRetries) * 60); // 30% -> 90%
        if (onProgress) {
          onProgress(`Processing... (${retries}/${maxRetries})`, progress);
        }

        // Check if analysis is complete
        const structuredData = result.extracted_data || result.structured_data;

        if (structuredData && structuredData.job_title && structuredData.job_title !== 'Processing...') {
          console.log(`✅ JD analysis completed`);
          if (onProgress) {
            onProgress('Analysis complete', 100);
          }

          return {
            success: true,
            file_id: fileId,
            status: 'analyzed',
            structured_data: structuredData,
            ai_insights: result.ai_insights,
            cv_matches: result.cv_matches
          };
        }

        console.log(`⏳ Analysis still processing... retry ${retries + 1}/${maxRetries}`);
        retries++;

      } catch (error) {
        console.error(`Error polling for results: ${error}`);
        retries++;
      }
    }

    // Timeout - return what we have
    throw new Error('Analysis timeout - please check results later');
  }

  /**
   * Get analysis result
   */
  async getAnalysisResult(fileId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/jd/${fileId}/analysis`);
      return response.data;
    } catch (error: any) {
      console.error('Get analysis result error:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get analysis result');
    }
  }

  /**
   * Get CV matches for a JD
   */
  async getCVMatches(
    fileId: string,
    filters?: JDUploadFilters,
    limit: number = 10
  ): Promise<CVMatchesData> {
    try {
      console.log(`🔍 Getting CV matches for JD: ${fileId}`);

      const params: any = { limit };

      if (filters?.location) {
        params.location = filters.location;
      }
      if (filters?.min_experience) {
        params.min_experience = filters.min_experience;
      }
      if (filters?.skills && filters.skills.length > 0) {
        params.skills = filters.skills.join(',');
      }

      const response = await apiClient.get(`/jd/${fileId}/matches`, { params });

      console.log(`✅ Found ${response.data.total_candidates} matching CVs`);

      return response.data;

    } catch (error: any) {
      console.error('Get CV matches error:', error);
      throw new Error(error.response?.data?.detail || 'Failed to get CV matches');
    }
  }

  /**
   * Refresh CV matches (force re-match)
   */
  async refreshCVMatches(fileId: string, limit: number = 10): Promise<CVMatchesData> {
    try {
      const response = await apiClient.post(`/jd/${fileId}/refresh-matches`, { limit });
      return response.data;
    } catch (error: any) {
      console.error('Refresh CV matches error:', error);
      throw new Error(error.response?.data?.detail || 'Failed to refresh CV matches');
    }
  }
}

export const jdAnalysisService = new JDAnalysisService();
export default jdAnalysisService;

