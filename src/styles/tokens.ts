/**
 * Design Tokens for Consistent UI/UX
 * Centralized design system constants
 */

// Color Palette
export const colors = {
  // Primary Colors (Blue)
  primary: {
    50: 'bg-blue-50',
    100: 'bg-blue-100', 
    500: 'bg-blue-500',
    600: 'bg-blue-600',
    700: 'bg-blue-700',
    800: 'bg-blue-800',
    900: 'bg-blue-900',
  },
  
  // Text Colors
  text: {
    primary: 'text-blue-600',
    primaryHover: 'hover:text-blue-700',
    primaryDark: 'text-blue-800',
    primaryLight: 'text-blue-500',
  },
  
  // Border Colors  
  border: {
    primary: 'border-blue-500',
    primaryHover: 'hover:border-blue-600',
    light: 'border-blue-300',
  },
  
  // Status Colors
  status: {
    success: {
      bg: 'bg-green-600',
      text: 'text-green-600',
      border: 'border-green-500',
      light: 'bg-green-50',
    },
    warning: {
      bg: 'bg-orange-600', 
      text: 'text-orange-600',
      border: 'border-orange-500',
      light: 'bg-orange-50',
    },
    error: {
      bg: 'bg-red-600',
      text: 'text-red-600', 
      border: 'border-red-500',
      light: 'bg-red-50',
    },
    info: {
      bg: 'bg-blue-600',
      text: 'text-blue-600',
      border: 'border-blue-500', 
      light: 'bg-blue-50',
    },
  },
};

// Focus States - Standardized
export const focusStates = {
  // Standard focus ring for inputs, selects, textareas
  input: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  
  // Focus for buttons
  button: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  
  // Focus for links
  link: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
  
  // Focus for checkboxes/radios
  checkbox: 'focus:ring-2 focus:ring-blue-500',
};

// Button Variants
export const buttons = {
  // Primary button
  primary: `
    inline-flex items-center justify-center px-4 py-2 border border-transparent 
    text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
    disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200
    ${focusStates.button}
  `,
  
  // Secondary button  
  secondary: `
    inline-flex items-center justify-center px-4 py-2 border border-gray-300 
    text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 
    disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200
    ${focusStates.button}
  `,
  
  // Tertiary button (ghost/text button)
  tertiary: `
    inline-flex items-center justify-center px-4 py-2 border border-transparent 
    text-sm font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-100 
    disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200
    ${focusStates.button}
  `,
  
  // Success button
  success: `
    inline-flex items-center justify-center px-4 py-2 border border-transparent 
    text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 
    disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200
    ${focusStates.button}
  `,
  
  // Danger button
  danger: `
    inline-flex items-center justify-center px-4 py-2 border border-transparent 
    text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 
    disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200
    ${focusStates.button}
  `,
};

// Input/Form Elements
export const forms = {
  // Standard input
  input: `
    w-full px-3 py-2 border border-gray-300 rounded-md text-sm 
    placeholder:text-gray-400 
    ${focusStates.input}
  `,
  
  // Select dropdown
  select: `
    w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white
    ${focusStates.input}
  `,
  
  // Textarea
  textarea: `
    w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-vertical
    placeholder:text-gray-400 
    ${focusStates.input}
  `,
  
  // Checkbox
  checkbox: `
    h-4 w-4 text-blue-600 border-gray-300 rounded 
    ${focusStates.checkbox}
  `,
};

// Loading States
export const loading = {
  // Standard spinner
  spinner: 'animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent',
  
  // Large spinner
  spinnerLarge: 'animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent',
  
  // Button loading state
  buttonLoading: 'animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent',
};

// Transitions
export const transitions = {
  // Standard transition
  default: 'transition-colors duration-200',
  
  // Fast transition
  fast: 'transition-colors duration-150',
  
  // Slow transition  
  slow: 'transition-colors duration-300',
  
  // Transform transitions
  transform: 'transition-transform duration-200',
  
  // All properties
  all: 'transition-all duration-200',
};

// Shadows
export const shadows = {
  sm: 'shadow-sm',
  default: 'shadow',
  md: 'shadow-md', 
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

// Border Radius
export const borderRadius = {
  sm: 'rounded-sm',
  default: 'rounded-md',
  lg: 'rounded-lg', 
  xl: 'rounded-xl',
  full: 'rounded-full',
};

// Spacing
export const spacing = {
  xs: 'p-1',
  sm: 'p-2', 
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

// Typography
export const typography = {
  // Headings
  h1: 'text-2xl font-bold text-gray-900',
  h2: 'text-xl font-semibold text-gray-900', 
  h3: 'text-lg font-medium text-gray-900',
  h4: 'text-base font-medium text-gray-900',
  
  // Body text
  body: 'text-sm text-gray-700',
  bodyLarge: 'text-base text-gray-700',
  bodySmall: 'text-xs text-gray-600',
  
  // Caption text
  caption: 'text-xs text-gray-500',
  
  // Links
  link: `text-blue-600 hover:text-blue-800 underline ${focusStates.link}`,
};

// Status badges/pills
export const badges = {
  success: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
  warning: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800', 
  error: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800',
  info: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800',
  neutral: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800',
};

// Export all as a single design system object
export const designSystem = {
  loading: {
    spinner: 'animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent',
    spinnerLarge: 'animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent',
    buttonLoading: 'animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent',
  },
  typography: {
    h1: 'text-2xl font-bold text-gray-900',
    h2: 'text-xl font-semibold text-gray-900',
    h3: 'text-lg font-medium text-gray-900',
    h4: 'text-base font-medium text-gray-900',
    body: 'text-sm text-gray-600',
  },
  colors,
  focusStates, 
  buttons,
  forms,
  transitions,
  shadows,
  borderRadius,
  spacing,
  badges,
};

export default designSystem;
