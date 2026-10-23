'use client';

import { useEffect, useRef } from 'react';
import styles from './ViewCursor.module.css';

/** Round "view" cursor that appears over any element with a data-view label (fine pointers only). */
export function ViewCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.dataset.cursor = 'on';
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; el.style.transform = `translate(${cx}px,${cy}px)`; raf = requestAnimationFrame(loop); };
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = (e.target as Element | null)?.closest<HTMLElement>('[data-view]');
      el.dataset.on = String(!!t);
      if (t) el.firstElementChild!.textContent = t.dataset.view ?? '';
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', move, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); delete document.documentElement.dataset.cursor; };
  }, []);
  return <div ref={ref} className={styles.cursor} data-on="false" aria-hidden><span /></div>;
}
