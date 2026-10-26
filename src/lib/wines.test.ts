import { describe, it, expect } from 'vitest';
import { byTypeRank, localize, featured, findWine, slugs, makers, filterWines, filtersToQuery, bestsellers, type WineFilters } from './wines';
import { WINES } from '@/data/wines';
import { WINERIES } from '@/data/wineries';

describe('wines utilities', () => {
  describe('localize', () => {
    it('returns localized wines for Greek locale', () => {
      const wines = localize('el');
      expect(wines.length).toBeGreaterThan(0);
      expect(wines[0]).toHaveProperty('slug');
      expect(wines[0]).toHaveProperty('name');
      expect(wines[0]).toHaveProperty('type');
      expect(wines[0]).toHaveProperty('tone');
      expect(wines[0]).toHaveProperty('image');
    });

    it('returns localized wines for English locale', () => {
      const wines = localize('en');
      expect(wines.length).toBeGreaterThan(0);
    });

    it('includes index and num fields', () => {
      const wines = localize('el');
      expect(wines[0].index).toBe(0);
      expect(wines[0].num).toBe('01');
      if (wines.length > 9) {
        expect(wines[9].num).toBe('10');
      }
    });

    it('translates awards for English locale', () => {
      const wines = localize('en');
      const wineWithAward = wines.find(w => w.award);
      if (wineWithAward?.award?.includes('βαθμοί')) {
        throw new Error('Award should be translated to English');
      }
    });

    it('generates correct image paths', () => {
      const wines = localize('el');
      wines.forEach(w => {
        expect(w.image).toMatch(/^\/images\/bottles\/[\w-]+\.webp$/);
      });
    });
  });

  describe('featured', () => {
    it('returns only featured wines', () => {
      const featuredWines = featured('el');
      expect(featuredWines.length).toBeGreaterThan(0);
      featuredWines.forEach(w => {
        expect(w.featured).toBe(true);
      });
    });

    it('returns same wines for both locales', () => {
      const elFeatured = featured('el');
      const enFeatured = featured('en');
      expect(elFeatured.length).toBe(enFeatured.length);
      expect(elFeatured.map(w => w.slug)).toEqual(enFeatured.map(w => w.slug));
    });
  });

  describe('findWine', () => {
    it('returns wine with prev/next for valid slug', () => {
      const allWines = localize('el');
      const result = findWine('el', allWines[1].slug);
      expect(result).not.toBeNull();
      expect(result!.wine.slug).toBe(allWines[1].slug);
      expect(result!.prev.slug).toBe(allWines[0].slug);
      expect(result!.next.slug).toBe(allWines[2].slug);
    });

    it('wraps around for first wine', () => {
      const allWines = localize('el');
      const result = findWine('el', allWines[0].slug);
      expect(result!.prev.slug).toBe(allWines[allWines.length - 1].slug);
    });

    it('wraps around for last wine', () => {
      const allWines = localize('el');
      const result = findWine('el', allWines[allWines.length - 1].slug);
      expect(result!.next.slug).toBe(allWines[0].slug);
    });

    it('returns null for invalid slug', () => {
      const result = findWine('el', 'non-existent-wine');
      expect(result).toBeNull();
    });
  });

  describe('slugs', () => {
    it('returns array of wine slugs', () => {
      const allSlugs = slugs();
      expect(Array.isArray(allSlugs)).toBe(true);
      expect(allSlugs.length).toBeGreaterThan(0);
      allSlugs.forEach(slug => {
        expect(typeof slug).toBe('string');
        expect(slug.length).toBeGreaterThan(0);
      });
    });
  });

  describe('makers', () => {
    it('returns unique makers in WINERIES display order', () => {
      const allMakers = makers();
      expect(Array.isArray(allMakers)).toBe(true);
      expect(allMakers.length).toBeGreaterThan(0);

      // Check uniqueness
      const uniqueSet = new Set(allMakers);
      expect(uniqueSet.size).toBe(allMakers.length);

      // Check order and coverage
      const ordered = WINERIES.map((w) => w.name).filter((n) => allMakers.includes(n));
      expect(allMakers).toEqual(ordered);
      expect(new Set(allMakers)).toEqual(new Set(WINES.map((w) => w.maker)));
      expect(allMakers.at(-1)).toBe('Francesca Mara');
    });
  });

  describe('byTypeRank', () => {
    it('orders red, white, rosé, then 0%, with sparkling by colour', () => {
      const all = localize('en');
      const pick = (slug: string) => all.find((w) => w.slug === slug)!;
      const order = byTypeRank(['zero-sparkling-rose', 'rivani-pinot-rose', 'moscato-spumante', 'spritz'].map(pick)).map((w) => w.slug);
      expect(order.slice(0, 2)).toEqual(['moscato-spumante', 'rivani-pinot-rose']);
      expect(order.slice(2).sort()).toEqual(['spritz', 'zero-sparkling-rose']);

      // "Prosecco" contains "rose" but is a white sparkling.
      expect(byTypeRank(['bdl-cuvee-rose', 'bdl-doc-brut'].map(pick)).map((w) => w.slug)).toEqual(['bdl-doc-brut', 'bdl-cuvee-rose']);

      const ranks = byTypeRank(all).map((w) => (w.alcoholFree ? 3 : w.type === 'red' ? 0 : -1));
      expect(ranks.indexOf(3)).toBe(ranks.length - ranks.filter((r) => r === 3).length);
      expect(ranks.lastIndexOf(0)).toBe(ranks.filter((r) => r === 0).length - 1);
    });
  });

  describe('filterWines', () => {
    const wines = localize('el');

    it('returns all wines with default filters', () => {
      const filters: WineFilters = { food: 'all', type: 'all', winery: 'all' };
      const result = filterWines(wines, filters);
      expect(result.length).toBe(wines.length);
    });

    it('filters by wine type', () => {
      const filters: WineFilters = { food: 'all', type: 'red', winery: 'all' };
      const result = filterWines(wines, filters);
      result.forEach(w => {
        expect(w.type).toBe('red');
      });
    });

    it('filters by alcoholFree type', () => {
      const filters: WineFilters = { food: 'all', type: 'alcoholFree', winery: 'all' };
      const result = filterWines(wines, filters);
      result.forEach(w => {
        expect(w.alcoholFree).toBe(true);
      });
    });

    it('filters by premium type', () => {
      const filters: WineFilters = { food: 'all', type: 'premium', winery: 'all' };
      const result = filterWines(wines, filters);
      result.forEach(w => {
        expect(w.premium).toBe(true);
      });
    });

    it('filters by food pairing', () => {
      const filters: WineFilters = { food: 'fish', type: 'all', winery: 'all' };
      const result = filterWines(wines, filters);
      result.forEach(w => {
        expect(w.pairings).toContain('fish');
      });
    });

    it('treats red food pairing as also matching meat', () => {
      const filters: WineFilters = { food: 'red', type: 'all', winery: 'all' };
      const result = filterWines(wines, filters);
      result.forEach(w => {
        expect(w.pairings.includes('red') || w.pairings.includes('meat')).toBe(true);
      });
    });

    it('filters by winery', () => {
      const allMakers = makers();
      if (allMakers.length > 0) {
        const filters: WineFilters = { food: 'all', type: 'all', winery: allMakers[0] };
        const result = filterWines(wines, filters);
        result.forEach(w => {
          expect(w.maker).toBe(allMakers[0]);
        });
      }
    });

    it('filters by region', () => {
      const wineWithGeo = wines.find(w => w.geo.length > 0);
      if (wineWithGeo) {
        const filters: WineFilters = { food: 'all', type: 'all', winery: 'all', region: wineWithGeo.geo[0] };
        const result = filterWines(wines, filters);
        result.forEach(w => {
          expect(w.geo).toContain(wineWithGeo.geo[0]);
        });
      }
    });

    it('filters by search query in name', () => {
      const firstWine = wines[0];
      const filters: WineFilters = { food: 'all', type: 'all', winery: 'all', q: firstWine.name.substring(0, 5) };
      const result = filterWines(wines, filters);
      expect(result.length).toBeGreaterThan(0);
    });

    it('search is case insensitive', () => {
      const firstWine = wines[0];
      const filters: WineFilters = { food: 'all', type: 'all', winery: 'all', q: firstWine.name.toUpperCase() };
      const result = filterWines(wines, filters);
      expect(result.some(w => w.slug === firstWine.slug)).toBe(true);
    });

    it('combines multiple filters', () => {
      const filters: WineFilters = { food: 'fish', type: 'white', winery: 'all' };
      const result = filterWines(wines, filters);
      result.forEach(w => {
        expect(w.type).toBe('white');
        expect(w.pairings).toContain('fish');
      });
    });
  });

  describe('filtersToQuery', () => {
    it('returns empty string for default filters', () => {
      const filters: WineFilters = { food: 'all', type: 'all', winery: 'all' };
      expect(filtersToQuery(filters)).toBe('');
    });

    it('includes food filter in query', () => {
      const filters: WineFilters = { food: 'fish', type: 'all', winery: 'all' };
      expect(filtersToQuery(filters)).toBe('?food=fish');
    });

    it('includes type filter in query', () => {
      const filters: WineFilters = { food: 'all', type: 'red', winery: 'all' };
      expect(filtersToQuery(filters)).toBe('?type=red');
    });

    it('includes winery filter in query', () => {
      const filters: WineFilters = { food: 'all', type: 'all', winery: 'TestWinery' };
      expect(filtersToQuery(filters)).toBe('?winery=TestWinery');
    });

    it('includes region filter in query', () => {
      const filters: WineFilters = { food: 'all', type: 'all', winery: 'all', region: 'Piemonte' };
      expect(filtersToQuery(filters)).toBe('?region=Piemonte');
    });

    it('combines multiple filters', () => {
      const filters: WineFilters = { food: 'fish', type: 'white', winery: 'all', region: 'Veneto' };
      const query = filtersToQuery(filters);
      expect(query).toContain('food=fish');
      expect(query).toContain('type=white');
      expect(query).toContain('region=Veneto');
    });

    it('excludes region when set to all', () => {
      const filters: WineFilters = { food: 'all', type: 'all', winery: 'all', region: 'all' };
      expect(filtersToQuery(filters)).toBe('');
    });
  });

  describe('bestsellers', () => {
    it('returns bestseller wines in correct order', () => {
      const best = bestsellers('el');
      expect(best.length).toBeGreaterThan(0);
      expect(best[0].slug).toBe('bacio-della-luna');
    });

    it('returns same slugs for both locales', () => {
      const elBest = bestsellers('el');
      const enBest = bestsellers('en');
      expect(elBest.map(w => w.slug)).toEqual(enBest.map(w => w.slug));
    });
  });
});
