/**
 * A/B Test Provider Component
 * Initializes A/B tests and provides context
 */

import React, { useEffect } from 'react';
import { abTestManager, createHeroButtonTest, createPricingTest } from '../../utils/abTesting';

interface ABTestProviderProps {
  children: React.ReactNode;
  enableTests?: boolean;
}

/**
 * Provider component that initializes A/B tests
 */
export const ABTestProvider: React.FC<ABTestProviderProps> = ({
  children,
  enableTests = true,
}) => {
  useEffect(() => {
    if (!enableTests) return;

    // Initialize predefined tests
    try {
      // Hero button text test
      const heroTest = createHeroButtonTest();
      abTestManager.createTest(heroTest);

      // Pricing display test
      const pricingTest = createPricingTest();
      abTestManager.createTest(pricingTest);

      console.log('A/B tests initialized successfully');
    } catch (error) {
      console.error('Failed to initialize A/B tests:', error);
    }
  }, [enableTests]);

  return <>{children}</>;
};
