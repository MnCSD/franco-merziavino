import { describe, it, expect } from 'vitest';
import { getDictionary } from './index';

describe('dictionaries', () => {
  describe('getDictionary', () => {
    it('returns Greek dictionary for el locale', () => {
      const dict = getDictionary('el');
      expect(dict).toBeDefined();
      expect(typeof dict).toBe('object');
    });

    it('returns English dictionary for en locale', () => {
      const dict = getDictionary('en');
      expect(dict).toBeDefined();
      expect(typeof dict).toBe('object');
    });

    it('Greek and English dictionaries have same keys', () => {
      const elDict = getDictionary('el');
      const enDict = getDictionary('en');

      const elKeys = Object.keys(elDict).sort();
      const enKeys = Object.keys(enDict).sort();

      expect(elKeys).toEqual(enKeys);
    });

    it('dictionaries contain wineType translations', () => {
      const elDict = getDictionary('el');
      const enDict = getDictionary('en');

      expect(elDict.wineType).toBeDefined();
      expect(enDict.wineType).toBeDefined();

      expect(elDict.wineType.sparkling).toBeDefined();
      expect(elDict.wineType.white).toBeDefined();
      expect(elDict.wineType.rose).toBeDefined();
      expect(elDict.wineType.red).toBeDefined();
    });

    it('has wine section with organic label', () => {
      const elDict = getDictionary('el');
      const enDict = getDictionary('en');

      expect(elDict.wine?.organic).toBeDefined();
      expect(enDict.wine?.organic).toBeDefined();
    });
  });
});
