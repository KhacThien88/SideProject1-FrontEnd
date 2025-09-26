import React from 'react';
import { StepCard } from './StepCard';

interface TimelineStep {
  step: number;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  title: string;
  description: string;
  details?: string[];
  color: 'primary' | 'secondary' | 'accent';
}

interface TimelineProps {
  steps: TimelineStep[];
  activeStep?: number;
  completedSteps?: number[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  steps,
  activeStep,
  completedSteps = [],
  className = '',
}) => {
  const renderConnector = (index: number) => {
    if (index === steps.length - 1) return null;
    
    const isCompleted = completedSteps.includes(index + 1) && completedSteps.includes(index + 2);
    
    return (
      <div className="hidden lg:flex items-center justify-center px-4">
        {/* Desktop Arrow */}
        <div className="flex items-center">
          <div className={`h-0.5 w-8 ${isCompleted ? 'bg-primary-500' : 'bg-neutral-300'}`} />
          <svg
            className={`w-4 h-4 ml-1 ${isCompleted ? 'text-primary-500' : 'text-neutral-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  };

  const renderMobileConnector = (index: number) => {
    if (index === steps.length - 1) return null;
    
    const isCompleted = completedSteps.includes(index + 1) && completedSteps.includes(index + 2);
    
    return (
      <div className="lg:hidden flex justify-center py-4">
        <svg
          className={`w-6 h-6 ${isCompleted ? 'text-primary-500' : 'text-neutral-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Layout - Horizontal */}
      <div className="hidden lg:block">
        {/* First Row - Steps 1-4 */}
        <div className="flex items-stretch justify-center mb-8">
          {steps.slice(0, 4).map((step, index) => (
            <React.Fragment key={step.step}>
              <div className="flex-1 max-w-xs">
                <StepCard
                  stepNumber={step.step}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  details={step.details}
                  isActive={activeStep === step.step}
                  isCompleted={completedSteps.includes(step.step)}
                  color={step.color}
                />
              </div>
              {renderConnector(index)}
            </React.Fragment>
          ))}
        </div>

        {/* Second Row - Steps 5-6 */}
        {steps.length > 4 && (
          <div className="flex items-stretch justify-center space-x-8">
            {steps.slice(4).map((step, index) => (
              <React.Fragment key={step.step}>
                <div className="flex-1 max-w-xs">
                  <StepCard
                    stepNumber={step.step}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    details={step.details}
                    isActive={activeStep === step.step}
                    isCompleted={completedSteps.includes(step.step)}
                    color={step.color}
                  />
                </div>
                {index < steps.slice(4).length - 1 && renderConnector(index + 4)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Layout - Vertical */}
      <div className="lg:hidden space-y-0">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            <StepCard
              stepNumber={step.step}
              icon={step.icon}
              title={step.title}
              description={step.description}
              details={step.details}
              isActive={activeStep === step.step}
              isCompleted={completedSteps.includes(step.step)}
              color={step.color}
            />
            {renderMobileConnector(index)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};