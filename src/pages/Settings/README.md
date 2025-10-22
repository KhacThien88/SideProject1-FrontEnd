# Settings Page

Complete settings management page with multiple tabs and configuration options.

## Features

### 1. Profile Tab
- Update personal information (name, email, company, role)
- Change password with current/new/confirm fields
- Password visibility toggle

### 2. Notifications Tab
- Email alerts toggle
- Push notifications toggle
- Weekly reports toggle
- Analysis complete notifications toggle

### 3. Privacy & Security Tab
- Data retention period selector (30/60/90/180/365 days)
- Anonymous analytics sharing toggle
- Auto-delete old data toggle

### 4. Data Management Tab
- **Export Data**: Download all data in JSON format
- **Import Data**: Import from previous backups
- **Reset Settings**: Reset all settings to default
- **Delete All Data**: Permanently delete all user data (with double confirmation)

### 5. Appearance Tab
- Theme selector (Light/Dark/Auto)
- Language selector (English/Vietnamese)
- Date format selector (MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD)

## Components

- `Settings.tsx` - Main page component with tab management
- `SettingsSidebar.tsx` - Sidebar navigation for tabs
- `ProfileTab.tsx` - Profile settings component
- `NotificationsTab.tsx` - Notification preferences
- `PrivacyTab.tsx` - Privacy and security settings
- `DataManagementTab.tsx` - Data import/export/delete
- `AppearanceTab.tsx` - UI customization options

## Services

`settingsService.ts` - API service for:
- Get/update profile
- Get/update notifications
- Get/update privacy settings
- Get/update appearance settings
- Export data as JSON
- Import data from JSON
- Reset settings to default
- Delete all user data
- Change password

## Types

`settings.ts` - TypeScript interfaces:
- `UserProfile`
- `NotificationSettings`
- `PrivacySettings`
- `AppearanceSettings`
- `SettingsData`
- `SettingsTab`

## Usage

```tsx
import { Settings } from './pages/Settings';

// Add to router
<Route path="/dashboard/settings" component={Settings} exact />
```

## Design

- Clean, modern UI with gradient accents
- Responsive grid layout
- Smooth transitions and animations
- Toggle switches for boolean options
- Dropdown selects for multi-choice options
- Danger zone styling for destructive actions
- Loading states and error handling
- Toast notifications for user feedback
