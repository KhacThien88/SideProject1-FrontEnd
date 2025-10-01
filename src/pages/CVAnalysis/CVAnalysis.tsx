import React, { useState, useCallback, useRef } from 'react';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { Layout } from '../../components/common/Layout';
import { Container } from '../../components/common/Container';

import { useToast } from '../../contexts/ToastContext';
import Footer from '../../components/layout/Footer';

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
import { formatFileSize, validateFiles, generateMockAnalysisResults } from '../../utils/cvAnalysisUtils';

export const CVAnalysis: React.FC = () => {
  const { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } = useToast();
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [analysisResults, setAnalysisResults] = useState<DetailedAnalysisResult[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      
      // Simulate upload progress
      newFiles.forEach(file => {
        simulateUpload(file.id);
      });

      showSuccessToast(`${valid.length} file${valid.length > 1 ? 's' : ''} added successfully`);
    }
  };

  // Simulate file upload
  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadedFiles(prev => prev.map(file => 
          file.id === fileId 
            ? { ...file, uploadProgress: 100, status: 'completed' }
            : file
        ));
      } else {
        setUploadedFiles(prev => prev.map(file => 
          file.id === fileId 
            ? { ...file, uploadProgress: Math.min(progress, 100) }
            : file
        ));
      }
    }, 200);
  };

  // Remove file
  const removeFile = (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (file) {
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
      // Clean up object URL
      if (file.url) {
        URL.revokeObjectURL(file.url);
      }
      showWarningToast(`${file.name} removed`);
    }
  };

  // Replace file
  const replaceFile = (fileId: string) => {
    removeFile(fileId);
    fileInputRef.current?.click();
  };

  // Start analysis
  const startAnalysis = async () => {
    const completedFiles = uploadedFiles.filter(f => f.status === 'completed');
    if (completedFiles.length === 0) {
      showErrorToast('No files ready for analysis');
      return;
    }

    setIsProcessing(true);
    showInfoToast(`Starting analysis for ${completedFiles.length} file${completedFiles.length > 1 ? 's' : ''}...`);

    // Update files to processing status
    setUploadedFiles(prev => prev.map(file => 
      file.status === 'completed' 
        ? { ...file, status: 'processing' }
        : file
    ));

    // Simulate analysis stages
    const stages: AnalysisProgress['stage'][] = ['upload', 'extract', 'analyze', 'complete'];
    
    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      const estimatedTime = (stages.length - i) * 5000; // 5 seconds per stage
      
      setAnalysisProgress({
        stage,
        percentage: ((i + 1) / stages.length) * 100,
        estimatedTime,
        currentFile: completedFiles[0]?.name
      });

      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Generate mock detailed results
    const results = generateMockAnalysisResults(completedFiles);

    setAnalysisResults(results);
    setIsProcessing(false);
    setAnalysisProgress(null);
    showSuccessToast('Analysis completed successfully!');
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
    showInfoToast('All files cleared');
  };

  // Job action handlers
  const handleJobSave = useCallback((jobId: string) => {
    setSavedJobIds(prev => {
      const isAlreadySaved = prev.includes(jobId);
      if (isAlreadySaved) {
        showInfoToast('Job removed from saved list');
        return prev.filter(id => id !== jobId);
      } else {
        showSuccessToast('Job saved successfully');
        return [...prev, jobId];
      }
    });
  }, [showSuccessToast, showInfoToast]);

  const handleJobApply = useCallback((jobId: string) => {
    showInfoToast('Application', 'Redirecting to application page...');
    console.log('Applying to job:', jobId);
  }, [showInfoToast]);

  const handleJobShare = useCallback((jobId: string) => {
    console.log('Sharing job:', jobId);
    if (navigator.share) {
      navigator.share({
        title: 'Job Opportunity',
        text: 'Check out this job opportunity',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showSuccessToast('Job link copied to clipboard');
    }
  }, [showSuccessToast]);

  const handleJobViewDetails = useCallback((jobId: string) => {
    showInfoToast('Job Details', 'Opening job details...');
    console.log('Viewing job details:', jobId);
  }, [showInfoToast]);

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
          <main className="flex-1 overflow-auto">
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
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </Layout>
  );
};