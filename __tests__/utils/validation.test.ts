/**
 * Validation Utilities Tests
 * 
 * Tests for form validation functions
 */

import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhone,
  validateConsent,
  validateContactForm
} from '../../lib/validationUtils';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBeNull();
      expect(validateEmail('user.name@domain.cz')).toBeNull();
      expect(validateEmail('test+tag@example.org')).toBeNull();
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('')).toEqual({
        field: 'email',
        message: 'Všechna povinná pole musí být vyplněna'
      });
      expect(validateEmail('invalid-email')).toEqual({
        field: 'email',
        message: 'Neplatný formát e-mailové adresy'
      });
      expect(validateEmail('test@')).toEqual({
        field: 'email',
        message: 'Neplatný formát e-mailové adresy'
      });
    });
  });

  describe('validateFirstName', () => {
    it('should validate correct first names', () => {
      expect(validateFirstName('Jan')).toBeNull();
      expect(validateFirstName('Marie')).toBeNull();
      expect(validateFirstName('Tomáš')).toBeNull();
    });

    it('should reject invalid first names', () => {
      expect(validateFirstName('')).toEqual({
        field: 'firstName',
        message: 'Všechna povinná pole musí být vyplněna'
      });
      expect(validateFirstName('A')).toEqual({
        field: 'firstName',
        message: 'Jméno musí mít alespoň 2 znaky'
      });
    });
  });

  describe('validateLastName', () => {
    it('should validate correct last names', () => {
      expect(validateLastName('Novák')).toBeNull();
      expect(validateLastName('Svoboda')).toBeNull();
      expect(validateLastName('Dvořák')).toBeNull();
    });

    it('should reject invalid last names', () => {
      expect(validateLastName('')).toEqual({
        field: 'lastName',
        message: 'Všechna povinná pole musí být vyplněna'
      });
      expect(validateLastName('A')).toEqual({
        field: 'lastName',
        message: 'Příjmení musí mít alespoň 2 znaky'
      });
    });
  });

  describe('validatePhone', () => {
    it('should validate correct phone numbers', () => {
      expect(validatePhone('+420123456789')).toBeNull();
      expect(validatePhone('+421987654321')).toBeNull();
    });

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('')).toEqual({
        field: 'phone',
        message: 'Všechna povinná pole musí být vyplněna'
      });
      expect(validatePhone('123')).toEqual({
        field: 'phone',
        message: 'Telefonní číslo je příliš krátké'
      });
      expect(validatePhone('invalid-phone')).toEqual({
        field: 'phone',
        message: 'Neplatný formát telefonního čísla'
      });
    });
  });

  describe('validateConsent', () => {
    it('should validate consent', () => {
      expect(validateConsent(true)).toBeNull();
    });

    it('should reject missing consent', () => {
      expect(validateConsent(false)).toEqual({
        field: 'consent',
        message: 'Musíte souhlasit se zpracováním osobních údajů'
      });
    });
  });

  describe('validateContactForm', () => {
    const validFormData = {
      firstName: 'Jan',
      lastName: 'Novák',
      email: 'jan@example.cz',
      phone: '+420123456789',
      consent: true
    };

    it('should validate complete valid form', () => {
      const errors = validateContactForm(validFormData, 'Březen', ['Březen', 'Duben']);
      expect(errors).toHaveLength(0);
    });

    it('should return errors for invalid form', () => {
      const invalidFormData = {
        firstName: '',
        lastName: 'A',
        email: 'invalid-email',
        phone: '123',
        consent: false
      };

      const errors = validateContactForm(invalidFormData, '', []);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'firstName')).toBe(true);
      expect(errors.some(e => e.field === 'lastName')).toBe(true);
      expect(errors.some(e => e.field === 'email')).toBe(true);
      expect(errors.some(e => e.field === 'phone')).toBe(true);
      expect(errors.some(e => e.field === 'consent')).toBe(true);
    });
  });
});
