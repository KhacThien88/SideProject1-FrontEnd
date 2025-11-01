# 🤖 AI Resume Analyzer & Job Match Platform

**Frontend cho hệ thống AI phân tích CV và khớp việc làm thông minh**

## 🎯 Tổng quan

Hệ thống AI-powered giúp ứng viên upload CV, phân tích tự động và tìm kiếm công việc phù hợp. Đồng thời hỗ trợ nhà tuyển dụng đăng tin và tìm kiếm ứng viên phù hợp.

## ✨ Tính năng chính

### 👤 Cho Ứng viên
- **Upload & Phân tích CV**: Tải lên CV (PDF/Word), AI tự động trích xuất skills, kinh nghiệm, học vấn
- **Job Matching**: Tìm kiếm công việc phù hợp dựa trên CV đã phân tích
- **Apply Jobs**: Ứng tuyển trực tiếp với CV đã được tối ưu
- **Notifications**: Nhận thông báo job mới phù hợp, cập nhật trạng thái ứng tuyển

### 🏢 Cho Nhà tuyển dụng  
- **Đăng Job Postings**: Tạo và quản lý tin tuyển dụng
- **CV Matching**: Xem danh sách CV phù hợp với job posting
- **Quản lý Applications**: Theo dõi đơn ứng tuyển và trạng thái

### 🔧 Cho Admin
- **User Management**: Quản lý người dùng, phân quyền
- **System Monitoring**: Giám sát hiệu suất AI, logs, metrics
- **Content Moderation**: Duyệt job postings, quản lý nội dung

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS
- **State Management**: React Context + Custom Hooks
- **API**: RESTful + WebSocket (real-time notifications)
- **Testing**: Jest + React Testing Library

## 🚀 Quick Start

```bash
# Cài đặt dependencies
cd webapp
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

## � Documentation

All detailed documentation has been moved to [`docs/`](./docs/) folder:

- **[docs/README.md](./docs/README.md)** - Documentation index
- **[docs/AUTHENTICATION_FLOW_SUMMARY.md](./docs/AUTHENTICATION_FLOW_SUMMARY.md)** - Complete auth flow
- **[docs/QUICK_REFERENCE.md](./docs/QUICK_REFERENCE.md)** - Quick lookup tables
- **[docs/TESTING_GUIDE.md](./docs/TESTING_GUIDE.md)** - Test scenarios
- See [`docs/README.md`](./docs/README.md) for full list

## �📁 Cấu trúc dự án

```
webapp/
├── public/             # Static assets
├── src/
│   ├── app/           # App configuration
│   │   ├── providers/ # Context providers
│   │   └── router/    # Routing setup
│   ├── pages/         # Page components
│   │   ├── Auth/      # Authentication pages
│   │   │   ├── Login/
│   │   │   └── Register/
│   │   ├── CVAnalysis/    # CV upload & analysis
│   │   ├── JobMatching/   # Job search & matching
│   │   └── Admin/         # Admin dashboard
│   ├── components/    # Reusable UI components
│   │   ├── common/    # Common components
│   │   │   ├── Upload/    # File upload
│   │   │   ├── Preview/   # File preview
│   │   │   └── Progress/  # Progress indicators
│   │   └── JobMatching/   # Job-specific components
│   ├── contexts/      # React Context providers
│   │   └── auth/      # Authentication context
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API & external services
│   │   ├── api/       # API clients
│   │   │   ├── http/      # HTTP client setup
│   │   │   ├── auth/      # Auth API calls
│   │   │   ├── upload/    # File upload API
│   │   │   ├── jobs/      # Job-related API
│   │   │   └── notifications/ # Notification API
│   │   └── ws/        # WebSocket services
│   ├── utils/         # Utility functions
│   │   └── validation/ # Form validation
│   ├── types/         # TypeScript type definitions
│   ├── config/        # App configuration
│   ├── lib/          # Third-party library configs
│   ├── styles/       # Global styles
│   └── assets/       # Static assets
│       ├── images/   # Image files
│       └── icons/    # Icon files
├── tests/            # Test files
│   ├── unit/         # Unit tests
│   └── e2e/          # End-to-end tests
├── mocks/            # Mock data
│   ├── api/          # API mocks
│   └── data/         # Test data
├── fixtures/         # Test fixtures
└── scripts/          # Build & utility scripts
```

## 🔗 Tích hợp

- **Backend API**: FastAPI (Python)
- **Database**: DynamoDB + OpenSearch
- **AI Services**: AWS Textract + SageMaker/Bedrock
- **Storage**: Amazon S3
- **Notifications**: AWS SES + Slack/WhatsApp
- **Infrastructure**: AWS (EC2, ALB, Auto Scaling)


