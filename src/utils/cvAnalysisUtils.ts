import { CV_ANALYSIS_CONFIG } from '../types/cvAnalysis';
import type { UploadedFile, ValidationError, DetailedAnalysisResult } from '../types/cvAnalysis';

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateFiles = (
  files: FileList,
  currentFiles: UploadedFile[]
): { valid: File[]; errors: ValidationError[] } => {
  const valid: File[] = [];
  const errors: ValidationError[] = [];
  const currentCount = currentFiles.length;

  Array.from(files).forEach(file => {
    // Check file count
    if (currentCount + valid.length >= CV_ANALYSIS_CONFIG.MAX_FILES) {
      errors.push({
        file: file.name,
        message: `Maximum ${CV_ANALYSIS_CONFIG.MAX_FILES} files allowed`,
        type: 'count'
      });
      return;
    }

    // Check file size
    if (file.size > CV_ANALYSIS_CONFIG.MAX_FILE_SIZE) {
      errors.push({
        file: file.name,
        message: `File size exceeds ${formatFileSize(CV_ANALYSIS_CONFIG.MAX_FILE_SIZE)} limit`,
        type: 'size'
      });
      return;
    }

    // Check file type
    if (!Object.keys(CV_ANALYSIS_CONFIG.ACCEPTED_TYPES).includes(file.type)) {
      errors.push({
        file: file.name,
        message: 'Only PDF, DOC, and DOCX files are supported',
        type: 'format'
      });
      return;
    }

    // Check for duplicates
    const isDuplicate = currentFiles.some(existing => 
      existing.name === file.name && existing.size === file.size
    );
    
    if (isDuplicate) {
      errors.push({
        file: file.name,
        message: 'File already exists',
        type: 'count'
      });
      return;
    }

    valid.push(file);
  });

  return { valid, errors };
};

export const generateMockAnalysisResults = (files: UploadedFile[]): DetailedAnalysisResult[] => {
  const names = ['Mike Johnson', 'Sarah Chen', 'David Smith', 'Emily Wilson', 'Alex Rodriguez'];
  const locations = ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA', 'Chicago, IL'];
  
  // Expanded skills to match various job positions
  const techSkills = [
    'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Java', 'C++', 'C#',
    'HTML', 'CSS', 'SASS', 'Tailwind CSS', 'Bootstrap', 'Redux', 'MobX', 'GraphQL', 'REST API',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
    'Git', 'Jenkins', 'CI/CD', 'Microservices', 'TDD', 'Agile', 'Scrum', 'DevOps',
    'Machine Learning', 'Data Analysis', 'SQL', 'NoSQL', 'Elasticsearch', 'Webpack', 'Vite'
  ];
  
  const softSkills = [
    'Leadership', 'Communication', 'Problem Solving', 'Team Management', 'Project Management',
    'Critical Thinking', 'Adaptability', 'Time Management', 'Collaboration', 'Mentoring'
  ];
  
  const allSkills = [...techSkills, ...softSkills];
  
  return files.map(file => {
    // Generate 5-8 diverse skills for each candidate
    const numSkills = Math.floor(Math.random() * 4) + 5;
    const candidateSkills = [];
    const usedSkills = new Set();
    
    while (candidateSkills.length < numSkills) {
      const skill = allSkills[Math.floor(Math.random() * allSkills.length)];
      if (!usedSkills.has(skill)) {
        candidateSkills.push({
          name: skill,
          confidence: Math.floor(Math.random() * 30) + 70 // 70-100%
        });
        usedSkills.add(skill);
      }
    }
    
    const recommendations = [
      'Add more technical projects to showcase skills',
      'Improve keyword optimization for ATS systems',
      'Include quantifiable achievements and metrics',
      'Add relevant certifications or training',
      'Enhance soft skills demonstration',
      'Update with latest industry technologies',
      'Include leadership and teamwork examples'
    ];
    
    const randomRecommendations = recommendations
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 2);
    
    return {
      id: file.id,
      fileName: file.name,
      contactInfo: {
        name: names[Math.floor(Math.random() * names.length)],
        email: 'candidate@email.com',
        phone: '+1 (555) 123-4567',
        location: locations[Math.floor(Math.random() * locations.length)]
      },
      overallScore: Math.floor(Math.random() * 20) + 75, // 75-95%
      skillsMatch: Math.floor(Math.random() * 18) + 82, // 82-100%
      experience: Math.floor(Math.random() * 21) + 79, // 79-100%
      education: Math.floor(Math.random() * 17) + 83, // 83-100%
      keywords: Math.floor(Math.random() * 25) + 75, // 75-100%
      detectedSkills: candidateSkills,
      jobMatchAnalysis: {
        matchPercentage: Math.floor(Math.random() * 20) + 75, // 75-95%
        recommendations: randomRecommendations
      },
      analyzedDate: new Date().toLocaleDateString()
    };
  });
};