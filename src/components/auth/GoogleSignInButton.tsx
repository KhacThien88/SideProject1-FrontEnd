import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { googleOAuthService } from '../../services/auth/googleOAuthService';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useTranslation } from '../../hooks/useTranslation';

// Add custom styles for Google button override
const googleButtonStyles = `
  .google-signin-button > div > div {
    border-radius: 1rem !important;
    border: 1px solid rgb(229 231 235 / 0.7) !important;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
    transition: all 0.2s !important;
    background: linear-gradient(to right, rgb(239 246 255 / 0.95), rgb(254 252 232 / 0.95)) !important;
  }
  
  .google-signin-button > div > div:hover {
    border-color: rgb(147 197 253 / 0.6) !important;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
    background: linear-gradient(to right, rgb(239 246 255 / 0.9), rgb(254 249 195 / 0.8)) !important;
  }
  
  .google-signin-button > div > div > div[role="button"] {
    font-weight: 500 !important;
    color: rgb(30 64 175) !important;
  }
`;

// Props interface for GoogleSignInButton
interface GoogleSignInButtonProps {
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  width?: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  className?: string;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  theme = 'outline',
  size = 'large',
  text = 'signin_with',
  shape = 'rectangular',
  width = 250,
  onSuccess,
  onError,
  disabled = false,
  className = '',
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { googleSignIn } = useAuth();
  const { getContent } = useTranslation();

  // Initialize Google OAuth service
  useEffect(() => {
    const initializeGoogle = async () => {
      try {
        // Inject custom styles for Google button
        if (!document.getElementById('google-button-styles')) {
          const styleSheet = document.createElement('style');
          styleSheet.id = 'google-button-styles';
          styleSheet.textContent = googleButtonStyles;
          document.head.appendChild(styleSheet);
        }
        
        await googleOAuthService.initialize();
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize Google OAuth:', err);
        setError('Failed to load Google Sign-In');
      }
    };

    initializeGoogle();
  }, []);

  // Render Google button when component is initialized
  useEffect(() => {
    if (isInitialized && buttonRef.current && !disabled) {
      try {
        // Configure OAuth service with callback
        googleOAuthService.configureGoogleSignIn(handleGoogleResponse);
        
        // Render the button
        googleOAuthService.renderButton(buttonRef.current, {
          theme,
          size,
          text,
          shape,
          width,
        });
      } catch (err) {
        console.error('Failed to render Google button:', err);
        setError('Failed to render Google Sign-In button');
      }
    }
  }, [isInitialized, theme, size, text, shape, width, disabled]);

  // Handle Google OAuth response
  const handleGoogleResponse = async (response: any) => {
    if (!response.credential) {
      const errorMsg = 'No credential received from Google';
      console.error(errorMsg);
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use the auth context's googleSignIn method
      await googleSignIn();
      
      onSuccess?.();
    } catch (err: any) {
      const errorMessage = err.message || 'Google sign-in failed';
      console.error('Google sign-in error:', err);
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle manual button click - trigger Google OAuth flow
  const handleManualSignIn = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // Try to trigger Google's OAuth flow directly
      if (isInitialized) {
        await googleOAuthService.signIn();
      } else {
        // Fallback to auth context method
        await googleSignIn();
      }
      onSuccess?.();
    } catch (err: any) {
      const errorMessage = err.message || 'Google sign-in failed';
      console.error('Google sign-in error:', err);
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className={className}>
        <button
          disabled
          className="w-full bg-gradient-to-r from-primary-100/95 to-secondary-50/95 rounded-2xl p-3 border border-neutral-200/70 shadow-sm opacity-50 cursor-not-allowed"
        >
          <span className="font-medium text-primary-800">
            <div className="flex items-center justify-center space-x-2">
              <LoadingSpinner size="sm" variant="neutral" />
              <span>{getContent('auth.googleSigningIn')}</span>
            </div>
          </span>
        </button>
      </div>
    );
  }

  // Show error state with fallback button
  if (error || !isInitialized) {
    return (
      <div className={className}>
        <button
          onClick={handleManualSignIn}
          disabled={disabled || isLoading}
          className="w-full bg-gradient-to-r from-primary-100/95 to-secondary-50/95 hover:from-primary-100/90 hover:to-secondary-100/80 rounded-2xl p-3 border border-neutral-200/70 hover:border-primary-200/60 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <span className="font-medium text-primary-800">
            <div className="flex items-center justify-center space-x-2">
              <GoogleIcon />
              <span>{getContent('auth.continueWithGoogle')}</span>
            </div>
          </span>
        </button>
        
        {error && (
          <p className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }

  // Always render our custom styled button for consistency
  return (
    <div className={className}>
      <button
        onClick={handleManualSignIn}
        disabled={disabled || isLoading}
        className="w-full bg-gradient-to-r from-primary-100/95 to-secondary-50/95 hover:from-primary-100/90 hover:to-secondary-100/80 rounded-2xl p-3 border border-neutral-200/70 hover:border-primary-200/60 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        <span className="font-medium text-primary-800">
          <div className="flex items-center justify-center space-x-2">
            <GoogleIcon />
            <span>{getContent('auth.continueWithGoogle')}</span>
          </div>
        </span>
      </button>
      
      {/* Hidden Google button for OAuth functionality */}
      <div
        ref={buttonRef}
        className="hidden google-signin-button"
        style={{ width }}
      />
    </div>
  );
};

// Google Icon Component
const GoogleIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default GoogleSignInButton;