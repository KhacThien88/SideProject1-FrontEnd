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
        description: 'Fast processing in just 10 seconds',
        metric: '10s Processing',
      },
      {
        title: 'Secure & Private',
        description: 'Absolute data security compliant with GDPR',
        metric: 'GDPR Compliant',
      },
    ],
  },
  
  features: {
    title: 'Features for Everyone',
    userTypes: [
      {
        title: 'For Candidates',
        features: [
          'Upload CV (PDF/Word)',
          'Automatic AI analysis',
          'Smart job matching',
          'Direct application',
        ],
      },
      {
        title: 'For Recruiters',
        features: [
          'Post job listings',
          'Find suitable CVs',
          'Manage candidates',
          'Analytics & reports',
        ],
      },
      {
        title: 'For Admins',
        features: [
          'User management',
          'System monitoring',
          'Content moderation',
          'Reports & analytics',
        ],
      },
    ],
    platforms: [
      { name: 'Web App', description: 'React Application' },
      { name: 'Slack Bot', description: 'Team Integration' },
      { name: 'WhatsApp', description: 'Mobile Access' },
      { name: 'API', description: 'Developer Access' },
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
    headline: 'Ready to Get Started?',
    subtitle: 'Join 10,000+ candidates and recruiters who have found success with AI Resume Analyzer',
    primaryCTA: 'Sign Up Free Now',
    secondaryCTA: 'View Demo',
    trustMessage: '⏰ Takes only 2 minutes to create account and upload your first CV',
  },
  
  footer: {
    company: {
      description: 'AI Resume Analyzer & Job Match Platform - Find the perfect job with AI',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'News', href: '/news' },
      ],
    },
    product: {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'API', href: '/api' },
        { label: 'Integrations', href: '/integrations' },
      ],
    },
    support: {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact', href: '/contact' },
        { label: 'Status', href: '/status' },
        { label: 'Community', href: '/community' },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
      ],
    },
    contact: {
      email: 'hello@resulyze.com',
      phone: '+84 123 456 789',
      address: '123 Tech Street, Ho Chi Minh City, Vietnam',
    },
    copyright: '© 2024 Resulyze. All rights reserved. Built with ❤️ for modern recruitment.',
  },
  
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
    close: 'Close',
    next: 'Next',
    previous: 'Previous',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    contactUs: 'Contact Us',
  },
};
