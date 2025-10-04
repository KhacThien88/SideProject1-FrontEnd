import { useState, useCallback, useEffect, useMemo } from 'react';
import { z } from 'zod';

// Debounce hook for performance optimization
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Validation state interface
export interface ValidationState {
  isValid: boolean;
  error?: string;
  isValidating?: boolean;
}

// Validation hook return type
export interface UseValidationReturn<T extends Record<string, any>> {
  values: T;
  errors: Record<keyof T, ValidationState>;
  isFormValid: boolean;
  isValidating: boolean;
  touched: Record<keyof T, boolean>;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldTouched: (field: keyof T) => void;
  validateField: (field: keyof T) => Promise<ValidationState>;
  validateForm: () => Promise<boolean>;
  reset: () => void;
  setValues: (values: Partial<T>) => void;
}

// Main validation hook
export const useValidation = <T extends Record<string, any>>(
  schema: z.ZodSchema<T>,
  initialValues: T,
  options: {
    debounceMs?: number;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
  } = {}
): UseValidationReturn<T> => {
  const {
    debounceMs = 300,
    validateOnChange = true,
    validateOnBlur = true,
  } = options;

  // Form state
  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, ValidationState>>({} as Record<keyof T, ValidationState>);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isValidating, setIsValidating] = useState(false);

  // Debounced values for validation
  const debouncedValues = useDebounce(values, debounceMs);

  // Initialize errors state
  useEffect(() => {
    const initialErrors: Record<keyof T, ValidationState> = {} as Record<keyof T, ValidationState>;
    Object.keys(initialValues).forEach((key) => {
      initialErrors[key as keyof T] = { isValid: true };
    });
    setErrors(initialErrors);
  }, []);

  // Validate individual field
  const validateField = useCallback(
    async (field: keyof T): Promise<ValidationState> => {
      try {
        setIsValidating(true);
        
        // Validate the entire form but only check specific field error
        await schema.parseAsync(values);
        
        const validationState: ValidationState = { isValid: true };
        
        setErrors(prev => ({
          ...prev,
          [field]: validationState,
        }));
        
        return validationState;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.issues.find((err: z.ZodIssue) => 
            err.path.length > 0 && err.path[0] === field
          );
          
          const errorMessage = fieldError?.message;
          const validationState: ValidationState = {
            isValid: false,
            error: errorMessage,
          };
          
          // Toast is now handled manually in form submission, not in real-time validation
          
          setErrors(prev => ({
            ...prev,
            [field]: validationState,
          }));
          
          return validationState;
        }
        
        const validationState: ValidationState = {
          isValid: false,
          error: 'Validation error',
        };
        
        setErrors(prev => ({
          ...prev,
          [field]: validationState,
        }));
        
        return validationState;
      } finally {
        setIsValidating(false);
      }
    },
    [schema, values]
  );

  // Validate entire form
  const validateForm = useCallback(async (): Promise<boolean> => {
    try {
      setIsValidating(true);
      
      await schema.parseAsync(values);
      
      // Clear all errors if validation passes
      const clearedErrors: Record<keyof T, ValidationState> = {} as Record<keyof T, ValidationState>;
      Object.keys(values).forEach((key) => {
        clearedErrors[key as keyof T] = { isValid: true };
      });
      setErrors(clearedErrors);
      
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<keyof T, ValidationState> = {} as Record<keyof T, ValidationState>;
        
        // Initialize all fields as valid
        Object.keys(values).forEach((key) => {
          newErrors[key as keyof T] = { isValid: true };
        });
        
        // Set errors for invalid fields
        error.issues.forEach((err: z.ZodIssue) => {
          const field = err.path[0] as keyof T;
          if (field) {
            newErrors[field] = {
              isValid: false,
              error: err.message,
            };
          }
        });
        
        setErrors(newErrors);
      }
      
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [schema, values]);

  // Set individual field value
  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValuesState(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Validate on change if enabled
    if (validateOnChange && touched[field]) {
      validateField(field);
    }
  }, [validateOnChange, touched, validateField]);

  // Set field as touched
  const setFieldTouched = useCallback((field: keyof T) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));
    
    // Validate on blur if enabled
    if (validateOnBlur) {
      validateField(field);
    }
  }, [validateOnBlur, validateField]);

  // Reset form
  const reset = useCallback(() => {
    setValuesState(initialValues);
    setErrors({} as Record<keyof T, ValidationState>);
    setTouched({} as Record<keyof T, boolean>);
  }, [initialValues]);

  // Set multiple values
  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState(prev => ({
      ...prev,
      ...newValues,
    }));
  }, []);

  // Auto-validate debounced values for touched fields
  useEffect(() => {
    const touchedFields = Object.keys(touched).filter(
      key => touched[key as keyof T]
    ) as Array<keyof T>;
    
    if (touchedFields.length > 0 && validateOnChange) {
      touchedFields.forEach(field => {
        validateField(field);
      });
    }
  }, [debouncedValues, touched, validateOnChange, validateField]);

  // Calculate form validity
  const isFormValid = useMemo(() => {
    const errorValues = Object.values(errors);
    return errorValues.length > 0 && errorValues.every(error => error.isValid);
  }, [errors]);

  return {
    values,
    errors,
    isFormValid,
    isValidating,
    touched,
    setValue,
    setFieldTouched,
    validateField,
    validateForm,
    reset,
    setValues,
  };
};

// Specialized hooks for specific forms
export const useLoginValidation = (initialValues?: Partial<{
  email: string;
  password: string;
  rememberMe: boolean;
}>) => {
  const { loginSchema } = 
    // @ts-ignore - Dynamic import for schemas
    require('../utils/validation/schemas');
  
  return useValidation(
    loginSchema,
    {
      email: '',
      password: '',
      rememberMe: false,
      ...initialValues,
    },
    {
      debounceMs: 300,
      validateOnChange: true,
      validateOnBlur: true,
    }
  );
};

export const useRegisterValidation = (initialValues?: Partial<{
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  role: 'candidate' | 'recruiter';
  acceptTerms: boolean;
}>) => {
  const { registerSchema } = 
    // @ts-ignore - Dynamic import for schemas
    require('../utils/validation/schemas');
  
  return useValidation(
    registerSchema,
    {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      role: 'candidate' as const,
      acceptTerms: false,
      ...initialValues,
    },
    {
      debounceMs: 300,
      validateOnChange: true,
      validateOnBlur: true,
    }
  );
};
