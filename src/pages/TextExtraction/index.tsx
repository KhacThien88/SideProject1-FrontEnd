import React, { useState, useCallback } from 'react';
import { ExtractionInterface } from '../../components/textract/ExtractionInterface';
import { ExtractionHistory } from '../../components/textract/ExtractionHistory';
import { ExtractionResultViewer } from '../../components/textract/ExtractionResultViewer';
import type { ExtractionResultResponse } from '../../services/api';
import { useErrorHandler } from '../../components/shared/ErrorMessage';
import { ErrorMessage } from '../../components/shared/ErrorMessage';

export const TextExtractionPage: React.FC = () => {
  const { error, handleError, clearError } = useErrorHandler();
  
  const [selectedExtractionId, setSelectedExtractionId] = useState<string | null>(null);
  const [viewingResult, setViewingResult] = useState<ExtractionResultResponse | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeView, setActiveView] = useState<'interface' | 'history' | 'result'>('interface');

  const handleExtractionComplete = useCallback((result: ExtractionResultResponse) => {
    setViewingResult(result);
    setSelectedExtractionId(result.extraction_id);
    setActiveView('result');
    
    // Refresh history to show the new extraction
    setRefreshTrigger(prev => prev + 1);
    
    console.log('Extraction completed:', result);
  }, []);

  const handleExtractionError = useCallback((error: string) => {
    handleError(new Error(error));
  }, [handleError]);

  const handleSelectExtraction = useCallback((extractionId: string) => {
    setSelectedExtractionId(extractionId);
    setViewingResult(null); // Clear previous result
  }, []);

  const handleViewResult = useCallback((extractionId: string) => {
    setSelectedExtractionId(extractionId);
    setActiveView('result');
    setViewingResult(null); // Will be loaded by the viewer component
  }, []);

  const views = [
    { id: 'interface', label: 'Extract Text', icon: '🚀' },
    { id: 'history', label: 'History', icon: '📋' },
    { id: 'result', label: 'Results', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📝 Text Extraction System
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Extract and analyze text from documents using AI-powered OCR and processing
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex space-x-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">AWS</div>
                <div className="text-xs text-gray-500">Textract</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">AI</div>
                <div className="text-xs text-gray-500">Powered</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">OCR</div>
                <div className="text-xs text-gray-500">Engine</div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Error */}
        {error && (
          <div className="mb-6">
            <ErrorMessage
              error={error}
              dismissAction={clearError}
              variant="banner"
            />
          </div>
        )}

        {/* View Selector */}
        <div className="bg-white rounded-lg border shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id as any)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeView === view.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="mr-2">{view.icon}</span>
                  {view.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Interface Tab */}
            {activeView === 'interface' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Start Text Extraction
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Enter the S3 path of your document to extract text using AWS Textract
                  </p>
                </div>

                <ExtractionInterface
                  onExtractionComplete={handleExtractionComplete}
                  onExtractionError={handleExtractionError}
                />

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <button
                    onClick={() => setActiveView('history')}
                    className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
                  >
                    <div className="text-2xl mb-2">📋</div>
                    <div className="font-medium text-gray-900">View History</div>
                    <div className="text-sm text-gray-500">See past extractions</div>
                  </button>
                  
                  <button
                    onClick={() => window.open('/admin/textract', '_blank')}
                    className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
                  >
                    <div className="text-2xl mb-2">⚙️</div>
                    <div className="font-medium text-gray-900">Admin Panel</div>
                    <div className="text-sm text-gray-500">Manage system</div>
                  </button>
                  
                  <button
                    onClick={() => window.open('/docs/textract', '_blank')}
                    className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
                  >
                    <div className="text-2xl mb-2">📖</div>
                    <div className="font-medium text-gray-900">Documentation</div>
                    <div className="text-sm text-gray-500">Learn more</div>
                  </button>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeView === 'history' && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Extraction History
                  </h2>
                  <p className="text-gray-600">
                    Browse and manage your previous text extraction jobs
                  </p>
                </div>

                <ExtractionHistory
                  onSelectExtraction={handleSelectExtraction}
                  onViewResult={handleViewResult}
                  refreshTrigger={refreshTrigger}
                />
              </div>
            )}

            {/* Result Tab */}
            {activeView === 'result' && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Extraction Results
                  </h2>
                  <p className="text-gray-600">
                    View and analyze extracted text and metadata
                  </p>
                  {selectedExtractionId && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        ID: {selectedExtractionId}
                      </span>
                    </div>
                  )}
                </div>

                <ExtractionResultViewer
                  extractionId={selectedExtractionId || undefined}
                  result={viewingResult || undefined}
                />
              </div>
            )}
          </div>
        </div>

        {/* System Information */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            💡 System Capabilities
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">📄 Supported Formats</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• PDF documents</li>
                <li>• Images (PNG, JPG)</li>
                <li>• DOC/DOCX files</li>
                <li>• Scanned documents</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-800 mb-2">🔍 OCR Features</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Text recognition</li>
                <li>• Table extraction</li>
                <li>• Form detection</li>
                <li>• Multi-language support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-800 mb-2">📊 Quality Metrics</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Confidence scoring</li>
                <li>• Readability analysis</li>
                <li>• Completeness check</li>
                <li>• Performance tracking</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-800 mb-2">🔄 Processing</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Real-time monitoring</li>
                <li>• Structured output</li>
                <li>• Error handling</li>
                <li>• Retry mechanisms</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 rounded border-l-4 border-blue-500">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-blue-600 text-lg">ℹ️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> For best results, ensure your documents are clear and well-formatted. 
                  The system works best with high-resolution images and clean PDF files.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextExtractionPage;
