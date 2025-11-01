import { useEffect, useState } from 'react';
import { usePerformanceMonitoring } from '@/hooks/usePerformance';

/**
 * Performance Dashboard Component
 * Displays real-time performance metrics and alerts
 */
export const PerformanceDashboard = () => {
  const { vitals, grade, realTime, testing, regression } = usePerformanceMonitoring();
  const [showDashboard, setShowDashboard] = useState(false);

  // Only show in development mode
  useEffect(() => {
    setShowDashboard(import.meta.env.DEV);
  }, []);

  if (!showDashboard) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Performance Monitor
        </h3>
        <button
          onClick={() => setShowDashboard(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      {/* Performance Grade */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Overall Grade
          </span>
          <span className={`text-2xl font-bold ${getGradeColor(grade.grade)}`}>
            {grade.grade}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${getScoreColor(grade.score)}`}
            style={{ width: `${grade.score}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Score: {grade.score}/100
        </span>
      </div>

      {/* Core Web Vitals */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Core Web Vitals
        </h4>
        <div className="space-y-2">
          <MetricRow
            label="LCP"
            value={vitals.LCP}
            unit="ms"
            threshold={2500}
            status={grade.details.LCP}
          />
          <MetricRow
            label="FID"
            value={vitals.FID}
            unit="ms"
            threshold={100}
            status={grade.details.FID}
          />
          <MetricRow
            label="CLS"
            value={vitals.CLS}
            unit=""
            threshold={0.1}
            status={grade.details.CLS}
            decimals={3}
          />
          <MetricRow
            label="FCP"
            value={vitals.FCP}
            unit="ms"
            threshold={1800}
            status={grade.details.FCP}
          />
        </div>
      </div>

      {/* Alerts */}
      {realTime.alerts.length > 0 && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Alerts ({realTime.alerts.length})
            </h4>
            <button
              onClick={realTime.clearAlerts}
              className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {realTime.alerts.slice(-3).map((alert: any, index: number) => (
              <div
                key={index}
                className={`p-2 rounded text-xs ${
                  alert.type === 'critical'
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                }`}
              >
                <div className="font-medium">{alert.metric}</div>
                <div className="text-xs opacity-75">{alert.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 flex gap-2">
        <button
          onClick={() => testing.runTest()}
          disabled={testing.isRunning}
          className="flex-1 px-3 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded transition-colors"
        >
          {testing.isRunning ? 'Testing...' : 'Run Test'}
        </button>
        <button
          onClick={() => {
            const current = vitals;
            if (Object.keys(current).length > 0) {
              regression.setBaselineMetrics(current);
            }
          }}
          className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
        >
          Set Baseline
        </button>
      </div>

      {/* Test Results */}
      {testing.latestResult && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Last Test: {testing.latestResult.passed ? '✅ Passed' : '❌ Failed'}
          </div>
          {testing.latestResult.violations.length > 0 && (
            <div className="mt-2 text-xs text-red-600 dark:text-red-400">
              {testing.latestResult.violations.length} violation(s)
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Metric Row Component
 */
interface MetricRowProps {
  label: string;
  value?: number;
  unit: string;
  threshold: number;
  status?: string;
  decimals?: number;
}

const MetricRow = ({ label, value, unit, threshold, status, decimals = 0 }: MetricRowProps) => {
  const displayValue = value !== undefined ? value.toFixed(decimals) : 'N/A';
  const isGood = status === 'Good';
  const isWarning = status === 'Needs Improvement';
  const isPoor = status === 'Poor';

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span
          className={`w-2 h-2 rounded-full ${
            isGood ? 'bg-green-500' : isWarning ? 'bg-yellow-500' : isPoor ? 'bg-red-500' : 'bg-gray-400'
          }`}
        />
      </div>
      <div className="text-right">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {displayValue}
          {unit && <span className="text-xs text-gray-500 ml-1">{unit}</span>}
        </span>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Target: {threshold}{unit}
        </div>
      </div>
    </div>
  );
};

/**
 * Helper functions
 */
const getGradeColor = (grade: string): string => {
  switch (grade) {
    case 'A':
      return 'text-green-600 dark:text-green-400';
    case 'B':
      return 'text-blue-600 dark:text-blue-400';
    case 'C':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'D':
      return 'text-orange-600 dark:text-orange-400';
    case 'F':
      return 'text-red-600 dark:text-red-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
};

const getScoreColor = (score: number): string => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 80) return 'bg-blue-500';
  if (score >= 70) return 'bg-yellow-500';
  if (score >= 60) return 'bg-orange-500';
  return 'bg-red-500';
};

/**
 * Toggle button for showing/hiding dashboard
 */
export const PerformanceToggle = () => {
  const [isVisible, setIsVisible] = useState(false);

  if (!import.meta.env.DEV) return null;

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-40 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        title="Toggle Performance Dashboard"
      >
        📊
      </button>
      {isVisible && <PerformanceDashboard />}
    </>
  );
};
