/**
 * Development Debugging Tools
 * Provides utilities for debugging in development mode
 */

import { errorMonitor } from './errorMonitoring';
import { performanceMonitor } from './performance';

export interface DebugInfo {
  environment: string;
  version: string;
  userAgent: string;
  viewport: { width: number; height: number };
  performance: any;
  errors: any[];
  localStorage: Record<string, any>;
  sessionStorage: Record<string, any>;
  cookies: string;
}

/**
 * Debug Logger Class
 */
export class DebugLogger {
  private static instance: DebugLogger;
  private logs: Array<{ timestamp: number; level: string; message: string; data?: any }> = [];
  private maxLogs: number = 500;

  private constructor() {
    this.interceptConsoleMethods();
  }

  static getInstance(): DebugLogger {
    if (!DebugLogger.instance) {
      DebugLogger.instance = new DebugLogger();
    }
    return DebugLogger.instance;
  }

  /**
   * Intercept console methods
   */
  private interceptConsoleMethods(): void {
    if (!import.meta.env.DEV) return;

    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalInfo = console.info;

    console.log = (...args: any[]) => {
      this.addLog('log', args.join(' '), args);
      originalLog.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      this.addLog('warn', args.join(' '), args);
      originalWarn.apply(console, args);
    };

    console.error = (...args: any[]) => {
      this.addLog('error', args.join(' '), args);
      originalError.apply(console, args);
    };

    console.info = (...args: any[]) => {
      this.addLog('info', args.join(' '), args);
      originalInfo.apply(console, args);
    };
  }

