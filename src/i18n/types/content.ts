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
