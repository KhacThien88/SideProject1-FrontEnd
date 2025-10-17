import type { 
  Job, 
  JobMatchResult, 
  JobSearchFilters, 
  PaginationOptions 
} from '../types/jobMatching';

// Utility functions for job matching
export const formatSalary = (
  min?: number, 
  max?: number, 
  currency: string = 'USD', 
  period: string = 'yearly'
): string => {
  const formatNumber = (num: number) => {
    if (currency === 'VND') {
      return new Intl.NumberFormat('vi-VN').format(num);
    }
    return new Intl.NumberFormat('en-US').format(num);
  };

  const periodSuffix = period === 'yearly' ? '/year' : period === 'monthly' ? '/month' : '/hour';
  
  if (min && max) {
    return `${formatNumber(min)} - ${formatNumber(max)} ${currency}${periodSuffix}`;
  } else if (min) {
    return `From ${formatNumber(min)} ${currency}${periodSuffix}`;
  } else if (max) {
    return `Up to ${formatNumber(max)} ${currency}${periodSuffix}`;
  }
  return 'Salary not specified';
};

export const calculateTimeAgo = (date: string): string => {
  const now = new Date();
  const postDate = new Date(date);
  const diffInMs = now.getTime() - postDate.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
  return `${diffInMonths}mo ago`;
};

export const getMatchScoreColor = (score: number): string => {
  if (score >= 80) return 'text-success-600 bg-success-100';
  if (score >= 60) return 'text-warning-600 bg-warning-100';
  return 'text-error-600 bg-error-100';
};

export const getMatchScoreText = (score: number): string => {
  if (score >= 80) return 'Excellent match';
  if (score >= 60) return 'Good match';
  if (score >= 40) return 'Fair match';
  return 'Poor match';
};

export const sortJobs = (
  jobs: JobMatchResult[], 
  sortBy: JobSearchFilters['sortBy'] = 'relevance',
  sortOrder: JobSearchFilters['sortOrder'] = 'desc'
): JobMatchResult[] => {
  const sorted = [...jobs].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'match-score':
        comparison = a.matchScore - b.matchScore;
        break;
      case 'date':
        comparison = new Date(a.job.postedDate).getTime() - new Date(b.job.postedDate).getTime();
        break;
      case 'salary':
        const salaryA = a.job.salary.max || a.job.salary.min || 0;
        const salaryB = b.job.salary.max || b.job.salary.min || 0;
        comparison = salaryA - salaryB;
        break;
      case 'relevance':
      default:
        // Relevance combines match score with recency
        const scoreWeight = 0.7;
        const dateWeight = 0.3;
        const daysSinceA = (Date.now() - new Date(a.job.postedDate).getTime()) / (1000 * 60 * 60 * 24);
        const daysSinceB = (Date.now() - new Date(b.job.postedDate).getTime()) / (1000 * 60 * 60 * 24);
        const relevanceA = (a.matchScore * scoreWeight) + ((30 - Math.min(daysSinceA, 30)) * dateWeight);
        const relevanceB = (b.matchScore * scoreWeight) + ((30 - Math.min(daysSinceB, 30)) * dateWeight);
        comparison = relevanceA - relevanceB;
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
};

export const filterJobs = (jobs: JobMatchResult[], filters: JobSearchFilters): JobMatchResult[] => {
  return jobs.filter(jobResult => {
    const job = jobResult.job;
    
    // Keywords filter
    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase();
      const searchableText = `${job.title} ${job.company.name} ${job.description} ${job.skills.join(' ')}`.toLowerCase();
      if (!searchableText.includes(keywords)) return false;
    }
    
    // Job type filter
    if (filters.jobType && filters.jobType.length > 0) {
      if (!filters.jobType.includes(job.type)) return false;
    }
    
    // Location filter
    if (filters.location) {
      if (filters.location.remote && !job.location.remote) return false;
      if (filters.location.city && job.location.city !== filters.location.city) return false;
      if (filters.location.country && job.location.country !== filters.location.country) return false;
    }
    
    // Salary filter
    if (filters.salary) {
      const jobMaxSalary = job.salary.max || job.salary.min || 0;
      const jobMinSalary = job.salary.min || job.salary.max || 0;
      
      if (filters.salary.min && jobMaxSalary < filters.salary.min) return false;
      if (filters.salary.max && jobMinSalary > filters.salary.max) return false;
    }
    
    // Skills filter
    if (filters.skills && filters.skills.length > 0) {
      const jobSkills = job.skills.map(skill => skill.toLowerCase());
      const hasRequiredSkills = filters.skills.some(skill => 
        jobSkills.includes(skill.toLowerCase())
      );
      if (!hasRequiredSkills) return false;
    }
    
    // Company size filter
    if (filters.companySize && filters.companySize.length > 0) {
      if (job.company.size && !filters.companySize.includes(job.company.size)) return false;
    }
    
    // Posted within filter
    if (filters.postedWithin) {
      const now = new Date();
      const postedDate = new Date(job.postedDate);
      const diffInMs = now.getTime() - postedDate.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);
      
      switch (filters.postedWithin) {
        case '24h':
          if (diffInHours > 24) return false;
          break;
        case '7d':
          if (diffInHours > 24 * 7) return false;
          break;
        case '30d':
          if (diffInHours > 24 * 30) return false;
          break;
        case '90d':
          if (diffInHours > 24 * 90) return false;
          break;
      }
    }
    
    return true;
  });
};

