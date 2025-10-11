import type { ContentTaxonomy } from '../types/content';

export const en: ContentTaxonomy = {
  nav: {
    features: 'Features',
    pricing: 'Pricing',
    about: 'About Us',
    login: 'Login',
    language: 'Language',
  },
  
  hero: {
    headline: 'AI Resume Analyzer & Job Match Platform',
    subtitle: 'Find the perfect job with AI - Fast, Accurate, Efficient',
    ctaButtons: {
      uploadCV: 'Upload CV Now',
      postJob: 'Post Job',
      viewDemo: 'View Demo',
    },
    trustIndicators: [
      '10,000+ trusted users',
      '95% accuracy rate',
      '10s fast processing',
    ],
  },
  
  valueProps: {
    title: 'Why Choose Resulyze?',
    items: [
      {
        title: 'AI-Powered Analysis',
        description: 'Automatic CV analysis with 95% accuracy',
        metric: '95% Accuracy',
      },
      {
        title: 'Smart Matching',
        description: 'Intelligent job matching based on AI similarity',
        metric: 'AI Similarity',
      },
      {
        title: 'Real-time Processing',
        description: 'Fast processing within 10 seconds',
        metric: '10s Processing',
      },
      {
        title: 'Secure & Private',
        description: 'Absolute data security with GDPR compliance',
        metric: 'GDPR Compliant',
      },
    ],
  },

  landing: {
    valueProposition: {
      title: 'Our Core Values',
      subtitle: 'Discover the superior benefits that our AI platform brings to talent search and recruitment.',
      security: {
        title: 'Absolute Security',
        description: 'Your data is protected by advanced encryption technology and complies with international security standards.',
      },
      performance: {
        title: 'Superior Performance',
        description: 'Fast processing with high accuracy, helping you save time and improve work efficiency.',
      },
      collaboration: {
        title: 'Seamless Collaboration',
        description: 'Efficiently connect candidates and recruiters, creating an optimal recruitment environment.',
      },
      cta: {
        text: 'Ready to experience the difference?',
        button: 'Get Started',
      },
    },
  },


  features: {
    title: 'Powerful Features for Modern Recruitment',
    subtitle: 'Everything you need to streamline your hiring process with AI-powered tools',
    userFeatures: [
      {
        title: 'Real-time Collaboration',
        description: 'Work together seamlessly with your team members, share feedback instantly, and make hiring decisions faster with built-in communication tools.',
      },
      {
        title: 'Smart Automation',
        description: 'Automate repetitive tasks, schedule interviews automatically, and let AI handle initial candidate screening to focus on what matters most.',
      },
      {
        title: 'Advanced Analytics',
        description: 'Get deep insights into your hiring process with comprehensive analytics, track performance metrics, and optimize your recruitment strategy.',
      },
    ],
    platforms: [
      {
        name: 'Web Platform',
        description: 'Full-featured web application with complete recruitment suite',
      },
      {
        name: 'Mobile App',
        description: 'Native mobile apps for iOS and Android with offline capabilities',
      },
      {
        name: 'Desktop App',
        description: 'Cross-platform desktop application for Windows, macOS, and Linux',
      },
    ],
  },
  
  howItWorks: {
    title: 'How It Works',
    steps: [
      {
        title: 'Upload CV',
        description: 'Upload your CV (PDF/Word) - Multi-language support',
        details: [
          'Support PDF, Word, TXT',
          'Multi-language: Vietnamese, English',
          'Auto format detection',
          'Preview before upload',
        ],
      },
      {
        title: 'AI Analysis',
        description: 'Extract skills, experience, education from CV',
        details: [
          'OCR text extraction',
          'Skill recognition',
          'Experience parsing',
          'Education analysis',
        ],
      },
      {
        title: 'Job Matching',
        description: 'Find suitable jobs based on similarity',
        details: [
          'AI similarity matching',
          'Skill-based filtering',
          'Location preferences',
          'Salary range matching',
        ],
      },
      {
        title: 'Apply Jobs',
        description: 'Apply directly through the system',
        details: [
          'One-click apply',
          'Auto-fill application',
          'Cover letter generation',
          'Application tracking',
        ],
      },
      {
        title: 'Get Hired',
        description: 'Receive job offers from recruiters',
        details: [
          'Interview scheduling',
          'Offer management',
          'Contract negotiation',
          'Onboarding support',
        ],
      },
      {
        title: 'Feedback',
        description: 'Improve system based on feedback',
        details: [
          'Success rate tracking',
          'User feedback collection',
          'Algorithm improvement',
          'Feature enhancement',
        ],
      },
    ],
  },
  
  statistics: {
    title: 'Convincing Statistics',
    items: [
      { label: 'Users', description: 'Trusted users' },
      { label: 'Accuracy', description: 'AI accuracy rate' },
      { label: 'Processing', description: 'Processing time' },
      { label: 'Jobs', description: 'Job listings' },
      { label: 'Hires', description: 'Successful hires' },
      { label: 'Rating', description: 'User rating' },
    ],
  },
  
  testimonials: {
    title: 'Customer Testimonials',
    items: [
      {
        quote: 'AI CV analysis is very accurate, I found my dream job in just 2 weeks! The smart matching system saved me a lot of time.',
        author: 'Nguyen Van A',
        role: 'Software Engineer',
        company: 'TechCorp Vietnam',
      },
      {
        quote: 'The system helps us find suitable candidates 70% faster than traditional methods. AI matching is very accurate and saves recruitment costs.',
        author: 'Tran Thi B',
        role: 'HR Manager',
        company: 'ABC Corporation',
      },
      {
        quote: 'Easy-to-use platform, highly effective in management and matching. Dashboard analytics help us track performance and improve recruitment processes.',
        author: 'Le Van C',
        role: 'Admin System',
        company: 'Resulyze Platform',
      },
    ],
  },
  
  pricing: {
    title: 'Choose the Right Plan for You',
    toggle: {
      monthly: 'Monthly',
      yearly: 'Yearly',
    },
    plans: [
      {
        name: 'FREE',
        description: 'Perfect for individuals getting started',
        features: [
          '5 CV uploads per month',
          'Basic job matching',
          'Email support',
          'Community access',
          'Basic analytics',
        ],
        ctaText: 'Get Started',
      },
      {
        name: 'PRO',
        description: 'Most popular for professionals',
        features: [
          'Unlimited CV uploads',
          'Advanced AI matching',
          'Priority support',
          'API access',
          'Advanced analytics',
          'Custom job alerts',
          'Resume optimization tips',
        ],
        ctaText: 'Start Free Trial',
      },
      {
        name: 'ENTERPRISE',
        description: 'For large organizations',
        features: [
          'Custom upload limits',
          'White-label solution',
          'Dedicated support',
          'Custom integrations',
          'Advanced reporting',
          'Team management',
          'SSO integration',
          'Custom branding',
        ],
        ctaText: 'Contact Sales',
      },
    ],
  },
  
  cta: {
    title: 'Ready to get started?',
    subtitle: 'Join thousands of companies that trust our platform.',
    buttons: {
      getStarted: 'Start for free',
      learnMore: 'Learn more',
    },
  },
  
  featuresShowcase: {
    title: 'Featured Capabilities',
    subtitle: 'Discover the powerful features of our platform',
    features: [
      {
        title: 'AI Resume Analysis',
        description: 'Intelligent CV analysis with high accuracy',
        icon: 'brain',
      },
      {
        title: 'Smart Job Matching',
        description: 'Connect candidates with the most suitable jobs',
        icon: 'target',
      },
      {
        title: 'Real-time Analytics',
        description: 'Track recruitment performance in real-time',
        icon: 'chart',
      },
    ],
  },
  

  
  auth: {
    login: {
      title: 'Welcome',
      subtitle: 'Back',
      welcomeSubtitle: 'Log In to Continue Your Job Journey',
      email: 'Email Address',
      emailPlaceholder: 'Enter your email',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email format',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 8 characters',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      loginButton: 'Sign In',
      loggingIn: 'Signing in...',
      googleLogin: 'Sign in with Google',
      noAccount: "Don't have an account?",
      signUp: 'Sign up',
      or: 'or',
      hero: {
        sections: [
          {
            name: 'Hero',
            title: 'TalentFit AI',
            description: 'Find the perfect job with AI - Fast, Accurate, Effective',
            metric: 'AI-Powered',
            features: ['10,000+ trusted users', '95% AI accuracy', '10s fast processing']
          },
          {
            name: 'Value Proposition',
            title: 'Core Values',
            description: 'Smart CV analysis and job matching platform',
            metric: '95% Accuracy',
            features: ['Automated CV analysis', 'Advanced matching algorithm', 'Deep insights']
          },
          {
            name: 'Features Showcase',
            title: 'Outstanding Features',
            description: 'Advanced AI technology for candidates and recruiters',
            metric: 'Multi-Platform',
            features: ['Upload CV (PDF/Word)', 'Smart job matching', 'Direct application']
          },
          {
            name: 'How It Works',
            title: 'Workflow Process',
            description: 'Simple, fast and efficient in 3 steps',
            metric: '3 Steps',
            features: ['Upload CV', 'AI Analysis', 'Job Matching']
          },
          {
            name: 'Statistics',
            title: 'Impressive Statistics',
            description: 'Numbers proving the quality and credibility of the platform',
            metric: '10K+ Users',
            features: ['High success rate', 'Positive feedback', 'Global coverage']
          }
        ],
        trustIndicators: [
          '10,000+ trusted users',
          '95% AI accuracy',
          '10s fast processing'
        ]
      }
    },
    register: {
      title: 'Create',
      subtitle: 'Account',
      welcomeSubtitle: 'Join TalentFit AI Community Today',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      email: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      phone: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      optional: 'optional',
      role: 'Role',
      candidate: 'Candidate',
      recruiter: 'Recruiter',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      acceptTerms: 'I agree with',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      registerButton: 'Sign Up',
      registering: 'Signing up...',
      hasAccount: 'Already have an account?',
      loginLink: 'Sign in now'
    },
    forgotPassword: {
      title: 'Forgot Password',
      subtitle: 'Enter your email and we will send you a password reset link',
      sendResetLink: 'Send Reset Link',
      sending: 'Sending...',
      backToLogin: 'Back to Login',
      successTitle: 'Email Sent',
      successMessage: 'Password reset link has been sent',
      checkEmailMessage: 'Please check your email to reset your password. The link will expire in 1 hour.',
      emailSentTo: 'Email sent to',
      errorMessage: 'Unable to send password reset email'
    },
    googleSigningIn: 'Signing in...',
    continueWithGoogle: 'Continue with Google',
    googleSignInSuccess: 'Google sign-in successful!',
    logoutSuccess: 'Logged out successfully'
  },

  // Password Requirements component
  passwordRequirements: {
    title: 'Password Requirements',
    strength: 'Strength:',
    strengthLevels: {
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong'
    },
    requirements: {
      minLength: 'At least 8 characters',
      uppercase: 'At least 1 uppercase letter (A-Z)',
      lowercase: 'At least 1 lowercase letter (a-z)',
      number: 'At least 1 number (0-9)',
      special: 'At least 1 special character (@, #, $, etc.)'
    }
  },

  // Validation messages for all form validation with toast
  validation: {
    // Email validation
    emailRequired: 'Please enter email',
    emailInvalid: 'Invalid email format', 
    emailMissingAt: 'missing "@" character',
    emailStartsWithAt: 'Email cannot start with "@"',
    emailMissingDomain: 'missing domain after "@"',
    emailMissingTLD: 'Email missing domain extension (e.g., .com, .net)',
    
    // Password validation
    passwordRequired: 'Please enter password',
    passwordMinLength8: 'Password must be at least 8 characters',
    passwordMissingUppercase: 'Password missing uppercase letter',
    passwordMissingLowercase: 'Password missing lowercase letter', 
    passwordMissingNumber: 'Password missing number',
    passwordMissingSpecial: 'Password missing special character',
    
    // Confirm password validation
    confirmPasswordRequired: 'Please confirm password',
    confirmPasswordMismatch: 'Password confirmation does not match',
    
    // Full name validation
    fullNameRequired: 'Please enter your full name',
    fullNameTooShort: 'Name too short (at least 2 characters)',
    fullNameTooLong: 'Name too long (maximum 50 characters)',
    
    // Phone validation
    phoneInvalid: 'Invalid phone number',
    
    // Accept terms validation
    acceptTermsRequired: 'Please agree to the terms of service',
    
    // Success messages
    loginSuccess: 'Login successful!',
    registerSuccess: 'Registration successful!',
    welcomeMessage: 'Welcome to TalentFit AI',
    
    // Error messages
    invalidCredentials: 'Email or password is incorrect',
    networkError: 'Network connection error. Please try again.',
    loginFailed: 'Login failed. Please try again.',
    registerFailed: 'Registration failed',
    emailExists: 'Email already exists',
    emailExistsSubtitle: 'Please choose a different email',
    networkErrorSubtitle: 'Network connection error',
    generalError: 'Please try again later',
    validationFailed: 'Please check your information',
  },

  // Settings
  settings: {
    title: 'Settings',
    saveChanges: 'Save Changes',
    saving: 'Saving...',
    saveSuccess: 'Settings saved successfully',
    saveError: 'Failed to save settings',
    loadError: 'Failed to load settings',
    
    tabs: {
      profile: 'Profile',
      notifications: 'Notifications',
      privacy: 'Privacy & Security',
      data: 'Data Management',
      appearance: 'Appearance',
    },
    
    profile: {
      title: 'Profile Information',
      fullName: 'Full Name',
      email: 'Email Address',
      company: 'Company',
      role: 'Role',
      changePassword: 'Change Password',
      cancelPasswordChange: 'Cancel Password Change',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      roles: {
        hrManager: 'HR Manager',
        recruiter: 'Recruiter',
        talentAcquisition: 'Talent Acquisition',
        admin: 'Admin',
      },
    },
    
    notifications: {
      emailAlerts: 'Email Alerts',
      emailAlertsDesc: 'Receive email notifications for important updates',
      pushNotifications: 'Push Notifications',
      pushNotificationsDesc: 'Get push notifications in your browser',
      weeklyReports: 'Weekly Reports',
      weeklyReportsDesc: 'Weekly summary of your recruitment analytics',
      analysisComplete: 'Analysis Complete',
      analysisCompleteDesc: 'Notification when resume analysis is complete',
    },
    
    privacy: {
      dataRetention: 'Data Retention Period',
      dataRetentionDesc: 'How long should we keep your uploaded resumes?',
      shareAnalytics: 'Share Anonymous Analytics',
      shareAnalyticsDesc: 'Help us improve by sharing anonymous usage data',
      autoDelete: 'Auto-delete Old Data',
      autoDeleteDesc: 'Automatically delete data after retention period',
      days30: '30 days',
      days60: '60 days',
      days90: '90 days',
      days180: '180 days',
      days365: '365 days',
    },
    
    data: {
      export: 'Export Data',
      exportDesc: 'Download all your data in JSON format',
      import: 'Import Data',
      importDesc: 'Import data from previous backups',
      dangerZone: 'Danger Zone',
      reset: 'Reset Settings',
      resetDesc: 'Reset all settings to default values',
      delete: 'Delete All Data',
      deleteDesc: 'Permanently delete all your data',
      exportSuccess: 'Data exported successfully',
      importSuccess: 'Data imported successfully',
      resetConfirm: 'Are you sure you want to reset all settings to default? This action cannot be undone.',
      deleteConfirm: 'Are you sure you want to delete ALL your data? This action is PERMANENT and cannot be undone.',
      deleteDoubleConfirm: 'This will permanently delete all your data including resumes, analysis results, and settings. Type DELETE to confirm.',
    },
    
    appearance: {
      language: 'Language',
    },
  },

  // Pages - Dynamic content based on current page
  pages: {
    dashboard: {
      subscription: 'Dashboard Overview',
      header: {
        title: 'TalentFit',
        subtitle: 'AI',
        description: 'AI-Powered CV Analysis Platform'
      }
    },
    cvAnalysis: {
      subscription: 'CV Analysis',
      header: {
        title: 'CV',
        subtitle: 'Analysis',
        description: 'Upload and analyze your CV with AI-powered insights'
      }
    },
    candidates: {
      subscription: 'Candidate Management',
      header: {
        title: 'Candidate',
        subtitle: 'Management',
        description: 'Manage job profiles and requirements for resume analysis.'
      }
    },
    jobPostings: {
      subscription: 'Job Management',
      header: {
        title: 'Job',
        subtitle: 'Postings',
        description: 'Create and manage job postings and requirements'
      }
    },
    analytics: {
      subscription: 'Analytics Dashboard',
      header: {
        title: 'Analytics',
        subtitle: 'Dashboard',
        description: 'Comprehensive analytics and performance insights'
      }
    },
    settings: {
      subscription: 'System Settings',
      header: {
        title: 'System',
        subtitle: 'Settings',
        description: 'Configure system preferences and account settings'
      }
    }
  },

  // Dashboard
  dashboard: {
    sidebar: {
      navigation: {
        dashboard: 'Dashboard',
        cvAnalysis: 'CV Analysis',
        candidates: 'Candidates',
        jobPostings: 'Job Postings',
        analytics: 'Analytics',
        settings: 'Settings'
      },
      subscription: 'Dashboard Overview',
      collapse: 'Collapse sidebar',
      expand: 'Expand sidebar',
      hoverHint: 'Hover here to show sidebar'
    },
    header: {
      title: 'TalentFit',
      subtitle: 'AI',
      description: 'AI-Powered CV Analysis Platform',
      search: {
        placeholder: 'Search...',
        fullPlaceholder: 'Search resumes, candidates...'
      },
      user: {
        name: 'John Doe',
        role: 'Admin Dashboard'
      },
      actions: {
        logout: 'Logout'
      }
    },
    metrics: {
      totalResumes: {
        title: 'Total Resumes',
        description: 'Total resumes processed by our AI system this month'
      },
      activeCandidates: {
        title: 'Active Candidates', 
        description: 'Qualified candidates actively seeking opportunities'
      },
      accuracy: {
        title: 'Accuracy',
        description: 'AI-powered matching accuracy across all positions'
      },
      processingSpeed: {
        title: 'Processing Speed',
        description: 'Average time to analyze and score each resume'
      }
    },
    processingQueue: {
      title: 'Processing Queue',
      subtitle: 'items in queue',
      viewAll: 'View All Queue',
      total: 'total',
      states: {
        pending: 'Pending',
        processing: 'Processing',
        completed: 'Completed',
        error: 'Error'
      },
      progress: 'complete'
    },
    recentResumes: {
      title: 'Recent Resumes',
      subtitle: 'Latest processed documents',
      viewAll: 'View All Resumes',
      total: 'total',
      score: 'Score',
      match: 'Match'
    },
    monthlyApplications: {
      title: 'Monthly Applications',
      subtitle: 'Application trends over time',
      growth: 'this month',
      trend: '6-month growth trend'
    },
    skillsChart: {
      title: 'Top Skills Detected',
      subtitle: 'Most common technical skills',
      skills: 'Skills',
      description: 'Most common skills across analyzed resumes'
    },
    scoreDistribution: {
      title: 'Score Distribution',
      subtitle: 'total resumes',
      averageScore: 'Average Score',
      highScores: 'High Scores (81+)',
      totalAnalyzed: 'Total Analyzed',
      legend: {
        resumes: 'resumes',
        resume: 'resume'
      },
      ranges: {
        poor: 'Poor (0-40)',
        fair: 'Fair (41-60)',
        good: 'Good (61-80)',
        excellent: 'Excellent (81-100)'
      }
    }
  },

  footer: {
    company: {
      description: 'Leading AI-powered CV analysis platform, connecting recruiters with suitable candidates through advanced AI technology.',
      tagline: 'AI-Powered CV Analysis Platform'
    },
    newsletter: {
      title: 'Newsletter',
      subtitle: 'Get the latest updates on AI and recruitment trends',
      placeholder: 'Enter your email',
      agreement: 'By subscribing, you agree to our privacy policy.'
    },
    links: {
      product: {
        title: 'Product',
        items: {
          cvAnalysis: 'CV Analysis',
          jobMatching: 'Job Matching',
          careerInsights: 'Career Insights',
          skillAssessment: 'Skill Assessment'
        }
      },
      company: {
        title: 'Company',
        items: {
          about: 'About Us',
          team: 'Our Team',
          news: 'News',
          careers: 'Careers',
          partners: 'Partners'
        }
      },
      support: {
        title: 'Support',
        items: {
          helpCenter: 'Help Center',
          userGuide: 'User Guide',
          apiDocs: 'API Documentation',
          contactSupport: 'Contact Support',
          bugReport: 'Bug Report'
        }
      },
      legal: {
        title: 'Legal',
        items: {
          privacy: 'Privacy Policy',
          terms: 'Terms of Service',
          cookies: 'Cookie Policy',
          gdpr: 'GDPR Compliance'
        }
      }
    },
    social: {
      followUs: 'Follow us'
    },
    bottom: {
      copyright: 'All rights reserved.',
      madeWith: 'Made with',
      vietnam: 'in Vietnam'
    }
  },

  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    open: 'Open',
    viewMore: 'View More',
    viewLess: 'View Less'
  },

  jobPostings: {
    title: 'Job Postings',
    subtitle: 'Manage job profiles and requirements for resume analysis.',
    searchPlaceholder: 'Search job profiles...',
    createJobProfile: 'Create Job Profile',
    editJobProfile: 'Edit Job Profile',
    jobProfile: 'Job Profile',
    jobTitle: 'Job Title',
    jobTitlePlaceholder: 'e.g., Full Stack Developer',
    description: 'Description',
    descriptionPlaceholder: 'Describe the job position in detail...',
    experienceLevel: 'Experience Level',
    experience: 'Experience',
    years: 'years',
    requiredSkills: 'Required Skills',
    preferredSkills: 'Preferred Skills',
    addSkillPlaceholder: 'Add a skill...',
    add: 'Add',
    noSkillsAdded: 'No skills added yet',
    activeMatches: 'Active Matches',
    viewMatches: 'View Matches',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    saving: 'Saving...',
    saveChanges: 'Save Changes',
    createProfile: 'Create Profile',
    more: 'more',
    noJobsTitle: 'No Job Postings Yet',
    noJobsSubtitle: 'Get started by creating your first job profile',
    createFirstJob: 'Create First Job Posting',
    noResultsTitle: 'No Results Found',
    noResultsSubtitle: 'Try searching with different keywords',
    loadError: 'Failed to load job postings',
    createSuccess: 'Job profile created successfully',
    updateSuccess: 'Job profile updated successfully',
    deleteSuccess: 'Job profile deleted successfully',
    saveError: 'Failed to save job profile',
    deleteError: 'Failed to delete job profile',
    deleteConfirm: 'Are you sure you want to delete this job profile?',
    viewMatchesInfo: 'View matches feature coming soon',
  }
};
