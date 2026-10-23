'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './IntroCurtain.module.css';

const NAME = 'Franco Merzia';
const SESSION_KEY = 'fm-intro-seen';

/**
 * Opening "pour": the FM mark fills like a glass, the name rises letter by letter,
 * then five columns lift to reveal the page. Runs once per session; skipped for reduced motion.
 */
export function IntroCurtain({ regions, est }: { regions: string; est: string }) {
  const [state, setState] = useState<'pending' | 'playing' | 'done'>('pending');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || sessionStorage.getItem(SESSION_KEY)) { setState('done'); return; }
    sessionStorage.setItem(SESSION_KEY, '1');
    document.documentElement.dataset.intro = 'playing';
    setState('playing');
  }, []);

  useEffect(() => {
    if (state !== 'playing') return;
    const last = ref.current?.querySelector<HTMLElement>('[data-col]:last-child');
    const end = () => { document.documentElement.dataset.intro = 'done'; setState('done'); };
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
