/**
 * Mock CV Upload Service for Testing
 * Simulates file upload when backend is unavailable
 */

export const cvUploadMockService = {
  /**
   * Mock CV upload - always succeeds with realistic progress
   */
  async mockUploadCV(
    file: File, 
    onProgress?: (progress: number) => void
  ) {
    console.log('🎭 Using MOCK CV Upload for:', file.name);
    
    // Simulate realistic upload progress
    if (onProgress) {
      const steps = [10, 25, 50, 75, 90, 100];
      
      for (const progress of steps) {
        onProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 200)); // 200ms per step
      }
    }
    
    // Return realistic mock response
    return {
      success: true,
      message: 'CV uploaded successfully (mock)',
      file_id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
      cv_id: `mock_cv_${Date.now()}`,
      analysis_status: 'uploaded',
      upload_timestamp: new Date().toISOString(),
      size: file.size,
      name: file.name,
      type: file.type
    };
  }
};
