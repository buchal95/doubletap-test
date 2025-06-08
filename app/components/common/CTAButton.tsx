'use client';

import React from 'react';

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: 'primary' | 'secondary';
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  text, 
  className = '',
  type = 'primary'
}) => {
  const baseClasses = "py-3 px-8 rounded-lg font-montserrat font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const primaryClasses = "bg-brand-red hover:bg-opacity-90 text-white focus:ring-brand-red";
  const secondaryClasses = "bg-white border-2 border-brand-olive text-brand-olive hover:bg-brand-olive hover:bg-opacity-10 focus:ring-brand-olive";
  
  const buttonClasses = `${baseClasses} ${type === 'primary' ? primaryClasses : secondaryClasses} ${className}`;
  
  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <button 
      className={buttonClasses}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default CTAButton;