import React, { useState, useRef } from 'react';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useRouter } from '../../../../components/Router';
import { useToast } from '../../../../contexts/ToastContext';
import { Card } from '../../../../components/ui/Card';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import { ValidationInput } from '../../../../components/ui/ValidationInput';
import { PasswordRequirements } from '../../../../components/ui/PasswordRequirements';
import { useValidation } from '../../../../hooks/useValidation';
import { registerSchema } from '../../../../utils/validation/schemas';
import { User, Mail, Phone, Shield, CheckCircle, Star, BriefcaseBusiness } from 'lucide-react';

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
  
  // Use validation hook
  const { 
    values, 
    errors, 
    setValue, 
    setFieldTouched,
  } = useValidation(registerSchema, {
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    role: 'candidate' as const,
    acceptTerms: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [blurErrors, setBlurErrors] = useState<Record<string, string | null>>({});
  const isSubmittingRef = useRef(false);

  // Function to handle blur validation for required fields only
  const handleBlurValidation = (fieldName: keyof RegisterFormData, value: any) => {
    setFieldTouched(fieldName);
    
    // Only validate required fields for blur errors
    const requiredFields = ['fullName', 'email', 'password', 'confirmPassword', 'acceptTerms'];
    if (!requiredFields.includes(fieldName)) {
      return;
    }

    let errorMessage = null;

    switch (fieldName) {
      case 'fullName':
        if (!value || value.trim() === '') {
          errorMessage = getContent('validation.fullNameRequired');
        }
        break;
      case 'email':
        if (!value || value.trim() === '') {
          errorMessage = getContent('validation.emailRequired');
        }
        break;
      case 'password':
        if (!value || value.trim() === '') {
          errorMessage = getContent('validation.passwordRequired');
        }
        break;
      case 'confirmPassword':
        if (!value || value.trim() === '') {
          errorMessage = getContent('validation.confirmPasswordRequired');
        }
        break;
      case 'acceptTerms':
        if (!value) {
          errorMessage = getContent('validation.acceptTermsRequired');
        }
        break;
    }

    setBlurErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage
    }));
  };

  // Function to clear blur error when user starts typing
  const clearBlurError = (fieldName: keyof RegisterFormData) => {
    if (blurErrors[fieldName]) {
      setBlurErrors(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set submitting flag để tránh báo lỗi blur
    isSubmittingRef.current = true;
    
    // Clear all blur errors on submit
    setBlurErrors({});
    
    // Simple validation - chỉ check required fields với i18n trực tiếp
    const validationErrors: string[] = [];
    
    if (!values.fullName || values.fullName.trim() === '') {
      validationErrors.push(getContent('validation.fullNameRequired'));
    }
    
    if (!values.email || values.email.trim() === '') {
      validationErrors.push(getContent('validation.emailRequired'));
    }
    
    if (!values.password || values.password.trim() === '') {
      validationErrors.push(getContent('validation.passwordRequired'));
    }
    
    if (!values.confirmPassword || values.confirmPassword.trim() === '') {
      validationErrors.push(getContent('validation.confirmPasswordRequired'));
    } else if (values.password !== values.confirmPassword) {
      validationErrors.push(getContent('validation.confirmPasswordMismatch'));
    }
    
    if (!values.acceptTerms) {
      validationErrors.push(getContent('validation.acceptTermsRequired'));
    }
    
    // Nếu có lỗi, hiện toast và return
    if (validationErrors.length > 0) {
      validationErrors.forEach((error, index) => {
        setTimeout(() => {
          showErrorToast(error);
        }, index * 100);
      });
      isSubmittingRef.current = false;
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (onSubmit) {
        await onSubmit(values as RegisterFormData);
        showSuccessToast(getContent('validation.registerSuccess'), getContent('validation.welcomeMessage'));
      } else {
        // Simulate API call
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulate different scenarios for testing
            const email = values.email.toLowerCase();
            if (email === 'test@exists.com') {
              reject(new Error('email already exists'));
            } else if (email === 'network@error.com') {
              reject(new Error('network error'));
            } else {
              resolve(true);
            }
          }, 2000);
        });
        
        showSuccessToast(getContent('validation.registerSuccess'), getContent('validation.welcomeMessage'));
        
        // Navigate to login after successful registration
        navigate('/login');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      
      const errorMessage = err.message || '';
      if (errorMessage.includes('email already exists')) {
        showErrorToast(getContent('validation.error.emailExists'), getContent('validation.error.emailExistsSubtitle'), 4000);
      } else if (errorMessage.includes('network')) {
        showErrorToast(getContent('validation.error.networkErrorSubtitle'), getContent('validation.error.generalError'), 4000);
      } else {
        showErrorToast(getContent('validation.error.registerFailed'), getContent('validation.error.generalError'), 4000);
      }
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  // Removed old handleInputChange - using ValidationInput and useValidation hook

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 via-primary-500/80 via-secondary-500/80 to-secondary-500 bg-clip-text text-transparent">
            {getContent('auth.register.title')}
          </h1>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary-500 via-secondary-400/80 via-primary-500/80 to-primary-500 bg-clip-text text-transparent">
            {getContent('auth.register.subtitle')}
          </h1>
        </div>
        <p className="text-sm font-medium text-neutral-600">
          {getContent('auth.register.welcomeSubtitle')}
        </p>
      </div>

      <Card variant="default" className="w-full shadow-lg backdrop-blur-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name Field */}
            <div className="relative">
              <ValidationInput
                id="fullName"
                type="text"
                label={getContent('auth.register.fullName')}
                value={values.fullName}
                onChange={(e) => {
                  setValue('fullName', e.target.value);
                  clearBlurError('fullName');
                }}
                onBlur={() => handleBlurValidation('fullName', values.fullName)}
                validation={errors.fullName}
                placeholder={getContent('auth.register.fullNamePlaceholder')}
                autoComplete="name"
                disabled={isLoading}
                icon={<User className="w-4 h-4" />}
                required
              />
              {blurErrors.fullName && (
                <div className="text-xs text-red-500 mt-1">
                  {blurErrors.fullName}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <ValidationInput
                id="email"
                type="email"
                label={getContent('auth.register.email')}
                value={values.email}
                onChange={(e) => {
                  setValue('email', e.target.value);
                  clearBlurError('email');
                }}
                onBlur={() => handleBlurValidation('email', values.email)}
                validation={errors.email}
                placeholder={getContent('auth.register.emailPlaceholder')}
                autoComplete="email"
                disabled={isLoading}
                icon={<Mail className="w-4 h-4" />}
                required
              />
              {blurErrors.email && (
                <div className="text-xs text-red-500 mt-1">
                  {blurErrors.email}
                </div>
              )}
            </div>
          </div>

          {/* Phone and Role Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Field (Optional) */}
            <ValidationInput
              id="phone"
              type="tel"
              label={`${getContent('auth.register.phone')} (${getContent('auth.register.optional')})`}
              value={values.phone || ''}
              onChange={(e) => setValue('phone', e.target.value)}
              onBlur={() => setFieldTouched('phone')}
              validation={errors.phone}
              placeholder={getContent('auth.register.phonePlaceholder')}
              autoComplete="tel"
              disabled={isLoading}
              icon={<Phone className="w-4 h-4" />}
            />

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
                    values.role === 'candidate' 
                      ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' 
                      : 'border-neutral-300 bg-white hover:border-primary-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="candidate"
                    checked={values.role === 'candidate'}
                    onChange={(e) => setValue('role', e.target.value as 'candidate' | 'recruiter')}
                    className="sr-only"
                    disabled={isLoading}
                  />
                  <div className="flex flex-row items-center space-x-1">
                    <User className="w-3 h-3 text-primary-600" />
                    <span className="text-xs font-medium text-primary-700">
                      {getContent('auth.register.candidate')}
                    </span>
                  </div>
                  {values.role === 'candidate' && (
                    <CheckCircle className="w-3 h-3 text-primary-600 ml-auto" />
                  )}
                </label>
                
                <label 
                  className={`relative flex flex-row items-center p-2 border rounded-lg cursor-pointer transition-all duration-200 flex-1 ${
                    values.role === 'recruiter' 
                      ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' 
                      : 'border-neutral-300 bg-white hover:border-primary-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={values.role === 'recruiter'}
                    onChange={(e) => setValue('role', e.target.value as 'candidate' | 'recruiter')}
                    className="sr-only"
                    disabled={isLoading}
                  />
                  <div className="flex flex-row items-center space-x-1">
                    <BriefcaseBusiness className="w-3 h-3 text-primary-600" />
                    <span className="text-xs font-medium text-primary-700">
                      {getContent('auth.register.recruiter')}
                    </span>
                  </div>
                  {values.role === 'recruiter' && (
                    <CheckCircle className="w-3 h-3 text-primary-600 ml-auto" />
                  )}
                </label>
              </div>
            </div>
          </div>



          {/* Password Fields Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password Field */}
            <div className="relative">
            <div className="relative">
              <ValidationInput
                id="password"
                type="password"
                label={getContent('auth.register.password')}
                value={values.password}
                onChange={(e) => {
                  setValue('password', e.target.value);
                  clearBlurError('password');
                }}
                onFocus={() => setShowPasswordRequirements(true)}
                onBlur={() => {
                  setShowPasswordRequirements(false);
                  handleBlurValidation('password', values.password);
                }}
                validation={errors.password}
                showPasswordToggle={true}
                placeholder={getContent('auth.register.passwordPlaceholder')}
                autoComplete="new-password"
                disabled={isLoading}
                icon={<Shield className="w-4 h-4" />}
                required
              />
              {blurErrors.password && (
                <div className="text-xs text-red-500 mt-1">
                  {blurErrors.password}
                </div>
              )}
            </div>              {/* Password Requirements Popup */}
              <PasswordRequirements 
                password={values.password}
                isVisible={showPasswordRequirements}
              />
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <ValidationInput
                id="confirmPassword"
                type="password"
                label={getContent('auth.register.confirmPassword')}
                value={values.confirmPassword}
                onChange={(e) => {
                  setValue('confirmPassword', e.target.value);
                  clearBlurError('confirmPassword');
                }}
                onBlur={() => handleBlurValidation('confirmPassword', values.confirmPassword)}
                validation={errors.confirmPassword}
                showPasswordToggle={true}
                placeholder={getContent('auth.register.confirmPasswordPlaceholder')}
                autoComplete="new-password"
                disabled={isLoading}
                icon={<CheckCircle className="w-4 h-4" />}
                required
              />
              {blurErrors.confirmPassword && (
                <div className="text-xs text-red-500 mt-1">
                  {blurErrors.confirmPassword}
                </div>
              )}
            </div>  
          </div>

          {/* Terms and Conditions */}
          <div className="relative">
            <div className="flex flex-row items-start space-x-2">
              <input
                id="acceptTerms"
                type="checkbox"
                checked={values.acceptTerms}
                onChange={(e) => {
                  setValue('acceptTerms', e.target.checked);
                  clearBlurError('acceptTerms');
                }}
                onBlur={() => handleBlurValidation('acceptTerms', values.acceptTerms)}
              className="mt-0.5 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="acceptTerms" className="text-sm text-neutral-700">
              {getContent('auth.register.acceptTerms')}{' '}
              <a 
                href="#terms" 
                className="text-primary-600 hover:text-primary-500 font-medium underline"
              >
                {getContent('auth.register.termsOfService')}
              </a>
              {' và '}
              <a 
                href="#privacy" 
                className="text-primary-600 hover:text-primary-500 font-medium underline"
              >
                {getContent('auth.register.privacyPolicy')}
              </a>
            </label>
            </div>
            {blurErrors.acceptTerms && (
              <div className="text-xs text-red-500 mt-1">
                {blurErrors.acceptTerms}
              </div>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-2xl p-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
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
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <div className="text-sm text-neutral-600">
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
