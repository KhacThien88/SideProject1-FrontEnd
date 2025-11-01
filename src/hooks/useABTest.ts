/**
 * React Hooks for A/B Testing
 * Provides easy-to-use A/B testing functionality in React components
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { abTestManager } from '../utils/abTesting';
import type { ABTestConfig } from '../utils/abTesting';

// ============================================================================
// Main A/B Test Hook
// ============================================================================

interface UseABTestOptions {
  testId: string;
  userId?: string;
  defaultVariant?: string;
}

export const useABTest = (options: UseABTestOptions) => {
  const { testId, userId, defaultVariant } = options;
  const [variantId, setVariantId] = useState<string | null>(null);
  const [config, setConfig] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const assignedVariant = abTestManager.assignVariant(testId, userId);
    setVariantId(assignedVariant || defaultVariant || null);

    if (assignedVariant) {
      const variantConfig = abTestManager.getVariantConfig(testId, userId);
      setConfig(variantConfig);
    }

    setIsLoading(false);
  }, [testId, userId, defaultVariant]);

  const trackConversion = useCallback((goalId: string, value?: number) => {
    abTestManager.trackConversion(testId, goalId, userId, value);
  }, [testId, userId]);

  return {
    variantId,
    config,
    isLoading,
    trackConversion,
    isVariant: (id: string) => variantId === id,
  };
};

// ============================================================================
// A/B Test Variant Hook
// ============================================================================

interface UseABTestVariantOptions {
  testId: string;
  variants: Record<string, any>;
  userId?: string;
}

export const useABTestVariant = <T = any>(options: UseABTestVariantOptions): T | null => {
  const { testId, variants, userId } = options;
  const [variant, setVariant] = useState<T | null>(null);

  useEffect(() => {
    const variantId = abTestManager.assignVariant(testId, userId);
    if (variantId && variants[variantId]) {
      setVariant(variants[variantId]);
    } else {
      // Return first variant as default
      const firstKey = Object.keys(variants)[0];
      setVariant(variants[firstKey] || null);
    }
  }, [testId, variants, userId]);

  return variant;
};

// ============================================================================
// A/B Test Component Wrapper Hook
// ============================================================================

interface UseABTestComponentOptions {
  testId: string;
  components: Record<string, React.ComponentType<any>>;
  userId?: string;
}

export const useABTestComponent = (options: UseABTestComponentOptions) => {
  const { testId, components, userId } = options;
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const variantId = abTestManager.assignVariant(testId, userId);
    if (variantId && components[variantId]) {
      setComponent(() => components[variantId]);
    } else {
      // Return first component as default
      const firstKey = Object.keys(components)[0];
      setComponent(() => components[firstKey] || null);
    }
  }, [testId, components, userId]);

  return Component;
};

// ============================================================================
// A/B Test Feature Flag Hook
// ============================================================================

interface UseABTestFeatureOptions {
  testId: string;
  featureName: string;
  userId?: string;
}

export const useABTestFeature = (options: UseABTestFeatureOptions): boolean => {
  const { testId, featureName, userId } = options;
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const config = abTestManager.getVariantConfig(testId, userId);
    if (config && config[featureName] !== undefined) {
      setIsEnabled(!!config[featureName]);
    }
  }, [testId, featureName, userId]);

  return isEnabled;
};

// ============================================================================
// A/B Test Value Hook
// ============================================================================

interface UseABTestValueOptions<T> {
  testId: string;
  valueName: string;
  defaultValue: T;
  userId?: string;
}

export const useABTestValue = <T = any>(options: UseABTestValueOptions<T>): T => {
  const { testId, valueName, defaultValue, userId } = options;
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const config = abTestManager.getVariantConfig(testId, userId);
    if (config && config[valueName] !== undefined) {
      setValue(config[valueName]);
    }
  }, [testId, valueName, defaultValue, userId]);

  return value;
};

// ============================================================================
// A/B Test Manager Hook
// ============================================================================

export const useABTestManager = () => {
  const createTest = useCallback((config: ABTestConfig) => {
    abTestManager.createTest(config);
  }, []);

  const getTest = useCallback((testId: string) => {
    return abTestManager.getTest(testId);
  }, []);

  const endTest = useCallback((testId: string) => {
    abTestManager.endTest(testId);
  }, []);

  const getResults = useCallback((testId: string) => {
    return abTestManager.getResults(testId);
  }, []);

  const clearAssignments = useCallback(() => {
    abTestManager.clearAssignments();
  }, []);

  return {
    createTest,
    getTest,
    endTest,
    getResults,
    clearAssignments,
  };
};

// ============================================================================
// A/B Test Results Hook
// ============================================================================

export const useABTestResults = (testId: string) => {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = () => {
      const testResults = abTestManager.getResults(testId);
      setResults(testResults);
      setIsLoading(false);
    };

    fetchResults();
  }, [testId]);

  const winner = useMemo(() => {
    if (!results) return null;
    return abTestManager.determineWinner(results);
  }, [results]);

  return {
    results,
    winner,
    isLoading,
  };
};

// ============================================================================
// Multi-Variant Test Hook
// ============================================================================

interface UseMultiVariantTestOptions {
  testId: string;
  userId?: string;
}

export const useMultiVariantTest = (options: UseMultiVariantTestOptions) => {
  const { testId, userId } = options;
  const { variantId, config, trackConversion } = useABTest({ testId, userId });

  const getValue = useCallback((key: string, defaultValue?: any) => {
    return config?.[key] ?? defaultValue;
  }, [config]);

  const hasFeature = useCallback((featureName: string) => {
    return !!config?.[featureName];
  }, [config]);

  return {
    variantId,
    config,
    getValue,
    hasFeature,
    trackConversion,
  };
};
