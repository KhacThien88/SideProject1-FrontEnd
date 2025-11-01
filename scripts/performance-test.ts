#!/usr/bin/env node

/**
 * Automated Performance Testing Script
 * Run performance tests and generate reports
 */

import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface PerformanceMetrics {
  LCP: number;
  FID: number;
  CLS: number;
  FCP: number;
  TTFB: number;
  loadTime: number;
  domContentLoaded: number;
}

interface TestResult {
  url: string;
  timestamp: string;
  metrics: PerformanceMetrics;
  passed: boolean;
  violations: string[];
  score: number;
}

const PERFORMANCE_BUDGET = {
  LCP: 2500,
  FID: 100,
  CLS: 0.1,
  FCP: 1800,
  TTFB: 600,
  loadTime: 3000,
};

/**
 * Collect performance metrics from page
 */
async function collectMetrics(page: Page): Promise<PerformanceMetrics> {
  const metrics = await page.evaluate(() => {
    return new Promise<PerformanceMetrics>((resolve) => {
      const result: Partial<PerformanceMetrics> = {};

      // Get navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        result.loadTime = navigation.loadEventEnd - navigation.fetchStart;
        result.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        result.TTFB = navigation.responseStart - navigation.requestStart;
      }

      // Get paint timing
      const paint = performance.getEntriesByType('paint');
      const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
      if (fcp) {
        result.FCP = fcp.startTime;
      }

      // Observe Core Web Vitals
      let lcpValue = 0;
      let fidValue = 0;
      let clsValue = 0;

      // LCP Observer
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        lcpValue = lastEntry.renderTime || lastEntry.loadTime || 0;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID Observer
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          fidValue = entry.processingStart - entry.startTime;
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS Observer
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Wait for metrics to be collected
      setTimeout(() => {
        result.LCP = lcpValue;
        result.FID = fidValue;
        result.CLS = clsValue;

        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();

        resolve(result as PerformanceMetrics);
      }, 3000);
    });
  });

  return metrics;
}

/**
 * Calculate performance score
 */
function calculateScore(metrics: PerformanceMetrics): number {
  let score = 100;

  // LCP scoring
  if (metrics.LCP > 4000) score -= 30;
  else if (metrics.LCP > 2500) score -= 15;

  // FID scoring
  if (metrics.FID > 300) score -= 30;
  else if (metrics.FID > 100) score -= 15;

  // CLS scoring
  if (metrics.CLS > 0.25) score -= 30;
  else if (metrics.CLS > 0.1) score -= 15;

  // FCP scoring
  if (metrics.FCP > 3000) score -= 10;
  else if (metrics.FCP > 1800) score -= 5;

  return Math.max(0, score);
}

/**
 * Check budget violations
 */
function checkBudget(metrics: PerformanceMetrics): string[] {
  const violations: string[] = [];

  if (metrics.LCP > PERFORMANCE_BUDGET.LCP) {
    violations.push(`LCP (${metrics.LCP.toFixed(0)}ms) exceeds budget (${PERFORMANCE_BUDGET.LCP}ms)`);
  }

  if (metrics.FID > PERFORMANCE_BUDGET.FID) {
    violations.push(`FID (${metrics.FID.toFixed(0)}ms) exceeds budget (${PERFORMANCE_BUDGET.FID}ms)`);
  }

  if (metrics.CLS > PERFORMANCE_BUDGET.CLS) {
    violations.push(`CLS (${metrics.CLS.toFixed(3)}) exceeds budget (${PERFORMANCE_BUDGET.CLS})`);
  }

  if (metrics.FCP > PERFORMANCE_BUDGET.FCP) {
    violations.push(`FCP (${metrics.FCP.toFixed(0)}ms) exceeds budget (${PERFORMANCE_BUDGET.FCP}ms)`);
  }

  if (metrics.TTFB > PERFORMANCE_BUDGET.TTFB) {
    violations.push(`TTFB (${metrics.TTFB.toFixed(0)}ms) exceeds budget (${PERFORMANCE_BUDGET.TTFB}ms)`);
  }

  if (metrics.loadTime > PERFORMANCE_BUDGET.loadTime) {
    violations.push(`Load Time (${metrics.loadTime.toFixed(0)}ms) exceeds budget (${PERFORMANCE_BUDGET.loadTime}ms)`);
  }

  return violations;
}

/**
 * Run performance test
 */
