import React, { forwardRef } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import type { FocusEffectConfig } from '../../utils/focusEffects';
import { getFocusEffectClasses } from '../../utils/focusEffects';

// Input component props
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  focusConfig?: FocusEffectConfig;
  error?: boolean;
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'search' | 'password' | 'email' | 'number' | 'url';
}

// Textarea component props
interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  focusConfig?: FocusEffectConfig;
  error?: boolean;
  label?: string;
  helperText?: string;
  errorText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

// Input component
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      focusConfig,
      error = false,
      label,
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      variant = 'default',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    // Determine input type based on variant
    const getInputType = () => {
      switch (variant) {
        case 'search':
          return 'search';
        case 'password':
          return 'password';
        case 'email':
          return 'email';
        case 'number':
          return 'number';
        case 'url':
          return 'url';
        default:
          return 'text';
      }
    };

    // Generate focus effect classes
    const focusClasses = getFocusEffectClasses({
      ...focusConfig,
      inputType: variant === 'search' ? 'search' : variant === 'password' ? 'password' : 
                 variant === 'email' ? 'email' : variant === 'number' ? 'number' : 
                 variant === 'url' ? 'url' : 'text',
      error: error || !!errorText,
      disabled,
    });

    // Base input classes
    const inputClasses = cn(
      'w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500',
      'focus:border-transparent focus:outline-none',
      focusClasses,
      {
        'pl-10': leftIcon,
        'pr-10': rightIcon,
        'border-red-300 bg-red-50 text-red-600': error || errorText,
        'opacity-50 cursor-not-allowed': disabled,
      },
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400">
                {leftIcon}
              </div>
            </div>
          )}
          
          <input
            ref={ref}
            type={getInputType()}
            className={inputClasses}
            disabled={disabled}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400">
                {rightIcon}
              </div>
            </div>
          )}
        </div>
        
        {(helperText || errorText) && (
          <p className={cn(
            'mt-2 text-sm',
            error || errorText ? 'text-red-600' : 'text-gray-500'
          )}>
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea component
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      focusConfig,
      error = false,
      label,
      helperText,
      errorText,
      resize = 'vertical',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    // Generate focus effect classes
    const focusClasses = getFocusEffectClasses({
      ...focusConfig,
      inputType: 'textarea',
      error: error || !!errorText,
      disabled,
    });

    // Base textarea classes
    const textareaClasses = cn(
      'w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500',
      'focus:border-transparent focus:outline-none',
      focusClasses,
      {
        'border-red-300 bg-red-50 text-red-600': error || errorText,
        'opacity-50 cursor-not-allowed': disabled,
        'resize-none': resize === 'none',
        'resize-y': resize === 'vertical',
        'resize-x': resize === 'horizontal',
        'resize': resize === 'both',
      },
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={textareaClasses}
          disabled={disabled}
          {...props}
        />
        
        {(helperText || errorText) && (
          <p className={cn(
            'mt-2 text-sm',
            error || errorText ? 'text-red-600' : 'text-gray-500'
          )}>
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// Button component with focus effects
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  focusType?: 'smooth' | 'gradient';
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      focusType = 'smooth',
      variant = 'primary',
      size = 'md',
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Generate button classes
    const buttonClasses = cn(
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-0',
      {
        // Focus effects
        'btn-focus-smooth': focusType === 'smooth',
        'btn-focus-gradient': focusType === 'gradient',
        
        // Size variants
        'px-2 py-1 text-xs': size === 'xs',
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
        'px-8 py-4 text-xl': size === 'xl',
        
        // Color variants
        'bg-primary-500 text-white hover:bg-primary-600': variant === 'primary',
        'bg-secondary-500 text-white hover:bg-secondary-600': variant === 'secondary',
        'bg-accent-500 text-white hover:bg-accent-600': variant === 'accent',
        'bg-success-500 text-white hover:bg-success-600': variant === 'success',
        'bg-warning-500 text-white hover:bg-warning-600': variant === 'warning',
        'bg-error-500 text-white hover:bg-error-600': variant === 'error',
        'bg-transparent text-gray-700 hover:bg-gray-100 border border-gray-300': variant === 'ghost',
        
        // Disabled state
        'opacity-50 cursor-not-allowed': disabled,
      },
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Export focus presets for easy access
export { getFocusEffectClasses } from '../../utils/focusEffects';
