/**
 * Conversion Event Tracking Utilities
 * Tracks CTA clicks, form submissions, scroll depth, and engagement metrics
 */

import { analytics } from './analytics';

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface CTAClickEvent {
  ctaType: 'primary' | 'secondary' | 'tertiary';
  ctaText: string;
  ctaLocation: string;
  targetUrl?: string;
  section: string;
}

export interface FormSubmissionEvent {
  formType: 'newsletter' | 'demo' | 'contact' | 'signup' | 'login';
  formId: string;
  success: boolean;
  errorMessage?: string;
  fields?: string[];
}

export interface ScrollDepthEvent {
  depth: 25 | 50 | 75 | 90 | 100;
  page: string;
  timeToDepth: number;
}

export interface EngagementEvent {
  type: 'hover' | 'click' | 'focus' | 'video_play' | 'video_complete';
  element: string;
  duration?: number;
  metadata?: Record<string, any>;
}

export interface FunnelStepEvent {
  funnelName: string;
  step: number;
  stepName: string;
  completed: boolean;
  timeSpent?: number;
}

// ============================================================================
// Conversion Tracking Manager
// ============================================================================

export class ConversionTracker {
  private scrollDepthTracked: Set<number> = new Set();
  private funnelSteps: Map<string, number> = new Map();
  private engagementStartTimes: Map<string, number> = new Map();

  /**
   * Track CTA button clicks with context
   */
  trackCTAClick(event: CTAClickEvent): void {
    if (!analytics) return;

    analytics.trackEvent({
      action: 'cta_click',
      category: 'conversion',
      label: `${event.section}_${event.ctaType}`,
      customParams: {
        cta_text: event.ctaText,
        cta_location: event.ctaLocation,
        cta_type: event.ctaType,
        target_url: event.targetUrl,
        section: event.section,
      },
    });

    // Track as conversion goal
    analytics.trackConversion({
      type: 'feature_interaction',
      value: 1,
    });
  }

  /**
   * Track form submissions and completions
   */
  trackFormSubmission(event: FormSubmissionEvent): void {
    if (!analytics) return;

    analytics.trackEvent({
      action: event.success ? 'form_submit_success' : 'form_submit_error',
      category: 'conversion',
      label: event.formType,
      customParams: {
        form_id: event.formId,
        form_type: event.formType,
        success: event.success,
        error_message: event.errorMessage,
        fields_count: event.fields?.length || 0,
      },
    });

    if (event.success) {
      // Map form types to appropriate conversion types
      const conversionType = event.formType === 'newsletter' ? 'newsletter_signup' :
                            event.formType === 'demo' ? 'demo_request' :
                            event.formType === 'contact' ? 'contact_form' : 'feature_interaction';
      
      analytics.trackConversion({
        type: conversionType,
        value: 1,
      });
    }
  }

  /**
   * Track form field interactions
   */
  trackFormFieldInteraction(formId: string, fieldName: string, action: 'focus' | 'blur' | 'error'): void {
    if (!analytics) return;

    analytics.trackEvent({
      action: `form_field_${action}`,
      category: 'engagement',
      label: `${formId}_${fieldName}`,
      customParams: {
        form_id: formId,
        field_name: fieldName,
      },
    });
  }

  /**
   * Track scroll depth milestones
   */
  trackScrollDepth(depth: number, page: string, timeToDepth: number): void {
    if (!analytics) return;

    // Only track each milestone once per page load
    if (this.scrollDepthTracked.has(depth)) return;

    const milestone = this.getScrollMilestone(depth);
    if (!milestone) return;

    this.scrollDepthTracked.add(depth);

    analytics.trackEvent({
      action: 'scroll_depth',
      category: 'engagement',
      label: `${milestone}%`,
      value: milestone,
      customParams: {
        page,
        time_to_depth: timeToDepth,
        depth_percentage: milestone,
      },
    });
  }

  /**
   * Track engagement metrics (hover, click, focus)
   */
  trackEngagement(event: EngagementEvent): void {
    if (!analytics) return;

    analytics.trackEvent({
      action: `engagement_${event.type}`,
      category: 'engagement',
      label: event.element,
      value: event.duration,
      customParams: {
        element: event.element,
        duration: event.duration,
        ...event.metadata,
      },
    });
  }

  /**
   * Start tracking engagement duration
   */
  startEngagementTracking(elementId: string): void {
    this.engagementStartTimes.set(elementId, Date.now());
  }

  /**
   * End tracking engagement duration
   */
  endEngagementTracking(elementId: string, element: string): void {
    const startTime = this.engagementStartTimes.get(elementId);
    if (!startTime) return;

    const duration = Date.now() - startTime;
    this.engagementStartTimes.delete(elementId);

    this.trackEngagement({
      type: 'hover',
      element,
      duration,
    });
  }

  /**
   * Track funnel progression
   */
  trackFunnelStep(event: FunnelStepEvent): void {
    if (!analytics) return;

    const funnelKey = `${event.funnelName}_${event.step}`;
    this.funnelSteps.set(funnelKey, Date.now());

    analytics.trackEvent({
      action: event.completed ? 'funnel_step_complete' : 'funnel_step_start',
      category: 'funnel',
      label: `${event.funnelName}_step_${event.step}`,
      customParams: {
        funnel_name: event.funnelName,
        step_number: event.step,
        step_name: event.stepName,
        completed: event.completed,
        time_spent: event.timeSpent,
      },
    });

    if (event.completed) {
      analytics.trackConversion({
        type: 'feature_interaction',
        value: 1,
      });
    }
  }

  /**
   * Track video interactions
   */
  trackVideoInteraction(videoId: string, action: 'play' | 'pause' | 'complete' | 'progress', progress?: number): void {
    if (!analytics) return;

    analytics.trackEvent({
      action: `video_${action}`,
      category: 'engagement',
      label: videoId,
      value: progress,
      customParams: {
        video_id: videoId,
        progress_percentage: progress,
      },
    });

    if (action === 'complete') {
      analytics.trackConversion({
        type: 'feature_interaction',
        value: 1,
      });
    }
  }

  /**
   * Reset scroll depth tracking (for SPA navigation)
   */
  resetScrollTracking(): void {
    this.scrollDepthTracked.clear();
  }

  /**
   * Get scroll milestone (25, 50, 75, 90, 100)
   */
  private getScrollMilestone(depth: number): 25 | 50 | 75 | 90 | 100 | null {
    if (depth >= 100) return 100;
    if (depth >= 90) return 90;
    if (depth >= 75) return 75;
    if (depth >= 50) return 50;
    if (depth >= 25) return 25;
    return null;
  }
}

// ============================================================================
// Scroll Depth Tracker Hook
// ============================================================================

export const setupScrollDepthTracking = (tracker: ConversionTracker): (() => void) => {
  const startTime = Date.now();
  let ticking = false;

  const calculateScrollDepth = (): number => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollableHeight = documentHeight - windowHeight;

    if (scrollableHeight <= 0) return 100;

    return Math.round((scrollTop / scrollableHeight) * 100);
  };

  const handleScroll = (): void => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const depth = calculateScrollDepth();
        const timeToDepth = Date.now() - startTime;
        tracker.trackScrollDepth(depth, window.location.pathname, timeToDepth);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// ============================================================================
// Global Instances
// ============================================================================

export const conversionTracker = new ConversionTracker();
