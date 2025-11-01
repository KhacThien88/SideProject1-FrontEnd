/**
 * A/B Testing Framework
 * Manages variant assignment, conversion tracking, and statistical analysis
 */

import { analytics } from './analytics';

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface ABTestConfig {
  id: string;
  name: string;
  description?: string;
  variants: ABVariant[];
  trafficAllocation: number; // 0-1 (percentage of users to include)
  conversionGoals: ConversionGoal[];
  startDate: Date;
  endDate?: Date;
  enabled: boolean;
}

export interface ABVariant {
  id: string;
  name: string;
  weight: number; // 0-1 (percentage of traffic)
  config: Record<string, any>;
}

export interface ConversionGoal {
  id: string;
  name: string;
  type: 'click' | 'form_submit' | 'page_view' | 'custom';
  target?: string;
}

export interface ABTestAssignment {
  testId: string;
  variantId: string;
  assignedAt: Date;
  userId?: string;
  sessionId: string;
}

export interface ABTestResult {
  testId: string;
  variants: VariantResult[];
  winner?: string;
  confidence: number;
  sampleSize: number;
  duration: number;
}

export interface VariantResult {
  variantId: string;
  variantName: string;
  impressions: number;
  conversions: number;
  conversionRate: number;
  revenue?: number;
}

// ============================================================================
// A/B Test Manager
// ============================================================================

export class ABTestManager {
  private tests: Map<string, ABTestConfig> = new Map();
  private assignments: Map<string, ABTestAssignment> = new Map();
  private storageKey = 'ab_test_assignments';

  constructor() {
    this.loadAssignments();
  }

  /**
   * Create a new A/B test
   */
  createTest(config: ABTestConfig): void {
    // Validate variant weights sum to 1
    const totalWeight = config.variants.reduce((sum, v) => sum + v.weight, 0);
    if (Math.abs(totalWeight - 1) > 0.01) {
      throw new Error('Variant weights must sum to 1.0');
    }

    this.tests.set(config.id, config);
    this.saveTests();
  }

  /**
   * Get test configuration
   */
  getTest(testId: string): ABTestConfig | undefined {
    return this.tests.get(testId);
  }

  /**
   * Assign user to a variant
   */
  assignVariant(testId: string, userId?: string): string | null {
    const test = this.tests.get(testId);
    if (!test || !test.enabled) {
      return null;
    }

    // Check if test is active
    if (!this.isTestActive(test)) {
      return null;
    }

    // Check if user already has assignment
    const existingAssignment = this.getAssignment(testId, userId);
    if (existingAssignment) {
      return existingAssignment.variantId;
    }

    // Check traffic allocation
    if (Math.random() > test.trafficAllocation) {
      return null; // User not included in test
    }

    // Assign variant based on weights
    const variantId = this.selectVariant(test.variants);
    const sessionId = this.getSessionId();

    const assignment: ABTestAssignment = {
      testId,
      variantId,
      assignedAt: new Date(),
      userId,
      sessionId,
    };

    this.assignments.set(this.getAssignmentKey(testId, userId), assignment);
    this.saveAssignments();

    // Track assignment event
    if (analytics) {
      analytics.trackEvent({
        action: 'ab_test_assigned',
        category: 'experiment',
        label: `${testId}_${variantId}`,
        customParams: {
          test_id: testId,
          variant_id: variantId,
          user_id: userId,
        },
      });
    }

    return variantId;
  }

  /**
   * Get variant configuration for user
   */
  getVariantConfig(testId: string, userId?: string): Record<string, any> | null {
    const variantId = this.assignVariant(testId, userId);
    if (!variantId) {
      return null;
    }

    const test = this.tests.get(testId);
    const variant = test?.variants.find(v => v.id === variantId);
    return variant?.config || null;
  }

  /**
   * Track conversion for A/B test
   */
  trackConversion(testId: string, goalId: string, userId?: string, value?: number): void {
    const assignment = this.getAssignment(testId, userId);
    if (!assignment) {
      return; // User not in test
    }

    const test = this.tests.get(testId);
    const goal = test?.conversionGoals.find(g => g.id === goalId);

    if (!goal) {
      return;
    }

    // Track conversion event
    if (analytics) {
      analytics.trackEvent({
        action: 'ab_test_conversion',
        category: 'experiment',
        label: `${testId}_${assignment.variantId}_${goalId}`,
        value,
        customParams: {
          test_id: testId,
          variant_id: assignment.variantId,
          goal_id: goalId,
          goal_name: goal.name,
          user_id: userId,
        },
      });

      analytics.trackConversion({
        type: 'feature_interaction',
        value: value || 1,
      });
    }
  }

  /**
   * Get test results with statistical analysis
   */
  getResults(testId: string): ABTestResult | null {
    const test = this.tests.get(testId);
    if (!test) {
      return null;
    }

    // In production, this would fetch from analytics backend
    // For now, return mock structure
    const variants: VariantResult[] = test.variants.map(variant => ({
      variantId: variant.id,
      variantName: variant.name,
      impressions: 0,
      conversions: 0,
      conversionRate: 0,
    }));

    return {
      testId,
      variants,
      confidence: 0,
      sampleSize: 0,
      duration: 0,
    };
  }

