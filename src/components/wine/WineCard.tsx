'use client';

import Image from 'next/image';
import { ArrowRight, Award, Thermometer } from 'lucide-react';
import { useEffect, useRef, type CSSProperties } from 'react';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import type { LocalizedWine } from '@/types/wine';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useWineDrawer } from './WineDrawerProvider';
import { TINT, mountFx } from './categoryFx';
import styles from './WineCard.module.css';

/**
 * Catalogue card: tinted photo panel with the per-type animation, a watermark number,
 * an award badge, then type · origin, name, pairings, body meter, serving temperature.
 * `boost` = the user is filtering by this wine's type → livelier animation.
 */
export function WineCard({ wine, t, index = 0, boost = false }: { wine: LocalizedWine; t: Dictionary; index?: number; boost?: boolean }) {
  const { open } = useWineDrawer();
  const fxRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = fxRef.current;
    if (!el) return;
    return mountFx(el, wine.type, boost, reduced);
  }, [wine.type, boost, reduced]);

  const origin = [wine.region, wine.appellation].filter(Boolean).join(' · ');

  return (
    <article className={styles.card} style={{ '--i': index } as CSSProperties}>
      <button type="button" className={styles.media} data-view={t.wine.view} style={{ background: TINT[wine.type] ?? wine.tone.bg }} onClick={() => open(wine.slug)} aria-label={`${t.wine.view}: ${wine.name}`}>
        <div ref={fxRef} className={styles.fx} aria-hidden />
        <span className={styles.num} aria-hidden>{wine.num}</span>
        <div className={styles.bottle}>
          <Image src={wine.image} alt="" fill sizes="(max-width: 600px) 60vw, 280px" style={{ objectFit: 'contain', objectPosition: 'bottom' }} />
        </div>
        {wine.award && <span className={styles.award}><Award size={14} />{wine.award}</span>}
      </button>
      <div className={styles.info}>
        <div className={styles.meta}><span className="tag">{wine.typeLabel}</span><span>{origin}</span></div>
        <div><h3 className={styles.name}>{wine.name}</h3><div className={styles.maker}>{wine.maker}</div></div>
        {wine.pairsShort && <div className={styles.pairs}><span className={styles.k}>{t.wine.pairsWith}</span>{wine.pairsShort}</div>}
        {wine.body > 0 && (
          <div>
            <div className={styles.bodyLabels}><span>{t.wine.light}</span><span>{t.wine.full}</span></div>
            <div className={styles.segs}>{[1, 2, 3, 4, 5].map((k) => <span key={k} data-on={k <= wine.body} />)}</div>
          </div>
        )}
        {wine.serve && <div className={styles.serve}><Thermometer size={16} /><span>{t.wine.serveAt} {wine.serve}</span></div>}
        <button type="button" className={`btn btn-secondary ${styles.cta}`} onClick={() => open(wine.slug)}>{t.wine.details}<ArrowRight size={18} /></button>
      </div>
    </article>
  );
}
