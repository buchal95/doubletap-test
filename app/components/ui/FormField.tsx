/**
 * Reusable Form Field Component
 * 
 * Provides consistent styling and behavior for form inputs
 */

import React from 'react';
import type { BaseComponentProps } from '../../../types';
import { useMobileOptimization } from '../../../hooks/useMobileOptimization';

interface FormFieldProps extends BaseComponentProps {
  label: string;
  id: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'password';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  error?: string;
  helpText?: string;
  mobileOptimized?: boolean;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal' | 'search' | 'url';
  onFocus?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  value,
  error,
  helpText,
  mobileOptimized = true,
  autoComplete,
  inputMode,
  className = '',
  onFocus,
  onChange
}) => {
  const { isMobile, touchSupported } = useMobileOptimization();
  // Mobile-optimized classes
  const mobileClasses = mobileOptimized && isMobile ? "text-base" : ""; // Prevent zoom on iOS
  const touchClasses = touchSupported ? "touch-manipulation" : "";

  const baseInputClasses = `
    w-full px-4 py-3 border rounded-lg
    focus:ring-2 focus:ring-brand-olive focus:border-brand-olive
    font-montserrat transition-colors
    ${mobileClasses} ${touchClasses}
  `.trim();

  const errorClasses = error ? "border-red-500" : "border-brand-gray/20";
  const disabledClasses = disabled ? "disabled:opacity-50 disabled:cursor-not-allowed" : "";

  // Auto-detect input mode based on type
  const getInputMode = () => {
    if (inputMode) return inputMode;
    switch (type) {
      case 'email': return 'email';
      case 'tel': return 'tel';
      default: return 'text';
    }
  };

  // Auto-detect autocomplete
  const getAutoComplete = () => {
    if (autoComplete) return autoComplete;
    switch (type) {
      case 'email': return 'email';
      case 'tel': return 'tel';
      default: return name;
    }
  };
  
  const inputClasses = `${baseInputClasses} ${errorClasses} ${disabledClasses}`;

  return (
    <div className={className}>
      <label 
        htmlFor={id} 
        className="block font-montserrat font-medium text-brand-gray mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={getAutoComplete()}
        inputMode={getInputMode()}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
        onFocus={onFocus}
        onChange={onChange}
        className={inputClasses}
      />
      
      {helpText && !error && (
        <p
          id={`${id}-help`}
          className="text-sm text-brand-gray/60 font-montserrat mt-1"
        >
          {helpText}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-600 font-montserrat mt-1"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
