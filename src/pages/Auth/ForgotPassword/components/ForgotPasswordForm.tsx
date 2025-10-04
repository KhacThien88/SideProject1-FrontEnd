import React, { useState, useRef } from 'react';
import { useTranslation } from '../../../../hooks/useTranslation';
import { Card } from '../../../../components/ui/Card';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import { useToast } from '../../../../contexts/ToastContext';
import { useRouter } from '../../../../components/Router';
import { ValidationInput } from '../../../../components/ui/ValidationInput';
import { useValidation } from '../../../../hooks/useValidation';
import { z } from 'zod';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

// Forgot Password Schema
const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, 'Email là bắt buộc')
    .email('Email không đúng định dạng'),
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
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      
      setIsSubmitted(true);
      showSuccessToast(getContent('auth.forgotPassword.successMessage'));
    } catch (err: any) {
      console.error('Forgot password error:', err);
      showErrorToast(
        getContent('auth.forgotPassword.errorMessage'),
        getContent('validation.generalError')
      );
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full mb-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 via-green-500/80 via-primary-500/80 to-primary-500 bg-clip-text text-transparent" style={{ lineHeight: '1.3'}}>
              {getContent('auth.forgotPassword.successTitle')}
            </h1>
          </div>
        </div>

        <Card variant="default" className="w-full shadow-lg backdrop-blur-md p-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            
            <p className="text-neutral-700 text-sm">
              {getContent('auth.forgotPassword.checkEmailMessage')}
            </p>
            
            <p className="text-neutral-600 text-xs">
              {getContent('auth.forgotPassword.emailSentTo')}: <strong>{values.email}</strong>
            </p>
            
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-2xl p-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {getContent('auth.forgotPassword.backToLogin')}
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full mb-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 via-primary-500/80 via-secondary-500/80 to-secondary-500 bg-clip-text text-transparent" style={{ lineHeight: '1.3'}}>
            {getContent('auth.forgotPassword.title')}
          </h1>
        </div>
      </div>

      <Card variant="default" className="w-full shadow-lg backdrop-blur-md p-6">
        <p className="text-sm text-neutral-600 mb-6 text-center">
          {getContent('auth.forgotPassword.subtitle')}
        </p>

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
                clearBlurError();
              }}
              onBlur={() => handleBlurValidation(values.email)}
              validation={errors.email}
              placeholder={getContent('auth.login.emailPlaceholder')}
              autoComplete="email"
              disabled={isLoading}
              icon={<Mail className="w-4 h-4" />}
            />
            {blurErrors.email && (
              <div className="text-xs text-red-500 mt-1">
                {blurErrors.email}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-2xl p-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
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
            className="w-full flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            {getContent('auth.forgotPassword.backToLogin')}
          </button>
        </form>
      </Card>
    </div>
  );
};
