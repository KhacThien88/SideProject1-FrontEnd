import React, { useState, useEffect } from 'react';
import { generatePlaceholder, getOptimizedImageUrl, AssetErrorHandler, type ImageOptimizationOptions } from '../../utils/imageUtils';
import { cn } from '../../utils/cn';

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackType?: 'avatar' | 'logo' | 'feature' | 'dashboard' | 'screenshot';
  optimization?: ImageOptimizationOptions;
  containerClassName?: string;
  imageClassName?: string;
  showLoader?: boolean;
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait' | 'auto';
}

/**
 * Responsive Image Component with lazy loading and optimization
 *
 * Features:
 * - Automatic responsive srcset generation
 * - Lazy loading with IntersectionObserver
 * - Fallback placeholders on error
 * - Loading state with skeleton
 * - Brand-consistent placeholders
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  fallbackType = 'feature',
  optimization = {},
  containerClassName,
  imageClassName,
  showLoader = true,
  aspectRatio = 'auto',
  loading = 'lazy',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(
    generatePlaceholder(fallbackType, optimization.width || 800, optimization.height || 600)
  );

  useEffect(() => {
    // Use provided src if available, otherwise use placeholder
    if (src && !hasError) {
      setImageSrc(
        optimization.width || optimization.height
          ? getOptimizedImageUrl(src, optimization)
          : src
      );
    }
  }, [src, optimization, hasError]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    setIsLoading(false);
    AssetErrorHandler.handleImageError(event.nativeEvent, fallbackType);
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {/* Loading skeleton */}
      {isLoading && showLoader && (
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-shimmer bg-[length:200%_100%]" />
      )}

      {/* Image */}
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-500',
          isLoading ? 'opacity-0' : 'opacity-100',
          imageClassName
        )}
        {...props}
      />

      {/* Error overlay (optional) */}
      {hasError && import.meta.env.DEV && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-error-500 text-white text-xs rounded">
          Failed to load
        </div>
      )}
    </div>
  );
};

/**
 * Hero Image Component - Specialized for hero sections
 */
export const HeroImage: React.FC<Omit<ResponsiveImageProps, 'fallbackType'>> = (props) => {
  return (
    <ResponsiveImage
      {...props}
      fallbackType="dashboard"
      aspectRatio="video"
      optimization={{
        width: 1200,
        quality: 90,
        format: 'webp',
        ...props.optimization,
      }}
    />
  );
};

/**
 * Avatar Image Component - Specialized for user avatars
 */
export const AvatarImage: React.FC<Omit<ResponsiveImageProps, 'fallbackType' | 'aspectRatio'>> = (props) => {
  return (
    <ResponsiveImage
      {...props}
      fallbackType="avatar"
      aspectRatio="square"
      optimization={{
        width: 200,
        height: 200,
        quality: 85,
        format: 'webp',
        ...props.optimization,
      }}
    />
  );
};

/**
 * Logo Image Component - Specialized for company logos
 */
export const LogoImage: React.FC<Omit<ResponsiveImageProps, 'fallbackType'>> = (props) => {
  return (
    <ResponsiveImage
      {...props}
      fallbackType="logo"
      optimization={{
        height: 48,
        quality: 90,
        format: 'png',
        ...props.optimization,
      }}
    />
  );
};

/**
 * Feature Image Component - Specialized for feature sections
 */
export const FeatureImage: React.FC<Omit<ResponsiveImageProps, 'fallbackType'>> = (props) => {
  return (
    <ResponsiveImage
      {...props}
      fallbackType="feature"
      aspectRatio="square"
      optimization={{
        width: 600,
        height: 600,
        quality: 85,
        format: 'webp',
        ...props.optimization,
      }}
    />
  );
};

/**
 * Screenshot Image Component - Specialized for product screenshots
 */
export const ScreenshotImage: React.FC<Omit<ResponsiveImageProps, 'fallbackType'>> = (props) => {
  return (
    <ResponsiveImage
      {...props}
      fallbackType="screenshot"
      aspectRatio="video"
      optimization={{
        width: 1200,
        quality: 90,
        format: 'webp',
        ...props.optimization,
      }}
    />
  );
};
