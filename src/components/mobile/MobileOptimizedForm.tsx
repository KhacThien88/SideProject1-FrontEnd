import React, { useState } from 'react';
import { Upload, FileText, Check } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface MobileOptimizedFormProps {
  onSubmit: (file: File) => void;
  isLoading?: boolean;
}

export const MobileOptimizedForm: React.FC<MobileOptimizedFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onSubmit(selectedFile);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-4">
        {/* Mobile-optimized file input */}
        <div
          className={`
            relative border-2 border-dashed rounded-2xl p-6
            ${isDragOver ? 'border-primary-500 bg-primary-50' : 'border-neutral-300'}
            ${selectedFile ? 'bg-secondary-50 border-secondary-300' : 'bg-white'}
            transition-all
          `}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) setSelectedFile(file);
          }}
        >
          <input
            type="file"
            id="cv-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer touch-target"
          />

          <div className="text-center pointer-events-none">
            {selectedFile ? (
              <>
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-secondary-100 flex items-center justify-center">
                  <Check className="w-7 h-7 text-secondary-600" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-secondary-600" />
                  <p className="font-semibold text-neutral-900 truncate max-w-[200px]">
                    {selectedFile.name}
                  </p>
                </div>
                <p className="text-sm text-neutral-600">
                  {formatFileSize(selectedFile.size)}
                </p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary-100 flex items-center justify-center">
                  <Upload className="w-7 h-7 text-primary-600" />
                </div>
                <p className="text-lg font-semibold text-neutral-900 mb-1">
                  {t.mobileForm?.tapToUpload || 'Tap to Upload CV'}
                </p>
                <p className="text-sm text-neutral-600">
                  {t.mobileForm?.supportedFormats || 'PDF, DOC, DOCX up to 10MB'}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Mobile-optimized submit button */}
        <button
          type="submit"
          disabled={!selectedFile || isLoading}
          className={`
            w-full py-4 rounded-xl font-semibold text-lg
            transition-all active:scale-98 touch-target
            ${
              selectedFile && !isLoading
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg active:shadow-xl'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }
          `}
        >
          {isLoading
            ? t.mobileForm?.analyzing || 'Analyzing...'
            : t.mobileForm?.analyze || 'Analyze CV'}
        </button>

        {/* Info text */}
        <p className="text-xs text-center text-neutral-500 px-4">
          {t.mobileForm?.privacy || 'Your CV is processed securely. We never share your data.'}
        </p>
      </div>
    </form>
  );
};
