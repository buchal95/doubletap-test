/**
 * Custom Hook for Form Tracking
 * 
 * Hook for managing form analytics tracking
 * Used by Contact component
 */

import { useState, useCallback } from 'react';
import { 
  trackFormStart, 
  trackFormInteraction, 
  trackFormSubmit, 
  trackFormSuccess, 
  trackFormError 
} from '../utils/dataLayer';
import type { ContactFormData, FormSuccessData } from '../types';

interface UseFormTrackingOptions {
  formName?: string;
}

interface UseFormTrackingReturn {
  formStarted: boolean;
  handleFormStart: () => void;
  handleFieldInteraction: (fieldName: string, value: string | boolean) => void;
  handleFormSubmit: (formData: ContactFormData) => void;
  handleFormSuccess: (data: FormSuccessData) => void;
  handleFormError: (errorMessage: string, formData?: Partial<ContactFormData>) => void;
}

export function useFormTracking(options: UseFormTrackingOptions = {}): UseFormTrackingReturn {
  const { formName = 'course_registration' } = options;
  const [formStarted, setFormStarted] = useState(false);

  const handleFormStart = useCallback(() => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart();
    }
  }, [formStarted]);

  const handleFieldInteraction = useCallback((fieldName: string, value: string | boolean) => {
    handleFormStart(); // Ensure form start is tracked
    trackFormInteraction(fieldName, typeof value === 'string' ? value : value.toString());
  }, [handleFormStart]);

  const handleFormSubmit = useCallback((formData: ContactFormData) => {
    trackFormSubmit({
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone
    });
  }, []);

  const handleFormSuccess = useCallback((data: FormSuccessData) => {
    trackFormSuccess(data);
  }, []);

  const handleFormError = useCallback((errorMessage: string, formData?: Partial<ContactFormData>) => {
    trackFormError(errorMessage, formData ? {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone
    } : {});
  }, []);

  return {
    formStarted,
    handleFormStart,
    handleFieldInteraction,
    handleFormSubmit,
    handleFormSuccess,
    handleFormError
  };
}
