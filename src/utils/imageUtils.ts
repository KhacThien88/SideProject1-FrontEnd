/**
 * Image Utilities for Asset Management
 * Handles image optimization, responsive loading, and fallbacks
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  lazy?: boolean;
}

export interface ResponsiveImageSet {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Generates SVG placeholder with brand colors
 */
export const generatePlaceholder = (
  type: 'avatar' | 'logo' | 'feature' | 'dashboard' | 'screenshot',
  width: number = 400,
  height: number = 300
): string => {
  const placeholders = {
    avatar: {
      bg: '#EFF6FF', // primary-50
      icon: '#2368FE', // primary-500
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <rect width="${width}" height="${height}" fill="#EFF6FF"/>
        <circle cx="${width/2}" cy="${height/2 - 20}" r="40" fill="#2368FE" opacity="0.3"/>
        <path d="M${width/2 - 50},${height/2 + 40} Q${width/2},${height/2 + 20} ${width/2 + 50},${height/2 + 40}"
              fill="none" stroke="#2368FE" stroke-width="20" stroke-linecap="round" opacity="0.3"/>
      </svg>`,
    },
    logo: {
      bg: '#F5F5F7', // neutral-100
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <rect width="${width}" height="${height}" fill="#F5F5F7"/>
        <rect x="${width/2 - 60}" y="${height/2 - 30}" width="120" height="60" rx="8" fill="#2368FE" opacity="0.2"/>
        <text x="${width/2}" y="${height/2}" text-anchor="middle" dominant-baseline="middle"
              font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#475467">LOGO</text>
      </svg>`,
    },
    feature: {
      bg: 'linear-gradient(135deg, #EFF6FF 0%, #ECFDF5 100%)',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <linearGradient id="featureBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#EFF6FF;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ECFDF5;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#featureBg)"/>
        <rect x="${width/2 - 50}" y="${height/2 - 50}" width="100" height="100" rx="16"
              fill="#2368FE" opacity="0.2"/>
        <path d="M${width/2 - 20},${height/2} L${width/2 - 10},${height/2 + 20} L${width/2 + 25},${height/2 - 15}"
              fill="none" stroke="#12B669" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
      </svg>`,
    },
    dashboard: {
      bg: '#FFFFFF',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <rect width="${width}" height="${height}" fill="#FFFFFF"/>
        <rect width="${width}" height="${height}" fill="url(#dashboardGradient)"/>
        <defs>
          <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2368FE;stop-opacity:0.05" />
            <stop offset="100%" style="stop-color:#12B669;stop-opacity:0.05" />
          </linearGradient>
        </defs>
        <!-- Dashboard elements -->
        <rect x="20" y="20" width="${width - 40}" height="40" rx="8" fill="#2368FE" opacity="0.1"/>
        <rect x="20" y="80" width="${width/2 - 30}" height="${height - 120}" rx="12" fill="#EFF6FF" opacity="0.6"/>
        <rect x="${width/2 + 10}" y="80" width="${width/2 - 30}" height="${(height - 120)/2 - 10}" rx="12" fill="#ECFDF5" opacity="0.6"/>
        <rect x="${width/2 + 10}" y="${80 + (height - 120)/2 + 10}" width="${width/2 - 30}" height="${(height - 120)/2 - 10}" rx="12" fill="#FFF7ED" opacity="0.6"/>
        <!-- Chart line -->
        <path d="M40,${height - 80} Q${width/4},${height - 120} ${width/2},${height - 100} T${width - 40},${height - 140}"
              fill="none" stroke="#2368FE" stroke-width="3" opacity="0.4"/>
      </svg>`,
    },
    screenshot: {
      bg: '#F5F5F7',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <rect width="${width}" height="${height}" fill="#F5F5F7"/>
        <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="12" fill="white" stroke="#EAECF0" stroke-width="2"/>
        <rect x="20" y="20" width="${width - 40}" height="30" rx="6" fill="#2368FE" opacity="0.1"/>
        <rect x="20" y="60" width="${width - 40}" height="60" rx="8" fill="#ECFDF5" opacity="0.3"/>
        <rect x="20" y="130" width="${width/2 - 30}" height="80" rx="8" fill="#FFF7ED" opacity="0.3"/>
        <rect x="${width/2 + 10}" y="130" width="${width/2 - 30}" height="80" rx="8" fill="#EFF6FF" opacity="0.3"/>
      </svg>`,
    },
  };

  const placeholder = placeholders[type];
  return `data:image/svg+xml;base64,${btoa(placeholder.svg)}`;
};

/**
 * Generates responsive image srcset
 */
export const generateResponsiveImageSet = (
  baseSrc: string,
  alt: string,
  sizes?: string
): ResponsiveImageSet => {
  const widths = [320, 640, 768, 1024, 1280, 1536];

  const srcSet = widths
    .map(width => `${baseSrc}?w=${width} ${width}w`)
    .join(', ');

  const defaultSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px';

  return {
    src: `${baseSrc}?w=1024`,
    srcSet,
    sizes: defaultSizes,
    alt,
    loading: 'lazy',
  };
};

/**
 * Preloads critical images for better performance
 */
export const preloadCriticalImages = (images: string[]): void => {
  if (typeof window === 'undefined') return;

  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with Intersection Observer
 */
export const setupLazyLoading = (): void => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (src) img.src = src;
        if (srcset) img.srcset = srcset;

        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01,
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};

/**
 * Gets optimized image URL with transformations
 */
export const getOptimizedImageUrl = (
  src: string,
  options: ImageOptimizationOptions = {}
): string => {
  const { width, height, quality = 85, format = 'webp' } = options;

  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('fm', format);
  params.append('fit', 'cover');

  return `${src}?${params.toString()}`;
};

/**
 * Asset error handling with fallbacks
 */
export class AssetErrorHandler {
  private static fallbackImages = new Map<string, string>();

  static handleImageError(event: Event, fallbackType: 'avatar' | 'logo' | 'feature' | 'dashboard' | 'screenshot'): void {
    const img = event.target as HTMLImageElement;
    const originalSrc = img.src;

    // Prevent infinite loop
    if (this.fallbackImages.get(originalSrc) === fallbackType) {
      console.error(`Failed to load fallback image for: ${originalSrc}`);
      return;
    }

    this.fallbackImages.set(originalSrc, fallbackType);
    img.src = generatePlaceholder(fallbackType, img.width || 400, img.height || 300);

    if (import.meta.env.DEV) {
      console.warn(`[AssetError] Failed to load image: ${originalSrc}, using ${fallbackType} placeholder`);
    }
  }

  static clearFallbackCache(): void {
    this.fallbackImages.clear();
  }
}

/**
 * Image preloader utility
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Batch preload multiple images
 */
export const preloadImages = async (sources: string[]): Promise<void[]> => {
  return Promise.all(sources.map(preloadImage));
};
