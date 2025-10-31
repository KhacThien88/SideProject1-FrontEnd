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
    platformSupport: {
      title: 'Multi-Platform Support',
      description: 'Access our platform from any device, anytime, anywhere.',
    },
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
    title: 'Impressive Statistics',
    description: 'Numbers that speak to our success and trust from thousands of users nationwide',
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
    headline: 'Ready to Transform Your Career?',
    primaryCTA: 'Get Started Free',
    secondaryCTA: 'Schedule Demo',
    trustMessage: 'Trusted by over 10,000+ recruitment professionals and candidates',
    buttons: {
      getStarted: 'Start for free',
      learnMore: 'Learn more',
    },
  },
  
  featuresShowcase: {
    title: 'Featured Capabilities',
    subtitle: 'Discover the powerful features of our platform',
    tabs: {
      candidates: 'For Candidates',
      recruiters: 'For Recruiters',
      admins: 'For Admins',
    },
    candidates: {
      upload: {
        title: 'Upload CV',
        description: 'Upload your CV (PDF/Word) for automatic AI analysis. Multi-language support and automatic format detection.',
      },
      analysis: {
        title: 'AI Analysis',
        description: 'AI accurately extracts information from CV: skills, experience, education. Deep analysis and CV quality assessment.',
      },
      matching: {
        title: 'Job Matching',
        description: 'Find the most suitable jobs based on CV analysis. AI algorithm suggests job opportunities that match you best.',
      },
    },
    recruiters: {
      posting: {
        title: 'Post Jobs',
        description: 'Create and manage job postings easily. Automatically distribute to popular recruitment channels.',
      },
      search: {
        title: 'Search Candidates',
        description: 'Search and filter suitable candidates from CV database. Use AI to find the most potential candidates.',
      },
      management: {
        title: 'Process Management',
        description: 'Track and manage the entire recruitment process. Manage applications, interview schedules, and hiring decisions.',
      },
    },
    admins: {
      users: {
        title: 'User Management',
        description: 'Manage user accounts, permissions and track activities. Control access and system security.',
      },
      monitoring: {
        title: 'System Monitoring',
        description: 'Monitor system performance, logs and alerts. Ensure system operates stably and securely.',
      },
      analytics: {
        title: 'Analytics & Reports',
        description: 'View detailed reports on system activities. Analyze trends and make data-driven decisions.',
      },
    },
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
    logoutSuccess: 'Logout successful',
    roleSelection: {
      title: 'Choose Your Role',
      subtitle: 'Select how you want to use TalentFit AI',
      pleaseSelectRole: 'Please select a role to continue',
      registrationSuccess: 'Registration completed successfully!',
      registrationFailed: 'Registration failed. Please try again.',
      completing: 'Completing registration...',
      continueButton: 'Continue',
      backToLogin: 'Back to Login',
      helpText: 'You can change your role later in account settings',
      candidate: {
        title: 'Job Seeker',
        description: 'Looking for your next career opportunity',
        features: {
          uploadCV: 'Upload and analyze your CV',
          jobMatching: 'Get personalized job recommendations',
          applyJobs: 'Apply to jobs with one click'
        }
      },
      recruiter: {
        title: 'Recruiter',
        description: 'Hiring talent for your organization',
        features: {
          postJobs: 'Post job openings',
          searchCandidates: 'Search and filter candidates',
          manageApplications: 'Manage applications and interviews'
        }
      }
    }
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
    errorLoadingData: 'Error loading data',
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
    },
    loadingScreen: {
      loading: 'Loading...',
      redirecting: 'Redirecting...',
      authenticating: 'Authenticating...',
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
    },
    jdAnalysis: {
      subscription: 'JD Analysis',
      header: {
        title: 'JD Analysis',
        subtitle: '& CV Matching',
        description: 'Upload JD → AI Analysis → Auto-match CVs'
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
      ,
      roles: {
        admin: {
          totalUsers: { title: 'Total Users', description: 'Total registered users' },
          systemUptime: { title: 'System Uptime', description: 'System availability' },
          totalProcessedCV: { title: 'Processed CVs', description: 'Total CVs analyzed' },
          activeJobs: { title: 'Active Jobs', description: 'Number of active job posts' }
        },
        candidate: {
          applications: { title: 'Applications', description: 'Total applications' },
          pendingResponses: { title: 'Pending Responses', description: 'Applications waiting for feedback' },
          accepted: { title: 'Accepted', description: 'Applications accepted' },
          matchedJobs: { title: 'Matched Jobs', description: 'Jobs matched to profile' }
        },
        recruiter: {
          jobPosts: { title: 'Job Posts', description: 'Active job posts' },
          newApplicants: { title: 'New Applicants', description: 'Applicants this week' },
          interviewed: { title: 'Interviewed', description: 'Applicants interviewed' },
          hired: { title: 'Hired', description: 'Successful hires' }
        }
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
    recentCandidates: {
      title: 'Recent Candidates',
      subtitle: 'New applicants',
      viewAll: 'View All',
      total: 'Total',
      match: 'Match',
      status: {
        new: 'New',
        reviewing: 'Reviewing',
        interviewed: 'Interviewed',
        hired: 'Hired',
        rejected: 'Rejected'
      },
      actions: {
        viewProfile: 'View Profile',
        sendEmail: 'Send Email',
        call: 'Call'
      }
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
  },

  // Users Management
  users: {
    title: 'Users Management',
    subtitle: 'Manage all users and their roles',
    addUser: 'Add User',
    editUser: 'Edit User',
    stats: {
      totalUsers: 'Total Users',
      candidates: 'Candidates',
      recruiters: 'Recruiters',
      admins: 'Admins'
    },
    search: {
      placeholder: 'Search by name or email...'
    },
    filters: {
      allRoles: 'All Roles',
      allStatus: 'All Status',
      filterButton: 'Filter'
    },
    table: {
      user: 'User',
      role: 'Role',
      status: 'Status',
      joined: 'Joined',
      lastLogin: 'Last Login',
      actions: 'Actions',
      never: 'Never'
    },
    roles: {
      admin: 'Admin',
      recruiter: 'Recruiter (HR)',
      candidate: 'Candidate'
    },
    status: {
      active: 'Active',
      inactive: 'Inactive',
      suspended: 'Suspended'
    },
    empty: {
      title: 'No users found',
      description: 'Try adjusting your search or filters'
    }
  },

  // Upload Progress Component
  uploadProgress: {
    status: {
      uploading: 'Uploading',
      processing: 'Processing', 
      completed: 'Completed',
      failed: 'Failed',
      unknown: 'Unknown'
    },
    details: {
      remaining: 'Remaining',
      processing: 'Processing data...',
      completed: 'Upload completed successfully',
      failed: 'Upload failed, please try again'
    },
    actions: {
      cancel: 'Cancel',
      retry: 'Retry'
    }
  },

  // JD File Management  
  jdFileManagement: {
    loading: 'Loading list...',
    allStatuses: 'All statuses',
    actions: {
      createJobProfile: 'Create Job Profile',
      deleteFile: 'Delete file',
      clearCompleted: 'Clear completed',
      clearAll: 'Clear all'
    }
  },

  // Admin Layout
  adminAuth: {
    verifying: 'Verifying access permissions...'
  },

  // Status Values  
  status: {
    uploaded: 'Uploaded',
    processing: 'Processing',
    processed: 'Processed',
    failed: 'Failed',
    completed: 'Completed',
    pending: 'Pending'
  },

  // Social Proof
  socialProof: {
    activeUsers: 'Active Users',
    successRate: 'Success Rate',
    jobsMatched: 'Jobs Matched',
  },

  trustBadges: {
    title: 'Trusted & Secure Platform',
    subtitle: 'Your data security is our top priority',
    gdprCompliant: {
      title: 'GDPR Compliant',
      description: 'Full compliance with EU data protection regulations',
    },
    ssl: {
      title: 'SSL Encrypted',
      description: 'Bank-grade 256-bit encryption for all data',
    },
    certified: {
      title: 'ISO Certified',
      description: 'ISO 27001 certified for information security',
    },
    verified: {
      title: 'Verified Platform',
      description: 'Trusted by 1000+ companies worldwide',
    },
  },

  successStories: {
    title: 'Customer Success Stories',
    subtitle: 'See how our platform has helped thousands achieve their career goals',
    story1: {
      text: 'TalentFit AI helped me find my dream job in just 2 weeks. The AI matching was incredibly accurate and saved me countless hours of job searching.',
    },
    story2: {
      text: 'As a recruiter, this platform has transformed our hiring process. We reduced time-to-hire by 50% and found better quality candidates.',
    },
    story3: {
      text: 'The AI analysis of my CV gave me insights I never considered. It helped me highlight my strengths and land 3 interviews in the first week.',
    },
  },

  caseStudies: {
    title: 'Proven Results',
    subtitle: 'See how leading companies transformed their recruitment process',
  },

  reviews: {
    title: 'What Our Users Say',
    subtitle: 'Trusted by thousands of professionals',
  },

  // Engagement Features
  exitIntent: {
    title: 'Wait! Before You Go...',
    subtitle: 'Get 30% off your first month and start finding the perfect candidates today!',
    ctaButton: 'Claim My Offer',
    noThanks: 'No thanks, I\'ll pass',
  },

  scrollEngagement: {
    title: 'Still Exploring?',
    message: 'Join thousands who found their dream job!',
    ctaButton: 'Get Started Free',
  },

  timeBased: {
    title: 'Limited Time Offer!',
    message: 'Get 50% off for the first 100 signups',
    ctaButton: 'Claim Now',
  },

  chatWidget: {
    title: 'TalentFit Support',
    status: 'Online',
    welcomeMessage: 'Hi! How can I help you today?',
    placeholder: 'Type your message...',
    autoReply: 'Thanks for your message! Our team will get back to you shortly.',
    quickReplies: {
      pricing: 'Pricing info',
      features: 'Features',
      demo: 'Request demo',
    },
  },

  // CTA Optimization
  smartCTA: {
    control: 'Upload CV Now',
    variantA: 'Start Free Trial',
    variantB: 'Get Started Now',
    noCredit: 'No credit card required',
  },

  multiPathCTA: {
    title: 'Choose Your Path',
    subtitle: 'Select the option that best describes you',
    getStarted: 'Get Started',
    contactUs: 'Contact us',
    help: 'and we\'ll help you choose.',
    footer: 'Not sure which one? ',
    jobSeeker: {
      title: 'I\'m Looking for a Job',
      description: 'Upload your CV and get matched with opportunities',
      badge: 'Most Popular',
    },
    recruiter: {
      title: 'I\'m Hiring Talent',
      description: 'Post jobs and find the perfect candidates',
    },
    enterprise: {
      title: 'Enterprise Solution',
      description: 'Custom solutions for large organizations',
    },
  },

  urgency: {
    countdown: {
      label: 'Offer ends in',
    },
    socialProof: {
      label: 'people signed up today',
    },
    limitedSpots: {
      only: 'Only',
      left: 'spots left',
      subtitle: 'for this month',
    },
    trending: {
      label: 'Trending',
      text: '#1 Most Popular',
    },
  },

  personalizedCTA: {
    newVisitor: 'Start your journey with AI-powered job matching',
    returningVisitor: 'Welcome back! Ready to get started?',
    engagedUser: 'You seem interested! Join thousands of satisfied users.',
    deepScroll: 'You\'ve seen what we offer. Let\'s make it happen!',
    activity: '147 people joined in the last 24 hours',
  },

  // Mobile Optimization
  mobileCTA: {
    upload: 'Upload CV',
    title: 'Start Your Career Journey',
    subtitle: 'Upload CV and find jobs',
    start: 'Start',
  },

  mobileForm: {
    tapToUpload: 'Tap to Upload CV',
    supportedFormats: 'PDF, DOC, DOCX up to 10MB',
    analyze: 'Analyze CV',
    analyzing: 'Analyzing...',
    privacy: 'Your CV is processed securely. We never share your data.',
  },

  // Pricing & Process
  pricingCalculator: {
    title: 'Pricing Calculator',
    subtitle: 'Customize your plan',
    employees: 'Number of Employees',
    jobPosts: 'Monthly Job Posts',
    monthly: 'Monthly Plan',
    yearly: 'Yearly Plan',
    save: 'SAVE',
    savings: 'Save',
    includes: 'Includes',
    features: 'Unlimited CV analysis, AI matching, Priority support, Advanced analytics',
  },

  featureComparison: {
    title: 'Compare Plans',
    subtitle: 'Choose the perfect plan for your needs',
    features: 'Features',
    basic: 'Basic',
    pro: 'Pro',
    enterprise: 'Enterprise',
    popular: 'POPULAR',
    cvAnalysis: 'CV Analysis',
    jobMatching: 'AI Job Matching',
    storage: 'Cloud Storage',
    support: 'Priority Support',
    analytics: 'Advanced Analytics',
    customization: 'Custom Branding',
    api: 'API Access',
    team: 'Team Collaboration',
    guarantee: 'All plans include 14-day money-back guarantee',
    noCreditCard: 'No credit card required • Cancel anytime • Instant setup',
  },

  interactiveDemo: {
    title: 'See How It Works',
    subtitle: 'Interactive demonstration of our platform',
    previous: 'Previous',
    next: 'Next',
    finish: 'Finish',
    step1: {
      title: 'Upload Your CV',
      description: 'Drag and drop your CV or click to browse',
    },
    step2: {
      title: 'AI Analysis',
      description: 'Our AI analyzes your skills and experience',
    },
    step3: {
      title: 'Smart Matching',
      description: 'Get matched with relevant job opportunities',
    },
    step4: {
      title: 'Apply & Success',
      description: 'Apply to jobs with one click',
    },
  },

  // SEO Content
  seo: {
    home: {
      title: 'AI-Powered CV Analysis & Job Matching Platform - TalentFit AI',
      description: 'Find the perfect job with AI-powered CV analysis. TalentFit AI helps candidates match with jobs and recruiters find ideal candidates using advanced AI technology.',
      keywords: [
        'AI CV analysis',
        'job matching',
        'resume analyzer',
        'recruitment AI',
        'talent acquisition',
        'career platform',
        'job search',
        'CV optimization'
      ]
    },
    login: {
      title: 'Login - Access Your Account',
      description: 'Login to TalentFit AI to access your personalized job recommendations and CV analysis.'
    },
    register: {
      title: 'Sign Up - Start Your Career Journey',
      description: 'Create your TalentFit AI account and discover AI-powered job matching tailored to your skills.'
    },
    dashboard: {
      title: 'Dashboard - Your Career Hub',
      description: 'Manage your CV analysis, job matches, and applications all in one place.'
    },
    cvAnalysis: {
      title: 'CV Analysis - AI-Powered Resume Analysis',
      description: 'Upload your CV and get detailed AI analysis with improvement suggestions and job matches.'
    },
    jobMatching: {
      title: 'Job Matching - Find Perfect Opportunities',
      description: 'Discover job opportunities that match your skills and experience with AI-powered matching technology.'
    }
  }
};
