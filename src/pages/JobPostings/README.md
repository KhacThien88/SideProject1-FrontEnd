# Job Postings Page

Trang quản lý tin tuyển dụng cho phép HR đăng và quản lý các vị trí tuyển dụng.

## Tính năng

### 1. Danh sách Job Profiles
- Hiển thị tất cả job profiles dưới dạng grid cards
- Mỗi card hiển thị:
  - Icon gradient (primary to secondary)
  - Tên công việc và nhãn "Job Profile"
  - Mô tả ngắn
  - Kinh nghiệm yêu cầu
  - Số lượng Active Matches
  - Required Skills (tối đa 4, hiển thị +N more nếu có nhiều hơn)
  - Preferred Skills (tối đa 3, hiển thị +N more nếu có nhiều hơn)
  - Action buttons: View Matches, Edit, Delete

### 2. Tìm kiếm
- Search bar với icon tìm kiếm
- Tìm kiếm theo:
  - Tên công việc
  - Mô tả
  - Required skills
  - Preferred skills

### 3. Tạo/Chỉnh sửa Job Profile
- Modal form với các fields:
  - Job Title (text input)
  - Description (textarea)
  - Experience Level (dropdown: 0-1, 1-2, 2+, 3+, 5+ years)
  - Required Skills (thêm/xóa skills với tags)
  - Preferred Skills (thêm/xóa skills với tags)
- Validation: title, description, và ít nhất 1 required skill
- Mode edit: pre-fill data từ profile đang edit

### 4. Xóa Job Profile
- Confirm dialog trước khi xóa
- Toast notification sau khi xóa thành công

### 5. Empty States
- "No Job Postings Yet" khi chưa có job profile nào
- "No Results Found" khi tìm kiếm không có kết quả

## Components

### JobPostingCard
Location: `src/pages/JobPostings/components/JobPostingCard.tsx`

Props:
- `jobProfile`: JobProfile object
- `onViewMatches`: (id: string) => void
- `onEdit`: (id: string) => void
- `onDelete`: (id: string) => void

Features:
- Gradient icon background
- Skill badges với màu tự động
- Dropdown menu với Edit/Delete
- Action buttons ở footer

### CreateJobProfileModal
Location: `src/pages/JobPostings/components/CreateJobProfileModal.tsx`

Props:
- `isOpen`: boolean
- `onClose`: () => void
- `onSubmit`: (data: CreateJobProfileData) => Promise<void>
- `editingProfile?`: JobProfile | null

Features:
- Form validation
- Dynamic skill tags
- Enter key để thêm skill
- Loading state khi submit

### JobPostings (Main Page)
Location: `src/pages/JobPostings/JobPostings.tsx`

State Management:
- jobProfiles: danh sách tất cả job profiles
- filteredProfiles: danh sách sau khi filter
- searchQuery: query string
- isModalOpen: trạng thái modal
- editingProfile: profile đang edit (null nếu create)

## Service

### jobPostingService
Location: `src/services/api/jobPosting/jobPostingService.ts`

Methods:
- `getJobProfiles()`: Lấy tất cả job profiles
- `getJobProfile(id)`: Lấy 1 job profile theo ID
- `createJobProfile(data)`: Tạo job profile mới
- `updateJobProfile(id, data)`: Cập nhật job profile
- `deleteJobProfile(id)`: Xóa job profile
- `getMatches(jobProfileId)`: Lấy matches cho 1 job profile
- `searchJobProfiles(query)`: Tìm kiếm job profiles

Mock data: 4 job profiles mẫu (Full Stack, Frontend, Backend, Data Scientist)

## Types

### JobProfile
```typescript
{
  id: string;
  title: string;
  description: string;
  experience: ExperienceLevel;
  requiredSkills: string[];
  preferredSkills: string[];
  activeMatches: number;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'draft';
}
```

### ExperienceLevel
`'0-1 years' | '1-2 years' | '2+ years' | '3+ years' | '5+ years'`

## Styling

- Background: Gradient từ primary-50 qua white đến secondary-50
- Cards: White với border neutral-200, hover shadow
- Icon: Gradient từ primary-500 đến secondary-500
- Skill badges: Màu tự động theo tên skill
  - Required skills: Purple tones
  - Preferred skills: Emerald tones
- Buttons: Gradient primary-to-secondary cho CTA
- Modal: White với rounded-2xl, max-height 90vh

## i18n Support

Tất cả text đều support đa ngôn ngữ (Tiếng Việt/English):
- Page title và subtitle
- Form labels và placeholders
- Button text
- Toast messages
- Empty state messages

Keys trong `jobPostings` namespace:
- title, subtitle, searchPlaceholder
- createJobProfile, editJobProfile, jobProfile
- jobTitle, description, experienceLevel
- requiredSkills, preferredSkills
- viewMatches, edit, delete, save
- Success/error messages

## Navigation

Route: `/dashboard/job-postings`

Accessible via:
- DashboardSidebar: "Đăng tuyển" / "Job Postings" menu item
- Icon: Briefcase
- Active state khi đang ở trang này
