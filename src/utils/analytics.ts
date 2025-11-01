/**
 * Analytics Manager - Google Analytics 4 Integration & Conversion Tracking
 */

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParams?: Record<string, any>;
}

export interface ConversionEvent {
  type: ConversionType;
  value?: number;
  currency?: string;
  transactionId?: string;
  items?: ConversionItem[];
}

export interface ConversionItem {
  id: string;
  name: string;
  category?: string;
  price?: number;
  quantity?: number;
}

export type ConversionType =
  | 'signup'
  | 'login'
  | 'cv_upload'
  | 'job_apply'
  | 'demo_request'
  | 'contact_form'
  | 'newsletter_signup'
  | 'pricing_view'
  | 'feature_interaction'
  | 'cta_click'
  | 'form_submission'
  | 'funnel_completion'
  | 'video_complete';

export type UserSegment = 'candidate' | 'recruiter' | 'admin' | 'visitor';

export interface JourneyStep {
  step: string;
  name: string;
  timestamp: number;
  data?: Record<string, any>;
}

export interface AnalyticsConfig {
  measurementId: string;
  debug?: boolean;
  anonymizeIp?: boolean;
  cookieFlags?: string;
}

/**
 * Google Analytics 4 Manager
 */
export class AnalyticsManager {
  private config: AnalyticsConfig;
  private isInitialized = false;
  private userJourney: JourneyStep[] = [];

  constructor(config: AnalyticsConfig) {
    this.config = {
      debug: import.meta.env.DEV,
      anonymizeIp: true,
      cookieFlags: 'SameSite=None;Secure',
      ...config,
    };
  }

  /**
   * Initialize Google Analytics 4
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', this.config.measurementId, {
      anonymize_ip: this.config.anonymizeIp,
      cookie_flags: this.config.cookieFlags,
      debug_mode: this.config.debug,
    });

    this.isInitialized = true;

    if (this.config.debug) {
      console.log('[Analytics] GA4 initialized:', this.config.measurementId);
    }
  }

  /**
   * Track page view
   */
  trackPageView(page: string, title?: string): void {
    if (!this.isInitialized) return;

    window.gtag?.('event', 'page_view', {
      page_path: page,
      page_title: title || document.title,
      page_location: window.location.href,
    });

    if (this.config.debug) {
      console.log('[Analytics] Page view:', { page, title });
    }
  }

  /**
   * Track custom event
   */
  trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized) return;

    window.gtag?.('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.customParams,
    });

    if (this.config.debug) {
      console.log('[Analytics] Event:', event);
    }
  }

  /**
   * Track conversion
   */
  trackConversion(conversion: ConversionEvent): void {
    if (!this.isInitialized) return;

    const eventName = this.getConversionEventName(conversion.type);

    window.gtag?.('event', eventName, {
      value: conversion.value,
      currency: conversion.currency || 'VND',
      transaction_id: conversion.transactionId,
      items: conversion.items,
    });

    if (this.config.debug) {
      console.log('[Analytics] Conversion:', conversion);
    }
  }

  /**
   * Track CTA click with context
   */
  trackCTAClick(
    ctaType: 'primary' | 'secondary' | 'tertiary',
    location: string,
    label?: string
  ): void {
    this.trackEvent({
      action: 'cta_click',
      category: 'engagement',
      label: label || `${ctaType}_${location}`,
      customParams: {
        cta_type: ctaType,
        cta_location: location,
      },
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(depth: number): void {
    const milestones = [25, 50, 75, 100];
    const milestone = milestones.find(m => depth >= m && depth < m + 1);

    if (milestone) {
      this.trackEvent({
        action: 'scroll_depth',
        category: 'engagement',
        label: `${milestone}%`,
        value: milestone,
      });
    }
  }

  /**
   * Track user journey step
   */
  trackUserJourney(step: Omit<JourneyStep, 'timestamp'>): void {
    const journeyStep: JourneyStep = {
      ...step,
      timestamp: Date.now(),
    };

    this.userJourney.push(journeyStep);

    this.trackEvent({
      action: 'user_journey',
      category: 'funnel',
      label: step.step,
      customParams: {
        step_name: step.name,
        step_data: step.data,
        journey_length: this.userJourney.length,
      },
    });

    // Store in sessionStorage
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('user_journey', JSON.stringify(this.userJourney));
    }
  }

  /**
   * Track form submission
   */
  trackFormSubmission(
    formName: string,
    success: boolean,
    errorMessage?: string
  ): void {
    this.trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'form',
      label: formName,
      customParams: {
        form_name: formName,
        error_message: errorMessage,
      },
    });
  }

  /**
   * Track feature interaction
   */
  trackFeatureInteraction(
    featureName: string,
    action: string,
    value?: number
  ): void {
    this.trackEvent({
      action: 'feature_interaction',
      category: 'product',
      label: `${featureName}_${action}`,
      value,
      customParams: {
        feature_name: featureName,
        interaction_type: action,
      },
    });
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, any>): void {
    if (!this.isInitialized) return;

    window.gtag?.('set', 'user_properties', properties);

    if (this.config.debug) {
      console.log('[Analytics] User properties set:', properties);
    }
  }

  /**
   * Set user segment
   */
  setUserSegment(segment: UserSegment): void {
    this.setUserProperties({
      user_segment: segment,
    });
  }

  /**
   * Get conversion event name for GA4
   */
  private getConversionEventName(type: ConversionType): string {
    const eventMap: Record<ConversionType, string> = {
      signup: 'sign_up',
      login: 'login',
      cv_upload: 'file_upload',
      job_apply: 'generate_lead',
      demo_request: 'generate_lead',
      contact_form: 'generate_lead',
      newsletter_signup: 'sign_up',
      pricing_view: 'view_item',
      feature_interaction: 'select_content',
      cta_click: 'select_content',
      form_submission: 'generate_lead',
      funnel_completion: 'select_content',
      video_complete: 'video_complete',
    };

    return eventMap[type] || 'conversion';
  }

  /**
   * Get user journey
   */
  getUserJourney(): JourneyStep[] {
    return [...this.userJourney];
  }

  /**
   * Clear user journey
   */
  clearUserJourney(): void {
    this.userJourney = [];
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('user_journey');
    }
  }
}

