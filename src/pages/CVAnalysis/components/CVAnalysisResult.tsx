import React, { useState, useRef } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { 
  FileText,
  Download,
  Printer,
  Share2,
  TrendingUp,
  Award,
  Briefcase,
  GraduationCap,
  User,
  Target,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  PieChart,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Star,
  Plus,
  RefreshCw
} from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface AnalysisResult {
  id: string;
  fileName: string;
  overview: {
    experienceYears: number;
    skillsCount: number;
    educationLevel: string;
    matchScore: number;
  };
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  experience: {
    position: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  suggestions: {
    strengths: string[];
    improvements: string[];
  };
}

interface CVAnalysisResultProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
  className?: string;
}

const SkillCategory: React.FC<{
  title: string;
  skills: string[];
  color: 'primary' | 'secondary' | 'accent';
  maxVisible?: number;
}> = ({ title, skills, color, maxVisible = 10 }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleSkills = showAll ? skills : skills.slice(0, maxVisible);
  const hasMore = skills.length > maxVisible;

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-neutral-900 flex items-center space-x-2">
        <div className={cn(
          'w-3 h-3 rounded-full',
          color === 'primary' ? 'bg-primary-500' :
          color === 'secondary' ? 'bg-secondary-500' :
          'bg-accent-500'
        )} />
        <span>{title}</span>
        <Badge variant="neutral" size="sm">{skills.length}</Badge>
      </h4>
      <div className="flex flex-wrap gap-2">
        {visibleSkills.map((skill, index) => (
          <Badge
            key={index}
            variant={color}
            size="sm"
            className="transition-all duration-200 hover:scale-105"
          >
            {skill}
          </Badge>
        ))}
        {hasMore && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center space-x-1 text-xs text-primary-600 hover:text-primary-700 font-medium"
          >
            <Plus className="w-3 h-3" />
            <span>+{skills.length - maxVisible} more</span>
          </button>
        )}
        {showAll && hasMore && (
          <button
            onClick={() => setShowAll(false)}
            className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-600 font-medium"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  subValue?: string;
  color?: string;
  progress?: number;
}> = ({ icon: Icon, label, value, subValue, color = 'text-primary-600', progress }) => (
  <Card className="p-4 text-center space-y-3">
    <div className={cn('w-12 h-12 mx-auto rounded-full bg-neutral-100 flex items-center justify-center', color)}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <div className="text-2xl font-bold text-neutral-900">{value}</div>
      <div className="text-sm text-neutral-600">{label}</div>
      {subValue && (
        <div className="text-xs text-neutral-500 mt-1">{subValue}</div>
      )}
      {progress !== undefined && (
        <div className="mt-2">
          <ProgressBar value={progress} size="sm" variant="primary" />
        </div>
      )}
    </div>
  </Card>
);

export const CVAnalysisResult: React.FC<CVAnalysisResultProps> = ({
  result,
  onNewAnalysis,
  className
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'experience' | 'education' | 'suggestions'>('overview');
  const printRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'skills', label: 'Skills', icon: Target },
    { key: 'experience', label: 'Experience', icon: Briefcase },
    { key: 'education', label: 'Education', icon: GraduationCap },
    { key: 'suggestions', label: 'Suggestions', icon: TrendingUp },
  ];

  // Export functions
  const handleExportPDF = () => {
    // In a real implementation, you would use a PDF generation library
    window.print();
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cv-analysis-${result.fileName.split('.')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CV Analysis Results',
          text: `CV Analysis results for ${result.fileName}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={Calendar}
            label="Years of Experience"
            value={result.overview.experienceYears}
            color="text-primary-600"
          />
          <MetricCard
            icon={Target}
            label="Skills Identified"
            value={result.overview.skillsCount}
            color="text-secondary-600"
          />
          <MetricCard
            icon={GraduationCap}
            label="Education Level"
            value={result.overview.educationLevel}
            color="text-accent-600"
          />
          <MetricCard
            icon={Award}
            label="Match Score"
            value={`${result.overview.matchScore}%`}
            progress={result.overview.matchScore}
            color="text-success-600"
          />
        </div>
      </div>

      {/* Skills Overview */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Skills Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900">{result.skills.technical.length}</div>
                <div className="text-sm text-neutral-600">Technical Skills</div>
              </div>
              <ProgressBar 
                value={(result.skills.technical.length / result.overview.skillsCount) * 100} 
                variant="primary" 
                size="sm" 
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-secondary-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-secondary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900">{result.skills.soft.length}</div>
                <div className="text-sm text-neutral-600">Soft Skills</div>
              </div>
              <ProgressBar 
                value={(result.skills.soft.length / result.overview.skillsCount) * 100} 
                variant="secondary" 
                size="sm" 
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-accent-100 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-accent-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900">{result.skills.languages.length}</div>
                <div className="text-sm text-neutral-600">Languages</div>
              </div>
              <ProgressBar 
                value={(result.skills.languages.length / 5) * 100} 
                variant="accent" 
                size="sm" 
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Insights */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Strengths</h4>
                <ul className="space-y-1">
                  {result.suggestions.strengths.slice(0, 3).map((strength, index) => (
                    <li key={index} className="text-sm text-neutral-600 flex items-start space-x-2">
                      <Star className="w-3 h-3 text-success-500 mt-0.5 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-warning-600" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Areas for Improvement</h4>
                <ul className="space-y-1">
                  {result.suggestions.improvements.slice(0, 3).map((improvement, index) => (
                    <li key={index} className="text-sm text-neutral-600 flex items-start space-x-2">
                      <TrendingUp className="w-3 h-3 text-warning-500 mt-0.5 flex-shrink-0" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <SkillCategory
        title="Technical Skills"
        skills={result.skills.technical}
        color="primary"
      />
      <SkillCategory
        title="Soft Skills"
        skills={result.skills.soft}
        color="secondary"
      />
      <SkillCategory
        title="Languages"
        skills={result.skills.languages}
        color="accent"
      />
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      {result.experience.map((exp, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-neutral-900">{exp.position}</h4>
              <p className="text-secondary-600 font-medium">{exp.company}</p>
            </div>
            <Badge variant="neutral" size="sm">{exp.duration}</Badge>
          </div>
          <p className="text-neutral-600 leading-relaxed">{exp.description}</p>
        </Card>
      ))}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      {result.education.map((edu, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900">{edu.degree}</h4>
                <p className="text-neutral-600">{edu.institution}</p>
              </div>
            </div>
            <Badge variant="accent" size="sm">{edu.year}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSuggestions = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-success-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">Strengths</h3>
        </div>
        <ul className="space-y-3">
          {result.suggestions.strengths.map((strength, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Star className="w-4 h-4 text-success-500 mt-1 flex-shrink-0" />
              <span className="text-neutral-700">{strength}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-warning-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">Improvement Areas</h3>
        </div>
        <ul className="space-y-3">
          {result.suggestions.improvements.map((improvement, index) => (
            <li key={index} className="flex items-start space-x-3">
              <AlertTriangle className="w-4 h-4 text-warning-500 mt-1 flex-shrink-0" />
              <span className="text-neutral-700">{improvement}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );

  return (
    <div className={cn('space-y-6', className)} ref={printRef}>
      {/* Analysis Result Header Card */}
      <div className="bg-white rounded-xl shadow-brand p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">{result.fileName}</h2>
              <p className="text-sm text-neutral-600">
                Analyzed on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-500">{result.overview.matchScore}%</div>
              <div className="text-sm text-neutral-600">Good</div>
            </div>
            <div className="flex space-x-1">
              <button className="p-2 text-neutral-500 hover:text-primary-600 transition-colors duration-200">
                <Download className="w-4 h-4" onClick={handleExportData} />
              </button>
              <button className="p-2 text-neutral-500 hover:text-primary-600 transition-colors duration-200">
                <Printer className="w-4 h-4" onClick={handleExportPDF} />
              </button>
              <button className="p-2 text-neutral-500 hover:text-error-600 transition-colors duration-200">
                <RefreshCw className="w-4 h-4" onClick={onNewAnalysis} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-neutral-50 rounded-lg">
          <div>
            <div className="text-xs text-neutral-500 mb-1">Name</div>
            <div className="font-medium text-neutral-900">John Miller</div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 mb-1">Email</div>
            <div className="font-medium text-neutral-900">candidate@email.com</div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 mb-1">Phone</div>
            <div className="font-medium text-neutral-900">+1 (555) 123-4567</div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 mb-1">Location</div>
            <div className="font-medium text-neutral-900">Los Angeles, CA</div>
          </div>
        </div>
      </div>

      {/* Analysis Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-brand p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">65%</div>
          <div className="text-sm text-neutral-600">Skills Match</div>
          <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-brand p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">68%</div>
          <div className="text-sm text-neutral-600">Experience</div>
          <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-brand p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">64%</div>
          <div className="text-sm text-neutral-600">Education</div>
          <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '64%' }}></div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-brand p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">63%</div>
          <div className="text-sm text-neutral-600">Keywords</div>
          <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '63%' }}></div>
          </div>
        </div>
      </div>

      {/* Detected Skills */}
      <div className="bg-white rounded-xl shadow-brand p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Detected Skills</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { skill: 'JavaScript', percentage: '32%' },
            { skill: 'React', percentage: '30%' },
            { skill: 'Node.js', percentage: '25%' },
            { skill: 'Python', percentage: '21%' },
            { skill: 'HTML', percentage: '25%' },
            { skill: 'CSS', percentage: '24%' }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2 bg-neutral-100 rounded-full px-3 py-1">
              <span className="text-sm font-medium text-neutral-900">{item.skill}</span>
              <span className="text-xs text-neutral-500">{item.percentage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Job Match Analysis */}
      <div className="bg-white rounded-xl shadow-brand p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Job Match Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-neutral-600 mb-2">Match Percentage</div>
            <div className="text-3xl font-bold text-orange-500 mb-4">63%</div>
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-3">Recommendations</div>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-neutral-700">Add more technical projects</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-neutral-700">Improve keyword optimization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};