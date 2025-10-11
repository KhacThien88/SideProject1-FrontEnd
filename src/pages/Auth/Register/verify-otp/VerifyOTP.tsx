import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useOnReveal } from '../../../../hooks/useOnReveal';
import { useRouter } from '../../../../components/Router';
import { useToast } from '../../../../contexts/ToastContext';
import { useTranslation } from '../../../../hooks/useTranslation';
import { LanguageToggle } from '../../../../components/common/LanguageToggle';
import { ShieldCheck, Send, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export const VerifyOTP: React.FC = () => {
  useOnReveal('.reveal');
  const { navigate } = useRouter();
  const { showErrorToast, showSuccessToast } = useToast();
  const { getContent } = useTranslation();

  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remaining, setRemaining] = useState<number>(RESEND_SECONDS);
  const [resendCount, setResendCount] = useState<number>(0);
  const [hasError, setHasError] = useState(false);
  const [email] = useState<string>('user@example.com'); // TODO: Get from props/context
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(OTP_LENGTH).fill(null));

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // countdown timer with clamp
  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining((s) => Math.max(s - 1, 0)), 1000);
    return () => clearInterval(t);
  }, [remaining]);

  const canResend = remaining <= 0 && resendCount < 3;

  const handleChange = (index: number, value: string) => {
    const sanitized = value.replace(/\D/g, '').slice(0, 1);
    setOtpDigits(prev => {
      const next = [...prev];
      if (sanitized) {
        next[index] = sanitized;
        // Clear error state when user starts typing
        if (hasError) setHasError(false);
        // push overflow to next boxes if user types fast
        if (index < OTP_LENGTH - 1 && !prev[index + 1]) {
          inputRefs.current[index + 1]?.focus();
        }
      } else {
        next[index] = '';
      }
      return next;
    });
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (otpDigits[index]) {
        // clear but keep focus on current
        setOtpDigits(prev => {
          const next = [...prev];
          next[index] = '';
          return next;
        });
        e.preventDefault();
        return;
      }
      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
    if (e.key === 'Home') inputRefs.current[0]?.focus();
    if (e.key === 'End') inputRefs.current[OTP_LENGTH - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill('');
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setOtpDigits(next);
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleVerification(otpDigits.join(''));
  };

  const handleVerification = useCallback(async (code: string) => {
    if (isSubmitting || code.length !== OTP_LENGTH) return;
    setIsSubmitting(true);
    setHasError(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Simulate verification failure for demo
      if (code === '123456') {
        throw new Error('Invalid OTP');
      }
      
      showSuccessToast(getContent('auth.verifyOTP.toast.verificationSuccess'), getContent('auth.verifyOTP.toast.verificationSuccessSubtitle'));
      setTimeout(() => navigate('/login', 'slide-left'), 600);
    } catch (error) {
      setHasError(true);
      showErrorToast(getContent('auth.verifyOTP.toast.verificationFailed'), getContent('auth.verifyOTP.toast.verificationFailedSubtitle'));
      // Clear OTP fields on error
      setOtpDigits(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, navigate, showErrorToast, showSuccessToast, getContent]);

  const handleResend = async () => {
    if (!canResend) return;
    showSuccessToast(getContent('auth.verifyOTP.toast.resendSuccess'), getContent('auth.verifyOTP.toast.resendSuccessSubtitle'));
    setResendCount((c) => c + 1);
    setRemaining(RESEND_SECONDS);
    // reset OTP fields
    setOtpDigits(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
  };

  // Debounced auto-submit when enough digits
  useEffect(() => {
    const code = otpDigits.join('');
    if (code.length !== OTP_LENGTH) return;
    const t = setTimeout(() => handleVerification(code), 200);
    return () => clearTimeout(t);
  }, [otpDigits]);

  // Circular progress component
  const CircularProgress = ({ progress, size = 32 }: { progress: number; size?: number }) => {
    const radius = (size - 4) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-primary-500 transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Clock className="w-3 h-3 text-primary-500" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen lg:h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex lg:overflow-hidden">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageToggle />
      </div>
      
      {/* Right content area with inner gradient like Register */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10 lg:py-8 bg-gradient-to-br from-secondary-600/20 to-primary-600/20">
        {/* Gradient border card */}
        <div className="w-full max-w-xl reveal p-[1px] rounded-[1.75rem] bg-gradient-to-br from-primary-300/60 via-white to-secondary-300/60 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
          <div className="rounded-[1.65rem] bg-white/80 backdrop-blur-xl border border-white/40 p-6 sm:p-10">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-500 via-primary-500/85 to-secondary-500 bg-clip-text text-transparent">
                {getContent('auth.verifyOTP.title')}
              </h1>
              <p className="mt-3 text-sm font-medium text-neutral-600">
                {getContent('auth.verifyOTP.subtitle')}
              </p>
              
              {/* Email Display */}
              <div className="mt-2 flex items-center justify-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary-500" />
                <span className="font-semibold text-primary-600">{email}</span>
              </div>
              
              {/* Timer with Circular Progress */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <CircularProgress progress={(remaining / RESEND_SECONDS) * 100} size={28} />
                <span className="text-xs text-neutral-500">
                  {getContent('auth.verifyOTP.timerLabel')} <span className="font-semibold text-primary-600">{remaining}s</span>
                </span>
              </div>
            </div>

            {/* OTP Input Section */}
            <form onSubmit={handleSubmit} aria-label="One-time password verification" role="group">
              <div className={`flex items-center justify-center gap-2 sm:gap-3 mb-6 transition-all duration-300 ${hasError ? 'animate-shake' : ''}`}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => { inputRefs.current[idx] = el; }}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    aria-label={`Digit ${idx + 1}`}
                    enterKeyHint="done"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={handlePaste}
                    onFocus={(e) => (e.target as HTMLInputElement).select()}
                    className={`otp-input-ultra w-12 h-14 sm:w-16 sm:h-18 text-center text-xl sm:text-2xl font-semibold font-mono border rounded-2xl bg-white shadow-sm disabled:opacity-70 ${
                      hasError ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-200'
                    }`}
                    disabled={isSubmitting}
                  />
                ))}
              </div>
              
              {/* Error Message */}
              {hasError && (
                <div className="mb-6 flex items-center justify-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4" />
                  <span>{getContent('auth.verifyOTP.errorMessage')}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting || otpDigits.join('').length !== OTP_LENGTH}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-2xl p-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:outline-none focus:ring-0 focus:shadow-primary-500/30 focus:shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      {getContent('auth.verifyOTP.verifyingButton')}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      {getContent('auth.verifyOTP.verifyButton')}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all duration-200 border ${canResend ? 'text-primary-600 border-primary-300 hover:bg-primary-50' : 'text-neutral-400 border-neutral-200 cursor-not-allowed'}`}
                >
                  <Send className="w-4 h-4" />
                  {canResend ? getContent('auth.verifyOTP.resendAvailable').replace('{count}', (3 - resendCount).toString()) : getContent('auth.verifyOTP.resendCountdown').replace('{seconds}', remaining.toString())}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


