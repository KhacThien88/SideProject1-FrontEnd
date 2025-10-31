/**
 * Error Monitoring and Logging System
 * Integrates with Sentry and provides custom error tracking
 */

export interface ErrorContext {
  user?: {
    id?: string;
    email?: string;
    role?: string;
  };
  page?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, any>;
}

export interface ErrorLog {
  id: string;
  timestamp: number;
  level: 'error' | 'warning' | 'info';
  message: string;
  stack?: string;
  context?: ErrorContext;
  fingerprint?: string;
}

export interface ErrorStats {
  total: number;
  byLevel: Record<string, number>;
  byPage: Record<string, number>;
  byComponent: Record<string, number>;
  recent: ErrorLog[];
}

/**
 * Error Monitor Class
 */
export class ErrorMonitor {
  private static instance: ErrorMonitor;
  private errors: ErrorLog[] = [];
  private maxErrors: number = 100;
  private listeners: Array<(error: ErrorLog) => void> = [];
  private sentryInitialized: boolean = false;

  private constructor() {
    this.initializeErrorHandlers();
    this.initializeSentry();
  }

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor();
    }
    return ErrorMonitor.instance;
  }

  /**
   * Initialize global error handlers
   */
  private initializeErrorHandlers(): void {
    if (typeof window === 'undefined') return;

    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      this.captureError(event.error || new Error(event.message), {
        page: window.location.pathname,
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError(
        new Error(`Unhandled Promise Rejection: ${event.reason}`),
        {
          page: window.location.pathname,
          metadata: {
            reason: event.reason,
          },
        }
      );
    });

    // Handle console errors
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      this.captureError(new Error(args.join(' ')), {
        page: window.location.pathname,
        metadata: { consoleError: true },
      });
      originalConsoleError.apply(console, args);
    };
  }

  /**
   * Initialize Sentry
   */
  private initializeSentry(): void {
    if (typeof window === 'undefined') return;

    const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
    
    if (!sentryDsn) {
      console.warn('Sentry DSN not configured. Error tracking will be local only.');
      return;
    }

    try {
      // Check if Sentry is available
      if ((window as any).Sentry) {
        (window as any).Sentry.init({
          dsn: sentryDsn,
          environment: import.meta.env.MODE,
          integrations: [
            (window as any).Sentry.browserTracingIntegration(),
            (window as any).Sentry.replayIntegration(),
          ],
          tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
          replaysSessionSampleRate: 0.1,
          replaysOnErrorSampleRate: 1.0,
        });

        this.sentryInitialized = true;
        console.log('✅ Sentry initialized');
      }
    } catch (error) {
      console.error('Failed to initialize Sentry:', error);
    }
  }

  /**
   * Capture error
   */
  captureError(error: Error, context?: ErrorContext): void {
    const errorLog: ErrorLog = {
      id: this.generateId(),
      timestamp: Date.now(),
      level: 'error',
      message: error.message,
      stack: error.stack,
      context,
      fingerprint: this.generateFingerprint(error),
    };

    this.addError(errorLog);

    // Send to Sentry if initialized
    if (this.sentryInitialized && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        contexts: { custom: context },
        tags: {
          page: context?.page,
          component: context?.component,
        },
      });
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('🔴 [Error Captured]', error, context);
    }
  }

  /**
   * Capture warning
   */
  captureWarning(message: string, context?: ErrorContext): void {
    const errorLog: ErrorLog = {
      id: this.generateId(),
      timestamp: Date.now(),
      level: 'warning',
      message,
      context,
      fingerprint: this.generateFingerprint(new Error(message)),
    };

    this.addError(errorLog);

    // Send to Sentry if initialized
    if (this.sentryInitialized && (window as any).Sentry) {
      (window as any).Sentry.captureMessage(message, {
        level: 'warning',
        contexts: { custom: context },
      });
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.warn('⚠️ [Warning Captured]', message, context);
    }
  }

  /**
   * Capture info
   */
  captureInfo(message: string, context?: ErrorContext): void {
    const errorLog: ErrorLog = {
      id: this.generateId(),
      timestamp: Date.now(),
      level: 'info',
      message,
      context,
    };

    this.addError(errorLog);

    // Log to console in development
    if (import.meta.env.DEV) {
      console.info('ℹ️ [Info Captured]', message, context);
    }
  }

  /**
   * Add error to log
   */
  private addError(error: ErrorLog): void {
    this.errors.unshift(error);

    // Keep only max errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }

    // Notify listeners
    this.listeners.forEach(listener => listener(error));

    // Store in localStorage for persistence
    this.persistErrors();
  }

  /**
   * Persist errors to localStorage
   */
  private persistErrors(): void {
    if (typeof localStorage === 'undefined') return;

    try {
      const recentErrors = this.errors.slice(0, 20);
      localStorage.setItem('error_logs', JSON.stringify(recentErrors));
    } catch (error) {
      console.error('Failed to persist errors:', error);
    }
  }

  /**
   * Load errors from localStorage
   */
  loadPersistedErrors(): void {
    if (typeof localStorage === 'undefined') return;

    try {
      const stored = localStorage.getItem('error_logs');
      if (stored) {
        const errors = JSON.parse(stored);
        this.errors = [...errors, ...this.errors];
      }
    } catch (error) {
      console.error('Failed to load persisted errors:', error);
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate error fingerprint for grouping
   */
  private generateFingerprint(error: Error): string {
    const message = error.message.replace(/\d+/g, 'N'); // Replace numbers
    const stack = error.stack?.split('\n')[0] || '';
    return `${message}-${stack}`;
  }

  /**
   * Set user context
   */
  setUser(user: ErrorContext['user']): void {
    if (this.sentryInitialized && (window as any).Sentry) {
      (window as any).Sentry.setUser(user);
    }
  }

  /**
   * Clear user context
   */
  clearUser(): void {
    if (this.sentryInitialized && (window as any).Sentry) {
      (window as any).Sentry.setUser(null);
    }
  }

  /**
   * Add breadcrumb
   */
  addBreadcrumb(message: string, category: string, data?: Record<string, any>): void {
    if (this.sentryInitialized && (window as any).Sentry) {
      (window as any).Sentry.addBreadcrumb({
        message,
        category,
        data,
        level: 'info',
      });
    }
  }

  /**
   * Subscribe to errors
   */
  onError(callback: (error: ErrorLog) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  /**
   * Get all errors
   */
  getErrors(): ErrorLog[] {
    return [...this.errors];
  }

  /**
   * Get errors by level
   */
  getErrorsByLevel(level: ErrorLog['level']): ErrorLog[] {
    return this.errors.filter(e => e.level === level);
  }

  /**
   * Get errors by page
   */
  getErrorsByPage(page: string): ErrorLog[] {
    return this.errors.filter(e => e.context?.page === page);
  }

  /**
   * Get error statistics
   */
  getStats(): ErrorStats {
    const stats: ErrorStats = {
      total: this.errors.length,
      byLevel: {},
      byPage: {},
      byComponent: {},
      recent: this.errors.slice(0, 10),
    };

    this.errors.forEach(error => {
      // Count by level
      stats.byLevel[error.level] = (stats.byLevel[error.level] || 0) + 1;

      // Count by page
      if (error.context?.page) {
        stats.byPage[error.context.page] = (stats.byPage[error.context.page] || 0) + 1;
      }

      // Count by component
      if (error.context?.component) {
        stats.byComponent[error.context.component] = (stats.byComponent[error.context.component] || 0) + 1;
      }
    });

    return stats;
  }

  /**
   * Clear all errors
   */
  clearErrors(): void {
    this.errors = [];
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('error_logs');
    }
  }

  /**
   * Export errors as JSON
   */
  exportErrors(): string {
    return JSON.stringify(this.errors, null, 2);
  }
}

/**
 * Session Recording Manager
 */
export class SessionRecorder {
  private static instance: SessionRecorder;
  private isRecording: boolean = false;
  private sessionId: string | null = null;

  private constructor() {
    this.initializeRecording();
  }

  static getInstance(): SessionRecorder {
    if (!SessionRecorder.instance) {
      SessionRecorder.instance = new SessionRecorder();
    }
    return SessionRecorder.instance;
  }

  /**
   * Initialize session recording
   */
  private initializeRecording(): void {
    if (typeof window === 'undefined') return;

    // Check if Sentry Replay is available
    if ((window as any).Sentry && import.meta.env.PROD) {
      this.isRecording = true;
      this.sessionId = this.generateSessionId();
      console.log('✅ Session recording initialized');
    }
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Start recording
   */
  startRecording(): void {
    if (!this.isRecording) {
      this.isRecording = true;
      this.sessionId = this.generateSessionId();
    }
  }

  /**
   * Stop recording
   */
  stopRecording(): void {
    this.isRecording = false;
    this.sessionId = null;
  }

  /**
   * Get session ID
   */
  getSessionId(): string | null {
    return this.sessionId;
  }

  /**
   * Check if recording
   */
  isActive(): boolean {
    return this.isRecording;
  }
}

/**
 * Error Alerting System
 */
export interface AlertRule {
  id: string;
  name: string;
  condition: (error: ErrorLog) => boolean;
  action: (error: ErrorLog) => void;
  enabled: boolean;
}

export class ErrorAlerter {
  private static instance: ErrorAlerter;
  private rules: AlertRule[] = [];

  private constructor() {
    this.setupDefaultRules();
  }

  static getInstance(): ErrorAlerter {
    if (!ErrorAlerter.instance) {
      ErrorAlerter.instance = new ErrorAlerter();
    }
    return ErrorAlerter.instance;
  }

  /**
   * Setup default alert rules
   */
  private setupDefaultRules(): void {
    // Alert on critical errors
    this.addRule({
      id: 'critical-errors',
      name: 'Critical Errors',
      condition: (error) => error.level === 'error' && error.message.includes('critical'),
      action: (error) => {
        console.error('🚨 CRITICAL ERROR ALERT:', error);
        // Send notification (email, Slack, etc.)
      },
      enabled: true,
    });

    // Alert on high error rate
    this.addRule({
      id: 'high-error-rate',
      name: 'High Error Rate',
      condition: () => {
        const monitor = ErrorMonitor.getInstance();
        const recentErrors = monitor.getErrors().filter(
          e => Date.now() - e.timestamp < 60000 // Last minute
        );
        return recentErrors.length > 10;
      },
      action: () => {
        console.error('🚨 HIGH ERROR RATE ALERT: More than 10 errors in the last minute');
      },
      enabled: true,
    });
  }

  /**
   * Add alert rule
   */
  addRule(rule: AlertRule): void {
    this.rules.push(rule);
  }

  /**
   * Remove alert rule
   */
  removeRule(id: string): void {
    this.rules = this.rules.filter(r => r.id !== id);
  }

  /**
   * Check error against rules
   */
  checkError(error: ErrorLog): void {
    this.rules.forEach(rule => {
      if (rule.enabled && rule.condition(error)) {
        rule.action(error);
      }
    });
  }

  /**
   * Get all rules
   */
  getRules(): AlertRule[] {
    return [...this.rules];
  }

  /**
   * Enable rule
   */
  enableRule(id: string): void {
    const rule = this.rules.find(r => r.id === id);
    if (rule) rule.enabled = true;
  }

  /**
   * Disable rule
   */
  disableRule(id: string): void {
    const rule = this.rules.find(r => r.id === id);
    if (rule) rule.enabled = false;
  }
}

/**
 * Export singleton instances
 */
export const errorMonitor = ErrorMonitor.getInstance();
export const sessionRecorder = SessionRecorder.getInstance();
export const errorAlerter = ErrorAlerter.getInstance();

// Setup error alerting
errorMonitor.onError((error) => {
  errorAlerter.checkError(error);
});
