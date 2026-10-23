import { describe, it, expect } from 'vitest';
import { rungOf, toneFor } from './tones';
import type { Tone, WineType } from '@/types/wine';

describe('tones utilities', () => {
  describe('rungOf', () => {
    it('returns custom rung for featured wines', () => {
      expect(rungOf('prosecco', 0)).toBe(1);
      expect(rungOf('bacio-della-luna', 0)).toBe(1);
      expect(rungOf('fiano', 2)).toBe(2);
      expect(rungOf('amicone', 3)).toBe(3);
      expect(rungOf('leanfore', 4)).toBe(4);
      expect(rungOf('amarone', 5)).toBe(5);
    });

    it('returns wine body for non-featured wines', () => {
      expect(rungOf('some-other-wine', 3)).toBe(3);
      expect(rungOf('random-wine', 1)).toBe(1);
      expect(rungOf('another-wine', 5)).toBe(5);
    });

    it('returns 0 when wine has no body rating', () => {
      expect(rungOf('unknown-wine', 0)).toBe(0);
    });
  });

  describe('toneFor', () => {
    const wineTypes: WineType[] = ['sparkling', 'white', 'rose', 'red'];

    it('returns a valid Tone object for all wine types', () => {
      wineTypes.forEach(type => {
        const tone = toneFor('test-wine', 3, type);
        expect(tone).toHaveProperty('bg');
        expect(tone).toHaveProperty('fg');
        expect(tone).toHaveProperty('mute');
        expect(tone).toHaveProperty('line');
        expect(tone).toHaveProperty('seg');
        expect(tone).toHaveProperty('segOff');
        expect(tone).toHaveProperty('btnBg');
        expect(tone).toHaveProperty('btnFg');
      });
    });

    it('returns different tones for different body weights', () => {
      const tone1 = toneFor('test', 1, 'red');
      const tone5 = toneFor('test', 5, 'red');
      expect(tone1.bg).not.toBe(tone5.bg);
    });

    it('returns different tones for different wine types', () => {
      const sparklingTone = toneFor('test', 3, 'sparkling');
      const redTone = toneFor('test', 3, 'red');
      expect(sparklingTone.bg).not.toBe(redTone.bg);
    });

    it('uses custom rung for featured wines', () => {
      // prosecco has custom rung of 1, so even with body 3, should get rung 1 tone
      const proseccoTone = toneFor('prosecco', 3, 'sparkling');
      const otherTone = toneFor('other-sparkling', 1, 'sparkling');
      expect(proseccoTone.bg).toBe(otherTone.bg);
    });

    it('handles body 0 (no body rating)', () => {
      wineTypes.forEach(type => {
        const tone = toneFor('no-body-wine', 0, type);
        expect(tone).toBeDefined();
        expect(tone.bg).toBeDefined();
      });
    });

    it('handles all body values 1-5', () => {
      for (let body = 1; body <= 5; body++) {
        wineTypes.forEach(type => {
          const tone = toneFor('test', body, type);
          expect(tone).toBeDefined();
          expect(tone.bg).toBeDefined();
        });
      }
    });

    it('tone properties are CSS variable strings', () => {
      const tone = toneFor('test', 3, 'white');
      expect(tone.bg).toMatch(/var\(--/);
      expect(tone.fg).toMatch(/var\(--/);
    });
  });
});
