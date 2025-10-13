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
    headline: 'Nền tảng phân tích CV & Gợi ý Việc làm',
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
  
  auth: {
    login: {
      title: 'Chào mừng',
      subtitle: 'trở lại',
      welcomeSubtitle: 'Đăng nhập để tiếp tục hành trình việc làm của bạn',
      email: 'Địa chỉ Email',
      emailPlaceholder: 'Nhập email của bạn',
      emailRequired: 'Email là bắt buộc',
      emailInvalid: 'Email không hợp lệ',
      password: 'Mật khẩu',
      passwordPlaceholder: 'Nhập mật khẩu của bạn',
      passwordRequired: 'Mật khẩu là bắt buộc',
      passwordMinLength: 'Mật khẩu phải có ít nhất 6 ký tự',
      rememberMe: 'Ghi nhớ đăng nhập',
      forgotPassword: 'Quên mật khẩu?',
      loginButton: 'Đăng nhập',
      loggingIn: 'Đang đăng nhập...',
      googleLogin: 'Đăng nhập với Google',
      noAccount: 'Chưa có tài khoản?',
      signUp: 'Đăng ký',
      or: 'hoặc',
      hero: {
        sections: [
          {
            name: 'Hero',
            title: 'TalentFit AI',
            description: 'Tìm việc làm phù hợp với AI - Nhanh, Chính xác, Hiệu quả',
            metric: 'Công cụ AI mạnh mẽ',
            features: ['10,000+ người dùng tin tưởng', '95% độ chính xác AI', '10s xử lý nhanh chóng']
          },
          {
            name: 'Value Proposition',
            title: 'Giá trị cốt lõi',
            description: 'Nền tảng phân tích CV và gợi ý việc làm thông minh',
            metric: '95% độ chính xác',
            features: ['Phân tích CV tự động', 'Thuật toán tiên tiến', 'Cái nhìn sâu sắc']
          },
          {
            name: 'Features Showcase',
            title: 'Tính năng nổi bật',
            description: 'Công nghệ AI tiên tiến cho ứng viên và nhà tuyển dụng',
            metric: 'Multi-Platform',
            features: ['Tải lên CV (PDF/Word)', 'Gợi ý việc làm thông minh', 'Nộp đơn trực tiếp']
          },
          {
            name: 'How It Works',
            title: 'Quy trình làm việc',
            description: 'Đơn giản, nhanh chóng và hiệu quả trong 3 bước',
            metric: '3 Bước',
            features: ['Tải lên CV', 'Phân tích bằng AI', 'Gợi ý việc làm']
          },
          {
            name: 'Statistics',
            title: 'Thống kê ấn tượng',
            description: 'Con số chứng minh chất lượng và uy tín của nền tảng',
            metric: '10K+ người dùng',
            features: ['Tỷ lệ thành công cao', 'Phản hồi tích cực', 'Phủ sóng toàn cầu']
          }
        ],
        trustIndicators: [
          '10,000+ người dùng tin tưởng',
          '95% độ chính xác AI',
          '10s xử lý nhanh chóng'
        ]
      }
    },
    register: {
      title: 'Tạo tài khoản',
      subtitle: 'mới',
      welcomeSubtitle: 'Tham gia cộng đồng TalentFit AI ngay hôm nay',
      fullName: 'Họ và tên',
      fullNamePlaceholder: 'Nhập họ và tên của bạn',
      email: 'Địa chỉ Email',
      emailPlaceholder: 'Nhập địa chỉ email',
      phone: 'Số điện thoại',
      optional: 'tùy chọn',
      phonePlaceholder: 'Nhập số điện thoại',
      role: 'Vai trò',
      candidate: 'Ứng viên',
      recruiter: 'Nhà tuyển dụng',
      password: 'Mật khẩu',
      passwordPlaceholder: 'Nhập mật khẩu (ít nhất 6 ký tự)',
      confirmPassword: 'Xác nhận mật khẩu',
      confirmPasswordPlaceholder: 'Nhập lại mật khẩu',
      acceptTerms: 'Tôi đồng ý với',
      termsOfService: 'Điều khoản sử dụng',
      privacyPolicy: 'Chính sách bảo mật',
      registerButton: 'Đăng ký',
      registering: 'Đang đăng ký...',
      hasAccount: 'Đã có tài khoản?',
      loginLink: 'Đăng nhập ngay'
    },
    forgotPassword: {
      title: 'Quên mật khẩu',
      subtitle: 'Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu',
      sendResetLink: 'Gửi link đặt lại mật khẩu',
      sending: 'Đang gửi...',
      backToLogin: 'Quay lại đăng nhập',
      successTitle: 'Email đã được gửi',
      successMessage: 'Link đặt lại mật khẩu đã được gửi',
      checkEmailMessage: 'Vui lòng kiểm tra email của bạn để đặt lại mật khẩu. Link sẽ hết hạn sau 1 giờ.',
      emailSentTo: 'Email đã gửi đến',
      errorMessage: 'Không thể gửi email đặt lại mật khẩu'
    },
    googleSigningIn: 'Đang đăng nhập...',
    continueWithGoogle: 'Đăng nhập với Google',
    googleSignInSuccess: 'Đăng nhập Google thành công!',
    logoutSuccess: 'Đăng xuất thành công'
  },

  // Password Requirements component
  passwordRequirements: {
    title: 'Yêu cầu mật khẩu',
    strength: 'Độ mạnh:',
    strengthLevels: {
      weak: 'Yếu',
      medium: 'Trung bình', 
      strong: 'Mạnh'
    },
    requirements: {
      minLength: 'Tối thiểu 8 ký tự',
      uppercase: 'Có ít nhất 1 chữ in hoa (A-Z)',
      lowercase: 'Có ít nhất 1 chữ thường (a-z)',
      number: 'Có ít nhất 1 số (0-9)',
      special: 'Có ít nhất 1 ký tự đặc biệt (@, #, $, etc.)'
    }
  },

  // Validation messages for all form validation with toast
  validation: {
    // Email validation
    emailRequired: 'Vui lòng nhập email',
    emailInvalid: 'Định dạng email không hợp lệ',
    emailMissingAt: 'Email thiếu ký tự "@"',
    emailStartsWithAt: 'Email không thể bắt đầu bằng "@"',
    emailMissingDomain: 'Email thiếu tên miền sau "@"',
    emailMissingTLD: 'Email thiếu phần mở rộng (ví dụ: .com, .vn)',
    
    // Password validation
    passwordRequired: 'Vui lòng nhập mật khẩu',
    passwordMinLength8: 'Mật khẩu phải có ít nhất 8 ký tự',
    passwordMissingUppercase: 'Mật khẩu thiếu chữ cái viết hoa',
    passwordMissingLowercase: 'Mật khẩu thiếu chữ cái viết thường',
    passwordMissingNumber: 'Mật khẩu thiếu chữ số',
    passwordMissingSpecial: 'Mật khẩu thiếu ký tự đặc biệt',
    
    // Confirm password validation
    confirmPasswordRequired: 'Vui lòng xác nhận mật khẩu',
    confirmPasswordMismatch: 'Mật khẩu xác nhận không trùng khớp',
    
    // Full name validation
    fullNameRequired: 'Vui lòng nhập họ và tên',
    fullNameTooShort: 'Họ tên quá ngắn (ít nhất 2 ký tự)',
    fullNameTooLong: 'Họ tên quá dài (tối đa 50 ký tự)',
    
    // Phone validation
    phoneInvalid: 'Định dạng số điện thoại không đúng',
    
    // Accept terms validation
    acceptTermsRequired: 'Vui lòng đồng ý với điều khoản sử dụng',
    
    // Success messages
    loginSuccess: 'Đăng nhập thành công!',
    registerSuccess: 'Đăng ký thành công!',
    welcomeMessage: 'Chào mừng bạn đến với TalentFit AI',
    
    // Error messages  
    invalidCredentials: 'Email hoặc mật khẩu không chính xác',
    networkError: 'Lỗi kết nối mạng. Vui lòng thử lại.',
    loginFailed: 'Đăng nhập thất bại. Vui lòng thử lại.',
    registerFailed: 'Đăng ký thất bại',
    emailExists: 'Email đã được sử dụng',
    emailExistsSubtitle: 'Vui lòng chọn email khác',
    networkErrorSubtitle: 'Lỗi kết nối mạng',
    generalError: 'Vui lòng thử lại sau',
    validationFailed: 'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin'
  },

  // Settings
  settings: {
    title: 'Cài đặt',
    saveChanges: 'Lưu thay đổi',
    saving: 'Đang lưu...',
    saveSuccess: 'Đã lưu cài đặt thành công',
    saveError: 'Lưu cài đặt thất bại',
    loadError: 'Không thể tải cài đặt',
    
    tabs: {
      profile: 'Hồ sơ',
      notifications: 'Thông báo',
      privacy: 'Bảo mật & Riêng tư',
      data: 'Quản lý dữ liệu',
      appearance: 'Giao diện',
    },
    
    profile: {
      title: 'Thông tin cá nhân',
      fullName: 'Họ và tên',
      email: 'Địa chỉ Email',
      company: 'Công ty',
      role: 'Vai trò',
      changePassword: 'Đổi mật khẩu',
      cancelPasswordChange: 'Hủy đổi mật khẩu',
      currentPassword: 'Mật khẩu hiện tại',
      newPassword: 'Mật khẩu mới',
      confirmPassword: 'Xác nhận mật khẩu mới',
      roles: {
        hrManager: 'Quản lý nhân sự',
        recruiter: 'Nhân viên tuyển dụng',
        talentAcquisition: 'Chuyên viên tuyển dụng',
        admin: 'Quản trị viên',
      },
    },
    
    notifications: {
      emailAlerts: 'Thông báo Email',
      emailAlertsDesc: 'Nhận thông báo qua email cho các cập nhật quan trọng',
      pushNotifications: 'Thông báo đẩy',
      pushNotificationsDesc: 'Nhận thông báo đẩy trên trình duyệt',
      weeklyReports: 'Báo cáo hàng tuần',
      weeklyReportsDesc: 'Tóm tắt hàng tuần về phân tích tuyển dụng của bạn',
      analysisComplete: 'Phân tích hoàn tất',
      analysisCompleteDesc: 'Thông báo khi phân tích hồ sơ hoàn tất',
    },
    
    privacy: {
      dataRetention: 'Thời gian lưu trữ dữ liệu',
      dataRetentionDesc: 'Chúng tôi nên lưu trữ CV của bạn trong bao lâu?',
      shareAnalytics: 'Chia sẻ dữ liệu phân tích ẩn danh',
      shareAnalyticsDesc: 'Giúp chúng tôi cải thiện bằng cách chia sẻ dữ liệu sử dụng ẩn danh',
      autoDelete: 'Tự động xóa dữ liệu cũ',
      autoDeleteDesc: 'Tự động xóa dữ liệu sau thời gian lưu trữ',
      days30: '30 ngày',
      days60: '60 ngày',
      days90: '90 ngày',
      days180: '180 ngày',
      days365: '365 ngày',
    },
    
    data: {
      export: 'Xuất dữ liệu',
      exportDesc: 'Tải xuống tất cả dữ liệu của bạn dưới định dạng JSON',
      import: 'Nhập dữ liệu',
      importDesc: 'Nhập dữ liệu từ các bản sao lưu trước đó',
      dangerZone: 'Vùng nguy hiểm',
      reset: 'Đặt lại cài đặt',
      resetDesc: 'Đặt lại tất cả cài đặt về giá trị mặc định',
      delete: 'Xóa tất cả dữ liệu',
      deleteDesc: 'Xóa vĩnh viễn tất cả dữ liệu của bạn',
      exportSuccess: 'Đã xuất dữ liệu thành công',
      importSuccess: 'Đã nhập dữ liệu thành công',
      resetConfirm: 'Bạn có chắc chắn muốn đặt lại tất cả cài đặt về mặc định? Hành động này không thể hoàn tác.',
      deleteConfirm: 'Bạn có chắc chắn muốn XÓA TẤT CẢ dữ liệu của bạn? Hành động này là VĨNH VIỄN và không thể hoàn tác.',
      deleteDoubleConfirm: 'Điều này sẽ xóa vĩnh viễn tất cả dữ liệu của bạn bao gồm CV, kết quả phân tích và cài đặt. Gõ DELETE để xác nhận.',
    },
    
    appearance: {
      language: 'Ngôn ngữ',
    },
  },

  // Pages - Dynamic content based on current page
  pages: {
    dashboard: {
      subscription: 'Bảng tổng quan',
      header: {
        title: 'TalentFit',
        subtitle: 'AI',
        description: 'Nền tảng phân tích CV bằng AI'
      }
    },
    cvAnalysis: {
      subscription: 'Phân tích CV',
      header: {
        title: 'Phân tích',
        subtitle: 'CV',
        description: 'Tải lên và phân tích CV với thông tin chi tiết từ AI'
      }
    },
    candidates: {
      subscription: 'Quản lý ứng viên',
      header: {
        title: 'Quản lý',
        subtitle: 'ứng viên',
        description: 'Quản lý và theo dõi hồ sơ ứng viên và đơn ứng tuyển'
      }
    },
    savedJobs: {
      subscription: 'Việc làm đã lưu',
      header: {
        title: 'Việc làm',
        subtitle: 'đã lưu',
        description: 'Xem lại và quản lý những cơ hội bạn đã đánh dấu.'
      }
    },
    jobPostings: {
      subscription: 'Quản lý công việc',
      header: {
        title: 'Đăng tin',
        subtitle: 'tuyển dụng',
        description: 'Quản lý hồ sơ công việc và yêu cầu cho phân tích CV'
      }
    },
    analytics: {
      subscription: 'Bảng phân tích',
      header: {
        title: 'Phân tích',
        subtitle: 'dữ liệu',
        description: 'Phân tích toàn diện và thông tin hiệu suất chi tiết'
      }
    },
    settings: {
      subscription: 'Cài đặt hệ thống',
      header: {
        title: 'Cài đặt',
        subtitle: 'hệ thống',
        description: 'Cấu hình tùy chọn hệ thống và cài đặt tài khoản'
      }
    }
  },

  // Dashboard
  dashboard: {
    sidebar: {
      navigation: {
        dashboard: 'Bảng điều khiển',
        cvAnalysis: 'Phân tích CV',
        candidates: 'Ứng viên',
        savedJobs: 'Việc làm đã lưu',
        jobPostings: 'Đăng tuyển',
        analytics: 'Phân tích',
        settings: 'Cài đặt'
      },
      subscription: 'Tổng quan Dashboard',
      collapse: 'Thu gọn thanh bên',
      expand: 'Mở rộng thanh bên',
      hoverHint: 'Di chuột vào đây để hiện thanh bên'
    },
    header: {
      title: 'TalentFit',
      subtitle: 'AI',
      description: 'Nền tảng phân tích CV bằng AI',
      search: {
        placeholder: 'Tìm kiếm...',
        fullPlaceholder: 'Tìm kiếm CV, ứng viên...'
      },
      user: {
        name: 'Nguyễn Văn A',
        role: 'Quản trị viên'
      },
      actions: {
        logout: 'Đăng xuất'
      }
    },
    metrics: {
      totalResumes: {
        title: 'Tổng CV',
        description: 'Tổng số CV được xử lý bởi hệ thống AI trong tháng này'
      },
      activeCandidates: {
        title: 'Ứng viên hoạt động', 
        description: 'Ứng viên có trình độ đang tìm kiếm cơ hội việc làm'
      },
      accuracy: {
        title: 'Độ chính xác',
        description: 'Độ chính xác khớp việc làm bằng AI trên tất cả vị trí'
      },
      processingSpeed: {
        title: 'Tốc độ xử lý',
        description: 'Thời gian trung bình để phân tích và chấm điểm mỗi CV'
      }
    },
    processingQueue: {
      title: 'Hàng đợi xử lý',
      subtitle: 'mục trong hàng đợi',
      viewAll: 'Xem tất cả hàng đợi',
      total: 'tổng',
      states: {
        pending: 'Chờ xử lý',
        processing: 'Đang xử lý',
        completed: 'Hoàn thành',
        error: 'Lỗi'
      },
      progress: 'hoàn thành'
    },
    recentResumes: {
      title: 'CV gần đây',
      subtitle: 'Tài liệu được xử lý gần đây nhất',
      viewAll: 'Xem tất cả CV',
      total: 'tổng',
      score: 'Điểm',
      match: 'Khớp'
    },
    monthlyApplications: {
      title: 'Ứng tuyển hàng tháng',
      subtitle: 'Xu hướng ứng tuyển theo thời gian',
      growth: 'tháng này',
      trend: 'Xu hướng tăng trưởng 6 tháng'
    },
    skillsChart: {
      title: 'Kỹ năng hàng đầu',
      subtitle: 'Kỹ năng kỹ thuật phổ biến nhất',
      skills: 'Kỹ năng',
      description: 'Kỹ năng phổ biến nhất trong số CV đã phân tích'
    },
    scoreDistribution: {
      title: 'Phân bố điểm số',
      subtitle: 'tổng CV',
      averageScore: 'Điểm trung bình',
      highScores: 'Điểm cao (81+)',
      totalAnalyzed: 'Tổng đã phân tích',
      legend: {
        resumes: 'CV',
        resume: 'CV'
      },
      ranges: {
        poor: 'Kém (0-40)',
        fair: 'Khá (41-60)',
        good: 'Tốt (61-80)',
        excellent: 'Xuất sắc (81-100)'
      }
    }
  },

  footer: {
    company: {
      description: 'Nền tảng phân tích CV thông minh hàng đầu, giúp kết nối nhà tuyển dụng với ứng viên phù hợp thông qua công nghệ AI tiên tiến.',
      tagline: 'Nền tảng Phân tích CV bằng AI'
    },
    newsletter: {
      title: 'Bản tin',
      subtitle: 'Nhận thông tin mới nhất về AI và xu hướng tuyển dụng',
      placeholder: 'Nhập email của bạn',
      agreement: 'Bằng việc đăng ký, bạn đồng ý với chính sách bảo mật của chúng tôi.'
    },
    links: {
      product: {
        title: 'Sản phẩm',
        items: {
          cvAnalysis: 'Phân tích CV',
          jobMatching: 'Ghép đôi công việc',
          careerInsights: 'Thông tin nghề nghiệp',
          skillAssessment: 'Đánh giá kỹ năng'
        }
      },
      company: {
        title: 'Công ty',
        items: {
          about: 'Về chúng tôi',
          team: 'Đội ngũ',
          news: 'Tin tức',
          careers: 'Tuyển dụng',
          partners: 'Đối tác'
        }
      },
      support: {
        title: 'Hỗ trợ',
        items: {
          helpCenter: 'Trung tâm trợ giúp',
          userGuide: 'Hướng dẫn sử dụng',
          apiDocs: 'Tài liệu API',
          contactSupport: 'Liên hệ hỗ trợ',
          bugReport: 'Báo cáo lỗi'
        }
      },
      legal: {
        title: 'Pháp lý',
        items: {
          privacy: 'Chính sách bảo mật',
          terms: 'Điều khoản dịch vụ',
          cookies: 'Chính sách Cookie',
          gdpr: 'Tuân thủ GDPR'
        }
      }
    },
    social: {
      followUs: 'Theo dõi chúng tôi'
    },
    bottom: {
      copyright: 'Tất cả quyền được bảo lưu.',
      madeWith: 'Được tạo với',
      vietnam: 'tại Việt Nam'
    }
  },

  common: {
    loading: 'Đang tải...',
    error: 'Lỗi',
    success: 'Thành công',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    save: 'Lưu',
    edit: 'Chỉnh sửa',
    delete: 'Xóa',
    back: 'Quay lại',
    next: 'Tiếp theo',
    previous: 'Trước',
    close: 'Đóng',
    open: 'Mở',
    viewMore: 'Xem thêm',
    viewLess: 'Xem ít hơn'
  },

  jobPostings: {
    title: 'Tin Tuyển Dụng',
    subtitle: 'Quản lý hồ sơ công việc và yêu cầu cho phân tích CV.',
    searchPlaceholder: 'Tìm kiếm hồ sơ công việc...',
    createJobProfile: 'Tạo Hồ Sơ Công Việc',
    editJobProfile: 'Chỉnh Sửa Hồ Sơ Công Việc',
    jobProfile: 'Hồ Sơ Công Việc',
    jobTitle: 'Tên Công Việc',
    jobTitlePlaceholder: 'VD: Full Stack Developer',
    description: 'Mô Tả',
    descriptionPlaceholder: 'Mô tả chi tiết về vị trí công việc...',
    experienceLevel: 'Mức Kinh Nghiệm',
    experience: 'Kinh nghiệm',
    years: 'năm',
    requiredSkills: 'Kỹ Năng Bắt Buộc',
    preferredSkills: 'Kỹ Năng Ưu Tiên',
    addSkillPlaceholder: 'Thêm kỹ năng...',
    add: 'Thêm',
    noSkillsAdded: 'Chưa có kỹ năng nào được thêm',
    activeMatches: 'Kết Quả Khớp',
    viewMatches: 'Xem Kết Quả',
    edit: 'Chỉnh sửa',
    delete: 'Xóa',
    cancel: 'Hủy',
    saving: 'Đang lưu...',
    saveChanges: 'Lưu Thay Đổi',
    createProfile: 'Tạo Hồ Sơ',
    more: 'thêm',
    noJobsTitle: 'Chưa Có Tin Tuyển Dụng',
    noJobsSubtitle: 'Bắt đầu bằng cách tạo hồ sơ công việc đầu tiên của bạn',
    createFirstJob: 'Tạo Tin Tuyển Dụng Đầu Tiên',
    noResultsTitle: 'Không Tìm Thấy Kết Quả',
    noResultsSubtitle: 'Thử tìm kiếm với từ khóa khác',
    loadError: 'Không thể tải tin tuyển dụng',
    createSuccess: 'Tạo hồ sơ công việc thành công',
    updateSuccess: 'Cập nhật hồ sơ công việc thành công',
    deleteSuccess: 'Xóa hồ sơ công việc thành công',
    saveError: 'Không thể lưu hồ sơ công việc',
    deleteError: 'Không thể xóa hồ sơ công việc',
    deleteConfirm: 'Bạn có chắc chắn muốn xóa hồ sơ công việc này?',
    viewMatchesInfo: 'Tính năng xem kết quả khớp sẽ sớm có',
  },

  candidateMatches: {
    title: 'Ứng Viên Phù Hợp',
    backToJobs: 'Quay lại Tin Tuyển Dụng',
    totalMatches: 'Tổng số khớp',
    requiredSkills: 'Kỹ năng bắt buộc',
    filters: 'Bộ lọc',
    clearFilters: 'Xóa bộ lọc',
    filterMatchScore: 'Điểm khớp',
    filterExperience: 'Kinh nghiệm',
    years: 'năm',

    sort: {
      matchScore: 'Điểm khớp cao nhất',
      experience: 'Kinh nghiệm nhiều nhất',
      appliedDate: 'Ngày ứng tuyển gần nhất',
      name: 'Tên A-Z',
    },

    overallMatch: 'Tổng thể',
    skillsMatch: 'Kỹ năng',
    experience: 'Kinh nghiệm',
    yearsExperience: 'năm kinh nghiệm',
    matchedSkills: 'Kỹ năng khớp',
    missingSkills: 'Kỹ năng thiếu',
    more: 'nữa',
    appliedOn: 'Ứng tuyển ngày',
    downloadResume: 'Tải CV',
    save: 'Lưu ứng viên',
    unsave: 'Bỏ lưu',
    saved: 'Đã lưu',

    noCandidates: 'Không có ứng viên',
    noMatches: 'Chưa có ứng viên nào phù hợp với tin tuyển dụng này',
    noResultsFilters: 'Không tìm thấy ứng viên với bộ lọc hiện tại',

    success: {
      saveToggled: 'Cập nhật trạng thái lưu thành công',
      resumeDownloaded: 'Tải CV thành công',
    },

    errors: {
      loadFailed: 'Không thể tải danh sách ứng viên',
      saveFailed: 'Không thể cập nhật trạng thái lưu',
      downloadFailed: 'Không thể tải CV',
      jobNotFound: 'Không tìm thấy tin tuyển dụng',
    },
  },

  savedCandidates: {
    title: 'Ứng Viên Đã Lưu',
    subtitle: 'Quản lý các ứng viên đã được đánh dấu sao',
    searchPlaceholder: 'Tìm kiếm ứng viên...',
    filters: 'Bộ lọc',
    clearFilters: 'Xóa bộ lọc',
    filterMatchScore: 'Điểm khớp',
    filterExperience: 'Kinh nghiệm',
    filterSkillMatches: 'Số kỹ năng khớp',
    filterLocation: 'Địa điểm',
    filterSkills: 'Kỹ năng',
    years: 'năm',

    sort: {
      matchScore: 'Điểm khớp cao nhất',
      experience: 'Kinh nghiệm nhiều nhất',
      appliedDate: 'Ngày ứng tuyển gần nhất',
      name: 'Tên A-Z',
    },

    noCandidates: 'Không có ứng viên',
    noSavedYet: 'Bạn chưa lưu ứng viên nào',
    noResultsFilters: 'Không tìm thấy ứng viên với bộ lọc hiện tại',

    success: {
      saveToggled: 'Cập nhật trạng thái lưu thành công',
      resumeDownloaded: 'Tải CV thành công',
    },

    errors: {
      loadFailed: 'Không thể tải danh sách ứng viên',
      saveFailed: 'Không thể cập nhật trạng thái lưu',
      downloadFailed: 'Không thể tải CV',
    },
  },

  savedJobs: {
    title: 'Việc Làm Đã Lưu',
    subtitle: 'Theo dõi các vị trí yêu thích và quay lại bất cứ lúc nào.',
    searchPlaceholder: 'Tìm kiếm việc làm đã lưu...',
    filters: 'Bộ lọc',
    clearFilters: 'Xóa bộ lọc',
    filterMatchScore: 'Điểm phù hợp',
    filterSalary: 'Khoảng lương',
    filterJobType: 'Loại công việc',
    filterLocation: 'Địa điểm',
    filterRemoteOnly: 'Chỉ hiển thị công việc remote',
    salaryAny: 'Bất kỳ',
    savedAt: 'Đã lưu',
    resultsCount: 'Hiển thị {count}/{total} việc làm đã lưu',
    noSavedYet: 'Bạn chưa lưu việc làm nào',
    noSavedDescription: 'Hãy đánh dấu các cơ hội phù hợp để quản lý tại đây.',
    noResultsFilters: 'Không có việc làm nào phù hợp với bộ lọc hiện tại',

    sort: {
      matchScore: 'Điểm phù hợp cao nhất',
      recent: 'Lưu gần đây nhất',
      salaryHigh: 'Lương cao nhất',
      salaryLow: 'Lương thấp nhất',
      company: 'Công ty A-Z',
    },

    actions: {
      refresh: 'Làm mới danh sách',
      applyTitle: 'Ứng tuyển',
      applyMessage: 'Chúng tôi sẽ chuyển bạn đến trang ứng tuyển.',
      shareMessage: 'Tham khảo vị trí {jobTitle} tại {companyName} nhé!'
    },

    success: {
      removed: 'Đã xóa việc làm khỏi danh sách lưu',
      refreshed: 'Đã làm mới danh sách việc làm đã lưu',
      shareTitle: 'Đã sao chép liên kết',
      shareCopied: 'Đường dẫn công việc đã được sao chép vào clipboard',
    },

    errors: {
      loadFailed: 'Không thể tải danh sách việc làm đã lưu',
      removeFailed: 'Không thể cập nhật danh sách đã lưu',
      shareFailed: 'Không thể chia sẻ việc làm này',
    },
  }
};
