'use client';

import { useEffect, useRef } from 'react';
import type { WineType } from '@/types/wine';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { mountFx } from './categoryFx';

/** Full-size category animation layer (wine page hero). Boosted, scaled to the panel. */
export function WineHeroFx({ type, className, calm }: { type: WineType; className?: string; calm?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return mountFx(el, type, true, reduced, calm);
  }, [type, reduced, calm]);
  return <div ref={ref} className={className} aria-hidden />;
}
