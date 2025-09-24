import React from 'react';

interface StepCardProps {
  stepNumber: number;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  title: string;
  description: string;
  details?: string[];
  isActive?: boolean;
  isCompleted?: boolean;
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  icon: Icon,
  title,
  description,
  details = [],
  isActive = false,
  isCompleted = false,
  color = 'primary',
  className = '',
}) => {
  const colorClasses = {
    primary: {
      circle: 'bg-primary-500 text-white',
      border: 'border-primary-200',
      icon: 'text-primary-500',
      hover: 'hover:border-primary-300',
    },
    secondary: {
      circle: 'bg-secondary-500 text-white',
      border: 'border-secondary-200',
      icon: 'text-secondary-500',
      hover: 'hover:border-secondary-300',
    },
    accent: {
      circle: 'bg-accent-500 text-white',
      border: 'border-accent-200',
      icon: 'text-accent-500',
      hover: 'hover:border-accent-300',
    },
  };

  const currentColor = colorClasses[color];

  return (
    <div
      className={`
        relative bg-white rounded-xl border-2 p-6
        transition-all duration-300 ease-out
        hover:shadow-lg hover:-translate-y-1
        ${currentColor.border} ${currentColor.hover}
        ${isActive ? 'ring-2 ring-offset-2 ring-primary-500' : ''}
        ${className}
      `}
    >
      {/* Step Number Circle */}
      <div className="flex items-center mb-4">
        <div
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            font-bold text-lg mr-4
            ${currentColor.circle}
          `}
        >
          {stepNumber}
        </div>
        <div className={`w-8 h-8 ${currentColor.icon}`}>
          <Icon size={32} />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-neutral-900">
          {title}
        </h3>
        
        <p className="text-neutral-600 leading-relaxed">
          {description}
        </p>

        {/* Details List */}
        {details.length > 0 && (
          <ul className="space-y-2 mt-4">
            {details.map((detail, index) => (
              <li key={index} className="flex items-start text-sm text-neutral-500">
                <span className={`w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0 ${currentColor.circle}`} />
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Completion Indicator */}
      {isCompleted && (
        <div className="absolute top-4 right-4">
          <div className={`w-6 h-6 rounded-full ${currentColor.circle} flex items-center justify-center`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};