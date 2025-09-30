import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Button } from '../../ui/Button';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { Modal } from '../../ui/Modal';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Download, 
  RotateCw,
  ChevronLeft,
  ChevronRight,
  FileText,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  file: File;
}

interface DocumentPreviewProps {
  file: UploadedFile;
  className?: string;
  maxHeight?: string;
}

interface PreviewState {
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  zoom: number;
  rotation: number;
  isFullscreen: boolean;
}

const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  file,
  className,
  maxHeight = '600px',
}) => {
  const { t } = useTranslation();
  const [previewState, setPreviewState] = useState<PreviewState>({
    isLoading: true,
    error: null,
    currentPage: 1,
    totalPages: 1,
    zoom: 1,
    rotation: 0,
    isFullscreen: false,
  });
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Get file extension
  const getFileExtension = (fileName: string): string => {
    return fileName.split('.').pop()?.toLowerCase() || '';
  };

  const fileExtension = getFileExtension(file.name);
  const isPDF = fileExtension === 'pdf';
  const isDocumentFile = ['doc', 'docx'].includes(fileExtension);

  // Initialize preview
  useEffect(() => {
    const initializePreview = async () => {
      setPreviewState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        if (isPDF) {
          // For PDF files, use the file URL directly
          setPreviewUrl(file.url);
          setPreviewState(prev => ({ 
            ...prev, 
            isLoading: false, 
            totalPages: 1 // We'll update this when PDF loads
          }));
        } else if (isDocumentFile) {
          // For DOC/DOCX files, we would typically convert them to PDF or images
          // For now, we'll show a placeholder with file info
          setPreviewUrl(null);
          setPreviewState(prev => ({ 
            ...prev, 
            isLoading: false,
            error: 'Document preview not available. Please download to view the file.'
          }));
        } else {
          setPreviewState(prev => ({ 
            ...prev, 
            isLoading: false,
            error: 'Unsupported file format for preview.'
          }));
        }
      } catch (error) {
        setPreviewState(prev => ({ 
          ...prev, 
          isLoading: false,
          error: 'Failed to load document preview.'
        }));
      }
    };

    initializePreview();
  }, [file, isPDF, isDocumentFile]);

  // Zoom controls
  const handleZoomIn = () => {
    setPreviewState(prev => ({
      ...prev,
      zoom: Math.min(prev.zoom * 1.25, MAX_ZOOM)
    }));
  };

  const handleZoomOut = () => {
    setPreviewState(prev => ({
      ...prev,
      zoom: Math.max(prev.zoom / 1.25, MIN_ZOOM)
    }));
  };

  const handleZoomReset = () => {
    setPreviewState(prev => ({ ...prev, zoom: 1 }));
  };

  // Rotation control
  const handleRotate = () => {
    setPreviewState(prev => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360
    }));
  };

  // Page navigation
  const handlePreviousPage = () => {
    setPreviewState(prev => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 1)
    }));
  };

  const handleNextPage = () => {
    setPreviewState(prev => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + 1, prev.totalPages)
    }));
  };

  // Fullscreen toggle
  const handleFullscreenToggle = () => {
    setPreviewState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
  };

  // Download file
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Retry loading
  const handleRetry = () => {
    setPreviewState(prev => ({ ...prev, isLoading: true, error: null }));
    // Re-trigger preview initialization
    const event = new CustomEvent('retryPreview');
    window.dispatchEvent(event);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Preview content
  const renderPreviewContent = () => {
    if (previewState.isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <LoadingSpinner size="lg" variant="primary" />
          <p className="text-neutral-600">Loading document preview...</p>
        </div>
      );
    }

    if (previewState.error) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-neutral-500" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-neutral-600">{previewState.error}</p>
            <div className="flex items-center space-x-2">
              <Button
                variant="tertiary"
                size="sm"
                onClick={handleRetry}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDownload}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (isPDF && previewUrl) {
      return (
        <div 
          className="w-full h-full"
          style={{
            transform: `scale(${previewState.zoom}) rotate(${previewState.rotation}deg)`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-in-out'
          }}
        >
          <iframe
            ref={iframeRef}
            src={`${previewUrl}#page=${previewState.currentPage}&zoom=${previewState.zoom * 100}`}
            className="w-full h-full border-0"
            title={`Preview of ${file.name}`}
          />
        </div>
      );
    }

    // Fallback for non-PDF files
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6">
        <div className="w-20 h-20 bg-neutral-100 rounded-2xl flex items-center justify-center">
          <FileText className="w-10 h-10 text-neutral-500" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-neutral-900">{file.name}</h3>
          <p className="text-neutral-600">
            Preview not available for this file type
          </p>
          <p className="text-sm text-neutral-500">
            {formatFileSize(file.size)} • {fileExtension.toUpperCase()}
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={handleDownload}
          className="flex items-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Download to View</span>
        </Button>
      </div>
    );
  };

  const PreviewComponent = () => (
    <div className={cn('bg-white rounded-xl shadow-brand overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-neutral-50">
        <div className="flex items-center space-x-3">
          <FileText className="w-5 h-5 text-neutral-600" />
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 truncate max-w-xs">
              {file.name}
            </h3>
            <p className="text-xs text-neutral-500">
              {formatFileSize(file.size)} • {fileExtension.toUpperCase()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="tertiary"
            size="sm"
            onClick={handleDownload}
            className="flex items-center space-x-1"
          >
            <Download className="w-4 h-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button
            variant="tertiary"
            size="sm"
            onClick={handleFullscreenToggle}
            className="flex items-center space-x-1"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="sr-only">Fullscreen</span>
          </Button>
        </div>
      </div>

      {/* Controls */}
      {isPDF && !previewState.error && (
        <div className="flex items-center justify-between p-3 border-b border-neutral-200 bg-neutral-50/50">
          <div className="flex items-center space-x-2">
            {/* Page Navigation */}
            <Button
              variant="tertiary"
              size="sm"
              onClick={handlePreviousPage}
              disabled={previewState.currentPage <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-neutral-600 px-2">
              {previewState.currentPage} / {previewState.totalPages}
            </span>
            <Button
              variant="tertiary"
              size="sm"
              onClick={handleNextPage}
              disabled={previewState.currentPage >= previewState.totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <Button
              variant="tertiary"
              size="sm"
              onClick={handleZoomOut}
              disabled={previewState.zoom <= MIN_ZOOM}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-neutral-600 px-2 min-w-16 text-center">
              {Math.round(previewState.zoom * 100)}%
            </span>
            <Button
              variant="tertiary"
              size="sm"
              onClick={handleZoomIn}
              disabled={previewState.zoom >= MAX_ZOOM}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>

            {/* Rotation */}
            <Button
              variant="tertiary"
              size="sm"
              onClick={handleRotate}
            >
              <RotateCw className="w-4 h-4" />
            </Button>

            {/* Reset Zoom */}
            <Button
              variant="tertiary"
              size="sm"
              onClick={handleZoomReset}
              disabled={previewState.zoom === 1}
            >
              Reset
            </Button>
          </div>
        </div>
      )}

      {/* Preview Content */}
      <div 
        ref={previewRef}
        className="relative overflow-auto bg-neutral-100"
        style={{ height: maxHeight }}
      >
        {renderPreviewContent()}
      </div>
    </div>
  );

  return (
    <>
      <PreviewComponent />
      
      {/* Fullscreen Modal */}
      <Modal
        isOpen={previewState.isFullscreen}
        onClose={() => setPreviewState(prev => ({ ...prev, isFullscreen: false }))}
        size="full"
        title={file.name}
        className="h-full"
      >
        <div className="h-full">
          <PreviewComponent />
        </div>
      </Modal>
    </>
  );
};