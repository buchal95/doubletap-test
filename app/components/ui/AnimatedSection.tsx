/**
 * Animated Section Component
 *
 * Wrapper component for sections with scroll-triggered animations
 */

import React from 'react';
import { useAnimation, useCSSAnimations } from '../../../hooks/useAnimations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideUp';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  triggerOnce?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  triggerOnce = true
}) => {
  // Initialize CSS animations
  useCSSAnimations();

  // Use animation hook
  const { ref, isVisible } = useAnimation({
    threshold,
    delay,
    triggerOnce
  });

  // Animation classes
  const animationClasses = {
    fadeIn: 'animate-fade-in',
    fadeInUp: 'animate-slide-up',
    fadeInDown: 'animate-slide-down',
    fadeInLeft: 'animate-slide-left',
    fadeInRight: 'animate-slide-right',
    scaleIn: 'animate-scale-in',
    slideUp: 'animate-slide-up'
  };

  const baseClasses = `
    transition-all duration-${duration}
    ${isVisible ? animationClasses[animation] : 'opacity-0'}
    ${className}
  `.trim();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={baseClasses}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