export const paginateResults = (
  jobs: JobMatchResult[], 
  page: number, 
  limit: number
): { jobs: JobMatchResult[]; pagination: PaginationOptions } => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedJobs = jobs.slice(startIndex, endIndex);
  
  const totalPages = Math.ceil(jobs.length / limit);
  
  return {
    jobs: paginatedJobs,
    pagination: {
      page,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      totalCount: jobs.length,
      totalPages
    }
  };
};

export const generateSearchSuggestions = (query: string, availableSkills: string[] = []): string[] => {
  if (!query || query.length < 2) return [];
  
  const suggestions = availableSkills
    .filter(skill => skill.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);
    
  return suggestions;
};

export const highlightMatchedSkills = (skills: string[], matchedSkills: string[]): Array<{skill: string, matched: boolean}> => {
  return skills.map(skill => ({
    skill,
    matched: matchedSkills.some(matched => matched.toLowerCase() === skill.toLowerCase())
  }));
};

export const calculateOverallMatchScore = (
  skillsMatch: number,
  experienceMatch: number,
  locationMatch: number,
  salaryMatch: number
): number => {
  const weights = {
    skills: 0.4,
    experience: 0.3,
    location: 0.2,
    salary: 0.1
  };
  
  return Math.round(
    (skillsMatch * weights.skills) +
    (experienceMatch * weights.experience) +
    (locationMatch * weights.location) +
    (salaryMatch * weights.salary)
  );
};

// Mock data generators for development
export const generateMockJobs = (count: number = 20): Job[] => {
  const companies = [
    { name: 'TechCorp', industry: 'Technology', size: 'large' as const },
    { name: 'StartupX', industry: 'Fintech', size: 'startup' as const },
    { name: 'GlobalSoft', industry: 'Software', size: 'enterprise' as const },
    { name: 'InnovateLab', industry: 'AI/ML', size: 'medium' as const },
    { name: 'CloudFirst', industry: 'Cloud Services', size: 'large' as const }
  ];
  
  const jobTitles = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'DevOps Engineer', 'Data Scientist', 'Product Manager',
    'UI/UX Designer', 'Mobile Developer', 'Cloud Architect'
  ];
  
  const cities = ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Singapore', 'Bangkok'];
  const skills = ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'MongoDB'];
  
  return Array.from({ length: count }, (_, i) => {
    const company = companies[i % companies.length];
    const title = jobTitles[i % jobTitles.length];
    const city = cities[i % cities.length];
    
    return {
      id: `job-${i + 1}`,
      title,
      company: {
        id: `company-${i + 1}`,
        name: company.name,
        size: company.size,
        industry: company.industry,
        location: city
      },
      description: `We are looking for an experienced ${title} to join our team...`,
      shortDescription: `Join our team as a ${title} and work on exciting projects.`,
      requirements: {
        essential: skills.slice(0, 3),
        preferred: skills.slice(3, 6),
        experience: `${2 + (i % 6)} years`,
        education: 'Bachelor\'s degree in Computer Science or related field'
      },
      benefits: ['Health Insurance', 'Flexible Working Hours', 'Learning Budget'],
      location: {
        city,
        country: city.includes('Singapore') ? 'Singapore' : city.includes('Bangkok') ? 'Thailand' : 'Vietnam',
        remote: Math.random() > 0.5,
        hybrid: Math.random() > 0.7
      },
      salary: {
        min: 800 + (i * 100),
        max: 1200 + (i * 150),
        currency: 'USD',
        period: 'monthly' as const
      },
      type: ['full-time', 'part-time', 'contract'][i % 3] as any,
      postedDate: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
      applicationUrl: `https://example.com/apply/${i + 1}`,
      tags: ['featured', 'urgent', 'new'].slice(0, i % 3),
      skills: skills.slice(0, 4 + (i % 4))
    };
  });
};

export const generateMockJobMatchResults = (jobs: Job[]): JobMatchResult[] => {
  return jobs.map(job => {
    const matchScore = 50 + Math.floor(Math.random() * 50);
    
    return {
      job,
      matchScore,
      skillsMatch: {
        matched: job.skills.slice(0, Math.floor(job.skills.length * 0.7)),
        missing: job.skills.slice(Math.floor(job.skills.length * 0.7)),
        percentage: 60 + Math.floor(Math.random() * 40)
      },
      experienceMatch: {
        score: 50 + Math.floor(Math.random() * 50),
        analysis: 'Your experience aligns well with the requirements.'
      },
      locationMatch: {
        score: job.location.remote ? 100 : 75 + Math.floor(Math.random() * 25),
        distance: job.location.remote ? 0 : Math.floor(Math.random() * 50)
      },
      salaryMatch: {
        score: 70 + Math.floor(Math.random() * 30),
        comparison: ['below', 'within', 'above'][Math.floor(Math.random() * 3)] as any
      },
      overallAnalysis: 'This position matches your profile well based on skills and experience.',
      recommendationLevel: matchScore >= 80 ? 'high' : matchScore >= 60 ? 'medium' : 'low'
    };
  });
};