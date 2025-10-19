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
      toast: {
        emailRequired: 'Please enter email',
        emailMissingAt: 'missing "@" character',
        emailStartsWithAt: 'Email cannot start with "@"',
        emailMissingDomain: 'missing domain after "@"',
        emailMissingTLD: 'Email missing domain (e.g: .com, .net)',
        emailInvalid: 'Invalid email format',
        passwordRequired: 'Please enter password',
        loginSuccess: 'Login successful!',
        loginError: 'Login failed',
        loginFailed: 'Login failed. Please try again.',
        invalidCredentials: 'Invalid email or password',
        networkError: 'Network connection error. Please try again.',
        googleNotLoaded: 'Google Identity Services not loaded',
        googleContainerNotFound: 'Google button container not found'
      },
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
    forgotPassword: {
      title: 'Forgot Password',
      subtitle: 'Enter your email address. We will send a password reset link to your inbox.',
      sendResetLink: 'Send reset link',
      sending: 'Sending...',
      successTitle: 'Email Sent!',
      successMessage: 'Please check your email inbox.',
      checkEmailMessage: 'We have sent an email with a password reset link. Please also check your spam folder.',
      emailSentTo: 'Email sent to',
      backToLogin: 'Back to sign in',
      errorMessage: 'Unable to send password reset email',
      toast: {
        success: 'Password reset email has been sent',
        failed: 'An error occurred while sending password reset email. Please try again.',
        emailNotFound: 'This email is not registered. Please check again or create a new account.',
        networkError: 'Network connection is unstable. Please try again.',
        emailInvalid: 'Invalid email format. Please check again.'
      }
    },
    resetPassword: {
      title: 'Reset Password',
      subtitle: 'Enter your new password for your account.',
      token: 'Token',
      tokenPlaceholder: 'Paste token from email',
      newPassword: 'New Password',
      newPasswordPlaceholder: 'At least 8 characters',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      passwordValid: 'Password is valid',
      submit: 'Reset password',
      submitting: 'Processing...',
      backToLogin: 'Back to sign in',
      toast: {
        invalidToken: 'Invalid token',
        passwordMinLength: 'Password must be at least 8 characters',
        passwordUppercase: 'Password must contain at least one uppercase letter',
        passwordLowercase: 'Password must contain at least one lowercase letter',
        passwordNumbers: 'Password must contain at least one number',
        passwordSpecialChar: 'Password must contain at least one special character (!@#$%^&*...)',
        confirmPasswordMismatch: 'Password confirmation does not match',
        success: 'Password reset successful',
        failed: 'Password reset failed',
        invalidOrExpiredToken: 'The password reset link is invalid or has expired. Please request a new link.',
        passwordTooWeak: 'Password must be at least 8 characters. Please choose a stronger password.',
        networkError: 'Network connection is unstable. Please try again.',
        generalError: 'An error occurred while resetting password. Please try again.'
      }
    },
    register: {
      title: 'Create Account',
      subtitle: 'new',
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
      and: 'and',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      registerButton: 'Sign Up',
      registering: 'Signing up...',
      hasAccount: 'Already have an account?',
      loginLink: 'Sign in now',
      toast: {
        // Validation messages
        fullNameRequired: 'Please enter your full name',
        fullNameMinLength: 'Please enter full name (at least 2 characters)',
        emailRequired: 'Please enter email',
        emailMissingAt: 'missing "@" character',
        emailStartsWithAt: 'Email cannot start with "@"',
        emailMissingDomain: 'missing domain after "@"',
        emailMissingTLD: 'Email missing domain (e.g., .com, .org)',
        emailInvalid: 'Invalid email format',
        passwordRequired: 'Please enter password',
        passwordMinLength: 'Password must be at least 8 characters',
        passwordUppercase: 'Password must contain at least 1 uppercase letter',
        passwordLowercase: 'Password must contain at least 1 lowercase letter',
        passwordNumbers: 'Password must contain at least 1 number',
        passwordSpecialChar: 'Password must contain at least 1 special character (!@#$%^&*)',
        confirmPasswordRequired: 'Please confirm password',
        confirmPasswordMismatch: 'Password confirmation does not match',
        phoneInvalid: 'Invalid phone number',
        termsRequired: 'Please agree to the terms of service',

        // Success messages
        registerSuccess: 'Registration successful!',
        registerSuccessSubtitle: 'Welcome to TalentFit AI',

        // Error messages
        registerFailed: 'Registration failed',
        emailExists: 'Email already exists',
        emailExistsSubtitle: 'Please choose a different email',
        networkError: 'Network connection error',
        networkErrorSubtitle: 'Please try again later',
        generalError: 'Registration failed',
        generalErrorSubtitle: 'Please try again later'
      }
    },
    verifyOTP: {
      title: 'Verify your email',
      subtitle: 'Enter the 6-digit code we sent to',
      emailLabel: 'Email',
      codeLabel: 'Verification code',
      codePlaceholder: 'Enter 6-digit code',
      timerLabel: 'Code expires in',
      verifyButton: 'Verify',
      verifyingButton: 'Verifying...',
      resendButton: 'Resend',
      resendCountdown: 'Resend in {seconds}s',
      resendAvailable: 'Resend ({count} left)',
      errorMessage: 'Invalid code. Please try again.',
      successMessage: 'Verification successful',
      successSubtitle: 'Redirecting to sign in...',
      toast: {
        verificationSuccess: 'Verification successful!',
        verificationSuccessSubtitle: 'Your email has been verified',
        verificationFailed: 'Verification failed',
        verificationFailedSubtitle: 'Please check your code and try again',
        resendSuccess: 'New code sent',
        resendSuccessSubtitle: 'Please check your email',
        resendFailed: 'Failed to resend code',
        resendFailedSubtitle: 'Please try again later',
        invalidCode: 'Invalid verification code',
        codeExpired: 'Code has expired',
        tooManyAttempts: 'Too many failed attempts',
        networkError: 'Network connection error',
        networkErrorSubtitle: 'Please try again later'
      }
    },
    googleSigningIn: 'Signing in with Google...',
    continueWithGoogle: 'Continue with Google',
    googleSignInSuccess: 'Google sign-in successful!',
    logoutSuccess: 'Logged out successfully'
  },

  // Job Matching & CV Analysis
  jobs: {
    details: {
      title: 'Job Details',
      jobNotFound: 'Job Not Found',
      jobNotFoundDescription: "The job you're looking for doesn't exist or has been removed.",
      loadingJobDetails: 'Loading job details...',
      matchAnalysis: 'Match Analysis',
      similarJobs: 'Similar Jobs',
      companyInfo: 'Company Info',
      backToResults: 'Back to Results',
      quickActions: 'Quick Actions',
      applyNow: 'Apply Now',
      saveForLater: 'Save for later',
      downloadJD: 'Download JD',
      shareJob: 'Share Job',
      applicationTips: 'Application Tips',
      highlightMatchingSkills: 'Highlight matching skills',
      emphasizeExperience: 'Emphasize your',
      addressSkillGaps: 'Address skill gaps',
      considerLearningPlans: 'Consider mentioning your learning plans for',
      standOut: 'Stand out',
      customizeApplication: 'Customize your application for',
      match: 'match',
      saved: 'Saved',
      saveJob: 'Save Job',
      share: 'Share',
      contact: 'Contact',
      overview: 'Overview',
      requirements: 'Requirements',
      company: 'Company',
      jobDescription: 'Job Description',
      benefitsPerks: 'Benefits & Perks',
      essentialRequirements: 'Essential Requirements',
      preferredQualifications: 'Preferred Qualifications',
      requiredSkills: 'Required Skills',
      about: 'About',
      industry: 'Industry',
      companySize: 'Company Size',
      location: 'Location',
      view: 'View',
      salary: 'Salary',
      experience: 'Experience',
      deadline: 'Deadline',
      postedAgo: 'Posted',
      views: 'views',
      applicants: 'applicants',
      remote: 'Remote',
      hybrid: 'Hybrid',
      skillsMatched: 'of {total} skills matched',
      aiAnalysis: 'AI Analysis',
      tabs: {
        overview: 'Overview',
        requirements: 'Requirements',
        company: 'Company',
        similar: 'Similar Jobs'
      }
    },
    matching: {
      title: 'Job Matching',
      noJobsFound: 'No Jobs Found',
      noJobsFoundDescription: "We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.",
      resultsCount: 'results found',
      filterJobs: 'Filter Jobs',
      jobRemoved: 'Job removed',
      removedFromSaved: 'removed from saved jobs',
      jobSaved: 'Job saved',
      addedToSaved: 'added to saved jobs',
      application: 'Application',
      openingApplicationForm: 'Opening application form...',
      linkCopied: 'Link copied',
      jobLinkCopied: 'Job link copied to clipboard',
      checkOutJobAt: 'Check out this job opportunity',
      jobSearchResults: 'Job Search Results',
      foundJobs: 'Found',
      matchingYourProfile: 'matching your profile',
      filters: 'Filters',
      filter: 'filter',
      applied: 'applied',
      relevance: 'Relevance',
      matchScore: 'Match Score',
      datePosted: 'Date Posted',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      results: 'results'
    },
    utils: {
      year: '/year',
      month: '/month',
      hour: '/hour',
      from: 'From',
      upTo: 'Up to',
      salaryNotSpecified: 'Salary not specified',
      justNow: 'Just now',
      hoursAgo: ' h ago',
      daysAgo: ' d ago',
      weeksAgo: ' w ago',
      monthsAgo: ' mo ago',
      excellentMatch: 'Excellent match',
      goodMatch: 'Good match',
      fairMatch: 'Fair match',
      poorMatch: 'Poor match'
    },
    card: {
      featured: 'Featured',
      urgent: 'Urgent',
      remote: 'Remote',
      match: 'match',
      requiredSkills: 'Required Skills:',
      more: 'more',
      of: 'of',
      skillsMatched: 'skills matched',
      applyNow: 'Apply Now',
      saved: 'Saved',
      save: 'Save',
      share: 'Share',
      company: 'company',
      away: 'km away'
    },
    filters: {
      activeFilters: 'Active Filters',
      clearAll: 'Clear All',
      location: 'Location',
      jobType: 'Job Type',
      experienceLevel: 'Experience Level',
      salary: 'Salary',
      skills: 'Skills',
      remote: 'Remote',
      filterRecommendations: 'Filter Recommendations',
      searchKeywords: 'Search Keywords',
      jobTitleCompanySkills: 'Job title, company, skills...',
      search: 'Search',
      anyLocation: 'Any location',
      includeRemoteWork: 'Include remote work',
      salaryRange: 'Salary Range (USD/month)',
      minSalary: 'Min salary',
      maxSalary: 'Max salary',
      companySize: 'Company Size',
      skillsFromCV: '(From your CV)',
      skillsWithStar: 'Skills with star are from your CV analysis'
    }
  },

  // CV Analysis
  cvAnalysis: {
    targetPosition: 'Target Position',
    targetPositionDescription: 'Select the job position to analyze CV compatibility',
    noResumesUploaded: 'No Resumes Uploaded',
    noResumesUploadedDescription: 'Upload your first resume to get started with AI-powered analysis.',
    uploadYourFirstResume: 'Upload your first resume',
    jobRecommendations: 'Job Recommendations',
    recommendedJobs: 'Recommended Jobs',
    basedOnCVAnalysis: 'Based on your CV analysis, here are',
    jobsMatchProfile: 'jobs that match your profile',
    filteredFrom: '(filtered from',
    total: 'total)',
    filters: 'Filters',
    saveSearch: 'Save Search',
    noJobsMatchFilters: 'No jobs match your current filters',
    tryAdjustingFilters: 'Try adjusting your filters to see more results',
    clearAllFilters: 'Clear All Filters',
    viewAllMatchingJobs: 'View All Matching Jobs',
    exportReport: 'Export Report',
    startingAnalysis: 'Starting analysis for',
    file: 'file',
    files: 'files',
    analysisCompleted: 'Analysis completed successfully!',
    allFilesCleared: 'All files cleared',
    noFilesReady: 'No files ready for analysis',
    jobDetails: 'Job Details',
    openingJobDetails: 'Opening job details...',
    application: 'Application',
    redirectingToApplication: 'Redirecting to application page...',
    jobLinkCopied: 'Job link copied to clipboard',
    jobRemovedFromSaved: 'Job removed from saved list',
    jobSavedSuccessfully: 'Job saved successfully',
    jobOpportunity: 'Job Opportunity',
    checkOutThisJob: 'Check out this job opportunity',
    jobSaved: 'Job saved',
    savedToFavorites: 'has been saved to your favorites',
    linkCopied: 'Link copied',
    checkOutJobAt: 'Check out this job at',
    upload: {
      title: 'Upload Resume Files',
      dropHere: 'Drop files here',
      dragAndDrop: 'Drag & drop your resume files here, or click to browse',
      supports: 'Supports PDF, DOC, and DOCX files',
      maxSize: 'Max',
      upTo: 'per file • Up to',
      chooseFiles: 'Choose Files',
      uploadIssues: 'Upload Issues',
      filesAdded: 'added successfully',
      fileRemoved: 'removed'
    },
    fileManagement: {
      selectedFiles: 'Selected Files',
      clearAll: 'Clear All',
      analyzing: 'Analyzing...',
      analyzeFiles: 'Analyze Files',
      ready: 'Ready',
      error: 'Error',
      processing: 'Processing',
      uploading: 'Uploading'
    },
    progress: {
      analyzingFiles: 'Analyzing Files',
      uploading: 'Uploading',
      extracting: 'Extracting',
      analyzing: 'Analyzing',
      completing: 'Completing',
      processing: 'Processing',
      estimatedTime: 'Estimated time remaining'
    },
    results: {
      title: 'Analysis Results',
      exportResults: 'Export Results',
      analyzedOn: 'Analyzed on',
      good: 'Good',
      fair: 'Fair',
      average: 'Average',
      needsImprovement: 'Needs Improvement',
      previewCV: 'Preview CV',
      downloadReport: 'Download Report',
      removeResult: 'Remove Result',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      skillsMatch: 'Skills Match',
      experience: 'Experience',
      education: 'Education',
      keywords: 'Keywords',
      detectedSkills: 'Detected Skills',
      matchPercentage: 'Match Percentage',
      matchWith: 'Match with',
      recommendations: 'Recommendations',
      overallScore: 'Overall Score',
      skillsDetected: 'Skills Detected',
      experienceLevel: 'Experience Level',
      jobMatches: 'Job Matches',
      candidate: 'Candidate'
    }
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

  validation: {
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email format',
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
    viewLess: 'View Less',
    toast: {
      // General
      linkCopied: 'Link copied to clipboard',
      
      // Job
      jobSaved: 'Job saved',
      jobSavedSubtitle: '{jobTitle} added to saved jobs',

      // CV
      filesAddedSuccess: '{count} file(s) added successfully',
      noFilesReady: 'No files ready for analysis',
      analysisSuccess: 'Analysis completed successfully!',
      
      // Network & Generic Errors
      networkError: 'Network connection error',
      networkErrorSubtitle: 'Please check your connection and try again',
      genericError: 'An unexpected error occurred',
      genericErrorSubtitle: 'Please try again later',
    }
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
      subscription: 'Dashboard',
      header: {
        title: 'Dashboard',
        subtitle: 'Overview',
        description: 'Manage your recruitment activities'
      }
    },
    cvAnalysis: {
      subscription: 'CV Analysis',
      header: {
        title: 'CV Analysis',
        subtitle: 'AI-Powered',
        description: 'Analyze resumes with artificial intelligence'
      }
    },
    candidates: {
      subscription: 'Candidates',
      header: {
        title: 'Candidates',
        subtitle: 'Management',
        description: 'Manage candidate profiles and applications'
      }
    },
    savedJobs: {
      subscription: 'Saved Jobs',
      header: {
        title: 'Saved Jobs',
        subtitle: 'Your Collection',
        description: 'View and manage your saved job opportunities'
      }
    },
    savedJobs: {
      subscription: 'Saved Jobs',
      header: {
        title: 'Saved',
        subtitle: 'Jobs',
        description: 'Review and manage the roles you bookmarked for later.'
      }
    },
    jobPostings: {
      subscription: 'Job Postings',
      header: {
        title: 'Job Postings',
        subtitle: 'Management',
        description: 'Create and manage job listings'
      }
    },
    users: {
      subscription: 'Users',
      header: {
        title: 'Users Management',
        subtitle: 'Administration',
        description: 'Manage all users and their roles'
      }
    },
    analytics: {
      subscription: 'Analytics',
      header: {
        title: 'Analytics',
        subtitle: 'Insights',
        description: 'Track performance and metrics'
      }
    },
    settings: {
      subscription: 'Settings',
      header: {
        title: 'Settings',
        subtitle: 'Configuration',
        description: 'Manage your account and preferences'
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
        savedJobs: 'Saved Jobs',
        jobPostings: 'Job Postings',
        users: 'Users',
        analytics: 'Analytics',
        settings: 'Settings'
      },
      subscription: 'Subscription',
      collapse: 'Collapse',
      expand: 'Expand',
      hoverHint: 'Hover to expand'
    },
    header: {
      title: 'Dashboard',
      subtitle: 'Welcome back',
      description: 'Here\'s what\'s happening with your recruitment',
      search: {
        placeholder: 'Search...',
        fullPlaceholder: 'Search candidates, jobs, or anything...'
      },
      user: {
        name: 'User',
        role: 'Role'
      },
      actions: {
        logout: 'Logout'
      }
    },
    metrics: {
      totalResumes: {
        title: 'Total Resumes',
        description: 'Resumes analyzed this month'
      },
      activeCandidates: {
        title: 'Active Candidates',
        description: 'Currently in pipeline'
      },
      accuracy: {
        title: 'AI Accuracy',
        description: 'Analysis accuracy rate'
      },
      processingSpeed: {
        title: 'Processing Speed',
        description: 'Average processing time'
      }
    },
    processingQueue: {
      title: 'Processing Queue',
      subtitle: 'Current analysis status',
      viewAll: 'View All',
      total: 'Total',
      states: {
        pending: 'Pending',
        processing: 'Processing',
        completed: 'Completed',
        error: 'Error'
      },
      progress: 'Progress'
    },
    recentResumes: {
      title: 'Recent Resumes',
      subtitle: 'Latest analyzed resumes',
      viewAll: 'View All',
      total: 'Total',
      score: 'Score',
      match: 'Match'
    },
    monthlyApplications: {
      title: 'Monthly Applications',
      subtitle: 'Application trends',
      growth: 'Growth',
      trend: 'Trend'
    },
    skillsChart: {
      title: 'Skills Distribution',
      subtitle: 'Most common skills',
      skills: 'Skills',
      description: 'Skills found in resumes'
    },
    scoreDistribution: {
      title: 'Score Distribution',
      subtitle: 'Resume quality scores',
      averageScore: 'Average Score',
      highScores: 'High Scores',
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

  // Footer
  footer: {
    company: {
      description: 'AI-powered recruitment platform for modern hiring',
      tagline: 'Find the perfect match with AI'
    },
    newsletter: {
      title: 'Stay Updated',
      subtitle: 'Get the latest news and updates',
      placeholder: 'Enter your email',
      agreement: 'By subscribing, you agree to our Privacy Policy'
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
          bugReport: 'Report Bug'
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
      followUs: 'Follow Us'
    },
    bottom: {
      copyright: '© 2024 TalentFit AI. All rights reserved.',
      madeWith: 'Made with ❤️ in',
      vietnam: 'Vietnam'
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
    viewLess: 'View Less',
    backToResults: 'Back to Results',
    apply: 'Apply',
    share: 'Share',
    export: 'Export',
    refresh: 'Refresh',
    clearAll: 'Clear All',
    clearAllFilters: 'Clear All Filters',
    viewDetails: 'View Details',
    loadMore: 'Load More',
    sortBy: 'Sort by',
    filterBy: 'Filter by',
    viewMode: 'View Mode',
    activeFilters: 'Active Filters',
    noResults: 'No Results',
    noDataAvailable: 'No data available',
    loadingData: 'Loading data...',
    errorLoadingData: 'Error loading data'
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
  },

  candidateMatches: {
    title: 'Matched Candidates',
    backToJobs: 'Back to Job Postings',
    totalMatches: 'Total matches',
    requiredSkills: 'Required skills',
    filters: 'Filters',
    clearFilters: 'Clear filters',
    filterMatchScore: 'Match score',
    filterExperience: 'Experience',
    years: 'years',

    sort: {
      matchScore: 'Highest match score',
      experience: 'Most experience',
      appliedDate: 'Recently applied',
      name: 'Name A-Z',
    },

    overallMatch: 'Overall',
    skillsMatch: 'Skills',
    experience: 'Experience',
    yearsExperience: 'years experience',
    matchedSkills: 'Matched skills',
    missingSkills: 'Missing skills',
    more: 'more',
    appliedOn: 'Applied on',
    downloadResume: 'Download Resume',
    save: 'Save candidate',
    unsave: 'Unsave',
    saved: 'Saved',

    noCandidates: 'No candidates',
    noMatches: 'No candidates have matched with this job posting yet',
    noResultsFilters: 'No candidates found with current filters',

    success: {
      saveToggled: 'Candidate save status updated successfully',
      resumeDownloaded: 'Resume downloaded successfully',
    },

    errors: {
      loadFailed: 'Failed to load candidates',
      saveFailed: 'Failed to update save status',
      downloadFailed: 'Failed to download resume',
      jobNotFound: 'Job posting not found',
    },
  },

  savedCandidates: {
    title: 'Saved Candidates',
    subtitle: 'Manage your starred candidates',
    searchPlaceholder: 'Search candidates...',
    filters: 'Filters',
    clearFilters: 'Clear filters',
    filterMatchScore: 'Match score',
    filterExperience: 'Experience',
    filterSkillMatches: 'Skill matches count',
    filterLocation: 'Location',
    filterSkills: 'Skills',
    years: 'years',

    sort: {
      matchScore: 'Highest match score',
      experience: 'Most experience',
      appliedDate: 'Recently applied',
      name: 'Name A-Z',
    },

    noCandidates: 'No candidates',
    noSavedYet: 'You haven\'t saved any candidates yet',
    noResultsFilters: 'No candidates found with current filters',

    success: {
      saveToggled: 'Candidate save status updated successfully',
      resumeDownloaded: 'Resume downloaded successfully',
    },

    errors: {
      loadFailed: 'Failed to load candidates',
      saveFailed: 'Failed to update save status',
      downloadFailed: 'Failed to download resume',
    },
  },

  savedJobs: {
    title: 'Saved Jobs',
    subtitle: 'Keep track of roles you love and revisit them anytime.',
    searchPlaceholder: 'Search saved jobs...',
    filters: 'Filters',
    clearFilters: 'Clear filters',
    filterMatchScore: 'Match score',
    filterSalary: 'Salary range',
    filterJobType: 'Job type',
    filterLocation: 'Location',
    filterRemoteOnly: 'Remote only',
    salaryAny: 'Any',
    savedAt: 'Saved',
    resultsCount: 'Showing {count} of {total} saved jobs',
    noSavedYet: 'You haven\'t saved any jobs yet',
    noSavedDescription: 'Bookmark interesting opportunities to see them listed here.',
    noResultsFilters: 'No saved jobs match the current filters',

    sort: {
      matchScore: 'Best match first',
      recent: 'Recently saved',
      salaryHigh: 'Highest salary',
      salaryLow: 'Lowest salary',
      company: 'Company A-Z',
    },

    actions: {
      refresh: 'Refresh list',
      applyTitle: 'Application',
      applyMessage: 'We\'ll redirect you to the application page.',
      shareMessage: 'Check out the {jobTitle} role at {companyName}!'
    },

    success: {
      removed: 'Job removed from saved list',
      refreshed: 'Saved jobs refreshed',
      shareTitle: 'Link copied',
      shareCopied: 'Job link copied to clipboard',
    },

    errors: {
      loadFailed: 'Failed to load saved jobs',
      removeFailed: 'Failed to update saved jobs',
      shareFailed: 'Unable to share this job',
    },
  }
};
