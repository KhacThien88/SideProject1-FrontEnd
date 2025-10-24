/**
 * JD Matching Service
 * API calls for JD-CV matching operations
 */
import { api } from '../base';
import {
  JDCVMatch,
  JDMatchesResponse,
  CVMatchesResponse,
  RecruiterMatchesResponse,
  CandidateMatchesResponse,
  MatchActionResponse,
  DeleteMatchesResponse
} from '../../../types/jdMatching';

export class JDMatchingService {
  /**
   * Get all matched candidates for a specific JD
   */
  static async getMatchedCandidatesForJD(
    jdId: string,
    limit: number = 50
  ): Promise<JDMatchesResponse> {
    const response = await api.get(`/jd/${jdId}/matched-candidates?limit=${limit}`);
    return response.data;
  }

  /**
   * Get all matched jobs for a specific CV
   */
  static async getMatchedJobsForCV(
    cvId: string,
    limit: number = 50
  ): Promise<CVMatchesResponse> {
    const response = await api.get(`/cv/${cvId}/matched-jobs?limit=${limit}`);
    return response.data;
  }

  /**
   * Get all matches for recruiter's JDs
   */
  static async getRecruiterMatches(
    limit: number = 100
  ): Promise<RecruiterMatchesResponse> {
    const response = await api.get(`/recruiter/matches?limit=${limit}`);
    return response.data;
  }

  /**
   * Get all matches for candidate's CVs
   */
  static async getCandidateMatches(
    limit: number = 100
  ): Promise<CandidateMatchesResponse> {
    const response = await api.get(`/candidate/matches?limit=${limit}`);
    return response.data;
  }

  /**
   * Mark match as viewed by user
   */
  static async markMatchViewed(
    matchId: string,
    userType: 'recruiter' | 'candidate'
  ): Promise<MatchActionResponse> {
    const response = await api.post(`/matches/${matchId}/viewed?user_type=${userType}`);
    return response.data;
  }

  /**
   * Mark candidate as contacted by recruiter
   */
  static async markCandidateContacted(
    matchId: string
  ): Promise<MatchActionResponse> {
    const response = await api.post(`/matches/${matchId}/contact`);
    return response.data;
  }

  /**
   * Mark candidate interest in job
   */
  static async markCandidateInterested(
    matchId: string
  ): Promise<MatchActionResponse> {
    const response = await api.post(`/matches/${matchId}/interested`);
    return response.data;
  }

  /**
   * Delete all matches for a JD
   */
  static async deleteJDMatches(
    jdId: string
  ): Promise<DeleteMatchesResponse> {
    const response = await api.delete(`/jd/${jdId}/matches`);
    return response.data;
  }
}

export default JDMatchingService;
