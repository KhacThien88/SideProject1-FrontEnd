/**
 * Performance Monitoring and Optimization Utilities
 * Tracks Core Web Vitals and provides performance insights
 */

export interface WebVitals {
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
  FCP: number; // First Contentful Paint
  TTFB: number; // Time to First Byte
}

export interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint?: number;
  timeToInteractive?: number;
  totalBlockingTime?: number;
}

export interface ResourceTiming {
  name: string;
  duration: number;
  size: number;
  type: string;
}

/**
 * Performance Monitor Class
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Partial<WebVitals> = {};
  private observers: Map<string, PerformanceObserver> = new Map();

  private constructor() {
    this.initializeObservers();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Initialize performance observers
   */
  private initializeObservers(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
        this.metrics.LCP = lastEntry.renderTime || lastEntry.loadTime || 0;
        this.reportMetric('LCP', this.metrics.LCP);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);
    } catch (e) {
      console.warn('LCP observer not supported');
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.FID = entry.processingStart - entry.startTime;
          this.reportMetric('FID', this.metrics.FID);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);
    } catch (e) {
      console.warn('FID observer not supported');
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.CLS = clsValue;
            this.reportMetric('CLS', this.metrics.CLS);
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);
    } catch (e) {
      console.warn('CLS observer not supported');
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.FCP = entry.startTime;
            this.reportMetric('FCP', this.metrics.FCP);
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.set('fcp', fcpObserver);
    } catch (e) {
      console.warn('FCP observer not supported');
    }
  }

  /**
   * Get current Core Web Vitals
   */
  getCoreWebVitals(): Partial<WebVitals> {
    return { ...this.metrics };
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): PerformanceMetrics | null {
    if (typeof window === 'undefined' || !window.performance) {
      return null;
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');

    const firstPaint = paint.find(entry => entry.name === 'first-paint');
    const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint');

    return {
      loadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
      domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : 0,
      firstPaint: firstPaint ? firstPaint.startTime : 0,
      firstContentfulPaint: firstContentfulPaint ? firstContentfulPaint.startTime : 0,
      largestContentfulPaint: this.metrics.LCP,
      timeToInteractive: navigation ? navigation.domInteractive - navigation.fetchStart : 0,
      totalBlockingTime: 0, // Calculated separately
    };
  }

  /**
   * Get resource timing information
   */
  getResourceTimings(): ResourceTiming[] {
    if (typeof window === 'undefined' || !window.performance) {
      return [];
    }

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

    return resources.map(resource => ({
      name: resource.name,
      duration: resource.duration,
      size: resource.transferSize || 0,
      type: resource.initiatorType,
    }));
  }

  /**
   * Report metric to analytics
   */
  private reportMetric(name: string, value: number): void {
    if (import.meta.env.DEV) {
      console.log(`[Performance] ${name}:`, value.toFixed(2), 'ms');
    }

    // Send to analytics (Google Analytics, etc.)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(value),
        non_interaction: true,
      });
    }
  }

  /**
   * Get performance grade based on Core Web Vitals
   */
  getPerformanceGrade(): { grade: string; score: number; details: Record<string, string> } {
    const vitals = this.getCoreWebVitals();
    let score = 100;
    const details: Record<string, string> = {};

    // LCP scoring (Good: <2.5s, Needs Improvement: 2.5-4s, Poor: >4s)
    if (vitals.LCP) {
      if (vitals.LCP > 4000) {
        score -= 30;
        details.LCP = 'Poor';
      } else if (vitals.LCP > 2500) {
        score -= 15;
        details.LCP = 'Needs Improvement';
      } else {
        details.LCP = 'Good';
      }
    }

    // FID scoring (Good: <100ms, Needs Improvement: 100-300ms, Poor: >300ms)
    if (vitals.FID) {
      if (vitals.FID > 300) {
        score -= 30;
        details.FID = 'Poor';
      } else if (vitals.FID > 100) {
        score -= 15;
        details.FID = 'Needs Improvement';
      } else {
        details.FID = 'Good';
      }
    }

    // CLS scoring (Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25)
    if (vitals.CLS !== undefined) {
      if (vitals.CLS > 0.25) {
        score -= 30;
        details.CLS = 'Poor';
      } else if (vitals.CLS > 0.1) {
        score -= 15;
        details.CLS = 'Needs Improvement';
      } else {
        details.CLS = 'Good';
      }
    }

    // FCP scoring (Good: <1.8s, Needs Improvement: 1.8-3s, Poor: >3s)
    if (vitals.FCP) {
      if (vitals.FCP > 3000) {
        score -= 10;
        details.FCP = 'Poor';
      } else if (vitals.FCP > 1800) {
        score -= 5;
        details.FCP = 'Needs Improvement';
      } else {
        details.FCP = 'Good';
      }
    }

    const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';

    return { grade, score, details };
  }

  /**
   * Disconnect all observers
   */
  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

