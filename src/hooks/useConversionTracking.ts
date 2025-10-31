/**
 * React Hook for Conversion Tracking
 * Provides easy-to-use conversion tracking functionality in React components
 */

import { useEffect, useCallback, useRef } from 'react';
import {
  conversionTracker,
  setupScrollDepthTracking,
} from '../utils/conversionTracking';
import type {
  CTAClickEvent,
  FormSubmissionEvent,
  EngagementEvent,
  FunnelStepEvent,
} from '../utils/conversionTracking';

// ============================================================================
// Main Conversion Tracking Hook
// ============================================================================

export const useConversionTracking = () => {
  return {
    trackCTAClick: useCallback((event: CTAClickEvent) => {
      conversionTracker.trackCTAClick(event);
    }, []),

    trackFormSubmission: useCallback((event: FormSubmissionEvent) => {
      conversionTracker.trackFormSubmission(event);
    }, []),

    trackFormFieldInteraction: useCallback((formId: string, fieldName: string, action: 'focus' | 'blur' | 'error') => {
      conversionTracker.trackFormFieldInteraction(formId, fieldName, action);
    }, []),

    trackEngagement: useCallback((event: EngagementEvent) => {
      conversionTracker.trackEngagement(event);
    }, []),

    trackFunnelStep: useCallback((event: FunnelStepEvent) => {
      conversionTracker.trackFunnelStep(event);
    }, []),

    trackVideoInteraction: useCallback((videoId: string, action: 'play' | 'pause' | 'complete' | 'progress', progress?: number) => {
      conversionTracker.trackVideoInteraction(videoId, action, progress);
    }, []),
  };
};

// ============================================================================
// Scroll Depth Tracking Hook
// ============================================================================

export const useScrollDepthTracking = () => {
  useEffect(() => {
    const cleanup = setupScrollDepthTracking(conversionTracker);

    return () => {
      cleanup();
      conversionTracker.resetScrollTracking();
    };
  }, []);
};

// ============================================================================
// CTA Click Tracking Hook
// ============================================================================

interface UseCTATrackingOptions {
  ctaType: 'primary' | 'secondary' | 'tertiary';
  ctaText: string;
  section: string;
  targetUrl?: string;
}

export const useCTATracking = (options: UseCTATrackingOptions) => {
  const { trackCTAClick } = useConversionTracking();

  const handleClick = useCallback((ctaLocation: string) => {
    trackCTAClick({
      ...options,
      ctaLocation,
    });
  }, [options, trackCTAClick]);

  return handleClick;
};

// ============================================================================
// Form Tracking Hook
// ============================================================================

interface UseFormTrackingOptions {
  formType: 'newsletter' | 'demo' | 'contact' | 'signup' | 'login';
  formId: string;
}

export const useFormTracking = (options: UseFormTrackingOptions) => {
  const { trackFormSubmission, trackFormFieldInteraction } = useConversionTracking();

  const trackSubmit = useCallback((success: boolean, errorMessage?: string, fields?: string[]) => {
    trackFormSubmission({
      ...options,
      success,
      errorMessage,
      fields,
    });
  }, [options, trackFormSubmission]);

  const trackFieldFocus = useCallback((fieldName: string) => {
    trackFormFieldInteraction(options.formId, fieldName, 'focus');
  }, [options.formId, trackFormFieldInteraction]);

  const trackFieldBlur = useCallback((fieldName: string) => {
    trackFormFieldInteraction(options.formId, fieldName, 'blur');
  }, [options.formId, trackFormFieldInteraction]);

  const trackFieldError = useCallback((fieldName: string) => {
    trackFormFieldInteraction(options.formId, fieldName, 'error');
  }, [options.formId, trackFormFieldInteraction]);

  return {
    trackSubmit,
    trackFieldFocus,
    trackFieldBlur,
    trackFieldError,
  };
};

// ============================================================================
// Engagement Tracking Hook
// ============================================================================

export const useEngagementTracking = (element: string) => {
  const elementIdRef = useRef(`${element}_${Date.now()}`);
  const { trackEngagement } = useConversionTracking();

  const trackHover = useCallback(() => {
    conversionTracker.startEngagementTracking(elementIdRef.current);
  }, []);

  const trackHoverEnd = useCallback(() => {
    conversionTracker.endEngagementTracking(elementIdRef.current, element);
  }, [element]);

  const trackClick = useCallback((metadata?: Record<string, any>) => {
    trackEngagement({
      type: 'click',
      element,
      metadata,
    });
  }, [element, trackEngagement]);

  const trackFocus = useCallback(() => {
    trackEngagement({
      type: 'focus',
      element,
    });
  }, [element, trackEngagement]);

  return {
    trackHover,
    trackHoverEnd,
    trackClick,
    trackFocus,
  };
};

// ============================================================================
// Funnel Tracking Hook
// ============================================================================

interface UseFunnelTrackingOptions {
  funnelName: string;
  steps: Array<{ step: number; stepName: string }>;
}

export const useFunnelTracking = (options: UseFunnelTrackingOptions) => {
  const { trackFunnelStep } = useConversionTracking();
  const stepStartTimes = useRef<Map<number, number>>(new Map());

  const startStep = useCallback((step: number) => {
    const stepInfo = options.steps.find(s => s.step === step);
    if (!stepInfo) return;

    stepStartTimes.current.set(step, Date.now());

    trackFunnelStep({
      funnelName: options.funnelName,
      step,
      stepName: stepInfo.stepName,
      completed: false,
    });
  }, [options, trackFunnelStep]);

  const completeStep = useCallback((step: number) => {
    const stepInfo = options.steps.find(s => s.step === step);
    if (!stepInfo) return;

    const startTime = stepStartTimes.current.get(step);
    const timeSpent = startTime ? Date.now() - startTime : undefined;

    trackFunnelStep({
      funnelName: options.funnelName,
      step,
      stepName: stepInfo.stepName,
      completed: true,
      timeSpent,
    });

    stepStartTimes.current.delete(step);
  }, [options, trackFunnelStep]);

  return {
    startStep,
    completeStep,
  };
};

// ============================================================================
// Video Tracking Hook
// ============================================================================

export const useVideoTracking = (videoId: string) => {
  const { trackVideoInteraction } = useConversionTracking();
  const progressMilestones = useRef<Set<number>>(new Set());

  const trackPlay = useCallback(() => {
    trackVideoInteraction(videoId, 'play');
  }, [videoId, trackVideoInteraction]);

  const trackPause = useCallback(() => {
    trackVideoInteraction(videoId, 'pause');
  }, [videoId, trackVideoInteraction]);

  const trackComplete = useCallback(() => {
    trackVideoInteraction(videoId, 'complete', 100);
  }, [videoId, trackVideoInteraction]);

  const trackProgress = useCallback((progress: number) => {
    // Track milestones: 25%, 50%, 75%
    const milestone = Math.floor(progress / 25) * 25;
    if (milestone > 0 && milestone < 100 && !progressMilestones.current.has(milestone)) {
      progressMilestones.current.add(milestone);
      trackVideoInteraction(videoId, 'progress', milestone);
    }
  }, [videoId, trackVideoInteraction]);

  useEffect(() => {
    return () => {
      progressMilestones.current.clear();
    };
  }, []);

  return {
    trackPlay,
    trackPause,
    trackComplete,
    trackProgress,
  };
};