async function runTest(url: string): Promise<TestResult> {
  let browser: Browser | null = null;

  try {
    console.log(`🚀 Testing: ${url}`);

    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();

    // Navigate to page
    await page.goto(url, { waitUntil: 'networkidle' });

    // Collect metrics
    const metrics = await collectMetrics(page);

    // Calculate score and check budget
    const score = calculateScore(metrics);
    const violations = checkBudget(metrics);

    const result: TestResult = {
      url,
      timestamp: new Date().toISOString(),
      metrics,
      passed: violations.length === 0,
      violations,
      score,
    };

    await browser.close();

    return result;
  } catch (error) {
    if (browser) await browser.close();
    throw error;
  }
}

/**
 * Generate report
 */
function generateReport(results: TestResult[]): string {
  let report = '# Performance Test Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;

  results.forEach((result, index) => {
    report += `## Test ${index + 1}: ${result.url}\n\n`;
    report += `**Status:** ${result.passed ? '✅ PASSED' : '❌ FAILED'}\n`;
    report += `**Score:** ${result.score}/100\n\n`;

    report += '### Metrics\n\n';
    report += '| Metric | Value | Budget | Status |\n';
    report += '|--------|-------|--------|--------|\n';
    report += `| LCP | ${result.metrics.LCP.toFixed(0)}ms | ${PERFORMANCE_BUDGET.LCP}ms | ${result.metrics.LCP <= PERFORMANCE_BUDGET.LCP ? '✅' : '❌'} |\n`;
    report += `| FID | ${result.metrics.FID.toFixed(0)}ms | ${PERFORMANCE_BUDGET.FID}ms | ${result.metrics.FID <= PERFORMANCE_BUDGET.FID ? '✅' : '❌'} |\n`;
    report += `| CLS | ${result.metrics.CLS.toFixed(3)} | ${PERFORMANCE_BUDGET.CLS} | ${result.metrics.CLS <= PERFORMANCE_BUDGET.CLS ? '✅' : '❌'} |\n`;
    report += `| FCP | ${result.metrics.FCP.toFixed(0)}ms | ${PERFORMANCE_BUDGET.FCP}ms | ${result.metrics.FCP <= PERFORMANCE_BUDGET.FCP ? '✅' : '❌'} |\n`;
    report += `| TTFB | ${result.metrics.TTFB.toFixed(0)}ms | ${PERFORMANCE_BUDGET.TTFB}ms | ${result.metrics.TTFB <= PERFORMANCE_BUDGET.TTFB ? '✅' : '❌'} |\n`;
    report += `| Load Time | ${result.metrics.loadTime.toFixed(0)}ms | ${PERFORMANCE_BUDGET.loadTime}ms | ${result.metrics.loadTime <= PERFORMANCE_BUDGET.loadTime ? '✅' : '❌'} |\n\n`;

    if (result.violations.length > 0) {
      report += '### Violations\n\n';
      result.violations.forEach(violation => {
        report += `- ❌ ${violation}\n`;
      });
      report += '\n';
    }

    report += '---\n\n';
  });

  return report;
}

/**
 * Save report to file
 */
function saveReport(report: string, filename: string): void {
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const filepath = path.join(reportsDir, filename);
  fs.writeFileSync(filepath, report, 'utf-8');
  console.log(`\n📄 Report saved: ${filepath}`);
}

/**
 * Main function
 */
async function main() {
  const urls = process.argv.slice(2);

  if (urls.length === 0) {
    console.error('❌ Error: No URLs provided');
    console.log('Usage: npm run test:performance <url1> [url2] [url3]...');
    console.log('Example: npm run test:performance http://localhost:5173');
    process.exit(1);
  }

  console.log('🔍 Starting performance tests...\n');

  const results: TestResult[] = [];

  for (const url of urls) {
    try {
      const result = await runTest(url);
      results.push(result);

      console.log(`✅ Test completed: ${result.passed ? 'PASSED' : 'FAILED'} (Score: ${result.score}/100)`);
      if (result.violations.length > 0) {
        console.log(`   Violations: ${result.violations.length}`);
      }
    } catch (error) {
      console.error(`❌ Test failed for ${url}:`, error);
    }
  }

  // Generate and save report
  const report = generateReport(results);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  saveReport(report, `performance-report-${timestamp}.md`);

  // Print summary
  console.log('\n📊 Summary:');
  console.log(`   Total tests: ${results.length}`);
  console.log(`   Passed: ${results.filter(r => r.passed).length}`);
  console.log(`   Failed: ${results.filter(r => !r.passed).length}`);

  // Exit with error code if any test failed
  const allPassed = results.every(r => r.passed);
  process.exit(allPassed ? 0 : 1);
}

// Run main function
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
