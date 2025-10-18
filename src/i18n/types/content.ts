export interface ContentTaxonomy {
  // Navigation
  nav: {
    features: string;
    pricing: string;
    about: string;
    login: string;
    language: string;
  };
  
  // Hero section
  hero: {
    headline: string;
    subtitle: string;
    ctaButtons: {
      uploadCV: string;
      postJob: string;
      viewDemo: string;
    };
    trustIndicators: string[];
  };
  
  // Value Props
  valueProps: {
    title: string;
    items: {
      title: string;
      description: string;
      metric: string;
    }[];
  };
  
  // Landing sections
  landing: {
    valueProposition: {
      title: string;
      subtitle: string;
      security: {
        title: string;
        description: string;
      };
      performance: {
        title: string;
        description: string;
      };
      collaboration: {
        title: string;
        description: string;
      };
      cta: {
        text: string;
        button: string;
      };
    };
  };


  
  // Features
  features: {
    title: string;
    subtitle: string;
    userFeatures: {
      title: string;
      description: string;
    }[];
    platforms: {
      name: string;
      description: string;
    }[];
  };
  
  // How It Works
  howItWorks: {
    title: string;
    steps: {
      title: string;
      description: string;
      details: string[];
    }[];
  };
  
  // Statistics
  statistics: {
    title: string;
    items: {
      label: string;
      description: string;
    }[];
  };
  
  // Testimonials
  testimonials: {
    title: string;
    items: {
      quote: string;
      author: string;
      role: string;
      company: string;
    }[];
  };
  
  // Pricing
  pricing: {
    title: string;
    toggle: {
      monthly: string;
      yearly: string;
    };
    plans: {
      name: string;
      description: string;
      features: string[];
      ctaText: string;
    }[];
  };
  
  // CTA
  cta: {
    title: string;
    subtitle: string;
    buttons: {
      getStarted: string;
      learnMore: string;
    };
  };
  
  // Features Showcase
  featuresShowcase: {
    title: string;
    subtitle: string;
    features: {
      title: string;
      description: string;
      icon: string;
    }[];
  };

  // Validation
  validation: {
    emailRequired: string;
    emailInvalid: string;
  };

  // Authentication
  auth: {
    login: {
      title: string;
      subtitle: string;
      welcomeSubtitle: string;
      email: string;
      emailPlaceholder: string;
      emailRequired: string;
      emailInvalid: string;
      password: string;
      passwordPlaceholder: string;
      passwordRequired: string;
      passwordMinLength: string;
      rememberMe: string;
      forgotPassword: string;
      loginButton: string;
      loggingIn: string;
      googleLogin: string;
      noAccount: string;
      signUp: string;
      or: string;
      toast: {
        emailRequired: string;
        emailMissingAt: string;
        emailStartsWithAt: string;
        emailMissingDomain: string;
        emailMissingTLD: string;
        emailInvalid: string;
        passwordRequired: string;
        loginSuccess: string;
        loginError: string;
        loginFailed: string;
        invalidCredentials: string;
        networkError: string;
        googleNotLoaded: string;
        googleContainerNotFound: string;
      };
      hero: {
        sections: {
          name: string;
          title: string;
          description: string;
          metric: string;
          features: string[];
        }[];
        trustIndicators: string[];
      };
    };
    register: {
      title: string;
      subtitle: string;
      welcomeSubtitle: string;
      fullName: string;
      fullNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      optional: string;
      role: string;
      candidate: string;
      recruiter: string;
      password: string;
      passwordPlaceholder: string;
      confirmPassword: string;
      confirmPasswordPlaceholder: string;
      acceptTerms: string;
      and: string;
      termsOfService: string;
      privacyPolicy: string;
      registerButton: string;
      registering: string;
      hasAccount: string;
      loginLink: string;
      toast: {
        fullNameRequired: string;
        fullNameMinLength: string;
        emailRequired: string;
        emailMissingAt: string;
        emailStartsWithAt: string;
        emailMissingDomain: string;
        emailMissingTLD: string;
        emailInvalid: string;
        passwordRequired: string;
        passwordMinLength: string;
        passwordUppercase: string;
        passwordLowercase: string;
        passwordNumbers: string;
        passwordSpecialChar: string;
        confirmPasswordRequired: string;
        confirmPasswordMismatch: string;
        phoneInvalid: string;
        termsRequired: string;
        registerSuccess: string;
        registerSuccessSubtitle: string;
        registerFailed: string;
        emailExists: string;
        emailExistsSubtitle: string;
        networkError: string;
        networkErrorSubtitle: string;
        generalError: string;
        generalErrorSubtitle: string;
      };
    };
    forgotPassword: {
      title: string;
      subtitle: string;
      sendResetLink: string;
      sending: string;
      backToLogin: string;
      successTitle: string;
      successMessage: string;
      checkEmailMessage: string;
      emailSentTo: string;
      errorMessage: string;
      toast: {
        success: string;
        failed: string;
        emailNotFound: string;
        networkError: string;
        emailInvalid: string;
      };
    };
    resetPassword: {
      title: string;
      subtitle: string;
      token: string;
      tokenPlaceholder: string;
      newPassword: string;
      newPasswordPlaceholder: string;
      confirmPassword: string;
      confirmPasswordPlaceholder: string;
      passwordValid: string;
      submit: string;
      submitting: string;
      backToLogin: string;
      toast: {
        invalidToken: string;
        passwordMinLength: string;
        passwordUppercase: string;
        passwordLowercase: string;
        passwordNumbers: string;
        passwordSpecialChar: string;
        confirmPasswordMismatch: string;
        success: string;
        failed: string;
        invalidOrExpiredToken: string;
        passwordTooWeak: string;
        networkError: string;
        generalError: string;
      };
    };
    verifyOTP: {
      title: string;
      subtitle: string;
      emailLabel: string;
      codeLabel: string;
      codePlaceholder: string;
      timerLabel: string;
      verifyButton: string;
      verifyingButton: string;
      resendButton: string;
      resendCountdown: string;
      resendAvailable: string;
      errorMessage: string;
      successMessage: string;
      successSubtitle: string;
      toast: {
        verificationSuccess: string;
        verificationSuccessSubtitle: string;
        verificationFailed: string;
        verificationFailedSubtitle: string;
        resendSuccess: string;
        resendSuccessSubtitle: string;
        resendFailed: string;
        resendFailedSubtitle: string;
        invalidCode: string;
        codeExpired: string;
        tooManyAttempts: string;
        networkError: string;
        networkErrorSubtitle: string;
      };
    };
    googleSigningIn: string;
    continueWithGoogle: string;
    googleSignInSuccess: string;
    logoutSuccess: string;
    roleSelection: {
      title: string;
      subtitle: string;
      pleaseSelectRole: string;
      registrationSuccess: string;
      registrationFailed: string;
      completing: string;
      continueButton: string;
      backToLogin: string;
      helpText: string;
      candidate: {
        title: string;
        description: string;
        features: {
          uploadCV: string;
          jobMatching: string;
          applyJobs: string;
        };
      };
      recruiter: {
        title: string;
        description: string;
        features: {
          postJobs: string;
          searchCandidates: string;
          manageApplications: string;
        };
      };
    };
  };

  // Pages - Dynamic content based on current page
  pages: {
    dashboard: {
      subscription: string;
      header: {
        title: string;
        subtitle: string;
        description: string;
      };
    };
    cvAnalysis: {
      subscription: string;
      header: {
        title: string;
        subtitle: string;
        description: string;
      };
    };
    candidates: {
      subscription: string;
      header: {
        title: string;
        subtitle: string;
        description: string;
      };
    };
    savedJobs: {
      subscription: string;
      header: {
        title: string;
        subtitle: string;
        description: string;
      };
    };
    jobPostings: {
      subscription: string;
      header: {
        title: string;
        subtitle: string;
        description: string;
      };
    };
    users: {
      subscription: string;
      header: {
        title: string;
        subtitle: string;
        description: string;
      };
    };
    analytics: {
      subscription: string;
      header: {
        title: string;
        subtitle: string;
        description: string;
      };
    };
    settings: {
      subscription: string;
      header: {
        title: string;
        subtitle: string;
        description: string;
      };
    };
  };

  // Dashboard
  dashboard: {
    sidebar: {
      navigation: {
        dashboard: string;
        cvAnalysis: string;
        candidates: string;
        savedJobs: string;
        jobPostings: string;
        users: string;
        analytics: string;
        settings: string;
      };
      subscription: string;
      collapse: string;
      expand: string;
      hoverHint: string;
    };
    header: {
      title: string;
      subtitle: string;
      description: string;
      search: {
        placeholder: string;
        fullPlaceholder: string;
      };
      user: {
        name: string;
        role: string;
      };
      actions: {
        logout: string;
      };
    };
    metrics: {
      totalResumes: {
        title: string;
        description: string;
      };
      activeCandidates: {
        title: string;
        description: string;
      };
      accuracy: {
        title: string;
        description: string;
      };
      processingSpeed: {
        title: string;
        description: string;
      };
    };
    processingQueue: {
      title: string;
      subtitle: string;
      viewAll: string;
      total: string;
      states: {
        pending: string;
        processing: string;
        completed: string;
        error: string;
      };
      progress: string;
    };
    recentResumes: {
      title: string;
      subtitle: string;
      viewAll: string;
      total: string;
      score: string;
      match: string;
    };
    monthlyApplications: {
      title: string;
      subtitle: string;
      growth: string;
      trend: string;
    };
    skillsChart: {
      title: string;
      subtitle: string;
      skills: string;
      description: string;
    };
    scoreDistribution: {
      title: string;
      subtitle: string;
      averageScore: string;
      highScores: string;
      totalAnalyzed: string;
      legend: {
        resumes: string;
        resume: string;
      };
      ranges: {
        poor: string;
        fair: string;
        good: string;
        excellent: string;
      };
    };

  };
  
  // Footer
  footer: {
    company: {
      description: string;
      tagline: string;
    };
    newsletter: {
      title: string;
      subtitle: string;
      placeholder: string;
      agreement: string;
    };
    links: {
      product: {
        title: string;
        items: {
          cvAnalysis: string;
          jobMatching: string;
          careerInsights: string;
          skillAssessment: string;
        };
      };
      company: {
        title: string;
        items: {
          about: string;
          team: string;
          news: string;
          careers: string;
          partners: string;
        };
      };
      support: {
        title: string;
        items: {
          helpCenter: string;
          userGuide: string;
          apiDocs: string;
          contactSupport: string;
          bugReport: string;
        };
      };
      legal: {
        title: string;
        items: {
          privacy: string;
          terms: string;
          cookies: string;
          gdpr: string;
        };
      };
    };
    social: {
      followUs: string;
    };
    bottom: {
      copyright: string;
      madeWith: string;
      vietnam: string;
    };
  };

  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    edit: string;
    delete: string;
    back: string;
    next: string;
    previous: string;
    close: string;
    open: string;
    viewMore: string;
    viewLess: string;
    toast: {
      linkCopied: string;
      jobSaved: string;
      jobSavedSubtitle: string;
      filesAddedSuccess: string;
      noFilesReady: string;
      analysisSuccess: string;
      networkError: string;
      networkErrorSubtitle: string;
      genericError: string;
      genericErrorSubtitle: string;
    };
  };

  // Password Requirements component
  passwordRequirements: {
    title: string;
    strength: string;
    strengthLevels: {
      weak: string;
      medium: string;
      strong: string;
    };
    requirements: {
      minLength: string;
      uppercase: string;
      lowercase: string;
      number: string;
      special: string;
    };
  };

  // Users Management
  users: {
    title: string;
    subtitle: string;
    addUser: string;
    editUser: string;
    stats: {
      totalUsers: string;
      candidates: string;
      recruiters: string;
      admins: string;
    };
    search: {
      placeholder: string;
    };
    filters: {
      allRoles: string;
      allStatus: string;
      filterButton: string;
    };
    table: {
      user: string;
      role: string;
      status: string;
      joined: string;
      lastLogin: string;
      actions: string;
      never: string;
    };
    roles: {
      admin: string;
      recruiter: string;
      candidate: string;
    };
    status: {
      active: string;
      inactive: string;
      suspended: string;
    };
    empty: {
      title: string;
      description: string;
    };
  };
}
