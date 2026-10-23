'use client';

import { flushSync } from 'react-dom';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { localize } from '@/lib/wines';
import type { Locale } from '@/types/wine';
import { WineDrawer } from './WineDrawer';

interface Ctx {
  /** `from` = a bottle image on screen; it then morphs into the panel (View Transitions). */
  open: (slug: string, from?: HTMLElement | null) => void;
  close: () => void;
}

const DrawerContext = createContext<Ctx | null>(null);

export function useWineDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error('useWineDrawer must be used inside <WineDrawerProvider>');
  return ctx;
}

/** Quick-look panel available on every page; the full page lives at /[lang]/wines/[slug]. */
export function WineDrawerProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const wines = useMemo(() => localize(locale), [locale]);
  const [slug, setSlug] = useState<string | null>(null);

  const open = useCallback((s: string, from?: HTMLElement | null) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!from || reduced || !document.startViewTransition) { setSlug(s); return; }
    // Name the source bottle for the "old" snapshot, then hand the name to the panel's bottle.
    const root = document.documentElement;
    root.dataset.vt = '';
    from.style.viewTransitionName = 'wine-bottle';
    const vt = document.startViewTransition(() => {
      from.style.viewTransitionName = '';
      flushSync(() => setSlug(s));
    });
    vt.finished.finally(() => { delete root.dataset.vt; });
  }, []);
  const close = useCallback(() => setSlug(null), []);
  const value = useMemo(() => ({ open, close }), [open, close]);
  const wine = wines.find((w) => w.slug === slug) ?? null;

  return (
    <DrawerContext.Provider value={value}>
      {children}
      <WineDrawer locale={locale} wine={wine} onClose={close} />
    </DrawerContext.Provider>
  );
}
