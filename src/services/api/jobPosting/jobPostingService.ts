import type { 
  JobProfile, 
  CreateJobProfileData, 
  UpdateJobProfileData,
  JobMatch 
} from '../../../types/jobPosting';

// Mock data
const mockJobProfiles: JobProfile[] = [
  {
    id: '1',
    title: 'Full Stack Developer',
    description: 'Full stack web developer with modern JavaScript technologies',
    experience: '3+ years',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'HTML'],
    preferredSkills: ['Python', 'TypeScript', 'PostgreSQL'],
    activeMatches: 13,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-20'),
    status: 'active',
  },
  {
    id: '2',
    title: 'Frontend Developer',
    description: 'Frontend developer focused on user interface development',
    experience: '2+ years',
    requiredSkills: ['JavaScript', 'React', 'HTML', 'CSS'],
    preferredSkills: ['TypeScript', 'Vue.js', 'Sass'],
    activeMatches: 7,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-03-18'),
    status: 'active',
  },
  {
    id: '3',
    title: 'Backend Developer',
    description: 'Backend developer experienced in server-side technologies',
    experience: '3+ years',
    requiredSkills: ['Python', 'Django', 'PostgreSQL', 'Redis'],
    preferredSkills: ['Docker', 'Kubernetes', 'AWS'],
    activeMatches: 9,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-15'),
    status: 'active',
  },
  {
    id: '4',
    title: 'Data Scientist',
    description: 'Data scientist with machine learning and analytics expertise',
    experience: '3+ years',
    requiredSkills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    preferredSkills: ['TensorFlow', 'PyTorch', 'R'],
    activeMatches: 5,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-03-10'),
    status: 'active',
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const jobPostingService = {
  // Get all job profiles
  async getJobProfiles(): Promise<JobProfile[]> {
    await delay(500);
    return [...mockJobProfiles];
  },

  // Get a single job profile by ID
  async getJobProfile(id: string): Promise<JobProfile | null> {
    await delay(300);
    return mockJobProfiles.find(profile => profile.id === id) || null;
  },

  // Create a new job profile
  async createJobProfile(data: CreateJobProfileData): Promise<JobProfile> {
    await delay(700);
    const newProfile: JobProfile = {
      id: String(mockJobProfiles.length + 1),
      ...data,
      activeMatches: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active',
    };
    mockJobProfiles.push(newProfile);
    return newProfile;
  },

  // Update a job profile
  async updateJobProfile(id: string, data: UpdateJobProfileData): Promise<JobProfile> {
    await delay(600);
    const index = mockJobProfiles.findIndex(profile => profile.id === id);
    if (index === -1) {
      throw new Error('Job profile not found');
    }
    
    mockJobProfiles[index] = {
      ...mockJobProfiles[index],
      ...data,
      updatedAt: new Date(),
    };
    
    return mockJobProfiles[index];
  },

  // Delete a job profile
  async deleteJobProfile(id: string): Promise<void> {
    await delay(500);
    const index = mockJobProfiles.findIndex(profile => profile.id === id);
    if (index === -1) {
      throw new Error('Job profile not found');
    }
    mockJobProfiles.splice(index, 1);
  },

  // Get matches for a job profile
  async getMatches(jobProfileId: string): Promise<JobMatch[]> {
    await delay(600);
    // Mock matches - in real app, this would fetch actual candidate matches
    const profile = mockJobProfiles.find(p => p.id === jobProfileId);
    if (!profile) {
      throw new Error('Job profile not found');
    }

    return Array.from({ length: profile.activeMatches }, (_, i) => ({
      id: `${jobProfileId}-match-${i + 1}`,
      jobProfileId,
      candidateName: `Candidate ${i + 1}`,
      matchScore: Math.floor(Math.random() * 30) + 70, // 70-100
      resumeUrl: `/resumes/candidate-${i + 1}.pdf`,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    }));
  },

  // Search job profiles
  async searchJobProfiles(query: string): Promise<JobProfile[]> {
    await delay(400);
    const lowerQuery = query.toLowerCase();
    return mockJobProfiles.filter(
      profile =>
        profile.title.toLowerCase().includes(lowerQuery) ||
        profile.description.toLowerCase().includes(lowerQuery) ||
        profile.requiredSkills.some((skill: string) => skill.toLowerCase().includes(lowerQuery)) ||
        profile.preferredSkills.some((skill: string) => skill.toLowerCase().includes(lowerQuery))
    );
  },
};
