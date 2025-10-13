# Focus Effect System

Hệ thống focus effects toàn cục cho dự án Frontend, cung cấp các hiệu ứng focus mượt mà và hiện đại cho tất cả các form elements.

## 🎯 Tính năng

- **4 loại focus effects**: Smooth, Gradient, Ripple, Glow
- **5 kích thước**: XS, SM, MD, LG, XL
- **6 màu sắc**: Primary, Secondary, Accent, Success, Warning, Error
- **7 loại input**: Text, Email, Password, Search, Number, URL, Textarea
- **Button focus effects**: Smooth và Gradient
- **Utility functions**: Dễ dàng tạo classes và cấu hình
- **TypeScript support**: Đầy đủ type definitions

## 🚀 Cách sử dụng

### 1. Sử dụng Components có sẵn

```tsx
import { Input, Textarea, Button } from '../components/ui/FocusInput';

// Input với focus effect
<Input
  label="Email"
  placeholder="Enter your email"
  variant="email"
  focusConfig={{ type: 'smooth', size: 'md', color: 'primary' }}
/>

// Textarea với focus effect
<Textarea
  label="Message"
  placeholder="Enter your message..."
  focusConfig={{ type: 'gradient', size: 'lg', color: 'secondary' }}
/>

// Button với focus effect
<Button
  focusType="smooth"
  variant="primary"
  size="md"
>
  Click me
</Button>
```

### 2. Sử dụng Utility Functions

```tsx
import { getFocusEffectClasses, createFocusEffect } from '../utils/focusEffects';

// Tạo classes trực tiếp
const classes = getFocusEffectClasses({
  type: 'smooth',
  size: 'md',
  color: 'primary',
  inputType: 'email'
});

// Sử dụng presets
const inputClasses = createFocusEffect.input('md', 'primary');
const searchClasses = createFocusEffect.search('lg');
const errorClasses = createFocusEffect.error('md');
const gradientClasses = createFocusEffect.gradient('lg', 'accent');

// Áp dụng vào input
<input className={cn('w-full border border-gray-200', classes)} />
```

### 3. Sử dụng Presets

```tsx
import { FocusPresets } from '../components/ui/FocusInput';

// Sử dụng presets có sẵn
<input className={FocusPresets.otp.ultra} />
<input className={FocusPresets.colors.primary} />
<input className={FocusPresets.sizes.lg} />
```

### 4. Sử dụng Hook

```tsx
import { useFocusEffect } from '../utils/focusEffects';

const MyComponent = () => {
  const { getClasses, getButtonClasses, presets } = useFocusEffect({
    type: 'smooth',
    size: 'md',
    color: 'primary'
  });

  return (
    <div>
      <input className={getClasses()} />
      <button className={getButtonClasses('gradient')}>Button</button>
    </div>
  );
};
```

## 🎨 Các loại Focus Effects

### Smooth Focus
- Hiệu ứng mượt mà với scale và shadow
- Phù hợp cho hầu hết các trường hợp sử dụng
- Performance tốt nhất

```tsx
focusConfig={{ type: 'smooth' }}
```

### Gradient Focus
- Hiệu ứng với gradient border
- Tạo cảm giác premium và hiện đại
- Phù hợp cho các input quan trọng

```tsx
focusConfig={{ type: 'gradient' }}
```

### Ripple Focus
- Hiệu ứng ripple từ trung tâm
- Tạo cảm giác tương tác tự nhiên
- Phù hợp cho mobile và touch devices

```tsx
focusConfig={{ type: 'ripple' }}
```

### Glow Focus
- Hiệu ứng glow với animation
- Tạo cảm giác nổi bật và thu hút
- Phù hợp cho các input đặc biệt

```tsx
focusConfig={{ type: 'glow' }}
```

## 🎨 Các màu sắc

