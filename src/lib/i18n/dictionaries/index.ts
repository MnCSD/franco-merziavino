import type { Locale } from '@/types/wine';
import el, { type Dictionary } from './el';
import en from './en';

const DICTS: Record<Locale, Dictionary> = { el, en };

export const getDictionary = (locale: Locale): Dictionary => DICTS[locale] ?? el;
export type { Dictionary };
