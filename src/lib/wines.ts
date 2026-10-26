import { WINES } from '@/data/wines';
import { WINERIES } from '@/data/wineries';
import { BESTSELLER_SLUGS } from '@/data/bestsellers';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { toneFor } from '@/lib/tones';
import { geoOf } from '@/lib/geo';
import type { Locale, LocalizedWine, Occasion, WineType } from '@/types/wine';

const MEDALS_EN: Record<string, string> = { Χρυσό: 'Gold', Ασημένιο: 'Silver', Ασημί: 'Silver', Χάλκινο: 'Bronze' };
/** The headline award is stored in Greek only; translate its medal / points wording. */
const awardEn = (a: string) => a.replace(/(\d+) βαθμοί/, '$1 points').replace(/Χρυσό|Ασημένιο|Ασημί|Χάλκινο/, (m) => MEDALS_EN[m]);

export function localize(locale: Locale): LocalizedWine[] {
  const t = getDictionary(locale);
  return WINES.map((w, index) => ({
    slug: w.slug,
    index,
    num: String(index + 1).padStart(2, '0'),
    short: w.short,
    name: w.name,
    maker: w.maker,
    type: w.type,
    typeLabel: t.wineType[w.type] + (w.organic ? ` · ${t.wine.organic}` : '') + (w.alcoholFree ? ' · 0%' : ''),
    organic: !!w.organic,
    alcoholFree: !!w.alcoholFree,
    premium: !!w.premium,
    geo: geoOf(w.region.el),
    region: w.region[locale],
    // Organic is already in typeLabel; drop the BIO the data sheets put in the appellation.
    appellation: w.organic ? w.appellation.replace(/\s*·?\s*BIO$/, '') : w.appellation,
    grapes: typeof w.grapes === 'object' ? w.grapes[locale] : w.grapes,
    abv: w.abv,
    serve: w.serve,
    body: w.body,
    pairings: w.pairings,
    featured: !!w.featured,
    notes: w.notes[locale],
    pairsShort: w.pairsShort[locale],
    profile: w.profile[locale],
    pairing: w.pairing[locale],
    making: w.making?.[locale],
    tip: w.tip?.[locale],
    award: w.award && (locale === 'en' ? awardEn(w.award) : w.award),
    awards: w.awards.map((a) => ({ who: a.who, what: a.what[locale] })),
    awardsNote: w.awardsNote?.[locale],
    image: `/images/bottles/${w.slug}.webp`,
    tone: toneFor(w.slug, w.body, w.type),
  }));
}

export function featured(locale: Locale) {
  return localize(locale).filter((w) => w.featured);
}

export function findWine(locale: Locale, slug: string) {
  const all = localize(locale);
  const i = all.findIndex((w) => w.slug === slug);
  if (i < 0) return null;
  const n = all.length;
  return { wine: all[i], prev: all[(i - 1 + n) % n], next: all[(i + 1) % n] };
}

export const slugs = () => WINES.map((w) => w.slug);
/** Makers with at least one wine, in WINERIES display order. */
export const makers = () => WINERIES.map((w) => w.name).filter((n) => WINES.some((w) => w.maker === n));

/** Sparkling wines whose name or colour (first sentence of the profile) says rosé. */
const ROSE_SPARKLING = new Set(
  WINES.filter((w) => w.type === 'sparkling' && /\bros(e\b|é)|rosato|pink/i.test(`${w.name} ${w.profile.en.split('.')[0]}`)).map((w) => w.slug),
);

/** Order inside a winery: red, white, rosé, then 0% alcohol. Sparkling wines go with their colour. */
export const typeRank = (w: Pick<LocalizedWine, 'slug' | 'type' | 'alcoholFree'>) =>
  w.alcoholFree ? 3 : w.type === 'red' ? 0 : w.type === 'rose' || ROSE_SPARKLING.has(w.slug) ? 2 : 1;

export const byTypeRank = <T extends Pick<LocalizedWine, 'slug' | 'type' | 'alcoholFree'>>(list: T[]) =>
  [...list].sort((a, b) => typeRank(a) - typeRank(b));

export type TypeFilter = WineType | 'all' | 'alcoholFree' | 'premium';

export interface WineFilters {
  food: Occasion | 'all';
  type: TypeFilter;
  winery: string | 'all';
  region?: string | 'all';
  q?: string;
}

export function filterWines(list: LocalizedWine[], f: WineFilters) {
  const q = (f.q ?? '').trim().toLowerCase();
  return list.filter(
    (w) =>
      (f.food === 'all' || w.pairings.includes(f.food) || (f.food === 'red' && w.pairings.includes('meat'))) &&
      (f.type === 'all' || (f.type === 'alcoholFree' ? w.alcoholFree : f.type === 'premium' ? w.premium : w.type === f.type)) &&
      (f.winery === 'all' || w.maker === f.winery) &&
      (!f.region || f.region === 'all' || w.geo.includes(f.region)) &&
      (!q || [w.name, w.maker, w.region, w.grapes, w.notes].join(' ').toLowerCase().includes(q)),
  );
}

export function filtersToQuery(f: WineFilters) {
  const p = new URLSearchParams();
  if (f.food !== 'all') p.set('food', f.food);
  if (f.type !== 'all') p.set('type', f.type);
  if (f.winery !== 'all') p.set('winery', f.winery);
  if (f.region && f.region !== 'all') p.set('region', f.region);
  const s = p.toString();
  return s ? `?${s}` : '';
}

/** Hero ring: bestsellers in list order. */
export const bestsellers = (locale: Locale) => {
  const all = localize(locale);
  return BESTSELLER_SLUGS.map((s) => all.find((w) => w.slug === s)).filter((w): w is LocalizedWine => !!w);
};
