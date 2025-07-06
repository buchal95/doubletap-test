/**
 * Reusable Error Message Component
 * 
 * Provides consistent error display across the application
 */

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import type { BaseComponentProps } from '../../../types';

interface ErrorMessageProps extends BaseComponentProps {
  title?: string;
  message: string;
  showRetry?: boolean;
  onRetry?: () => void;
  variant?: 'inline' | 'card';
  size?: 'sm' | 'md' | 'lg';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Chyba',
  message,
  showRetry = false,
  onRetry,
  variant = 'inline',
  size = 'md',
  className = ''
}) => {
  const baseClasses = "bg-red-50 border border-red-200 rounded-lg";
  
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const cardClasses = variant === 'card' 
    ? 'shadow-sm' 
    : '';

  const containerClasses = `${baseClasses} ${sizeClasses[size]} ${cardClasses} ${className}`;

  return (
    <div className={containerClasses}>
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          {title && (
            <h4 className="font-anton text-red-700 mb-1">
              {title}
            </h4>
          )}
          <p className="text-red-600 font-montserrat text-sm leading-relaxed">
            {message}
          </p>
          
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center mt-3 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-montserrat text-sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Zkusit znovu
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
