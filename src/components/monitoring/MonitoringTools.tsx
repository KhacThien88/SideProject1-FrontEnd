/**
 * Monitoring Tools - All-in-One Component
 * Combines all monitoring dashboards and tools
 */

import { PerformanceToggle } from './PerformanceDashboard';
import { ErrorToggle } from './ErrorDashboard';
import { ContentEditorToggle } from '../cms/ContentEditor';
import { SystemHealthToggle } from './SystemHealthDashboard';
import { useEffect } from 'react';
import { initializeDebugTools } from '@/utils/debugTools';
import { errorMonitor } from '@/utils/errorMonitoring';
import { systemMonitor } from '@/utils/monitoring';

/**
 * Monitoring Tools Component
 * Add this component to your app root to enable all monitoring tools
 * 
 * @example
 * ```tsx
 * import { MonitoringTools } from '@/components/monitoring/MonitoringTools';
 * 
 * function App() {
 *   return (
 *     <>
 *       <YourApp />
 *       <MonitoringTools />
 *     </>
 *   );
 * }
 * ```
 */
export const MonitoringTools = () => {
  useEffect(() => {
    // Initialize debug tools
    initializeDebugTools();

    // Load persisted errors
    errorMonitor.loadPersistedErrors();

    // Start system monitoring
    systemMonitor.checkHealth();

    // Log initialization
    if (import.meta.env.DEV) {
      console.log('🔧 Monitoring tools initialized');
      console.log('📊 Performance Dashboard: Click bottom-right button');
      console.log('🐛 Error Dashboard: Click bottom-left button');
      console.log('📝 Content Editor: Click top-right button');
      console.log('💚 System Health: Click top-right button (green)');
      console.log('🔍 Debug Panel: Press Ctrl+Shift+D');
    }
  }, []);

  // Only render in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <>
      {/* Performance Monitoring */}
      <PerformanceToggle />

      {/* Error Monitoring */}
      <ErrorToggle />

      {/* Content Management */}
      <ContentEditorToggle />

      {/* System Health */}
      <SystemHealthToggle />
    </>
  );
};

/**
 * Monitoring Provider
 * Wraps your app with monitoring context
 * 
 * @example
 * ```tsx
 * import { MonitoringProvider } from '@/components/monitoring/MonitoringTools';
 * 
 * function App() {
 *   return (
 *     <MonitoringProvider>
 *       <YourApp />
 *     </MonitoringProvider>
 *   );
 * }
 * ```
 */
export const MonitoringProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <MonitoringTools />
    </>
  );
};

export default MonitoringTools;
