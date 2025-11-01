# API Integration Guide - Authentication

Hướng dẫn tích hợp API Backend với Frontend cho hệ thống Authentication.

## 🚀 Đã hoàn thành

### ✅ 1. API Service Layer
- **File**: `src/services/api/authService.ts`
- **Chức năng**: 
  - HTTP client với error handling
  - Token management
  - API endpoints cho authentication
  - Error handling utilities

### ✅ 2. TypeScript Types
- **File**: `src/types/auth.ts`
- **Chức năng**:
  - Định nghĩa types cho API requests/responses
  - Auth context types
  - Error handling types

### ✅ 3. Auth Context
- **File**: `src/contexts/auth/AuthContext.tsx`
- **Chức năng**:
  - State management cho authentication
  - Token storage và refresh
  - Auth actions (register, login, verifyOTP, etc.)

### ✅ 4. Register Form Integration
- **File**: `src/pages/Auth/Register/components/RegisterForm.tsx`
- **Chức năng**:
  - Kết nối với API register
  - Error handling
  - Navigation sau khi đăng ký thành công

### ✅ 5. OTP Verification Integration
- **File**: `src/pages/Auth/Register/verify-otp/VerifyOTP.tsx`
- **Chức năng**:
  - Kết nối với API verify-otp
  - Kết nối với API resend-otp
  - Error handling và success states

### ✅ 6. App Provider Setup
- **File**: `src/App.tsx`
- **Chức năng**:
  - Thêm AuthProvider vào app
  - Provider hierarchy

## 🔧 Cách sử dụng

### 1. Register API
```typescript
// Trong RegisterForm component
const { register } = useAuth();

const handleSubmit = async (formData) => {
  try {
    await register({
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      full_name: formData.fullName,
      phone: formData.phone,
      role: formData.role,
    });
    
    // Navigate to OTP verification
    navigate('/verify-otp');
  } catch (error) {
    // Handle error
  }
};
```

### 2. OTP Verification API
```typescript
// Trong VerifyOTP component
const { verifyOTP, resendOTP } = useAuth();

const handleVerification = async (otpCode) => {
  try {
    await verifyOTP(email, otpCode);
    // Navigate to login
    navigate('/login');
  } catch (error) {
    // Handle error
  }
};

const handleResend = async () => {
  try {
    await resendOTP(email);
    // Show success message
  } catch (error) {
    // Handle error
  }
};
```

### 3. Error Handling
```typescript
// API errors được handle tự động
const { error, isLoading } = useAuth();

// Custom error handling
try {
  await register(userData);
} catch (error) {
  const errorMessage = ApiErrorHandler.handleError(error);
  showErrorToast(errorMessage);
}
```

## 📡 API Endpoints

### Backend Endpoints
- `POST /api/v1/auth/register` - Đăng ký tài khoản
- `POST /api/v1/auth/verify-otp` - Xác thực OTP
- `POST /api/v1/auth/resend-otp` - Gửi lại OTP
- `POST /api/v1/auth/login` - Đăng nhập (chưa implement)
- `POST /api/v1/auth/logout` - Đăng xuất (chưa implement)
- `POST /api/v1/auth/refresh` - Refresh token (chưa implement)

### Request/Response Examples

#### Register Request
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "confirm_password": "Password123!",
  "full_name": "John Doe",
  "phone": "+84123456789",
  "role": "candidate"
}
```

#### Register Response
```json
{
  "message": "Registration successful. Please verify your email.",
  "email": "user@example.com",
  "status": "pending_verification"
}
```

#### OTP Verification Request
```json
{
  "email": "user@example.com",
  "otp_code": "123456"
}
```

#### OTP Verification Response
```json
{
  "message": "Email verified successfully",
  "email": "user@example.com",
  "status": "verified"
}
```

## 🔄 Flow hoạt động

### 1. Registration Flow
```
User fills form → Validate → Call register API → Show success → Navigate to OTP
```

### 2. OTP Verification Flow
```
User enters OTP → Call verify-otp API → Show success → Navigate to login
```

### 3. Resend OTP Flow
```
User clicks resend → Call resend-otp API → Show success → Reset timer
```

## 🛠️ Configuration

### API Base URL
```typescript
// Trong authService.ts
const API_BASE_URL = 'http://localhost:8000/api/v1';
```

### Timeout Settings
```typescript
const API_TIMEOUT = 10000; // 10 seconds
```

## 🎯 Testing

### 1. Test Registration
```bash
# Start backend server
cd F:\SideProject1-BackEnd
python -m uvicorn app.main:app --reload --port 8000

# Start frontend server
cd F:\SideProject1-FrontEnd
npm run dev
```

### 2. Test với Postman
```bash
# Register endpoint
POST http://localhost:8000/api/v1/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Password123!",
  "confirm_password": "Password123!",
  "full_name": "Test User",
  "role": "candidate"
}
```

### 3. Test OTP Verification
```bash
# Verify OTP endpoint
POST http://localhost:8000/api/v1/auth/verify-otp
Content-Type: application/json

{
  "email": "test@example.com",
  "otp_code": "123456"
}
```

## 🚨 Error Handling

### Common Errors
- **Email already exists**: Email đã được sử dụng
- **Invalid password**: Mật khẩu không đủ mạnh
- **Invalid OTP**: Mã OTP không đúng hoặc hết hạn
- **Network error**: Lỗi kết nối mạng
- **Server error**: Lỗi server

### Error Messages (i18n)
```typescript
// Vietnamese
auth.register.toast.emailExists: "Email đã được sử dụng"
auth.register.toast.passwordWeak: "Mật khẩu không đủ mạnh"
auth.verifyOTP.toast.verificationFailed: "Mã OTP không đúng"

// English
auth.register.toast.emailExists: "Email already exists"
auth.register.toast.passwordWeak: "Password is too weak"
auth.verifyOTP.toast.verificationFailed: "Invalid OTP code"
```

## 🔮 Next Steps

### 1. Login Integration
- Implement login API call
- Add login form validation
- Handle login success/error

### 2. Token Management
- Implement automatic token refresh
- Add token expiration handling
- Secure token storage

### 3. Protected Routes
- Add route protection
- Implement authentication guards
- Handle unauthorized access

### 4. User Profile
- Implement user profile API
- Add profile update functionality
- Handle profile image upload

## 📝 Notes

- **Email từ Register**: Hiện tại email được hardcode trong VerifyOTP, cần implement cách truyền email từ Register page
- **Error Messages**: Tất cả error messages đều có i18n support
- **Loading States**: Có loading states cho tất cả API calls
- **Toast Notifications**: Sử dụng toast để hiển thị success/error messages
- **Navigation**: Sử dụng custom router với smooth transitions

## 🐛 Troubleshooting

### Common Issues
1. **CORS Error**: Đảm bảo backend có CORS configuration
2. **Network Error**: Kiểm tra backend server có chạy không
3. **Validation Error**: Kiểm tra request data format
4. **Token Error**: Kiểm tra token storage và refresh logic

### Debug Tips
```typescript
// Enable debug logging
console.log('API Request:', requestData);
console.log('API Response:', responseData);
console.log('API Error:', error);
```
