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
        invalidCredentials: string;
        networkError: string;
        loginFailed: string;
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
      termsOfService: string;
      privacyPolicy: string;
      registerButton: string;
      registering: string;
      hasAccount: string;
      loginLink: string;
      toast: {
        // Validation messages
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
        confirmPasswordRequired: string;
        confirmPasswordMismatch: string;
        phoneInvalid: string;
        termsRequired: string;
        
        // Success messages
        registerSuccess: string;
        registerSuccessSubtitle: string;
        
        // Error messages
        registerFailed: string;
        emailExists: string;
        emailExistsSubtitle: string;
        networkError: string;
        networkErrorSubtitle: string;
        generalError: string;
        generalErrorSubtitle: string;
      };
    };
  };

  // Dashboard
  dashboard: {
    sidebar: {
      navigation: {
        dashboard: string;
        resumeAnalyzer: string;
        candidates: string;
        jobPostings: string;
        analytics: string;
        settings: string;
      };
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

  // CV Analysis
  cvAnalysis: {
    title: string;
    subtitle: string;
    navigation: {
      back: string;
    };
    upload: {
      title: string;
      subtitle: string;
      selectFiles: string;
      uploadedFiles: string;
      addMore: string;
      dragDrop: string;
      formats: string;
      maxSize: string;
      maxFiles: string;
      errors: {
        sizeTooLarge: string;
        invalidFormat: string;
        tooManyFiles: string;
        uploadFailed: string;
      };
    };
    preview: {
      fileInfo: string;
      actions: string;
      startAnalysis: string;
      uploadAnother: string;
      zoom: string;
      rotate: string;
      fullscreen: string;
      download: string;
    };
    progress: {
      title: string;
      stages: {
        upload: {
          label: string;
          description: string;
        };
        extract: {
          label: string;
          description: string;
        };
        analyze: {
          label: string;
          description: string;
        };
        complete: {
          label: string;
          description: string;
        };
      };
      estimatedTime: string;
      elapsed: string;
      cancel: string;
      pause: string;
      resume: string;
      retry: string;
    };
    results: {
      title: string;
      overview: {
        title: string;
        metrics: {
          experience: string;
          skills: string;
          education: string;
          matchScore: string;
        };
        insights: {
          strengths: string;
          improvements: string;
        };
      };
      skills: {
        title: string;
        technical: string;
        soft: string;
        languages: string;
        showMore: string;
        showLess: string;
      };
      experience: {
        title: string;
        position: string;
        company: string;
        duration: string;
      };
      education: {
        title: string;
        degree: string;
        institution: string;
        year: string;
      };
      suggestions: {
        title: string;
        strengths: string;
        improvements: string;
      };
      export: {
        pdf: string;
        data: string;
        print: string;
        share: string;
      };
      newAnalysis: string;
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
  };
}
