/**
 * Date Utilities Tests
 * 
 * Tests for date manipulation and formatting functions
 */

import {
  getDaysDifference,
  isEventBookable,
  extractUniqueMonths,
  generateFallbackMonths,
  formatDateRange,
  formatNextEventDate
} from '../../lib/dateUtils';
import { MONTHS_CZ } from '../../constants';

describe('Date Utils', () => {
  describe('getDaysDifference', () => {
    it('should calculate correct day differences', () => {
      const date1 = new Date('2024-01-15');
      const date2 = new Date('2024-01-10');
      expect(getDaysDifference(date1, date2)).toBe(5);
    });

    it('should handle negative differences', () => {
      const date1 = new Date('2024-01-10');
      const date2 = new Date('2024-01-15');
      expect(getDaysDifference(date1, date2)).toBe(-5);
    });
  });

  describe('isEventBookable', () => {
    it('should return true for events far enough in future', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 35);
      expect(isEventBookable(futureDate, 30)).toBe(true);
    });

    it('should return false for events too soon', () => {
      const soonDate = new Date();
      soonDate.setDate(soonDate.getDate() + 15);
      expect(isEventBookable(soonDate, 30)).toBe(false);
    });
  });

  describe('extractUniqueMonths', () => {
    it('should extract unique month names', () => {
      const dates = [
        new Date('2024-03-15'),
        new Date('2024-03-20'),
        new Date('2024-04-10'),
        new Date('2024-04-25')
      ];
      
      const months = extractUniqueMonths(dates, MONTHS_CZ);
      expect(months).toEqual(['Březen', 'Duben']);
    });

    it('should handle empty array', () => {
      const months = extractUniqueMonths([], MONTHS_CZ);
      expect(months).toEqual([]);
    });
  });

  describe('generateFallbackMonths', () => {
    it('should generate fallback months', () => {
      const months = generateFallbackMonths(MONTHS_CZ, 3, 30);
      expect(months).toHaveLength(3);
      expect(months.every(month => (MONTHS_CZ as readonly string[]).includes(month))).toBe(true);
    });
  });

  describe('formatDateRange', () => {
    it('should format single day events', () => {
      const result = formatDateRange(
        '2024-03-15T09:00:00Z',
        '2024-03-15T17:00:00Z',
        false
      );
      
      expect(result.dateRange).toContain('března');
      expect(result.timeRange).toContain('10:00');
    });

    it('should format multi-day events', () => {
      const result = formatDateRange(
        '2024-03-15T09:00:00Z',
        '2024-03-18T17:00:00Z',
        false
      );
      
      expect(result.dateRange).toContain('15.–18. března');
    });

    it('should handle all-day events', () => {
      const result = formatDateRange(
        '2024-03-15T00:00:00Z',
        '2024-03-16T00:00:00Z',
        true
      );
      
      expect(result.timeRange).toBeUndefined();
    });
  });

  describe('formatNextEventDate', () => {
    it('should format event date correctly', () => {
      const formatted = formatNextEventDate('2024-03-15T09:00:00Z');
      expect(formatted).toContain('15. března 2024');
    });
  });
});
