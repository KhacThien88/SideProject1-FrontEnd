import React from 'react';
import { cn } from '../../utils/cn';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Sparkles,
  Shield,
  Award,
  Users,
  Zap,
  Heart,
  ArrowRight
} from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/talentfitai', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Twitter, href: 'https://twitter.com/talentfitai', label: 'Twitter', color: 'hover:text-sky-500' },
    { icon: Linkedin, href: 'https://linkedin.com/company/talentfitai', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Instagram, href: 'https://instagram.com/talentfitai', label: 'Instagram', color: 'hover:text-pink-500' },
  ];

  const productLinks = [
    { 
      label: 'AI CV Analysis', 
      href: '#cv-analysis',
      icon: Sparkles,
      description: 'Phân tích CV thông minh'
    },
    { 
      label: 'Job Matching', 
      href: '#job-matching',
      icon: Zap,
      description: 'Ghép đôi công việc AI'
    },
    { 
      label: 'Career Insights', 
      href: '#career-insights',
      icon: Award,
      description: 'Thông tin nghề nghiệp'
    },
    { 
      label: 'Skill Assessment', 
      href: '#skill-assessment',
      icon: Shield,
      description: 'Đánh giá kỹ năng'
    },
  ];

  const companyLinks = [
    { label: 'Về chúng tôi', href: '#about', description: 'Câu chuyện và sứ mệnh' },
    { label: 'Đội ngũ', href: '#team', description: 'Gặp gỡ chuyên gia AI' },
    { label: 'Tin tức', href: '#news', description: 'Cập nhật mới nhất' },
    { label: 'Tuyển dụng', href: '#careers', description: 'Gia nhập đội ngũ' },
    { label: 'Đối tác', href: '#partners', description: 'Hợp tác chiến lược' },
  ];

  const supportLinks = [
    { label: 'Trung tâm hỗ trợ', href: '#help', description: 'Câu hỏi thường gặp' },
    { label: 'Hướng dẫn sử dụng', href: '#guide', description: 'Tài liệu chi tiết' },
    { label: 'API Documentation', href: '#api', description: 'Tích hợp dễ dàng' },
    { label: 'Liên hệ hỗ trợ', href: '#contact', description: 'Hỗ trợ 24/7' },
    { label: 'Báo cáo lỗi', href: '#bug-report', description: 'Góp ý cải thiện' },
  ];

  const legalLinks = [
    { label: 'Chính sách bảo mật', href: '#privacy' },
    { label: 'Điều khoản sử dụng', href: '#terms' },
    { label: 'Chính sách Cookie', href: '#cookies' },
    { label: 'GDPR Compliance', href: '#gdpr' },
  ];

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
      {/* Enhanced Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-500/15 to-secondary-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-float" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-accent-500/12 to-primary-500/8 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3 animate-float" style={{animationDelay: '3s'}} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-secondary-500/8 to-accent-500/6 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '6s'}} />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '2s'}} />
        <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-secondary-400 rounded-full animate-pulse opacity-30" style={{animationDelay: '4s'}} />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-accent-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '1s'}} />
      </div>
      
      <div className="page-max relative z-10">
        {/* Enhanced Main Footer Content */}
        <div className="section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            
            {/* Enhanced Company Info - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 animate-slide-up" style={{animationDelay: '0.1s'}}>
              {/* Enhanced Logo */}
              <div className="flex items-center mb-8 group">
                <div className="w-14 h-14 bg-brand-gradient-primary rounded-2xl flex items-center justify-center mr-4 shadow-brand-lg group-hover:shadow-brand-xl transition-all duration-300 hover-scale">
                  <span className="text-white font-bold text-2xl">T</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">
                    <span className="text-brand-gradient-primary bg-clip-text text-transparent">TalentFit</span>
                    <span className="text-white ml-1">AI</span>
                  </span>
                  <span className="text-sm text-neutral-400 font-medium">AI-Powered CV Analysis Platform</span>
                </div>
              </div>
              
              <p className="text-neutral-300 mb-8 leading-relaxed text-lg animate-slide-up stagger-1 max-w-md">
                Nền tảng phân tích CV thông minh hàng đầu, giúp kết nối nhà tuyển dụng với ứng viên phù hợp thông qua công nghệ AI tiên tiến.
              </p>
              
              {/* Enhanced Contact Info */}
              <div className="space-y-4 animate-slide-up stagger-2">
                <div className="flex items-center text-neutral-300 hover:text-primary-400 transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary-500/30 group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">contact@talentfit.ai</div>
                    <div className="text-sm text-neutral-500">Email hỗ trợ chính</div>
                  </div>
                </div>
                
                <div className="flex items-center text-neutral-300 hover:text-primary-400 transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary-500/30 group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">+84 (028) 1234 5678</div>
                    <div className="text-sm text-neutral-500">Hotline 24/7</div>
                  </div>
                </div>
                
                <div className="flex items-center text-neutral-300 hover:text-primary-400 transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary-500/30 group-hover:scale-110 transition-all duration-300">
                    <MapPin className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Quận 1, TP. Hồ Chí Minh</div>
                    <div className="text-sm text-neutral-500">Trụ sở chính</div>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 pt-6 border-t border-neutral-700/50">
                <div className="flex items-center space-x-6 text-sm text-neutral-400">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-success-400" />
                    <span>ISO 27001 Certified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary-400" />
                    <span>100K+ Users</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Product Links */}
            <div className="animate-slide-up stagger-2">
              <h3 className="text-xl font-bold mb-8 text-white flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-primary-400" />
                Sản phẩm
              </h3>
              <ul className="space-y-4">
                {productLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="group flex items-start space-x-3 text-neutral-300 hover:text-primary-400 transition-all duration-300 p-2 rounded-lg hover:bg-neutral-800/50"
                      >
                        <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-colors duration-300 mt-0.5">
                          <Icon className="w-4 h-4 text-primary-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold group-hover:translate-x-1 transition-transform duration-300">{link.label}</div>
                          <div className="text-sm text-neutral-500">{link.description}</div>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Enhanced Company Links */}
            <div className="animate-slide-up stagger-3">
              <h3 className="text-xl font-bold mb-8 text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-secondary-400" />
                Công ty
              </h3>
              <ul className="space-y-4">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="group flex items-start space-x-3 text-neutral-300 hover:text-secondary-400 transition-all duration-300 p-2 rounded-lg hover:bg-neutral-800/50"
                    >
                      <ArrowRight className="w-4 h-4 mt-1 group-hover:translate-x-1 transition-transform duration-300" />
                      <div className="flex-1">
                        <div className="font-semibold">{link.label}</div>
                        <div className="text-sm text-neutral-500">{link.description}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Support Links */}
            <div className="animate-slide-up stagger-4">
              <h3 className="text-xl font-bold mb-8 text-white flex items-center">
                <Heart className="w-5 h-5 mr-2 text-accent-400" />
                Hỗ trợ
              </h3>
              <ul className="space-y-4">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="group flex items-start space-x-3 text-neutral-300 hover:text-accent-400 transition-all duration-300 p-2 rounded-lg hover:bg-neutral-800/50"
                    >
                      <ArrowRight className="w-4 h-4 mt-1 group-hover:translate-x-1 transition-transform duration-300" />
                      <div className="flex-1">
                        <div className="font-semibold">{link.label}</div>
                        <div className="text-sm text-neutral-500">{link.description}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Enhanced Newsletter */}
              <div className="mt-8 p-6 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl border border-primary-500/20 backdrop-blur-sm">
                <h4 className="text-lg font-semibold mb-3 text-white flex items-center">
                  <Send className="w-5 h-5 mr-2 text-primary-400" />
                  Newsletter
                </h4>
                <p className="text-neutral-300 mb-4 text-sm leading-relaxed">
                  Nhận thông tin mới nhất về AI và xu hướng tuyển dụng
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-neutral-800/60 backdrop-blur-sm border border-neutral-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-neutral-400 transition-all duration-300 hover:border-neutral-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-brand-gradient-primary hover:shadow-brand-lg text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover-lift flex items-center justify-center space-x-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Đăng ký</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-neutral-700/50 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Enhanced Social Links */}
            <div className="flex items-center space-x-4 animate-slide-up" style={{animationDelay: '0.5s'}}>
              <span className="text-neutral-400 font-medium mr-2">Theo dõi chúng tôi:</span>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={cn(
                      'w-12 h-12 bg-neutral-800/60 backdrop-blur-sm rounded-xl flex items-center justify-center text-neutral-400 hover:text-white border border-neutral-700/50 hover:border-primary-500/50 transition-all duration-300 hover-lift hover:scale-110',
                      social.color
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Enhanced Legal Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end space-x-6 text-sm animate-slide-up" style={{animationDelay: '0.6s'}}>
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-300 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced Copyright */}
          <div className="mt-8 pt-6 border-t border-neutral-700/30 text-center animate-slide-up" style={{animationDelay: '0.7s'}}>
            <p className="text-neutral-400 text-sm">
              © 2024 <span className="text-brand-gradient-primary bg-clip-text text-transparent font-semibold">TalentFit AI</span>. 
              Tất cả quyền được bảo lưu. Made with <Heart className="w-4 h-4 inline text-red-500 animate-pulse" /> in Vietnam.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;