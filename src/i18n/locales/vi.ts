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
    googleSigningIn: 'Đang đăng nhập với Google...',
    continueWithGoogle: 'Tiếp tục với Google',
    googleSignInSuccess: 'Đăng nhập Google thành công',
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

  validation: {
    emailRequired: 'Email là bắt buộc',
    emailInvalid: 'Email không đúng định dạng',
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
    }
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
    }
  },

  // Dashboard
  dashboard: {
    sidebar: {
      navigation: {
        dashboard: 'Bảng điều khiển',
        cvAnalysis: 'Phân tích CV',
        candidates: 'Ứng viên',
        savedJobs: 'Công việc đã lưu',
        jobPostings: 'Tin tuyển dụng',
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

  // Password Requirements component
  passwordRequirements: {
    title: 'Yêu cầu mật khẩu',
    strength: 'Độ mạnh mật khẩu',
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
  }
};
