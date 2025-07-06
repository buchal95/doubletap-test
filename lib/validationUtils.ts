/**
 * Validation Utility Functions
 * 
 * Functions for form validation and data validation
 */

import { REGEX_PATTERNS, FIELD_CONSTRAINTS, VALIDATION_MESSAGES } from '../constants';
import type { ContactFormData, FormValidationError } from '../types';

/**
 * Validate email address
 */
export function validateEmail(email: string): FormValidationError | null {
  if (!email.trim()) {
    return { field: 'email', message: VALIDATION_MESSAGES.REQUIRED_FIELDS };
  }
  
  if (email.length > FIELD_CONSTRAINTS.EMAIL.MAX_LENGTH) {
    return { field: 'email', message: 'E-mail je příliš dlouhý' };
  }
  
  if (!REGEX_PATTERNS.EMAIL.test(email)) {
    return { field: 'email', message: VALIDATION_MESSAGES.INVALID_EMAIL };
  }
  
  return null;
}

/**
 * Validate first name
 */
export function validateFirstName(firstName: string): FormValidationError | null {
  if (!firstName.trim()) {
    return { field: 'firstName', message: VALIDATION_MESSAGES.REQUIRED_FIELDS };
  }
  
  if (firstName.length < FIELD_CONSTRAINTS.FIRST_NAME.MIN_LENGTH) {
    return { field: 'firstName', message: `Jméno musí mít alespoň ${FIELD_CONSTRAINTS.FIRST_NAME.MIN_LENGTH} znaky` };
  }
  
  if (firstName.length > FIELD_CONSTRAINTS.FIRST_NAME.MAX_LENGTH) {
    return { field: 'firstName', message: `Jméno může mít maximálně ${FIELD_CONSTRAINTS.FIRST_NAME.MAX_LENGTH} znaků` };
  }
  
  return null;
}

/**
 * Validate last name
 */
export function validateLastName(lastName: string): FormValidationError | null {
  if (!lastName.trim()) {
    return { field: 'lastName', message: VALIDATION_MESSAGES.REQUIRED_FIELDS };
  }
  
  if (lastName.length < FIELD_CONSTRAINTS.LAST_NAME.MIN_LENGTH) {
    return { field: 'lastName', message: `Příjmení musí mít alespoň ${FIELD_CONSTRAINTS.LAST_NAME.MIN_LENGTH} znaky` };
  }
  
  if (lastName.length > FIELD_CONSTRAINTS.LAST_NAME.MAX_LENGTH) {
    return { field: 'lastName', message: `Příjmení může mít maximálně ${FIELD_CONSTRAINTS.LAST_NAME.MAX_LENGTH} znaků` };
  }
  
  return null;
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): FormValidationError | null {
  if (!phone.trim()) {
    return { field: 'phone', message: VALIDATION_MESSAGES.REQUIRED_FIELDS };
  }
  
  const cleanedPhone = phone.replace(/\s/g, '');
  
  if (cleanedPhone.length < FIELD_CONSTRAINTS.PHONE.MIN_LENGTH) {
    return { field: 'phone', message: 'Telefonní číslo je příliš krátké' };
  }
  
  if (cleanedPhone.length > FIELD_CONSTRAINTS.PHONE.MAX_LENGTH) {
    return { field: 'phone', message: 'Telefonní číslo je příliš dlouhé' };
  }
  
  if (!REGEX_PATTERNS.PHONE_GENERAL.test(cleanedPhone)) {
    return { field: 'phone', message: VALIDATION_MESSAGES.INVALID_PHONE };
  }
  
  return null;
}

/**
 * Validate consent checkbox
 */
export function validateConsent(consent: boolean): FormValidationError | null {
  if (!consent) {
    return { field: 'consent', message: VALIDATION_MESSAGES.CONSENT_REQUIRED };
  }
  
  return null;
}

/**
 * Validate preferred month
 */
export function validatePreferredMonth(month: string, availableMonths: string[]): FormValidationError | null {
  if (!month.trim()) {
    return { field: 'preferredMonth', message: 'Vyberte preferovaný měsíc' };
  }
  
  if (!availableMonths.includes(month)) {
    return { field: 'preferredMonth', message: 'Vybraný měsíc není dostupný' };
  }
  
  return null;
}

/**
 * Validate entire contact form
 */
export function validateContactForm(
  formData: ContactFormData, 
  preferredMonth: string, 
  availableMonths: string[]
): FormValidationError[] {
  const errors: FormValidationError[] = [];
  
  // Validate each field
  const firstNameError = validateFirstName(formData.firstName);
  if (firstNameError) errors.push(firstNameError);
  
  const lastNameError = validateLastName(formData.lastName);
  if (lastNameError) errors.push(lastNameError);
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.push(emailError);
  
  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.push(phoneError);
  
  const consentError = validateConsent(formData.consent);
  if (consentError) errors.push(consentError);
  
  const monthError = validatePreferredMonth(preferredMonth, availableMonths);
  if (monthError) errors.push(monthError);
  
  return errors;
}

/**
 * Check if form has any validation errors
 */
export function hasValidationErrors(errors: FormValidationError[]): boolean {
  return errors.length > 0;
}

/**
 * Get error message for a specific field
 */
export function getFieldError(errors: FormValidationError[], fieldName: string): string | null {
  const error = errors.find(err => err.field === fieldName);
  return error ? error.message : null;
}

/**
 * Get all error messages as a single string
 */
export function getAllErrorMessages(errors: FormValidationError[]): string {
  return errors.map(err => err.message).join(', ');
}
