/**
 * SEO Manager - Handles meta tags, structured data, and SEO optimization
 */

export interface MetaTags {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  locale?: string;
  alternateLocales?: string[];
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface HreflangTag {
  lang: string;
  url: string;
}

export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultImage: string;
  twitterHandle: string;
  facebookAppId?: string;
}

/**
 * Default SEO Configuration
 */
export const DEFAULT_SEO_CONFIG: SEOConfig = {
  siteName: 'TalentFit AI',
  siteUrl: 'https://talentfit-ai.com',
  defaultTitle: 'TalentFit AI - AI-Powered CV Analysis & Job Matching Platform',
  defaultDescription: 'Find the perfect job with AI-powered CV analysis. TalentFit AI helps candidates match with jobs and recruiters find ideal candidates using advanced AI technology.',
  defaultKeywords: [
    'AI CV analysis',
    'job matching',
    'resume analyzer',
    'recruitment AI',
    'talent acquisition',
    'career platform',
    'job search',
    'CV optimization',
  ],
  defaultImage: '/images/og-image.jpg',
  twitterHandle: '@TalentFitAI',
};

/**
 * SEO Manager Class
 */
export class SEOManager {
  private config: SEOConfig;

  constructor(config: Partial<SEOConfig> = {}) {
    this.config = { ...DEFAULT_SEO_CONFIG, ...config };
  }

  /**
   * Generate complete meta tags for a page
   */
  generateMetaTags(page: PageMeta, locale: string = 'vi'): MetaTags {
    const title = page.title || this.config.defaultTitle;
    const description = page.description || this.config.defaultDescription;
    const keywords = page.keywords || this.config.defaultKeywords;
    const canonical = page.canonical || `${this.config.siteUrl}${page.path || ''}`;
    const ogImage = page.image || this.config.defaultImage;

    return {
      title,
      description,
      keywords,
      canonical,
      ogType: page.type || 'website',
      ogImage: ogImage.startsWith('http') ? ogImage : `${this.config.siteUrl}${ogImage}`,
      ogImageAlt: page.imageAlt || title,
      twitterCard: page.twitterCard || 'summary_large_image',
      twitterSite: this.config.twitterHandle,
      twitterCreator: page.author || this.config.twitterHandle,
      locale,
      alternateLocales: locale === 'vi' ? ['en'] : ['vi'],
    };
  }

  /**
   * Apply meta tags to document head
   */
  applyMetaTags(meta: MetaTags): void {
    if (typeof document === 'undefined') return;

    // Basic meta tags
    this.setMetaTag('description', meta.description);
    this.setMetaTag('keywords', meta.keywords.join(', '));
    document.title = `${meta.title} | ${this.config.siteName}`;

    // Canonical URL
    if (meta.canonical) {
      this.setLinkTag('canonical', meta.canonical);
    }

    // Open Graph tags
    this.setMetaTag('og:type', meta.ogType || 'website', 'property');
    this.setMetaTag('og:title', meta.title, 'property');
    this.setMetaTag('og:description', meta.description, 'property');
    this.setMetaTag('og:url', meta.canonical || '', 'property');
    this.setMetaTag('og:site_name', this.config.siteName, 'property');
    this.setMetaTag('og:locale', meta.locale || 'vi_VN', 'property');

    if (meta.alternateLocales) {
      meta.alternateLocales.forEach(locale => {
        this.setMetaTag('og:locale:alternate', locale === 'vi' ? 'vi_VN' : 'en_US', 'property');
      });
    }

    if (meta.ogImage) {
      this.setMetaTag('og:image', meta.ogImage, 'property');
      this.setMetaTag('og:image:alt', meta.ogImageAlt || meta.title, 'property');
      this.setMetaTag('og:image:width', '1200', 'property');
      this.setMetaTag('og:image:height', '630', 'property');
    }

    // Twitter Card tags
    this.setMetaTag('twitter:card', meta.twitterCard || 'summary_large_image');
    this.setMetaTag('twitter:site', meta.twitterSite || '');
    this.setMetaTag('twitter:creator', meta.twitterCreator || '');
    this.setMetaTag('twitter:title', meta.title);
    this.setMetaTag('twitter:description', meta.description);
    if (meta.ogImage) {
      this.setMetaTag('twitter:image', meta.ogImage);
      this.setMetaTag('twitter:image:alt', meta.ogImageAlt || meta.title);
    }
  }

  /**
   * Generate hreflang tags for multi-language SEO
   */
  generateHreflangTags(path: string, locales: string[] = ['vi', 'en']): HreflangTag[] {
    return locales.map(locale => ({
      lang: locale === 'vi' ? 'vi-VN' : 'en-US',
      url: `${this.config.siteUrl}${locale === 'vi' ? '' : '/en'}${path}`,
    }));
  }

