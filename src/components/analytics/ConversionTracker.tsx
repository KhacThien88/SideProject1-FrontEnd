import React, { useEffect } from 'react';
import { analytics } from '../../utils/analytics';

interface ConversionTrackerProps {
  children: React.ReactNode;
}

/**
 * Conversion Tracker Component
 * Wraps the app to track conversion events automatically
 */
export const ConversionTracker: React.FC<ConversionTrackerProps> = ({ children }) => {
  useEffect(() => {
    if (!analytics) return;

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (!analytics) return;
      
      if (document.hidden) {
        analytics.trackEvent({
          action: 'page_hidden',
          category: 'engagement',
          label: window.location.pathname,
        });
      } else {
        analytics.trackEvent({
          action: 'page_visible',
          category: 'engagement',
          label: window.location.pathname,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track time on page
    const startTime = Date.now();

    const trackTimeOnPage = () => {
      if (!analytics) return;
      
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      analytics.trackEvent({
        action: 'time_on_page',
        category: 'engagement',
        value: timeSpent,
        customParams: {
          page: window.location.pathname,
        },
      });
    };

    window.addEventListener('beforeunload', trackTimeOnPage);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', trackTimeOnPage);
      trackTimeOnPage();
    };
  }, []);

  return <>{children}</>;
};
