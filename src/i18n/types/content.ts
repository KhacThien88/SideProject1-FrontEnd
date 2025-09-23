export interface ContentTaxonomy {
  // Navigation
  nav: {
    features: string;
    pricing: string;
    about: string;
    login: string;
    language: string;
  };
  
  // Hero Section
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
  
  // Value Proposition
  valueProps: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      metric: string;
    }>;
  };
  
  // Features
  features: {
    title: string;
    userTypes: Array<{
      title: string;
      features: string[];
    }>;
    platforms: Array<{
      name: string;
      description: string;
    }>;
  };
  
  // How It Works
  howItWorks: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
      details: string[];
    }>;
  };
  
  // Statistics
  statistics: {
    title: string;
    items: Array<{
      label: string;
      description: string;
    }>;
  };
  
  // Testimonials
  testimonials: {
    title: string;
    items: Array<{
      quote: string;
      author: string;
      role: string;
      company: string;
    }>;
  };
  
  // Pricing
  pricing: {
    title: string;
    toggle: {
      monthly: string;
      yearly: string;
    };
    plans: Array<{
      name: string;
      description: string;
      features: string[];
      ctaText: string;
    }>;
  };
  
  // CTA Section
  cta: {
    headline: string;
    subtitle: string;
    primaryCTA: string;
    secondaryCTA: string;
    trustMessage: string;
  };
  
  // Footer
  footer: {
    company: {
      description: string;
      links: Array<{ label: string; href: string }>;
    };
    product: {
      title: string;
      links: Array<{ label: string; href: string }>;
    };
    support: {
      title: string;
      links: Array<{ label: string; href: string }>;
    };
    legal: {
      title: string;
      links: Array<{ label: string; href: string }>;
    };
    contact: {
      email: string;
      phone: string;
      address: string;
    };
    copyright: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    retry: string;
    close: string;
    next: string;
    previous: string;
    learnMore: string;
    getStarted: string;
    contactUs: string;
  };
}
