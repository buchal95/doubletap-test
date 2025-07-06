/**
 * Custom Hook for Phone Input Management
 * 
 * Hook for managing phone number input with prefix selection
 * Used by Contact component
 */

import { useState, useCallback } from 'react';
import type { PhonePrefix } from '../types';
import { PHONE_PREFIXES } from '../constants';
import { cleanPhoneForDisplay, combinePhoneWithPrefix } from '../lib';

interface UsePhoneInputOptions {
  onPhoneChange?: (fullPhone: string) => void;
  initialPrefix?: PhonePrefix;
}

interface UsePhoneInputReturn {
  selectedPrefix: PhonePrefix;
  phoneNumber: string;
  showPrefixDropdown: boolean;
  fullPhoneNumber: string;
  setShowPrefixDropdown: (show: boolean) => void;
  handlePhoneChange: (value: string) => void;
  handlePrefixChange: (prefix: PhonePrefix) => void;
  clearPhone: () => void;
}

export function usePhoneInput(options: UsePhoneInputOptions = {}): UsePhoneInputReturn {
  const { 
    onPhoneChange,
    initialPrefix = PHONE_PREFIXES[0]
  } = options;

  const [selectedPrefix, setSelectedPrefix] = useState<PhonePrefix>(initialPrefix);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPrefixDropdown, setShowPrefixDropdown] = useState(false);

  // Calculate full phone number
  const fullPhoneNumber = phoneNumber 
    ? combinePhoneWithPrefix(selectedPrefix.code, phoneNumber)
    : '';

  const handlePhoneChange = useCallback((value: string) => {
    const cleaned = cleanPhoneForDisplay(value);
    setPhoneNumber(cleaned);
    
    // Notify parent component of full phone number change
    const fullPhone = combinePhoneWithPrefix(selectedPrefix.code, cleaned);
    onPhoneChange?.(fullPhone);
  }, [selectedPrefix.code, onPhoneChange]);

  const handlePrefixChange = useCallback((prefix: PhonePrefix) => {
    setSelectedPrefix(prefix);
    setShowPrefixDropdown(false);
    
    // Update full phone number with new prefix
    if (phoneNumber) {
      const fullPhone = combinePhoneWithPrefix(prefix.code, phoneNumber);
      onPhoneChange?.(fullPhone);
    }
  }, [phoneNumber, onPhoneChange]);

  const clearPhone = useCallback(() => {
    setPhoneNumber('');
    onPhoneChange?.('');
  }, [onPhoneChange]);

  return {
    selectedPrefix,
    phoneNumber,
    showPrefixDropdown,
    fullPhoneNumber,
    setShowPrefixDropdown,
    handlePhoneChange,
    handlePrefixChange,
    clearPhone
  };
}