  /**
   * Calculate statistical significance
   */
  calculateSignificance(variantA: VariantResult, variantB: VariantResult): number {
    // Z-test for proportions
    const p1 = variantA.conversionRate;
    const p2 = variantB.conversionRate;
    const n1 = variantA.impressions;
    const n2 = variantB.impressions;

    if (n1 === 0 || n2 === 0) {
      return 0;
    }

    const pooledP = (variantA.conversions + variantB.conversions) / (n1 + n2);
    const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / n1 + 1 / n2));

    if (se === 0) {
      return 0;
    }

    const z = Math.abs(p1 - p2) / se;

    // Convert z-score to confidence level (approximate)
    return this.zScoreToConfidence(z);
  }

  /**
   * Determine test winner
   */
  determineWinner(results: ABTestResult, minConfidence = 0.95): string | null {
    if (results.variants.length < 2) {
      return null;
    }

    // Sort by conversion rate
    const sorted = [...results.variants].sort((a, b) => b.conversionRate - a.conversionRate);
    const best = sorted[0];
    const secondBest = sorted[1];

    // Calculate significance
    const confidence = this.calculateSignificance(best, secondBest);

    if (confidence >= minConfidence) {
      return best.variantId;
    }

    return null; // No clear winner yet
  }

  /**
   * End test and select winner
   */
  endTest(testId: string): void {
    const test = this.tests.get(testId);
    if (!test) {
      return;
    }

    test.enabled = false;
    test.endDate = new Date();
    this.saveTests();

    // Track test end
    if (analytics) {
      analytics.trackEvent({
        action: 'ab_test_ended',
        category: 'experiment',
        label: testId,
        customParams: {
          test_id: testId,
          duration: test.endDate.getTime() - test.startDate.getTime(),
        },
      });
    }
  }

  /**
   * Clear all test assignments (for testing)
   */
  clearAssignments(): void {
    this.assignments.clear();
    this.saveAssignments();
  }

  // ============================================================================
  // Private Helper Methods
  // ============================================================================

  private isTestActive(test: ABTestConfig): boolean {
    const now = new Date();
    if (now < test.startDate) {
      return false;
    }
    if (test.endDate && now > test.endDate) {
      return false;
    }
    return true;
  }

  private getAssignment(testId: string, userId?: string): ABTestAssignment | undefined {
    return this.assignments.get(this.getAssignmentKey(testId, userId));
  }

  private getAssignmentKey(testId: string, userId?: string): string {
    return `${testId}_${userId || this.getSessionId()}`;
  }

  private selectVariant(variants: ABVariant[]): string {
    const random = Math.random();
    let cumulative = 0;

    for (const variant of variants) {
      cumulative += variant.weight;
      if (random <= cumulative) {
        return variant.id;
      }
    }

    // Fallback to first variant
    return variants[0].id;
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  private zScoreToConfidence(z: number): number {
    // Approximate conversion from z-score to confidence level
    // z = 1.96 → 95% confidence
    // z = 2.58 → 99% confidence
    if (z >= 2.58) return 0.99;
    if (z >= 1.96) return 0.95;
    if (z >= 1.65) return 0.90;
    if (z >= 1.28) return 0.80;
    return 0;
  }

  private loadAssignments(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        this.assignments = new Map(Object.entries(data));
      }
    } catch (error) {
      console.error('Failed to load A/B test assignments:', error);
    }
  }

  private saveAssignments(): void {
    try {
      const data = Object.fromEntries(this.assignments);
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save A/B test assignments:', error);
    }
  }

  private saveTests(): void {
    // In production, this would sync to backend
    // For now, just keep in memory
  }
}

// ============================================================================
// Predefined Test Configurations
// ============================================================================

export const createHeroButtonTest = (): ABTestConfig => ({
  id: 'hero_button_text',
  name: 'Hero CTA Button Text',
  description: 'Test different CTA button text variations',
  variants: [
    {
      id: 'control',
      name: 'Upload CV',
      weight: 0.5,
      config: { buttonText: 'Upload CV' },
    },
    {
      id: 'variant_a',
      name: 'Get Started Free',
      weight: 0.5,
      config: { buttonText: 'Get Started Free' },
    },
  ],
  trafficAllocation: 1.0,
  conversionGoals: [
    {
      id: 'cta_click',
      name: 'CTA Button Click',
      type: 'click',
      target: 'hero_cta',
    },
    {
      id: 'signup',
      name: 'Signup Completion',
      type: 'form_submit',
      target: 'signup_form',
    },
  ],
  startDate: new Date(),
  enabled: true,
});

export const createPricingTest = (): ABTestConfig => ({
  id: 'pricing_display',
  name: 'Pricing Display Format',
  description: 'Test monthly vs annual pricing display',
  variants: [
    {
      id: 'monthly',
      name: 'Monthly Pricing',
      weight: 0.5,
      config: { displayMode: 'monthly' },
    },
    {
      id: 'annual',
      name: 'Annual Pricing',
      weight: 0.5,
      config: { displayMode: 'annual' },
    },
  ],
  trafficAllocation: 1.0,
  conversionGoals: [
    {
      id: 'pricing_click',
      name: 'Pricing Plan Click',
      type: 'click',
      target: 'pricing_plan',
    },
  ],
  startDate: new Date(),
  enabled: true,
});

// ============================================================================
// Global Instance
// ============================================================================

export const abTestManager = new ABTestManager();
