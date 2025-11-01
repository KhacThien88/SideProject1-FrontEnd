import React, { useState, useCallback } from 'react';
import { FeedbackForm } from '../../components/feedback/FeedbackForm';
import { FeedbackHistory } from '../../components/feedback/FeedbackHistory';
import { FeedbackWidget } from '../../components/feedback/FeedbackWidget';
import type { FeedbackResponse } from '../../services/api';
import { useErrorHandler } from '../../components/shared/ErrorMessage';
import { ErrorMessage } from '../../components/shared/ErrorMessage';

export const FeedbackPage: React.FC = () => {
  const { error, clearError } = useErrorHandler();
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackResponse | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'submit' | 'history' | 'widgets'>('submit');

  const handleFeedbackSubmitSuccess = useCallback((feedbackId: string) => {
    setRefreshTrigger(prev => prev + 1);
    setShowForm(false);
    setActiveTab('history');
    
    console.log('Feedback submitted:', feedbackId);
  }, []);

  const handleSelectFeedback = useCallback((feedback: FeedbackResponse) => {
    setSelectedFeedback(feedback);
  }, []);

  const handleEditFeedback = useCallback((feedbackId: string) => {
    // Navigate to edit form or show modal
    console.log('Edit feedback:', feedbackId);
  }, []);

  const tabs = [
    { id: 'submit', label: 'Submit Feedback', icon: '📝' },
    { id: 'history', label: 'My Feedback', icon: '📋' },
    { id: 'widgets', label: 'Widget Demo', icon: '🎯' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              💬 Feedback Center
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Share your thoughts and help us improve our service
            </p>
            <div className="mt-4 flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-green-500 mr-1">✓</span>
                Quick & Easy
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-1">👥</span>
                Community Driven
              </div>
              <div className="flex items-center">
                <span className="text-purple-500 mr-1">🚀</span>
                Continuous Improvement
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

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg border shadow-sm mb-8">
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

          <div className="p-6">
            {/* Submit Feedback Tab */}
            {activeTab === 'submit' && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Submit Your Feedback
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Your feedback is valuable to us. Whether it's a bug report, feature request, 
                    or just general comments, we want to hear from you.
                  </p>
                </div>

                {/* Quick Feedback Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <div className="text-3xl mb-3">🐛</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Report a Bug</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Found something that's not working correctly?
                    </p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                    >
                      Report Bug
                    </button>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6 text-center">
                    <div className="text-3xl mb-3">💡</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Suggest Feature</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Have an idea to make us better?
                    </p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                    >
                      Suggest Feature
                    </button>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6 text-center">
                    <div className="text-3xl mb-3">💬</div>
                    <h3 className="font-semibold text-gray-900 mb-2">General Feedback</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Share your overall experience with us
                    </p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                    >
                      Share Feedback
                    </button>
                  </div>
                </div>

                {/* Feedback Form */}
                {showForm ? (
                  <FeedbackForm
                    onSubmitSuccess={handleFeedbackSubmitSuccess}
                    onCancel={() => setShowForm(false)}
                    variant="full"
                  />
                ) : (
                  <div className="text-center">
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      📝 Open Feedback Form
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Your Feedback History
                  </h2>
                  <p className="text-gray-600">
                    Track the status of your submitted feedback and see responses from our team
                  </p>
                </div>

                <FeedbackHistory
                  onSelectFeedback={handleSelectFeedback}
                  onEditFeedback={handleEditFeedback}
                  refreshTrigger={refreshTrigger}
                />
              </div>
            )}

            {/* Widgets Demo Tab */}
            {activeTab === 'widgets' && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Feedback Widget Demonstrations
                  </h2>
                  <p className="text-gray-600">
                    See how feedback widgets appear throughout the application
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Inline Widgets */}
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Inline Widgets</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-700">Compact inline widget:</span>
                        <FeedbackWidget
                          featureName="ui_design"
                          position="inline"
                          compact={true}
                        />
                      </div>

                      <div>
                        <span className="text-sm text-gray-700 block mb-2">Full inline widget:</span>
                        <FeedbackWidget
                          featureName="cv_analysis"
                          position="inline"
                          compact={false}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Feedback Examples */}
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Feedback Examples</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Feature-specific feedback</h4>
                        <FeedbackForm variant="quick" featureName="job_matching" />
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Performance feedback</h4>
                        <FeedbackForm variant="quick" featureName="performance" />
                      </div>
                    </div>
                  </div>

                  {/* Usage Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      📋 Widget Implementation Guide
                    </h3>
                    
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-medium text-blue-800">Floating Widgets</h4>
                        <p className="text-blue-700">
                          Add to any page with <code className="bg-blue-100 px-1 rounded">position="bottom-right"</code> 
                          for persistent feedback collection.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-blue-800">Inline Widgets</h4>
                        <p className="text-blue-700">
                          Embed within content using <code className="bg-blue-100 px-1 rounded">position="inline"</code> 
                          for contextual feedback.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-blue-800">Hover Activation</h4>
                        <p className="text-blue-700">
                          Use <code className="bg-blue-100 px-1 rounded">showOnHover={`{true}`}</code> 
                          for non-intrusive feedback collection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Feedback Details */}
        {selectedFeedback && (
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📄 Feedback Details
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(selectedFeedback, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Statistics and Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">Fast</div>
            <div className="text-sm text-gray-600">Quick feedback in under 30 seconds</div>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">Tracked</div>
            <div className="text-sm text-gray-600">All feedback is reviewed and tracked</div>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">Impact</div>
            <div className="text-sm text-gray-600">Your input drives our improvements</div>
          </div>
        </div>
      </div>

      {/* Demo floating widget */}
      <FeedbackWidget
        featureName="feedback_system"
        position="bottom-right"
        showOnHover={false}
      />
    </div>
  );
};

export default FeedbackPage;
