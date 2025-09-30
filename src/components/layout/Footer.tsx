import React from 'react';
import { cn } from '../../utils/cn';
import { useTranslation } from '../../hooks/useTranslation';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Send,
  Sparkles,
  Shield,
  Award,
  Zap,
  Heart
} from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/talentfitai', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Twitter, href: 'https://twitter.com/talentfitai', label: 'Twitter', color: 'hover:text-sky-500' },
    { icon: Linkedin, href: 'https://linkedin.com/company/talentfitai', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Instagram, href: 'https://instagram.com/talentfitai', label: 'Instagram', color: 'hover:text-pink-500' },
  ];

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
      {/* Simplified Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-secondary-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-float" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-accent-500/8 to-primary-500/4 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3 animate-float" style={{animationDelay: '3s'}} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* Company Info & Newsletter - Expanded */}
          <div className="lg:col-span-5 space-y-5 lg:space-y-6">
            {/* Company Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base lg:text-lg">T</span>
                </div>
                <div>
                  <span className="text-xl lg:text-2xl font-bold">
                    <span className="text-brand-gradient-primary bg-clip-text text-transparent">TalentFit</span>
                    <span className="text-white ml-1">AI</span>
                  </span>
                </div>
              </div>
              <div className="text-sm lg:text-base text-neutral-300 leading-relaxed mb-2">
                {t.footer.company.description}
              </div>
              <div className="text-xs lg:text-sm text-primary-400 font-medium">
                {t.footer.company.tagline}
              </div>
            </div>

            {/* Newsletter - Expanded */}
            <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-5 lg:p-6 border border-neutral-700/30">
              <div className="text-base lg:text-lg font-bold mb-2 text-white">
                {t.footer.newsletter.title}
              </div>
              <div className="text-sm lg:text-base text-neutral-300 mb-4">
                {t.footer.newsletter.subtitle}
              </div>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 lg:w-5 lg:h-5" />
                  <input
                    type="email"
                    placeholder={t.footer.newsletter.placeholder}
                    className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-3.5 bg-neutral-700/50 border border-neutral-600 rounded-lg text-sm lg:text-base text-white placeholder-neutral-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                  />
                </div>
                <button className="px-4 lg:px-5 py-3 lg:py-3.5 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                  <Send className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
              <div className="text-xs lg:text-sm text-neutral-400 mt-3">
                {t.footer.newsletter.agreement}
              </div>
            </div>
          </div>

          {/* Links Sections - Responsive */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Product */}
            <div>
              <div className="text-sm lg:text-base font-semibold mb-3 lg:mb-4 text-white">
                {t.footer.links.product.title}
              </div>
              <ul className="space-y-2 lg:space-y-3">
                <li>
                  <a href="#cv-analysis" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors flex items-center group">
                    <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 mr-2 opacity-60 group-hover:opacity-100" />
                    {t.footer.links.product.items.cvAnalysis}
                  </a>
                </li>
                <li>
                  <a href="#job-matching" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors flex items-center group">
                    <Zap className="w-3 h-3 lg:w-4 lg:h-4 mr-2 opacity-60 group-hover:opacity-100" />
                    {t.footer.links.product.items.jobMatching}
                  </a>
                </li>
                <li>
                  <a href="#career-insights" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors flex items-center group">
                    <Award className="w-3 h-3 lg:w-4 lg:h-4 mr-2 opacity-60 group-hover:opacity-100" />
                    {t.footer.links.product.items.careerInsights}
                  </a>
                </li>
                <li>
                  <a href="#skill-assessment" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors flex items-center group">
                    <Shield className="w-3 h-3 lg:w-4 lg:h-4 mr-2 opacity-60 group-hover:opacity-100" />
                    {t.footer.links.product.items.skillAssessment}
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-sm lg:text-base font-semibold mb-3 lg:mb-4 text-white">
                {t.footer.links.company.title}
              </div>
              <ul className="space-y-2 lg:space-y-3">
                <li><a href="#about" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.company.items.about}</a></li>
                <li><a href="#team" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.company.items.team}</a></li>
                <li><a href="#news" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.company.items.news}</a></li>
                <li><a href="#careers" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.company.items.careers}</a></li>
                <li><a href="#partners" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.company.items.partners}</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <div className="text-sm lg:text-base font-semibold mb-3 lg:mb-4 text-white">
                {t.footer.links.support.title}
              </div>
              <ul className="space-y-2 lg:space-y-3">
                <li><a href="#help" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.support.items.helpCenter}</a></li>
                <li><a href="#guide" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.support.items.userGuide}</a></li>
                <li><a href="#api" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.support.items.apiDocs}</a></li>
                <li><a href="#contact" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.support.items.contactSupport}</a></li>
                <li><a href="#bug-report" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.support.items.bugReport}</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <div className="text-sm lg:text-base font-semibold mb-3 lg:mb-4 text-white">
                {t.footer.links.legal.title}
              </div>
              <ul className="space-y-2 lg:space-y-3">
                <li><a href="#privacy" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.legal.items.privacy}</a></li>
                <li><a href="#terms" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.legal.items.terms}</a></li>
                <li><a href="#cookies" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.legal.items.cookies}</a></li>
                <li><a href="#gdpr" className="text-sm lg:text-base text-neutral-300 hover:text-primary-400 transition-colors">{t.footer.links.legal.items.gdpr}</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 lg:mt-10 pt-6 lg:pt-8 border-t border-neutral-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 lg:gap-6">
            
            {/* Copyright */}
            <div className="text-sm lg:text-base text-neutral-400">
              © 2024 TalentFit AI. {t.footer.bottom.copyright}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 lg:space-x-5">
              <span className="text-sm lg:text-base text-neutral-400 mr-2">
                {t.footer.social.followUs}:
              </span>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'p-2 lg:p-2.5 text-neutral-400 rounded-lg transition-all duration-300 hover:scale-110',
                      social.color
                    )}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </a>
                );
              })}
            </div>

            {/* Made with love */}
            <div className="flex items-center text-sm lg:text-base text-neutral-400">
              <span>{t.footer.bottom.madeWith}</span>
              <Heart className="w-4 h-4 lg:w-5 lg:h-5 mx-1 text-red-500 animate-pulse" />
              <span>{t.footer.bottom.vietnam}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;