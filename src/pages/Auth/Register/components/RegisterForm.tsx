import React, { useState } from 'react';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useRouter } from '../../../../components/Router';
import { useToast } from '../../../../contexts/ToastContext';
import { Card } from '../../../../components/ui/Card';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import { Eye, EyeOff, User, Mail, Phone, Shield, CheckCircle, Star, BriefcaseBusiness } from 'lucide-react';

interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone?: string;
  role: 'candidate' | 'recruiter';
  acceptTerms: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const { getContent } = useTranslation();
  const { navigate } = useRouter();
  const { showErrorToast, showSuccessToast } = useToast();
  
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    role: 'candidate',
    acceptTerms: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    // Validate full name
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      showErrorToast('Vui lòng nhập họ tên (ít nhất 2 ký tự)');
      newErrors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
      hasErrors = true;
    }

    // Validate email
    if (!formData.email || formData.email.trim() === '') {
      showErrorToast('Vui lòng nhập email');
      newErrors.email = 'Email là bắt buộc';
      hasErrors = true;
    } else {
      const email = formData.email.trim();
      if (!email.includes('@')) {
        showErrorToast(`Email '${email}' thiếu ký tự "@"`);
        newErrors.email = 'Email không hợp lệ';
        hasErrors = true;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        if (email.startsWith('@')) {
          showErrorToast('Email không thể bắt đầu bằng "@"');
        } else if (email.endsWith('@')) {
          showErrorToast(`Email '${email}' thiếu tên miền sau "@"`);
        } else if (!email.includes('.') || email.split('@')[1]?.split('.').length < 2) {
          showErrorToast('Email thiếu tên miền (ví dụ: .com, .vn)');
        } else {
          showErrorToast('Định dạng email không hợp lệ');
        }
        newErrors.email = 'Email không hợp lệ';
        hasErrors = true;
      }
    }

    // Validate password
    if (!formData.password || formData.password.length < 6) {
      showErrorToast('Mật khẩu phải có ít nhất 6 ký tự');
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      hasErrors = true;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      showErrorToast('Mật khẩu xác nhận không khớp');
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      hasErrors = true;
    }

    // Validate phone (optional but if provided should be valid)
    if (formData.phone && formData.phone.trim() !== '') {
      const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        showErrorToast('Số điện thoại không hợp lệ');
        newErrors.phone = 'Số điện thoại không hợp lệ';
        hasErrors = true;
      }
    }

    // Validate terms acceptance
    if (!formData.acceptTerms) {
      showErrorToast('Vui lòng đồng ý với điều khoản sử dụng');
      newErrors.acceptTerms = 'Bạn cần đồng ý với điều khoản';
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
        showSuccessToast('Đăng ký thành công!', 'Chào mừng bạn đến với TalentFit AI');
      } else {
        // Simulate API call
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulate different scenarios for testing
            const email = formData.email.toLowerCase();
            if (email === 'test@exists.com') {
              reject(new Error('email already exists'));
            } else if (email === 'network@error.com') {
              reject(new Error('network error'));
            } else {
              resolve(true);
            }
          }, 2000);
        });
        
        showSuccessToast('Đăng ký thành công!', 'Chào mừng bạn đến với TalentFit AI');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      
      const errorMessage = err.message || '';
      if (errorMessage.includes('email already exists')) {
        showErrorToast('Email đã được sử dụng', 'Vui lòng chọn email khác', 4000);
      } else if (errorMessage.includes('network')) {
        showErrorToast('Lỗi kết nối mạng', 'Vui lòng thử lại sau', 4000);
      } else {
        showErrorToast('Đăng ký thất bại', 'Vui lòng thử lại sau', 4000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 via-primary-500/80 via-secondary-500/80 to-secondary-500 bg-clip-text text-transparent">
            {getContent('auth.register.title') || 'Tạo tài '}
          </h1>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary-500 via-secondary-400/80 via-primary-500/80 to-primary-500 bg-clip-text text-transparent">
            {getContent('auth.register.subtitle') || 'khoản mới '}
          </h1>
        </div>
        <p className="text-sm font-medium text-neutral-600">
          {getContent('auth.register.welcomeSubtitle') || 'Tham gia cộng đồng TalentFit AI ngay hôm nay'}
        </p>
      </div>

      <Card variant="default" className="w-full shadow-lg backdrop-blur-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-primary-700 mb-1">
                <div className="flex flex-row items-center gap-2">
                  <User className="w-4 h-4" />
                  {getContent('auth.register.fullName') || 'Họ và tên'}
                  <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                onInvalid={(e) => {
                  e.preventDefault();
                  const name = (e.target as HTMLInputElement).value.trim();
                  if (!name) {
                    showErrorToast('Vui lòng nhập họ và tên');
                  } else if (name.length < 2) {
                    showErrorToast('Họ tên phải có ít nhất 2 ký tự');
                  }
                }}
                onInput={(e) => {
                  // Clear custom validity when user starts typing
                  (e.target as HTMLInputElement).setCustomValidity('');
                }}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary-500 ${
                  errors.fullName ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white'
                }`}
                placeholder={getContent('auth.register.fullNamePlaceholder') || 'Nhập họ và tên của bạn'}
                disabled={isLoading}
                required
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-1">
                <div className="flex flex-row items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {getContent('auth.register.email') || 'Email'}
                  <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onInvalid={(e) => {
                  e.preventDefault();
                  const email = (e.target as HTMLInputElement).value.trim();
                  if (!email) {
                    showErrorToast('Vui lòng nhập email');
                  } else if (!email.includes('@')) {
                    showErrorToast(`Email '${email}' thiếu ký tự "@"`);
                  } else {
                    showErrorToast('Vui lòng nhập email hợp lệ');
                  }
                }}
                onInput={(e) => {
                  // Clear custom validity when user starts typing
                  (e.target as HTMLInputElement).setCustomValidity('');
                }}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary-500 ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white'
                }`}
                placeholder={getContent('auth.register.emailPlaceholder') || 'Nhập địa chỉ email'}
                disabled={isLoading}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone and Role Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Field (Optional) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-1">
                <div className="flex flex-row items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {getContent('auth.register.phone') || 'Số điện thoại'}
                  <span className="text-neutral-400 text-sm">(tùy chọn)</span>
                </div>
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onInvalid={(e) => {
                  e.preventDefault();
                  const phone = (e.target as HTMLInputElement).value.trim();
                  if (phone && !/^[+]?[0-9\s\-\(\)]{8,}$/.test(phone)) {
                    showErrorToast('Số điện thoại không hợp lệ');
                  }
                }}
                onInput={(e) => {
                  // Clear custom validity when user starts typing
                  (e.target as HTMLInputElement).setCustomValidity('');
                }}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary-500 ${
                  errors.phone ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white'
                }`}
                placeholder={getContent('auth.register.phonePlaceholder') || 'Nhập số điện thoại'}
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                <div className="flex flex-row items-center gap-2">
                  <Star className="w-4 h-4" />
                  {getContent('auth.register.role') || 'Vai trò'}
                  <span className="text-red-500">*</span>
                </div>
              </label>
              <div className="flex flex-row gap-2">
                <label 
                  className={`relative flex flex-row items-center p-2 py-3 border rounded-lg cursor-pointer transition-all duration-200 flex-1 ${
                    formData.role === 'candidate' 
                      ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' 
                      : 'border-neutral-300 bg-white hover:border-primary-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="candidate"
                    checked={formData.role === 'candidate'}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="sr-only"
                    disabled={isLoading}
                  />
                  <div className="flex flex-row items-center space-x-1">
                    <User className="w-3 h-3 text-primary-600" />
                    <span className="text-xs font-medium text-primary-700">
                      {getContent('auth.register.candidate') || 'Ứng viên'}
                    </span>
                  </div>
                  {formData.role === 'candidate' && (
                    <CheckCircle className="w-3 h-3 text-primary-600 ml-auto" />
                  )}
                </label>
                
                <label 
                  className={`relative flex flex-row items-center p-2 border rounded-lg cursor-pointer transition-all duration-200 flex-1 ${
                    formData.role === 'recruiter' 
                      ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' 
                      : 'border-neutral-300 bg-white hover:border-primary-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={formData.role === 'recruiter'}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="sr-only"
                    disabled={isLoading}
                  />
                  <div className="flex flex-row items-center space-x-1">
                    <BriefcaseBusiness className="w-3 h-3 text-primary-600" />
                    <span className="text-xs font-medium text-primary-700">
                      {getContent('auth.register.recruiter') || 'NTD'}
                    </span>
                  </div>
                  {formData.role === 'recruiter' && (
                    <CheckCircle className="w-3 h-3 text-primary-600 ml-auto" />
                  )}
                </label>
              </div>
            </div>
          </div>



          {/* Password Fields Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-1">
                <div className="flex flex-row items-center gap-2">
                  <Shield className="w-4 h-4" />
                  {getContent('auth.register.password') || 'Mật khẩu'}
                  <span className="text-red-500">*</span>
                </div>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onInvalid={(e) => {
                    e.preventDefault();
                    const password = (e.target as HTMLInputElement).value;
                    if (!password) {
                      showErrorToast('Vui lòng nhập mật khẩu');
                    } else if (password.length < 6) {
                      showErrorToast('Mật khẩu phải có ít nhất 6 ký tự');
                    }
                  }}
                  onInput={(e) => {
                    // Clear custom validity when user starts typing
                    (e.target as HTMLInputElement).setCustomValidity('');
                  }}
                  className={`w-full px-3 py-2 pr-12 border rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary-500 ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white'
                  }`}
                  placeholder={getContent('auth.register.passwordPlaceholder') || 'Nhập mật khẩu (ít nhất 6 ký tự)'}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-primary-600 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-700 mb-1">
                <div className="flex flex-row items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {getContent('auth.register.confirmPassword') || 'Xác nhận mật khẩu'}
                  <span className="text-red-500">*</span>
                </div>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  onInvalid={(e) => {
                    e.preventDefault();
                    const confirmPassword = (e.target as HTMLInputElement).value;
                    if (!confirmPassword) {
                      showErrorToast('Vui lòng xác nhận mật khẩu');
                    } else if (confirmPassword !== formData.password) {
                      showErrorToast('Mật khẩu xác nhận không khớp');
                    }
                  }}
                  onInput={(e) => {
                    // Clear custom validity when user starts typing
                    (e.target as HTMLInputElement).setCustomValidity('');
                  }}
                  className={`w-full px-3 py-2 pr-12 border rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary-500 ${
                    errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white'
                  }`}
                  placeholder={getContent('auth.register.confirmPasswordPlaceholder') || 'Nhập lại mật khẩu'}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-primary-600 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>  
          </div>

          {/* Terms and Conditions */}
          <div className="flex flex-row items-start space-x-2">
            <input
              id="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
              onInvalid={(e) => {
                e.preventDefault();
                const checkbox = e.target as HTMLInputElement;
                if (!checkbox.checked) {
                  showErrorToast('Vui lòng đồng ý với điều khoản sử dụng');
                }
              }}
              onInput={(e) => {
                // Clear custom validity when user checks the box
                (e.target as HTMLInputElement).setCustomValidity('');
              }}
              className={`mt-0.5 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded ${
                errors.acceptTerms ? 'border-red-500' : ''
              }`}
              disabled={isLoading}
              required
            />
            <label htmlFor="acceptTerms" className="text-sm text-neutral-700">
              {getContent('auth.register.acceptTerms') || 'Tôi đồng ý với'}{' '}
              <a 
                href="#terms" 
                className="text-primary-600 hover:text-primary-500 font-medium underline"
              >
                {getContent('auth.register.termsOfService') || 'Điều khoản sử dụng'}
              </a>
              {' và '}
              <a 
                href="#privacy" 
                className="text-primary-600 hover:text-primary-500 font-medium underline"
              >
                {getContent('auth.register.privacyPolicy') || 'Chính sách bảo mật'}
              </a>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-2xl p-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <div className="flex flex-row items-center justify-center">
                <LoadingSpinner size="sm" variant="neutral" className="mr-2" />
                {getContent('auth.register.registering') || 'Đang đăng ký...'}
              </div>
            ) : (
              getContent('auth.register.registerButton') || 'Đăng ký'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <div className="text-sm text-neutral-600">
            {getContent('auth.register.hasAccount') || 'Đã có tài khoản?'}{' '}
            <a 
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
              className="text-primary-600 hover:text-primary-500 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded cursor-pointer"
            >
              {getContent('auth.register.loginLink') || 'Đăng nhập ngay'}
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};
