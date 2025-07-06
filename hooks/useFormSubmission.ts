/**
 * Custom Hook for Form Submission
 * 
 * Hook for handling form submission with API service integration
 */

import { useState, useCallback } from 'react';
import type { ContactFormSubmission, OrderResponse } from '../types';
import { VALIDATION_MESSAGES } from '../constants';
import { orderService, ApiError } from '../lib/apiService';

interface UseFormSubmissionOptions {
  onSuccess?: (response: OrderResponse) => void;
  onError?: (error: string) => void;
  redirectUrl?: string;
}

interface UseFormSubmissionReturn {
  isSubmitting: boolean;
  submitMessage: string;
  submitForm: (formData: ContactFormSubmission) => Promise<void>;
  clearMessage: () => void;
}

export function useFormSubmission(options: UseFormSubmissionOptions = {}): UseFormSubmissionReturn {
  const { onSuccess, onError, redirectUrl = '/dekujeme' } = options;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const submitForm = useCallback(async (formData: ContactFormSubmission): Promise<void> => {
    try {
      setIsSubmitting(true);
      setSubmitMessage('');

      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        const errorMsg = VALIDATION_MESSAGES.REQUIRED_FIELDS;
        setSubmitMessage(errorMsg);
        onError?.(errorMsg);
        return;
      }

      // Validate consent
      if (!formData.consent) {
        const errorMsg = VALIDATION_MESSAGES.CONSENT_REQUIRED;
        setSubmitMessage(errorMsg);
        onError?.(errorMsg);
        return;
      }

      // Submit the form
      const result = await orderService.submitOrder(formData);

      if (result.success) {
        onSuccess?.(result);
        
        // Redirect to success page
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      } else {
        const errorMsg = result.error || VALIDATION_MESSAGES.FORM_ERROR;
        setSubmitMessage(errorMsg);
        onError?.(errorMsg);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      let errorMessage: string = VALIDATION_MESSAGES.UNEXPECTED_ERROR;

      if (error instanceof ApiError) {
        errorMessage = error.message;
      }
      
      setSubmitMessage(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [onSuccess, onError, redirectUrl]);

  const clearMessage = useCallback(() => {
    setSubmitMessage('');
  }, []);

  return {
    isSubmitting,
    submitMessage,
    submitForm,
    clearMessage
  };
}
