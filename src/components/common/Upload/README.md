# Upload Components

This directory contains file upload components.

## DropzoneUploader

A comprehensive drag-and-drop file uploader with the following features:

- **Drag & Drop**: Smooth drag-and-drop interface
- **Click to Select**: Alternative file selection method
- **Validation**: File type, size, and count validation
- **Progress Tracking**: Real-time upload progress
- **File Management**: Preview, remove, and retry functionality
- **Responsive**: Works on desktop and mobile devices
- **Accessible**: Keyboard navigation and screen reader support

### Props

```tsx
interface DropzoneUploaderProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  maxFiles?: number; // Default: 3
  maxFileSize?: number; // Default: 10MB
  acceptedTypes?: string[]; // Default: ['pdf', 'doc', 'docx']
  className?: string;
  disabled?: boolean;
}
```

### Usage

```tsx
<DropzoneUploader
  onFilesUploaded={handleFilesUploaded}
  maxFiles={3}
  maxFileSize={10 * 1024 * 1024}
  acceptedTypes={['pdf', 'doc', 'docx']}
/>
```
