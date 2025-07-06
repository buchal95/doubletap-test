/**
 * Reusable Loading Spinner Component
 * 
 * Provides consistent loading states across the application
 */

import React from 'react';
import { Loader2 } from 'lucide-react';
import type { BaseComponentProps } from '../../../types';

interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  color?: 'olive' | 'gray' | 'white';
  centered?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  color = 'olive',
  centered = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    olive: 'text-brand-olive',
    gray: 'text-brand-gray',
    white: 'text-white'
  };

  const containerClasses = centered 
    ? 'flex items-center justify-center' 
    : 'flex items-center';

  return (
    <div className={`${containerClasses} ${className}`}>
      <Loader2 className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`} />
      {text && (
        <span className={`ml-2 font-montserrat ${colorClasses[color]}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
