export interface CandidateMatch {
  id: string;
  candidateId: string;
  jobProfileId: string;
  matchScore: number; // 0-100
  
  // Candidate Info
  candidateName: string;
  email: string;
  phone: string;
  avatar?: string;
  location: string;
  
  // Professional Info
  currentRole: string;
  yearsOfExperience: number;
  education: string;
  
  // Skills Match
  matchedSkills: string[];
  missingSkills: string[];
  additionalSkills: string[];
  
  // Match Details
  experienceMatch: number; // 0-100
  skillsMatch: number; // 0-100
  locationMatch: number; // 0-100
  
  // Resume & Saved Status
  resumeUrl: string;
  isSaved: boolean; // Star/bookmark status
  appliedDate: Date;
  lastUpdated: Date;
  
  // Optional
  summary?: string;
  strengths?: string[];
  concerns?: string[];
}

export interface CandidateDetail extends CandidateMatch {
  // Extended profile info
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  
  // Work History
  workHistory: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  
  // Education
  educationHistory: {
    institution: string;
    degree: string;
    field: string;
    year: string;
  }[];
  
  // Certifications
  certifications?: string[];
  
  // Languages
  languages?: {
    name: string;
    proficiency: string;
  }[];
}

export interface MatchFilters {
  minMatchScore?: number;
  maxMatchScore?: number;
  experienceYears?: {
    min?: number;
    max?: number;
  };
  skills?: string[];
  location?: string[];
}

export type MatchSortOption = 'matchScore' | 'appliedDate' | 'name' | 'experience';
