import React, { useState, useCallback, useRef } from 'react';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { Layout } from '../../components/common/Layout';
import { Container } from '../../components/common/Container';
import Footer from '../../components/layout/Footer';

import { useToast } from '../../contexts/ToastContext';
import { useTranslation } from '../../hooks/useTranslation';

// Import extracted components
import { UploadSection } from '../../components/common/Upload/UploadSection';
import { FileManagementSection } from '../../components/common/Preview/FileManagementSection';
import { AnalysisProgressSection } from '../../components/common/Progress/AnalysisProgressSection';
import { CVAnalysisWithJobs } from './components/CVAnalysisWithJobs';
import { NoFilesState } from './components/NoFilesState';

// Import types and utilities
import type { 
  UploadedFile, 
  AnalysisProgress, 
  ValidationError, 
  DetailedAnalysisResult 
} from '../../types/cvAnalysis';
import { formatFileSize, validateFiles } from '../../utils/cvAnalysisUtils';

// Import services
import { cvUploadService } from '../../services/api/cv/cvUploadService';
import { cvAnalysisService } from '../../services/api/cv/cvAnalysisService';

// Core services only

export const CVAnalysis: React.FC = () => {
  const { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } = useToast();
  const { getContent } = useTranslation();
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [analysisResults, setAnalysisResults] = useState<DetailedAnalysisResult[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Removed debug utilities as requested

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  // Handle file input
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      // Reset input value to allow same file selection
      e.target.value = '';
    }
  }, []);

  // Process files with validation
  const handleFiles = (files: FileList) => {
    const { valid, errors } = validateFiles(files, uploadedFiles);
    
    // Show validation errors
    if (errors.length > 0) {
      errors.forEach(error => {
        showErrorToast(`${error.file}: ${error.message}`);
      });
      setValidationErrors(errors);
    }

    // Add valid files
    if (valid.length > 0) {
      const newFiles: UploadedFile[] = valid.map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        file,
        status: 'uploading',
        uploadProgress: 0,
        url: URL.createObjectURL(file)
      }));

      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // Start real upload for each file
      newFiles.forEach(file => {
        uploadFileToServer(file.id, file.file);
      });

      const fileWord = valid.length > 1 ? getContent('cvAnalysis.files') : getContent('cvAnalysis.file');
      showSuccessToast(`${valid.length} ${fileWord} ${getContent('cvAnalysis.upload.filesAdded')}`);
    }
  };

  // Real file upload to server with retry logic
  const uploadFileToServer = async (fileId: string, file: File, retryCount = 0) => {
    const maxRetries = 3;
    let progressTimeout: number | undefined;
    
    try {
      console.log(`🚀 Starting upload for file: ${file.name} (ID: ${fileId}, attempt: ${retryCount + 1})`);
      
      // Update status to uploading
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'uploading', uploadProgress: 0, error: undefined }
          : f
      ));

      // Set a longer timeout to match backend processing time
      progressTimeout = window.setTimeout(() => {
        console.warn('⏰ Progress timeout reached without server response for:', file.name);
        // Don't mark as failed, just warn - let the axios timeout handle it
      }, 120000); // 120s to match upload service timeout

      // Call API with progress callback
      console.log('📡 Calling cvUploadService.uploadCV...');
      const response = await cvUploadService.uploadCV(file, (progress) => {
        console.log(`📊 Upload progress for ${file.name}: ${progress}%`);
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, uploadProgress: progress }
            : f
        ));
        
        // Clear timeout when we get a response (not just progress)
        if (progress === 100) {
          console.log('🎯 Progress reached 100%, waiting for server response...');
        }
      });

      console.log('✅ Upload API response:', response);

      // Check different possible response formats
      const fileId_from_response = response?.file_id || response?.cv_id || response?.id;
      const hasValidResponse = response && (response.success !== false) && fileId_from_response;
      
      if (hasValidResponse) {
        // Upload completed successfully
        const isDuplicate = response.is_duplicate || false;
        const matchType = response.match_type || '';
        
        if (isDuplicate) {
          console.log(`🔄 Duplicate CV detected for ${file.name} (${matchType} match) - using existing file`);
          showInfoToast(`${file.name} - CV đã tồn tại (${matchType} match)`);
        } else {
          console.log(`🎉 Upload completed for ${file.name}!`);
          showSuccessToast(`${file.name} uploaded successfully!`);
        }
        
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                uploadProgress: 100, 
                status: 'completed',
                fileId: fileId_from_response,
                analysisStatus: response.status || response.analysis_status || 'uploaded'
              }
            : f
        ));
      } else if (response && response.success === false) {
        console.error('❌ Upload failed - server returned success=false:', response);
        throw new Error(response.message || 'Server reported upload failure');
      } else {
        console.error('❌ Upload failed - invalid response format:', response);
        throw new Error('Invalid upload response from server');
      }
      
      // Clear the timeout since we got a response
      if (progressTimeout) {
        window.clearTimeout(progressTimeout);
      }
    } catch (error: any) {
      // Clear timeout on error too
      if (progressTimeout) {
        window.clearTimeout(progressTimeout);
      }
      
      console.error('💥 Upload error for', file.name, ':', error);
      
      // Handle rate limiting with retry
      if (error.message.includes('Rate limit exceeded') && retryCount < maxRetries) {
        const delay = Math.min(5000 * Math.pow(2, retryCount), 30000); // 5s, 10s, 20s, max 30s
        console.log(`⏳ Rate limited, retrying in ${delay/1000}s... (attempt ${retryCount + 1}/${maxRetries})`);
        
        // Update status to show retry
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'uploading', 
                uploadProgress: 0,
                error: `Rate limited, retrying in ${delay/1000}s...`
              }
            : f
        ));
        
        showInfoToast(`Rate limited, retrying ${file.name} in ${delay/1000} seconds...`);
        
        // Wait and retry
        setTimeout(() => {
          uploadFileToServer(fileId, file, retryCount + 1);
        }, delay);
        
        return; // Don't mark as failed yet
      }
      
      // Update status to failed
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { 
              ...f, 
              status: 'failed', 
              uploadProgress: 0,
              error: error.message || 'Upload failed'
            }
            : f
      ));
      
      showErrorToast(`Failed to upload ${file.name}: ${error.message}`);
    }
  };

  // Remove file
  const removeFile = async (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (file) {
      try {
        // If file was successfully uploaded to server, delete it from server
        if (file.fileId && file.status === 'completed') {
          await cvUploadService.deleteCV(file.fileId);
        }
        
        // Remove from local state
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
        
      // Clean up object URL
      if (file.url) {
        URL.revokeObjectURL(file.url);
      }
        
      showWarningToast(`${file.name} ${getContent('cvAnalysis.upload.fileRemoved')}`);
      } catch (error: any) {
        console.error('Failed to delete file from server:', error);
        // Still remove from UI even if server deletion fails
        setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
        if (file.url) {
          URL.revokeObjectURL(file.url);
        }
        showWarningToast(`${file.name} removed locally (server deletion failed)`);
      }
    }
  };

  // Replace file
  const replaceFile = (fileId: string) => {
    removeFile(fileId);
    fileInputRef.current?.click();
  };

  // Retry upload
  const retryUpload = (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (file && file.file) {
      // Reset file status and retry upload
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'uploading', uploadProgress: 0, error: undefined }
          : f
      ));
      
      uploadFileToServer(fileId, file.file, 0); // Reset retry count
      showInfoToast(`Retrying upload for ${file.name}...`);
    }
  };

  // Refresh analysis results
  const refreshAnalysisResults = async (fileId: string) => {
    const file = uploadedFiles.find(f => f.fileId === fileId);
    if (!file) return;

    try {
      showInfoToast(`Refreshing analysis results for ${file.name}...`);
      
      const analysisResultData = await cvAnalysisService.getAnalysisResult(fileId);
      
      if (analysisResultData.success && analysisResultData.status === 'analyzed') {
        // Update analysis results
        const detailedResult: DetailedAnalysisResult = {
          fileId: fileId,
          fileName: file.name,
          fileSize: file.size,
          analysisDate: new Date().toISOString(),
          status: 'completed',
          extractedData: analysisResultData.extracted_data || {},
          aiInsights: analysisResultData.ai_insights || {},
          analysisResult: analysisResultData.analysis_result || {}
        };
        
        // Update or add to results
        setAnalysisResults(prev => {
          const existingIndex = prev.findIndex(r => r.fileId === fileId);
          if (existingIndex >= 0) {
            const newResults = [...prev];
            newResults[existingIndex] = detailedResult;
            return newResults;
          } else {
            return [...prev, detailedResult];
          }
        });
        
        // Update file status
        setUploadedFiles(prev => prev.map(f => 
          f.fileId === fileId 
            ? { ...f, status: 'analyzed', analysisStatus: 'analyzed' }
            : f
        ));
        
        showSuccessToast(`Analysis results updated for ${file.name}`);
      } else {
        showWarningToast(`Analysis not ready yet for ${file.name}`);
      }
    } catch (error: any) {
      console.error('Failed to refresh analysis results:', error);
      showErrorToast(`Failed to refresh results: ${error.message}`);
    }
  };

  // Start analysis
  const startAnalysis = async () => {
    const completedFiles = uploadedFiles.filter(f => f.status === 'completed');
    if (completedFiles.length === 0) {
      showErrorToast(getContent('cvAnalysis.noFilesReady'));
      return;
    }

    setIsProcessing(true);
    const fileWord = completedFiles.length > 1 ? getContent('cvAnalysis.files') : getContent('cvAnalysis.file');
    showInfoToast(`${getContent('cvAnalysis.startingAnalysis')} ${completedFiles.length} ${fileWord}...`);

    // Update files to processing status
    setUploadedFiles(prev => prev.map(file => 
      file.status === 'completed' 
        ? { ...file, status: 'processing' }
        : file
    ));

    try {
      const results: DetailedAnalysisResult[] = [];
      const analysisStartTime = Date.now(); // Track total analysis time
      
      // Process each completed file
      for (let i = 0; i < completedFiles.length; i++) {
        const file = completedFiles[i];
        const fileId = file.fileId;
        
        if (!fileId) {
          console.error(`No fileId found for file: ${file.name}`);
          // Mark file as error explicitly so user sees the issue
          setUploadedFiles(prev => prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'error', error: 'Server did not return file_id. Please re-upload.' }
              : f
          ));
          showErrorToast(`Cannot analyze ${file.name}: missing server file_id. Please re-upload.`);
          continue;
        }

        // Update progress for current file
      setAnalysisProgress({
          stage: 'analyze',
          percentage: Math.round((i / completedFiles.length) * 70), // Up to 70% during processing
          estimatedTime: (completedFiles.length - i) * 25000, // 25 seconds per file (realistic for AI processing)
          currentFile: file.name
        });

        try {
          const analysisStartTime = Date.now();
          
          // Start real CV analysis via API
          const analysisResult = await cvAnalysisService.analyzeCV(
            fileId,
            (stage, percentage) => {
              // Update progress with current stage
              setAnalysisProgress({
                stage: 'analyze',
                percentage: Math.round((i / completedFiles.length) * 70 + (percentage / completedFiles.length) * 0.3),
                estimatedTime: (completedFiles.length - i) * 25000,
                currentFile: `${file.name} - ${stage}`
              });
            }
          );

          const analysisTime = Date.now() - analysisStartTime;

          // Process successful result
          if (analysisResult.success) {
            // Check if analysis was cached (already analyzed before)
            if (analysisResult.is_cached) {
              console.log(`✅ Using cached analysis results for ${file.name} (${analysisTime}ms)`);
              showInfoToast(`${file.name} - Sử dụng kết quả đã lưu (${Math.round(analysisTime/1000)}s)`);
              
              // Use cached results immediately - no need to poll
              const structuredData = analysisResult.structured_data || 
                                    analysisResult.analysis_result?.structured_data || {};
              
              const detailedResult: DetailedAnalysisResult = {
                fileId: fileId,
                fileName: file.name,
                fileSize: file.size,
                analysisDate: analysisResult.cached_timestamp || new Date().toISOString(),
                status: 'completed',
                extractedData: structuredData,
                aiInsights: analysisResult.ai_insights || {},
                analysisResult: analysisResult.analysis_result || {},
                // Map AI data to expected format
                contactInfo: {
                  name: structuredData.full_name || 'N/A',
                  email: structuredData.email_address || 'N/A',
                  phone: structuredData.phone_number || 'N/A',
                  location: structuredData.location || 'N/A'
                },
                detectedSkills: (structuredData.skills || []).map((skill: any) => ({
                  name: typeof skill === 'string' ? skill : skill.name || skill,
                  confidence: 85
                })),
                overallScore: analysisResult.analysis_result?.confidence_score ? 
                  Math.round(analysisResult.analysis_result.confidence_score * 100) : 85,
                experience: structuredData.work_experience?.length ? 
                  Math.min(100, structuredData.work_experience.length * 20) : 50
              };
              
              results.push(detailedResult);
              
              // Update file status
              setUploadedFiles(prev => prev.map(f => 
                f.id === file.id 
                  ? { ...f, status: 'analyzed', analysisStatus: 'analyzed' }
                  : f
              ));
              
              continue; // Skip to next file
            }
            
            // Poll for analysis results with retries
            console.log(`⏳ Waiting for AI processing to complete for ${file.name}...`);
            showInfoToast(`${file.name} - Đang xử lý AI...`);
            
            let analysisResultData;
            let retries = 0;
            const maxRetries = 10; // Try for ~30 seconds
            const pollingStartTime = Date.now();
            
            while (retries < maxRetries) {
              // Update progress during polling
              const pollingProgress = 70 + Math.round((retries / maxRetries) * 20); // 70% -> 90%
              const estimatedRemaining = (maxRetries - retries) * 3; // seconds
              
              setAnalysisProgress({
                stage: 'processing',
                percentage: pollingProgress,
                estimatedTime: estimatedRemaining * 1000,
                currentFile: `${file.name} - AI processing (${retries}/${maxRetries})`
              });
              
              await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds between retries
              
              try {
                analysisResultData = await cvAnalysisService.getAnalysisResult(fileId);
                
                // Check if AI processing is complete
                const structuredData = analysisResultData.extracted_data || 
                                      analysisResultData.analysis_result?.structured_data || {};
                
                if (structuredData.full_name && structuredData.full_name !== 'Processing...') {
                  const pollingTime = Date.now() - pollingStartTime;
                  console.log(`✅ AI processing completed for ${file.name} (${Math.round(pollingTime/1000)}s)`);
                  showSuccessToast(`${file.name} - AI hoàn thành (${Math.round(pollingTime/1000)}s)`);
                  break; // AI processing complete
                }
                
                console.log(`⏳ AI still processing... retry ${retries + 1}/${maxRetries} (${Math.round((Date.now() - pollingStartTime)/1000)}s elapsed)`);
                retries++;
              } catch (error) {
                console.error(`Error polling for results: ${error}`);
                retries++;
              }
            }
            
            if (analysisResultData) {
              try {
                // Use the polled analysis results
              
              // Extract structured data from AI analysis
              const structuredData = analysisResultData.extracted_data || 
                                    analysisResultData.analysis_result?.structured_data || {};
              
              const detailedResult: DetailedAnalysisResult = {
                fileId: fileId,
                fileName: file.name,
                fileSize: file.size,
                analysisDate: new Date().toISOString(),
                status: 'completed',
                extractedData: structuredData,
                aiInsights: analysisResultData.ai_insights || {},
                analysisResult: analysisResultData.analysis_result || {},
                // Map AI data to expected format
                contactInfo: {
                  name: structuredData.full_name || 'N/A',
                  email: structuredData.email_address || 'N/A',
                  phone: structuredData.phone_number || 'N/A',
                  location: structuredData.location || 'N/A'
                },
                detectedSkills: (structuredData.skills || []).map((skill: any) => ({
                  name: typeof skill === 'string' ? skill : skill.name || skill,
                  confidence: 85 // Default confidence
                })),
                overallScore: analysisResultData.analysis_result?.confidence_score ? 
                  Math.round(analysisResultData.analysis_result.confidence_score * 100) : 85,
                experience: structuredData.work_experience?.length ? 
                  Math.min(100, structuredData.work_experience.length * 20) : 50
              };
              
              results.push(detailedResult);
              
              // Don't show duplicate success toast (already shown after polling)
              // showSuccessToast(`Analysis completed for ${file.name}`);
              
              // Update file status to analyzed
              setUploadedFiles(prev => prev.map(f => 
                f.id === file.id 
                  ? { ...f, status: 'analyzed', analysisStatus: 'analyzed' }
                  : f
              ));
              
              } catch (mappingError: any) {
                console.error(`Failed to map analysis results for ${file.name}:`, mappingError);
                showWarningToast(`Analysis data incomplete for ${file.name}`);
                
                // Still mark as completed but note that results are pending
                const detailedResult: DetailedAnalysisResult = {
                  fileId: fileId,
                  fileName: file.name,
                  fileSize: file.size,
                  analysisDate: new Date().toISOString(),
                  status: 'processing',
                  extractedData: {},
                  aiInsights: {},
                  analysisResult: {},
                  detectedSkills: [],
                  overallScore: 0,
                  experience: 0
                };
                
                results.push(detailedResult);
              }
            } else {
              // No analysis data after retries
              console.error(`Failed to get analysis results for ${file.name} after ${maxRetries} retries`);
              showWarningToast(`Analysis timeout for ${file.name} - please refresh results later`);
              
              const detailedResult: DetailedAnalysisResult = {
                fileId: fileId,
                fileName: file.name,
                fileSize: file.size,
                analysisDate: new Date().toISOString(),
                status: 'processing',
                extractedData: {},
                aiInsights: {},
                analysisResult: {},
                detectedSkills: [],
                overallScore: 0,
                experience: 0
              };
              
              results.push(detailedResult);
            }
          }
        } catch (error: any) {
          console.error(`Analysis failed for ${file.name}:`, error);
          
          // Update file status to error
          setUploadedFiles(prev => prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'error', error: error.message }
              : f
          ));
          
          showErrorToast(`Analysis failed for ${file.name}: ${error.message}`);
        }
      }

      // Final progress update
      setAnalysisProgress({
        stage: 'complete',
        percentage: 100,
        estimatedTime: 0,
        currentFile: `Hoàn thành - ${results.length} file(s)`
      });

      // Set final results
    setAnalysisResults(results);
      
      // Show completion message
      const totalTime = Date.now() - analysisStartTime;
      if (results.length > 0) {
        showSuccessToast(`Hoàn thành ${results.length} CV trong ${Math.round(totalTime/1000)}s`);
      } else {
        showErrorToast('Không có file nào được phân tích thành công');
      }
      
    } catch (error: any) {
      console.error('Analysis process failed:', error);
      showErrorToast(`Analysis failed: ${error.message}`);
    } finally {
    setIsProcessing(false);
    setAnalysisProgress(null);
    }
  };

  // Clear all files
  const clearAllFiles = () => {
    uploadedFiles.forEach(file => {
      if (file.url) {
        URL.revokeObjectURL(file.url);
      }
    });
    setUploadedFiles([]);
    setValidationErrors([]);
    showInfoToast(getContent('cvAnalysis.allFilesCleared'));
  };

  // Job action handlers
  const handleJobSave = useCallback((jobId: string) => {
    setSavedJobIds(prev => {
      const isAlreadySaved = prev.includes(jobId);
      if (isAlreadySaved) {
        showInfoToast(getContent('cvAnalysis.jobRemovedFromSaved'));
        return prev.filter(id => id !== jobId);
      } else {
        showSuccessToast(getContent('cvAnalysis.jobSavedSuccessfully'));
        return [...prev, jobId];
      }
    });
  }, [showSuccessToast, showInfoToast, getContent]);

  const handleJobApply = useCallback((jobId: string) => {
    showInfoToast(getContent('cvAnalysis.application'), getContent('cvAnalysis.redirectingToApplication'));
    console.log('Applying to job:', jobId);
  }, [showInfoToast, getContent]);

  const handleJobShare = useCallback((jobId: string) => {
    console.log('Sharing job:', jobId);
    if (navigator.share) {
      navigator.share({
        title: getContent('cvAnalysis.jobOpportunity'),
        text: getContent('cvAnalysis.checkOutThisJob'),
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showSuccessToast(getContent('cvAnalysis.jobLinkCopied'));
    }
  }, [showSuccessToast, getContent]);

  const handleJobViewDetails = useCallback((jobId: string) => {
    showInfoToast(getContent('cvAnalysis.jobDetails'), getContent('cvAnalysis.openingJobDetails'));
    console.log('Viewing job details:', jobId);
  }, [showInfoToast, getContent]);

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <DashboardHeader />
          
          {/* CV Analysis Content */}
          <main className="flex-1 overflow-auto pb-15">
            <div className="py-8">
              <Container maxWidth="2xl" className="space-y-8">
                
                {/* Upload Section */}
                <UploadSection
                  dragActive={dragActive}
                  validationErrors={validationErrors}
                  uploadedFilesCount={uploadedFiles.length}
                  onDrag={handleDrag}
                  onDrop={handleDrop}
                  onFileInput={handleFileInput}
                  formatFileSize={formatFileSize}
                />

                {/* File Management Section */}
                <FileManagementSection
                  uploadedFiles={uploadedFiles}
                  isProcessing={isProcessing}
                  onRemoveFile={removeFile}
                  onReplaceFile={replaceFile}
                  onRetryUpload={retryUpload}
                  onRefreshResults={refreshAnalysisResults}
                  onClearAllFiles={clearAllFiles}
                  onStartAnalysis={startAnalysis}
                  formatFileSize={formatFileSize}
                />

                {/* Analysis Progress */}
                <AnalysisProgressSection analysisProgress={analysisProgress} />

                {/* CV Analysis with Job Recommendations */}
                <CVAnalysisWithJobs
                  analysisResults={analysisResults}
                  onJobSave={handleJobSave}
                  onJobApply={handleJobApply}
                  onJobShare={handleJobShare}
                  onJobViewDetails={handleJobViewDetails}
                  savedJobIds={savedJobIds}
                />

                {/* No Files State */}
                {uploadedFiles.length === 0 && !isProcessing && <NoFilesState />}

              </Container>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </Layout>
  );
};