/**
 * Scroll depth tracker
 */
export class ScrollDepthTracker {
  private tracked = new Set<number>();
  private analytics: AnalyticsManager;

  constructor(analytics: AnalyticsManager) {
    this.analytics = analytics;
    this.setupScrollListener();
  }

  private setupScrollListener(): void {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.checkScrollDepth();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private checkScrollDepth(): void {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const scrollPercentage = Math.round(
      ((scrollTop + windowHeight) / documentHeight) * 100
    );

    const milestones = [25, 50, 75, 100];

    milestones.forEach(milestone => {
      if (scrollPercentage >= milestone && !this.tracked.has(milestone)) {
        this.tracked.add(milestone);
        this.analytics.trackScrollDepth(milestone);
      }
    });
  }
}

/**
 * Create analytics instance
 */
export const createAnalytics = (measurementId: string): AnalyticsManager => {
  const analytics = new AnalyticsManager({ measurementId });
  analytics.initialize();
  return analytics;
};

/**
 * Analytics instance (will be initialized with actual ID)
 */
export let analytics: AnalyticsManager | null = null;

/**
 * Initialize global analytics
 */
export const initializeAnalytics = (measurementId: string): void => {
  analytics = createAnalytics(measurementId);

  // Setup scroll depth tracking
  if (typeof window !== 'undefined') {
    new ScrollDepthTracker(analytics);
  }
};

/**
 * React Hook for Analytics
 */
export const useAnalytics = () => {
  React.useEffect(() => {
    // Track page view on mount
    if (analytics) {
      analytics.trackPageView(window.location.pathname);
    }
  }, []);

  return {
    trackEvent: (event: AnalyticsEvent) => analytics?.trackEvent(event),
    trackConversion: (conversion: ConversionEvent) => analytics?.trackConversion(conversion),
    trackCTA: (type: 'primary' | 'secondary' | 'tertiary', location: string, label?: string) =>
      analytics?.trackCTAClick(type, location, label),
    trackFormSubmission: (formName: string, success: boolean, error?: string) =>
      analytics?.trackFormSubmission(formName, success, error),
    trackFeature: (feature: string, action: string, value?: number) =>
      analytics?.trackFeatureInteraction(feature, action, value),
    trackJourney: (step: Omit<JourneyStep, 'timestamp'>) =>
      analytics?.trackUserJourney(step),
    setUserSegment: (segment: UserSegment) => analytics?.setUserSegment(segment),
  };
};

// Type declarations for window.gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

import React from 'react';
