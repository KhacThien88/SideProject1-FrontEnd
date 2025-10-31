import React from 'react';
import { Upload, Briefcase, Users, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useRouter, Link } from '../Router';
import { conversionTracker } from '../../utils/conversionTracking';

interface CTAPath {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: 'primary' | 'secondary' | 'accent';
  badge?: string;
}

export const MultiPathCTA: React.FC = () => {
  const { t } = useTranslation();
  const { navigate } = useRouter();

  const ctaPaths: CTAPath[] = [
    {
      id: 'job-seeker',
      title: t.multiPathCTA?.jobSeeker?.title || 'I\'m Looking for a Job',
      description: t.multiPathCTA?.jobSeeker?.description || 'Upload your CV and get matched with opportunities',
      icon: <Upload className="w-6 h-6" />,
      link: '/register?role=candidate',
      color: 'primary',
      badge: t.multiPathCTA?.jobSeeker?.badge || 'Most Popular',
    },
    {
      id: 'recruiter',
      title: t.multiPathCTA?.recruiter?.title || 'I\'m Hiring Talent',
      description: t.multiPathCTA?.recruiter?.description || 'Post jobs and find the perfect candidates',
      icon: <Briefcase className="w-6 h-6" />,
      link: '/register?role=recruiter',
      color: 'secondary',
    },
    {
      id: 'enterprise',
      title: t.multiPathCTA?.enterprise?.title || 'Enterprise Solution',
      description: t.multiPathCTA?.enterprise?.description || 'Custom solutions for large organizations',
      icon: <Users className="w-6 h-6" />,
      link: '/contact?type=enterprise',
      color: 'accent',
    },
  ];

  const getColorClasses = (color: 'primary' | 'secondary' | 'accent') => {
    switch (color) {
      case 'primary':
        return {
          bg: 'from-primary-500 to-primary-600',
          hover: 'hover:from-primary-600 hover:to-primary-700',
          ring: 'focus:ring-primary-500/50',
          badge: 'bg-primary-100 text-primary-700',
        };
      case 'secondary':
        return {
          bg: 'from-secondary-500 to-secondary-600',
          hover: 'hover:from-secondary-600 hover:to-secondary-700',
          ring: 'focus:ring-secondary-500/50',
          badge: 'bg-secondary-100 text-secondary-700',
        };
      case 'accent':
        return {
          bg: 'from-accent-500 to-accent-600',
          hover: 'hover:from-accent-600 hover:to-accent-700',
          ring: 'focus:ring-accent-500/50',
          badge: 'bg-accent-100 text-accent-700',
        };
    }
  };

  const handlePathClick = (pathId: string, pathTitle: string, link: string) => {
    conversionTracker.trackCTAClick({
      ctaType: 'primary',
      ctaText: pathTitle,
      ctaLocation: 'multi_path_cta',
      section: pathId,
      targetUrl: link,
    });
    navigate(link);
  };

  return (
    <div className="w-full py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t.multiPathCTA?.title || 'Choose Your Path'}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t.multiPathCTA?.subtitle || 'Select the option that best describes you'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {ctaPaths.map((path) => {
            const colors = getColorClasses(path.color);
            return (
              <div
                key={path.id}
                onClick={() => handlePathClick(path.id, path.title, path.link)}
                className={`
                  relative group cursor-pointer
                  bg-white rounded-2xl p-8
                  border-2 border-neutral-200
                  hover:border-transparent
                  hover:shadow-2xl
                  transition-all duration-300
                  transform hover:-translate-y-2
                  focus:outline-none focus:ring-4 ${colors.ring}
                `}
              >
                {path.badge && (
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                    {path.badge}
                  </span>
                )}

                <div className={`
                  w-14 h-14 rounded-xl
                  bg-gradient-to-br ${colors.bg}
                  flex items-center justify-center
                  text-white mb-6
                  group-hover:scale-110 transition-transform
                `}>
                  {path.icon}
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {path.title}
                </h3>

                <p className="text-neutral-600 mb-6">
                  {path.description}
                </p>

                <div className={`
                  inline-flex items-center gap-2
                  text-sm font-semibold
                  bg-gradient-to-r ${colors.bg}
                  bg-clip-text text-transparent
                  group-hover:gap-3 transition-all
                `}>
                  <span>{t.multiPathCTA?.getStarted || 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4 text-current" style={{ color: 'inherit' }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-neutral-600">
            {t.multiPathCTA?.footer || 'Not sure which one? '}
            <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
              {t.multiPathCTA?.contactUs || 'Contact us'}
            </Link>
            {' '}{t.multiPathCTA?.help || 'and we\'ll help you choose.'}
          </p>
        </div>
      </div>
    </div>
  );
};
