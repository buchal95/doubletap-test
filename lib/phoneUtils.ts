/**
 * Phone Number Utility Functions
 * 
 * Functions for phone number validation, formatting, and processing
 */

import { REGEX_PATTERNS } from '../constants';
import type { PhonePrefix } from '../types';

/**
 * Clean phone number for display (remove non-digits except spaces and dashes)
 */
export function cleanPhoneForDisplay(phone: string): string {
  return phone.replace(REGEX_PATTERNS.PHONE_CLEANUP, '');
}

/**
 * Clean phone number for submission (remove spaces and dashes)
 */
export function cleanPhoneForSubmission(phone: string): string {
  return phone.replace(REGEX_PATTERNS.PHONE_DIGITS_ONLY, '');
}

/**
 * Combine prefix and phone number
 */
export function combinePhoneWithPrefix(prefix: string, phone: string): string {
  const cleanedPhone = cleanPhoneForSubmission(phone);
  return prefix + cleanedPhone;
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): boolean {
  const cleanedPhone = phone.replace(/\s/g, '');
  return REGEX_PATTERNS.PHONE_GENERAL.test(cleanedPhone);
}

/**
 * Format phone number for advanced matching (Meta Pixel)
 */
export function formatPhoneForMatching(phone: string): string {
  // Remove all spaces, dashes, parentheses
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // If starts with +, keep it
  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  
  // If starts with 420 or 421, add +
  if (cleaned.startsWith('420') || cleaned.startsWith('421')) {
    return '+' + cleaned;
  }
  
  // If starts with 00420 or 00421, replace with +
  if (cleaned.startsWith('00420')) {
    return '+420' + cleaned.substring(5);
  }
  if (cleaned.startsWith('00421')) {
    return '+421' + cleaned.substring(5);
  }
  
  // If 9 digits and starts with 6,7,9 (Czech mobile), add +420
  if (cleaned.length === 9 && /^[679]/.test(cleaned)) {
    return '+420' + cleaned;
  }
  
  // If 9 digits and starts with 9 (Slovak mobile), add +421
  if (cleaned.length === 9 && cleaned.startsWith('9')) {
    return '+421' + cleaned;
  }
  
  // Default to +420 for other 9-digit numbers
  if (cleaned.length === 9) {
    return '+420' + cleaned;
  }
  
  return cleaned;
}

/**
 * Get phone prefix from full phone number
 */
export function extractPhonePrefix(phone: string, prefixes: PhonePrefix[]): PhonePrefix | null {
  const cleanedPhone = phone.replace(/\s/g, '');
  
  for (const prefix of prefixes) {
    if (cleanedPhone.startsWith(prefix.code)) {
      return prefix;
    }
  }
  
  return null;
}

/**
 * Get phone number without prefix
 */
export function getPhoneWithoutPrefix(phone: string, prefix: string): string {
  const cleanedPhone = phone.replace(/\s/g, '');
  
  if (cleanedPhone.startsWith(prefix)) {
    return cleanedPhone.substring(prefix.length);
  }
  
  return cleanedPhone;
}

/**
 * Validate Czech phone number specifically
 */
export function validateCzechPhone(phone: string): boolean {
  return REGEX_PATTERNS.PHONE_CZ.test(phone.replace(/\s/g, ''));
}

/**
 * Validate Slovak phone number specifically
 */
export function validateSlovakPhone(phone: string): boolean {
  return REGEX_PATTERNS.PHONE_SK.test(phone.replace(/\s/g, ''));
}
