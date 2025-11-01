/**
 * Accessibility Utilities
 * Provides utilities for WCAG 2.1 AA compliance
 */

/**
 * Color contrast ratio calculator
 * Based on WCAG 2.1 guidelines
 */
export class ColorContrastChecker {
  /**
   * Calculate relative luminance of a color
   * @param rgb - RGB color values [r, g, b] (0-255)
   */
  private static getRelativeLuminance(rgb: [number, number, number]): number {
    const [r, g, b] = rgb.map(val => {
      const sRGB = val / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Calculate contrast ratio between two colors
   * @param color1 - First color RGB [r, g, b]
   * @param color2 - Second color RGB [r, g, b]
   * @returns Contrast ratio (1-21)
   */
  static getContrastRatio(color1: [number, number, number], color2: [number, number, number]): number {
    const lum1 = this.getRelativeLuminance(color1);
    const lum2 = this.getRelativeLuminance(color2);

    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Check if contrast ratio meets WCAG AA standards
   * @param ratio - Contrast ratio
   * @param level - 'AA' or 'AAA'
   * @param isLargeText - Whether text is large (18pt+ or 14pt+ bold)
   */
  static meetsWCAG(ratio: number, level: 'AA' | 'AAA' = 'AA', isLargeText: boolean = false): boolean {
    if (level === 'AAA') {
      return isLargeText ? ratio >= 4.5 : ratio >= 7;
    }
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  }

  /**
   * Parse hex color to RGB
   */
  static hexToRgb(hex: string): [number, number, number] | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : null;
  }

  /**
   * Check contrast between two hex colors
   */
  static checkHexContrast(hex1: string, hex2: string, level: 'AA' | 'AAA' = 'AA', isLargeText: boolean = false): {
    ratio: number;
    passes: boolean;
    level: string;
  } {
    const rgb1 = this.hexToRgb(hex1);
    const rgb2 = this.hexToRgb(hex2);

    if (!rgb1 || !rgb2) {
      throw new Error('Invalid hex color');
    }

    const ratio = this.getContrastRatio(rgb1, rgb2);
    const passes = this.meetsWCAG(ratio, level, isLargeText);

    return { ratio, passes, level };
  }
}

/**
 * ARIA utilities
 */
export const ariaUtils = {
  /**
   * Generate unique ID for ARIA relationships
   */
  generateId: (prefix: string = 'aria'): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Create ARIA label for screen readers
   */
  createLabel: (text: string, context?: string): string => {
    return context ? `${text}, ${context}` : text;
  },

  /**
   * Create ARIA description
   */
  createDescription: (text: string, additionalInfo?: string): string => {
    return additionalInfo ? `${text}. ${additionalInfo}` : text;
  },

  /**
   * Get ARIA role for element type
   */
  getRole: (elementType: string): string | undefined => {
    const roleMap: Record<string, string> = {
      button: 'button',
      link: 'link',
      heading: 'heading',
      navigation: 'navigation',
      main: 'main',
      complementary: 'complementary',
      contentinfo: 'contentinfo',
      banner: 'banner',
      search: 'search',
      form: 'form',
      dialog: 'dialog',
      alert: 'alert',
      status: 'status',
      progressbar: 'progressbar',
      tab: 'tab',
      tabpanel: 'tabpanel',
      tablist: 'tablist',
    };

    return roleMap[elementType];
  },
};

/**
 * Keyboard navigation utilities
 */
export const keyboardUtils = {
  /**
   * Check if element is focusable
   */
  isFocusable: (element: HTMLElement): boolean => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];

    return focusableSelectors.some(selector => element.matches(selector));
  },

  /**
   * Get all focusable elements within a container
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors));
  },

  /**
   * Trap focus within a container (for modals, dialogs)
   */
  trapFocus: (container: HTMLElement): (() => void) => {
    const focusableElements = keyboardUtils.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  },

  /**
   * Handle keyboard navigation for lists
   */
  handleListNavigation: (
    event: KeyboardEvent,
    currentIndex: number,
    totalItems: number,
    onNavigate: (newIndex: number) => void
  ): void => {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (currentIndex + 1) % totalItems;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = (currentIndex - 1 + totalItems) % totalItems;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = totalItems - 1;
        break;
      default:
        return;
    }

    onNavigate(newIndex);
  },
};

/**
 * Screen reader utilities
 */
export const screenReaderUtils = {
  /**
   * Announce message to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  /**
   * Create visually hidden element for screen readers
   */
  createSROnly: (text: string): HTMLSpanElement => {
    const span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = text;
    return span;
  },

  /**
   * Check if element is visible to screen readers
   */
  isVisibleToSR: (element: HTMLElement): boolean => {
    return (
      !element.hasAttribute('aria-hidden') ||
      element.getAttribute('aria-hidden') !== 'true'
    );
  },
};

/**
 * Focus management utilities
 */
export const focusUtils = {
  /**
   * Save current focus
   */
  saveFocus: (): HTMLElement | null => {
    return document.activeElement as HTMLElement;
  },

  /**
   * Restore focus to saved element
   */
  restoreFocus: (element: HTMLElement | null): void => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  },

  /**
   * Move focus to element
   */
  moveFocusTo: (element: HTMLElement | null): void => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  },

  /**
   * Create focus trap for modal/dialog
   */
  createFocusTrap: (container: HTMLElement): {
    activate: () => void;
    deactivate: () => void;
  } => {
    let cleanup: (() => void) | null = null;
    const previousFocus = focusUtils.saveFocus();

    return {
      activate: () => {
        cleanup = keyboardUtils.trapFocus(container);
        const firstFocusable = keyboardUtils.getFocusableElements(container)[0];
        focusUtils.moveFocusTo(firstFocusable);
      },
      deactivate: () => {
        if (cleanup) cleanup();
        focusUtils.restoreFocus(previousFocus);
      },
    };
  },
};

