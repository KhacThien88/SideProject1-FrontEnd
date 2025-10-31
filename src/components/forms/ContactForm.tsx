/**
 * Contact Form Component
 * General contact form for inquiries
 */

import React, { useState } from 'react';
import { Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { useFormTracking } from '../../hooks/useConversionTracking';
import { cn } from '../../utils/cn';

interface ContactFormProps {
  className?: string;
  onSuccess?: (data: ContactFormData) => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  className,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const { trackSubmit, trackFieldFocus, trackFieldBlur, trackFieldError } = useFormTracking({
    formType: 'contact',
    formId: 'contact_form',
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      trackFieldError('name');
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      trackFieldError('email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      trackFieldError('email');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      trackFieldError('subject');
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      trackFieldError('message');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      trackFieldError('message');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In production, send to backend
      // await api.post('/contact', formData);

      setStatus('success');
      trackSubmit(true, undefined, Object.keys(formData));

      if (onSuccess) {
        onSuccess(formData);
      }

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      trackSubmit(false, 'contact_failed', Object.keys(formData));
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (status === 'success') {
    return (
      <div className={cn('p-8 bg-success-50 border border-success-200 rounded-2xl', className)}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
          <h3 className="text-2xl font-bold text-success-900">Message Sent!</h3>
          <p className="text-success-700">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('p-8 bg-white rounded-2xl shadow-lg', className)}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-neutral-700 mb-2">
            Your Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-neutral-400" />
            </div>
            <input
              id="contact-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onFocus={() => trackFieldFocus('name')}
              onBlur={() => trackFieldBlur('name')}
              disabled={status === 'loading'}
              className={cn(
                'w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                errors.name ? 'border-error-300 bg-error-50' : 'border-neutral-300 bg-white'
              )}
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-error-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-neutral-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-neutral-400" />
            </div>
            <input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onFocus={() => trackFieldFocus('email')}
              onBlur={() => trackFieldBlur('email')}
              disabled={status === 'loading'}
              className={cn(
                'w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                errors.email ? 'border-error-300 bg-error-50' : 'border-neutral-300 bg-white'
              )}
              placeholder="john@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-error-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="contact-subject" className="block text-sm font-semibold text-neutral-700 mb-2">
            Subject *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MessageSquare className="w-5 h-5 text-neutral-400" />
            </div>
            <input
              id="contact-subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              onFocus={() => trackFieldFocus('subject')}
              onBlur={() => trackFieldBlur('subject')}
              disabled={status === 'loading'}
              className={cn(
                'w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                errors.subject ? 'border-error-300 bg-error-50' : 'border-neutral-300 bg-white'
              )}
              placeholder="How can we help?"
            />
          </div>
          {errors.subject && (
            <p className="mt-1 text-sm text-error-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="contact-message" className="block text-sm font-semibold text-neutral-700 mb-2">
            Message *
          </label>
          <textarea
            id="contact-message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onFocus={() => trackFieldFocus('message')}
            onBlur={() => trackFieldBlur('message')}
            disabled={status === 'loading'}
            rows={6}
            className={cn(
              'w-full px-4 py-3 rounded-xl border transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed resize-none',
              errors.message ? 'border-error-300 bg-error-50' : 'border-neutral-300 bg-white'
            )}
            placeholder="Tell us more about your inquiry..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-error-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Error Message */}
        {status === 'error' && (
          <div className="p-4 bg-error-50 border border-error-200 rounded-xl flex items-center space-x-2 text-error-700">
            <AlertCircle className="w-5 h-5" />
            <span>Failed to send message. Please try again.</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Mail className="w-5 h-5" />
          <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
        </button>

        <p className="text-sm text-neutral-500 text-center">
          We typically respond within 24 hours
        </p>
      </form>
    </div>
  );
};
