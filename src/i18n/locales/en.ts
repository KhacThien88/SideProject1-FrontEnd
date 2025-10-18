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
    googleSignInSuccess: 'Google sign-in successful',
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
    jobPostings: {
      subscription: 'Job Postings',
      header: {
        title: 'Job Postings',
        subtitle: 'Management',
        description: 'Create and manage job listings'
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
        jobPostings: 'Job Postings',
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

  // Password Requirements component
  passwordRequirements: {
    title: 'Password Requirements',
    strength: 'Password Strength',
    strengthLevels: {
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong'
    },
    requirements: {
      minLength: 'At least 8 characters',
      uppercase: 'One uppercase letter',
      lowercase: 'One lowercase letter',
      number: 'One number',
      special: 'One special character'
    }
  }
};
