import { useEffect, useState } from 'react';
import { performanceMonitor, type WebVitals } from '../utils/performance';

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
