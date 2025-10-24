/**
 * Types for JD-CV Matching System
 */

export interface JDCVMatch {
  match_id: string;
  jd_id: string;
  cv_id: string;
  recruiter_id: string;
  candidate_id: string;
  match_score: number;
  skill_match_score: number;
  experience_match_score: number;
  location_match_score: number;
  matched_skills: string[];
  match_components: {
    cross_encoder_norm: number;
    rrf_norm: number;
    skill_jaccard: number;
    loc_boost: number;
    years_penalty: number;
  };
  recruiter_viewed: boolean;
  candidate_viewed: boolean;
  recruiter_contacted: boolean;
  candidate_interested: boolean;
  matched_at: string;
  recruiter_viewed_at?: string;
  candidate_viewed_at?: string;
}

export interface CVMatchResult {
  id: string;
  candidate_id: string;
  match_score: number;
  candidate_name: string;
  email: string;
  location: string;
  current_role: string;
  years_of_experience: number;
  skills: string[];
  components: {
    cross_encoder_norm: number;
    rrf_norm: number;
    skill_jaccard: number;
    loc_boost: number;
    years_penalty: number;
  };
}

export interface JDMatchesResponse {
  success: boolean;
  jd_id: string;
  matches: JDCVMatch[];
  total_matches: number;
  limit: number;
}

export interface CVMatchesResponse {
  success: boolean;
  cv_id: string;
  matches: JDCVMatch[];
  total_matches: number;
  limit: number;
}

export interface RecruiterMatchesResponse {
  success: boolean;
  recruiter_id: string;
  matches: JDCVMatch[];
  matches_by_jd: Record<string, JDCVMatch[]>;
  total_matches: number;
  limit: number;
}

export interface CandidateMatchesResponse {
  success: boolean;
  candidate_id: string;
  matches: JDCVMatch[];
  matches_by_cv: Record<string, JDCVMatch[]>;
  total_matches: number;
  limit: number;
}

export interface MatchActionResponse {
  success: boolean;
  match_id: string;
  message: string;
}

export interface DeleteMatchesResponse {
  success: boolean;
  jd_id: string;
  deleted_count: number;
  message: string;
}