/**
 * Accessibility validator
 */
export class AccessibilityValidator {
  /**
   * Validate image alt text
   */
  static validateImageAlt(img: HTMLImageElement): {
    valid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];

    if (!img.hasAttribute('alt')) {
      issues.push('Missing alt attribute');
    } else {
      const alt = img.getAttribute('alt') || '';
      if (alt.length === 0 && !img.hasAttribute('role')) {
        issues.push('Empty alt text without decorative role');
      }
      if (alt.toLowerCase().includes('image') || alt.toLowerCase().includes('picture')) {
        issues.push('Alt text contains redundant words (image, picture)');
      }
      if (alt.length > 125) {
        issues.push('Alt text too long (should be < 125 characters)');
      }
    }

    return {
      valid: issues.length === 0,
      issues,
    };
  }

  /**
   * Validate heading hierarchy
   */
  static validateHeadingHierarchy(container: HTMLElement = document.body): {
    valid: boolean;
    issues: string[];
  } {
    const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const issues: string[] = [];

    let previousLevel = 0;

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.substring(1));

      if (index === 0 && level !== 1) {
        issues.push('First heading should be h1');
      }

      if (level - previousLevel > 1) {
        issues.push(`Heading level skipped: ${heading.tagName} after h${previousLevel}`);
      }

      previousLevel = level;
    });

    return {
      valid: issues.length === 0,
      issues,
    };
  }

  /**
   * Validate form labels
   */
  static validateFormLabels(form: HTMLFormElement): {
    valid: boolean;
    issues: string[];
  } {
    const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
    const issues: string[] = [];

    inputs.forEach(input => {
      const hasLabel = input.hasAttribute('aria-label') ||
                      input.hasAttribute('aria-labelledby') ||
                      form.querySelector(`label[for="${input.id}"]`);

      if (!hasLabel) {
        issues.push(`Input missing label: ${input.getAttribute('name') || input.id || 'unknown'}`);
      }
    });

    return {
      valid: issues.length === 0,
      issues,
    };
  }

  /**
   * Validate color contrast
   */
  static validateColorContrast(element: HTMLElement): {
    valid: boolean;
    ratio: number;
    passes: boolean;
  } {
    const style = window.getComputedStyle(element);
    const color = style.color;
    const backgroundColor = style.backgroundColor;

    // Parse RGB colors
    const parseRgb = (rgb: string): [number, number, number] | null => {
      const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
    };

    const textColor = parseRgb(color);
    const bgColor = parseRgb(backgroundColor);

    if (!textColor || !bgColor) {
      return { valid: false, ratio: 0, passes: false };
    }

    const ratio = ColorContrastChecker.getContrastRatio(textColor, bgColor);
    const fontSize = parseFloat(style.fontSize);
    const fontWeight = parseInt(style.fontWeight);
    const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);

    const passes = ColorContrastChecker.meetsWCAG(ratio, 'AA', isLargeText);

    return { valid: passes, ratio, passes };
  }
}

/**
 * Accessibility testing utilities
 */
export const a11yTesting = {
  /**
   * Run basic accessibility audit
   */
  audit: (container: HTMLElement = document.body): {
    passed: number;
    failed: number;
    warnings: number;
    issues: Array<{ type: string; severity: 'error' | 'warning'; message: string }>;
  } => {
    const issues: Array<{ type: string; severity: 'error' | 'warning'; message: string }> = [];

    // Check images
    const images = Array.from(container.querySelectorAll('img'));
    images.forEach(img => {
      const result = AccessibilityValidator.validateImageAlt(img);
      if (!result.valid) {
        result.issues.forEach(issue => {
          issues.push({ type: 'image', severity: 'error', message: issue });
        });
      }
    });

    // Check heading hierarchy
    const headingResult = AccessibilityValidator.validateHeadingHierarchy(container);
    if (!headingResult.valid) {
      headingResult.issues.forEach(issue => {
        issues.push({ type: 'heading', severity: 'warning', message: issue });
      });
    }

    // Check forms
    const forms = Array.from(container.querySelectorAll('form'));
    forms.forEach(form => {
      const result = AccessibilityValidator.validateFormLabels(form);
      if (!result.valid) {
        result.issues.forEach(issue => {
          issues.push({ type: 'form', severity: 'error', message: issue });
        });
      }
    });

    const errors = issues.filter(i => i.severity === 'error').length;
    const warnings = issues.filter(i => i.severity === 'warning').length;

    return {
      passed: images.length + forms.length - errors,
      failed: errors,
      warnings,
      issues,
    };
  },
};

/**
 * Export all utilities
 */
export const accessibility = {
  colorContrast: ColorContrastChecker,
  aria: ariaUtils,
  keyboard: keyboardUtils,
  screenReader: screenReaderUtils,
  focus: focusUtils,
  validator: AccessibilityValidator,
  testing: a11yTesting,
};