/**
 * Resource preloading utilities
 */
export const preloadResource = (href: string, as: string, type?: string): void => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;

  document.head.appendChild(link);
};

/**
 * Preload critical resources
 */
export const preloadCriticalResources = (): void => {
  // Preload critical fonts
  preloadResource('/fonts/inter-var.woff2', 'font', 'font/woff2');

  // Preload critical images
  preloadResource('/images/hero-mockup.webp', 'image');
  preloadResource('/images/og-image.jpg', 'image');
};

/**
 * Defer non-critical scripts
 */
export const deferNonCriticalScripts = (): void => {
  if (typeof document === 'undefined') return;

  const scripts = document.querySelectorAll('script[data-defer]');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    newScript.src = script.getAttribute('src') || '';
    newScript.defer = true;
    document.body.appendChild(newScript);
    script.remove();
  });
};

/**
 * Optimize images on page
 */
export const optimizeImages = (): void => {
  if (typeof document === 'undefined') return;

  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });
};

/**
 * Get bundle size information
 */
export const getBundleSize = async (): Promise<{ main: number; vendor: number; total: number }> => {
  if (typeof window === 'undefined' || !window.performance) {
    return { main: 0, vendor: 0, total: 0 };
  }

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const scripts = resources.filter(r => r.initiatorType === 'script');

  let mainSize = 0;
  let vendorSize = 0;

  scripts.forEach(script => {
    const size = script.transferSize || 0;
    if (script.name.includes('vendor')) {
      vendorSize += size;
    } else {
      mainSize += size;
    }
  });

  return {
    main: mainSize,
    vendor: vendorSize,
    total: mainSize + vendorSize,
  };
};

/**
 * Performance budget checker
 */
export interface PerformanceBudget {
  maxBundleSize: number; // in KB
  maxLCP: number; // in ms
  maxFID: number; // in ms
  maxCLS: number; // score
  maxFCP: number; // in ms
}

export const DEFAULT_BUDGET: PerformanceBudget = {
  maxBundleSize: 500, // 500KB
  maxLCP: 2500, // 2.5s
  maxFID: 100, // 100ms
  maxCLS: 0.1, // 0.1
  maxFCP: 1800, // 1.8s
};

export const checkPerformanceBudget = async (
  budget: PerformanceBudget = DEFAULT_BUDGET
): Promise<{ passed: boolean; violations: string[] }> => {
  const monitor = PerformanceMonitor.getInstance();
  const vitals = monitor.getCoreWebVitals();
  const bundleSize = await getBundleSize();

  const violations: string[] = [];

  // Check bundle size
  if (bundleSize.total / 1024 > budget.maxBundleSize) {
    violations.push(
      `Bundle size (${(bundleSize.total / 1024).toFixed(2)}KB) exceeds budget (${budget.maxBundleSize}KB)`
    );
  }

  // Check LCP
  if (vitals.LCP && vitals.LCP > budget.maxLCP) {
    violations.push(`LCP (${vitals.LCP.toFixed(2)}ms) exceeds budget (${budget.maxLCP}ms)`);
  }

  // Check FID
  if (vitals.FID && vitals.FID > budget.maxFID) {
    violations.push(`FID (${vitals.FID.toFixed(2)}ms) exceeds budget (${budget.maxFID}ms)`);
  }

  // Check CLS
  if (vitals.CLS !== undefined && vitals.CLS > budget.maxCLS) {
    violations.push(`CLS (${vitals.CLS.toFixed(3)}) exceeds budget (${budget.maxCLS})`);
  }

  // Check FCP
  if (vitals.FCP && vitals.FCP > budget.maxFCP) {
    violations.push(`FCP (${vitals.FCP.toFixed(2)}ms) exceeds budget (${budget.maxFCP}ms)`);
  }

  return {
    passed: violations.length === 0,
    violations,
  };
};

/**
 * Export performance monitor instance
 */
export const performanceMonitor = PerformanceMonitor.getInstance();
