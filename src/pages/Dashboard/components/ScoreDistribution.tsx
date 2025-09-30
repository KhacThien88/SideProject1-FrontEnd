import React from 'react';
import { Card } from '../../../components/ui/Card';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface ScoreRange {
  range: string;
  count: number;
  percentage: number;
  color: string;
}

export const ScoreDistribution: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock data - in real app this would come from API
  const scoreData: ScoreRange[] = [
    { range: '0-40', count: 0, percentage: 0, color: '#EF4444' },
    { range: '41-60', count: 0, percentage: 0, color: '#F59E0B' },
    { range: '61-80', count: 0, percentage: 0, color: '#3B82F6' },
    { range: '81-100', count: 2, percentage: 100, color: '#8B5CF6' }
  ];

  const totalCount = scoreData.reduce((sum, item) => sum + item.count, 0);
  const maxCount = Math.max(...scoreData.map(item => item.count));

  return (
    <Card className="h-full">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-neutral-900">{t.dashboard.scoreDistribution.title}</div>
              <div className="text-sm text-neutral-600">{totalCount} {t.dashboard.scoreDistribution.subtitle}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-success-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+12.5%</span>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-4">
          {/* Y-axis labels and bars */}
          <div className="relative">
            {/* Y-axis */}
            <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-sm text-neutral-500">
              <span>2</span>
              <span>1.5</span>
              <span>1</span>
              <span>0.5</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div className="ml-8 h-64 flex items-end justify-between gap-4 border-l border-b border-neutral-200">
              {scoreData.map((item, index) => {
                const height = maxCount > 0 ? (item.count / maxCount) * 240 : 0; // 240px max height
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    {/* Bar */}
                    <div className="w-full max-w-16 relative group">
                      <div 
                        className="w-full rounded-t-md transition-all duration-500 hover:opacity-80 cursor-pointer"
                        style={{ 
                          height: `${height}px`,
                          backgroundColor: item.color,
                          minHeight: item.count > 0 ? '8px' : '0px'
                        }}
                      />
                      
                      {/* Tooltip on hover */}
                      {item.count > 0 && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          <div className="bg-neutral-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                            {item.count} resume{item.count !== 1 ? 's' : ''} ({item.percentage}%)
                          </div>
                          <div className="w-2 h-2 bg-neutral-800 transform rotate-45 mx-auto -mt-1"></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="ml-8 mt-2 flex justify-between text-sm text-neutral-600">
              {scoreData.map((item, index) => (
                <div key={index} className="flex-1 text-center">
                  {item.range}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="pt-4 border-t border-neutral-200">
          <div className="grid grid-cols-2 gap-4">
            {scoreData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-neutral-600">
                  {item.range}: {item.count} {item.count !== 1 ? t.dashboard.scoreDistribution.legend.resumes : t.dashboard.scoreDistribution.legend.resume}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-neutral-900">
                {scoreData.reduce((sum, item) => sum + (item.count * (parseInt(item.range.split('-')[1] || '100') + parseInt(item.range.split('-')[0])) / 2), 0) / Math.max(totalCount, 1) || 0}
              </div>
              <div className="text-xs text-neutral-600">{t.dashboard.scoreDistribution.averageScore}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success-600">
                {scoreData.filter(item => parseInt(item.range.split('-')[0]) >= 81).reduce((sum, item) => sum + item.count, 0)}
              </div>
              <div className="text-xs text-neutral-600">{t.dashboard.scoreDistribution.highScores}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">{totalCount}</div>
              <div className="text-xs text-neutral-600">{t.dashboard.scoreDistribution.totalAnalyzed}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};