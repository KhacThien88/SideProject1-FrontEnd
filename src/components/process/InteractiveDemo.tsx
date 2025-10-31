import React, { useState } from 'react';
import { Upload, Brain, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export const InteractiveDemo: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      icon: Upload,
      title: t.interactiveDemo?.step1?.title || 'Upload Your CV',
      description: t.interactiveDemo?.step1?.description || 'Drag and drop your CV or click to browse',
      color: 'primary',
      demo: (
        <div className="w-full h-48 border-2 border-dashed border-primary-300 bg-primary-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <Upload className="w-12 h-12 text-primary-600 mx-auto mb-3" />
            <p className="text-neutral-700 font-medium">Click to upload CV</p>
            <p className="text-sm text-neutral-500">PDF, DOC, DOCX up to 10MB</p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      icon: Brain,
      title: t.interactiveDemo?.step2?.title || 'AI Analysis',
      description: t.interactiveDemo?.step2?.description || 'Our AI analyzes your skills and experience',
      color: 'secondary',
      demo: (
        <div className="w-full p-6 bg-secondary-50 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-secondary-200 animate-pulse" />
            <div className="flex-1 h-3 bg-secondary-200 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-secondary-200 rounded w-full animate-pulse" />
            <div className="h-2 bg-secondary-200 rounded w-5/6 animate-pulse" />
            <div className="h-2 bg-secondary-200 rounded w-4/6 animate-pulse" />
          </div>
          <p className="text-center mt-4 text-sm text-secondary-700 font-medium">
            Analyzing... 85%
          </p>
        </div>
      ),
    },
    {
      id: 3,
      icon: Target,
      title: t.interactiveDemo?.step3?.title || 'Smart Matching',
      description: t.interactiveDemo?.step3?.description || 'Get matched with relevant job opportunities',
      color: 'accent',
      demo: (
        <div className="w-full space-y-3">
          {[95, 88, 82].map((match, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-lg border-2 border-accent-200 hover:border-accent-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-neutral-900">Senior Developer</h4>
                  <p className="text-sm text-neutral-600">Tech Company Inc</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent-600">{match}%</div>
                  <p className="text-xs text-neutral-500">match</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 4,
      icon: CheckCircle,
      title: t.interactiveDemo?.step4?.title || 'Apply & Success',
      description: t.interactiveDemo?.step4?.description || 'Apply to jobs with one click',
      color: 'success',
      demo: (
        <div className="w-full p-8 bg-gradient-to-br from-secondary-50 to-primary-50 rounded-xl text-center">
          <CheckCircle className="w-16 h-16 text-secondary-600 mx-auto mb-4" />
          <h4 className="text-2xl font-bold text-neutral-900 mb-2">You're All Set!</h4>
          <p className="text-neutral-700 mb-4">
            Your profile is ready. Start applying to jobs now.
          </p>
          <button className="px-6 py-3 bg-secondary-600 text-white font-semibold rounded-lg hover:bg-secondary-700 transition-colors">
            View Matched Jobs
          </button>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="w-full max-w-6xl mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          {t.interactiveDemo?.title || 'See How It Works'}
        </h2>
        <p className="text-lg text-neutral-600">
          {t.interactiveDemo?.subtitle || 'Interactive demonstration of our platform'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Steps Navigation */}
        <div className="space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all text-left
                  ${
                    isActive
                      ? 'border-primary-500 bg-primary-50 shadow-lg'
                      : isCompleted
                      ? 'border-secondary-300 bg-secondary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                    ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : isCompleted
                        ? 'bg-secondary-600 text-white'
                        : 'bg-neutral-200 text-neutral-600'
                    }
                  `}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-bold mb-1 ${isActive ? 'text-primary-900' : 'text-neutral-900'}`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-600">{step.description}</p>
                  </div>
                  {isActive && <ArrowRight className="w-5 h-5 text-primary-600 flex-shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Demo Area */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              {React.createElement(currentStepData.icon, {
                className: 'w-8 h-8 text-primary-600',
              })}
              <h3 className="text-2xl font-bold text-neutral-900">{currentStepData.title}</h3>
            </div>
            <p className="text-neutral-600">{currentStepData.description}</p>
          </div>

          <div className="animate-fadeIn">{currentStepData.demo}</div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.interactiveDemo?.previous || 'Previous'}
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              disabled={currentStep === 4}
              className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {currentStep === 4
                ? t.interactiveDemo?.finish || 'Finish'
                : t.interactiveDemo?.next || 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
