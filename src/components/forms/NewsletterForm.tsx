/**
 * Newsletter Signup Form Component
 * Captures email addresses for newsletter subscriptions
 */

import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useFormTracking } from '../../hooks/useConversionTracking';
import { cn } from '../../utils/cn';

interface NewsletterFormProps {
  className?: string;
  variant?: 'inline' | 'modal' | 'footer';
  onSuccess?: (email: string) => void;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  className,
  variant = 'inline',
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { trackSubmit, trackFieldFocus, trackFieldBlur, trackFieldError } = useFormTracking({
    formType: 'newsletter',
    formId: 'newsletter_signup',
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Please enter your email address');
      trackFieldError('email');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      trackFieldError('email');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In production, send to backend
      // await api.post('/newsletter/subscribe', { email });

      setStatus('success');
      trackSubmit(true, undefined, ['email']);
      
      if (onSuccess) {
        onSuccess(email);
      }

      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail('');
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to subscribe. Please try again.');
      trackSubmit(false, 'subscription_failed', ['email']);
    }
  };

  const isInline = variant === 'inline';
  const isFooter = variant === 'footer';

  return (
    <div className={cn('w-full', className)}>
      {status === 'success' ? (
        <div className="flex items-center justify-center space-x-3 p-4 bg-success-50 border border-success-200 rounded-xl">
          <CheckCircle className="w-6 h-6 text-success-600" />
          <p className="text-success-800 font-medium">
            Thanks for subscribing! Check your email.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={cn(
            'flex',
            isInline ? 'flex-row gap-3' : 'flex-col gap-4'
          )}>
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-neutral-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => trackFieldFocus('email')}
                onBlur={() => trackFieldBlur('email')}
                placeholder="Enter your email"
                disabled={status === 'loading'}
                className={cn(
                  'w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  errorMessage
                    ? 'border-error-300 bg-error-50'
                    : 'border-neutral-300 bg-white hover:border-neutral-400',
                  isFooter && 'bg-white/10 border-white/20 text-white placeholder-white/60'
                )}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                isFooter
                  ? 'bg-white text-primary-600 hover:bg-neutral-100'
                  : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg',
                isInline ? 'whitespace-nowrap' : 'w-full'
              )}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>

          {errorMessage && (
            <div className="flex items-center space-x-2 text-error-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMessage}</span>
            </div>
          )}

          <p className={cn(
            'text-sm',
            isFooter ? 'text-white/70' : 'text-neutral-500'
          )}>
            Join 10,000+ professionals getting weekly insights. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
};
