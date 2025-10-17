# CV Analysis Components

This directory contains all components related to CV analysis functionality.

## Components

### CVAnalysis (Main Page)
- Main page component that orchestrates the entire CV analysis workflow
- Manages state for upload, preview, analysis, and results steps
- Handles routing between different analysis stages

### DropzoneUploader
- Drag-and-drop file upload component with validation
- Supports PDF, DOC, DOCX files up to 10MB each
- Maximum 3 files per upload session
- Real-time upload progress tracking
- File management (preview, remove, retry)

### DocumentPreview
- Document preview component with PDF viewer
- Zoom, rotation, and fullscreen controls
- Page navigation for multi-page documents
- Download functionality
- Fallback UI for unsupported formats

### ProgressTracker
- Multi-stage progress indicator
- Time estimation and elapsed time tracking
- Pause/resume/cancel functionality
- Error handling and retry options
- Animated progress bars

### CVAnalysisResult
- Comprehensive results display with tabbed interface
- Data visualization for skills, experience, education
- Export functionality (PDF, JSON)
- Print-friendly layout
- Responsive design for all screen sizes

## Features

- Full internationalization (English/Vietnamese)
- Responsive design for mobile and desktop
- Accessibility compliant
- Error handling and recovery
- File validation and security
- Progress persistence
- Export and sharing capabilities

## Usage

```tsx
import { CVAnalysis } from './pages/CVAnalysis';

// Use in routing
<Route path="/cv-analysis" component={CVAnalysis} />
```

The page is fully self-contained and handles all CV analysis workflow internally.
