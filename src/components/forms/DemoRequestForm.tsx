/**
 * Demo Request Form Component
 * Captures lead information for demo requests
 */

import React, { useState } from 'react';
import { Calendar, User, Mail, Building, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useFormTracking } from '../../hooks/useConversionTracking';
import { cn } from '../../utils/cn';

interface DemoRequestFormProps {
  className?: string;
  onSuccess?: (data: DemoRequestData) => void;
  onCancel?: () => void;
}

export interface DemoRequestData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  companySize?: string;
  message?: string;
}

export const DemoRequestForm: React.FC<DemoRequestFormProps> = ({
  className,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<DemoRequestData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    companySize: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof DemoRequestData, string>>>({});

  const { trackSubmit, trackFieldFocus, trackFieldBlur, trackFieldError } = useFormTracking({
    formType: 'demo',
    formId: 'demo_request',
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof DemoRequestData, string>> = {};

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

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
      trackFieldError('company');
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
      // await api.post('/demo/request', formData);

      setStatus('success');
      trackSubmit(true, undefined, Object.keys(formData));

      if (onSuccess) {
        onSuccess(formData);
      }
    } catch (error) {
      setStatus('error');
      trackSubmit(false, 'demo_request_failed', Object.keys(formData));
    }
  };

  const handleChange = (field: keyof DemoRequestData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (status === 'success') {
    return (
      <div className={cn('p-8 bg-white rounded-2xl shadow-xl', className)}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-success-600" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">Request Submitted!</h3>
          <p className="text-neutral-600">
            Thank you for your interest. Our team will contact you within 24 hours to schedule your demo.
          </p>
          <button
            onClick={onCancel}
            className="mt-6 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('p-8 bg-white rounded-2xl shadow-xl', className)}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">Request a Demo</h3>
        <p className="text-neutral-600">
          See how our AI-powered platform can transform your hiring process
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-neutral-400" />
            </div>
            <input
              id="name"
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
          <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
            Work Email *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-neutral-400" />
            </div>
            <input
              id="email"
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
              placeholder="john@company.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-error-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Company Field */}
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-neutral-700 mb-2">
            Company Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Building className="w-5 h-5 text-neutral-400" />
            </div>
            <input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              onFocus={() => trackFieldFocus('company')}
              onBlur={() => trackFieldBlur('company')}
              disabled={status === 'loading'}
              className={cn(
                'w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                errors.company ? 'border-error-300 bg-error-50' : 'border-neutral-300 bg-white'
              )}
              placeholder="Acme Inc."
            />
          </div>
          {errors.company && (
            <p className="mt-1 text-sm text-error-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.company}
            </p>
          )}
        </div>

        {/* Phone Field (Optional) */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="w-5 h-5 text-neutral-400" />
            </div>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onFocus={() => trackFieldFocus('phone')}
              onBlur={() => trackFieldBlur('phone')}
              disabled={status === 'loading'}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Company Size */}
        <div>
          <label htmlFor="companySize" className="block text-sm font-semibold text-neutral-700 mb-2">
            Company Size
          </label>
          <select
            id="companySize"
            value={formData.companySize}
            onChange={(e) => handleChange('companySize', e.target.value)}
            onFocus={() => trackFieldFocus('companySize')}
            onBlur={() => trackFieldBlur('companySize')}
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
          >
            <option value="">Select company size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501+">501+ employees</option>
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
            Additional Information
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onFocus={() => trackFieldFocus('message')}
            onBlur={() => trackFieldBlur('message')}
            disabled={status === 'loading'}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 resize-none"
            placeholder="Tell us about your hiring needs..."
          />
        </div>

        {/* Error Message */}
        {status === 'error' && (
          <div className="p-4 bg-error-50 border border-error-200 rounded-xl flex items-center space-x-2 text-error-700">
            <AlertCircle className="w-5 h-5" />
            <span>Failed to submit request. Please try again.</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={status === 'loading'}
              className="flex-1 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <Calendar className="w-5 h-5" />
            <span>{status === 'loading' ? 'Submitting...' : 'Schedule Demo'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
