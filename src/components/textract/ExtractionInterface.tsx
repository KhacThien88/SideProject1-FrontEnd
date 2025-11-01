import React, { useState, useCallback } from 'react';
import { useTextract } from '../../hooks/api/useTextract';
import type { ExtractionResultResponse } from '../../services/api';
import { StatusDisplay } from '../shared/StatusDisplay';
import { ErrorMessage } from '../shared/ErrorMessage';
import { designSystem } from '../../styles/tokens';
// import { Button } from '../ui/Button';

export interface ExtractionInterfaceProps {
  onExtractionComplete?: (result: ExtractionResultResponse) => void;
  onExtractionError?: (error: string) => void;
  className?: string;
}

export const ExtractionInterface: React.FC<ExtractionInterfaceProps> = ({
  onExtractionComplete,
  onExtractionError,
  className = '',
}) => {
  const [s3Key, setS3Key] = useState('');
  const [documentType, setDocumentType] = useState<'cv' | 'jd'>('cv');
  const [force, setForce] = useState(false);
  
  const {
    submitExtraction,
    extractTextAndWait,
    currentStatus,
    currentResult,
    isSubmitting,
    isPolling,
    currentExtractionId,
    submitError,
    statusError,
  } = useTextract({
    onProgress: (status) => {
      console.log('Extraction progress:', status);
    },
    onComplete: (result) => {
      onExtractionComplete?.(result);
    },
    onError: (error) => {
      onExtractionError?.(error);
    },
    autoStartPolling: true,
  });

  const handleSubmitExtraction = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!s3Key.trim()) {
      return;
    }

    await submitExtraction(s3Key.trim(), documentType, force);
  }, [s3Key, documentType, force, submitExtraction]);

  const handleExtractAndWait = useCallback(async () => {
    if (!s3Key.trim()) {
      return;
    }

    await extractTextAndWait(s3Key.trim(), documentType);
  }, [s3Key, documentType, extractTextAndWait]);

  const error = submitError || statusError;

  return (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          📝 Text Extraction Interface
        </h2>

        {/* Error Display */}
        {error && (
          <div className="mb-4">
            <ErrorMessage
              error={error}
              type="server"
              variant="card"
            />
          </div>
        )}

        {/* Extraction Form */}
        <form onSubmit={handleSubmitExtraction} className="space-y-4">
          <div>
            <label htmlFor="s3Key" className="block text-sm font-medium text-gray-700 mb-1">
              S3 Key / File Path
            </label>
            <input
              type="text"
              id="s3Key"
              value={s3Key}
              onChange={(e) => setS3Key(e.target.value)}
              placeholder="e.g. documents/sample-cv.pdf"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Nhập đường dẫn file trong S3 bucket
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-1">
                Document Type
              </label>
              <select
                id="documentType"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value as 'cv' | 'jd')}
                className={designSystem.forms.select}
              >
                <option value="cv">CV/Resume</option>
                <option value="jd">Job Description</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={force}
                  onChange={(e) => setForce(e.target.checked)}
                  className={designSystem.forms.checkbox}
                />
                <span className="ml-2 text-sm text-gray-700">Force re-extraction</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isSubmitting || isPolling || !s3Key.trim()}
              className={designSystem.buttons.primary}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>🚀 Submit Extraction</>
              )}
            </button>

            <button
              type="button"
              onClick={handleExtractAndWait}
              disabled={isSubmitting || isPolling || !s3Key.trim()}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              ⚡ Extract & Wait
            </button>
          </div>
        </form>

        {/* Current Extraction Status */}
        {currentExtractionId && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Current Extraction</h3>
              <span className="text-xs text-gray-500 font-mono">
                {currentExtractionId}
              </span>
            </div>

            {currentStatus && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <StatusDisplay
                    status={currentStatus.status}
                    variant="full"
                    size="md"
                  />
                  <span className="text-sm text-gray-600">
                    {currentStatus.progress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${currentStatus.progress}%` }}
                  />
                </div>

                <div className="text-sm text-gray-600">
                  <p>{currentStatus.message}</p>
                  {currentStatus.started_at && (
                    <p className="mt-1">
                      Started: {new Date(currentStatus.started_at).toLocaleString('vi-VN')}
                    </p>
                  )}
                  {currentStatus.completed_at && (
                    <p>
                      Completed: {new Date(currentStatus.completed_at).toLocaleString('vi-VN')}
                    </p>
                  )}
                  {currentStatus.processing_time && (
                    <p>
                      Processing time: {(currentStatus.processing_time / 1000).toFixed(2)}s
                    </p>
                  )}
                </div>

                {isPolling && (
                  <div className="flex items-center text-sm text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
                    Monitoring progress...
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Extraction Result Preview */}
        {currentResult && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900 mb-3">
              ✅ Extraction Completed
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="font-medium text-green-800">Confidence:</span>
                  <span className="ml-2 text-green-700">
                    {Math.round((currentResult.confidence || 0) * 100)}%
                  </span>
                </div>
                
                {currentResult.quality_metrics && (
                  <>
                    <div>
                      <span className="font-medium text-green-800">Readability:</span>
                      <span className="ml-2 text-green-700">
                        {currentResult.quality_metrics.readability_score}%
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-green-800">Completeness:</span>
                      <span className="ml-2 text-green-700">
                        {currentResult.quality_metrics.completeness_score}%
                      </span>
                    </div>
                  </>
                )}
              </div>

              {currentResult.text && (
                <div>
                  <div className="font-medium text-green-800 mb-2">Extracted Text Preview:</div>
                  <div className="bg-white p-3 rounded border max-h-32 overflow-y-auto text-gray-700 text-xs">
                    {currentResult.text.substring(0, 500)}
                    {currentResult.text.length > 500 && '...'}
                  </div>
                </div>
              )}

              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => onExtractionComplete?.(currentResult)}
                  className={designSystem.buttons.success}
                >
                  📄 View Full Result
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 Usage Tips</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Make sure the file exists in the S3 bucket before extraction</p>
            <p>• Use "Force re-extraction" to re-process already extracted files</p>
            <p>• "Extract & Wait" blocks until completion, "Submit" runs in background</p>
            <p>• Supported formats: PDF, DOC, DOCX, images (PNG, JPG)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractionInterface;
