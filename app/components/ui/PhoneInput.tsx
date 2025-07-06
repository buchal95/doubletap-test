/**
 * Reusable Phone Input Component
 * 
 * Phone input with country prefix dropdown
 */

import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { PhonePrefix } from '../../../types';
import { PHONE_PREFIXES, UI_TEXT } from '../../../constants';
import { usePhoneInput } from '../../../hooks';

interface PhoneInputProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  onPhoneChange?: (fullPhone: string) => void;
  onFocus?: () => void;
  className?: string;
  error?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label = 'Telefon',
  required = false,
  disabled = false,
  onPhoneChange,
  onFocus,
  className = '',
  error
}) => {
  const {
    selectedPrefix,
    phoneNumber,
    showPrefixDropdown,
    setShowPrefixDropdown,
    handlePhoneChange,
    handlePrefixChange
  } = usePhoneInput({ onPhoneChange });

  const borderClasses = error 
    ? 'border-red-500' 
    : 'border-brand-gray/20 focus-within:border-brand-olive';

  return (
    <div className={className}>
      <label htmlFor="phone" className="block font-montserrat font-medium text-brand-gray mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className={`flex rounded-lg border ${borderClasses} focus-within:ring-2 focus-within:ring-brand-olive transition-all`}>
        {/* Country prefix dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPrefixDropdown(!showPrefixDropdown)}
            onFocus={onFocus}
            disabled={disabled}
            className="flex items-center px-3 py-3 bg-brand-beige hover:bg-brand-beige/80 transition-colors min-w-[100px] rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-sm font-montserrat">{selectedPrefix.label}</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          
          {showPrefixDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white border border-brand-gray/20 rounded-lg shadow-lg z-10 mt-1">
              {PHONE_PREFIXES.map((prefix) => (
                <button
                  key={prefix.code}
                  type="button"
                  onClick={() => handlePrefixChange(prefix)}
                  className="w-full px-3 py-2 text-left hover:bg-brand-beige font-montserrat text-sm transition-colors"
                >
                  {prefix.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Phone number input */}
        <input
          type="tel"
          id="phone"
          name="phone"
          required={required}
          disabled={disabled}
          value={phoneNumber}
          onFocus={onFocus}
          onChange={(e) => handlePhoneChange(e.target.value)}
          className="flex-1 px-4 py-3 rounded-r-lg focus:outline-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="123 456 789"
        />
      </div>
      
      {!error && (
        <p className="text-sm text-brand-gray/60 font-montserrat mt-1">
          {UI_TEXT.PHONE_HELP}
        </p>
      )}
      
      {error && (
        <p className="text-sm text-red-600 font-montserrat mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
