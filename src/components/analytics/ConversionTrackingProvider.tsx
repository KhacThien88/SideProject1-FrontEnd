/**
 * Conversion Tracking Provider
 * Wraps components to automatically track conversions and engagement
 */

import React from 'react';
import { useScrollDepthTracking } from '../../hooks/useConversionTracking';

interface ConversionTrackingProviderProps {
  children: React.ReactNode;
  enableScrollTracking?: boolean;
}

/**
 * Provider component that enables conversion tracking features
 */
export const ConversionTrackingProvider: React.FC<ConversionTrackingProviderProps> = ({
  children,
  enableScrollTracking = true,
}) => {
  // Enable scroll depth tracking
  if (enableScrollTracking) {
    useScrollDepthTracking();
  }

  return <>{children}</>;
};
