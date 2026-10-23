import { describe, it, expect } from 'vitest';
import { LOCALES, DEFAULT_LOCALE, isLocale } from './config';

describe('i18n config', () => {
  describe('LOCALES', () => {
    it('contains el and en', () => {
      expect(LOCALES).toContain('el');
      expect(LOCALES).toContain('en');
    });

    it('has exactly 2 locales', () => {
      expect(LOCALES.length).toBe(2);
    });
  });

  describe('DEFAULT_LOCALE', () => {
    it('is Greek (el)', () => {
      expect(DEFAULT_LOCALE).toBe('el');
    });

    it('is included in LOCALES', () => {
      expect(LOCALES).toContain(DEFAULT_LOCALE);
    });
  });

  describe('isLocale', () => {
    it('returns true for valid locales', () => {
      expect(isLocale('el')).toBe(true);
      expect(isLocale('en')).toBe(true);
    });

    it('returns false for invalid locales', () => {
      expect(isLocale('fr')).toBe(false);
      expect(isLocale('de')).toBe(false);
      expect(isLocale('ES')).toBe(false);
      expect(isLocale('')).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isLocale(undefined)).toBe(false);
    });

    it('is case sensitive', () => {
      expect(isLocale('EL')).toBe(false);
      expect(isLocale('EN')).toBe(false);
    });
  });
});
