/**
 * Reusable Month Selector Component
 * 
 * Radio button group for selecting preferred course month
 */

import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { VALIDATION_MESSAGES } from '../../../constants';

interface MonthSelectorProps {
  label?: string;
  availableMonths: string[];
  selectedMonth: string;
  isLoading?: boolean;
  error?: string | null;
  required?: boolean;
  disabled?: boolean;
  onMonthChange: (month: string) => void;
  onInteraction?: () => void;
  className?: string;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  label = 'Preferovaný měsíc pro absolvování kurzu',
  availableMonths,
  selectedMonth,
  isLoading = false,
  error = null,
  required = false,
  disabled = false,
  onMonthChange,
  onInteraction,
  className = ''
}) => {
  const handleMonthChange = (month: string) => {
    onInteraction?.();
    onMonthChange(month);
  };

  return (
    <div className={className}>
      <p className="block font-montserrat font-medium text-brand-gray mb-4">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      
      {isLoading ? (
        <div className="py-8">
          <LoadingSpinner 
            text={VALIDATION_MESSAGES.LOADING_TERMS}
            centered
          />
        </div>
      ) : availableMonths.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {availableMonths.map((month) => (
            <div key={month} className="flex items-center">
              <input
                type="radio"
                id={`month-${month}`}
                name="preferred-month"
                value={month}
                checked={selectedMonth === month}
                onChange={(e) => handleMonthChange(e.target.value)}
                required={required}
                disabled={disabled}
                className="mr-3 w-4 h-4 text-brand-olive focus:ring-brand-olive disabled:opacity-50"
              />
              <label 
                htmlFor={`month-${month}`} 
                className="text-brand-gray/80 font-montserrat cursor-pointer"
              >
                {month}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <ErrorMessage
          message={error || VALIDATION_MESSAGES.NO_TERMS_AVAILABLE}
          variant="inline"
          size="sm"
        />
      )}
    </div>
  );
};

export default MonthSelector;
