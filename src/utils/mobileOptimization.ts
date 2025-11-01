/**
 * Mobile optimization utilities for improved performance and UX
 */

// Detect mobile device
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Detect iOS device
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Detect Android device
export const isAndroid = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android/.test(navigator.userAgent);
};

// Check if device supports touch
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
};

// Get viewport dimensions
export const getViewport = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

// Check if viewport is mobile
export const isMobileViewport = (): boolean => {
  const { width } = getViewport();
  return width < 768;
};

// Optimize images for mobile
export const getOptimizedImageSrc = (
  src: string,
  options: {
    width?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string => {
  const { width = 800, quality = 80, format = 'webp' } = options;

  // If it's a data URI or external URL, return as-is
  if (src.startsWith('data:') || src.startsWith('http')) {
    return src;
  }

  // Add optimization parameters for mobile
  if (isMobileDevice()) {
    return `${src}?w=${width}&q=${quality}&f=${format}`;
  }

  return src;
};

// Lazy load images with intersection observer
export const lazyLoadImage = (
  img: HTMLImageElement,
  options: IntersectionObserverInit = {}
) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          if (image.dataset.src) {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
          }
          observer.unobserve(image);
        }
      });
    }, options);

    observer.observe(img);
  } else {
    // Fallback for browsers without IntersectionObserver
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  }
};

// Prevent pull-to-refresh on mobile
export const preventPullToRefresh = () => {
  let touchStartY = 0;

  document.addEventListener(
    'touchstart',
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  document.addEventListener(
    'touchmove',
    (e) => {
      const touchY = e.touches[0].clientY;
      const touchDiff = touchY - touchStartY;

      // Prevent pull-to-refresh if scrolling down at the top of the page
      if (touchDiff > 0 && window.scrollY === 0) {
        e.preventDefault();
      }
    },
    { passive: false }
  );
};

// Debounce function for scroll/resize events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for frequent events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Add momentum scrolling for iOS
export const enableMomentumScrolling = (element: HTMLElement) => {
  if (isIOS()) {
    (element.style as any).webkitOverflowScrolling = 'touch';
  }
};

// Disable zoom on double-tap for better UX
export const disableDoubleTapZoom = () => {
  let lastTouchEnd = 0;

  document.addEventListener(
    'touchend',
    (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false }
  );
};

// Optimize form inputs for mobile
export const optimizeFormInput = (input: HTMLInputElement) => {
  // Add appropriate input types and attributes
  if (input.type === 'email') {
    input.setAttribute('autocomplete', 'email');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('autocapitalize', 'off');
  }

  if (input.type === 'tel') {
    input.setAttribute('autocomplete', 'tel');
    input.setAttribute('pattern', '[0-9]*');
  }

  if (input.type === 'text' && input.name.includes('name')) {
    input.setAttribute('autocomplete', 'name');
  }

  // Prevent zoom on focus for iOS
  if (isIOS()) {
    input.style.fontSize = '16px';
  }
};

// Calculate safe area insets for notched devices
export const getSafeAreaInsets = () => {
  const style = getComputedStyle(document.documentElement);

  return {
    top: parseInt(style.getPropertyValue('--safe-area-inset-top') || '0'),
    right: parseInt(style.getPropertyValue('--safe-area-inset-right') || '0'),
    bottom: parseInt(style.getPropertyValue('--safe-area-inset-bottom') || '0'),
    left: parseInt(style.getPropertyValue('--safe-area-inset-left') || '0'),
  };
};

// Optimize touch events
export const addOptimizedTouchListener = (
  element: HTMLElement,
  callback: (e: TouchEvent) => void
) => {
  element.addEventListener('touchstart', callback, { passive: true });
};

// Preconnect to important domains for faster loading
export const preconnectDomains = (domains: string[]) => {
  domains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Reduce motion for users who prefer it
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Mobile-optimized vibration feedback
export const vibrate = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator && isMobileDevice()) {
    navigator.vibrate(pattern);
  }
};