  /**
   * Add log entry
   */
  private addLog(level: string, message: string, data?: any): void {
    this.logs.push({
      timestamp: Date.now(),
      level,
      message,
      data,
    });

    // Keep only max logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  /**
   * Get all logs
   */
  getLogs(): typeof this.logs {
    return [...this.logs];
  }

  /**
   * Clear logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

/**
 * Debug Panel Manager
 */
export class DebugPanel {
  private static instance: DebugPanel;
  private isVisible: boolean = false;
  private panel: HTMLDivElement | null = null;

  private constructor() {
    this.createPanel();
    this.setupKeyboardShortcut();
  }

  static getInstance(): DebugPanel {
    if (!DebugPanel.instance) {
      DebugPanel.instance = new DebugPanel();
    }
    return DebugPanel.instance;
  }

  /**
   * Create debug panel
   */
  private createPanel(): void {
    if (typeof document === 'undefined' || !import.meta.env.DEV) return;

    this.panel = document.createElement('div');
    this.panel.id = 'debug-panel';
    this.panel.style.cssText = `
      position: fixed;
      top: 0;
      right: -400px;
      width: 400px;
      height: 100vh;
      background: white;
      box-shadow: -2px 0 10px rgba(0,0,0,0.1);
      z-index: 9999;
      transition: right 0.3s ease;
      overflow-y: auto;
      font-family: monospace;
      font-size: 12px;
    `;

    document.body.appendChild(this.panel);
  }

  /**
   * Setup keyboard shortcut (Ctrl+Shift+D)
   */
  private setupKeyboardShortcut(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  /**
   * Toggle panel visibility
   */
  toggle(): void {
    if (!this.panel) return;

    this.isVisible = !this.isVisible;
    this.panel.style.right = this.isVisible ? '0' : '-400px';

    if (this.isVisible) {
      this.updateContent();
    }
  }

  /**
   * Show panel
   */
  show(): void {
    if (!this.panel) return;
    this.isVisible = true;
    this.panel.style.right = '0';
    this.updateContent();
  }

  /**
   * Hide panel
   */
  hide(): void {
    if (!this.panel) return;
    this.isVisible = false;
    this.panel.style.right = '-400px';
  }

  /**
   * Update panel content
   */
  private updateContent(): void {
    if (!this.panel) return;

    const debugInfo = this.collectDebugInfo();

    this.panel.innerHTML = `
      <div style="padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 18px; font-weight: bold;">Debug Panel</h2>
          <button onclick="document.getElementById('debug-panel').style.right = '-400px'" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
            Close
          </button>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="font-weight: bold; margin-bottom: 10px;">Environment</h3>
          <pre style="background: #f3f4f6; padding: 10px; border-radius: 4px; overflow-x: auto;">${JSON.stringify(debugInfo.environment, null, 2)}</pre>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="font-weight: bold; margin-bottom: 10px;">Performance</h3>
          <pre style="background: #f3f4f6; padding: 10px; border-radius: 4px; overflow-x: auto;">${JSON.stringify(debugInfo.performance, null, 2)}</pre>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="font-weight: bold; margin-bottom: 10px;">Recent Errors (${debugInfo.errors.length})</h3>
          <pre style="background: #fee2e2; padding: 10px; border-radius: 4px; overflow-x: auto; max-height: 200px;">${JSON.stringify(debugInfo.errors, null, 2)}</pre>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="font-weight: bold; margin-bottom: 10px;">Storage</h3>
          <pre style="background: #f3f4f6; padding: 10px; border-radius: 4px; overflow-x: auto; max-height: 200px;">${JSON.stringify({ localStorage: debugInfo.localStorage, sessionStorage: debugInfo.sessionStorage }, null, 2)}</pre>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="font-weight: bold; margin-bottom: 10px;">Actions</h3>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <button onclick="localStorage.clear(); sessionStorage.clear(); alert('Storage cleared!')" style="background: #3b82f6; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer;">
              Clear Storage
            </button>
            <button onclick="window.location.reload()" style="background: #10b981; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer;">
              Reload Page
            </button>
            <button onclick="navigator.clipboard.writeText(JSON.stringify(${JSON.stringify(debugInfo)}, null, 2)); alert('Debug info copied!')" style="background: #8b5cf6; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer;">
              Copy Debug Info
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Collect debug information
   */
  private collectDebugInfo(): DebugInfo {
    const errors = errorMonitor.getErrors().slice(0, 5);
    const vitals = performanceMonitor.getCoreWebVitals();

    const localStorage: Record<string, any> = {};
    const sessionStorage: Record<string, any> = {};

    if (typeof window !== 'undefined') {
      // Collect localStorage
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key) {
          try {
            localStorage[key] = JSON.parse(window.localStorage.getItem(key) || '');
          } catch {
            localStorage[key] = window.localStorage.getItem(key);
          }
        }
      }

      // Collect sessionStorage
      for (let i = 0; i < window.sessionStorage.length; i++) {
        const key = window.sessionStorage.key(i);
        if (key) {
          try {
            sessionStorage[key] = JSON.parse(window.sessionStorage.getItem(key) || '');
          } catch {
            sessionStorage[key] = window.sessionStorage.getItem(key);
          }
        }
      }
    }

    return {
      environment: import.meta.env.MODE,
      version: import.meta.env.VITE_APP_VERSION || 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      viewport: {
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
      },
      performance: vitals,
      errors: errors.map(e => ({
        level: e.level,
        message: e.message,
        timestamp: new Date(e.timestamp).toISOString(),
      })),
      localStorage,
      sessionStorage,
      cookies: typeof document !== 'undefined' ? document.cookie : '',
    };
  }
}

/**
 * Network Monitor
 */
export class NetworkMonitor {
  private static instance: NetworkMonitor;
  private requests: Array<{
    url: string;
    method: string;
    status?: number;
    duration?: number;
    timestamp: number;
  }> = [];

  private constructor() {
    this.interceptFetch();
    this.interceptXHR();
  }

  static getInstance(): NetworkMonitor {
    if (!NetworkMonitor.instance) {
      NetworkMonitor.instance = new NetworkMonitor();
    }
    return NetworkMonitor.instance;
  }

  /**
   * Intercept fetch requests
   */
  private interceptFetch(): void {
    if (typeof window === 'undefined') return;

    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const startTime = Date.now();
      const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;
      const method = args[1]?.method || 'GET';

      try {
        const response = await originalFetch(...args);
        const duration = Date.now() - startTime;

        this.addRequest({
          url,
          method,
          status: response.status,
          duration,
          timestamp: Date.now(),
        });

        return response;
      } catch (error) {
        this.addRequest({
          url,
          method,
          status: 0,
          duration: Date.now() - startTime,
          timestamp: Date.now(),
        });
        throw error;
      }
    };
  }

  /**
   * Intercept XMLHttpRequest
   */
  private interceptXHR(): void {
    if (typeof window === 'undefined') return;

    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method: string, url: string) {
      (this as any)._debugMethod = method;
      (this as any)._debugUrl = url;
      (this as any)._debugStartTime = Date.now();
      return originalOpen.apply(this, arguments as any);
    };

    XMLHttpRequest.prototype.send = function () {
      const xhr = this;
      const monitor = NetworkMonitor.getInstance();

      xhr.addEventListener('loadend', () => {
        const duration = Date.now() - (xhr as any)._debugStartTime;
        monitor.addRequest({
          url: (xhr as any)._debugUrl,
          method: (xhr as any)._debugMethod,
          status: xhr.status,
          duration,
          timestamp: Date.now(),
        });
      });

      return originalSend.apply(this, arguments as any);
    };
  }

  /**
   * Add request to log
   */
  private addRequest(request: typeof this.requests[0]): void {
    this.requests.push(request);

    // Keep only last 100 requests
    if (this.requests.length > 100) {
      this.requests = this.requests.slice(-100);
    }
  }

  /**
   * Get all requests
   */
  getRequests(): typeof this.requests {
    return [...this.requests];
  }

  /**
   * Get failed requests
   */
  getFailedRequests(): typeof this.requests {
    return this.requests.filter(r => r.status && r.status >= 400);
  }

  /**
   * Get slow requests
   */
  getSlowRequests(threshold: number = 1000): typeof this.requests {
    return this.requests.filter(r => r.duration && r.duration > threshold);
  }

  /**
   * Clear requests
   */
  clearRequests(): void {
    this.requests = [];
  }
}

/**
 * Export singleton instances
 */
export const debugLogger = DebugLogger.getInstance();
export const debugPanel = DebugPanel.getInstance();
export const networkMonitor = NetworkMonitor.getInstance();

/**
 * Initialize debug tools
 */
export const initializeDebugTools = (): void => {
  if (!import.meta.env.DEV) return;

  console.log('🔧 Debug tools initialized');
  console.log('Press Ctrl+Shift+D to open debug panel');

  // Add debug info to window for console access
  (window as any).__DEBUG__ = {
    logger: debugLogger,
    panel: debugPanel,
    network: networkMonitor,
    errors: errorMonitor,
    performance: performanceMonitor,
  };
};
