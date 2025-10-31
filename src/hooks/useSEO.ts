import { useEffect } from 'react';
import { seoManager } from '../utils/seo';
import type { PageMeta } from '../utils/seo';
import { useLanguage } from './useLanguage';

/**
 * Custom hook for managing SEO meta tags
 * Automatically applies meta tags, structured data, and hreflang tags
 * 
 * @param pageMeta - Page metadata configuration
 * 
 * @example
 * ```tsx
 * function HomePage() {
 *   const { t } = useTranslation();
 *   
 *   useSEO({
 *     title: t.seo.home.title,
 *     description: t.seo.home.description,
 *     keywords: t.seo.home.keywords,
 *     path: '/',
 *     type: 'website'
 *   });
 *   
 *   return <div>...</div>;
 * }
 * ```
 */
export const useSEO = (pageMeta: PageMeta) => {
  const { language } = useLanguage();

  useEffect(() => {
    // Generate and apply meta tags
    const meta = seoManager.generateMetaTags(pageMeta, language);
    seoManager.applyMetaTags(meta);

    // Generate and apply hreflang tags for multi-language support
    const hreflang = seoManager.generateHreflangTags(pageMeta.path || '/', ['vi', 'en']);
    seoManager.applyHreflangTags(hreflang);

    // Generate and apply structured data (JSON-LD)
    const schemas = [
      seoManager.generateOrganizationSchema(),
      seoManager.generateWebSiteSchema(),
      seoManager.generateWebPageSchema({ ...pageMeta, locale: language }),
    ];
    seoManager.applyStructuredData(schemas);
  }, [pageMeta, language]);
};
