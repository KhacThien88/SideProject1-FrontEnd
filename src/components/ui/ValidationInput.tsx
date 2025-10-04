import React, { useState, forwardRef } from 'react';
import type { ValidationState } from '../../hooks/useValidation';

// Validation Input Props Interface
interface ValidationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  validation?: ValidationState;
  showPasswordToggle?: boolean;
  icon?: React.ReactNode;
  helperText?: string;
  onBlur?: () => void;
  onValidateBlur?: () => void; // Callback để validate khi blur
}

// Validation Input Component with accessibility and visual feedback
export const ValidationInput = forwardRef<HTMLInputElement, ValidationInputProps>(
  ({ 
    label, 
    validation, 
    showPasswordToggle = false, 
    icon, 
    helperText,
    className = '',
    type = 'text',
    onBlur,
    onValidateBlur,
    disabled,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Determine input type for password toggle
    const inputType = showPasswordToggle && type === 'password' 
      ? (showPassword ? 'text' : 'password')
      : type;

    // Calculate validation state classes (no error styling since errors show via toast)
    const getValidationClasses = () => {
      // Always use default styling since errors are shown via toast only
      return 'border-neutral-300 bg-white focus:border-primary-500';
    };

    // Get validation icon (no icons since errors show via toast only)
    const getValidationIcon = () => {
      if (!validation) return null;
      
      // Only show loading indicator
      if (validation.isValidating) {
        return (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
          </div>
        );
      }
      
      // No error or success icons since errors show via toast
      return null;
    };

    // Get password toggle icon
    const getPasswordToggleIcon = () => {
      if (!showPasswordToggle || type !== 'password') return null;
      
      // Always position at right-3 since no error icons are shown
      const rightPosition = validation && validation.isValidating ? 'right-10' : 'right-3';
      
      return (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute ${rightPosition} top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 rounded`}
          disabled={disabled}
          tabIndex={-1}
        >
          {showPassword ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      );
    };

    // Handle blur event
    const handleBlur = () => {
      setIsFocused(false);
      if (onBlur) {
        onBlur();
      }
      // Trigger validation on blur if callback provided
      if (onValidateBlur) {
        onValidateBlur();
      }
    };

    // Handle focus event
    const handleFocus = () => {
      setIsFocused(true);
    };

    return (
      <div className="w-full">
        {/* Label */}
        <label 
          htmlFor={props.id} 
          className="block text-md font-medium text-primary-700 mb-1"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>

        {/* Input Container */}
        <div className="relative">
          {/* Leading Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              {icon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            type={inputType}
            className={`w-full px-3 py-2 ${icon ? 'pl-10' : ''} ${
              showPasswordToggle && type === 'password' ? 
                (validation && validation.isValidating ? 'pr-20' : 'pr-12') : 
                (validation && validation.isValidating ? 'pr-10' : 'pr-3')
            } border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              getValidationClasses()
            } ${
              isFocused ? 'ring-2 ring-opacity-20' : ''
            } ${
              disabled ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed' : ''
            } ${className}`}
            onBlur={handleBlur}
            onFocus={handleFocus}
            disabled={disabled}
            aria-invalid={validation && !validation.isValid}
            aria-describedby={
              `${props.id}-error ${props.id}-helper`
            }
            {...props}
          />

          {/* Password Toggle */}
          {getPasswordToggleIcon()}

          {/* Validation Icon */}
          {getValidationIcon()}
        </div>

        {/* Helper Text */}
        {helperText && !validation?.error && (
          <p 
            id={`${props.id}-helper`}
            className="mt-1 text-sm text-neutral-600"
          >
            {helperText}
          </p>
        )}

        {/* No error message display - errors will be shown via toast only */}
      </div>
    );
  }
);

ValidationInput.displayName = 'ValidationInput';

export default ValidationInput;