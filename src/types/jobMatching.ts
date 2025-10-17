// Job data interfaces
export interface Job {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logo?: string;
    size?: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
    industry?: string;
    location?: string;
  };
  description: string;
  shortDescription?: string;
  requirements: {
    essential: string[];
    preferred: string[];
    experience: string;
    education?: string;
  };
  benefits: string[];
  location: {
    city: string;
    country: string;
    remote: boolean;
    hybrid?: boolean;
  };
  salary: {
    min?: number;
    max?: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  postedDate: string;
  deadline?: string;
  applicationUrl?: string;
  tags: string[];
  skills: string[];
}

// Job matching results
export interface JobMatchResult {
  job: Job;
  matchScore: number;
  skillsMatch: {
    matched: string[];
    missing: string[];
    percentage: number;
  };
  experienceMatch: {
    score: number;
    analysis: string;
  };
  locationMatch: {
    score: number;
    distance?: number;
  };
  salaryMatch: {
    score: number;
    comparison: 'below' | 'within' | 'above';
  };
  overallAnalysis: string;
  recommendationLevel: 'high' | 'medium' | 'low';
}

// Search and filter interfaces
export interface JobSearchFilters {
  keywords?: string;
  location?: {
    city?: string;
    country?: string;
    radius?: number;
    remote?: boolean;
  };
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  jobType?: ('full-time' | 'part-time' | 'contract' | 'freelance' | 'internship')[];
  experienceLevel?: ('entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive')[];
  companySize?: ('startup' | 'small' | 'medium' | 'large' | 'enterprise')[];
  industry?: string[];
  skills?: string[];
  postedWithin?: '24h' | '7d' | '30d' | '90d';
  sortBy?: 'relevance' | 'date' | 'salary' | 'match-score';
  sortOrder?: 'asc' | 'desc';
}

export interface JobSearchResults {
  jobs: JobMatchResult[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: JobSearchFilters;
  searchTime: number;
  suggestions?: string[];
}

// Pagination interface
export interface PaginationOptions {
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
  totalPages: number;
}

// User job actions
export interface JobAction {
  jobId: string;
  action: 'save' | 'apply' | 'share' | 'hide';
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface SavedJob extends Job {
  savedAt: string;
  notes?: string;
  userTags?: string[];
}

// Application tracking
export interface JobApplication {
  id: string;
  jobId: string;
  status: 'draft' | 'submitted' | 'viewed' | 'interview' | 'rejected' | 'accepted';
  appliedAt: string;
  lastUpdated: string;
  coverLetter?: string;
  resumeUsed?: string;
  notes?: string;
  timeline: {
    date: string;
    status: JobApplication['status'];
    notes?: string;
  }[];
}

// Configuration and constants
export const JOB_MATCHING_CONFIG = {
  RESULTS_PER_PAGE: 20,
  MAX_SAVED_JOBS: 100,
  SEARCH_DEBOUNCE_MS: 300,
  MAX_SEARCH_KEYWORDS: 10,
  SALARY_RANGES: {
    USD: [30000, 50000, 75000, 100000, 150000, 200000],
    VND: [300000000, 500000000, 750000000, 1000000000, 1500000000, 2000000000]
  },
  EXPERIENCE_LEVELS: [
    { value: 'entry', label: 'Entry Level (0-1 years)' },
    { value: 'junior', label: 'Junior (1-3 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior (5-8 years)' },
    { value: 'lead', label: 'Lead (8+ years)' },
    { value: 'executive', label: 'Executive (10+ years)' }
  ],
  COMPANY_SIZES: [
    { value: 'startup', label: 'Startup (1-10 employees)' },
    { value: 'small', label: 'Small (11-50 employees)' },
    { value: 'medium', label: 'Medium (51-200 employees)' },
    { value: 'large', label: 'Large (201-1000 employees)' },
    { value: 'enterprise', label: 'Enterprise (1000+ employees)' }
  ],
  JOB_TYPES: [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ],
  POPULAR_SKILLS: [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 
    'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'Redis',
    'GraphQL', 'REST API', 'Microservices', 'DevOps', 'CI/CD', 'Git'
  ]
} as const;

// Utility function types
export type JobSearchHandler = (filters: JobSearchFilters) => Promise<JobSearchResults>;
export type JobActionHandler = (action: JobAction) => Promise<void>;
export type JobSaveHandler = (job: Job) => Promise<void>;
export type JobApplyHandler = (jobId: string, application: Partial<JobApplication>) => Promise<void>;

// Component prop types
export interface JobCardProps {
  job: JobMatchResult;
  onSave: (job: Job) => void;
  onApply: (jobId: string) => void;
  onShare: (job: Job) => void;
  onViewDetails: (jobId: string) => void;
  isSaved?: boolean;
  className?: string;
}

export interface JobFiltersProps {
  filters: JobSearchFilters;
  onFiltersChange: (filters: JobSearchFilters) => void;
  availableSkills?: string[];
  availableLocations?: string[];
  className?: string;
}