  /**
   * Apply hreflang tags to document head
   */
  applyHreflangTags(tags: HreflangTag[]): void {
    if (typeof document === 'undefined') return;

    // Remove existing hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // Add new hreflang tags
    tags.forEach(tag => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = tag.lang;
      link.href = tag.url;
      document.head.appendChild(link);
    });

    // Add x-default
    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = tags[0].url;
    document.head.appendChild(xDefault);
  }

  /**
   * Generate Organization structured data
   */
  generateOrganizationSchema(): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.config.siteName,
      url: this.config.siteUrl,
      logo: `${this.config.siteUrl}/images/logo.png`,
      description: this.config.defaultDescription,
      sameAs: [
        'https://www.facebook.com/talentfitai',
        'https://twitter.com/talentfitai',
        'https://www.linkedin.com/company/talentfitai',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        email: 'support@talentfit-ai.com',
        availableLanguage: ['Vietnamese', 'English'],
      },
    };
  }

  /**
   * Generate WebSite structured data
   */
  generateWebSiteSchema(): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.config.siteName,
      url: this.config.siteUrl,
      description: this.config.defaultDescription,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${this.config.siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };
  }

  /**
   * Generate WebPage structured data
   */
  generateWebPageSchema(page: PageMeta): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title || this.config.defaultTitle,
      description: page.description || this.config.defaultDescription,
      url: page.canonical || `${this.config.siteUrl}${page.path || ''}`,
      isPartOf: {
        '@type': 'WebSite',
        url: this.config.siteUrl,
        name: this.config.siteName,
      },
      inLanguage: page.locale === 'en' ? 'en-US' : 'vi-VN',
      datePublished: page.datePublished || new Date().toISOString(),
      dateModified: page.dateModified || new Date().toISOString(),
    };
  }

  /**
   * Apply structured data to document
   */
  applyStructuredData(data: StructuredData | StructuredData[]): void {
    if (typeof document === 'undefined') return;

    const schemas = Array.isArray(data) ? data : [data];

    schemas.forEach((schema, index) => {
      const id = `structured-data-${index}`;
      let script = document.getElementById(id) as HTMLScriptElement;

      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      script.textContent = JSON.stringify(schema);
    });
  }

  /**
   * Helper: Set meta tag
   */
  private setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name'): void {
    if (!content) return;

    let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }

    meta.content = content;
  }

  /**
   * Helper: Set link tag
   */
  private setLinkTag(rel: string, href: string): void {
    let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.head.appendChild(link);
    }

    link.href = href;
  }
}

/**
 * Page metadata interface
 */
export interface PageMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  imageAlt?: string;
  author?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  locale?: string;
  datePublished?: string;
  dateModified?: string;
}

/**
 * Predefined page metadata for common pages
 */
export const PAGE_METADATA: Record<string, PageMeta> = {
  home: {
    title: 'AI-Powered CV Analysis & Job Matching Platform',
    description: 'Find the perfect job with AI-powered CV analysis. Match with ideal opportunities using advanced AI technology.',
    keywords: ['AI CV analysis', 'job matching', 'resume analyzer', 'career platform'],
    path: '/',
    type: 'website',
  },
  login: {
    title: 'Login - Access Your Account',
    description: 'Login to TalentFit AI to access your personalized job recommendations and CV analysis.',
    path: '/login',
    type: 'website',
  },
  register: {
    title: 'Sign Up - Start Your Career Journey',
    description: 'Create your TalentFit AI account and discover AI-powered job matching tailored to your skills.',
    path: '/register',
    type: 'website',
  },
  dashboard: {
    title: 'Dashboard - Your Career Hub',
    description: 'Manage your CV analysis, job matches, and applications all in one place.',
    path: '/dashboard',
    type: 'website',
  },
};

/**
 * Create SEO manager instance
 */
export const seoManager = new SEOManager();

/**
 * React Hook for SEO
 */
export const useSEO = (pageMeta: PageMeta, locale: string = 'vi') => {
  React.useEffect(() => {
    const meta = seoManager.generateMetaTags(pageMeta, locale);
    seoManager.applyMetaTags(meta);

    const hreflang = seoManager.generateHreflangTags(pageMeta.path || '/', ['vi', 'en']);
    seoManager.applyHreflangTags(hreflang);

    const schemas = [
      seoManager.generateOrganizationSchema(),
      seoManager.generateWebSiteSchema(),
      seoManager.generateWebPageSchema(pageMeta),
    ];
    seoManager.applyStructuredData(schemas);
  }, [pageMeta, locale]);
};

// Need React import for the hook
import React from 'react';
