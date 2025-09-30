import React, { useState, useEffect } from 'react';
import { useRouter } from '../../components/Router';
import { useTranslation } from '../../hooks/useTranslation';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { DropzoneUploader } from '../../components/common/Upload/DropzoneUploader';
import { DocumentPreview } from '../../components/common/Preview/DocumentPreview';
import { ProgressTracker } from '../../components/common/Progress/ProgressTracker';
import { CVAnalysisResult } from './components/CVAnalysisResult';
import { Layout } from '../../components/common/Layout';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, FileText, Upload, Eye, BarChart3, Plus } from 'lucide-react';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  file: File;
}

export interface AnalysisProgress {
  stage: 'upload' | 'extract' | 'analyze' | 'complete';
  percentage: number;
  estimatedTime?: number;
}

export interface AnalysisResult {
  id: string;
  fileName: string;
  overview: {
    experienceYears: number;
    skillsCount: number;
    educationLevel: string;
    matchScore: number;
  };
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  experience: {
    position: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  suggestions: {
    strengths: string[];
    improvements: string[];
  };
}

type AnalysisStep = 'upload' | 'preview' | 'analyzing' | 'results';

export const CVAnalysis: React.FC = () => {
  const { navigate } = useRouter();
  const { t } = useTranslation();
  
  const [currentStep, setCurrentStep] = useState<AnalysisStep>('upload');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Handle file upload completion
  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setCurrentStep('preview');
    }
  };

  // Handle analysis start
  const handleStartAnalysis = () => {
    if (!selectedFile) return;
    
    setCurrentStep('analyzing');
    setAnalysisProgress({
      stage: 'upload',
      percentage: 0
    });
    
    // Simulate analysis process
    simulateAnalysis();
  };

  // Simulate analysis process
  const simulateAnalysis = async () => {
    const stages: Array<{ stage: AnalysisProgress['stage']; duration: number }> = [
      { stage: 'upload', duration: 1000 },
      { stage: 'extract', duration: 2000 },
      { stage: 'analyze', duration: 3000 },
      { stage: 'complete', duration: 500 }
    ];

    for (let i = 0; i < stages.length; i++) {
      const { stage, duration } = stages[i];
      
      setAnalysisProgress({
        stage,
        percentage: (i / stages.length) * 100,
        estimatedTime: Math.floor(duration / 1000)
      });

      await new Promise(resolve => setTimeout(resolve, duration));
      
      setAnalysisProgress({
        stage,
        percentage: ((i + 1) / stages.length) * 100,
        estimatedTime: 0
      });
    }

    // Mock analysis result
    const mockResult: AnalysisResult = {
      id: Date.now().toString(),
      fileName: selectedFile?.name || 'CV.pdf',
      overview: {
        experienceYears: 5,
        skillsCount: 12,
        educationLevel: 'Bachelor\'s Degree',
        matchScore: 85
      },
      skills: {
        technical: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
        soft: ['Leadership', 'Communication', 'Problem Solving'],
        languages: ['English', 'Vietnamese']
      },
      experience: [
        {
          position: 'Senior Frontend Developer',
          company: 'Tech Company',
          duration: '2021 - Present',
          description: 'Led frontend development team and implemented modern React applications.'
        }
      ],
      education: [
        {
          degree: 'Bachelor of Computer Science',
          institution: 'University Name',
          year: '2019'
        }
      ],
      suggestions: {
        strengths: ['Strong technical skills', 'Good work experience'],
        improvements: ['Add more certifications', 'Include project portfolio']
      }
    };

    setAnalysisResults([mockResult]);
    setCurrentStep('results');
  };

  // Handle back navigation
  const handleBack = () => {
    switch (currentStep) {
      case 'preview':
        setCurrentStep('upload');
        setSelectedFile(null);
        break;
      case 'analyzing':
        setCurrentStep('preview');
        setAnalysisProgress(null);
        break;
      case 'results':
        setCurrentStep('preview');
        setAnalysisResults([]);
        break;
      default:
        navigate('/dashboard');
    }
  };

  // Handle new analysis
  const handleNewAnalysis = () => {
    setCurrentStep('upload');
    setUploadedFiles([]);
    setSelectedFile(null);
    setAnalysisProgress(null);
    setAnalysisResults([]);
    setError(null);
  };

  return (
        <Layout className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <DashboardSidebar />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Header */}
              <DashboardHeader />
        
        {/* Main Content */}
        <div className="flex flex-col min-h-screen ml-64">
          <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">
                  {t.cvAnalysis?.title || 'Resume Analyzer'}
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  {t.cvAnalysis?.subtitle || 'Upload and analyze resumes with AI-powered insights.'}
                </p>
              </div>
              
              {currentStep === 'results' && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNewAnalysis}
                  className="flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Analysis</span>
                </Button>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
                <p className="text-error-800">{error}</p>
              </div>
            )}

            {/* Upload Step */}
            {currentStep === 'upload' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-brand p-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-primary-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                        Upload Resume Files
                      </h2>
                      <p className="text-neutral-600">
                        Drag & drop your resume files here, or click to browse
                      </p>
                    </div>
                    
                    <DropzoneUploader
                      onFilesUploaded={handleFilesUploaded}
                      maxFiles={3}
                      maxFileSize={10 * 1024 * 1024} // 10MB
                      acceptedTypes={['pdf', 'doc', 'docx']}
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-brand p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                      📁 No Resumes Uploaded
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4">
                      Upload your first resume to get started with AI-powered analysis.
                    </p>
                    <div className="space-y-2 text-xs text-neutral-500">
                      <div className="flex items-center justify-between">
                        <span>Supported formats:</span>
                        <span>PDF, DOC, DOCX</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Max file size:</span>
                        <span>10MB per file</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Max files:</span>
                        <span>3 files</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Step */}
            {currentStep === 'preview' && selectedFile && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-brand p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">{selectedFile.name}</h3>
                        <p className="text-sm text-neutral-600">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Pending
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleStartAnalysis}
                      >
                        Start Analysis
                      </Button>
                      <Button
                        variant="tertiary"
                        size="sm"
                        onClick={() => setCurrentStep('upload')}
                      >
                        Upload Another
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <DocumentPreview file={selectedFile} />
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-brand p-6">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                        File Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-neutral-600">Name:</span>
                          <p className="font-medium text-neutral-900">{selectedFile.name}</p>
                        </div>
                        <div>
                          <span className="text-sm text-neutral-600">Size:</span>
                          <p className="font-medium text-neutral-900">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-neutral-600">Type:</span>
                          <p className="font-medium text-neutral-900">{selectedFile.type}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analyzing Step */}
            {currentStep === 'analyzing' && analysisProgress && (
              <div className="max-w-4xl mx-auto">
                <ProgressTracker
                  progress={analysisProgress}
                  fileName={selectedFile?.name || 'CV'}
                  onCancel={() => setCurrentStep('preview')}
                />
              </div>
            )}

            {/* Results Step */}
            {currentStep === 'results' && analysisResults.length > 0 && (
              <div>
                <CVAnalysisResult
                  result={analysisResults[0]}
                  onNewAnalysis={handleNewAnalysis}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};
        