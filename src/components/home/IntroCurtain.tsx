'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import styles from './IntroCurtain.module.css';

const NAME = 'Franco Merzia';
const SESSION_KEY = 'fm-intro-seen';

/** Play or skip, decided once per page load (kept stable so re-renders don't flip it). */
let decision: 'playing' | 'done' | undefined;
const decide = () =>
  (decision ??= window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem(SESSION_KEY) ? 'done' : 'playing');
const noSubscribe = () => () => {};

/**
 * Opening "pour": the FM mark fills like a glass, the name rises letter by letter,
 * then five columns lift to reveal the page. Runs once per session; skipped for reduced motion.
 */
export function IntroCurtain({ regions, est }: { regions: string; est: string }) {
  // 'pending' on the server and during hydration, then the client's decision.
  const start = useSyncExternalStore(noSubscribe, decide, () => 'pending' as const);
  const [ended, setEnded] = useState(false);
  const state = ended ? 'done' : start;
  const ref = useRef<HTMLDivElement>(null);

  // On mount (same commit as HeroRing's effect, which reads data-intro to hold its drop-in).
  useEffect(() => {
    if (decide() !== 'playing') return;
    sessionStorage.setItem(SESSION_KEY, '1');
    document.documentElement.dataset.intro = 'playing';
  }, []);

  useEffect(() => {
    if (state !== 'playing') return;
    const last = ref.current?.querySelector<HTMLElement>('[data-col]:last-child');
    const end = () => { document.documentElement.dataset.intro = 'done'; decision = 'done'; setEnded(true); };
    last?.addEventListener('animationend', end, { once: true });
    const failsafe = window.setTimeout(end, 4200);
    return () => window.clearTimeout(failsafe);
  }, [state]);

  if (state === 'done') return null;

  return (
    <div ref={ref} className={styles.curtain} data-state={state} aria-hidden>
      <div className={styles.cols}>{[0, 1, 2, 3, 4].map((i) => <div key={i} data-col="" style={{ animationDelay: `${2300 + i * 70}ms` }} />)}</div>
      <div className={styles.content}>
        <div className={styles.corners}><span>{regions}</span><span>{est}</span></div>
        <div className={styles.center}>
          <div className={styles.glass}>
            <div className={styles.empty} />
            <div className={styles.fill}><div className={styles.wave} /></div>
          </div>
          <div className={styles.name}>
            {[...NAME].map((ch, i) => (
              <span key={i} style={{ animationDelay: `${150 + i * 45}ms`, width: ch === ' ' ? '.26em' : undefined }}>{ch === ' ' ? '' : ch}</span>
            ))}
          </div>
          <div className={styles.vino}><i />VINO<i /></div>
        </div>
        <div />
      </div>
      {/* Preload the mask so the fill is visible on first paint */}
      <Image src="/images/logo-mark.png" alt="" width={1} height={1} priority className="sr-only" />
    </div>
  );
}
