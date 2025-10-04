import { z } from 'zod';

// Custom email regex pattern for Vietnamese context
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password strength validation patterns
const PASSWORD_PATTERNS = {
  minLength: /.{8,}/,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};

// Vietnamese error messages for validation
export const ValidationMessages = {
  required: 'Trường này là bắt buộc',
  email: {
    invalid: 'Email không đúng định dạng',
    required: 'Email là bắt buộc',
  },
  password: {
    required: 'Mật khẩu là bắt buộc',
    minLength: 'Mật khẩu phải có ít nhất 8 ký tự',
    uppercase: 'Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa',
    lowercase: 'Mật khẩu phải chứa ít nhất 1 chữ cái viết thường',
    number: 'Mật khẩu phải chứa ít nhất 1 số',
    special: 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt',
    weak: 'Mật khẩu yếu',
    medium: 'Mật khẩu trung bình',
    strong: 'Mật khẩu mạnh',
  },
  confirmPassword: {
    required: 'Xác nhận mật khẩu là bắt buộc',
    noMatch: 'Mật khẩu xác nhận không khớp',
  },
  name: {
    required: 'Họ tên là bắt buộc',
    minLength: 'Họ tên phải có ít nhất 2 ký tự',
    maxLength: 'Họ tên không được quá 50 ký tự',
  },
  phone: {
    invalid: 'Số điện thoại không hợp lệ',
  },
  terms: {
    required: 'Bạn phải đồng ý với điều khoản sử dụng',
  },
};

// Custom password validator for login (less strict)
const loginPasswordValidator = z
  .string()
  .min(1, ValidationMessages.password.required)
  .min(6, 'Mật khẩu phải có ít nhất 6 ký tự');

// Enhanced password validator for registration
const registerPasswordValidator = z
  .string()
  .min(1, ValidationMessages.password.required)
  .refine((password) => PASSWORD_PATTERNS.minLength.test(password), {
    message: ValidationMessages.password.minLength,
  })
  .refine((password) => PASSWORD_PATTERNS.hasUppercase.test(password), {
    message: ValidationMessages.password.uppercase,
  })
  .refine((password) => PASSWORD_PATTERNS.hasLowercase.test(password), {
    message: ValidationMessages.password.lowercase,
  })
  .refine((password) => PASSWORD_PATTERNS.hasNumber.test(password), {
    message: ValidationMessages.password.number,
  })
  .refine((password) => PASSWORD_PATTERNS.hasSpecialChar.test(password), {
    message: ValidationMessages.password.special,
  });

// Custom email validator with detailed error messages
const emailValidator = z
  .string()
  .min(1, 'Email là bắt buộc')
  .refine((email) => {
    // Check if email contains @
    if (!email.includes('@')) {
      return false;
    }
    return true;
  }, {
    message: 'thiếu ký tự "@"',
  })
  .refine((email) => {
    // Check if email starts with @
    if (email.startsWith('@')) {
      return false;
    }
    return true;
  }, {
    message: 'Email không thể bắt đầu bằng "@"',
  })
  .refine((email) => {
    // Check if email has domain after @
    if (email.includes('@')) {
      const parts = email.split('@');
      if (parts.length > 1 && parts[1].length === 0) {
        return false;
      }
    }
    return true;
  }, {
    message: 'thiếu tên miền sau "@"',
  })
  .refine((email) => {
    // Check if email has TLD (domain extension)
    if (email.includes('@')) {
      const parts = email.split('@');
      if (parts.length > 1 && parts[1].length > 0) {
        if (!parts[1].includes('.')) {
          return false;
        }
      }
    }
    return true;
  }, {
    message: 'Email thiếu tên miền (ví dụ: .com, .vn)',
  })
  .refine((email) => EMAIL_REGEX.test(email), {
    message: 'Email không đúng định dạng',
  });

// Login form schema
export const loginSchema = z.object({
  email: emailValidator,
  password: loginPasswordValidator,
  rememberMe: z.boolean().optional(),
});

// Register form schema
export const registerSchema = z.object({
  email: emailValidator,
  password: registerPasswordValidator,
  confirmPassword: z.string().min(1, ValidationMessages.confirmPassword.required),
  fullName: z
    .string()
    .min(1, ValidationMessages.name.required)
    .min(2, ValidationMessages.name.minLength)
    .max(50, ValidationMessages.name.maxLength)
    .refine((name) => name.trim().length >= 2, {
      message: ValidationMessages.name.minLength,
    }),
  phone: z
    .string()
    .optional()
    .refine(
      (phone) => {
        if (!phone || phone.trim() === '') return true;
        const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,}$/;
        return phoneRegex.test(phone.trim());
      },
      {
        message: ValidationMessages.phone.invalid,
      }
    ),
  role: z.enum(['candidate', 'recruiter']).default('candidate'),
  acceptTerms: z
    .boolean()
    .refine((value) => value === true, {
      message: ValidationMessages.terms.required,
    }),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: ValidationMessages.confirmPassword.noMatch,
    path: ['confirmPassword'],
  }
);

// Password strength checker utility
export const getPasswordStrength = (password: string): {
  score: number;
  feedback: string;
  color: string;
} => {
  if (!password) {
    return { score: 0, feedback: '', color: 'text-neutral-400' };
  }

  let score = 0;
  const checks = [
    PASSWORD_PATTERNS.minLength.test(password),
    PASSWORD_PATTERNS.hasUppercase.test(password),
    PASSWORD_PATTERNS.hasLowercase.test(password),
    PASSWORD_PATTERNS.hasNumber.test(password),
    PASSWORD_PATTERNS.hasSpecialChar.test(password),
  ];

  score = checks.filter(Boolean).length;

  if (score < 3) {
    return {
      score,
      feedback: ValidationMessages.password.weak,
      color: 'text-red-600',
    };
  } else if (score < 5) {
    return {
      score,
      feedback: ValidationMessages.password.medium,
      color: 'text-yellow-600',
    };
  } else {
    return {
      score,
      feedback: ValidationMessages.password.strong,
      color: 'text-green-600',
    };
  }
};

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// Field validators for individual use
export const fieldValidators = {
  email: emailValidator,
  loginPassword: loginPasswordValidator,
  registerPassword: registerPasswordValidator,
  confirmPassword: (password: string) =>
    z.string().refine((value) => value === password, {
      message: ValidationMessages.confirmPassword.noMatch,
    }),
  fullName: z
    .string()
    .min(1, ValidationMessages.name.required)
    .min(2, ValidationMessages.name.minLength)
    .max(50, ValidationMessages.name.maxLength),
  phone: z.string().optional().refine(
    (phone) => {
      if (!phone || phone.trim() === '') return true;
      const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,}$/;
      return phoneRegex.test(phone.trim());
    },
    {
      message: ValidationMessages.phone.invalid,
    }
  ),
};