```tsx
// Primary (Blue)
focusConfig={{ color: 'primary' }}

// Secondary (Green)
focusConfig={{ color: 'secondary' }}

// Accent (Orange)
focusConfig={{ color: 'accent' }}

// Success (Green)
focusConfig={{ color: 'success' }}

// Warning (Orange)
focusConfig={{ color: 'warning' }}

// Error (Red)
focusConfig={{ color: 'error' }}
```

## 📏 Các kích thước

```tsx
// Extra Small
focusConfig={{ size: 'xs' }}

// Small
focusConfig={{ size: 'sm' }}

// Medium (default)
focusConfig={{ size: 'md' }}

// Large
focusConfig={{ size: 'lg' }}

// Extra Large
focusConfig={{ size: 'xl' }}
```

## 🔧 Các loại Input

```tsx
// Text input
<Input variant="default" />

// Email input
<Input variant="email" />

// Password input
<Input variant="password" />

// Search input
<Input variant="search" />

// Number input
<Input variant="number" />

// URL input
<Input variant="url" />

// Textarea
<Textarea />
```

## 🎯 Button Focus Effects

```tsx
// Smooth focus
<Button focusType="smooth" />

// Gradient focus
<Button focusType="gradient" />

// Các variants
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="accent" />
<Button variant="success" />
<Button variant="warning" />
<Button variant="error" />
<Button variant="ghost" />
```

## 📱 Responsive Design

Hệ thống focus effects tự động responsive và hoạt động tốt trên mọi thiết bị:

- **Desktop**: Hiệu ứng đầy đủ với hover states
- **Tablet**: Touch-friendly với appropriate sizing
- **Mobile**: Optimized cho touch interaction

## ♿ Accessibility

- **Keyboard navigation**: Hỗ trợ đầy đủ keyboard navigation
- **Screen readers**: Compatible với screen readers
- **Focus management**: Proper focus management
- **Reduced motion**: Respects `prefers-reduced-motion`

## 🎨 Customization

### Custom Colors

```css
/* Thêm màu custom */
.focus-custom {
  border-color: rgba(255, 0, 255, 0.2);
}

.focus-custom:focus {
  box-shadow: 
    0 0 0 2px rgba(255, 0, 255, 0.3),
    0 2px 16px rgba(255, 0, 255, 0.1);
  background: rgba(255, 0, 255, 0.01);
}
```

### Custom Animations

```css
/* Thêm animation custom */
@keyframes custom-focus {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.focus-custom:focus {
  animation: custom-focus 0.3s ease-out;
}
```

## 🚀 Performance

- **CSS-only**: Không sử dụng JavaScript cho animations
- **Hardware acceleration**: Sử dụng `transform` và `opacity`
- **Optimized transitions**: Sử dụng `cubic-bezier` cho smooth transitions
- **Minimal DOM impact**: Không tạo thêm DOM elements

## 📚 Examples

Xem file `FocusEffectDemo.tsx` để có các ví dụ đầy đủ về cách sử dụng hệ thống focus effects.

## 🔄 Migration

### Từ OTP Input cũ

```tsx
// Cũ
<input className="otp-input-ultra" />

// Mới
<input className={createFocusEffect.input('md', 'primary')} />
```

### Từ Button cũ

```tsx
// Cũ
<button className="btn-primary">Click</button>

// Mới
<Button focusType="smooth" variant="primary">Click</Button>
```

## 🐛 Troubleshooting

### Focus effect không hoạt động

1. Kiểm tra CSS classes có được import đúng không
2. Đảm bảo `focus:outline-none` được áp dụng
3. Kiểm tra z-index conflicts

### Performance issues

1. Sử dụng `transform` thay vì `left/top`
2. Tránh sử dụng quá nhiều animations cùng lúc
3. Sử dụng `will-change` cho elements có animation

### Accessibility issues

1. Đảm bảo có proper focus indicators
2. Test với keyboard navigation
3. Kiểm tra contrast ratios

## 📝 Changelog

### v1.0.0
- Initial release
- 4 focus effect types
- 5 size variants
- 6 color variants
- 7 input types
- Button focus effects
- Utility functions
- TypeScript support
- Demo page
