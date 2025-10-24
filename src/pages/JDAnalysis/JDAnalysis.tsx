/**
 * JD Analysis Page
 * Job Description upload, AI analysis, and CV matching page for recruiters
 * Reuses upload components from CVAnalysis, adds JD-specific results display
 */

import React, { useState } from 'react';
import { useRouter } from '../../components/Router';
import { ArrowLeft, FileText, Users } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import { Layout } from '../../components/common/Layout';
import { Container } from '../../components/common/Container';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import Footer from '../../components/layout/Footer';
import { StepIndicator } from '../../components/common/StepIndicator';
import jdUploadService from '../../services/api/jd/jdUploadService';
import jdAnalysisService from '../../services/api/jd/jdAnalysisService';
import JDMatchingService from '../../services/api/jd/jdMatchingService';
import type { 
  UploadedJD, 
  JDAnalysisProgress, 
  DetailedJDAnalysisResult,
  CVMatchResult 
} from '../../types/jdAnalysis';
import type { JDCVMatch, JDMatchesResponse } from '../../types/jdMatching';

// Reuse upload components from CVAnalysis (temporarily simplified)
const JDAnalysis: React.FC = () => {
  const { navigate } = useRouter();
  const { showSuccessToast, showErrorToast, showInfoToast } = useToast();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedJD[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState<JDAnalysisProgress | null>(null);
  const [analysisResults, setAnalysisResults] = useState<DetailedJDAnalysisResult[]>([]);
  const [savedMatches, setSavedMatches] = useState<Record<string, JDCVMatch[]>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 'upload', title: 'Upload JD', description: 'Tải file lên' },
    { id: 'analyze', title: 'AI Analysis', description: 'Phân tích JD' },
    { id: 'match', title: 'CV Matching', description: 'Tìm ứng viên' },
    { id: 'results', title: 'View Results', description: 'Xem kết quả' }
  ];

  const handleBack = () => {
    navigate('/dashboard/job-postings');
  };

  // Load saved matches for a JD
  const loadSavedMatches = async (jdId: string) => {
    try {
      const response = await JDMatchingService.getMatchedCandidatesForJD(jdId);
      if (response.success) {
        setSavedMatches(prev => ({
          ...prev,
          [jdId]: response.matches
        }));
      }
    } catch (error) {
      console.error('Failed to load saved matches:', error);
    }
  };

  // Drag & Drop Handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    console.log('📁 Processing file:', file.name, file.type, `${(file.size / 1024 / 1024).toFixed(2)} MB`);
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      showErrorToast('Loại file không hợp lệ. Vui lòng tải lên file PDF, JPG hoặc PNG.');
      console.error('❌ Invalid file type:', file.type);
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      showErrorToast('Kích thước file vượt quá giới hạn 10MB.');
      console.error('❌ File too large:', file.size);
      return;
    }

    const fileId = `jd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('🆔 Generated file ID:', fileId);
    
    const newFile: UploadedJD = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0
    };

    setUploadedFiles(prev => [...prev, newFile]);
    setCurrentStep(1); // Upload step

    try {
      console.log('📤 Starting upload...');
      
      // Upload file
      const response = await jdUploadService.uploadJD(file, (progress) => {
        console.log(`📊 Upload progress: ${progress}%`);
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      });

      console.log('✅ Upload response:', response);

      if (response.is_duplicate) {
        showInfoToast(`${file.name} - JD đã tồn tại (${response.match_type} match)`);
      } else {
        showSuccessToast(`Tải lên ${file.name} thành công!`);
      }

      const completedFile = {
        ...newFile,
        id: response.file_id || fileId, // Use server's file_id if available
        status: 'completed' as const,
        progress: 100,
        url: response.file_url,
        uploadedAt: response.upload_timestamp,
        isDuplicate: response.is_duplicate,
        matchType: (response.match_type as 'hash' | 'filename' | undefined)
      };

      console.log('✅ File completed:', completedFile);
      
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId ? completedFile : f
      ));

      setCurrentStep(2); // Move to analysis step

    } catch (error: any) {
      console.error('❌ Upload failed:', error);
      showErrorToast(error.message || 'Tải lên thất bại. Vui lòng thử lại.');
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, status: 'failed', error: error.message } : f
      ));
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    processFile(files[0]);
  };

  const startAnalysis = async () => {
    console.log('🎯 Starting analysis...', { uploadedFiles });
    const completedFiles = uploadedFiles.filter(f => f.status === 'completed');
    console.log('✅ Completed files:', completedFiles);
    
    if (completedFiles.length === 0) {
      showErrorToast('Không có file nào để phân tích. Vui lòng tải file JD lên trước.');
      console.error('❌ No completed files to analyze');
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep(2); // AI Analysis step
    const results: DetailedJDAnalysisResult[] = [];

    try {
      for (let i = 0; i < completedFiles.length; i++) {
        const file = completedFiles[i];

        setAnalysisProgress({
          stage: 'analyze',
          percentage: Math.round((i / completedFiles.length) * 100),
          estimatedTime: (completedFiles.length - i) * 30000, // 30s per JD
          currentFile: file.name
        });

        try {
          const analysisResult = await jdAnalysisService.analyzeJD(
            file.id,
            (stage, percentage) => {
              setAnalysisProgress({
                stage: stage as any,
                percentage,
                currentFile: file.name
              });
            }
          );

          if (analysisResult.is_cached) {
            showInfoToast(`${file.name} - Sử dụng kết quả đã lưu`);
          } else {
            showSuccessToast(`Analysis completed for ${file.name}`);
          }

          results.push({
            ...analysisResult,
            fileName: file.name,
            fileSize: file.size,
            uploadTime: file.uploadedAt || new Date().toISOString()
          });

        } catch (error: any) {
          console.error(`Analysis failed for ${file.name}:`, error);
          showErrorToast(`Analysis failed for ${file.name}: ${error.message}`);
        }
      }

      setAnalysisResults(results);
      setAnalysisProgress({
        stage: 'complete',
        percentage: 100,
        estimatedTime: 0,
        currentFile: `Hoàn thành - ${results.length} file(s)`
      });

      if (results.length > 0) {
        showSuccessToast(`Hoàn thành ${results.length} JD`);
        setCurrentStep(4); // Move to results step
        
        // Load saved matches for each analyzed JD
        for (const result of results) {
          if (result.jd_id) {
            await loadSavedMatches(result.jd_id);
          }
        }
      }

    } catch (error: any) {
      console.error('Analysis process failed:', error);
      showErrorToast(`Analysis process failed: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      <div className="flex min-h-screen">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          
          <main className="flex-1 overflow-auto pb-15">
            <div className="py-8">
              <Container maxWidth="2xl">
                {/* Back Button */}
                <div className="mb-6">
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center text-[#475569] hover:text-[#0F172A] transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Quay lại Tin tuyển dụng</span>
                  </button>
                </div>

                {/* Step Indicator */}
                <div className="mb-10">
                  <StepIndicator steps={steps} currentStep={currentStep} />
                </div>

                {/* Enhanced Upload Card with Drag & Drop */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0F172A] mb-6 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-[#1E40AF]" />
                    Upload Job Description
                  </h2>

                  {/* Drag & Drop Zone */}
                  <div 
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ease-in-out
                      ${isDragging 
                        ? 'border-[#2563EB] bg-[#EFF6FF] scale-[1.02] shadow-md' 
                        : 'border-neutral-300 hover:border-[#2563EB] hover:bg-[#F8FAFC]'
                      }
                    `}
                  >
                    <input
                      type="file"
                      id="jd-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    {/* Icon with animation */}
                    <div className={`transition-all duration-200 ${isDragging ? 'scale-110 animate-pulse' : ''}`}>
                      <FileText className={`w-12 h-12 mx-auto mb-4 transition-colors duration-200 ${isDragging ? 'text-[#2563EB]' : 'text-neutral-400'}`} />
                    </div>
                    
                    {/* Main CTA */}
                    <label
                      htmlFor="jd-upload"
                      className="cursor-pointer inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl text-white bg-[#2563EB] hover:bg-[#2563EB] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                      style={{
                        boxShadow: 'hover' ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none'
                      }}
                    >
                      {isDragging ? '📁 Thả file vào đây' : 'Select JD File'}
                    </label>
                    
                    {/* Instructions */}
                    <p className="mt-4 text-sm text-[#475569]">
                      hoặc kéo thả file vào đây
                    </p>
                    <p className="mt-2 text-xs text-[#475569]">
                      Hỗ trợ định dạng: <span className="font-medium">PDF, JPG, PNG</span> (tối đa 10MB)
                    </p>
                    
                    {/* Tips */}
                    <div className="mt-6 pt-6 border-t border-neutral-200">
                      <p className="text-xs text-[#475569] mb-3 font-medium" style={{ lineHeight: '1.6' }}>
                        💡 Mẹo để AI phân tích chính xác hơn:
                      </p>
                      <ul className="text-xs text-[#475569] space-y-2 text-left max-w-md mx-auto" style={{ lineHeight: '1.6' }}>
                        <li>• File JD rõ ràng, đầy đủ thông tin về vị trí tuyển dụng</li>
                        <li>• Bao gồm: tiêu đề công việc, mô tả chi tiết, yêu cầu kỹ năng, lợi ích</li>
                        <li>• Bạn có thể tải lên JD chụp từ điện thoại hoặc file gốc từ hệ thống HR</li>
                      </ul>
                    </div>
                  </div>

                  {/* Uploaded Files with Enhanced Progress */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {uploadedFiles.map(file => (
                        <div key={file.id} className="p-4 bg-[#F8FAFC] rounded-lg border border-[#CBD5E1] transition-all duration-200">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start flex-1">
                              <span className="text-lg mr-3">📄</span>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-[#0F172A]">{file.name}</p>
                                <p className="text-xs text-[#475569] mt-1">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                                {file.status === 'uploading' && (
                                  <p className="text-xs text-[#475569] mt-1 animate-pulse">
                                    ⏳ Đang phân tích bằng AI...
                                  </p>
                                )}
                                {file.status === 'completed' && (
                                  <p className="text-xs text-secondary-600 mt-1 font-medium">
                                    ✅ Phân tích hoàn tất! Chuyển sang bước 2.
                                  </p>
                                )}
                                {file.status === 'failed' && file.error && (
                                  <p className="text-xs text-red-600 mt-1">
                                    ✗ {file.error}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="ml-4">
                              {file.status === 'uploading' && (
                                <span className="text-xs font-semibold text-[#2563EB]">{file.progress}%</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          {file.status === 'uploading' && (
                            <div className="w-full bg-[#CBD5E1] rounded-full h-1.5 overflow-hidden mt-3">
                              <div 
                                className="bg-[#2563EB] h-1.5 rounded-full transition-all duration-300 ease-in-out"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Analyze Button */}
                  {uploadedFiles.some(f => f.status === 'completed') && !isAnalyzing && (
                    <div className="mt-6 p-4 bg-secondary-50 rounded-xl border border-secondary-200">
                      <p className="text-sm text-secondary-700 mb-3 font-medium">
                        ✅ File đã sẵn sàng để phân tích!
                      </p>
                      <button
                        onClick={startAnalysis}
                        className="w-full px-6 py-3 text-sm font-medium rounded-xl text-white bg-secondary-600 hover:bg-secondary-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                      >
                        <Users className="w-5 h-5 mr-2" />
                        Phân Tích & Ghép CV
                      </button>
                    </div>
                  )}
                </div>

                {/* Analysis Progress */}
                {analysisProgress && (
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Analysis Progress</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">{analysisProgress.stage}</span>
                        <span className="text-primary-600 font-medium">{analysisProgress.percentage}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${analysisProgress.percentage}%` }}
                        />
                      </div>
                      {analysisProgress.currentFile && (
                        <p className="text-sm text-neutral-600">{analysisProgress.currentFile}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Results */}
                {analysisResults.length > 0 && (
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-6">Analysis Results</h3>
                    <div className="space-y-8">
                      {analysisResults.map((result, idx) => (
                        <div key={idx} className="border-b border-neutral-200 pb-8 last:border-b-0 last:pb-0">
                          <h4 className="font-medium text-neutral-900 mb-4">{result.fileName}</h4>
                          
                          {result.structured_data && (
                            <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <p className="text-xs text-neutral-500 mb-1">Job Title</p>
                                  <p className="text-sm font-medium text-neutral-900">{result.structured_data.job_title}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-neutral-500 mb-1">Company</p>
                                  <p className="text-sm font-medium text-neutral-900">{result.structured_data.company_name}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-neutral-500 mb-1">Required Skills</p>
                                  <p className="text-sm font-medium text-neutral-900">{result.structured_data.required_skills?.join(', ') || 'N/A'}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {result.cv_matches && result.cv_matches.candidates && result.cv_matches.candidates.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-neutral-700 mb-3">
                                Matching CVs ({result.cv_matches.total_candidates})
                              </p>
                              <div className="space-y-3">
                                {result.cv_matches.candidates.slice(0, 5).map((cv: CVMatchResult) => (
                                  <div key={cv.id || cv.candidate_id} className="p-4 bg-secondary-50 rounded-xl border border-secondary-200 hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex-1">
                                        <p className="text-sm font-semibold text-neutral-900">
                                          {cv.candidate_name || 'Unknown Candidate'}
                                        </p>
                                        {cv.current_role && (
                                          <p className="text-xs text-neutral-600 mt-1">
                                            {cv.current_role}
                                          </p>
                                        )}
                                        <p className="text-xs text-neutral-600 mt-1">
                                          {cv.email || 'No email'} 
                                          {cv.location && ` • ${cv.location}`}
                                          {cv.years_of_experience !== undefined && ` • ${cv.years_of_experience} years exp`}
                                        </p>
                                      </div>
                                      <div className="ml-4 text-right">
                                        <span className="text-lg font-bold text-secondary-600">
                                          {(cv.match_score * 100).toFixed(0)}%
                                        </span>
                                        <p className="text-xs text-neutral-500">Match</p>
                                      </div>
                                    </div>
                                    
                                    {cv.skills && cv.skills.length > 0 && (
                                      <div className="mt-3 pt-3 border-t border-secondary-200">
                                        <p className="text-xs text-neutral-500 mb-2">Skills:</p>
                                        <div className="flex flex-wrap gap-1">
                                          {cv.skills.slice(0, 8).map((skill, idx) => (
                                            <span 
                                              key={idx}
                                              className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-md"
                                            >
                                              {skill}
                                            </span>
                                          ))}
                                          {cv.skills.length > 8 && (
                                            <span className="text-xs px-2 py-1 text-neutral-600">
                                              +{cv.skills.length - 8} more
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Saved Matches Section */}
                          {result.jd_id && savedMatches[result.jd_id] && savedMatches[result.jd_id].length > 0 && (
                            <div className="mt-6">
                              <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-neutral-700">
                                  Saved Matches ({savedMatches[result.jd_id].length})
                                </p>
                                <button
                                  onClick={() => loadSavedMatches(result.jd_id!)}
                                  className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                                >
                                  Refresh
                                </button>
                              </div>
                              <div className="space-y-3">
                                {savedMatches[result.jd_id].slice(0, 10).map((match: JDCVMatch) => (
                                  <div key={match.match_id} className="p-4 bg-green-50 rounded-xl border border-green-200 hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex-1">
                                        <p className="text-sm font-semibold text-neutral-900">
                                          Match ID: {match.match_id.substring(0, 8)}...
                                        </p>
                                        <p className="text-xs text-neutral-600 mt-1">
                                          Candidate ID: {match.candidate_id}
                                        </p>
                                        <p className="text-xs text-neutral-600 mt-1">
                                          Matched at: {new Date(match.matched_at).toLocaleString()}
                                        </p>
                                        {match.matched_skills && match.matched_skills.length > 0 && (
                                          <div className="mt-2">
                                            <p className="text-xs text-neutral-500 mb-1">Matched Skills:</p>
                                            <div className="flex flex-wrap gap-1">
                                              {match.matched_skills.slice(0, 5).map((skill, idx) => (
                                                <span 
                                                  key={idx}
                                                  className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md"
                                                >
                                                  {skill}
                                                </span>
                                              ))}
                                              {match.matched_skills.length > 5 && (
                                                <span className="text-xs px-2 py-1 text-neutral-600">
                                                  +{match.matched_skills.length - 5} more
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="ml-4 text-right">
                                        <span className="text-lg font-bold text-green-600">
                                          {(match.match_score * 100).toFixed(0)}%
                                        </span>
                                        <p className="text-xs text-neutral-500">Saved</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Container>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default JDAnalysis;

