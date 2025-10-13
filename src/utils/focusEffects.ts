/**
 * Focus Effect Utility System
 * Provides consistent focus effects across the application
 */

export type FocusEffectType = 'smooth' | 'gradient' | 'ripple' | 'glow';
export type FocusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type FocusColor = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
export type FocusInputType = 'text' | 'email' | 'password' | 'search' | 'number' | 'url' | 'textarea';

export interface FocusEffectConfig {
  type?: FocusEffectType;
  size?: FocusSize;
  color?: FocusColor;
  inputType?: FocusInputType;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

/**
 * Generate focus effect classes based on configuration
 */
export const getFocusEffectClasses = (config: FocusEffectConfig = {}): string => {
  const {
    type = 'smooth',
    size = 'md',
    color = 'primary',
    inputType = 'text',
    disabled = false,
    error = false,
    className = ''
  } = config;

  const classes: string[] = [];

  // Base focus effect
  classes.push(`focus-${type}`);

  // Size variant
  classes.push(`focus-${size}`);

  // Color variant (only if not error state)
  if (!error) {
    classes.push(`focus-${color}`);
  } else {
    classes.push('focus-error');
  }

  // Input type specific classes
  if (inputType === 'search') {
    classes.push('focus-search');
  } else if (inputType === 'password') {
    classes.push('focus-password');
  } else if (inputType === 'number') {
    classes.push('focus-number');
  } else if (inputType === 'email') {
    classes.push('focus-email');
  } else if (inputType === 'url') {
    classes.push('focus-url');
  }

  // Disabled state
  if (disabled) {
    classes.push('opacity-50', 'cursor-not-allowed');
  }

  // Additional custom classes
  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Generate button focus effect classes
 */
export const getButtonFocusClasses = (type: FocusEffectType = 'smooth', className: string = ''): string => {
  const classes: string[] = [];

  classes.push(`btn-focus-${type}`);

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Predefined focus effect configurations for common use cases
 */
export const FocusPresets = {
  // Input presets
  input: {
    default: { type: 'smooth', size: 'md', color: 'primary' },
    small: { type: 'smooth', size: 'sm', color: 'primary' },
    large: { type: 'smooth', size: 'lg', color: 'primary' },
    search: { type: 'smooth', size: 'md', color: 'primary', inputType: 'search' },
    password: { type: 'smooth', size: 'md', color: 'primary', inputType: 'password' },
    email: { type: 'smooth', size: 'md', color: 'primary', inputType: 'email' },
    number: { type: 'smooth', size: 'md', color: 'primary', inputType: 'number' },
    url: { type: 'smooth', size: 'md', color: 'primary', inputType: 'url' },
    textarea: { type: 'smooth', size: 'md', color: 'primary', inputType: 'textarea' },
  },

  // Button presets
  button: {
    default: 'btn-focus-smooth',
    gradient: 'btn-focus-gradient',
    smooth: 'btn-focus-smooth',
  },

  // Specialized presets
  otp: {
    ultra: 'otp-input-ultra',
    gradient: 'otp-input-gradient',
    ripple: 'otp-input-ripple',
    glow: 'otp-input',
  },

  // Color variants
  colors: {
    primary: 'focus-primary',
    secondary: 'focus-secondary',
    accent: 'focus-accent',
    success: 'focus-success',
    warning: 'focus-warning',
    error: 'focus-error',
  },

  // Size variants
  sizes: {
    xs: 'focus-xs',
    sm: 'focus-sm',
    md: 'focus-md',
    lg: 'focus-lg',
    xl: 'focus-xl',
  },
} as const;

/**
 * Utility function to create focus effect classes for common patterns
 */
export const createFocusEffect = {
  // Standard input with smooth focus
  input: (size: FocusSize = 'md', color: FocusColor = 'primary') =>
    getFocusEffectClasses({ type: 'smooth', size, color }),

  // Search input with icon
  search: (size: FocusSize = 'md') =>
    getFocusEffectClasses({ type: 'smooth', size, inputType: 'search' }),

  // Password input
  password: (size: FocusSize = 'md') =>
    getFocusEffectClasses({ type: 'smooth', size, inputType: 'password' }),

  // Email input
  email: (size: FocusSize = 'md') =>
    getFocusEffectClasses({ type: 'smooth', size, inputType: 'email' }),

  // Number input
  number: (size: FocusSize = 'md') =>
    getFocusEffectClasses({ type: 'smooth', size, inputType: 'number' }),

  // URL input
  url: (size: FocusSize = 'md') =>
    getFocusEffectClasses({ type: 'smooth', size, inputType: 'url' }),

  // Textarea
  textarea: (size: FocusSize = 'md') =>
    getFocusEffectClasses({ type: 'smooth', size, inputType: 'textarea' }),

  // Error state
  error: (size: FocusSize = 'md') =>
    getFocusEffectClasses({ type: 'smooth', size, error: true }),

  // Gradient focus
  gradient: (size: FocusSize = 'md', color: FocusColor = 'primary') =>
    getFocusEffectClasses({ type: 'gradient', size, color }),

  // Ripple focus
  ripple: (size: FocusSize = 'md', color: FocusColor = 'primary') =>
    getFocusEffectClasses({ type: 'ripple', size, color }),

  // Glow focus
  glow: (size: FocusSize = 'md', color: FocusColor = 'primary') =>
    getFocusEffectClasses({ type: 'glow', size, color }),
};

/**
 * Hook for managing focus effects in React components
 */
export const useFocusEffect = (config: FocusEffectConfig = {}) => {
  const getClasses = (customConfig?: Partial<FocusEffectConfig>) => {
    return getFocusEffectClasses({ ...config, ...customConfig });
  };

  const getButtonClasses = (type: FocusEffectType = 'smooth') => {
    return getButtonFocusClasses(type);
  };

  return {
    getClasses,
    getButtonClasses,
    presets: FocusPresets,
    create: createFocusEffect,
  };
};
