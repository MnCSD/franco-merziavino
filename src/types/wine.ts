export type Locale = 'el' | 'en';
export type Localized<T = string> = Record<Locale, T>;

export type WineType = 'sparkling' | 'white' | 'rose' | 'red';
export type Occasion = 'aperitif' | 'fish' | 'white' | 'red' | 'cheese' | 'meat' | 'celebration' | 'dessert';
export type Body = 1 | 2 | 3 | 4 | 5;

export interface Award {
  who: string;
  what: Localized;
}

export interface Wine {
  slug: string;
  short: string;
  name: string;
  maker: string;
  type: WineType;
  organic?: boolean;
  alcoholFree?: boolean;
  premium?: boolean;
  region: Localized;
  appellation: string;
  grapes?: string;
  abv: string;
  serve: string;
  /** 1–5; 0 when the data sheet gives no body rating. */
  body: number;
  pairings: Occasion[];
  featured?: boolean;
  notes: Localized;
  pairsShort: Localized;
  profile: Localized;
  pairing: Localized;
  making?: Localized;
  tip?: Localized;
  award?: string;
  awards: Award[];
  awardsNote?: Localized;
}

/** A wine flattened to one locale — what components consume. */
export interface LocalizedWine {
  slug: string;
  index: number;
  num: string;
  short: string;
  name: string;
  maker: string;
  type: WineType;
  typeLabel: string;
  organic: boolean;
  alcoholFree: boolean;
  premium: boolean;
  region: string;
  /** Map regions (see lib/geo.ts) this wine belongs to. */
  geo: string[];
  appellation: string;
  grapes?: string;
  abv: string;
  serve: string;
  body: number;
  pairings: Occasion[];
  featured: boolean;
  notes: string;
  pairsShort: string;
  profile: string;
  pairing: string;
  making?: string;
  tip?: string;
  award?: string;
  awards: { who: string; what: string }[];
  awardsNote?: string;
  image: string;
  tone: Tone;
}

export interface Tone {
  bg: string;
  fg: string;
  mute: string;
  line: string;
  seg: string;
  segOff: string;
  btnBg: string;
  btnFg: string;
}
