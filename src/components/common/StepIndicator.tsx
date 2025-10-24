import React from 'react';
import { Check } from 'lucide-react';

export interface Step {
  id: string;
  title: string;
  description?: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div className="flex flex-col items-center flex-1">
                {/* Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ease-in-out
                    ${isCompleted ? 'bg-secondary-600 text-white' : ''}
                    ${isCurrent ? 'bg-[#2563EB] text-white scale-110 shadow-lg ring-4 ring-blue-100' : ''}
                    ${isPending ? 'bg-[#E2E8F0] text-[#475569]' : ''}
                  `}
                  style={isCurrent ? { transform: 'scale(1.1)' } : {}}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 animate-scale-in" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>

                {/* Label */}
                <div className="mt-3 text-center">
                  <p
                    className={`text-xs transition-all duration-200 ${
                      isCurrent ? 'font-semibold text-[#2563EB]' : 
                      isCompleted ? 'font-medium text-secondary-600' : 
                      'font-normal text-[#475569]'
                    }`}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className={`text-xs mt-1 transition-opacity duration-200 ${
                      isCurrent ? 'text-[#475569] opacity-100' : 'text-neutral-400 opacity-70'
                    }`} style={{ lineHeight: '1.6' }}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-3 mb-8">
                  <div className="h-0.5 bg-[#CBD5E1] relative overflow-hidden rounded-full">
                    <div
                      className={`h-full transition-all duration-500 ease-in-out rounded-full ${
                        stepNumber < currentStep ? 'bg-secondary-600 w-full' : 'bg-transparent w-0'
                      }`}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;

