import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { MoreHorizontal, Mail, Phone, Eye, UserCheck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface Candidate {
  id: string;
  name: string;
  position: string;
  appliedAt: string;
  status: 'new' | 'reviewing' | 'interviewed' | 'rejected' | 'hired';
  matchScore?: number;
  avatar?: string;
}

export const RecentCandidates: React.FC = () => {
  const { t } = useTranslation();

  const recentCandidates: Candidate[] = [
    {
      id: '1',
      name: 'Nguyễn Văn An',
      position: 'Senior Frontend Developer',
      appliedAt: '5 phút trước',
      status: 'new',
      matchScore: 92
    },
    {
      id: '2',
      name: 'Trần Thị Bình',
      position: 'Full Stack Developer',
      appliedAt: '1 giờ trước',
      status: 'reviewing',
      matchScore: 88
    },
    {
      id: '3',
      name: 'Lê Minh Cường',
      position: 'Backend Developer',
      appliedAt: '3 giờ trước',
      status: 'interviewed',
      matchScore: 85
    },
    {
      id: '4',
      name: 'Phạm Thu Dung',
      position: 'UI/UX Designer',
      appliedAt: '5 giờ trước',
      status: 'hired',
      matchScore: 95
    },
    {
      id: '5',
      name: 'Hoàng Văn Em',
      position: 'DevOps Engineer',
      appliedAt: '1 ngày trước',
      status: 'reviewing',
      matchScore: 79
    }
  ];

  const getStatusIcon = (status: Candidate['status']) => {
    switch (status) {
      case 'new':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'reviewing':
        return <Eye className="w-4 h-4 text-yellow-500" />;
      case 'interviewed':
        return <UserCheck className="w-4 h-4 text-purple-500" />;
      case 'hired':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: Candidate['status']) => {
    switch (status) {
      case 'new':
        return t.dashboard.recentCandidates.status?.new ?? 'Mới';
      case 'reviewing':
        return t.dashboard.recentCandidates.status?.reviewing ?? 'Đang xem xét';
      case 'interviewed':
        return t.dashboard.recentCandidates.status?.interviewed ?? 'Đã phỏng vấn';
      case 'hired':
        return t.dashboard.recentCandidates.status?.hired ?? 'Đã tuyển';
      case 'rejected':
        return t.dashboard.recentCandidates.status?.rejected ?? 'Từ chối';
    }
  };

  const getStatusBadgeClass = (status: Candidate['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'reviewing':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'interviewed':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'hired':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 font-semibold';
    if (score >= 75) return 'text-blue-600 font-semibold';
    if (score >= 60) return 'text-yellow-600 font-semibold';
    return 'text-gray-600';
  };

  return (
    <Card variant="default" hover={true} className="bg-white backdrop-blur-sm group p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
            <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-base sm:text-lg font-bold text-neutral-900 truncate">{t.dashboard.recentCandidates.title}</div>
            <div className="text-xs sm:text-sm text-neutral-600 truncate">{t.dashboard.recentCandidates.subtitle}</div>
          </div>
        </div>
        <button className="p-2 hover:bg-secondary-50 rounded-xl transition-colors duration-300 group flex-shrink-0">
          <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-secondary-600" />
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {recentCandidates.map((candidate) => (
          <div key={candidate.id} className="p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-start mb-2">
              {/* Avatar */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">
                  {candidate.name.charAt(0)}
                </span>
              </div>
              {/* Name and Position */}
              <div className="ml-3 mb-2 flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">{candidate.name}</div>
                <div className="text-xs text-gray-500 truncate">{candidate.position}</div>
              </div>
              {/* Status Badge */}
              <div className="ml-2 flex-shrink-0">
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusBadgeClass(candidate.status)}`}>
                  {getStatusIcon(candidate.status)}
                  <span className="hidden sm:inline">{getStatusText(candidate.status)}</span>
                </div>
              </div>
            </div>
            {/* Time and Match Score */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs text-gray-500 flex-shrink-0">{candidate.appliedAt}</span>
                {candidate.matchScore && (
                  <>
                    <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                    <span className={`text-xs flex-shrink-0 ${getMatchScoreColor(candidate.matchScore)}`}>
                      {t.dashboard.recentCandidates.match}: {candidate.matchScore}%
                    </span>
                  </>
                )}
              </div>
              {/* Action Buttons */}
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title={t.dashboard.recentCandidates.actions?.viewProfile ?? 'Xem hồ sơ'}>
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button className="p-1.5 sm:p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" title={t.dashboard.recentCandidates.actions?.sendEmail ?? 'Gửi email'}>
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button className="p-1.5 sm:p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors" title={t.dashboard.recentCandidates.actions?.call ?? 'Gọi điện'}>
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-2 pt-4 border-t border-neutral-200/60">
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-brand-sm hover:shadow-brand-md focus-ring"
        >
          {t.dashboard.recentCandidates.viewAll} ({recentCandidates.length + 84} {t.dashboard.recentCandidates.total})
        </Button>
      </div>
    </Card>
  );
};
