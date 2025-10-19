import React, { useState } from 'react';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useRouter } from '../../../../components/Router';
import { useToast } from '../../../../contexts/ToastContext';
import { useAuth } from '../../../../contexts/auth/AuthContext';
import { Card } from '../../../../components/ui/Card';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import { createFocusEffect } from '../../../../utils/focusEffects';
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
  const { register } = useAuth();
  
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
      showErrorToast(getContent('auth.register.toast.fullNameMinLength'));
      newErrors.fullName = getContent('auth.register.toast.fullNameMinLength');
      hasErrors = true;
    }

    // Validate email
    if (!formData.email || formData.email.trim() === '') {
      showErrorToast(getContent('auth.register.toast.emailRequired'));
      newErrors.email = getContent('auth.register.toast.emailRequired');
      hasErrors = true;
    } else {
      const email = formData.email.trim();
      if (!email.includes('@')) {
        showErrorToast(`Email '${email}' ${getContent('auth.register.toast.emailMissingAt')}`);
        newErrors.email = getContent('auth.register.toast.emailInvalid');
        hasErrors = true;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        if (email.startsWith('@')) {
          showErrorToast(getContent('auth.register.toast.emailStartsWithAt'));
        } else if (email.endsWith('@')) {
          showErrorToast(`Email '${email}' ${getContent('auth.register.toast.emailMissingDomain')}`);
        } else if (!email.includes('.') || email.split('@')[1]?.split('.').length < 2) {
          showErrorToast(getContent('auth.register.toast.emailMissingTLD'));
        } else {
          showErrorToast(getContent('auth.register.toast.emailInvalid'));
        }
        newErrors.email = getContent('auth.register.toast.emailInvalid');
        hasErrors = true;
      }
    }

    // Validate password
    if (!formData.password || formData.password.length < 8) {
      showErrorToast(getContent('auth.register.toast.passwordMinLength'));
      newErrors.password = getContent('auth.register.toast.passwordMinLength');
      hasErrors = true;
    } else {
      // Check for password strength requirements
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasLowerCase = /[a-z]/.test(formData.password);
      const hasNumbers = /\d/.test(formData.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
      
      if (!hasUpperCase) {
        showErrorToast(getContent('auth.register.toast.passwordUppercase'));
        newErrors.password = getContent('auth.register.toast.passwordUppercase');
        hasErrors = true;
      } else if (!hasLowerCase) {
        showErrorToast(getContent('auth.register.toast.passwordLowercase'));
        newErrors.password = getContent('auth.register.toast.passwordLowercase');
        hasErrors = true;
      } else if (!hasNumbers) {
        showErrorToast(getContent('auth.register.toast.passwordNumbers'));
        newErrors.password = getContent('auth.register.toast.passwordNumbers');
        hasErrors = true;
      } else if (!hasSpecialChar) {
        showErrorToast(getContent('auth.register.toast.passwordSpecialChar'));
        newErrors.password = getContent('auth.register.toast.passwordSpecialChar');
        hasErrors = true;
      }
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      showErrorToast(getContent('auth.register.toast.confirmPasswordMismatch'));
      newErrors.confirmPassword = getContent('auth.register.toast.confirmPasswordMismatch');
      hasErrors = true;
    }

    // Validate phone (optional but if provided should be valid)
    if (formData.phone && formData.phone.trim() !== '') {
      const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        showErrorToast(getContent('auth.register.toast.phoneInvalid'));
        newErrors.phone = getContent('auth.register.toast.phoneInvalid');
        hasErrors = true;
      }
    }

    // Validate terms acceptance
    if (!formData.acceptTerms) {
      showErrorToast(getContent('auth.register.toast.termsRequired'));
      newErrors.acceptTerms = getContent('auth.register.toast.termsRequired');
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
        showSuccessToast(getContent('auth.register.toast.registerSuccess'), getContent('auth.register.toast.registerSuccessSubtitle'));
      } else {
        // Use real API call
        const registerData = {
          email: formData.email.trim(),
          password: formData.password,
          confirm_password: formData.confirmPassword,
          full_name: formData.fullName.trim(),
          phone: formData.phone?.trim() || undefined,
          role: formData.role,
        };
        
        await register(registerData);
        
        // Store email for OTP verification
        localStorage.setItem('pendingVerificationEmail', formData.email.trim());
        
        // Registration successful, navigate to OTP verification
        showSuccessToast(
          getContent('auth.register.toast.registerSuccess'), 
          getContent('auth.register.toast.registerSuccessSubtitle')
        );
        
        // Navigate to OTP verification page with email
        setTimeout(() => {
          navigate('/verify-otp', 'slide-left');
        }, 1500);
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      
      const errorMessage = err.message || '';
      if (errorMessage.includes('email already exists') || errorMessage.includes('email đã được sử dụng')) {
        showErrorToast(getContent('auth.register.toast.emailExists'), getContent('auth.register.toast.emailExistsSubtitle'), 4000);
      } else if (errorMessage.includes('network') || errorMessage.includes('kết nối')) {
        showErrorToast(getContent('auth.register.toast.networkError'), getContent('auth.register.toast.networkErrorSubtitle'), 4000);
      } else if (errorMessage.includes('password') || errorMessage.includes('mật khẩu')) {
        showErrorToast(getContent('auth.register.toast.passwordWeak'), getContent('auth.register.toast.passwordWeakSubtitle'), 4000);
      } else {
        showErrorToast(getContent('auth.register.toast.registerFailed'), getContent('auth.register.toast.generalErrorSubtitle'), 4000);
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
      <Card variant="default" className="w-full shadow-lg backdrop-blur-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-primary-700 mb-1">
                <div className="flex flex-row items-center gap-2">
                  <User className="w-4 h-4" />
                  {getContent('auth.register.fullName')}
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
                    showErrorToast(getContent('auth.register.toast.fullNameRequired'));
                  } else if (name.length < 2) {
                    showErrorToast(getContent('auth.register.toast.fullNameMinLength'));
                  }
                }}
                onInput={(e) => {
                  // Clear custom validity when user starts typing
                  (e.target as HTMLInputElement).setCustomValidity('');
                }}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none ${
                  errors.fullName ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white'
                } ${createFocusEffect.input('md', 'primary')}`}
                placeholder={getContent('auth.register.fullNamePlaceholder')}
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
                  {getContent('auth.register.email')}
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
                    showErrorToast(getContent('auth.register.toast.emailRequired'));
                  } else if (!email.includes('@')) {
                    showErrorToast(`Email '${email}' ${getContent('auth.register.toast.emailMissingAt')}`);
                  } else {
                    showErrorToast(getContent('auth.register.toast.emailInvalid'));
                  }
                }}
                onInput={(e) => {
                  // Clear custom validity when user starts typing
                  (e.target as HTMLInputElement).setCustomValidity('');
                }}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white'
                } ${createFocusEffect.email('md')}`}
                placeholder={getContent('auth.register.emailPlaceholder')}
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
                  {getContent('auth.register.phone')}
                  <span className="text-neutral-400 text-sm">{getContent('auth.register.optional')}</span>
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
                    showErrorToast(getContent('auth.register.toast.phoneInvalid'));
                  }
                }}
                onInput={(e) => {
                  // Clear custom validity when user starts typing
                  (e.target as HTMLInputElement).setCustomValidity('');
                }}
                className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none ${
                  errors.phone ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white'
                } ${createFocusEffect.input('md', 'primary')}`}
                placeholder={getContent('auth.register.phonePlaceholder')}
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
                  {getContent('auth.register.role')}
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
                      {getContent('auth.register.candidate')}
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
                      {getContent('auth.register.recruiter')}
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
                  {getContent('auth.register.password')}
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
                      showErrorToast(getContent('auth.register.toast.passwordRequired'));
                    } else if (password.length < 6) {
                      showErrorToast(getContent('auth.register.toast.passwordMinLength'));
                    }
                  }}
                  onInput={(e) => {
                    // Clear custom validity when user starts typing
                    (e.target as HTMLInputElement).setCustomValidity('');
                  }}
                  className={`w-full px-3 py-2 pr-12 border rounded-lg transition-colors duration-200 focus:outline-none ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white'
                  } ${createFocusEffect.password('md')}`}
                  placeholder={getContent('auth.register.passwordPlaceholder')}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-primary-600 transition-colors duration-200 focus:outline-none"
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
                  {getContent('auth.register.confirmPassword')}
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
                      showErrorToast(getContent('auth.register.toast.confirmPasswordRequired'));
                    } else if (confirmPassword !== formData.password) {
                      showErrorToast(getContent('auth.register.toast.confirmPasswordMismatch'));
                    }
                  }}
                  onInput={(e) => {
                    // Clear custom validity when user starts typing
                    (e.target as HTMLInputElement).setCustomValidity('');
                  }}
                  className={`w-full px-3 py-2 pr-12 border rounded-lg transition-colors duration-200 focus:outline-none ${
                    errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white'
                  } ${createFocusEffect.password('md')}`}
                  placeholder={getContent('auth.register.confirmPasswordPlaceholder')}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle-btn absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-primary-600 transition-colors duration-200 focus:outline-none"
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
                  showErrorToast(getContent('auth.register.toast.termsRequired'));
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
            <label htmlFor="acceptTerms" className="text-sm font-semibold text-neutral-700">
              {getContent('auth.register.acceptTerms')}{' '}
              <a 
                href="#terms" 
                className="text-primary-600 hover:text-primary-500 font-medium underline"
              >
                {getContent('auth.register.termsOfService')}
              </a>
              {' '}{getContent('auth.register.and')}{' '}
              <a 
                href="#privacy" 
                className="text-primary-600 hover:text-primary-500 font-medium underline"
              >
                {getContent('auth.register.privacyPolicy')}
              </a>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
          )}

          {/* Register Button */}
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full max-w-md text-primary-700 hover:text-primary-800 bg-gradient-to-r from-primary-100/95 to-secondary-50/95 hover:from-primary-100/90 hover:to-secondary-100/80 rounded-2xl p-3 border border-neutral-200/70 hover:border-primary-200/60 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${createFocusEffect.input('md', 'primary')}`}
            >
              {isLoading ? (
                <div className="flex flex-row items-center justify-center">
                  <LoadingSpinner size="sm" variant="neutral" className="mr-2" />
                  {getContent('auth.register.registering')}
                </div>
              ) : (
                getContent('auth.register.registerButton')
              )}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <div className="text-sm font-semibold text-neutral-600">
            {getContent('auth.register.hasAccount')}{' '}
            <a 
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
              className="text-primary-600 hover:text-primary-500 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded cursor-pointer"
            >
              {getContent('auth.register.loginLink')}
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};
