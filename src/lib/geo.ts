import type { Locale } from '@/types/wine';

/** Map regions that hold wines, in tour order. Ids match public/data/italy-regions.json. */
export const GEO_IDS = ['Piemonte', 'Trentino', 'Veneto', 'Friuli', 'Abruzzo', 'Campania', 'Puglia', 'Sicilia'] as const;
export type GeoId = (typeof GEO_IDS)[number];

export const GEO_NAMES: Record<GeoId, Record<Locale, [string, string]>> = {
  Piemonte: { el: ['Πιεμόντε', 'Βορράς'], en: ['Piedmont', 'North'] },
  Trentino: { el: ['Τρεντίνο-Άλτο Άντιτζε', 'Βορράς'], en: ['Trentino-Alto Adige', 'North'] },
  Veneto: { el: ['Βένετο', 'Βορράς'], en: ['Veneto', 'North'] },
  Friuli: { el: ['Φρίουλι-Βενέτσια Τζούλια', 'Βορράς'], en: ['Friuli-Venezia Giulia', 'North'] },
  Abruzzo: { el: ['Αμπρούτσο', 'Κέντρο'], en: ['Abruzzo', 'Centre'] },
  Campania: { el: ['Καμπανία', 'Νότος'], en: ['Campania', 'South'] },
  Puglia: { el: ['Απουλία', 'Νότος'], en: ['Apulia', 'South'] },
  Sicilia: { el: ['Σικελία', 'Νησιά'], en: ['Sicily', 'Islands'] },
};

/** Greek wine region (as on the data sheet) → map regions it covers. */
const BY_REGION: Record<string, GeoId[]> = {
  'Πιεμόντε': ['Piemonte'], 'Βένετο': ['Veneto'], 'Φρίουλι': ['Friuli'], 'Τρεντίνο · Βένετο': ['Trentino', 'Veneto'],
  Valdadige: ['Trentino', 'Veneto'], 'Delle Venezie': ['Veneto', 'Friuli', 'Trentino'], 'Άλτο Άντιτζε': ['Trentino'],
  'Τριβενέτο': ['Veneto', 'Friuli', 'Trentino'], 'Αμπρούτσο': ['Abruzzo'], 'Καμπανία': ['Campania'],
  'Απουλία': ['Puglia'], 'Σικελία': ['Sicilia'],
};
export const geoOf = (regionEl: string): GeoId[] => BY_REGION[regionEl] ?? [];
export const isGeoId = (v: string | null): v is GeoId => !!v && (GEO_IDS as readonly string[]).includes(v);

/** Pin label offsets [dx, dy, anchor] on the narrow map. */
export const GEO_LABEL: Record<GeoId, [number, number, 'start' | 'middle' | 'end']> = {
  Piemonte: [-1, -34, 'end'], Trentino: [0, -40, 'middle'], Veneto: [26, 30, 'start'], Friuli: [34, -6, 'start'],
  Abruzzo: [30, -14, 'start'], Campania: [-26, 30, 'end'], Puglia: [40, -6, 'start'], Sicilia: [0, -44, 'middle'],
};

export interface GeoData { w: number; h: number; regions: { id: string; name: string; d: string; cx: number; cy: number }[] }
