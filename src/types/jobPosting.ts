export type ExperienceLevel = '0-1 years' | '1-2 years' | '2+ years' | '3+ years' | '5+ years';

export type SkillLevel = 'required' | 'preferred';

export interface JobSkill {
  name: string;
  level: SkillLevel;
  color?: string;
}

export interface JobProfile {
  id: string;
  title: string;
  description: string;
  experience: ExperienceLevel;
  requiredSkills: string[];
  preferredSkills: string[];
  activeMatches: number;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'draft';
}

export interface CreateJobProfileData {
  title: string;
  description: string;
  experience: ExperienceLevel;
  requiredSkills: string[];
  preferredSkills: string[];
}

export interface UpdateJobProfileData extends Partial<CreateJobProfileData> {
  status?: JobProfile['status'];
}

export interface JobMatch {
  id: string;
  jobProfileId: string;
  candidateName: string;
  matchScore: number;
  resumeUrl: string;
  createdAt: Date;
}
