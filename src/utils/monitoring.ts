/**
 * System Monitoring and Alerting
 * Provides real-time monitoring and alerting for production systems
 */

import { errorMonitor } from './errorMonitoring';
import { performanceMonitor } from './performance';

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  uptime: number;
  metrics: {
    errorRate: number;
    performanceScore: number;
    memoryUsage: number;
    responseTime: number;
  };
  timestamp: number;
}

export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: number;
  resolved: boolean;
}

/**
 * System Monitor Class
 */
export class SystemMonitor {
  private static instance: SystemMonitor;
  private startTime: number = Date.now();
  private alerts: Alert[] = [];
  private healthCheckInterval?: number;
  private listeners: Array<(health: SystemHealth) => void> = [];

  private constructor() {
    this.startHealthChecks();
  }

  static getInstance(): SystemMonitor {
    if (!SystemMonitor.instance) {
      SystemMonitor.instance = new SystemMonitor();
    }
    return SystemMonitor.instance;
  }

  /**
   * Start health checks
   */
  private startHealthChecks(): void {
    if (typeof window === 'undefined') return;

    this.healthCheckInterval = window.setInterval(() => {
      const health = this.checkHealth();
      this.notifyListeners(health);

      // Create alerts based on health
      if (health.status === 'critical') {
        this.createAlert({
          severity: 'critical',
          title: 'System Critical',
          message: 'System health is critical. Immediate attention required.',
        });
      } else if (health.status === 'degraded') {
        this.createAlert({
          severity: 'warning',
          title: 'System Degraded',
          message: 'System performance is degraded.',
        });
      }
    }, 30000); // Check every 30 seconds
  }

  /**
   * Stop health checks
   */
  stopHealthChecks(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = undefined;
    }
  }

  /**
   * Check system health
   */
  checkHealth(): SystemHealth {
    const errors = errorMonitor.getErrors();
    const recentErrors = errors.filter(e => Date.now() - e.timestamp < 300000); // Last 5 minutes
    const errorRate = recentErrors.length / 5; // Errors per minute

    const vitals = performanceMonitor.getCoreWebVitals();
    const grade = performanceMonitor.getPerformanceGrade();

    const memoryUsage = this.getMemoryUsage();
    const responseTime = vitals.TTFB || 0;

    let status: SystemHealth['status'] = 'healthy';

    // Determine status
    if (errorRate > 10 || grade.score < 50 || memoryUsage > 90) {
      status = 'critical';
    } else if (errorRate > 5 || grade.score < 70 || memoryUsage > 75) {
      status = 'degraded';
    }

    return {
      status,
      uptime: Date.now() - this.startTime,
      metrics: {
        errorRate,
        performanceScore: grade.score,
        memoryUsage,
        responseTime,
      },
      timestamp: Date.now(),
    };
  }

  /**
   * Get memory usage
   */
  private getMemoryUsage(): number {
    if (typeof performance === 'undefined' || !(performance as any).memory) {
      return 0;
    }

    const memory = (performance as any).memory;
    return (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
  }

  /**
   * Create alert
   */
  private createAlert(alert: Omit<Alert, 'id' | 'timestamp' | 'resolved'>): void {
    const newAlert: Alert = {
      id: this.generateId(),
      ...alert,
      timestamp: Date.now(),
      resolved: false,
    };

    this.alerts.unshift(newAlert);

    // Keep only last 50 alerts
    if (this.alerts.length > 50) {
      this.alerts = this.alerts.slice(0, 50);
    }

    // Log alert
    if (import.meta.env.DEV) {
      const emoji = alert.severity === 'critical' ? '🔴' : alert.severity === 'warning' ? '⚠️' : 'ℹ️';
      console.warn(`${emoji} [Alert] ${alert.title}: ${alert.message}`);
    }
  }

  /**
   * Resolve alert
   */
  resolveAlert(id: string): void {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.resolved = true;
    }
  }

  /**
   * Get all alerts
   */
  getAlerts(): Alert[] {
    return [...this.alerts];
  }

  /**
   * Get unresolved alerts
   */
  getUnresolvedAlerts(): Alert[] {
    return this.alerts.filter(a => !a.resolved);
  }

  /**
   * Subscribe to health updates
   */
  onHealthUpdate(callback: (health: SystemHealth) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  /**
   * Notify listeners
   */
  private notifyListeners(health: SystemHealth): void {
    this.listeners.forEach(listener => listener(health));
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get uptime in human-readable format
   */
  getUptimeFormatted(): string {
    const uptime = Date.now() - this.startTime;
    const seconds = Math.floor(uptime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }
}

/**
 * Backup and Recovery Manager
 */
export class BackupManager {
  private static instance: BackupManager;

  private constructor() {}

  static getInstance(): BackupManager {
    if (!BackupManager.instance) {
      BackupManager.instance = new BackupManager();
    }
    return BackupManager.instance;
  }

  /**
   * Create backup of localStorage
   */
  createBackup(): string {
    if (typeof localStorage === 'undefined') {
      throw new Error('localStorage not available');
    }

    const backup: Record<string, any> = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          backup[key] = JSON.parse(localStorage.getItem(key) || '');
        } catch {
          backup[key] = localStorage.getItem(key);
        }
      }
    }

    return JSON.stringify({
      timestamp: Date.now(),
      data: backup,
    });
  }

  /**
   * Restore from backup
   */
  restoreBackup(backupData: string): void {
    if (typeof localStorage === 'undefined') {
      throw new Error('localStorage not available');
    }

    try {
      const backup = JSON.parse(backupData);

      // Clear current data
      localStorage.clear();

      // Restore backup
      Object.entries(backup.data).forEach(([key, value]) => {
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      });

      console.log('✅ Backup restored successfully');
    } catch (error) {
      errorMonitor.captureError(error as Error, {
        component: 'BackupManager',
        action: 'restoreBackup',
      });
      throw error;
    }
  }

  /**
   * Download backup file
   */
  downloadBackup(): void {
    const backup = this.createBackup();
    const blob = new Blob([backup], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Upload and restore backup
   */
  uploadBackup(): Promise<void> {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const data = event.target?.result as string;
              this.restoreBackup(data);
              resolve();
            } catch (error) {
              reject(error);
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    });
  }
}

