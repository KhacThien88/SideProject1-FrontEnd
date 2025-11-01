/**
 * Content Error Handler
 * Provides graceful fallbacks for missing i18n content keys
 */

export interface ContentValidationResult {
  isValid: boolean;
  missingKeys: string[];
  invalidKeys: string[];
  suggestions: string[];
}

/**
 * Content Error Handler Class
 */
export class ContentErrorHandler {
  private static fallbackContent: Record<string, string> = {
    'hero.headline': 'AI-Powered CV Analysis Platform',
    'hero.subtitle': 'Find the perfect job with AI',
    'hero.ctaButtons.uploadCV': 'Upload CV',
    'hero.ctaButtons.postJob': 'Post Job',
    'hero.ctaButtons.viewDemo': 'View Demo',
    'features.title': 'Powerful Features',
    'pricing.title': 'Choose Your Plan',
    'cta.headline': 'Ready to Get Started?',
    'cta.primaryCTA': 'Get Started',
  };

  /**
   * Handle missing content key
   */
  static handleMissingKey(key: string): string {
    if (import.meta.env.DEV) {
      console.warn(`[Content] Missing i18n key: ${key}`);
    }

    return this.generateFallback(key);
  }

  /**
   * Handle invalid content
   */
  static handleInvalidContent(content: any, key: string): string {
    if (import.meta.env.DEV) {
      console.error(`[Content] Invalid content structure for key: ${key}`, content);
    }

    return this.generateFallback(key);
  }

  /**
   * Generate fallback content
   */
  static generateFallback(key: string): string {
    // Check predefined fallbacks
    if (this.fallbackContent[key]) {
      return this.fallbackContent[key];
    }

    // Generate from key name
    const parts = key.split('.');
    const lastPart = parts[parts.length - 1];

    // Convert camelCase to Title Case
    const fallback = lastPart
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();

    return fallback || 'Content loading...';
  }

  /**
   * Validate content keys exist
   */
  static validateContentKeys(content: any, requiredKeys: string[]): ContentValidationResult {
    const missingKeys: string[] = [];
    const invalidKeys: string[] = [];
    const suggestions: string[] = [];

    requiredKeys.forEach(key => {
      const value = this.getNestedValue(content, key);

      if (value === undefined) {
        missingKeys.push(key);
        suggestions.push(`Add "${key}" to i18n content`);
      } else if (typeof value !== 'string' && !Array.isArray(value) && typeof value !== 'object') {
        invalidKeys.push(key);
        suggestions.push(`Fix invalid content type for "${key}"`);
      }
    });

    return {
      isValid: missingKeys.length === 0 && invalidKeys.length === 0,
      missingKeys,
      invalidKeys,
      suggestions,
    };
  }

  /**
   * Get nested value from object using dot notation
   */
  private static getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Log missing keys in development
   */
  static logMissingKeys(missingKeys: string[]): void {
    if (import.meta.env.DEV && missingKeys.length > 0) {
      console.group('[Content] Missing i18n keys:');
      missingKeys.forEach(key => console.warn(`  - ${key}`));
      console.groupEnd();
    }
  }

  /**
   * Get all missing keys from content
   */
  static getMissingKeys(content: any, requiredKeys: string[]): string[] {
    return requiredKeys.filter(key => {
      const value = this.getNestedValue(content, key);
      return value === undefined;
    });
  }

  /**
   * Add fallback content
   */
  static addFallback(key: string, fallback: string): void {
    this.fallbackContent[key] = fallback;
  }

  /**
   * Clear fallback cache
   */
  static clearFallbacks(): void {
    this.fallbackContent = {};
  }
}

/**
 * Content validation utility
 */
export const validateContent = (content: any, requiredKeys: string[]): ContentValidationResult => {
  return ContentErrorHandler.validateContentKeys(content, requiredKeys);
};

/**
 * Safe content getter with fallback
 */
export const getSafeContent = (content: any, key: string, fallback?: string): string => {
  const value = key.split('.').reduce((current, k) => current?.[k], content);

  if (value === undefined || value === null) {
    return fallback || ContentErrorHandler.handleMissingKey(key);
  }

  if (typeof value !== 'string') {
    return fallback || ContentErrorHandler.handleInvalidContent(value, key);
  }

  return value;
};
