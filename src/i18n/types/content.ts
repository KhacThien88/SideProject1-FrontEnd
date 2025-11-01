export interface ContentTaxonomy {
  // Navigation
  nav: {
    features: string;
    pricing: string;
    about: string;
    contact: string;
    login: string;
    signup: string;
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

  // Value Proposition (top-level)
  valueProposition: {
    title: string;
    subtitle: string;
    values: {
      accuracy: {
        title: string;
        description: string;
        metric: string;
      };
      efficiency: {
        title: string;
        description: string;
        metric: string;
      };
      insights: {
        title: string;
        description: string;
        metric: string;
      };
      scalability: {
        title: string;
        description: string;
        metric: string;
      };
    };
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
    platformSupport: {
      title: string;
      description: string;
    };
  };
  
  // How It Works
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      description: string;
      details: string[];
    }[];
  };
  
  // Statistics
  statistics: {
    title: string;
    description: string;
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
    headline: string;
    primaryCTA: string;
    secondaryCTA: string;
    trustMessage: string;
    buttons: {
      getStarted: string;
      learnMore: string;
    };
  };
  
  // Features Showcase
  featuresShowcase: {
    title: string;
    subtitle: string;
    tabs: {
      candidates: string;
      recruiters: string;
      admins: string;
    };
    candidates: {
      upload: {
        title: string;
        description: string;
      };
      analysis: {
        title: string;
        description: string;
      };
      matching: {
        title: string;
        description: string;
      };
    };
    recruiters: {
      posting: {
        title: string;
        description: string;
      };
      search: {
        title: string;
        description: string;
      };
      management: {
        title: string;
        description: string;
      };
    };
    admins: {
      users: {
        title: string;
        description: string;
      };
      monitoring: {
        title: string;
        description: string;
      };
      analytics: {
        title: string;
        description: string;
      };
    };
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

  // Job Matching & CV Analysis
  jobs: {
    details: {
      title: string;
      jobNotFound: string;
      jobNotFoundDescription: string;
      loadingJobDetails: string;
      matchAnalysis: string;
      similarJobs: string;
      companyInfo: string;
      backToResults: string;
      quickActions: string;
      applyNow: string;
      saveForLater: string;
      downloadJD: string;
      shareJob: string;
      applicationTips: string;
      highlightMatchingSkills: string;
      emphasizeExperience: string;
      addressSkillGaps: string;
      considerLearningPlans: string;
      standOut: string;
      customizeApplication: string;
      match: string;
      saved: string;
      saveJob: string;
      share: string;
      contact: string;
      overview: string;
      requirements: string;
      company: string;
      jobDescription: string;
      benefitsPerks: string;
      essentialRequirements: string;
      preferredQualifications: string;
      requiredSkills: string;
      about: string;
      industry: string;
      companySize: string;
      location: string;
      view: string;
      salary: string;
      experience: string;
      deadline: string;
      postedAgo: string;
      views: string;
      applicants: string;
      remote: string;
      hybrid: string;
      skillsMatched: string;
      aiAnalysis: string;
      tabs: {
        overview: string;
        requirements: string;
        company: string;
        similar: string;
      };
    };
    matching: {
      title: string;
      noJobsFound: string;
      noJobsFoundDescription: string;
      resultsCount: string;
      filterJobs: string;
      jobRemoved: string;
      removedFromSaved: string;
      jobSaved: string;
      addedToSaved: string;
      application: string;
      openingApplicationForm: string;
      linkCopied: string;
      jobLinkCopied: string;
      checkOutJobAt: string;
      jobSearchResults: string;
      foundJobs: string;
      matchingYourProfile: string;
      filters: string;
      filter: string;
      applied: string;
      relevance: string;
      matchScore: string;
      datePosted: string;
      showing: string;
      to: string;
      of: string;
      results: string;
    };
    utils: {
      year: string;
      month: string;
      hour: string;
      from: string;
      upTo: string;
      salaryNotSpecified: string;
      justNow: string;
      hoursAgo: string;
      daysAgo: string;
      weeksAgo: string;
      monthsAgo: string;
      excellentMatch: string;
      goodMatch: string;
      fairMatch: string;
      poorMatch: string;
    };
    card: {
      featured: string;
      urgent: string;
      remote: string;
      match: string;
      requiredSkills: string;
      more: string;
      of: string;
      skillsMatched: string;
      applyNow: string;
      saved: string;
      save: string;
      share: string;
      company: string;
      away: string;
    };
    filters: {
      activeFilters: string;
      clearAll: string;
      location: string;
      jobType: string;
      experienceLevel: string;
      salary: string;
      skills: string;
      remote: string;
      filterRecommendations: string;
      searchKeywords: string;
      jobTitleCompanySkills: string;
      search: string;
      anyLocation: string;
      includeRemoteWork: string;
      salaryRange: string;
      minSalary: string;
      maxSalary: string;
      companySize: string;
      skillsFromCV: string;
      skillsWithStar: string;
    };
  };

  // CV Analysis
  cvAnalysis: {
    targetPosition: string;
    targetPositionDescription: string;
    noResumesUploaded: string;
    noResumesUploadedDescription: string;
    uploadYourFirstResume: string;
    jobRecommendations: string;
    recommendedJobs: string;
    basedOnCVAnalysis: string;
    jobsMatchProfile: string;
    filteredFrom: string;
    total: string;
    filters: string;
    saveSearch: string;
    noJobsMatchFilters: string;
    tryAdjustingFilters: string;
    clearAllFilters: string;
    viewAllMatchingJobs: string;
    exportReport: string;
    startingAnalysis: string;
    file: string;
    files: string;
    analysisCompleted: string;
    allFilesCleared: string;
    noFilesReady: string;
    jobDetails: string;
    openingJobDetails: string;
    application: string;
    redirectingToApplication: string;
    jobLinkCopied: string;
    jobRemovedFromSaved: string;
    jobSavedSuccessfully: string;
    jobOpportunity: string;
    checkOutThisJob: string;
    jobSaved: string;
    savedToFavorites: string;
    linkCopied: string;
    checkOutJobAt: string;
    upload: {
      title: string;
      dropHere: string;
      dragAndDrop: string;
      supports: string;
      maxSize: string;
      upTo: string;
      chooseFiles: string;
      uploadIssues: string;
      filesAdded: string;
      fileRemoved: string;
    };
    fileManagement: {
      selectedFiles: string;
      clearAll: string;
      analyzing: string;
      analyzeFiles: string;
      ready: string;
      error: string;
      processing: string;
      uploading: string;
    };
    progress: {
      analyzingFiles: string;
      uploading: string;
      extracting: string;
      analyzing: string;
      completing: string;
      processing: string;
      estimatedTime: string;
    };
    results: {
      title: string;
      exportResults: string;
      analyzedOn: string;
      good: string;
      fair: string;
      average: string;
      needsImprovement: string;
      previewCV: string;
      downloadReport: string;
      removeResult: string;
      name: string;
      email: string;
      phone: string;
      location: string;
      skillsMatch: string;
      experience: string;
      education: string;
      keywords: string;
      detectedSkills: string;
      matchPercentage: string;
      matchWith: string;
      recommendations: string;
      overallScore: string;
      skillsDetected: string;
      experienceLevel: string;
      jobMatches: string;
      candidate: string;
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
    jdAnalysis: {
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
      // Role-specific metric keys (optional)
      roles?: {
        admin: {
          totalUsers: { title: string; description: string };
          systemUptime: { title: string; description: string };
          totalProcessedCV: { title: string; description: string };
          activeJobs: { title: string; description: string };
        };
        candidate: {
          applications: { title: string; description: string };
          pendingResponses: { title: string; description: string };
          accepted: { title: string; description: string };
          matchedJobs: { title: string; description: string };
        };
        recruiter: {
          jobPosts: { title: string; description: string };
          newApplicants: { title: string; description: string };
          interviewed: { title: string; description: string };
          hired: { title: string; description: string };
        };
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
    recentCandidates: {
      title: string;
      subtitle: string;
      viewAll: string;
      total: string;
      match: string;
      status: {
        new: string;
        reviewing: string;
        interviewed: string;
        hired: string;
        rejected: string;
      };
      actions: {
        viewProfile: string;
        sendEmail: string;
        call: string;
      };
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
    backToResults: string;
    apply: string;
    share: string;
    export: string;
    refresh: string;
    clearAll: string;
    clearAllFilters: string;
    viewDetails: string;
    loadMore: string;
    sortBy: string;
    filterBy: string;
    viewMode: string;
    activeFilters: string;
    noResults: string;
    noDataAvailable: string;
    loadingData: string;
    errorLoadingData: string;
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
    loadingScreen: {
      loading: string;
      redirecting: string;
      authenticating: string;
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

  // Settings
  settings: {
    title: string;
    saveChanges: string;
    saving: string;
    saveSuccess: string;
    saveError: string;
    loadError: string;
    
    tabs: {
      profile: string;
      notifications: string;
      privacy: string;
      data: string;
      appearance: string;
    };
    
    profile: {
      title: string;
      fullName: string;
      email: string;
      company: string;
      role: string;
      changePassword: string;
      cancelPasswordChange: string;
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
      roles: {
        hrManager: string;
        recruiter: string;
        talentAcquisition: string;
        admin: string;
      };
    };
    
    notifications: {
      emailAlerts: string;
      emailAlertsDesc: string;
      pushNotifications: string;
      pushNotificationsDesc: string;
      weeklyReports: string;
      weeklyReportsDesc: string;
      analysisComplete: string;
      analysisCompleteDesc: string;
    };
    
    privacy: {
      dataRetention: string;
      dataRetentionDesc: string;
      shareAnalytics: string;
      shareAnalyticsDesc: string;
      autoDelete: string;
      autoDeleteDesc: string;
      days30: string;
      days60: string;
      days90: string;
      days180: string;
      days365: string;
    };
    
    data: {
      export: string;
      exportDesc: string;
      import: string;
      importDesc: string;
      dangerZone: string;
      reset: string;
      resetDesc: string;
      delete: string;
      deleteDesc: string;
      exportSuccess: string;
      importSuccess: string;
      resetConfirm: string;
      deleteConfirm: string;
      deleteDoubleConfirm: string;
    };
    
    appearance: {
      language: string;
    };
  };

  // Job Postings
  jobPostings: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    createJobProfile: string;
    editJobProfile: string;
    jobProfile: string;
    jobTitle: string;
    jobTitlePlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    experienceLevel: string;
    experience: string;
    years: string;
    requiredSkills: string;
    preferredSkills: string;
    addSkillPlaceholder: string;
    add: string;
    noSkillsAdded: string;
    activeMatches: string;
    viewMatches: string;
    edit: string;
    delete: string;
    cancel: string;
    saving: string;
    saveChanges: string;
    createProfile: string;
    more: string;
    noJobsTitle: string;
    noJobsSubtitle: string;
    createFirstJob: string;
    noResultsTitle: string;
    noResultsSubtitle: string;
    loadError: string;
    createSuccess: string;
    updateSuccess: string;
    deleteSuccess: string;
    saveError: string;
    deleteError: string;
    deleteConfirm: string;
    viewMatchesInfo: string;
  };

  // Candidate Matches
  candidateMatches: {
    title: string;
    backToJobs: string;
    totalMatches: string;
    requiredSkills: string;
    filters: string;
    clearFilters: string;
    filterMatchScore: string;
    filterExperience: string;
    years: string;

    sort: {
      matchScore: string;
      experience: string;
      appliedDate: string;
      name: string;
    };

    overallMatch: string;
    skillsMatch: string;
    experience: string;
    yearsExperience: string;
    matchedSkills: string;
    missingSkills: string;
    more: string;
    appliedOn: string;
    downloadResume: string;
    save: string;
    unsave: string;
    saved: string;

    noCandidates: string;
    noMatches: string;
    noResultsFilters: string;

    success: {
      saveToggled: string;
      resumeDownloaded: string;
    };

    errors: {
      loadFailed: string;
      saveFailed: string;
      downloadFailed: string;
      jobNotFound: string;
    };
  };

  // Saved Candidates
  savedCandidates: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filters: string;
    clearFilters: string;
    filterMatchScore: string;
    filterExperience: string;
    filterSkillMatches: string;
    filterLocation: string;
    filterSkills: string;
    years: string;

    sort: {
      matchScore: string;
      experience: string;
      appliedDate: string;
      name: string;
    };

    noCandidates: string;
    noSavedYet: string;
    noResultsFilters: string;

    success: {
      saveToggled: string;
      resumeDownloaded: string;
    };

    errors: {
      loadFailed: string;
      saveFailed: string;
      downloadFailed: string;
    };
  };

  // Saved Jobs
  savedJobs: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filters: string;
    clearFilters: string;
    filterMatchScore: string;
    filterSalary: string;
    filterJobType: string;
    filterLocation: string;
    filterRemoteOnly: string;
    salaryAny: string;
    savedAt: string;
    resultsCount: string;
    noSavedYet: string;
    noSavedDescription: string;
    noResultsFilters: string;

    sort: {
      matchScore: string;
      recent: string;
      salaryHigh: string;
      salaryLow: string;
      company: string;
    };

    actions: {
      refresh: string;
      applyTitle: string;
      applyMessage: string;
      shareMessage: string;
    };

    success: {
      removed: string;
      refreshed: string;
      shareTitle: string;
      shareCopied: string;
    };

    errors: {
      loadFailed: string;
      removeFailed: string;
      shareFailed: string;
    };
  };

  // Upload Progress Component
  uploadProgress: {
    status: {
      uploading: string;
      processing: string;
      completed: string;
      failed: string;
      unknown: string;
    };
    details: {
      remaining: string;
      processing: string;
      completed: string;
      failed: string;
    };
    actions: {
      cancel: string;
      retry: string;
    };
  };

  // JD File Management
  jdFileManagement: {
    loading: string;
    allStatuses: string;
    actions: {
      createJobProfile: string;
      deleteFile: string;
      clearCompleted: string;
      clearAll: string;
    };
  };

  // Admin Layout
  adminAuth: {
    verifying: string;
  };

  // Status Values
  status: {
    uploaded: string;
    processing: string;
    processed: string;
    failed: string;
    completed: string;
    pending: string;
  };

  // Social Proof
  socialProof?: {
    activeUsers: string;
    successRate: string;
    jobsMatched: string;
  };

  trustBadges?: {
    title: string;
    subtitle: string;
    gdprCompliant: {
      title: string;
      description: string;
    };
    ssl: {
      title: string;
      description: string;
    };
    certified: {
      title: string;
      description: string;
    };
    verified: {
      title: string;
      description: string;
    };
  };

  successStories?: {
    title: string;
    subtitle: string;
    story1: {
      text: string;
    };
    story2: {
      text: string;
    };
    story3: {
      text: string;
    };
  };

  caseStudies?: {
    title: string;
    subtitle: string;
  };

  reviews?: {
    title: string;
    subtitle: string;
  };

  // Engagement Features
  exitIntent?: {
    title: string;
    subtitle: string;
    ctaButton: string;
    noThanks: string;
  };

  scrollEngagement?: {
    title: string;
    message: string;
    ctaButton: string;
  };

  timeBased?: {
    title: string;
    message: string;
    ctaButton: string;
  };

  chatWidget?: {
    title: string;
    status: string;
    welcomeMessage: string;
    placeholder: string;
    autoReply: string;
    quickReplies: {
      pricing: string;
      features: string;
      demo: string;
    };
  };

  // CTA Optimization
  smartCTA?: {
    control: string;
    variantA: string;
    variantB: string;
    noCredit: string;
  };

  multiPathCTA?: {
    title: string;
    subtitle: string;
    getStarted: string;
    contactUs: string;
    help: string;
    footer: string;
    jobSeeker: {
      title: string;
      description: string;
      badge: string;
    };
    recruiter: {
      title: string;
      description: string;
    };
    enterprise: {
      title: string;
      description: string;
    };
  };

  urgency?: {
    countdown: {
      label: string;
    };
    socialProof: {
      label: string;
    };
    limitedSpots: {
      only: string;
      left: string;
      subtitle: string;
    };
    trending: {
      label: string;
      text: string;
    };
  };

  personalizedCTA?: {
    newVisitor: string;
    returningVisitor: string;
    engagedUser: string;
    deepScroll: string;
    activity: string;
  };

  // Pricing Components
  pricingCalculator?: {
    title: string;
    subtitle: string;
    employees: string;
    jobPosts: string;
    monthly: string;
    yearly: string;
    save: string;
    savings: string;
    includes: string;
    features: string;
  };

  featureComparison?: {
    title: string;
    subtitle: string;
    features: string;
    basic: string;
    pro: string;
    enterprise: string;
    popular: string;
    cvAnalysis: string;
    jobMatching: string;
    storage: string;
    support: string;
    analytics: string;
    customization: string;
    api: string;
    team: string;
    guarantee: string;
    noCreditCard: string;
  };

  interactiveDemo?: {
    title: string;
    subtitle: string;
    previous: string;
    next: string;
    finish: string;
    step1: {
      title: string;
      description: string;
    };
    step2: {
      title: string;
      description: string;
    };
    step3: {
      title: string;
      description: string;
    };
    step4: {
      title: string;
      description: string;
    };
  };

  // Mobile Optimization
  mobileCTA?: {
    upload: string;
    title: string;
    subtitle: string;
    start: string;
  };

  mobileForm?: {
    tapToUpload: string;
    supportedFormats: string;
    analyze: string;
    analyzing: string;
    privacy: string;
  };

  // SEO Content
  seo: {
    home: {
      title: string;
      description: string;
      keywords: string[];
    };
    login: {
      title: string;
      description: string;
    };
    register: {
      title: string;
      description: string;
    };
    dashboard: {
      title: string;
      description: string;
    };
    cvAnalysis: {
      title: string;
      description: string;
    };
    jobMatching: {
      title: string;
      description: string;
    };
  };
}
