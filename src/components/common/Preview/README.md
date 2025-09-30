# Preview Components

This directory contains document preview components.

## DocumentPreview

A comprehensive document preview component with the following features:

- **PDF Support**: Native PDF viewing with embedded iframe
- **DOC/DOCX Support**: Fallback UI with download option
- **Zoom Controls**: Zoom in/out with preset levels
- **Rotation**: 90-degree rotation functionality
- **Page Navigation**: Multi-page document navigation
- **Fullscreen Mode**: Expandable fullscreen view
- **Download**: Direct file download capability
- **Responsive**: Mobile-friendly interface

### Props

```tsx
interface DocumentPreviewProps {
  file: UploadedFile;
  className?: string;
  maxHeight?: string; // Default: "600px"
}
```

### Usage

```tsx
<DocumentPreview 
  file={selectedFile}
  maxHeight="800px"
/>
```

### Features

- **Error Handling**: Graceful error states with retry options
- **Loading States**: Smooth loading animations
- **Accessibility**: Screen reader support and keyboard navigation
- **Performance**: Optimized for large document files
