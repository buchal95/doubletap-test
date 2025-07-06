/**
 * LoadingSpinner Component Tests
 * 
 * Tests for the LoadingSpinner UI component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../../app/components/ui/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render with default props', () => {
    render(<LoadingSpinner />);

    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('should render with custom text', () => {
    const customText = 'Načítám data...';
    render(<LoadingSpinner text={customText} />);
    
    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it('should apply correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(document.querySelector('.w-4')).toBeInTheDocument();

    rerender(<LoadingSpinner size="lg" />);
    expect(document.querySelector('.w-8')).toBeInTheDocument();
  });

  it('should apply correct color classes', () => {
    const { rerender } = render(<LoadingSpinner color="olive" />);
    expect(document.querySelector('.text-brand-olive')).toBeInTheDocument();

    rerender(<LoadingSpinner color="gray" />);
    expect(document.querySelector('.text-brand-gray')).toBeInTheDocument();
  });

  it('should center when centered prop is true', () => {
    render(<LoadingSpinner centered />);
    expect(document.querySelector('.justify-center')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-spinner-class';
    render(<LoadingSpinner className={customClass} />);
    expect(document.querySelector(`.${customClass}`)).toBeInTheDocument();
  });
});
