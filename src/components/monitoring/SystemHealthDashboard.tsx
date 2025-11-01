import { useEffect, useState } from 'react';
import { systemMonitor, backupManager, type SystemHealth, type Alert } from '@/utils/monitoring';

/**
 * System Health Dashboard Component
 * Displays real-time system health and alerts
 */
export const SystemHealthDashboard = () => {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Only show in development
    setShowDashboard(import.meta.env.DEV);

    // Subscribe to health updates
    const unsubscribe = systemMonitor.onHealthUpdate((newHealth: SystemHealth) => {
      setHealth(newHealth);
    });

    // Initial health check
    setHealth(systemMonitor.checkHealth());
    setAlerts(systemMonitor.getAlerts());

    // Update alerts periodically
    const interval = setInterval(() => {
      setAlerts(systemMonitor.getAlerts());
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleBackup = () => {
    try {
      backupManager.downloadBackup();
      alert('✅ Backup downloaded successfully!');
    } catch (error) {
      alert(`❌ Backup failed: ${(error as Error).message}`);
    }
  };

  const handleRestore = async () => {
    if (confirm('Are you sure you want to restore from backup? This will overwrite current data.')) {
      try {
        await backupManager.uploadBackup();
        alert('✅ Backup restored successfully!');
        window.location.reload();
      } catch (error) {
        alert(`❌ Restore failed: ${(error as Error).message}`);
      }
    }
  };

  if (!showDashboard || !health) return null;

  const statusColors: Record<string, string> = {
    healthy: 'bg-green-500',
    degraded: 'bg-yellow-500',
    critical: 'bg-red-500',
  };

  const statusTextColors: Record<string, string> = {
    healthy: 'text-green-700 dark:text-green-300',
    degraded: 'text-yellow-700 dark:text-yellow-300',
    critical: 'text-red-700 dark:text-red-300',
  };

  const unresolvedAlerts = alerts.filter(a => !a.resolved);

  return (
    <div className="fixed top-20 right-4 z-50 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${statusColors[health.status]} animate-pulse`} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            System Health
          </h3>
        </div>
        <button
          onClick={() => setShowDashboard(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      {/* Status */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </span>
          <span className={`text-lg font-bold uppercase ${statusTextColors[health.status]}`}>
            {health.status}
          </span>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Uptime: {systemMonitor.getUptimeFormatted()}
        </div>
      </div>

      {/* Metrics */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          System Metrics
        </h4>
        <div className="space-y-3">
          <MetricBar
            label="Performance Score"
            value={health.metrics.performanceScore}
            max={100}
            unit="%"
            color={health.metrics.performanceScore >= 80 ? 'green' : health.metrics.performanceScore >= 60 ? 'yellow' : 'red'}
          />
          <MetricBar
            label="Error Rate"
            value={health.metrics.errorRate}
            max={10}
            unit="/min"
            color={health.metrics.errorRate < 2 ? 'green' : health.metrics.errorRate < 5 ? 'yellow' : 'red'}
            inverse
          />
          <MetricBar
            label="Memory Usage"
            value={health.metrics.memoryUsage}
            max={100}
            unit="%"
            color={health.metrics.memoryUsage < 70 ? 'green' : health.metrics.memoryUsage < 85 ? 'yellow' : 'red'}
            inverse
          />
          <MetricBar
            label="Response Time"
            value={health.metrics.responseTime}
            max={1000}
            unit="ms"
            color={health.metrics.responseTime < 300 ? 'green' : health.metrics.responseTime < 600 ? 'yellow' : 'red'}
            inverse
          />
        </div>
      </div>

      {/* Alerts */}
      {unresolvedAlerts.length > 0 && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Active Alerts ({unresolvedAlerts.length})
            </h4>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {unresolvedAlerts.slice(0, 3).map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onResolve={() => {
                  systemMonitor.resolveAlert(alert.id);
                  setAlerts(systemMonitor.getAlerts());
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 space-y-2">
        <button
          onClick={handleBackup}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          💾 Create Backup
        </button>
        <button
          onClick={handleRestore}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          📥 Restore Backup
        </button>
      </div>
    </div>
  );
};

/**
 * Metric Bar Component
 */
interface MetricBarProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: 'green' | 'yellow' | 'red';
  inverse?: boolean;
}

const MetricBar = ({ label, value, max, unit, color }: MetricBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-xs font-semibold text-gray-900 dark:text-white">
          {value.toFixed(1)}{unit}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/**
 * Alert Card Component
 */
interface AlertCardProps {
  alert: Alert;
  onResolve: () => void;
}

const AlertCard = ({ alert, onResolve }: AlertCardProps) => {
  const severityColors: Record<string, string> = {
    info: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    warning: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300',
    critical: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
  };

  const severityIcons: Record<string, string> = {
    info: 'ℹ️',
    warning: '⚠️',
    critical: '🔴',
  };

  return (
    <div className={`p-2 rounded border ${severityColors[alert.severity]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span>{severityIcons[alert.severity]}</span>
            <span className="text-xs font-semibold">{alert.title}</span>
          </div>
          <p className="text-xs">{alert.message}</p>
          <p className="text-xs opacity-75 mt-1">
            {new Date(alert.timestamp).toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={onResolve}
          className="text-xs ml-2 hover:opacity-75"
          title="Resolve"
        >
          ✓
        </button>
      </div>
    </div>
  );
};

/**
 * Toggle button for showing/hiding dashboard
 */
export const SystemHealthToggle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [health, setHealth] = useState<SystemHealth | null>(null);

  useEffect(() => {
    const unsubscribe = systemMonitor.onHealthUpdate((newHealth: SystemHealth) => {
      setHealth(newHealth);
    });

    setHealth(systemMonitor.checkHealth());

    return () => {
      unsubscribe();
    };
  }, []);

  if (!import.meta.env.DEV) return null;

  const statusColors: Record<string, string> = {
    healthy: 'bg-green-600 hover:bg-green-700',
    degraded: 'bg-yellow-600 hover:bg-yellow-700',
    critical: 'bg-red-600 hover:bg-red-700',
  };

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`fixed top-4 right-20 z-40 w-12 h-12 ${health ? statusColors[health.status] : 'bg-gray-600 hover:bg-gray-700'} text-white rounded-full shadow-lg flex items-center justify-center transition-colors`}
        title="Toggle System Health Dashboard"
      >
        💚
      </button>
      {isVisible && <SystemHealthDashboard />}
    </>
  );
};
