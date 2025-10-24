import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { FileText, Download, Eye, X, CheckCircle } from 'lucide-react';
import type { DetailedAnalysisResult } from '../../types/cvAnalysis';
import { useTranslation } from '../../hooks/useTranslation';

interface AnalysisResultsSectionProps {
  analysisResults: DetailedAnalysisResult[];
  selectedJobPosition: string;
}

export const AnalysisResultsSection: React.FC<AnalysisResultsSectionProps> = ({
  analysisResults,
  selectedJobPosition
}) => {
  const { getContent } = useTranslation();
  
  if (analysisResults.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-neutral-900">{getContent('cvAnalysis.results.title')}</div>
        <Button
          variant="tertiary"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>{getContent('cvAnalysis.results.exportResults')}</span>
        </Button>
      </div>
      
      {analysisResults.map((result) => (
        <Card key={result.id} className="overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-neutral-900">{result.fileName}</div>
                  <div className="text-sm text-neutral-600">{getContent('cvAnalysis.results.analyzedOn')} {result.analyzedDate}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-3xl font-bold text-warning-600">{result.overallScore || 0}%</div>
                  <div className="text-sm text-warning-600 font-medium">
                    {(result.overallScore || 0) >= 80 ? getContent('cvAnalysis.results.good') : 
                     (result.overallScore || 0) >= 70 ? getContent('cvAnalysis.results.fair') : 
                     (result.overallScore || 0) >= 60 ? getContent('cvAnalysis.results.average') : getContent('cvAnalysis.results.needsImprovement')}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 text-neutral-400 hover:text-primary-500 rounded transition-all duration-200 hover:bg-primary-50"
                    title={getContent('cvAnalysis.results.previewCV')}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-neutral-400 hover:text-success-500 rounded transition-all duration-200 hover:bg-success-50"
                    title={getContent('cvAnalysis.results.downloadReport')}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-neutral-400 hover:text-red-500 rounded transition-all duration-200 hover:bg-red-50"
                    title={getContent('cvAnalysis.results.removeResult')}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-6 border-b border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-sm font-medium text-neutral-500 mb-1">{getContent('cvAnalysis.results.name')}</div>
                <div className="text-neutral-900 font-medium">{result.contactInfo?.name || 'N/A'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-500 mb-1">{getContent('cvAnalysis.results.email')}</div>
                <div className="text-neutral-900">{result.contactInfo?.email || 'N/A'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-500 mb-1">{getContent('cvAnalysis.results.phone')}</div>
                <div className="text-neutral-900">{result.contactInfo?.phone || 'N/A'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-500 mb-1">{getContent('cvAnalysis.results.location')}</div>
                <div className="text-neutral-900">{result.contactInfo?.location || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="p-6 border-b border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: getContent('cvAnalysis.results.skillsMatch'), value: result.skillsMatch, color: 'from-blue-500 to-cyan-500' },
                { label: getContent('cvAnalysis.results.experience'), value: result.experience, color: 'from-orange-500 to-yellow-500' },
                { label: getContent('cvAnalysis.results.education'), value: result.education, color: 'from-green-500 to-emerald-500' },
                { label: getContent('cvAnalysis.results.keywords'), value: result.keywords, color: 'from-purple-500 to-pink-500' }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-neutral-700">{item.label}</div>
                    <CheckCircle className="w-4 h-4 text-success-500" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-xl font-bold text-neutral-900">{item.value}%</div>
                    <div className="flex-1">
                      <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detected Skills */}
          <div className="p-6 border-b border-neutral-200">
            <div className="text-lg font-semibold text-neutral-900 mb-4">{getContent('cvAnalysis.results.detectedSkills')}</div>
            <div className="flex flex-wrap gap-3">
              {(result.detectedSkills || []).map((skill, index) => (
                <div key={index} className="bg-neutral-100 hover:bg-primary-50 transition-colors duration-200 rounded-lg px-3 py-2 flex items-center space-x-2">
                  <span className="font-medium text-neutral-800">{skill.name}</span>
                  <span className="text-xs text-neutral-500 bg-neutral-200 px-2 py-1 rounded-full">
                    {skill.confidence}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Job Match Analysis */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-lg font-semibold text-neutral-900 mb-3">{getContent('cvAnalysis.results.matchPercentage')}</div>
                <div className="text-4xl font-bold text-warning-600 mb-2">
                  {result.jobMatchAnalysis?.matchPercentage || 0}%
                </div>
                <div className="text-sm text-neutral-600">
                  {getContent('cvAnalysis.results.matchWith')} <span className="font-medium text-primary-600">{selectedJobPosition}</span>
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-neutral-900 mb-3">{getContent('cvAnalysis.results.recommendations')}</div>
                <ul className="space-y-2">
                  {(result.jobMatchAnalysis?.recommendations || []).map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-neutral-700">
                      <span className="text-primary-500 mt-1 flex-shrink-0">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};