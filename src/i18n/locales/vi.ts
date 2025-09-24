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

  landing: {
    valueProposition: {
      title: 'Giá trị cốt lõi của chúng tôi',
      subtitle: 'Khám phá những lợi ích vượt trội mà nền tảng AI của chúng tôi mang lại cho việc tìm kiếm và tuyển dụng nhân tài.',
      security: {
        title: 'Bảo mật tuyệt đối',
        description: 'Dữ liệu của bạn được bảo vệ bằng công nghệ mã hóa tiên tiến và tuân thủ các tiêu chuẩn bảo mật quốc tế.',
      },
      performance: {
        title: 'Hiệu suất vượt trội',
        description: 'Xử lý nhanh chóng với độ chính xác cao, giúp bạn tiết kiệm thời gian và nâng cao hiệu quả công việc.',
      },
      collaboration: {
        title: 'Hợp tác liền mạch',
        description: 'Kết nối ứng viên và nhà tuyển dụng một cách hiệu quả, tạo ra môi trường tuyển dụng tối ưu.',
      },
      cta: {
        text: 'Sẵn sàng trải nghiệm sự khác biệt?',
        button: 'Bắt đầu ngay',
      },
    },
  },
  
  features: {
    title: 'Tính năng mạnh mẽ cho tuyển dụng hiện đại',
    subtitle: 'Mọi thứ bạn cần để tối ưu hóa quy trình tuyển dụng với công cụ AI',
    userFeatures: [
      {
        title: 'Cộng tác thời gian thực',
        description: 'Làm việc cùng nhau một cách liền mạch với các thành viên trong nhóm, chia sẻ phản hồi ngay lập tức và đưa ra quyết định tuyển dụng nhanh hơn với các công cụ giao tiếp tích hợp.',
      },
      {
        title: 'Tự động hóa thông minh',
        description: 'Tự động hóa các tác vụ lặp đi lặp lại, lên lịch phỏng vấn tự động và để AI xử lý việc sàng lọc ứng viên ban đầu để tập trung vào những gì quan trọng nhất.',
      },
      {
        title: 'Phân tích nâng cao',
        description: 'Có được cái nhìn sâu sắc về quy trình tuyển dụng của bạn với phân tích toàn diện, theo dõi các chỉ số hiệu suất và tối ưu hóa chiến lược tuyển dụng.',
      },
    ],
    platforms: [
      {
        name: 'Nền tảng Web',
        description: 'Ứng dụng web đầy đủ tính năng với bộ công cụ tuyển dụng hoàn chỉnh',
      },
      {
        name: 'Ứng dụng di động',
        description: 'Ứng dụng di động native cho iOS và Android với khả năng offline',
      },
      {
        name: 'Ứng dụng Desktop',
        description: 'Ứng dụng desktop đa nền tảng cho Windows, macOS và Linux',
      },
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
    title: 'Sẵn sàng bắt đầu?',
    subtitle: 'Tham gia cùng hàng nghìn công ty đã tin tưởng sử dụng nền tảng của chúng tôi.',
    buttons: {
      getStarted: 'Bắt đầu miễn phí',
      learnMore: 'Tìm hiểu thêm',
    },
  },
  
  featuresShowcase: {
    title: 'Tính năng nổi bật',
    subtitle: 'Khám phá những tính năng mạnh mẽ giúp bạn tối ưu hóa quy trình tuyển dụng',
    features: [
      {
        title: 'Phân tích CV thông minh',
        description: 'AI phân tích và đánh giá CV một cách chính xác và nhanh chóng',
        icon: 'brain',
      },
      {
        title: 'Matching công việc',
        description: 'Tìm kiếm và ghép nối ứng viên phù hợp với vị trí tuyển dụng',
        icon: 'target',
      },
      {
        title: 'Dashboard quản lý',
        description: 'Theo dõi và quản lý toàn bộ quy trình tuyển dụng một cách hiệu quả',
        icon: 'dashboard',
      },
    ],
  },
  
  common: {
    loading: 'Đang tải...',
    error: 'Có lỗi xảy ra',
    success: 'Thành công',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    save: 'Lưu',
    edit: 'Chỉnh sửa',
    delete: 'Xóa',
    back: 'Quay lại',
    next: 'Tiếp theo',
    previous: 'Trước đó',
    close: 'Đóng',
    open: 'Mở',
    viewMore: 'Xem thêm',
    viewLess: 'Thu gọn',
  },
};
