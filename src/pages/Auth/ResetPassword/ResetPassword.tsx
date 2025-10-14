import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { useToast } from '../../../contexts/ToastContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { AuthApiService, ApiErrorHandler } from '../../../services/api/authService';
import { useRouter } from '../../../components/Router';
import { useOnReveal } from '../../../hooks/useOnReveal';
import { LoginHero } from '../Login/components/LoginHero';
import { createFocusEffect } from '../../../utils/focusEffects';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

// Password validation function to match backend requirements
const validatePasswordStrength = (password: string): { isValid: boolean; messageKey: string } => {
  if (password.length < 8) {
    return { isValid: false, messageKey: 'auth.resetPassword.toast.passwordMinLength' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, messageKey: 'auth.resetPassword.toast.passwordUppercase' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, messageKey: 'auth.resetPassword.toast.passwordLowercase' };
  }
  
  if (!/\d/.test(password)) {
    return { isValid: false, messageKey: 'auth.resetPassword.toast.passwordNumbers' };
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
    return { isValid: false, messageKey: 'auth.resetPassword.toast.passwordSpecialChar' };
  }
  
  return { isValid: true, messageKey: '' };
};

export const ResetPassword: React.FC = () => {
  useOnReveal('.reveal');
  const { showErrorToast, showSuccessToast } = useToast();
  const { getContent } = useTranslation();
  const { navigate } = useRouter();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ isValid: false, messageKey: '' });

  useEffect(() => {
    const url = new URL(window.location.href);
    const t = url.searchParams.get('token') || '';
    setToken(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      showErrorToast(getContent('auth.resetPassword.toast.invalidToken'));
      return;
    }
    if (!password || password.length < 8) {
      showErrorToast(getContent('auth.resetPassword.toast.passwordMinLength'));
      return;
    }
    
    // Enhanced password validation to match backend requirements
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      showErrorToast(getContent(passwordValidation.messageKey));
      return;
    }
    if (password !== confirmPassword) {
      showErrorToast(getContent('auth.resetPassword.toast.confirmPasswordMismatch'));
      return;
    }
    try {
      setIsLoading(true);
      await AuthApiService.resetPassword(token, password);
      showSuccessToast(getContent('auth.resetPassword.toast.success'));
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (err: any) {
      console.error('Reset password error:', err);
      
      const errorMessage = ApiErrorHandler.handleError(err);
      
      if (errorMessage.includes('token') && (errorMessage.includes('invalid') || errorMessage.includes('expired'))) {
        showErrorToast(getContent('auth.resetPassword.toast.invalidOrExpiredToken'));
      } else if (errorMessage.includes('password') && errorMessage.includes('characters')) {
        showErrorToast(getContent('auth.resetPassword.toast.passwordTooWeak'));
      } else if (errorMessage.includes('timeout') || errorMessage.includes('network')) {
        showErrorToast(getContent('auth.resetPassword.toast.networkError'));
      } else {
        showErrorToast(errorMessage || getContent('auth.resetPassword.toast.generalError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex flex-col lg:flex-row lg:overflow-hidden">
      {/* Hero Section - Hidden on mobile, reused from Login */}
      <LoginHero />

      {/* Reset Password Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10 bg-gradient-to-br from-secondary-600/20 to-primary-600/20">
        <div className="w-full max-w-lg reveal">
          {/* Page heading */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary-500 via-primary-500/85 to-secondary-500 bg-clip-text text-transparent leading-tight" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
              {getContent('auth.resetPassword.title')}
            </h1>
            <p className="mt-2 text-sm font-medium text-neutral-600">
              {getContent('auth.resetPassword.subtitle')}
            </p>
          </div>

          <Card variant="default" className="w-full shadow-lg backdrop-blur-md p-6">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Token Field - Hidden since token is from URL params */}
              <input
                type="hidden"
                value={token}
              />

              {/* New Password Field */}
              <div>
                <label htmlFor="password" className="block text-md font-medium text-primary-700 mb-1">
                  {getContent('auth.resetPassword.newPassword')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordStrength(validatePasswordStrength(e.target.value));
                    }}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg transition-colors duration-200 ${
                      password && !passwordStrength.isValid ? 'border-error-500 bg-error-50' : 'border-neutral-300 bg-white'
                    } ${createFocusEffect.password('md')}`}
                    placeholder={getContent('auth.resetPassword.newPasswordPlaceholder')}
                    disabled={isLoading}
                  />
                  {password && !passwordStrength.isValid && (
                    <p className="mt-1 text-sm text-error-600">{getContent(passwordStrength.messageKey)}</p>
                  )}
                  {password && passwordStrength.isValid && (
                    <p className="mt-1 text-sm text-green-600">✓ {getContent('auth.resetPassword.passwordValid')}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-md font-medium text-primary-700 mb-1">
                  {getContent('auth.resetPassword.confirmPassword')}
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg transition-colors duration-200 border-neutral-300 bg-white ${createFocusEffect.password('md')}`}
                    placeholder={getContent('auth.resetPassword.confirmPasswordPlaceholder')}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-2xl p-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${createFocusEffect.input('md', 'primary')}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span>{getContent('auth.resetPassword.submitting')}</span>
                  </div>
                ) : (
                  getContent('auth.resetPassword.submit')
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
              </div>

              {/* Back to Login */}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                {getContent('auth.resetPassword.backToLogin')}
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};


