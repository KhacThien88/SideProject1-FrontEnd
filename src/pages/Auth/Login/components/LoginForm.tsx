import React, { useState } from 'react';
import { useTranslation } from '../../../../hooks/useTranslation';
import { LoginCard } from './LoginCard';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';

interface LoginFormProps {
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { getContent } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = getContent('auth.login.emailRequired') || 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = getContent('auth.login.emailInvalid') || 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = getContent('auth.login.passwordRequired') || 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = getContent('auth.login.passwordMinLength') || 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Handle custom onSubmit or default behavior
    if (onSubmit) {
      onSubmit(formData.email, formData.password, formData.rememberMe);
    } else {
      // Default simulation
      setTimeout(() => {
        setIsLoading(false);
        // Handle remember me
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        alert('Đăng nhập thành công! (Demo UI)');
      }, 2000);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full">
      {/* Header Outside Card */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 via-primary-500/80 via-secondary-500/80 to-secondary-500 bg-clip-text text-transparent">
            {getContent('auth.login.title')}
          </h1>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary-500 via-secondary-400/80 via-primary-500/80 to-primary-500 bg-clip-text text-transparent">
            {getContent('auth.login.subtitle')}
          </h1>
        </div>
        <p className="text-sm font-medium text-neutral-600">
          {getContent('auth.login.welcomeSubtitle')}
        </p>
      </div>

      <LoginCard variant="elevated" className="w-full shadow-lg backdrop-blur-md">
        {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-1">
            {getContent('auth.login.email')}
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:border-primary-500 ${
              errors.email ? 'border-error-500 bg-error-50' : 'border-neutral-300 bg-white'
            }`}
            placeholder={getContent('auth.login.emailPlaceholder')}
            disabled={isLoading}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-600">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-1">
            {getContent('auth.login.password')}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
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
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 rounded"
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
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:outline-none border-neutral-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-neutral-700">
              {getContent('auth.login.rememberMe')}
            </label>
          </div>
          <a 
            href="#forgot-password" 
            className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 rounded"
          >
            {getContent('auth.login.forgotPassword')}
          </a>
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
        <button
          type="button"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary-100/95 to-secondary-50/95 hover:from-primary-100/90 hover:to-secondary-100/80 rounded-2xl p-3 border border-neutral-200/70 hover:border-primary-200/60 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-primary-800">
              {getContent('auth.login.googleLogin')}
            </span>
          </div>
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center mt-8">
        <p className="text-sm text-neutral-600">
          {getContent('auth.login.noAccount')}{' '}
          <a 
            href="#register" 
            className="text-primary-600 hover:text-primary-500 font-medium transition-colors focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 rounded"
          >
            {getContent('auth.login.signUp')}
          </a>
        </p>
      </div>
    </LoginCard>
    </div>
  );
};