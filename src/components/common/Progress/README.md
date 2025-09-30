# Progress Components

This directory contains progress tracking components.

## ProgressTracker

A multi-stage progress tracking component with comprehensive features:

- **Multi-Stage Progress**: Visual representation of analysis stages
- **Time Tracking**: Elapsed time and ETA estimation
- **Interactive Controls**: Pause, resume, cancel, and retry
- **Error Handling**: Error states with recovery options
- **Animated Progress**: Smooth progress bar animations
- **Status Updates**: Real-time status and stage descriptions

### Props

```tsx
interface ProgressTrackerProps {
  progress: AnalysisProgress;
  fileName: string;
  onCancel?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onRetry?: () => void;
  className?: string;
  isPaused?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}
```

### Usage

```tsx
<ProgressTracker
  progress={{
    stage: 'analyze',
    percentage: 75,
    estimatedTime: 30
  }}
  fileName="resume.pdf"
  onCancel={() => setCurrentStep('preview')}
/>
```

### Stages

1. **Upload**: File upload to secure servers
2. **Extract**: Text and data extraction
3. **Analyze**: Skills and experience analysis
4. **Complete**: Analysis completion
