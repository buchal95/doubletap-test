import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  centered = true,
  className = ''
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-anton text-brand-gray mb-4 leading-tight">{title}</h2>
      {subtitle && <p className="text-xl font-montserrat text-brand-gray/80 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;