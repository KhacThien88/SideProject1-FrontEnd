import React, { useState, useRef } from 'react';
import { useTranslation } from '../../../../hooks/useTranslation';
import { Card } from '../../../../components/ui/Card';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import { useToast } from '../../../../contexts/ToastContext';
import { useRouter } from '../../../../components/Router';
import { ValidationInput } from '../../../../components/ui/ValidationInput';
import { useValidation } from '../../../../hooks/useValidation';
import { loginSchema } from '../../../../utils/validation/schemas';
import { GoogleSignInButton } from '../../../../components/auth/GoogleSignInButton';

interface LoginFormProps {
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { getContent } = useTranslation();
  const { showErrorToast, showSuccessToast } = useToast();
  const { navigate } = useRouter();
  
  // Use validation hook without real-time toast (only on form submit)
  const { 
    values, 
    errors, 
    setValue, 
    setFieldTouched,
  } = useValidation(loginSchema, {
    email: '',
    password: '',
    rememberMe: false,
  }, {
    validateOnChange: true,
    validateOnBlur: true,
    debounceMs: 300,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [blurErrors, setBlurErrors] = useState<Record<string, string | null>>({});
  const isSubmittingRef = useRef(false);

  // Function to handle blur validation for required fields only
  const handleBlurValidation = (fieldName: 'email' | 'password', value: any) => {
    setFieldTouched(fieldName);
    
    let errorMessage = null;

    switch (fieldName) {
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
    }

    setBlurErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage
    }));
  };

  // Function to clear blur error when user starts typing
  const clearBlurError = (fieldName: 'email' | 'password') => {
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
    
    if (!values.email || values.email.trim() === '') {
      validationErrors.push(getContent('validation.emailRequired'));
    }
    
    if (!values.password || values.password.trim() === '') {
      validationErrors.push(getContent('validation.passwordRequired'));
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
      // Handle custom onSubmit or default behavior
      if (onSubmit) {
        await onSubmit(values.email, values.password, values.rememberMe || false);
        showSuccessToast(getContent('validation.loginSuccess'), getContent('validation.welcomeMessage'));
      } else {
        // Default simulation với error handling
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulate different error cases for testing
            const email = values.email.toLowerCase();
            if (email === 'error@test.com') {
              reject(new Error('invalid credentials'));
            } else if (email === 'network@test.com') {
              reject(new Error('network error'));
            } else {
              resolve(true);
            }
          }, 1500);
        });
        
        showSuccessToast(getContent('validation.loginSuccess'), getContent('validation.welcomeMessage'));
        
        // Navigate to dashboard after successful login
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Hiển thị lỗi cụ thể dựa trên loại lỗi
      const errorMessage = err.message || '';
      if (errorMessage.includes('invalid credentials')) {
        showErrorToast(getContent('validation.error.invalidCredentials'));
      } else if (errorMessage.includes('network')) {
        showErrorToast(getContent('validation.error.networkError'));
      } else {
        showErrorToast(getContent('validation.error.loginFailed'));
      }
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };



  return (
    <div className="w-full mb-4">
      {/* Header Outside Card */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 via-primary-500/80 via-secondary-500/80 to-secondary-500 bg-clip-text text-transparent" style={{ lineHeight: '1.3'}}>
            {getContent('auth.login.title')}
          </h1>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary-500 via-secondary-400/80 via-primary-500/80 to-primary-500 bg-clip-text text-transparent" style={{ lineHeight: '1.3'}}>
            {getContent('auth.login.subtitle')}
          </h1>
        </div>
        <p className="text-sm font-medium text-neutral-600">
          {getContent('auth.login.welcomeSubtitle')}
        </p>
      </div>

      <Card variant="default" className="w-full shadow-lg backdrop-blur-md p-6">
        {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Email Field */}
        <div className="relative">
          <ValidationInput
            id="email"
            type="email"
            label={getContent('auth.login.email')}
            value={values.email}
            onChange={(e) => {
              setValue('email', e.target.value);
              clearBlurError('email');
            }}
            onBlur={() => handleBlurValidation('email', values.email)}
            validation={errors.email}
            placeholder={getContent('auth.login.emailPlaceholder')}
            autoComplete="email"
            disabled={isLoading}
          />
          {blurErrors.email && (
            <div className="text-xs text-red-500 mt-1">
              {blurErrors.email}
            </div>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-md font-medium text-primary-700 mb-1">
            {getContent('auth.login.password')}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onInvalid={(e) => {
                e.preventDefault();
                showErrorToast(getContent('auth.login.toast.passwordRequired'));
              }}
              onInput={(e) => {
                // Clear custom validity when user starts typing
                (e.target as HTMLInputElement).setCustomValidity('');
              }}
              className={`w-full px-3 py-2 pr-12 border rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary-500 ${
                errors.password ? 'border-error-500 bg-error-50' : 'border-neutral-300 bg-white'
              }`}
              placeholder={getContent('auth.login.passwordPlaceholder')}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-btn absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-primary-600 transition-colors duration-200 focus:outline-none"
              disabled={isLoading}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error-600">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={values.rememberMe || false}
              onChange={(e) => setValue('rememberMe', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:outline-none border-neutral-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="remember-me" className="ml-2 text-sm font-medium text-neutral-700">
              {getContent('auth.login.rememberMe')}
            </label>
          </div>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 rounded"
          >
            {getContent('auth.login.forgotPassword')}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary-100/95 to-secondary-50/95 hover:from-primary-100/90 hover:to-secondary-100/80 rounded-2xl p-3 border border-neutral-200/70 hover:border-primary-200/60 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <span className="font-medium text-primary-800">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="sm" variant="neutral" className="mr-2" />
                {getContent('auth.login.loggingIn')}
              </div>
            ) : (
              getContent('auth.login.loginButton')
            )}
          </span>
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">
              {getContent('auth.login.or')}
            </span>
          </div>
        </div>

        {/* Google Login Button */}
        <GoogleSignInButton
          theme="outline"
          size="large"
          text="signin_with"
          width={400}
          disabled={isLoading}
          onSuccess={() => {
            showSuccessToast(getContent('auth.login.googleSuccessMessage'));
            navigate('/dashboard');
          }}
          onError={(error) => {
            showErrorToast(error);
          }}
          className="w-full"
        />
      </form>

      {/* Sign Up Link */}
      <div className="text-center mt-8">
        <div className="text-sm text-neutral-600">
          {getContent('auth.login.noAccount')}{' '}
          <a 
            href="#register"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#register';
              window.location.reload();
            }}
            className="text-primary-600 hover:text-primary-500 font-medium transition-colors focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 rounded"
          >
            {getContent('auth.login.signUp')}
          </a>
        </div>
      </div>
    </Card>
    </div>
  );
};