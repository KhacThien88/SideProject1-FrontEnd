/**
 * JD Upload Options Modal
 * Modal showing 2 options: Manual JD creation or PDF upload
 */

import React from 'react';
import { useRouter } from '../../../components/Router';
import { FileText, Upload, X } from 'lucide-react';

interface JDUploadOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JDUploadOptionsModal: React.FC<JDUploadOptionsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { navigate } = useRouter();

  if (!isOpen) return null;

  const handleManualCreate = () => {
    onClose();
    // Navigate to job postings dashboard and open create modal
    navigate('/dashboard/job-postings');
  };

  const handleUploadPDF = () => {
    onClose();
    // Navigate to JD upload & analysis page
    navigate('/jd-analysis');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Tạo Tin Tuyển Dụng
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Option 1: Manual Input */}
          <button
            onClick={handleManualCreate}
            className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nhập thông tin thủ công
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Điền form chi tiết để tạo tin tuyển dụng
            </p>
          </button>

          {/* Option 2: Upload PDF */}
          <button
            onClick={handleUploadPDF}
            className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <Upload className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload JD từ file
            </h3>
            <p className="text-sm text-gray-600 text-center">
              AI tự động trích xuất thông tin từ file PDF/JPG
            </p>
            <span className="mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              AI Powered
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Chọn phương thức phù hợp để tạo tin tuyển dụng
        </div>
      </div>
    </div>
  );
};

export default JDUploadOptionsModal;

