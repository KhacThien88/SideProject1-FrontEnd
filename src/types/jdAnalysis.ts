/**
 * JD Analysis Types
 * Type definitions for Job Description upload, analysis, and CV matching
 */

export interface UploadedJD {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'analyzing' | 'analyzed' | 'failed';
  progress: number;
  url?: string;
  error?: string;
  uploadedAt?: string;
  isDuplicate?: boolean;
  matchType?: 'hash' | 'filename';
}

export interface JDAnalysisProgress {
  stage: 'upload' | 'extract' | 'analyze' | 'processing' | 'matching' | 'complete';
  percentage: number;
  estimatedTime?: number;
  currentFile?: string;
}

export interface JDStructuredData {
  job_title: string;
  company_name: string;
  location: string;
  salary_range?: string;
  job_type: string;
  experience_level: string;
  required_skills: string[];
  preferred_skills: string[];
  job_description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  application_deadline?: string;
  contact_email?: string;
  company_description?: string;
}

export interface CVMatchResult {
  id: string;
  candidate_id: string;
  match_score: number;
  candidate_name: string;
  email: string;
  location: string;
  current_role?: string;
  years_of_experience?: number;
  skills: string[];
  components?: {
    cross_encoder_score?: number;
    rrf_score?: number;
    skill_jaccard_score?: number;
    location_boost?: number;
    years_penalty?: number;
  };
}

export interface CVMatchesData {
  success: boolean;
  jd_id: string;
  candidates: CVMatchResult[];
  total_candidates: number;
  matching_criteria?: {
    cross_encoder_weight?: number;
    rrf_weight?: number;
    skill_jaccard_weight?: number;
    location_boost?: number;
    years_penalty?: string;
  };
  insights?: {
    total_processed: number;
    avg_match_score: number;
    search_strategy: string;
  };
}

export interface JDAnalysisResult {
  success: boolean;
  file_id: string;
  jd_id?: string;
  status: string;
  message?: string;
  structured_data?: JDStructuredData;
  ai_insights?: {
    market_analysis?: {
      demand_level: string;
      competition: string;
    };
    candidate_availability?: {
      total_candidates: number;
      qualified: number;
    };
    salary_insights?: {
      market_rate: string;
      trend: string;
    };
    hiring_recommendations?: string[];
  };
  cv_matches?: CVMatchesData;
  is_cached?: boolean;
  cached_timestamp?: string;
  processing_time?: number;
  extraction_method?: string;
}

export interface JDUploadFilters {
  location?: string;
  min_experience?: number;
  skills?: string[];
}

export interface DetailedJDAnalysisResult extends JDAnalysisResult {
  fileName: string;
  fileSize: number;
  uploadTime: string;
}

