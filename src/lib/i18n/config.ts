import type { Locale } from '@/types/wine';

export const LOCALES: Locale[] = ['el', 'en'];
export const DEFAULT_LOCALE: Locale = 'el';

export const isLocale = (v: string | undefined): v is Locale => !!v && (LOCALES as string[]).includes(v);
