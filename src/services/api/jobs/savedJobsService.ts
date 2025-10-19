import type { SavedJobItem } from '../../../types/jobMatching';
import { generateMockJobs, generateMockJobMatchResults } from '../../../utils/jobMatchingUtils';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const buildInitialSavedJobs = (): SavedJobItem[] => {
  const mockJobs = generateMockJobs(18);
  const mockMatches = generateMockJobMatchResults(mockJobs);

  return mockMatches.map((match, index) => ({
    ...match,
    savedAt: new Date(Date.now() - index * 3_600_000).toISOString(),
    isSaved: true,
    notes: index % 4 === 0 ? 'Follow up with recruiter next week.' : undefined,
    userTags: index % 3 === 0 ? ['frontend', 'priority'] : undefined,
  }));
};

let savedJobsStore: SavedJobItem[] = buildInitialSavedJobs();

const cloneSavedJob = (job: SavedJobItem): SavedJobItem => ({
  ...job,
  job: {
    ...job.job,
    company: { ...job.job.company },
    requirements: {
      essential: [...job.job.requirements.essential],
      preferred: [...job.job.requirements.preferred],
      experience: job.job.requirements.experience,
      education: job.job.requirements.education,
    },
    benefits: [...job.job.benefits],
    location: { ...job.job.location },
    salary: { ...job.job.salary },
    tags: [...job.job.tags],
    skills: [...job.job.skills],
  },
  skillsMatch: {
    matched: [...job.skillsMatch.matched],
    missing: [...job.skillsMatch.missing],
    percentage: job.skillsMatch.percentage,
  },
  experienceMatch: { ...job.experienceMatch },
  locationMatch: { ...job.locationMatch },
  salaryMatch: { ...job.salaryMatch },
  userTags: job.userTags ? [...job.userTags] : undefined,
  notes: job.notes,
  savedAt: job.savedAt,
  isSaved: job.isSaved,
});

export const savedJobsService = {
  async getSavedJobs(): Promise<SavedJobItem[]> {
    await delay(400);
    return savedJobsStore.map(cloneSavedJob);
  },

  async removeSavedJob(jobId: string): Promise<void> {
    await delay(250);
    savedJobsStore = savedJobsStore.filter((job) => job.job.id !== jobId);
  },

  async toggleSaved(jobId: string): Promise<'added' | 'removed'> {
    await delay(250);
    const existingIndex = savedJobsStore.findIndex((job) => job.job.id === jobId);

    if (existingIndex >= 0) {
      savedJobsStore.splice(existingIndex, 1);
      return 'removed';
    }

    const newJob = buildInitialSavedJobs()[0];
    savedJobsStore = [
      {
        ...newJob,
        job: {
          ...newJob.job,
          id: jobId,
        },
        savedAt: new Date().toISOString(),
        isSaved: true,
      },
      ...savedJobsStore,
    ];

    return 'added';
  },

  async addNote(jobId: string, note: string): Promise<SavedJobItem | null> {
    await delay(200);
    const job = savedJobsStore.find((item) => item.job.id === jobId);
    if (!job) return null;
    job.notes = note;
    job.savedAt = new Date().toISOString();
    return cloneSavedJob(job);
  },

  async refreshSavedJobs(): Promise<SavedJobItem[]> {
    await delay(500);
    savedJobsStore = buildInitialSavedJobs();
    return this.getSavedJobs();
  },
};

export default savedJobsService;
