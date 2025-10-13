import React, { useState } from 'react';
import { useViewTransition } from '../hooks/useViewTransition';
import type { ViewTransitionMode } from '../hooks/useViewTransition';

/**
 * ViewTransition Component - Similar to React Labs <ViewTransition>
 */
export interface ViewTransitionProps {
  children: React.ReactNode;
  mode?: ViewTransitionMode;
  duration?: number;
  className?: string;
  name?: string; // For shared element transitions
}

export const ViewTransition: React.FC<ViewTransitionProps> = ({
  children,
  mode = 'cross-fade',
  duration = 300,
  className = '',
  name
}) => {
  const { ref, isAnimating } = useViewTransition({ mode, duration });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`view-transition-container ${className} ${isAnimating ? 'view-transition-animating' : ''}`}
      data-view-transition-name={name}
      style={{
        '--view-transition-duration': `${duration}ms`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

/**
 * Activity Component - Similar to React Labs <Activity>
 */
export interface ActivityProps {
  children: React.ReactNode;
  mode: 'visible' | 'hidden';
  className?: string;
}

export const Activity: React.FC<ActivityProps> = ({
  children,
  mode,
  className = ''
}) => {
  const [wasVisible, setWasVisible] = useState(mode === 'visible');

  React.useEffect(() => {
    if (mode === 'visible') {
      setWasVisible(true);
    }
  }, [mode]);

  if (mode === 'hidden' && !wasVisible) {
    return null;
  }

  return (
    <div
      className={`activity-container ${className} ${mode === 'hidden' ? 'activity-hidden' : 'activity-visible'}`}
      style={{
        display: mode === 'hidden' ? 'none' : 'block'
      }}
    >
      {children}
    </div>
  );
};