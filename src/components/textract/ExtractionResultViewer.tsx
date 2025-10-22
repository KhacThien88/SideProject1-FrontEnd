import React, { useState, useEffect } from 'react';
import { useTextract } from '../../hooks/api/useTextract';
import type { ExtractionResultResponse } from '../../services/api';
import { ErrorMessage } from '../shared/ErrorMessage';
import { StatusDisplay } from '../shared/StatusDisplay';

export interface ExtractionResultViewerProps {
  extractionId?: string;
  result?: ExtractionResultResponse;
  className?: string;
}

export const ExtractionResultViewer: React.FC<ExtractionResultViewerProps> = ({
  extractionId,
  result: propResult,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'sections' | 'structured' | 'metrics'>('text');
  const [showFullText, setShowFullText] = useState(false);
  
  const {
    getExtractionResult,
    currentResult,
    isGettingResult,
    resultError,
  } = useTextract();

  // Load result if extractionId is provided but no result
  useEffect(() => {
    if (extractionId && !propResult) {
      getExtractionResult(extractionId);
    }
  }, [extractionId, propResult, getExtractionResult]);

  const result = propResult || currentResult;

  if (resultError) {
    return (
      <div className={className}>
        <ErrorMessage
          error={resultError}
          type="server"
          retryAction={extractionId ? () => getExtractionResult(extractionId) : undefined}
        />
      </div>
    );
  }

  if (isGettingResult && !result) {
    return (
      <div className={`bg-white rounded-lg border shadow-sm p-8 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading extraction result...</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={`bg-white rounded-lg border shadow-sm p-8 ${className}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No result to display
          </h3>
          <p className="text-gray-500">
            Select an extraction from the history to view its result
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'text', label: 'Raw Text', icon: '📝' },
    { id: 'sections', label: 'Sections', icon: '📑' },
    { id: 'structured', label: 'Structured Data', icon: '🏗️' },
    { id: 'metrics', label: 'Quality Metrics', icon: '📊' },
  ];

  return (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              📄 Extraction Result
            </h2>
            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
              <span>Extraction ID: {result.extraction_id}</span>
              <span>•</span>
              <span>Confidence: {Math.round((result.confidence || 0) * 100)}%</span>
              <span>•</span>
              <span>{new Date(result.extraction_timestamp).toLocaleString('vi-VN')}</span>
            </div>
          </div>
          
          <StatusDisplay
            status="completed"
            variant="badge"
            size="sm"
          />
        </div>

        {/* Quality Metrics Summary */}
        {result.quality_metrics && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {result.quality_metrics.readability_score}%
              </div>
              <div className="text-xs text-gray-500">Readability</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">
                {result.quality_metrics.confidence_score}%
              </div>
              <div className="text-xs text-gray-500">Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600">
                {result.quality_metrics.completeness_score}%
              </div>
              <div className="text-xs text-gray-500">Completeness</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-purple-600">
                {((result.processing_time || 0) / 1000).toFixed(1)}s
              </div>
              <div className="text-xs text-gray-500">Processing</div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Raw Text Tab */}
        {activeTab === 'text' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Extracted Text</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {showFullText ? 'Show Preview' : 'Show Full Text'}
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(result.text)}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  📋 Copy
                </button>
              </div>
            </div>
            
            <div className={`
              bg-gray-50 border rounded-lg p-4 overflow-auto text-sm text-gray-700 font-mono
              ${showFullText ? 'max-h-96' : 'max-h-48'}
            `}>
              <pre className="whitespace-pre-wrap">
                {showFullText ? result.text : result.text.substring(0, 1000)}
                {!showFullText && result.text.length > 1000 && '\n\n... (click "Show Full Text" to see more)'}
              </pre>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Text length: {result.text.length} characters
            </div>
          </div>
        )}

        {/* Sections Tab */}
        {activeTab === 'sections' && (
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Document Sections</h3>
            
            {result.sections ? (
              <div className="space-y-4">
                {Object.entries(result.sections).map(([sectionName, sectionText]) => (
                  <div key={sectionName} className="border rounded-lg">
                    <div className="px-4 py-2 bg-gray-50 border-b">
                      <h4 className="font-medium text-gray-900 capitalize">
                        {sectionName.replace(/_/g, ' ')}
                      </h4>
                    </div>
                    <div className="p-4">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700">
                        {sectionText}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No section data available
              </div>
            )}
          </div>
        )}

        {/* Structured Data Tab */}
        {activeTab === 'structured' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Structured Information</h3>
              {result.structured_json_s3_key && (
                <button
                  onClick={() => window.open(result.structured_json_s3_key, '_blank')}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  📂 Download JSON
                </button>
              )}
            </div>

            {result.key_information || result.structured_json ? (
              <div className="space-y-6">
                {/* Key Information */}
                {result.key_information && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Key Information</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <pre className="text-sm text-blue-800 overflow-auto">
                        {JSON.stringify(result.key_information, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Structured JSON */}
                {result.structured_json && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Structured JSON</h4>
                    <div className="bg-gray-50 border rounded-lg p-4">
                      <pre className="text-sm text-gray-700 overflow-auto max-h-64">
                        {JSON.stringify(result.structured_json, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No structured data available
              </div>
            )}
          </div>
        )}

        {/* Quality Metrics Tab */}
        {activeTab === 'metrics' && (
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Quality Assessment</h3>
            
            {result.quality_metrics ? (
              <div className="space-y-6">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Readability Score</span>
                        <span className="text-sm text-gray-600">
                          {result.quality_metrics.readability_score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${result.quality_metrics.readability_score}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Confidence Score</span>
                        <span className="text-sm text-gray-600">
                          {result.quality_metrics.confidence_score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${result.quality_metrics.confidence_score}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Completeness Score</span>
                        <span className="text-sm text-gray-600">
                          {result.quality_metrics.completeness_score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: `${result.quality_metrics.completeness_score}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Overall Confidence</span>
                        <span className="text-sm text-gray-600">
                          {Math.round((result.confidence || 0) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${Math.round((result.confidence || 0) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Performance Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {((result.processing_time || 0) / 1000).toFixed(2)}s
                      </div>
                      <div className="text-xs text-gray-500">Processing Time</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {result.text.length}
                      </div>
                      <div className="text-xs text-gray-500">Characters</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {result.text.split(/\s+/).length}
                      </div>
                      <div className="text-xs text-gray-500">Words</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {result.text.split('\n').length}
                      </div>
                      <div className="text-xs text-gray-500">Lines</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No quality metrics available
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between">
          <div className="text-sm text-gray-500">
            Extraction completed at {new Date(result.extraction_timestamp).toLocaleString('vi-VN')}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => {
                const dataStr = JSON.stringify(result, null, 2);
                const blob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `extraction-${result.extraction_id}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              💾 Download JSON
            </button>
            
            <button
              onClick={() => navigator.clipboard.writeText(result.text)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              📋 Copy Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractionResultViewer;
