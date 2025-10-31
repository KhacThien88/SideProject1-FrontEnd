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
    platformSupport: {
      title: 'Hỗ Trợ Đa Nền Tảng',
      description: 'Truy cập nền tảng của chúng tôi từ bất kỳ thiết bị nào, bất kỳ lúc nào, bất kỳ đâu.',
    },
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
    title: 'Số Liệu Ấn Tượng',
    description: 'Con số nói lên sự thành công và niềm tin từ hàng nghìn người dùng trên toàn quốc',
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
    headline: 'Sẵn Sàng Chuyển Đổi Sự Nghiệp?',
    primaryCTA: 'Bắt Đầu Miễn Phí',
    secondaryCTA: 'Đặt Lịch Demo',
    trustMessage: 'Được tin tưởng bởi hơn 10,000+ chuyên gia tuyển dụng và ứng viên',
    buttons: {
      getStarted: 'Bắt đầu miễn phí',
      learnMore: 'Tìm hiểu thêm',
    },
  },
  
  featuresShowcase: {
    title: 'Tính năng nổi bật',
    subtitle: 'Khám phá những tính năng mạnh mẽ giúp bạn tối ưu hóa quy trình tuyển dụng',
    tabs: {
      candidates: 'Cho Ứng Viên',
      recruiters: 'Cho Nhà Tuyển Dụng',
      admins: 'Cho Quản Trị Viên',
    },
    candidates: {
      upload: {
        title: 'Tải Lên CV',
        description: 'Tải lên CV của bạn (PDF/Word) để phân tích tự động bằng AI. Hỗ trợ đa ngôn ngữ và tự động nhận diện định dạng.',
      },
      analysis: {
        title: 'Phân Tích AI',
        description: 'AI trích xuất thông tin chính xác từ CV: kỹ năng, kinh nghiệm, học vấn. Phân tích sâu và đánh giá chất lượng CV.',
      },
      matching: {
        title: 'Khớp Việc Làm',
        description: 'Tìm công việc phù hợp nhất dựa trên phân tích CV. Thuật toán AI đề xuất các cơ hội việc làm phù hợp với bạn nhất.',
      },
    },
    recruiters: {
      posting: {
        title: 'Đăng Tin Tuyển Dụng',
        description: 'Tạo và quản lý tin tuyển dụng dễ dàng. Tự động phân phối đến các kênh tuyển dụng phổ biến.',
      },
      search: {
        title: 'Tìm Ứng Viên',
        description: 'Tìm kiếm và lọc ứng viên phù hợp từ cơ sở dữ liệu CV. Sử dụng AI để tìm những ứng viên tiềm năng nhất.',
      },
      management: {
        title: 'Quản Lý Quy Trình',
        description: 'Theo dõi và quản lý toàn bộ quy trình tuyển dụng. Quản lý đơn ứng tuyển, lịch phỏng vấn và quyết định tuyển dụng.',
      },
    },
    admins: {
      users: {
        title: 'Quản Lý Người Dùng',
        description: 'Quản lý tài khoản người dùng, phân quyền và theo dõi hoạt động. Kiểm soát truy cập và bảo mật hệ thống.',
      },
      monitoring: {
        title: 'Giám Sát Hệ Thống',
        description: 'Theo dõi hiệu suất hệ thống, logs và cảnh báo. Đảm bảo hệ thống hoạt động ổn định và an toàn.',
      },
      analytics: {
        title: 'Phân Tích & Báo Cáo',
        description: 'Xem báo cáo chi tiết về hoạt động của hệ thống. Phân tích xu hướng và đưa ra quyết định dựa trên dữ liệu.',
      },
    },
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
      toast: {
        emailRequired: 'Vui lòng nhập email',
        emailMissingAt: 'thiếu ký tự "@"',
        emailStartsWithAt: 'Email không thể bắt đầu bằng "@"',
        emailMissingDomain: 'thiếu tên miền sau "@"',
        emailMissingTLD: 'Email thiếu tên miền (ví dụ: .com, .vn)',
        emailInvalid: 'Định dạng email không hợp lệ',
        passwordRequired: 'Vui lòng nhập mật khẩu',
        loginSuccess: 'Đăng nhập thành công!',
        loginError: 'Đăng nhập thất bại',
        loginFailed: 'Đăng nhập thất bại. Vui lòng thử lại.',
        invalidCredentials: 'Email hoặc mật khẩu không đúng',
        networkError: 'Lỗi kết nối mạng. Vui lòng thử lại.',
        googleNotLoaded: 'Dịch vụ Google Identity chưa được tải',
        googleContainerNotFound: 'Không tìm thấy container cho nút Google'
      },
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
    forgotPassword: {
      title: 'Quên mật khẩu',
      subtitle: 'Nhập địa chỉ email của bạn. Chúng tôi sẽ gửi một liên kết đặt lại mật khẩu vào hộp thư của bạn.',
      sendResetLink: 'Gửi liên kết đặt lại',
      sending: 'Đang gửi...',
      successTitle: 'Email đã được gửi!',
      successMessage: 'Vui lòng kiểm tra hộp thư email của bạn.',
      checkEmailMessage: 'Chúng tôi đã gửi một email kèm liên kết đặt lại mật khẩu. Vui lòng kiểm tra cả thư mục spam.',
      emailSentTo: 'Email đã gửi đến',
      backToLogin: 'Quay lại đăng nhập',
      errorMessage: 'Không thể gửi email đặt lại mật khẩu',
      toast: {
        success: 'Email đặt lại mật khẩu đã được gửi',
        failed: 'Có lỗi xảy ra khi gửi email đặt lại mật khẩu. Vui lòng thử lại.',
        emailNotFound: 'Email này chưa được đăng ký. Vui lòng kiểm tra lại hoặc đăng ký tài khoản mới.',
        networkError: 'Kết nối mạng không ổn định. Vui lòng thử lại.',
        emailInvalid: 'Định dạng email không hợp lệ. Vui lòng kiểm tra lại.'
      }
    },
    resetPassword: {
      title: 'Đặt lại mật khẩu',
      subtitle: 'Nhập mật khẩu mới cho tài khoản của bạn.',
      token: 'Token',
      tokenPlaceholder: 'Dán token từ email',
      newPassword: 'Mật khẩu mới',
      newPasswordPlaceholder: 'Ít nhất 8 ký tự',
      confirmPassword: 'Xác nhận mật khẩu',
      confirmPasswordPlaceholder: 'Nhập lại mật khẩu',
      passwordValid: 'Mật khẩu hợp lệ',
      submit: 'Đặt lại mật khẩu',
      submitting: 'Đang xử lý...',
      backToLogin: 'Quay lại đăng nhập',
      toast: {
        invalidToken: 'Token không hợp lệ',
        passwordMinLength: 'Mật khẩu phải có ít nhất 8 ký tự',
        passwordUppercase: 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa',
        passwordLowercase: 'Mật khẩu phải chứa ít nhất một chữ cái viết thường',
        passwordNumbers: 'Mật khẩu phải chứa ít nhất một số',
        passwordSpecialChar: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt (!@#$%^&*...)',
        confirmPasswordMismatch: 'Mật khẩu xác nhận không khớp',
        success: 'Đặt lại mật khẩu thành công',
        failed: 'Đặt lại mật khẩu thất bại',
        invalidOrExpiredToken: 'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu liên kết mới.',
        passwordTooWeak: 'Mật khẩu phải có ít nhất 8 ký tự. Vui lòng chọn mật khẩu mạnh hơn.',
        networkError: 'Kết nối mạng không ổn định. Vui lòng thử lại.',
        generalError: 'Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.'
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
      passwordPlaceholder: 'Nhập mật khẩu (ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt)',
      confirmPassword: 'Xác nhận mật khẩu',
      confirmPasswordPlaceholder: 'Nhập lại mật khẩu',
      acceptTerms: 'Tôi đồng ý với',
      and: 'và',
      termsOfService: 'Điều khoản sử dụng',
      privacyPolicy: 'Chính sách bảo mật',
      registerButton: 'Đăng ký',
      registering: 'Đang đăng ký...',
      hasAccount: 'Đã có tài khoản?',
      loginLink: 'Đăng nhập ngay',
      toast: {
        // Validation messages
        fullNameRequired: 'Vui lòng nhập họ và tên',
        fullNameMinLength: 'Vui lòng nhập họ tên (ít nhất 2 ký tự)',
        emailRequired: 'Vui lòng nhập email',
        emailMissingAt: 'thiếu ký tự "@"',
        emailStartsWithAt: 'Email không thể bắt đầu bằng "@"',
        emailMissingDomain: 'thiếu tên miền sau "@"',
        emailMissingTLD: 'Email thiếu tên miền (ví dụ: .com, .vn)',
        emailInvalid: 'Định dạng email không hợp lệ',
        passwordRequired: 'Vui lòng nhập mật khẩu',
        passwordMinLength: 'Mật khẩu phải có ít nhất 8 ký tự',
        passwordUppercase: 'Mật khẩu phải có ít nhất 1 chữ hoa',
        passwordLowercase: 'Mật khẩu phải có ít nhất 1 chữ thường',
        passwordNumbers: 'Mật khẩu phải có ít nhất 1 chữ số',
        passwordSpecialChar: 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt (!@#$%^&*)',
        confirmPasswordRequired: 'Vui lòng xác nhận mật khẩu',
        confirmPasswordMismatch: 'Mật khẩu xác nhận không khớp',
        phoneInvalid: 'Số điện thoại không hợp lệ',
        termsRequired: 'Vui lòng đồng ý với điều khoản sử dụng',
        
        // Success messages
        registerSuccess: 'Đăng ký thành công!',
        registerSuccessSubtitle: 'Chào mừng bạn đến với TalentFit AI',
        
        // Error messages
        registerFailed: 'Đăng ký thất bại',
        emailExists: 'Email đã được sử dụng',
        emailExistsSubtitle: 'Vui lòng chọn email khác',
        networkError: 'Lỗi kết nối mạng',
        networkErrorSubtitle: 'Vui lòng thử lại sau',
        generalError: 'Đăng ký thất bại',
        generalErrorSubtitle: 'Vui lòng thử lại sau'
      }
    },
    verifyOTP: {
      title: 'Xác thực email',
      subtitle: 'Nhập mã 6 chữ số chúng tôi đã gửi đến',
      emailLabel: 'Email',
      codeLabel: 'Mã xác thực',
      codePlaceholder: 'Nhập mã 6 chữ số',
      timerLabel: 'Mã hết hạn sau',
      verifyButton: 'Xác thực',
      verifyingButton: 'Đang xác thực...',
      resendButton: 'Gửi lại',
      resendCountdown: 'Gửi lại sau {seconds}s',
      resendAvailable: 'Gửi lại ({count} lần còn lại)',
      errorMessage: 'Mã không hợp lệ. Vui lòng thử lại.',
      successMessage: 'Xác thực thành công',
      successSubtitle: 'Đang chuyển hướng đến trang đăng nhập...',
      toast: {
        verificationSuccess: 'Xác thực thành công!',
        verificationSuccessSubtitle: 'Email của bạn đã được xác thực',
        verificationFailed: 'Xác thực thất bại',
        verificationFailedSubtitle: 'Vui lòng kiểm tra lại mã và thử lại',
        resendSuccess: 'Mã mới đã được gửi',
        resendSuccessSubtitle: 'Vui lòng kiểm tra email của bạn',
        resendFailed: 'Gửi lại mã thất bại',
        resendFailedSubtitle: 'Vui lòng thử lại sau',
        invalidCode: 'Mã xác thực không đúng',
        codeExpired: 'Mã đã hết hạn',
        tooManyAttempts: 'Quá nhiều lần thử sai',
        networkError: 'Lỗi kết nối mạng',
        networkErrorSubtitle: 'Vui lòng thử lại sau'
      }
    },
    googleSigningIn: 'Đang đăng nhập...',
    continueWithGoogle: 'Đăng nhập với Google',
    googleSignInSuccess: 'Đăng nhập Google thành công!',
    logoutSuccess: 'Đăng xuất thành công',
    roleSelection: {
      title: 'Chọn vai trò của bạn',
      subtitle: 'Chọn cách bạn muốn sử dụng TalentFit AI',
      pleaseSelectRole: 'Vui lòng chọn vai trò để tiếp tục',
      registrationSuccess: 'Đăng ký hoàn tất thành công!',
      registrationFailed: 'Đăng ký thất bại. Vui lòng thử lại.',
      completing: 'Đang hoàn tất đăng ký...',
      continueButton: 'Tiếp tục',
      backToLogin: 'Quay lại đăng nhập',
      helpText: 'Bạn có thể thay đổi vai trò sau trong cài đặt tài khoản',
      candidate: {
        title: 'Người tìm việc',
        description: 'Tìm kiếm cơ hội nghề nghiệp tiếp theo',
        features: {
          uploadCV: 'Tải lên và phân tích CV của bạn',
          jobMatching: 'Nhận gợi ý việc làm cá nhân hóa',
          applyJobs: 'Ứng tuyển việc làm chỉ với một cú click'
        }
      },
      recruiter: {
        title: 'Nhà tuyển dụng',
        description: 'Tuyển dụng nhân tài cho tổ chức của bạn',
        features: {
          postJobs: 'Đăng tin tuyển dụng',
          searchCandidates: 'Tìm kiếm và lọc ứng viên',
          manageApplications: 'Quản lý đơn ứng tuyển và phỏng vấn'
        }
      }
    }
  },

  // Job Matching & CV Analysis
  jobs: {
    details: {
      title: 'Chi Tiết Công Việc',
      jobNotFound: 'Không Tìm Thấy Công Việc',
      jobNotFoundDescription: 'Công việc bạn đang tìm không tồn tại hoặc đã bị xóa.',
      loadingJobDetails: 'Đang tải chi tiết công việc...',
      matchAnalysis: 'Phân Tích Phù Hợp',
      similarJobs: 'Công Việc Tương Tự',
      companyInfo: 'Thông Tin Công Ty',
      backToResults: 'Quay Lại Kết Quả',
      quickActions: 'Hành Động Nhanh',
      applyNow: 'Ứng Tuyển Ngay',
      saveForLater: 'Lưu để sau',
      downloadJD: 'Tải JD',
      shareJob: 'Chia Sẻ Công Việc',
      applicationTips: 'Mẹo Ứng Tuyển',
      highlightMatchingSkills: 'Nhấn mạnh kỹ năng phù hợp',
      emphasizeExperience: 'Nhấn mạnh kinh nghiệm của bạn về',
      addressSkillGaps: 'Giải quyết khoảng trống kỹ năng',
      considerLearningPlans: 'Cân nhắc đề cập đến kế hoạch học tập của bạn cho',
      standOut: 'Nổi bật',
      customizeApplication: 'Tùy chỉnh đơn ứng tuyển cho',
      match: 'phù hợp',
      saved: 'Đã Lưu',
      saveJob: 'Lưu Công Việc',
      share: 'Chia Sẻ',
      contact: 'Liên Hệ',
      overview: 'Tổng Quan',
      requirements: 'Yêu Cầu',
      company: 'Công Ty',
      jobDescription: 'Mô Tả Công Việc',
      benefitsPerks: 'Quyền Lợi & Phúc Lợi',
      essentialRequirements: 'Yêu Cầu Bắt Buộc',
      preferredQualifications: 'Yêu Cầu Ưu Tiên',
      requiredSkills: 'Kỹ Năng Yêu Cầu',
      about: 'Về',
      industry: 'Ngành Nghề',
      companySize: 'Quy Mô Công Ty',
      location: 'Địa Điểm',
      view: 'Xem',
      salary: 'Mức Lương',
      experience: 'Kinh Nghiệm',
      deadline: 'Hạn Chót',
      postedAgo: 'Đã đăng',
      views: 'lượt xem',
      applicants: 'ứng viên',
      remote: 'Từ Xa',
      hybrid: 'Kết Hợp',
      skillsMatched: 'trong tổng số {total} kỹ năng khớp',
      aiAnalysis: 'Phân Tích AI',
      tabs: {
        overview: 'Tổng Quan',
        requirements: 'Yêu Cầu',
        company: 'Công Ty',
        similar: 'Tương Tự'
      }
    },
    matching: {
      title: 'Tìm Việc Phù Hợp',
      noJobsFound: 'Không Tìm Thấy Công Việc',
      noJobsFoundDescription: 'Chúng tôi không tìm thấy công việc nào phù hợp với tiêu chí của bạn. Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.',
      resultsCount: 'kết quả tìm thấy',
      filterJobs: 'Lọc Công Việc',
      jobRemoved: 'Đã xóa công việc',
      removedFromSaved: 'đã xóa khỏi danh sách đã lưu',
      jobSaved: 'Đã lưu công việc',
      addedToSaved: 'đã thêm vào danh sách đã lưu',
      application: 'Ứng Tuyển',
      openingApplicationForm: 'Đang mở biểu mẫu ứng tuyển...',
      linkCopied: 'Đã sao chép liên kết',
      jobLinkCopied: 'Đã sao chép liên kết công việc',
      checkOutJobAt: 'Xem cơ hội việc làm này',
      jobSearchResults: 'Kết Quả Tìm Việc',
      foundJobs: 'Tìm thấy',
      matchingYourProfile: 'phù hợp với hồ sơ của bạn',
      filters: 'Bộ Lọc',
      filter: 'bộ lọc',
      applied: 'đã áp dụng',
      relevance: 'Liên Quan',
      matchScore: 'Điểm Khớp',
      datePosted: 'Ngày Đăng',
      showing: 'Hiển thị',
      to: 'đến',
      of: 'trong tổng số',
      results: 'kết quả'
    },
    utils: {
      year: '/năm',
      month: '/tháng',
      hour: '/giờ',
      from: 'Từ',
      upTo: 'Lên đến',
      salaryNotSpecified: 'Chưa ghi rõ mức lương',
      justNow: 'Vừa xong',
      hoursAgo: ' giờ trước',
      daysAgo: ' ngày trước',
      weeksAgo: ' tuần trước',
      monthsAgo: ' tháng trước',
      excellentMatch: 'Phù hợp xuất sắc',
      goodMatch: 'Phù hợp tốt',
      fairMatch: 'Phù hợp khá',
      poorMatch: 'Phù hợp kém'
    },
    card: {
      featured: 'Nổi Bật',
      urgent: 'Gấp',
      remote: 'Từ Xa',
      match: 'khớp',
      requiredSkills: 'Kỹ Năng Yêu Cầu:',
      more: 'nữa',
      of: 'trên',
      skillsMatched: 'kỹ năng phù hợp',
      applyNow: 'Ứng Tuyển Ngay',
      saved: 'Đã Lưu',
      save: 'Lưu',
      share: 'Chia Sẻ',
      company: 'công ty',
      away: 'km'
    },
    filters: {
      activeFilters: 'Bộ Lọc Đang Áp Dụng',
      clearAll: 'Xóa Tất Cả',
      location: 'Địa Điểm',
      jobType: 'Loại Công Việc',
      experienceLevel: 'Mức Kinh Nghiệm',
      salary: 'Mức Lương',
      skills: 'Kỹ Năng',
      remote: 'Từ Xa',
      filterRecommendations: 'Lọc Đề Xuất',
      searchKeywords: 'Tìm Kiếm Từ Khóa',
      jobTitleCompanySkills: 'Vị trí, công ty, kỹ năng...',
      search: 'Tìm Kiếm',
      anyLocation: 'Bất kỳ địa điểm',
      includeRemoteWork: 'Bao gồm làm việc từ xa',
      salaryRange: 'Khoảng Lương (USD/tháng)',
      minSalary: 'Lương tối thiểu',
      maxSalary: 'Lương tối đa',
      companySize: 'Quy Mô Công Ty',
      skillsFromCV: '(Từ CV của bạn)',
      skillsWithStar: 'Kỹ năng có dấu sao là từ phân tích CV của bạn'
    }
  },

  // CV Analysis
  cvAnalysis: {
    targetPosition: 'Vị Trí Mục Tiêu',
    targetPositionDescription: 'Chọn vị trí công việc để phân tích độ tương thích CV',
    noResumesUploaded: 'Chưa Tải Lên CV Nào',
    noResumesUploadedDescription: 'Tải lên CV đầu tiên của bạn để bắt đầu phân tích bằng AI.',
    uploadYourFirstResume: 'Tải lên CV đầu tiên',
    jobRecommendations: 'Công Việc Đề Xuất',
    recommendedJobs: 'Công Việc Đề Xuất',
    basedOnCVAnalysis: 'Dựa trên phân tích CV của bạn, đây là',
    jobsMatchProfile: 'công việc phù hợp với hồ sơ của bạn',
    filteredFrom: '(đã lọc từ',
    total: 'tổng số)',
    filters: 'Bộ Lọc',
    saveSearch: 'Lưu Tìm Kiếm',
    noJobsMatchFilters: 'Không có công việc nào phù hợp với bộ lọc hiện tại',
    tryAdjustingFilters: 'Hãy thử điều chỉnh bộ lọc để xem thêm kết quả',
    clearAllFilters: 'Xóa Tất Cả Bộ Lọc',
    viewAllMatchingJobs: 'Xem Tất Cả Công Việc Phù Hợp',
    exportReport: 'Xuất Báo Cáo',
    startingAnalysis: 'Đang bắt đầu phân tích cho',
    file: 'tệp',
    files: 'tệp',
    analysisCompleted: 'Phân tích hoàn tất!',
    allFilesCleared: 'Đã xóa tất cả tệp',
    noFilesReady: 'Không có tệp nào sẵn sàng để phân tích',
    jobDetails: 'Chi Tiết Công Việc',
    openingJobDetails: 'Đang mở chi tiết công việc...',
    application: 'Ứng Tuyển',
    redirectingToApplication: 'Đang chuyển đến trang ứng tuyển...',
    jobLinkCopied: 'Đã sao chép liên kết công việc',
    jobRemovedFromSaved: 'Đã xóa công việc khỏi danh sách đã lưu',
    jobSavedSuccessfully: 'Đã lưu công việc thành công',
    jobOpportunity: 'Cơ Hội Việc Làm',
    checkOutThisJob: 'Xem cơ hội việc làm này',
    jobSaved: 'Đã lưu công việc',
    savedToFavorites: 'đã được lưu vào yêu thích',
    linkCopied: 'Đã sao chép liên kết',
    checkOutJobAt: 'Xem công việc này tại',
    upload: {
      title: 'Tải Lên Tệp CV',
      dropHere: 'Thả tệp vào đây',
      dragAndDrop: 'Kéo và thả tệp CV của bạn vào đây, hoặc nhấp để chọn',
      supports: 'Hỗ trợ tệp PDF, DOC và DOCX',
      maxSize: 'Tối đa',
      upTo: 'mỗi tệp • Tối đa',
      chooseFiles: 'Chọn Tệp',
      uploadIssues: 'Vấn Đề Tải Lên',
      filesAdded: 'đã thêm thành công',
      fileRemoved: 'đã xóa'
    },
    fileManagement: {
      selectedFiles: 'Tệp Đã Chọn',
      clearAll: 'Xóa Tất Cả',
      analyzing: 'Đang phân tích...',
      analyzeFiles: 'Phân Tích Tệp',
      ready: 'Sẵn Sàng',
      error: 'Lỗi',
      processing: 'Đang Xử Lý',
      uploading: 'Đang Tải Lên'
    },
    progress: {
      analyzingFiles: 'Đang Phân Tích Tệp',
      uploading: 'Đang Tải Lên',
      extracting: 'Đang Trích Xuất',
      analyzing: 'Đang Phân Tích',
      completing: 'Đang Hoàn Thành',
      processing: 'Đang xử lý',
      estimatedTime: 'Thời gian ước tính còn lại'
    },
    results: {
      title: 'Kết Quả Phân Tích',
      exportResults: 'Xuất Kết Quả',
      analyzedOn: 'Phân tích vào',
      good: 'Tốt',
      fair: 'Khá',
      average: 'Trung Bình',
      needsImprovement: 'Cần Cải Thiện',
      previewCV: 'Xem Trước CV',
      downloadReport: 'Tải Báo Cáo',
      removeResult: 'Xóa Kết Quả',
      name: 'Tên',
      email: 'Email',
      phone: 'Điện Thoại',
      location: 'Địa Điểm',
      skillsMatch: 'Kỹ Năng Phù Hợp',
      experience: 'Kinh Nghiệm',
      education: 'Học Vấn',
      keywords: 'Từ Khóa',
      detectedSkills: 'Kỹ Năng Phát Hiện',
      matchPercentage: 'Tỷ Lệ Phù Hợp',
      matchWith: 'Phù hợp với',
      recommendations: 'Đề Xuất',
      overallScore: 'Điểm Tổng Thể',
      skillsDetected: 'Kỹ Năng Phát Hiện',
      experienceLevel: 'Cấp Độ Kinh Nghiệm',
      jobMatches: 'Công Việc Phù Hợp',
      candidate: 'Ứng Viên'
    }
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
      minLength: 'Ít nhất 8 ký tự',
      uppercase: 'Một chữ hoa',
      lowercase: 'Một chữ thường',
      number: 'Một chữ số',
      special: 'Một ký tự đặc biệt'
    }
  },

  validation: {
    emailRequired: 'Email là bắt buộc',
    emailInvalid: 'Email không đúng định dạng',
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
      subscription: 'Bảng điều khiển',
      header: {
        title: 'Bảng điều khiển',
        subtitle: 'Tổng quan',
        description: 'Quản lý các hoạt động tuyển dụng của bạn'
      }
    },
    cvAnalysis: {
      subscription: 'Phân tích CV',
      header: {
        title: 'Phân tích CV',
        subtitle: 'Hỗ trợ bởi AI',
        description: 'Phân tích hồ sơ với trí tuệ nhân tạo'
      }
    },
    candidates: {
      subscription: 'Ứng viên',
      header: {
        title: 'Ứng viên',
        subtitle: 'Quản lý',
        description: 'Quản lý hồ sơ và đơn ứng tuyển của ứng viên'
      }
    },
    savedJobs: {
      subscription: 'Công việc đã lưu',
      header: {
        title: 'Công việc đã lưu',
        subtitle: 'Bộ sưu tập',
        description: 'Xem và quản lý các cơ hội việc làm đã lưu'
      }
    },
    jobPostings: {
      subscription: 'Tin tuyển dụng',
      header: {
        title: 'Tin tuyển dụng',
        subtitle: 'Quản lý',
        description: 'Tạo và quản lý các tin tuyển dụng'
      }
    },
    users: {
      subscription: 'Người dùng',
      header: {
        title: 'Quản lý người dùng',
        subtitle: 'Quản trị',
        description: 'Quản lý tất cả người dùng và vai trò của họ'
      }
    },
    analytics: {
      subscription: 'Phân tích',
      header: {
        title: 'Phân tích',
        subtitle: 'Thống kê',
        description: 'Theo dõi hiệu suất và các chỉ số'
      }
    },
    settings: {
      subscription: 'Cài đặt',
      header: {
        title: 'Cài đặt',
        subtitle: 'Cấu hình',
        description: 'Quản lý tài khoản và các tùy chọn của bạn'
      }
    },
    jdAnalysis: {
      subscription: 'Phân tích JD',
      header: {
        title: 'JD Analysis',
        subtitle: '& CV Matching',
        description: 'Tải JD → AI phân tích → Tự động ghép CV'
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
        users: 'Người dùng',
        analytics: 'Phân tích',
        settings: 'Cài đặt'
      },
      subscription: 'Gói dịch vụ',
      collapse: 'Thu gọn',
      expand: 'Mở rộng',
      hoverHint: 'Di chuột để mở rộng'
    },
    header: {
      title: 'Bảng điều khiển',
      subtitle: 'Chào mừng trở lại',
      description: 'Đây là những gì đang diễn ra với hoạt động tuyển dụng của bạn',
      search: {
        placeholder: 'Tìm kiếm...',
        fullPlaceholder: 'Tìm ứng viên, công việc, hoặc bất cứ điều gì...'
      },
      user: {
        name: 'Người dùng',
        role: 'Vai trò'
      },
      actions: {
        logout: 'Đăng xuất'
      }
    },
    metrics: {
      totalResumes: {
        title: 'Tổng số CV',
        description: 'CV đã phân tích trong tháng này'
      },
      activeCandidates: {
        title: 'Ứng viên tích cực',
        description: 'Hiện đang trong quy trình'
      },
      accuracy: {
        title: 'Độ chính xác AI',
        description: 'Tỷ lệ chính xác của phân tích'
      },
      processingSpeed: {
        title: 'Tốc độ xử lý',
        description: 'Thời gian xử lý trung bình'
      },
      roles: {
        admin: {
          totalUsers: { title: 'Tổng người dùng', description: 'Tổng số người dùng đã đăng ký' },
          systemUptime: { title: 'Thời gian hoạt động', description: 'Độ khả dụng của hệ thống' },
          totalProcessedCV: { title: 'CV đã xử lý', description: 'Tổng CV đã được phân tích' },
          activeJobs: { title: 'Tin tuyển dụng', description: 'Số lượng tin tuyển dụng đang hoạt động' }
        },
        candidate: {
          applications: { title: 'Đơn ứng tuyển', description: 'Tổng số đơn đã nộp' },
          pendingResponses: { title: 'Đang chờ phản hồi', description: 'Đơn chờ phản hồi' },
          accepted: { title: 'Được chấp nhận', description: 'Đơn được chấp nhận' },
          matchedJobs: { title: 'Công việc phù hợp', description: 'Công việc phù hợp với hồ sơ' }
        },
        recruiter: {
          jobPosts: { title: 'Tin tuyển dụng', description: 'Tin tuyển dụng đang hoạt động' },
          newApplicants: { title: 'Ứng viên mới', description: 'Ứng viên mới trong tuần' },
          interviewed: { title: 'Đã phỏng vấn', description: 'Ứng viên đã phỏng vấn' },
          hired: { title: 'Đã tuyển', description: 'Ứng viên đã tuyển thành công' }
        }
      }
    },
    processingQueue: {
      title: 'Hàng đợi xử lý',
      subtitle: 'Trạng thái phân tích hiện tại',
      viewAll: 'Xem tất cả',
      total: 'Tổng số',
      states: {
        pending: 'Đang chờ',
        processing: 'Đang xử lý',
        completed: 'Hoàn thành',
        error: 'Lỗi'
      },
      progress: 'Tiến trình'
    },
    recentResumes: {
      title: 'CV gần đây',
      subtitle: 'Các CV được phân tích mới nhất',
      viewAll: 'Xem tất cả',
      total: 'Tổng số',
      score: 'Điểm',
      match: 'Phù hợp'
    },
    recentCandidates: {
      title: 'Ứng viên gần đây',
      subtitle: 'Ứng viên mới ứng tuyển',
      viewAll: 'Xem tất cả',
      total: 'Tổng số',
      match: 'Phù hợp'
      ,
      status: {
        new: 'Mới',
        reviewing: 'Đang xem xét',
        interviewed: 'Đã phỏng vấn',
        hired: 'Đã tuyển',
        rejected: 'Từ chối'
      },
      actions: {
        viewProfile: 'Xem hồ sơ',
        sendEmail: 'Gửi email',
        call: 'Gọi điện'
      }
    },
    monthlyApplications: {
      title: 'Lượt ứng tuyển hàng tháng',
      subtitle: 'Xu hướng ứng tuyển',
      growth: 'Tăng trưởng',
      trend: 'Xu hướng'
    },
    skillsChart: {
      title: 'Phân bổ kỹ năng',
      subtitle: 'Các kỹ năng phổ biến nhất',
      skills: 'Kỹ năng',
      description: 'Kỹ năng được tìm thấy trong CV'
    },
    scoreDistribution: {
      title: 'Phân bổ điểm',
      subtitle: 'Điểm chất lượng CV',
      averageScore: 'Điểm trung bình',
      highScores: 'Điểm cao',
      totalAnalyzed: 'Tổng số đã phân tích',
      legend: {
        resumes: 'hồ sơ',
        resume: 'hồ sơ'
      },
      ranges: {
        poor: 'Kém (0-40)',
        fair: 'Trung bình (41-60)',
        good: 'Tốt (61-80)',
        excellent: 'Xuất sắc (81-100)'
      }
    }
  },

  // Footer
  footer: {
    company: {
      description: 'Nền tảng tuyển dụng bằng AI cho việc tuyển dụng hiện đại',
      tagline: 'Tìm kiếm sự phù hợp hoàn hảo với AI'
    },
    newsletter: {
      title: 'Luôn cập nhật',
      subtitle: 'Nhận tin tức và cập nhật mới nhất',
      placeholder: 'Nhập email của bạn',
      agreement: 'Bằng cách đăng ký, bạn đồng ý với Chính sách bảo mật của chúng tôi'
    },
    links: {
      product: {
        title: 'Sản phẩm',
        items: {
          cvAnalysis: 'Phân tích CV',
          jobMatching: 'Kết nối việc làm',
          careerInsights: 'Thông tin sự nghiệp',
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
          bugReport: 'Báo lỗi'
        }
      },
      legal: {
        title: 'Pháp lý',
        items: {
          privacy: 'Chính sách bảo mật',
          terms: 'Điều khoản dịch vụ',
          cookies: 'Chính sách cookie',
          gdpr: 'Tuân thủ GDPR'
        }
      }
    },
    social: {
      followUs: 'Theo dõi chúng tôi'
    },
    bottom: {
      copyright: '© 2024 TalentFit AI. Mọi quyền được bảo lưu.',
      madeWith: 'Làm bằng ❤️ tại',
      vietnam: 'Việt Nam'
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
    viewLess: 'Xem ít hơn',
    backToResults: 'Quay Lại Kết Quả',
    apply: 'Ứng Tuyển',
    share: 'Chia Sẻ',
    export: 'Xuất',
    refresh: 'Làm Mới',
    clearAll: 'Xóa Tất Cả',
    clearAllFilters: 'Xóa Tất Cả Bộ Lọc',
    viewDetails: 'Xem Chi Tiết',
    loadMore: 'Tải Thêm',
    sortBy: 'Sắp xếp theo',
    filterBy: 'Lọc theo',
    viewMode: 'Chế Độ Xem',
    activeFilters: 'Bộ Lọc Đang Áp Dụng',
    noResults: 'Không Có Kết Quả',
    noDataAvailable: 'Không có dữ liệu',
    loadingData: 'Đang tải dữ liệu...',
    errorLoadingData: 'Lỗi khi tải dữ liệu',
    toast: {
      // General
      linkCopied: 'Đã sao chép liên kết',

      // Job
      jobSaved: 'Đã lưu công việc',
      jobSavedSubtitle: '{jobTitle} đã được thêm vào danh sách đã lưu',

      // CV
      filesAddedSuccess: 'Đã thêm thành công {count} tệp',
      noFilesReady: 'Không có tệp nào sẵn sàng để phân tích',
      analysisSuccess: 'Phân tích hoàn tất!',

      // Network & Generic Errors
      networkError: 'Lỗi kết nối mạng',
      networkErrorSubtitle: 'Vui lòng kiểm tra kết nối và thử lại',
      genericError: 'Đã có lỗi không mong muốn xảy ra',
      genericErrorSubtitle: 'Vui lòng thử lại sau',
    },
    loadingScreen: {
      loading: 'Đang tải...',
      redirecting: 'Đang chuyển hướng...',
      authenticating: 'Đang xác thực...',
    }
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
  },

  // Users Management
  users: {
    title: 'Quản lý người dùng',
    subtitle: 'Quản lý tất cả người dùng và vai trò của họ',
    addUser: 'Thêm người dùng',
    editUser: 'Chỉnh sửa người dùng',
    stats: {
      totalUsers: 'Tổng người dùng',
      candidates: 'Ứng viên',
      recruiters: 'Nhà tuyển dụng',
      admins: 'Quản trị viên'
    },
    search: {
      placeholder: 'Tìm kiếm theo tên hoặc email...'
    },
    filters: {
      allRoles: 'Tất cả vai trò',
      allStatus: 'Tất cả trạng thái',
      filterButton: 'Lọc'
    },
    table: {
      user: 'Người dùng',
      role: 'Vai trò',
      status: 'Trạng thái',
      joined: 'Tham gia',
      lastLogin: 'Đăng nhập cuối',
      actions: 'Hành động',
      never: 'Chưa bao giờ'
    },
    roles: {
      admin: 'Quản trị viên',
      recruiter: 'Nhà tuyển dụng (HR)',
      candidate: 'Ứng viên'
    },
    status: {
      active: 'Hoạt động',
      inactive: 'Không hoạt động',
      suspended: 'Tạm khóa'
    },
    empty: {
      title: 'Không tìm thấy người dùng',
      description: 'Thử điều chỉnh tìm kiếm hoặc bộ lọc'
    }
  },

  // Upload Progress Component
  uploadProgress: {
    status: {
      uploading: 'Đang tải lên',
      processing: 'Đang xử lý', 
      completed: 'Hoàn thành',
      failed: 'Thất bại',
      unknown: 'Không xác định'
    },
    details: {
      remaining: 'Còn lại',
      processing: 'Đang xử lý dữ liệu...',
      completed: 'Upload hoàn thành thành công',
      failed: 'Upload thất bại, vui lòng thử lại'
    },
    actions: {
      cancel: 'Hủy',
      retry: 'Thử lại'
    }
  },

  // JD File Management  
  jdFileManagement: {
    loading: 'Đang tải danh sách...',
    allStatuses: 'Tất cả trạng thái',
    actions: {
      createJobProfile: 'Tạo Job Profile',
      deleteFile: 'Xóa file',
      clearCompleted: 'Xóa hoàn thành',
      clearAll: 'Xóa tất cả'
    }
  },

  // Admin Layout
  adminAuth: {
    verifying: 'Đang xác thực quyền truy cập...'
  },

  // Status Values
  status: {
    uploaded: 'Đã tải lên',
    processing: 'Đang xử lý',
    processed: 'Đã xử lý',
    failed: 'Thất bại',
    completed: 'Hoàn thành',
    pending: 'Đang chờ'
  },

  // Social Proof
  socialProof: {
    activeUsers: 'Người dùng hoạt động',
    successRate: 'Tỷ lệ thành công',
    jobsMatched: 'Việc làm đã khớp',
  },

  trustBadges: {
    title: 'Nền tảng Tin cậy & Bảo mật',
    subtitle: 'Bảo mật dữ liệu của bạn là ưu tiên hàng đầu của chúng tôi',
    gdprCompliant: {
      title: 'Tuân thủ GDPR',
      description: 'Tuân thủ đầy đủ các quy định bảo vệ dữ liệu của EU',
    },
    ssl: {
      title: 'Mã hóa SSL',
      description: 'Mã hóa 256-bit chuẩn ngân hàng cho mọi dữ liệu',
    },
    certified: {
      title: 'Chứng nhận ISO',
      description: 'Chứng nhận ISO 27001 về bảo mật thông tin',
    },
    verified: {
      title: 'Nền tảng Xác minh',
      description: 'Được tin dùng bởi hơn 1000+ công ty trên toàn cầu',
    },
  },

  successStories: {
    title: 'Câu chuyện Thành công',
    subtitle: 'Xem cách nền tảng của chúng tôi đã giúp hàng ngàn người đạt được mục tiêu nghề nghiệp',
    story1: {
      text: 'TalentFit AI đã giúp tôi tìm được công việc mơ ước chỉ trong 2 tuần. Khớp AI cực kỳ chính xác và tiết kiệm vô số thời gian tìm việc.',
    },
    story2: {
      text: 'Là một nhà tuyển dụng, nền tảng này đã biến đổi quy trình tuyển dụng của chúng tôi. Chúng tôi giảm 50% thời gian tuyển dụng và tìm được ứng viên chất lượng hơn.',
    },
    story3: {
      text: 'Phân tích AI về CV của tôi đã cho tôi những hiểu biết mà tôi chưa bao giờ nghĩ đến. Nó giúp tôi làm nổi bật điểm mạnh và nhận được 3 lời mời phỏng vấn trong tuần đầu tiên.',
    },
  },

  caseStudies: {
    title: 'Kết quả Đã chứng minh',
    subtitle: 'Xem cách các công ty hàng đầu chuyển đổi quy trình tuyển dụng của họ',
  },

  reviews: {
    title: 'Người dùng Nói gì về Chúng tôi',
    subtitle: 'Được tin dùng bởi hàng ngàn chuyên gia',
  },

  // Engagement Features
  exitIntent: {
    title: 'Đợi đã! Trước khi bạn rời đi...',
    subtitle: 'Nhận giảm giá 30% cho tháng đầu tiên và bắt đầu tìm ứng viên hoàn hảo ngay hôm nay!',
    ctaButton: 'Nhận Ưu đãi',
    noThanks: 'Không, cảm ơn',
  },

  scrollEngagement: {
    title: 'Vẫn đang Khám phá?',
    message: 'Tham gia cùng hàng ngàn người đã tìm được công việc mơ ước!',
    ctaButton: 'Bắt đầu Miễn phí',
  },

  timeBased: {
    title: 'Ưu đãi Có hạn!',
    message: 'Giảm 50% cho 100 người đăng ký đầu tiên',
    ctaButton: 'Nhận Ngay',
  },

  chatWidget: {
    title: 'Hỗ trợ TalentFit',
    status: 'Trực tuyến',
    welcomeMessage: 'Xin chào! Tôi có thể giúp gì cho bạn?',
    placeholder: 'Nhập tin nhắn của bạn...',
    autoReply: 'Cảm ơn tin nhắn của bạn! Đội ngũ của chúng tôi sẽ phản hồi sớm nhất.',
    quickReplies: {
      pricing: 'Thông tin giá',
      features: 'Tính năng',
      demo: 'Yêu cầu demo',
    },
  },

  // CTA Optimization
  smartCTA: {
    control: 'Tải CV Ngay',
    variantA: 'Dùng Thử Miễn Phí',
    variantB: 'Bắt Đầu Ngay',
    noCredit: 'Không cần thẻ tín dụng',
  },

  multiPathCTA: {
    title: 'Chọn Con Đường Của Bạn',
    subtitle: 'Chọn lựa chọn phù hợp nhất với bạn',
    getStarted: 'Bắt Đầu',
    contactUs: 'Liên hệ chúng tôi',
    help: 'và chúng tôi sẽ giúp bạn lựa chọn.',
    footer: 'Chưa chắc chắn? ',
    jobSeeker: {
      title: 'Tôi Đang Tìm Việc',
      description: 'Tải CV lên và nhận gợi ý việc làm phù hợp',
      badge: 'Phổ Biến Nhất',
    },
    recruiter: {
      title: 'Tôi Đang Tuyển Dụng',
      description: 'Đăng tin tuyển dụng và tìm ứng viên hoàn hảo',
    },
    enterprise: {
      title: 'Giải Pháp Doanh Nghiệp',
      description: 'Giải pháp tùy chỉnh cho tổ chức lớn',
    },
  },

  urgency: {
    countdown: {
      label: 'Ưu đãi kết thúc sau',
    },
    socialProof: {
      label: 'người đã đăng ký hôm nay',
    },
    limitedSpots: {
      only: 'Chỉ còn',
      left: 'chỗ trống',
      subtitle: 'trong tháng này',
    },
    trending: {
      label: 'Xu Hướng',
      text: '#1 Phổ Biến Nhất',
    },
  },

  personalizedCTA: {
    newVisitor: 'Bắt đầu hành trình với khớp việc làm AI',
    returningVisitor: 'Chào mừng trở lại! Sẵn sàng bắt đầu chưa?',
    engagedUser: 'Bạn có vẻ quan tâm! Tham gia cùng hàng ngàn người dùng hài lòng.',
    deepScroll: 'Bạn đã xem những gì chúng tôi cung cấp. Hãy biến nó thành hiện thực!',
    activity: '147 người đã tham gia trong 24 giờ qua',
  },

  // Mobile Optimization
  mobileCTA: {
    upload: 'Tải CV',
    title: 'Bắt đầu Hành trình Sự nghiệp',
    subtitle: 'Tải CV và tìm việc làm',
    start: 'Bắt đầu',
  },

  mobileForm: {
    tapToUpload: 'Chạm để Tải CV',
    supportedFormats: 'PDF, DOC, DOCX tối đa 10MB',
    analyze: 'Phân tích CV',
    analyzing: 'Đang phân tích...',
    privacy: 'CV của bạn được xử lý an toàn. Chúng tôi không bao giờ chia sẻ dữ liệu của bạn.',
  },

  // Pricing & Process
  pricingCalculator: {
    title: 'Máy Tính Giá',
    subtitle: 'Tùy chỉnh gói của bạn',
    employees: 'Số Lượng Nhân Viên',
    jobPosts: 'Bài Đăng Việc Làm Hàng Tháng',
    monthly: 'Gói Tháng',
    yearly: 'Gói Năm',
    save: 'TIẾT KIỆM',
    savings: 'Tiết kiệm',
    includes: 'Bao gồm',
    features: 'Phân tích CV không giới hạn, Khớp AI, Hỗ trợ ưu tiên, Phân tích nâng cao',
  },

  featureComparison: {
    title: 'So Sánh Gói',
    subtitle: 'Chọn gói phù hợp với nhu cầu của bạn',
    features: 'Tính Năng',
    basic: 'Cơ Bản',
    pro: 'Chuyên Nghiệp',
    enterprise: 'Doanh Nghiệp',
    popular: 'PHỔ BIẾN',
    cvAnalysis: 'Phân Tích CV',
    jobMatching: 'Khớp Việc Làm AI',
    storage: 'Lưu Trữ Đám Mây',
    support: 'Hỗ Trợ Ưu Tiên',
    analytics: 'Phân Tích Nâng Cao',
    customization: 'Thương Hiệu Tùy Chỉnh',
    api: 'Truy Cập API',
    team: 'Cộng Tác Nhóm',
    guarantee: 'Tất cả gói bao gồm bảo đảm hoàn tiền 14 ngày',
    noCreditCard: 'Không cần thẻ tín dụng • Hủy bất cứ lúc nào • Thiết lập ngay lập tức',
  },

  interactiveDemo: {
    title: 'Xem Cách Hoạt Động',
    subtitle: 'Trình diễn tương tác về nền tảng của chúng tôi',
    previous: 'Trước',
    next: 'Tiếp',
    finish: 'Hoàn Thành',
    step1: {
      title: 'Tải CV Của Bạn',
      description: 'Kéo thả CV hoặc nhấp để duyệt',
    },
    step2: {
      title: 'Phân Tích AI',
      description: 'AI của chúng tôi phân tích kỹ năng và kinh nghiệm của bạn',
    },
    step3: {
      title: 'Khớp Thông Minh',
      description: 'Nhận khớp với cơ hội việc làm phù hợp',
    },
    step4: {
      title: 'Ứng Tuyển & Thành Công',
      description: 'Ứng tuyển việc làm chỉ với một cú nhấp chuột',
    },
  },

  // SEO Content
  seo: {
    home: {
      title: 'Nền tảng Phân tích CV & Khớp Việc làm AI - TalentFit AI',
      description: 'Tìm việc làm hoàn hảo với phân tích CV bằng AI. TalentFit AI giúp ứng viên khớp với công việc và nhà tuyển dụng tìm ứng viên lý tưởng bằng công nghệ AI tiên tiến.',
      keywords: [
        'phân tích CV AI',
        'khớp việc làm',
        'phân tích hồ sơ',
        'tuyển dụng AI',
        'tìm việc làm',
        'nền tảng nghề nghiệp',
        'tối ưu CV',
        'tìm việc Việt Nam'
      ]
    },
    login: {
      title: 'Đăng nhập - Truy cập Tài khoản',
      description: 'Đăng nhập vào TalentFit AI để truy cập gợi ý việc làm cá nhân hóa và phân tích CV của bạn.'
    },
    register: {
      title: 'Đăng ký - Bắt đầu Hành trình Nghề nghiệp',
      description: 'Tạo tài khoản TalentFit AI và khám phá khớp việc làm bằng AI phù hợp với kỹ năng của bạn.'
    },
    dashboard: {
      title: 'Bảng điều khiển - Trung tâm Nghề nghiệp',
      description: 'Quản lý phân tích CV, khớp việc làm và đơn ứng tuyển của bạn tất cả ở một nơi.'
    },
    cvAnalysis: {
      title: 'Phân tích CV - Phân tích Hồ sơ AI',
      description: 'Tải lên CV của bạn và nhận phân tích chi tiết bằng AI với gợi ý cải thiện và khớp việc làm.'
    },
    jobMatching: {
      title: 'Khớp Việc làm - Tìm Cơ hội Hoàn hảo',
      description: 'Khám phá các cơ hội việc làm phù hợp với kỹ năng và kinh nghiệm của bạn bằng công nghệ khớp AI.'
    }
  }
};
