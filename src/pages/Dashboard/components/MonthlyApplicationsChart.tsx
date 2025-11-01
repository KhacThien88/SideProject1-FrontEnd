import React from 'react';
import { Card } from '../../../components/ui/Card';
import { MoreHorizontal, TrendingUp } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

export const MonthlyApplicationsChart: React.FC = () => {
  const { t } = useTranslation();
  
  // Sample data points for the area chart
  const dataPoints = [
    { month: 'Jan', value: 0 },
    { month: 'Feb', value: 20 },
    { month: 'Mar', value: 35 },
    { month: 'Apr', value: 40 },
    { month: 'May', value: 38 },
    { month: 'Jun', value: 42 }
  ];

  const maxValue = Math.max(...dataPoints.map(d => d.value));
  const width = 400;
  const height = 200;
  const padding = 40;

  // Generate SVG path for the area chart
  const generatePath = () => {
    const pathData = dataPoints.map((point, index) => {
      const x = padding + (index * (width - 2 * padding)) / (dataPoints.length - 1);
      const y = height - padding - ((point.value / maxValue) * (height - 2 * padding));
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    
    // Close the path to create an area
    const lastX = padding + ((dataPoints.length - 1) * (width - 2 * padding)) / (dataPoints.length - 1);
    const bottomPath = `L ${lastX} ${height - padding} L ${padding} ${height - padding} Z`;
    
    return pathData + bottomPath;
  };

  const generateLinePath = () => {
    return dataPoints.map((point, index) => {
      const x = padding + (index * (width - 2 * padding)) / (dataPoints.length - 1);
      const y = height - padding - ((point.value / maxValue) * (height - 2 * padding));
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <Card variant="default" hover={true} className="bg-white backdrop-blur-sm group p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-base sm:text-lg font-bold text-neutral-900 truncate">{t.dashboard.monthlyApplications.title}</div>
            <div className="text-xs sm:text-sm text-neutral-600 truncate">{t.dashboard.monthlyApplications.subtitle}</div>
          </div>
        </div>
        <button className="p-2 hover:bg-primary-50 rounded-xl transition-colors duration-300 group flex-shrink-0">
          <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-primary-600" />
        </button>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 p-2 sm:p-4">
        <svg width={width} height={height} className="w-full h-auto max-h-48 sm:max-h-64" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          
          {/* Y-axis grid lines */}
          {[0, 10, 20, 30, 40].map((value) => {
            const y = height - padding - ((value / maxValue) * (height - 2 * padding));
            return (
              <g key={value}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
                <text
                  x={padding - 10}
                  y={y + 4}
                  fill="#9ca3af"
                  fontSize="12"
                  textAnchor="end"
                >
                  {value}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path
            d={generatePath()}
            fill="url(#areaGradient)"
          />

          {/* Line */}
          <path
            d={generateLinePath()}
            fill="none"
            stroke="rgb(139, 92, 246)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {dataPoints.map((point, index) => {
            const x = padding + (index * (width - 2 * padding)) / (dataPoints.length - 1);
            const y = height - padding - ((point.value / maxValue) * (height - 2 * padding));
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="rgb(139, 92, 246)"
                stroke="white"
                strokeWidth="2"
                className="hover:r-6 transition-all cursor-pointer"
              />
            );
          })}

          {/* X-axis labels */}
          {dataPoints.map((point, index) => {
            const x = padding + (index * (width - 2 * padding)) / (dataPoints.length - 1);
            return (
              <text
                key={index}
                x={x}
                y={height - padding + 20}
                fill="#9ca3af"
                fontSize="12"
                textAnchor="middle"
              >
                {point.month}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mb-2 pt-4 border-t border-neutral-200/60 flex items-center justify-between">
        <span className="text-sm text-neutral-500 font-medium">{t.dashboard.monthlyApplications.trend}</span>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-success-500" />
          <span className="text-sm font-bold text-success-600">+12% {t.dashboard.monthlyApplications.growth}</span>
        </div>
      </div>
    </Card>
  );
};