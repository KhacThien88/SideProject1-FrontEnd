import { useEffect, useState, useCallback } from 'react';
import { 
  performanceMonitor, 
  realTimeMonitor,
  performanceTester,
  regressionDetector,
  type WebVitals,
  type PerformanceAlert,
  type PerformanceTestResult,
  type RegressionReport
} from '../utils/performance';

/**
 * Custom hook for monitoring Core Web Vitals
 * 
 * @example
 * ```tsx
 * function MyPage() {
 *   const vitals = usePerformance();
 *   
 *   console.log('LCP:', vitals.LCP);
 *   console.log('FID:', vitals.FID);
 *   console.log('CLS:', vitals.CLS);
 *   
 *   return <div>...</div>;
 * }
 * ```
 */
export const usePerformance = () => {
  const [vitals, setVitals] = useState<Partial<WebVitals>>({});

  useEffect(() => {
    // Get initial vitals
    const initialVitals = performanceMonitor.getCoreWebVitals();
    setVitals(initialVitals);

    // Update vitals periodically
    const interval = setInterval(() => {
      const currentVitals = performanceMonitor.getCoreWebVitals();
      setVitals(currentVitals);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return vitals;
};

/**
 * Hook for performance grade
 */
export const usePerformanceGrade = () => {
  const [grade, setGrade] = useState<{ grade: string; score: number; details: Record<string, string> }>({
    grade: 'N/A',
    score: 0,
    details: {},
  });

  useEffect(() => {
    const updateGrade = () => {
      const currentGrade = performanceMonitor.getPerformanceGrade();
      setGrade(currentGrade);
    };

    // Update grade after page load
    if (document.readyState === 'complete') {
      updateGrade();
    } else {
      window.addEventListener('load', updateGrade);
    }

    // Update periodically
    const interval = setInterval(updateGrade, 5000);

    return () => {
      window.removeEventListener('load', updateGrade);
      clearInterval(interval);
    };
  }, []);

  return grade;
};

/**
 * Hook for real-time performance monitoring with alerts
 */
export const useRealTimePerformance = () => {
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    // Subscribe to alerts
    const unsubscribe = realTimeMonitor.onAlert((alert) => {
      setAlerts(prev => [...prev, alert]);
    });

    // Start monitoring
    realTimeMonitor.startMonitoring();
    setIsMonitoring(true);

    return () => {
      unsubscribe();
      realTimeMonitor.stopMonitoring();
      setIsMonitoring(false);
    };
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
    realTimeMonitor.clearAlerts();
  }, []);

  const getLatestAlert = useCallback(() => {
    return alerts[alerts.length - 1] || null;
  }, [alerts]);

  return {
    alerts,
    isMonitoring,
    clearAlerts,
    getLatestAlert,
  };
};

/**
 * Hook for automated performance testing
 */
export const usePerformanceTesting = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<PerformanceTestResult[]>([]);
  const [latestResult, setLatestResult] = useState<PerformanceTestResult | null>(null);

  const runTest = useCallback(async () => {
    setIsRunning(true);
    try {
      const result = await performanceTester.runTest();
      setLatestResult(result);
      setResults(prev => [...prev, result]);
      return result;
    } finally {
      setIsRunning(false);
    }
  }, []);

  const runTestSuite = useCallback(async (iterations: number = 3) => {
    setIsRunning(true);
    try {
      const suiteResults = await performanceTester.runTestSuite(iterations);
      setResults(prev => [...prev, ...suiteResults]);
      setLatestResult(suiteResults[suiteResults.length - 1]);
      return suiteResults;
    } finally {
      setIsRunning(false);
    }
  }, []);

  const getAverageMetrics = useCallback(() => {
    return performanceTester.getAverageMetrics();
  }, []);

  return {
    isRunning,
    results,
    latestResult,
    runTest,
    runTestSuite,
    getAverageMetrics,
  };
};

/**
 * Hook for performance regression detection
 */
export const useRegressionDetection = () => {
  const [baseline, setBaseline] = useState<Partial<WebVitals> | null>(null);
  const [latestReport, setLatestReport] = useState<RegressionReport | null>(null);

  useEffect(() => {
    // Load baseline on mount
    regressionDetector.loadBaseline();
  }, []);

  const setBaselineMetrics = useCallback((metrics: Partial<WebVitals>) => {
    regressionDetector.setBaseline(metrics);
    setBaseline(metrics);
  }, []);

  const checkForRegressions = useCallback((current: Partial<WebVitals>) => {
    const report = regressionDetector.detectRegressions(current);
    setLatestReport(report);
    return report;
  }, []);

  const generateReport = useCallback((current: Partial<WebVitals>) => {
    return regressionDetector.generateReport(current);
  }, []);

  const setThreshold = useCallback((percent: number) => {
    regressionDetector.setThreshold(percent);
  }, []);

  return {
    baseline,
    latestReport,
    setBaselineMetrics,
    checkForRegressions,
    generateReport,
    setThreshold,
  };
};

/**
 * Combined hook for comprehensive performance monitoring
 */
export const usePerformanceMonitoring = () => {
  const vitals = usePerformance();
  const grade = usePerformanceGrade();
  const realTime = useRealTimePerformance();
  const testing = usePerformanceTesting();
  const regression = useRegressionDetection();

  return {
    vitals,
    grade,
    realTime,
    testing,
    regression,
  };
};
