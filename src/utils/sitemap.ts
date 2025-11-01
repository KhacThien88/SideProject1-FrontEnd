/**
 * Sitemap Generator for Multi-language SEO
 * Generates XML sitemap with language alternates
 */

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    lang: string;
    href: string;
  }[];
}

export interface SitemapConfig {
  baseUrl: string;
  languages: string[];
  defaultLanguage: string;
}

const DEFAULT_CONFIG: SitemapConfig = {
  baseUrl: 'https://talentfit-ai.com',
  languages: ['vi', 'en'],
  defaultLanguage: 'vi',
};

/**
 * Page routes configuration
 */
const PAGE_ROUTES = [
  {
    path: '/',
    changefreq: 'daily' as const,
    priority: 1.0,
  },
  {
    path: '/login',
    changefreq: 'monthly' as const,
    priority: 0.8,
  },
  {
    path: '/register',
    changefreq: 'monthly' as const,
    priority: 0.8,
  },
  {
    path: '/dashboard',
    changefreq: 'weekly' as const,
    priority: 0.9,
  },
  {
    path: '/dashboard/cv-analysis',
    changefreq: 'weekly' as const,
    priority: 0.9,
  },
  {
    path: '/dashboard/job-matching',
    changefreq: 'daily' as const,
    priority: 0.9,
  },
  {
    path: '/dashboard/saved-jobs',
    changefreq: 'weekly' as const,
    priority: 0.7,
  },
  {
    path: '/dashboard/job-postings',
    changefreq: 'weekly' as const,
    priority: 0.8,
  },
  {
    path: '/dashboard/settings',
    changefreq: 'monthly' as const,
    priority: 0.6,
  },
];

/**
 * Generate sitemap entries for all pages and languages
 */
export function generateSitemapEntries(config: Partial<SitemapConfig> = {}): SitemapEntry[] {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const entries: SitemapEntry[] = [];
  const now = new Date().toISOString();

  PAGE_ROUTES.forEach(route => {
    // Generate entry for each language
    finalConfig.languages.forEach(lang => {
      const isDefault = lang === finalConfig.defaultLanguage;
      const langPrefix = isDefault ? '' : `/${lang}`;
      const loc = `${finalConfig.baseUrl}${langPrefix}${route.path}`;

      // Generate alternates for other languages
      const alternates = finalConfig.languages.map(altLang => {
        const altIsDefault = altLang === finalConfig.defaultLanguage;
        const altPrefix = altIsDefault ? '' : `/${altLang}`;
        return {
          lang: altLang === 'vi' ? 'vi-VN' : 'en-US',
          href: `${finalConfig.baseUrl}${altPrefix}${route.path}`,
        };
      });

      // Add x-default alternate
      alternates.push({
        lang: 'x-default',
        href: `${finalConfig.baseUrl}${route.path}`,
      });

      entries.push({
        loc,
        lastmod: now,
        changefreq: route.changefreq,
        priority: route.priority,
        alternates,
      });
    });
  });

  return entries;
}

/**
 * Generate XML sitemap string
 */
export function generateSitemapXML(entries: SitemapEntry[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
  const urlsetClose = '</urlset>';

  const urls = entries.map(entry => {
    const alternatesXML = entry.alternates
      ? entry.alternates
          .map(
            alt =>
              `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />`
          )
          .join('\n')
      : '';

    return `  <url>
    <loc>${entry.loc}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : ''}
${alternatesXML}
  </url>`;
  });

  return `${xmlHeader}\n${urlsetOpen}\n${urls.join('\n')}\n${urlsetClose}`;
}

/**
 * Generate sitemap index for multiple sitemaps
 */
export function generateSitemapIndex(sitemaps: { loc: string; lastmod?: string }[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const sitemapIndexOpen =
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const sitemapIndexClose = '</sitemapindex>';

  const sitemapEntries = sitemaps.map(sitemap => {
    return `  <sitemap>
    <loc>${sitemap.loc}</loc>
    ${sitemap.lastmod ? `<lastmod>${sitemap.lastmod}</lastmod>` : ''}
  </sitemap>`;
  });

  return `${xmlHeader}\n${sitemapIndexOpen}\n${sitemapEntries.join('\n')}\n${sitemapIndexClose}`;
}

/**
 * Get canonical URL for a page
 */
export function getCanonicalUrl(
  path: string,
  language: string,
  config: Partial<SitemapConfig> = {}
): string {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const isDefault = language === finalConfig.defaultLanguage;
  const langPrefix = isDefault ? '' : `/${language}`;
  return `${finalConfig.baseUrl}${langPrefix}${path}`;
}

/**
 * Get alternate URLs for a page
 */
export function getAlternateUrls(
  path: string,
  config: Partial<SitemapConfig> = {}
): { lang: string; href: string }[] {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const alternates = finalConfig.languages.map(lang => {
    const isDefault = lang === finalConfig.defaultLanguage;
    const langPrefix = isDefault ? '' : `/${lang}`;
    return {
      lang: lang === 'vi' ? 'vi-VN' : 'en-US',
      href: `${finalConfig.baseUrl}${langPrefix}${path}`,
    };
  });

  // Add x-default
  alternates.push({
    lang: 'x-default',
    href: `${finalConfig.baseUrl}${path}`,
  });

  return alternates;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(config: Partial<SitemapConfig> = {}): string {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${finalConfig.baseUrl}/sitemap.xml

# Disallow admin and private pages
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/settings/

# Crawl delay
Crawl-delay: 1
`;
}

/**
 * Export sitemap utilities
 */
export const sitemapUtils = {
  generateSitemapEntries,
  generateSitemapXML,
  generateSitemapIndex,
  getCanonicalUrl,
  getAlternateUrls,
  generateRobotsTxt,
};
