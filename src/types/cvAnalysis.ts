export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
  uploadProgress?: number;
  status?: 'uploading' | 'processing' | 'completed' | 'failed' | 'error' | 'analyzed';
  error?: string;
  url?: string;
  fileId?: string;           // Server-generated file ID
  analysisStatus?: string;   // Analysis status from server
}

export interface AnalysisProgress {
  stage: 'upload' | 'extract' | 'analyze' | 'processing' | 'complete';
  percentage: number;
  estimatedTime?: number;
  currentFile?: string;
}

export interface ValidationError {
  file: string;
  message: string;
  type: 'size' | 'format' | 'count';
}

export interface DetailedAnalysisResult {
  fileId: string;  // Changed from id to fileId
  fileName: string;
  fileSize: number;
  analysisDate: string;  // Changed from analyzedDate
  status: string;
  extractedData: any;
  aiInsights: any;
  analysisResult: any;
  // Legacy fields for backward compatibility
  id?: string;
  contactInfo?: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  overallScore?: number;
  skillsMatch?: number;
  experience?: number;
  education?: number;
  keywords?: number;
  detectedSkills?: Array<{
    name: string;
    confidence: number;
  }>;
  jobMatchAnalysis?: {
    matchPercentage: number;
    recommendations: string[];
  };
  analyzedDate?: string;
}

// Configuration constants
export const CV_ANALYSIS_CONFIG = {
  MAX_FILES: 3,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_TYPES: {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  },
  JOB_POSITIONS: [
    'DevOps Engineer',
    'Full Stack Developer', 
    'Frontend Developer',
    'Backend Developer',
    'Software Engineer',
    'Cloud Engineer',
    'Data Engineer',
    'Mobile Developer',
    'UI/UX Designer',
    'Product Manager'
  ]
} as const;

// Utility function types
export type FileHandler = (files: FileList) => void;
export type FileAction = (fileId: string) => void;
export type AnalysisHandler = () => void;