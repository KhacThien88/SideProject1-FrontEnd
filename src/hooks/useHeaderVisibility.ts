import { useState, useEffect, useCallback } from 'react';

interface UseHeaderVisibilityOptions {
  threshold?: number; // Distance from top to start hiding
  hideDelay?: number; // Delay before hiding header
  showOnHoverZone?: number; // Height of hover zone at top of screen
}

export const useHeaderVisibility = (options: UseHeaderVisibilityOptions = {}) => {
  const {
    threshold = 10,
    hideDelay = 50,
    showOnHoverZone = 60
  } = options;

  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideTimeout, setHideTimeout] = useState<number | null>(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY <= threshold) {
      // Always show when at or near top
      setIsVisible(true);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down - hide immediately after threshold
      if (!isHovering) {
        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }
        const timeout = setTimeout(() => {
          setIsVisible(false);
          setHideTimeout(null);
        }, hideDelay);
        setHideTimeout(timeout);
      }
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up - show immediately
      setIsVisible(true);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, threshold, hideDelay, isHovering, hideTimeout]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const isNearTop = event.clientY <= showOnHoverZone;
    
    if (isNearTop && !isVisible && window.scrollY > threshold) {
      setIsVisible(true);
      setIsHovering(true);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
    } else if (!isNearTop && isHovering && window.scrollY > threshold) {
      setIsHovering(false);
      // Hide after delay when moving away from top zone
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setHideTimeout(null);
      }, hideDelay);
      setHideTimeout(timeout);
    }
  }, [isVisible, isHovering, threshold, showOnHoverZone, hideDelay, hideTimeout]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [handleScroll, handleMouseMove, hideTimeout]);

  return {
    isVisible,
    isHovering
  };
};