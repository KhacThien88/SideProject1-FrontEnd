import type { ContentTaxonomy } from '../types/content';

export const vi: ContentTaxonomy = {
  nav: {
    features: 'Tính năng',
    pricing: 'Giá cả',
    about: 'Về chúng tôi',
    login: 'Đăng nhập',
    language: 'Ngôn ngữ',
  },
  
  hero: {
    headline: 'AI Resume Analyzer & Job Match Platform',
    subtitle: 'Tìm việc làm phù hợp với AI - Nhanh, Chính xác, Hiệu quả',
    ctaButtons: {
      uploadCV: 'Tải CV ngay',
      postJob: 'Đăng tin tuyển dụng',
      viewDemo: 'Xem demo',
    },
    trustIndicators: [
      '10,000+ người dùng tin tưởng',
      '95% độ chính xác',
      '10s xử lý nhanh chóng',
    ],
  },
  
  valueProps: {
    title: 'Tại sao chọn Resulyze?',
    items: [
      {
        title: 'AI-Powered Analysis',
        description: 'Phân tích CV tự động với độ chính xác 95%',
        metric: '95% Accuracy',
      },
      {
        title: 'Smart Matching',
        description: 'Khớp việc làm thông minh dựa trên AI similarity',
        metric: 'AI Similarity',
      },
      {
        title: 'Real-time Processing',
        description: 'Xử lý nhanh chóng trong vòng 10 giây',
        metric: '10s Processing',
      },
      {
        title: 'Secure & Private',
        description: 'Bảo mật dữ liệu tuyệt đối tuân thủ GDPR',
        metric: 'GDPR Compliant',
      },
    ],
  },
  
  features: {
    title: 'Tính năng dành cho mọi người',
    userTypes: [
      {
        title: 'Cho Ứng viên',
        features: [
          'Upload CV (PDF/Word)',
          'AI phân tích tự động',
          'Job matching thông minh',
          'Apply trực tiếp',
        ],
      },
      {
        title: 'Cho Nhà tuyển dụng',
        features: [
          'Đăng tin tuyển dụng',
          'Tìm CV phù hợp',
          'Quản lý ứng viên',
          'Analytics & reports',
        ],
      },
      {
        title: 'Cho Admin',
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
    title: 'Quy trình hoạt động',
    steps: [
      {
        title: 'Upload CV',
        description: 'Tải lên CV của bạn (PDF/Word) - Hỗ trợ đa ngôn ngữ',
        details: [
          'Hỗ trợ PDF, Word, TXT',
          'Đa ngôn ngữ: Tiếng Việt, English',
          'Tự động detect format',
          'Preview trước khi upload',
        ],
      },
      {
        title: 'AI Phân tích',
        description: 'Trích xuất skills, kinh nghiệm, học vấn từ CV',
        details: [
          'OCR text extraction',
          'Skill recognition',
          'Experience parsing',
          'Education analysis',
        ],
      },
      {
        title: 'Job Matching',
        description: 'Tìm việc làm phù hợp dựa trên similarity',
        details: [
          'AI similarity matching',
          'Skill-based filtering',
          'Location preferences',
          'Salary range matching',
        ],
      },
      {
        title: 'Apply Jobs',
        description: 'Ứng tuyển trực tiếp qua hệ thống',
        details: [
          'One-click apply',
          'Auto-fill application',
          'Cover letter generation',
          'Application tracking',
        ],
      },
      {
        title: 'Get Hired',
        description: 'Nhận job offer từ nhà tuyển dụng',
        details: [
          'Interview scheduling',
          'Offer management',
          'Contract negotiation',
          'Onboarding support',
        ],
      },
      {
        title: 'Feedback',
        description: 'Cải thiện hệ thống dựa trên phản hồi',
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
    title: 'Số liệu thuyết phục',
    items: [
      { label: 'Users', description: 'Người dùng tin tưởng' },
      { label: 'Accuracy', description: 'Độ chính xác AI' },
      { label: 'Processing', description: 'Thời gian xử lý' },
      { label: 'Jobs', description: 'Tin tuyển dụng' },
      { label: 'Hires', description: 'Ứng viên được tuyển' },
      { label: 'Rating', description: 'Đánh giá người dùng' },
    ],
  },
  
  testimonials: {
    title: 'Lời chứng thực từ khách hàng',
    items: [
      {
        quote: 'AI phân tích CV rất chính xác, tôi đã tìm được công việc mơ ước chỉ sau 2 tuần! Hệ thống matching thông minh giúp tôi tiết kiệm rất nhiều thời gian.',
        author: 'Nguyễn Văn A',
        role: 'Software Engineer',
        company: 'TechCorp Vietnam',
      },
      {
        quote: 'Hệ thống giúp chúng tôi tìm được ứng viên phù hợp nhanh hơn 70% so với phương pháp truyền thống. AI matching rất chính xác và tiết kiệm chi phí tuyển dụng.',
        author: 'Trần Thị B',
        role: 'HR Manager',
        company: 'ABC Corporation',
      },
      {
        quote: 'Platform dễ sử dụng, hiệu quả cao trong việc quản lý và matching. Dashboard analytics giúp chúng tôi theo dõi hiệu suất và cải thiện quy trình tuyển dụng.',
        author: 'Lê Văn C',
        role: 'Admin System',
        company: 'Resulyze Platform',
      },
    ],
  },
  
  pricing: {
    title: 'Chọn gói phù hợp với bạn',
    toggle: {
      monthly: 'Hàng tháng',
      yearly: 'Hàng năm',
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
    headline: 'Sẵn sàng bắt đầu?',
    subtitle: 'Tham gia cùng 10,000+ ứng viên và nhà tuyển dụng đã tìm thấy thành công với AI Resume Analyzer',
    primaryCTA: 'Đăng ký miễn phí ngay',
    secondaryCTA: 'Xem demo',
    trustMessage: '⏰ Chỉ mất 2 phút để tạo tài khoản và upload CV đầu tiên',
  },
  
  footer: {
    company: {
      description: 'AI Resume Analyzer & Job Match Platform - Tìm việc làm phù hợp với AI',
      links: [
        { label: 'Về chúng tôi', href: '/about' },
        { label: 'Tuyển dụng', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Tin tức', href: '/news' },
      ],
    },
    product: {
      title: 'Sản phẩm',
      links: [
        { label: 'Tính năng', href: '/features' },
        { label: 'Bảng giá', href: '/pricing' },
        { label: 'API', href: '/api' },
        { label: 'Tích hợp', href: '/integrations' },
      ],
    },
    support: {
      title: 'Hỗ trợ',
      links: [
        { label: 'Trung tâm trợ giúp', href: '/help' },
        { label: 'Liên hệ', href: '/contact' },
        { label: 'Trạng thái', href: '/status' },
        { label: 'Cộng đồng', href: '/community' },
      ],
    },
    legal: {
      title: 'Pháp lý',
      links: [
        { label: 'Chính sách bảo mật', href: '/privacy' },
        { label: 'Điều khoản sử dụng', href: '/terms' },
        { label: 'Chính sách cookie', href: '/cookies' },
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
    loading: 'Đang tải...',
    error: 'Có lỗi xảy ra',
    retry: 'Thử lại',
    close: 'Đóng',
    next: 'Tiếp theo',
    previous: 'Trước đó',
    learnMore: 'Tìm hiểu thêm',
    getStarted: 'Bắt đầu',
    contactUs: 'Liên hệ chúng tôi',
  },
};
