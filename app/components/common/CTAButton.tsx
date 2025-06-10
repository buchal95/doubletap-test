'use client';

import React from 'react';
import { trackCTAClick } from '../../../utils/dataLayer';

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  location?: string; // For tracking where the button was clicked
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  text, 
  onClick,
  className = '',
  type = 'primary',
  disabled = false,
  location = 'unknown'
}) => {
  const baseClasses = "py-3 px-8 rounded-lg font-montserrat font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  const primaryClasses = "bg-brand-red hover:bg-opacity-90 text-white focus:ring-brand-red";
  const secondaryClasses = "bg-white border-2 border-brand-olive text-brand-olive hover:bg-brand-olive hover:bg-opacity-10 focus:ring-brand-olive";
  
  const buttonClasses = `${baseClasses} ${type === 'primary' ? primaryClasses : secondaryClasses} ${className}`;
  
  const handleClick = onClick || (() => {
    // Track CTA click
    trackCTAClick(text, location);
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  return (
    <button 
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default CTAButton;