/**
 * Load Testing Utilities
 */
export class LoadTester {
  private static instance: LoadTester;

  private constructor() {}

  static getInstance(): LoadTester {
    if (!LoadTester.instance) {
      LoadTester.instance = new LoadTester();
    }
    return LoadTester.instance;
  }

  /**
   * Simulate concurrent users
   */
  async simulateLoad(
    url: string,
    concurrentUsers: number,
    duration: number
  ): Promise<{
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageResponseTime: number;
    maxResponseTime: number;
    minResponseTime: number;
  }> {
    const results: number[] = [];
    let successful = 0;
    let failed = 0;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const makeRequest = async (): Promise<void> => {
      while (Date.now() < endTime) {
        const requestStart = Date.now();
        try {
          await fetch(url);
          const responseTime = Date.now() - requestStart;
          results.push(responseTime);
          successful++;
        } catch {
          failed++;
        }
      }
    };

    // Create concurrent requests
    const promises = Array(concurrentUsers)
      .fill(null)
      .map(() => makeRequest());

    await Promise.all(promises);

    return {
      totalRequests: successful + failed,
      successfulRequests: successful,
      failedRequests: failed,
      averageResponseTime: results.reduce((a, b) => a + b, 0) / results.length,
      maxResponseTime: Math.max(...results),
      minResponseTime: Math.min(...results),
    };
  }

  /**
   * Test API endpoint
   */
  async testEndpoint(url: string, iterations: number = 10): Promise<{
    successRate: number;
    averageResponseTime: number;
    results: Array<{ success: boolean; responseTime: number }>;
  }> {
    const results: Array<{ success: boolean; responseTime: number }> = [];

    for (let i = 0; i < iterations; i++) {
      const start = Date.now();
      try {
        await fetch(url);
        results.push({
          success: true,
          responseTime: Date.now() - start,
        });
      } catch {
        results.push({
          success: false,
          responseTime: Date.now() - start,
        });
      }
    }

    const successful = results.filter(r => r.success).length;
    const avgResponseTime =
      results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;

    return {
      successRate: (successful / iterations) * 100,
      averageResponseTime: avgResponseTime,
      results,
    };
  }
}

/**
 * Export singleton instances
 */
export const systemMonitor = SystemMonitor.getInstance();
export const backupManager = BackupManager.getInstance();
export const loadTester = LoadTester.getInstance();
