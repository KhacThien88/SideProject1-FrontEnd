import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../../../../components/Router';
import { useTranslation } from '../../../../hooks/useTranslation';
import { Card } from '../../../../components/ui/Card';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import { useToast } from '../../../../contexts/ToastContext';
import { useAuth } from '../../../../contexts/auth/AuthContext';
import { AuthApiService, TokenManager } from '../../../../services/api/authService';
import { createFocusEffect } from '../../../../utils/focusEffects';

// Google Identity Services types
declare global {
  interface Window {
    google: {
      accounts: {
          id: {
            initialize: (config: any) => void;
            renderButton: (parent: HTMLElement, options?: any) => void;
            prompt: () => void;
            disableAutoSelect: () => void;
            revoke: (email: string, callback: () => void) => void;
        };
      };
    };
  }
}

interface LoginFormProps {
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { getContent } = useTranslation();
  const { showErrorToast, showSuccessToast } = useToast();
  const { login, isLoading: authLoading } = useAuth();
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingAny = isLoading || authLoading;
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const googleBtnContainerRef = useRef<HTMLDivElement | null>(null);
  // removed in-place forgot/reset UI; use dedicated pages
  const googleButtonRenderedRef = useRef(false);

  const waitForGsiReady = async (timeoutMs: number = 5000): Promise<void> => {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const check = () => {
        if (typeof window !== 'undefined' && (window as any)?.google?.accounts?.id) {
          resolve();
          return;
        }
        if (Date.now() - start > timeoutMs) {
          reject(new Error('Google Identity Services not loaded'));
          return;
        }
        setTimeout(check, 100);
      };
      check();
    });
  };

  // Initialize Google Sign-In library and render hidden official button
  const initializeGoogleSignIn = async () => {
    try {
      // Wait for GSI script readiness
      await waitForGsiReady(7000);

      // Initialize Google Sign In with default settings for full account picker
      console.log('[Google Sign-In:init] client_id, origin:', import.meta.env.VITE_GOOGLE_CLIENT_ID, window.location.origin);
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id',
        callback: async (response: any) => {
          try {
            const tokenResponse = await AuthApiService.googleAuth(response.credential);
            TokenManager.storeTokens({
              access_token: tokenResponse.access_token,
              refresh_token: tokenResponse.refresh_token,
              expires_in: tokenResponse.expires_in,
            });
            showSuccessToast(getContent('auth.login.toast.loginSuccess'));
          } catch (error: any) {
            console.error('Google login error:', error);
            // If backend requires role selection for new Google users, redirect to role selection page
            if (error?.message === 'ROLE_SELECTION_REQUIRED') {
              try {
                const parts = response.credential.split('.');
                const payload = parts[1];
                const padded = payload + '='.repeat((4 - payload.length % 4) % 4);
                const decoded = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
                const data = JSON.parse(decoded);

                // Persist role selection state for custom router navigation
                sessionStorage.setItem('roleSelectionState', JSON.stringify({
                  email: data.email,
                  name: data.name,
                  googleId: data.sub,
                  avatar: data.picture,
                  googleToken: response.credential,
                }));
                navigate('/role-selection');
                return;
              } catch (e) {
                console.error('Failed to decode Google credential for role selection:', e);
              }
            }
            showErrorToast(error.message || getContent('auth.login.toast.loginError'));
          } finally {
            setIsLoading(false);
          }
        }
      });

      // Render hidden Google button for proper account picker UI
      const parent = googleBtnContainerRef.current;
      if (parent) {
        parent.innerHTML = '';
        window.google.accounts.id.renderButton(parent, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
        });
      }

      googleButtonRenderedRef.current = true;
      setIsLoading(false);
    } catch (error: any) {
      console.error('Google Sign In initialization error:', error);
      showErrorToast(error.message || getContent('auth.login.toast.loginError'));
      setIsLoading(false);
    }
  };

  // Handle custom button click - triggers the hidden Google button
  const handleGoogleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Click the hidden Google button to trigger full account picker
    const googleBtn = googleBtnContainerRef.current?.querySelector('div[role="button"]') as HTMLElement;
    if (googleBtn) {
      googleBtn.click();
      // Remove focus from custom button to prevent color loss after popup closes
      (e.currentTarget as HTMLButtonElement).blur();
    } else {
      showErrorToast('Google Sign-In not ready');
    }
  };

  // Render Google button on mount so user can click directly
  useEffect(() => {
    (async () => {
      try {
        await initializeGoogleSignIn();
      } catch {
        // ignore, handled in handler
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // No hash-based forgot/reset here anymore

  const validateForm = () => {
    let hasErrors = false;

    // Validate email with specific cases
    if (!formData.email || formData.email.trim() === '') {
      showErrorToast(getContent('auth.login.toast.emailRequired'));
      hasErrors = true;
    } else {
      const email = formData.email.trim();
      // Check if contains @
      if (!email.includes('@')) {
        showErrorToast(`Email '${email}' ${getContent('auth.login.toast.emailMissingAt')}`);
        hasErrors = true;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        // Check other specific cases
        if (email.startsWith('@')) {
          showErrorToast(getContent('auth.login.toast.emailStartsWithAt'));
        } else if (email.endsWith('@')) {
          showErrorToast(`Email '${email}' ${getContent('auth.login.toast.emailMissingDomain')}`);
        } else if (!email.includes('.') || email.split('@')[1]?.split('.').length < 2) {
          showErrorToast(getContent('auth.login.toast.emailMissingTLD'));
        } else {
          showErrorToast(getContent('auth.login.toast.emailInvalid'));
        }
        hasErrors = true;
      }
    }

    // Validate password
    if (!formData.password || formData.password.trim() === '') {
      showErrorToast(getContent('auth.login.toast.passwordRequired'));
      hasErrors = true;
    }

    return !hasErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Handle custom onSubmit or use AuthContext
      if (onSubmit) {
        await onSubmit(formData.email, formData.password, formData.rememberMe);
        showSuccessToast(getContent('auth.login.toast.loginSuccess'));
      } else {
        // Use AuthContext for real API call
        await login(formData.email, formData.password);
        showSuccessToast(getContent('auth.login.toast.loginSuccess'));
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Display specific error based on error type
      const errorMessage = err.message || '';
      if (errorMessage.includes('invalid credentials')) {
        showErrorToast(getContent('auth.login.toast.invalidCredentials'));
      } else if (errorMessage.includes('network')) {
        showErrorToast(getContent('auth.login.toast.networkError'));
      } else {
        showErrorToast(getContent('auth.login.toast.loginFailed'));
      }
    } finally {
      setIsLoading(false);
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
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-md font-medium text-primary-700 mb-1">
            {getContent('auth.login.email')}
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
                showErrorToast(getContent('auth.login.toast.emailRequired'));
              } else if (!email.includes('@')) {
                showErrorToast(`Email '${email}' ${getContent('auth.login.toast.emailMissingAt')}`);
              } else {
                showErrorToast(getContent('auth.login.toast.emailInvalid'));
              }
            }}
            onInput={(e) => {
              // Clear custom validity when user starts typing
              (e.target as HTMLInputElement).setCustomValidity('');
            }}
            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
              errors.email ? 'border-error-500 bg-error-50' : 'border-neutral-300 bg-white'
            } ${createFocusEffect.email('md')}`}
            placeholder={getContent('auth.login.emailPlaceholder')}
            disabled={isLoadingAny}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-600">{errors.email}</p>
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
              className={`w-full px-3 py-2 pr-12 border rounded-lg transition-colors duration-200 ${
                errors.password ? 'border-error-500 bg-error-50' : 'border-neutral-300 bg-white'
              } ${createFocusEffect.password('md')}`}
              placeholder={getContent('auth.login.passwordPlaceholder')}
              disabled={isLoadingAny}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-btn absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-primary-600 transition-colors duration-200 focus:outline-none"
              disabled={isLoadingAny}
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
              className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:outline-none"
              disabled={isLoadingAny}
            />
            <label htmlFor="remember-me" className="ml-2 text-sm font-semibold text-neutral-700">
              {getContent('auth.login.rememberMe')}
            </label>
          </div>
          <a 
            href="/forgot-password" 
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/forgot-password');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className={`text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors rounded ${createFocusEffect.input('sm', 'primary')}`}
          >
            {getContent('auth.login.forgotPassword')}
          </a>
        </div>

        {/* Login Button (match Google button width) */}
        <div className="w-full flex items-center justify-center" style={{ width: '100%', maxWidth: 380, margin: '0 auto' }}>
          <button
            type="submit"
            disabled={isLoadingAny}
            className={`w-full bg-gradient-to-r from-primary-100/95 to-secondary-50/95 hover:from-primary-100/90 hover:to-secondary-100/80 rounded-2xl p-3 border border-neutral-200/70 hover:border-primary-200/60 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${createFocusEffect.input('md', 'primary')}`}
          >
            <span className="font-semibold text-sm text-primary-700 hover:text-primary-800 transition-colors duration-200">
              {isLoadingAny ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="sm" variant="neutral" className="mr-2" />
                  {getContent('auth.login.loggingIn')}
                </div>
              ) : (
                getContent('auth.login.loginButton')
              )}
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mt-4 mx-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">
              {getContent('auth.login.or')}
            </span>
          </div>
        </div>

        {/* Custom Google Sign-In Button */}
        <div className="w-full flex items-center justify-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoadingAny}
            className={`w-full max-w-[380px] flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-100/95 to-secondary-50/95 hover:from-primary-100/90 hover:to-secondary-100/80 rounded-2xl p-3 border border-neutral-200/70 hover:border-primary-200/60 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${createFocusEffect.input('md', 'primary')}`}
          >
            {/* Google Logo SVG */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
              <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
              <path d="M4.405 11.9a6.015 6.015 0 010-3.8V5.51H1.064a9.996 9.996 0 000 8.98L4.405 11.9z" fill="#FBBC05"/>
              <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.192 5.736 7.396 3.977 10 3.977z" fill="#EA4335"/>
            </svg>

            <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-800 transition-colors duration-200">
              {isLoadingAny ? getContent('auth.login.loggingIn') : getContent('auth.login.googleLogin')}
            </span>
          </button>
        </div>

        {/* Hidden Google Button Container - triggers full account picker */}
        <div 
          ref={googleBtnContainerRef}
          className="hidden"
          aria-hidden="true"
        />
      </form>

      {/* Sign Up Link */}
      <div className="text-center mt-4 mb-4">
        <div className="text-sm text-neutral-600">
          {getContent('auth.login.noAccount')}{' '}
          <a 
            href="#register"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#register';
              window.location.reload();
            }}
            className={`text-primary-600 hover:text-primary-500 font-medium transition-colors rounded ${createFocusEffect.input('sm', 'primary')}`}
          >
            {getContent('auth.login.signUp')}
          </a>
        </div>
      </div>
    </Card>
    </div>
  );
};