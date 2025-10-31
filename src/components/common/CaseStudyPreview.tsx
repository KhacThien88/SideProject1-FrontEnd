import React from 'react';
import { ArrowRight, TrendingUp, Users, Clock } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { Link } from '../Router';

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }[];
  image?: string;
}

const CaseStudyCard: React.FC<{ caseStudy: CaseStudy }> = ({ caseStudy }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200 hover:shadow-xl transition-shadow group">
      <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center p-6">
            <div className="text-sm font-medium mb-2">{caseStudy.industry}</div>
            <h3 className="text-2xl font-bold">{caseStudy.company}</h3>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-xl font-bold text-neutral-900 mb-3">{caseStudy.title}</h4>

        <div className="space-y-4 mb-6">
          <div>
            <h5 className="text-sm font-semibold text-neutral-700 mb-1">Challenge</h5>
            <p className="text-sm text-neutral-600">{caseStudy.challenge}</p>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-neutral-700 mb-1">Solution</h5>
            <p className="text-sm text-neutral-600">{caseStudy.solution}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-y border-neutral-200 mb-6">
          {caseStudy.results.map((result, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2 text-primary-600">
                {result.icon}
              </div>
              <div className="text-lg font-bold text-neutral-900">{result.value}</div>
              <div className="text-xs text-neutral-600">{result.label}</div>
            </div>
          ))}
        </div>

        <Link
          to="#case-studies"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group-hover:gap-3 transition-all"
        >
          Read Full Case Study
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export const CaseStudyPreview: React.FC = () => {
  const { t } = useTranslation();

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'Scaling Recruitment with AI',
      company: 'TechCorp Vietnam',
      industry: 'Technology',
      challenge: 'Struggled to process 1000+ applications per month manually, leading to delayed hiring.',
      solution: 'Implemented TalentFit AI for automated CV screening and smart candidate matching.',
      results: [
        { icon: <TrendingUp className="w-5 h-5" />, label: 'Efficiency', value: '+70%' },
        { icon: <Clock className="w-5 h-5" />, label: 'Time Saved', value: '15 days' },
        { icon: <Users className="w-5 h-5" />, label: 'Quality', value: '+45%' },
      ],
    },
    {
      id: '2',
      title: 'Improving Candidate Quality',
      company: 'Innovation Hub',
      industry: 'Startup Ecosystem',
      challenge: 'High turnover rate due to poor job-candidate fit, wasting resources.',
      solution: 'Used AI-powered matching to ensure better alignment between candidates and roles.',
      results: [
        { icon: <TrendingUp className="w-5 h-5" />, label: 'Retention', value: '+60%' },
        { icon: <Clock className="w-5 h-5" />, label: 'Cost Saved', value: '40%' },
        { icon: <Users className="w-5 h-5" />, label: 'Satisfaction', value: '95%' },
      ],
    },
    {
      id: '3',
      title: 'Reducing Time-to-Hire',
      company: 'Digital Solutions Ltd',
      industry: 'Digital Marketing',
      challenge: 'Average 45-day hiring cycle was too slow for fast-paced market needs.',
      solution: 'Automated screening and intelligent ranking reduced manual review time dramatically.',
      results: [
        { icon: <TrendingUp className="w-5 h-5" />, label: 'Speed', value: '+50%' },
        { icon: <Clock className="w-5 h-5" />, label: 'Days', value: '22 days' },
        { icon: <Users className="w-5 h-5" />, label: 'Quality', value: '90%' },
      ],
    },
  ];

  return (
    <div className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t.caseStudies?.title || 'Proven Results'}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t.caseStudies?.subtitle || 'See how leading companies transformed their recruitment process'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </div>
  );
};
