/**
 * Accessible Button Component
 * 
 * Fully accessible button with WCAG 2.1 AA compliance
 */

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaPressed?: boolean;
  role?: string;
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  ariaLabel,
  ariaDescribedBy,
  ariaExpanded,
  ariaPressed,
  role,
  className = '',
  children,
  disabled,
  ...props
}, ref) => {
  // Base classes for accessibility
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
    ${fullWidth ? 'w-full' : ''}
  `.trim();

  // Variant styles
  const variantClasses = {
    primary: `
      bg-brand-olive text-white
      hover:bg-brand-olive-dark
      focus:ring-brand-olive
      active:bg-brand-olive-darker
    `,
    secondary: `
      bg-brand-gray text-white
      hover:bg-brand-gray-dark
      focus:ring-brand-gray
      active:bg-brand-gray-darker
    `,
    outline: `
      border-2 border-brand-olive text-brand-olive bg-transparent
      hover:bg-brand-olive hover:text-white
      focus:ring-brand-olive
      active:bg-brand-olive-dark
    `,
    ghost: `
      text-brand-olive bg-transparent
      hover:bg-brand-olive hover:bg-opacity-10
      focus:ring-brand-olive
      active:bg-brand-olive-dark active:bg-opacity-20
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      focus:ring-red-500
      active:bg-red-800
    `
  };

  // Size styles
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[52px]'
  };

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  // Determine if button should be disabled
  const isDisabled = disabled || loading;

  // Accessibility attributes
  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-expanded': ariaExpanded,
    'aria-pressed': ariaPressed,
    'aria-disabled': isDisabled,
    role: role || 'button'
  };

  // Remove undefined values
  Object.keys(accessibilityProps).forEach(key => {
    if (accessibilityProps[key as keyof typeof accessibilityProps] === undefined) {
      delete accessibilityProps[key as keyof typeof accessibilityProps];
    }
  });

  return (
    <button
      ref={ref}
      className={combinedClasses}
      disabled={isDisabled}
      {...accessibilityProps}
      {...props}
    >
      {/* Loading state */}
      {loading && (
        <Loader2 
          className="w-4 h-4 mr-2 animate-spin" 
          aria-hidden="true"
        />
      )}
      
      {/* Left icon */}
      {!loading && leftIcon && (
        <span className="mr-2" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      
      {/* Button content */}
      <span>
        {loading && loadingText ? loadingText : children}
      </span>
      
      {/* Right icon */}
      {!loading && rightIcon && (
        <span className="ml-2" aria-hidden="true">
          {rightIcon}
        </span>
      )}
      
      {/* Screen reader only loading text */}
      {loading && (
        <span className="sr-only">
          {loadingText || 'Načítání...'}
        </span>
      )}
    </button>
  );
});

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;
