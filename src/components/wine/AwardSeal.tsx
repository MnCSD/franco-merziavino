import { Award } from 'lucide-react';
import type { LocalizedWine } from '@/types/wine';
import styles from './AwardSeal.module.css';

/** Seal data: headline score (or medal) plus every award, for the text running round the rim. */
export function sealOf(w: LocalizedWine) {
  const list = w.awards.length ? w.awards : w.award ? [{ who: w.award, what: '' }] : [];
  if (!list.length) return null;
  const scored = list.find((a) => /\d+/.test(a.what)) ?? list.find((a) => /\d+/.test(a.who));
  const m = scored && (scored.what || scored.who).match(/(\d+)\s*([^\s·]*)/);
  const ring = list.map((a) => [a.who, a.what].filter(Boolean).join(' · ')).join('  ✦  ');
  return { score: m?.[1], unit: m?.[2] ?? '', ring: `${ring}  ✦  `.repeat(ring.length < 40 ? 2 : 1).toUpperCase() };
}

/**
 * Gold award coin: the score (or a medal) in the middle, all awards turning round the rim.
 * `className` positions and animates it; renders nothing for wines without awards.
 */
export function AwardSeal({ wine, className, idPrefix }: { wine: LocalizedWine; className?: string; idPrefix: string }) {
  const seal = sealOf(wine);
  if (!seal) return null;
  const id = `${idPrefix}-${wine.slug}`;
  return (
    <div className={`${styles.seal} ${className ?? ''}`} aria-hidden>
      <svg viewBox="0 0 100 100" className={styles.ring}>
        <defs><path id={id} d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" /></defs>
        <text><textPath href={`#${id}`} textLength={245} lengthAdjust="spacing">{seal.ring}</textPath></text>
      </svg>
      <span className={styles.core}>
        {seal.score ? <><b>{seal.score}</b><small>{seal.unit}</small></> : <Award size={26} strokeWidth={1.6} />}
      </span>
    </div>
  );
}
