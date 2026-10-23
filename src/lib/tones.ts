import type { Tone, WineType } from '@/types/wine';

const LIGHT: Omit<Tone, 'bg'> = {
  fg: 'var(--color-text)',
  mute: 'var(--color-neutral-700)',
  line: 'color-mix(in srgb, #1d1a19 30%, transparent)',
  seg: 'var(--color-accent)',
  segOff: 'color-mix(in srgb, #1d1a19 18%, transparent)',
  btnBg: 'var(--color-accent)',
  btnFg: 'var(--color-bg)',
};

const DARK: Omit<Tone, 'bg'> = {
  fg: 'var(--color-bg)',
  mute: 'var(--color-accent-2-200)',
  line: 'color-mix(in srgb, #f7f3ee 35%, transparent)',
  seg: 'var(--color-accent-2-300)',
  segOff: 'color-mix(in srgb, #f7f3ee 22%, transparent)',
  btnBg: 'var(--color-bg)',
  btnFg: 'var(--color-accent)',
};

const light = (bg: string): Tone => ({ bg, ...LIGHT });
const dark = (bg: string): Tone => ({ bg, ...DARK });

/**
 * Tone per category, deepening with body weight (index 1–5): whites and sparkling climb a
 * gold ladder, rosés a blush one, reds go from garnet to deep burgundy.
 */
const LADDERS: Record<WineType, Tone[]> = {
  sparkling: [light('var(--color-accent-2-100)'), light('var(--color-accent-2-100)'), light('var(--color-accent-2-200)'), light('var(--color-accent-2-300)'), light('var(--color-accent-2-400)'), dark('var(--color-accent-2-600)')],
  white: [light('var(--color-accent-2-200)'), light('var(--color-accent-2-100)'), light('var(--color-accent-2-200)'), light('var(--color-accent-2-300)'), light('var(--color-accent-2-400)'), dark('var(--color-accent-2-600)')],
  rose: [light('var(--color-accent-200)'), light('var(--color-accent-100)'), light('var(--color-accent-200)'), light('var(--color-accent-300)'), light('var(--color-accent-300)'), dark('var(--color-accent-400)')],
  red: [dark('var(--color-accent-500)'), light('var(--color-accent-300)'), light('var(--color-accent-300)'), dark('var(--color-accent-500)'), dark('var(--color-accent-500)'), dark('var(--color-accent-700)')],
};

/** Hand-placed rungs for the featured wines so the collection story reads light → full. */
const BODY_BY_SLUG: Record<string, number> = {
  prosecco: 1,
  'bacio-della-luna': 1,
  fiano: 2,
  amicone: 3,
  leanfore: 4,
  amarone: 5,
};

/** Position 1–5 on the light → full ladder (0 = no body rating). */
export const rungOf = (slug: string, body: number) => BODY_BY_SLUG[slug] ?? body;

export function toneFor(slug: string, body: number, type: WineType): Tone {
  return LADDERS[type][rungOf(slug, body)];
}
