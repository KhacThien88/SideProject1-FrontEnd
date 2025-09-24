import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { getContent } = useTranslation();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const quickLinks = [
    { label: getContent('footer.company.links.0.label'), href: getContent('footer.company.links.0.href') },
    { label: getContent('footer.product.links.0.label'), href: getContent('footer.product.links.0.href') },
    { label: getContent('footer.product.links.1.label'), href: getContent('footer.product.links.1.href') },
    { label: getContent('footer.support.links.1.label'), href: getContent('footer.support.links.1.href') },
  ];

  const legalLinks = [
    { label: getContent('footer.legal.links.0.label'), href: getContent('footer.legal.links.0.href') },
    { label: getContent('footer.legal.links.1.label'), href: getContent('footer.legal.links.1.href') },
    { label: getContent('footer.legal.links.2.label'), href: getContent('footer.legal.links.2.href') },
    { label: getContent('footer.support.links.0.label'), href: getContent('footer.support.links.0.href') },
  ];

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
      {/* Enhanced Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-secondary-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '0s'}} />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-accent-500/8 to-primary-500/5 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3 animate-pulse" style={{animationDelay: '3s'}} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Main Footer Content */}
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Enhanced Company Info */}
            <div className="lg:col-span-1 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center mb-8 animate-fade-in-scale">
                <div className="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center mr-4 shadow-brand">
                  <span className="text-white font-bold text-2xl">J</span>
                </div>
                <span className="text-3xl font-bold text-brand-gradient bg-clip-text text-transparent">JobConnect</span>
              </div>
              <p className="text-neutral-300 mb-8 leading-relaxed text-lg animate-slide-up stagger-1">
                {getContent('footer.company.description')}
              </p>
              
              {/* Enhanced Contact Info */}
              <div className="space-y-4 animate-slide-up stagger-2">
                <div className="flex items-center text-neutral-300 hover:text-primary-400 transition-colors duration-300 group">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-500/30 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-primary-400" />
                  </div>
                  <span className="font-medium">{getContent('footer.contact.email')}</span>
                </div>
                <div className="flex items-center text-neutral-300 hover:text-primary-400 transition-colors duration-300 group">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-500/30 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-primary-400" />
                  </div>
                  <span className="font-medium">{getContent('footer.contact.phone')}</span>
                </div>
                <div className="flex items-center text-neutral-300 hover:text-primary-400 transition-colors duration-300 group">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-500/30 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-primary-400" />
                  </div>
                  <span className="font-medium">{getContent('footer.contact.address')}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Links */}
            <div className="animate-slide-up stagger-2">
              <h3 className="text-hierarchy-4 mb-8 text-white">{getContent('footer.product.title')}</h3>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-neutral-300 hover:text-primary-400 transition-all duration-300 font-medium hover:translate-x-2 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Legal Links */}
            <div className="animate-slide-up stagger-3">
              <h3 className="text-hierarchy-4 mb-8 text-white">{getContent('footer.legal.title')}</h3>
              <ul className="space-y-4">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-neutral-300 hover:text-primary-400 transition-all duration-300 font-medium hover:translate-x-2 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Newsletter */}
            <div className="animate-slide-up stagger-4">
              <h3 className="text-hierarchy-4 mb-8 text-white">{getContent('footer.support.title')}</h3>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Stay updated with our latest features and job opportunities.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 bg-neutral-800/50 backdrop-blur-sm border border-neutral-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-neutral-400 transition-all duration-300 hover:border-neutral-500"
                />
                <button
                  type="submit"
                  className="w-full bg-brand-gradient hover:shadow-brand-xl text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover-lift"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Enhanced Social Links & Copyright */}
        <div className="border-t border-neutral-700/50 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Enhanced Social Links */}
            <div className="flex space-x-4 mb-6 md:mb-0 animate-slide-up" style={{animationDelay: '0.5s'}}>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 bg-neutral-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-neutral-400 hover:text-white hover:bg-primary-500/20 hover:border-primary-500/50 border border-neutral-700/50 transition-all duration-300 hover-lift"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Enhanced Copyright */}
            <div className="text-neutral-300 text-center md:text-right animate-slide-up" style={{animationDelay: '0.6s'}}>
              <p className="font-medium">{getContent('footer.copyright')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;