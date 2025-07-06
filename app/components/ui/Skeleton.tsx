/**
 * Skeleton Loading Components
 * 
 * Skeleton placeholders for better perceived performance
 */

import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  animate?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '1rem',
  rounded = false,
  animate = true
}) => {
  const baseClasses = `
    bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
    ${animate ? 'animate-pulse' : ''}
    ${rounded ? 'rounded-full' : 'rounded'}
  `.trim();

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div 
      className={`${baseClasses} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

// Skeleton for text content
export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        height="1rem"
        width={index === lines - 1 ? '75%' : '100%'}
      />
    ))}
  </div>
);

// Skeleton for cards
export const SkeletonCard: React.FC<{
  className?: string;
  showImage?: boolean;
}> = ({ className = '', showImage = true }) => (
  <div className={`p-4 border rounded-lg ${className}`}>
    {showImage && (
      <Skeleton height="12rem" className="mb-4" />
    )}
    <Skeleton height="1.5rem" width="80%" className="mb-2" />
    <SkeletonText lines={2} />
    <div className="flex justify-between items-center mt-4">
      <Skeleton height="2rem" width="6rem" rounded />
      <Skeleton height="2.5rem" width="8rem" />
    </div>
  </div>
);

// Skeleton for form fields
export const SkeletonForm: React.FC<{
  fields?: number;
  className?: string;
}> = ({ fields = 4, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: fields }).map((_, index) => (
      <div key={index}>
        <Skeleton height="1rem" width="25%" className="mb-2" />
        <Skeleton height="3rem" />
      </div>
    ))}
    <Skeleton height="3rem" width="50%" className="mt-6" />
  </div>
);

// Skeleton for calendar events
export const SkeletonCalendar: React.FC<{
  events?: number;
  className?: string;
}> = ({ events = 3, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: events }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
        <Skeleton width="3rem" height="3rem" rounded />
        <div className="flex-1">
          <Skeleton height="1.25rem" width="60%" className="mb-1" />
          <Skeleton height="1rem" width="40%" />
        </div>
        <Skeleton width="6rem" height="2rem" />
      </div>
    ))}
  </div>
);

// Skeleton for hero section
export const SkeletonHero: React.FC<{
  className?: string;
}> = ({ className = '' }) => (
  <div className={`py-20 ${className}`}>
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Skeleton height="3rem" width="80%" className="mb-4 mx-auto" />
        <Skeleton height="2rem" width="60%" className="mb-6 mx-auto" />
        <SkeletonText lines={3} className="mb-8 max-w-2xl mx-auto" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton height="3rem" width="10rem" />
          <Skeleton height="3rem" width="8rem" />
        </div>
      </div>
    </div>
  </div>
);

// Skeleton for navigation
export const SkeletonNav: React.FC<{
  className?: string;
}> = ({ className = '' }) => (
  <nav className={`py-4 ${className}`}>
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Skeleton width="8rem" height="2rem" />
      <div className="hidden md:flex space-x-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} width="4rem" height="1.5rem" />
        ))}
      </div>
      <Skeleton width="6rem" height="2.5rem" />
    </div>
  </nav>
);

// Higher-order component for skeleton loading
export function withSkeleton<T extends object>(
  Component: React.ComponentType<T>,
  SkeletonComponent: React.ComponentType<any>
) {
  return function SkeletonWrapper(props: T & { loading?: boolean }) {
    const { loading, ...componentProps } = props;
    
    if (loading) {
      return <SkeletonComponent />;
    }
    
    return <Component {...(componentProps as T)} />;
  };
}

export default Skeleton;
