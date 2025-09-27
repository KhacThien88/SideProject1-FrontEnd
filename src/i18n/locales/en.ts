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
      title: 'Multi-platform Support',
      description: 'Access from any device and platform',
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
    subtitle: 'Discover the powerful features that optimize your recruitment process',
    tabs: {
      candidates: 'Candidates',
      recruiters: 'Recruiters',
      admins: 'Admins',
    },
    candidates: {
      upload: {
        title: 'Upload CV',
        description: 'Easy CV upload with multi-format and language support',
      },
      analysis: {
        title: 'AI Analysis',
        description: 'Smart CV analysis with AI, extracting skills and experience',
      },
      matching: {
        title: 'Job Matching',
        description: 'Find suitable jobs based on profile and preferences',
      },
    },
    recruiters: {
      posting: {
        title: 'Post Jobs',
        description: 'Create and manage job postings easily and effectively',
      },
      search: {
        title: 'Search Candidates',
        description: 'Find suitable candidates with specific criteria',
      },
      management: {
        title: 'Manage Candidates',
        description: 'Track and manage the entire recruitment process',
      },
    },
    admins: {
      users: {
        title: 'User Management',
        description: 'Manage user accounts and system permissions',
      },
      monitoring: {
        title: 'System Monitoring',
        description: 'Monitor system performance and operational status',
      },
      analytics: {
        title: 'Data Analytics',
        description: 'Detailed reports and recruitment trend analysis',
      },
    },
  },
  

  

  
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
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
    viewMore: 'View more',
    viewLess: 'View less',
  },
};
