/**
 * Optimized Image Component
 * 
 * Enhanced image component with lazy loading, WebP support, and performance optimizations
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import type { BaseComponentProps } from '../../../types';

interface OptimizedImageProps extends BaseComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  objectFit = 'cover',
  objectPosition = 'center',
  loading = 'lazy',
  onLoad,
  onError,
  fallbackSrc,
  className = ''
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
    }
    
    onError?.();
  };

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || (
    fill 
      ? '100vw'
      : width 
        ? `(max-width: 768px) 100vw, ${width}px`
        : '100vw'
  );

  // Generate blur placeholder for better UX
  const generateBlurDataURL = (w: number, h: number) => {
    if (typeof window === 'undefined') {
      // Server-side fallback
      return `data:image/svg+xml;base64,${Buffer.from(
        `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>`
      ).toString('base64')}`;
    }

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Create a subtle gradient for better visual appeal
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#f7fafc');
      gradient.addColorStop(1, '#edf2f7');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    return canvas.toDataURL();
  };

  const blurPlaceholder = blurDataURL || (
    width && height ? generateBlurDataURL(width, height) : undefined
  );

  // Common image props
  const imageProps = {
    src: imageSrc,
    alt,
    quality,
    priority,
    loading,
    sizes: responsiveSizes,
    onLoad: handleLoad,
    onError: handleError,
    className: `transition-all duration-500 ease-out ${
      isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
    } ${className}`,
    style: {
      objectFit,
      objectPosition,
    },
    ...(placeholder === 'blur' && blurPlaceholder && {
      placeholder: 'blur' as const,
      blurDataURL: blurPlaceholder,
    }),
  };

  // Error state
  if (hasError && !fallbackSrc) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Obrázek se nepodařilo načíst</span>
      </div>
    );
  }

  // Render with fill prop
  if (fill) {
    return (
      <div className="relative overflow-hidden">
        <Image
          {...imageProps}
          fill
          ref={imageRef}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>
    );
  }

  // Render with explicit dimensions
  if (width && height) {
    return (
      <div className="relative">
        <Image
          {...imageProps}
          width={width}
          height={height}
          ref={imageRef}
        />
        {isLoading && (
          <div 
            className="absolute inset-0 bg-gray-200 animate-pulse"
            style={{ width, height }}
          />
        )}
      </div>
    );
  }

  // Fallback: render with intrinsic dimensions
  return (
    <div className="relative">
      <Image
        {...imageProps}
        width={800} // Default width
        height={600} // Default height
        ref={imageRef}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;
