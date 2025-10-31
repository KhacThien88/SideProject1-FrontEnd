import { useEffect, useState } from 'react';
import { errorMonitor, type ErrorLog, type ErrorStats } from '@/utils/errorMonitoring';

/**
 * Error Dashboard Component
 * Displays error logs and statistics
 */
export const ErrorDashboard = () => {
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [stats, setStats] = useState<ErrorStats | null>(null);
  const [filter, setFilter] = useState<'all' | 'error' | 'warning' | 'info'>('all');
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Only show in development
    setShowDashboard(import.meta.env.DEV);

    // Load persisted errors
    errorMonitor.loadPersistedErrors();

    // Subscribe to new errors
    const unsubscribe = errorMonitor.onError(() => {
      updateData();
    });

    // Initial data load
    updateData();

    return () => {
      unsubscribe();
    };
  }, []);

  const updateData = () => {
    setErrors(errorMonitor.getErrors());
    setStats(errorMonitor.getStats());
  };

  const filteredErrors = filter === 'all' 
    ? errors 
    : errors.filter(e => e.level === filter);

  if (!showDashboard) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Error Monitor
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              errorMonitor.clearErrors();
              updateData();
            }}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Clear
          </button>
          <button
            onClick={() => setShowDashboard(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              label="Errors"
              value={stats.byLevel.error || 0}
              color="red"
              active={filter === 'error'}
              onClick={() => setFilter(filter === 'error' ? 'all' : 'error')}
            />
            <StatCard
              label="Warnings"
              value={stats.byLevel.warning || 0}
              color="yellow"
              active={filter === 'warning'}
              onClick={() => setFilter(filter === 'warning' ? 'all' : 'warning')}
            />
            <StatCard
              label="Info"
              value={stats.byLevel.info || 0}
              color="blue"
              active={filter === 'info'}
              onClick={() => setFilter(filter === 'info' ? 'all' : 'info')}
            />
          </div>
        </div>
      )}

      {/* Error List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredErrors.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full mb-3">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No errors logged
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredErrors.map((error) => (
              <ErrorCard key={error.id} error={error} />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
        <button
          onClick={() => {
            const data = errorMonitor.exportErrors();
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `error-logs-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
        >
          Export Logs
        </button>
        <button
          onClick={() => setFilter('all')}
          className="flex-1 px-3 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
        >
          Show All ({stats?.total || 0})
        </button>
      </div>
    </div>
  );
};

/**
 * Stat Card Component
 */
interface StatCardProps {
  label: string;
  value: number;
  color: 'red' | 'yellow' | 'blue';
  active: boolean;
  onClick: () => void;
}

const StatCard = ({ label, value, color, active, onClick }: StatCardProps) => {
  const colorClasses = {
    red: active
      ? 'bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-500'
      : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800',
    yellow: active
      ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500 dark:border-yellow-500'
      : 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800',
    blue: active
      ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-500'
      : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800',
  };

  const textColorClasses = {
    red: 'text-red-700 dark:text-red-300',
    yellow: 'text-yellow-700 dark:text-yellow-300',
    blue: 'text-blue-700 dark:text-blue-300',
  };

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg border-2 transition-all ${colorClasses[color]} hover:scale-105`}
    >
      <div className={`text-2xl font-bold ${textColorClasses[color]}`}>
        {value}
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
        {label}
      </div>
    </button>
  );
};

/**
 * Error Card Component
 */
interface ErrorCardProps {
  error: ErrorLog;
}

const ErrorCard = ({ error }: ErrorCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const levelColors: Record<string, string> = {
    error: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
    warning: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300',
    info: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
  };

  const levelIcons: Record<string, string> = {
    error: '🔴',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className={`p-3 rounded-lg border ${levelColors[error.level]}`}>
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span>{levelIcons[error.level]}</span>
            <span className="text-xs font-semibold uppercase">
              {error.level}
            </span>
            {error.context?.component && (
              <span className="text-xs opacity-75">
                • {error.context.component}
              </span>
            )}
          </div>
          <p className="text-sm font-medium break-words">
            {error.message}
          </p>
          <p className="text-xs opacity-75 mt-1">
            {new Date(error.timestamp).toLocaleTimeString()}
          </p>
        </div>
        <button className="text-xs ml-2">
          {expanded ? '▼' : '▶'}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-current/20">
          {error.context?.page && (
            <div className="text-xs mb-2">
              <span className="font-semibold">Page:</span> {error.context.page}
            </div>
          )}
          {error.stack && (
            <div className="text-xs">
              <span className="font-semibold">Stack:</span>
              <pre className="mt-1 p-2 bg-black/10 dark:bg-white/10 rounded text-xs overflow-x-auto">
                {error.stack}
              </pre>
            </div>
          )}
          {error.context?.metadata && (
            <div className="text-xs mt-2">
              <span className="font-semibold">Metadata:</span>
              <pre className="mt-1 p-2 bg-black/10 dark:bg-white/10 rounded text-xs overflow-x-auto">
                {JSON.stringify(error.context.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Toggle button for showing/hiding dashboard
 */
export const ErrorToggle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    const unsubscribe = errorMonitor.onError(() => {
      const errors = errorMonitor.getErrors();
      setErrorCount(errors.filter((e: any) => e.level === 'error').length);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!import.meta.env.DEV) return null;

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-20 left-4 z-40 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors relative"
        title="Toggle Error Dashboard"
      >
        🐛
        {errorCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-xs font-bold rounded-full flex items-center justify-center">
            {errorCount > 9 ? '9+' : errorCount}
          </span>
        )}
      </button>
      {isVisible && <ErrorDashboard />}
    </>
  );
};
