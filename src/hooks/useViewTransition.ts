import { useRef, useCallback, useState, useTransition, useEffect } from 'react';

/**
 * View Transition Types - Similar to React Labs View Transitions
 */
export type ViewTransitionMode = 
  | 'default' 
  | 'cross-fade' 
  | 'slide-left' 
  | 'slide-right' 
  | 'slide-up' 
  | 'slide-down'
  | 'scale'
  | 'none';

export interface ViewTransitionOptions {
  mode?: ViewTransitionMode;
  duration?: number;
  easing?: string;
  className?: string;
}

/**
 * Transition Type Manager - Similar to addTransitionType API
 */
class TransitionTypeManager {
  private currentType: string | null = null;
  private listeners: Set<(type: string | null) => void> = new Set();

  addTransitionType(type: string) {
    this.currentType = type;
    this.listeners.forEach(listener => listener(type));
  }

  getCurrentType() {
    return this.currentType;
  }

  clearType() {
    this.currentType = null;
    this.listeners.forEach(listener => listener(null));
  }

  subscribe(listener: (type: string | null) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const transitionTypeManager = new TransitionTypeManager();

/**
 * Add Transition Type - Similar to React Labs API
 */
export const addTransitionType = (type: string) => {
  transitionTypeManager.addTransitionType(type);
};

/**
 * useViewTransition Hook - Similar to React Labs ViewTransition component
 */
export const useViewTransition = (options: ViewTransitionOptions = {}) => {
  const [isPending, startTransition] = useTransition();
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const currentTransitionType = useRef<string | null>(null);

  // Subscribe to transition types
  useEffect(() => {
    const unsubscribe = transitionTypeManager.subscribe((type) => {
      currentTransitionType.current = type;
    });
    return unsubscribe;
  }, []);

  const startViewTransition = useCallback(
    (updateFunction: () => void, transitionOptions?: ViewTransitionOptions) => {
      const finalOptions = { ...options, ...transitionOptions };
      
      // If browser supports View Transition API, use it
      if (typeof document !== 'undefined' && 'startViewTransition' in document) {
        (document as any).startViewTransition(() => {
          startTransition(() => {
            updateFunction();
          });
        });
        return;
      }

      // Fallback to custom implementation
      setIsAnimating(true);
      
      const element = elementRef.current;
      if (!element) {
        startTransition(updateFunction);
        setIsAnimating(false);
        return;
      }

      // Apply exit animation
      const exitClass = getExitAnimationClass(finalOptions.mode);
      if (exitClass) {
        element.classList.add(exitClass);
      }

      // Wait for exit animation to complete
      const exitDuration = finalOptions.duration || 300;
      setTimeout(() => {
        startTransition(() => {
          updateFunction();
          
          // Apply enter animation after state update
          setTimeout(() => {
            if (element) {
              if (exitClass) element.classList.remove(exitClass);
              const enterClass = getEnterAnimationClass(finalOptions.mode);
              if (enterClass) {
                element.classList.add(enterClass);
                setTimeout(() => {
                  element.classList.remove(enterClass);
                  setIsAnimating(false);
                }, exitDuration);
              } else {
                setIsAnimating(false);
              }
            }
          }, 50);
        });
      }, exitDuration / 2);
    },
    [options, startTransition]
  );

  return {
    ref: elementRef,
    startViewTransition,
    isPending,
    isAnimating,
    currentTransitionType: currentTransitionType.current
  };
};

/**
 * Get animation classes based on transition mode
 */
const getExitAnimationClass = (mode?: ViewTransitionMode): string | null => {
  switch (mode) {
    case 'cross-fade':
      return 'view-transition-fade-out';
    case 'slide-left':
      return 'view-transition-slide-left-out';
    case 'slide-right':
      return 'view-transition-slide-right-out';
    case 'slide-up':
      return 'view-transition-slide-up-out';
    case 'slide-down':
      return 'view-transition-slide-down-out';
    case 'scale':
      return 'view-transition-scale-out';
    case 'none':
      return null;
    default:
      return 'view-transition-fade-out';
  }
};

const getEnterAnimationClass = (mode?: ViewTransitionMode): string | null => {
  switch (mode) {
    case 'cross-fade':
      return 'view-transition-fade-in';
    case 'slide-left':
      return 'view-transition-slide-left-in';
    case 'slide-right':
      return 'view-transition-slide-right-in';
    case 'slide-up':
      return 'view-transition-slide-up-in';
    case 'slide-down':
      return 'view-transition-slide-down-in';
    case 'scale':
      return 'view-transition-scale-in';
    case 'none':
      return null;
    default:
      return 'view-transition-fade-in';
  }
};

/**
 * Shared Element Transition Hook
 */
export const useSharedElementTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startSharedTransition = useCallback(
    (fromElement: HTMLElement, toElement: HTMLElement, options: ViewTransitionOptions = {}) => {
      if (!fromElement || !toElement) return;

      setIsTransitioning(true);

      // Get element positions and sizes
      const fromRect = fromElement.getBoundingClientRect();
      const toRect = toElement.getBoundingClientRect();

      // Create transition overlay
      const overlay = document.createElement('div');
      overlay.className = 'shared-element-transition-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: ${fromRect.top}px;
        left: ${fromRect.left}px;
        width: ${fromRect.width}px;
        height: ${fromRect.height}px;
        z-index: 9999;
        pointer-events: none;
        transition: all ${options.duration || 300}ms cubic-bezier(0.4, 0, 0.2, 1);
      `;

      // Clone content
      overlay.innerHTML = fromElement.innerHTML;
      document.body.appendChild(overlay);

      // Hide original elements
      fromElement.style.opacity = '0';
      toElement.style.opacity = '0';

      // Animate to target position
      requestAnimationFrame(() => {
        overlay.style.top = `${toRect.top}px`;
        overlay.style.left = `${toRect.left}px`;
        overlay.style.width = `${toRect.width}px`;
        overlay.style.height = `${toRect.height}px`;
      });

      // Cleanup after animation
      setTimeout(() => {
        overlay.remove();
        fromElement.style.opacity = '';
        toElement.style.opacity = '';
        setIsTransitioning(false);
      }, options.duration || 300);
    },
    []
  );

  return {
    startSharedTransition,
    isTransitioning
  };
};