import React, { useState, useRef } from 'react';
import { useTranslation } from '../../../../hooks/useTranslation';
import { Card } from '../../../../components/ui/Card';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import { useToast } from '../../../../contexts/ToastContext';
import { useRouter } from '../../../../components/Router';
import { useValidation } from '../../../../hooks/useValidation';
import { AuthApiService, ApiErrorHandler } from '../../../../services/api/authService';
import { createFocusEffect } from '../../../../utils/focusEffects';
import { z } from 'zod';
import { ArrowLeft, CheckCircle } from 'lucide-react';

// Forgot Password Schema
const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, 'validation.emailRequired')
    .email('validation.emailInvalid'),
});

interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => Promise<void>;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit }) => {
  const { getContent } = useTranslation();
  const { showErrorToast, showSuccessToast } = useToast();
  const { navigate } = useRouter();
  
  const { 
    values, 
    errors, 
    setValue, 
    setFieldTouched,
    validateForm: validateFormData 
  } = useValidation(forgotPasswordSchema, {
    email: '',
  }, {
    validateOnChange: true,
    validateOnBlur: true,
    debounceMs: 300,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [blurErrors, setBlurErrors] = useState<Record<string, string | null>>({});
  const isSubmittingRef = useRef(false);

  // Function to handle blur validation
  const handleBlurValidation = (value: any) => {
    setFieldTouched('email');
    
    let errorMessage = null;
    if (!value || value.trim() === '') {
      errorMessage = getContent('validation.emailRequired');
    }

    setBlurErrors({ email: errorMessage });
  };

  // Function to clear blur error
  const clearBlurError = () => {
    if (blurErrors.email) {
      setBlurErrors({ email: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    
    // Clear blur errors
    setBlurErrors({});
    
    // Validate
    const isValid = await validateFormData();
    
    if (!isValid) {
      isSubmittingRef.current = false;
      showErrorToast(getContent('validation.emailInvalid'));
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (onSubmit) {
        await onSubmit(values.email);
      } else {
        // Call real API
        await AuthApiService.forgotPassword(values.email);
      }
      
      setIsSubmitted(true);
      showSuccessToast(getContent('auth.forgotPassword.toast.success'));
    } catch (err: any) {
      console.error('Forgot password error:', err);
      
      // Handle specific error cases
      const errorMessage = ApiErrorHandler.handleError(err);
      
      if (errorMessage.includes('not found') || errorMessage.includes('not exist') || errorMessage.includes('Không tìm thấy tài khoản')) {
        showErrorToast(getContent('auth.forgotPassword.toast.emailNotFound'));
      } else if (errorMessage.includes('timeout') || errorMessage.includes('network')) {
        showErrorToast(getContent('auth.forgotPassword.toast.networkError'));
      } else if (errorMessage.includes('email') && errorMessage.includes('invalid')) {
        showErrorToast(getContent('auth.forgotPassword.toast.emailInvalid'));
      } else {
        showErrorToast(errorMessage || getContent('auth.forgotPassword.toast.failed'));
      }
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  if (isSubmitted) {
    return (
      <Card variant="default" className="w-full shadow-lg backdrop-blur-md p-6">
        <div className="text-center space-y-4">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
          
          {/* Success Title */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-primary-600 to-primary-500 bg-clip-text text-transparent mb-2">
              {getContent('auth.forgotPassword.successTitle')}
            </h2>
            <p className="text-neutral-700 text-sm">
              {getContent('auth.forgotPassword.checkEmailMessage')}
            </p>
          </div>
          
          {/* Email Info */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-4 border border-primary-100">
            <p className="text-neutral-600 text-sm">
              {getContent('auth.forgotPassword.emailSentTo')}
            </p>
            <p className="text-primary-700 font-semibold mt-1 break-all">{values.email}</p>
          </div>
          
          {/* Back to Login Button */}
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-2xl p-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {getContent('auth.forgotPassword.backToLogin')}
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="default" className="w-full shadow-lg backdrop-blur-md p-6">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-md font-medium text-primary-700 mb-1">
            {getContent('auth.login.email')}
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => {
              setValue('email', e.target.value);
              clearBlurError();
            }}
            onBlur={() => handleBlurValidation(values.email)}
            className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
              errors.email || blurErrors.email
                ? 'border-error-500 bg-error-50' 
                : 'border-neutral-300 bg-white'
            } ${createFocusEffect.email('md')}`}
            placeholder={getContent('auth.login.emailPlaceholder')}
            autoComplete="email"
            disabled={isLoading}
          />
          {blurErrors.email && (
            <p className="mt-1 text-sm text-error-600">{blurErrors.email}</p>
          )}
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
              <span>{getContent('auth.forgotPassword.sending')}</span>
            </div>
          ) : (
            getContent('auth.forgotPassword.sendResetLink')
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
          {getContent('auth.forgotPassword.backToLogin')}
        </button>
      </form>
    </Card>
  );
};
