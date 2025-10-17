import React from 'react';
import { Card } from '../../../components/ui/Card';
import { MoreHorizontal, Award } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface SkillData {
  name: string;
  count: number;
  color: string;
  percentage: number;
}

export const SkillsChart: React.FC = () => {
  const { t } = useTranslation();
  
  const skillsData: SkillData[] = [
    { name: 'Python', count: 2, color: '#8B5CF6', percentage: 35 },
    { name: 'Django', count: 1, color: '#10B981', percentage: 20 },
    { name: 'PostgreSQL', count: 1, color: '#3B82F6', percentage: 20 },
    { name: 'Docker', count: 1, color: '#F59E0B', percentage: 15 },
    { name: 'JavaScript', count: 1, color: '#EF4444', percentage: 10 }
  ];

  const center = 100;
  const radius = 70;
  const strokeWidth = 20;

  // Calculate cumulative percentages for positioning
  let cumulativePercentage = 0;

  const generateDonutSegment = (data: SkillData, index: number) => {
    const startAngle = (cumulativePercentage / 100) * 360 - 90; // Start from top
    const endAngle = startAngle + (data.percentage / 100) * 360;
    
    cumulativePercentage += data.percentage;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const largeArcFlag = data.percentage > 50 ? 1 : 0;

    const x1 = center + radius * Math.cos(startAngleRad);
    const y1 = center + radius * Math.sin(startAngleRad);
    const x2 = center + radius * Math.cos(endAngleRad);
    const y2 = center + radius * Math.sin(endAngleRad);

    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    return (
      <path
        key={index}
        d={pathData}
        fill={data.color}
        className="hover:opacity-80 transition-opacity cursor-pointer"
      />
    );
  };

  // Reset cumulative percentage for segment generation
  cumulativePercentage = 0;

  return (
    <Card variant="default" hover={true} className="bg-white backdrop-blur-sm group p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-base sm:text-xl font-bold text-neutral-900 truncate">{t.dashboard.skillsChart.title}</div>
            <div className="text-xs sm:text-sm text-neutral-600 truncate">{t.dashboard.skillsChart.subtitle}</div>
          </div>
        </div>
        <button className="p-2 hover:bg-secondary-50 rounded-xl transition-colors duration-300 group flex-shrink-0">
          <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-secondary-600" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
        {/* Donut Chart */}
        <div className="relative flex-shrink-0">
          <svg width="160" height="160" className="sm:w-[200px] sm:h-[200px] transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth={strokeWidth}
            />
            
            {/* Skill segments */}
            {skillsData.map((data, index) => generateDonutSegment(data, index))}
            
            {/* Inner circle for donut effect */}
            <circle
              cx={center}
              cy={center}
              r={radius - strokeWidth}
              fill="white"
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">5</div>
              <div className="text-sm text-gray-500">{t.dashboard.skillsChart.skills}</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full lg:ml-6 space-y-2 sm:space-y-3">
          {skillsData.map((skill, index) => (
            <div key={index} className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div 
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: skill.color }}
                />
                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{skill.name}</span>
                <span className="text-xs text-gray-500 flex-shrink-0">({skill.count})</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-900 flex-shrink-0">{skill.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-200/60">
        <div className="text-sm text-neutral-500 font-medium">
          {t.dashboard.skillsChart.description}
        </div>
      </div>
    </Card>
  );
};