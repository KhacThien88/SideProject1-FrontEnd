import type { CandidateMatch, CandidateDetail, MatchFilters } from '../../../types/candidateMatch';

// Mock candidate matches data
const generateMockCandidateMatches = (jobProfileId: string, count: number = 10): CandidateMatch[] => {
  const names = [
    'Nguyễn Văn An', 'Trần Thị Bình', 'Lê Hoàng Cường', 'Phạm Thị Dung',
    'Hoàng Văn Em', 'Đặng Thị Phương', 'Vũ Văn Giang', 'Bùi Thị Hà',
    'Đinh Văn Hùng', 'Ngô Thị Lan', 'John Smith', 'Sarah Johnson',
    'Michael Chen', 'Emily Wang', 'David Kim', 'Lisa Park'
  ];
  
  const roles = [
    'Senior Frontend Developer', 'Full Stack Engineer', 'Backend Developer',
    'Software Engineer', 'Lead Developer', 'Technical Lead', 'DevOps Engineer'
  ];
  
  const locations = ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Singapore', 'Bangkok'];
  
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
    'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'MongoDB', 'GraphQL',
    'Vue.js', 'Angular', 'Express', 'Django', 'Spring Boot'
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const matchScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const skillsMatch = Math.floor(Math.random() * 30) + 70;
    const experienceMatch = Math.floor(Math.random() * 35) + 65;
    const locationMatch = Math.random() > 0.3 ? 100 : Math.floor(Math.random() * 40) + 40;
    
    const allSkills = [...skills].sort(() => 0.5 - Math.random());
    const matchedCount = Math.floor(Math.random() * 5) + 3;
    const matchedSkills = allSkills.slice(0, matchedCount);
    const missingSkills = allSkills.slice(matchedCount, matchedCount + 2);
    const additionalSkills = allSkills.slice(matchedCount + 2, matchedCount + 5);
    
    const daysAgo = Math.floor(Math.random() * 30);
    const appliedDate = new Date();
    appliedDate.setDate(appliedDate.getDate() - daysAgo);
    
    return {
      id: `match-${jobProfileId}-${i + 1}`,
      candidateId: `candidate-${i + 1}`,
      jobProfileId,
      matchScore,
      
      candidateName: names[i % names.length],
      email: `${names[i % names.length].toLowerCase().replace(/\s+/g, '.')}@email.com`,
      phone: `+84 ${Math.floor(Math.random() * 900000000) + 100000000}`,
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      
      currentRole: roles[Math.floor(Math.random() * roles.length)],
      yearsOfExperience: Math.floor(Math.random() * 10) + 2,
      education: ['Bachelor in Computer Science', 'Master in Software Engineering', 'Bachelor in Information Technology'][Math.floor(Math.random() * 3)],
      
      matchedSkills,
      missingSkills,
      additionalSkills,
      
      experienceMatch,
      skillsMatch,
      locationMatch,
      
      resumeUrl: `/resumes/candidate-${i + 1}.pdf`,
      isSaved: false, // Default not saved
      appliedDate,
      lastUpdated: new Date(),
      
      summary: `Experienced ${roles[Math.floor(Math.random() * roles.length)].toLowerCase()} with ${Math.floor(Math.random() * 10) + 2} years in software development.`,
      strengths: matchedSkills.slice(0, 3),
      concerns: missingSkills.length > 0 ? [`Missing ${missingSkills[0]} experience`] : undefined,
    };
  });
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage
const candidateMatchesStore: Map<string, CandidateMatch[]> = new Map();

export const candidateMatchService = {
  // Get all candidate matches for a job profile
  async getCandidateMatches(
    jobProfileId: string,
    filters?: MatchFilters
  ): Promise<CandidateMatch[]> {
    await delay(600);
    
    // Generate or get cached matches
    if (!candidateMatchesStore.has(jobProfileId)) {
      const matches = generateMockCandidateMatches(jobProfileId, 15);
      candidateMatchesStore.set(jobProfileId, matches);
    }
    
    let matches = candidateMatchesStore.get(jobProfileId) || [];
    
    // Apply filters
    if (filters) {
      if (filters.minMatchScore !== undefined) {
        matches = matches.filter(m => m.matchScore >= filters.minMatchScore!);
      }
      
      if (filters.maxMatchScore !== undefined) {
        matches = matches.filter(m => m.matchScore <= filters.maxMatchScore!);
      }
      
      if (filters.experienceYears) {
        if (filters.experienceYears.min !== undefined) {
          matches = matches.filter(m => m.yearsOfExperience >= filters.experienceYears!.min!);
        }
        if (filters.experienceYears.max !== undefined) {
          matches = matches.filter(m => m.yearsOfExperience <= filters.experienceYears!.max!);
        }
      }
      
      if (filters.skills && filters.skills.length > 0) {
        matches = matches.filter(m =>
          filters.skills!.some(skill =>
            m.matchedSkills.some(ms => ms.toLowerCase().includes(skill.toLowerCase()))
          )
        );
      }
      
      if (filters.location && filters.location.length > 0) {
        matches = matches.filter(m => filters.location!.includes(m.location));
      }
    }
    
    return matches;
  },

  // Get detailed candidate information
  async getCandidateDetail(matchId: string): Promise<CandidateDetail | null> {
    await delay(400);
    
    // Find the match across all job profiles
    for (const matches of candidateMatchesStore.values()) {
      const match = matches.find(m => m.id === matchId);
      if (match) {
        // Extend with additional details
        return {
          ...match,
          linkedinUrl: `https://linkedin.com/in/${match.candidateName.toLowerCase().replace(/\s+/g, '-')}`,
          githubUrl: `https://github.com/${match.candidateName.toLowerCase().replace(/\s+/g, '')}`,
          portfolioUrl: `https://${match.candidateName.toLowerCase().replace(/\s+/g, '')}.dev`,
          
          workHistory: [
            {
              company: 'Tech Corp',
              role: match.currentRole,
              duration: '2020 - Present',
              description: 'Led development of microservices architecture'
            },
            {
              company: 'StartupXYZ',
              role: 'Software Engineer',
              duration: '2018 - 2020',
              description: 'Developed web applications using React and Node.js'
            }
          ],
          
          educationHistory: [
            {
              institution: 'University of Technology',
              degree: match.education.split(' in ')[0],
              field: match.education.split(' in ')[1] || 'Computer Science',
              year: '2014 - 2018'
            }
          ],
          
          certifications: ['AWS Certified Developer', 'Professional Scrum Master'],
          
          languages: [
            { name: 'Vietnamese', proficiency: 'Native' },
            { name: 'English', proficiency: 'Fluent' }
          ]
        };
      }
    }
    
    return null;
  },

  // Toggle saved/bookmark status
  async toggleSaved(matchId: string): Promise<CandidateMatch> {
    await delay(300);
    
    for (const matches of candidateMatchesStore.values()) {
      const match = matches.find(m => m.id === matchId);
      if (match) {
        match.isSaved = !match.isSaved;
        match.lastUpdated = new Date();
        return match;
      }
    }
    
    throw new Error('Match not found');
  },

  // Download resume
  async downloadResume(_resumeUrl: string): Promise<Blob> {
    await delay(500);
    // Mock PDF blob - in real implementation would fetch from _resumeUrl
    return new Blob(['Mock PDF content'], { type: 'application/pdf' });
  },
};

