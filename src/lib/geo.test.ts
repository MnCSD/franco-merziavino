import { describe, it, expect } from 'vitest';
import { GEO_IDS, GEO_NAMES, geoOf, isGeoId, GEO_LABEL, type GeoId } from './geo';

describe('geo utilities', () => {
  describe('GEO_IDS', () => {
    it('contains all expected Italian regions', () => {
      expect(GEO_IDS).toContain('Piemonte');
      expect(GEO_IDS).toContain('Trentino');
      expect(GEO_IDS).toContain('Veneto');
      expect(GEO_IDS).toContain('Friuli');
      expect(GEO_IDS).toContain('Toscana');
      expect(GEO_IDS).toContain('Abruzzo');
      expect(GEO_IDS).toContain('Campania');
      expect(GEO_IDS).toContain('Puglia');
      expect(GEO_IDS).toContain('Sicilia');
    });

    it('has 9 regions', () => {
      expect(GEO_IDS.length).toBe(9);
    });
  });

  describe('GEO_NAMES', () => {
    it('has entries for all GEO_IDS', () => {
      GEO_IDS.forEach(id => {
        expect(GEO_NAMES[id]).toBeDefined();
      });
    });

    it('has Greek and English translations for each region', () => {
      GEO_IDS.forEach(id => {
        expect(GEO_NAMES[id].el).toBeDefined();
        expect(GEO_NAMES[id].en).toBeDefined();
        expect(Array.isArray(GEO_NAMES[id].el)).toBe(true);
        expect(Array.isArray(GEO_NAMES[id].en)).toBe(true);
        expect(GEO_NAMES[id].el.length).toBe(2); // [name, area]
        expect(GEO_NAMES[id].en.length).toBe(2); // [name, area]
      });
    });

    it('Piedmont has correct translations', () => {
      expect(GEO_NAMES.Piemonte.en[0]).toBe('Piedmont');
      expect(GEO_NAMES.Piemonte.en[1]).toBe('North');
    });

    it('Sicily has correct translations', () => {
      expect(GEO_NAMES.Sicilia.en[0]).toBe('Sicily');
      expect(GEO_NAMES.Sicilia.en[1]).toBe('Islands');
    });
  });

  describe('geoOf', () => {
    it('maps Greek region names to geo IDs', () => {
      expect(geoOf('Πιεμόντε')).toEqual(['Piemonte']);
      expect(geoOf('Βένετο')).toEqual(['Veneto']);
      expect(geoOf('Σικελία')).toEqual(['Sicilia']);
      expect(geoOf('Τοσκάνη')).toEqual(['Toscana']);
    });

    it('handles multi-region mappings', () => {
      expect(geoOf('Τρεντίνο · Βένετο')).toEqual(['Trentino', 'Veneto']);
      expect(geoOf('Delle Venezie')).toEqual(['Veneto', 'Friuli', 'Trentino']);
    });

    it('returns empty array for unknown regions', () => {
      expect(geoOf('Unknown Region')).toEqual([]);
      expect(geoOf('')).toEqual([]);
    });
  });

  describe('isGeoId', () => {
    it('returns true for valid geo IDs', () => {
      GEO_IDS.forEach(id => {
        expect(isGeoId(id)).toBe(true);
      });
    });

    it('returns false for invalid geo IDs', () => {
      expect(isGeoId('Lombardia')).toBe(false);
      expect(isGeoId('Roma')).toBe(false);
      expect(isGeoId('unknown')).toBe(false);
      expect(isGeoId('')).toBe(false);
    });

    it('returns false for null', () => {
      expect(isGeoId(null)).toBe(false);
    });

    it('is case sensitive', () => {
      expect(isGeoId('piemonte')).toBe(false);
      expect(isGeoId('VENETO')).toBe(false);
    });
  });

  describe('GEO_LABEL', () => {
    it('has label offsets for all geo IDs', () => {
      GEO_IDS.forEach(id => {
        expect(GEO_LABEL[id]).toBeDefined();
        expect(Array.isArray(GEO_LABEL[id])).toBe(true);
        expect(GEO_LABEL[id].length).toBe(3);
      });
    });

    it('label offsets have correct structure [dx, dy, anchor]', () => {
      GEO_IDS.forEach(id => {
        const [dx, dy, anchor] = GEO_LABEL[id];
        expect(typeof dx).toBe('number');
        expect(typeof dy).toBe('number');
        expect(['start', 'middle', 'end']).toContain(anchor);
      });
    });
  });
});
