import Image from 'next/image';
import type { CSSProperties } from 'react';
import styles from './PartnerLogos.module.css';

/** The companies we represent, each on its own brand ground (Schenk red on cream, Francesca Mara on black); `ratio` is the plate's width / height. */
export const PARTNERS = [
  { name: 'Schenk Italia', src: '/images/logo-schenk-italia.png', w: 1462, h: 703, ground: 'light', ratio: 2.4 },
  { name: 'Francesca Mara', src: '/images/logo-francesca-mara.jpg', w: 552, h: 404, ground: 'dark', ratio: 552 / 404 },
] as const;
type Partner = (typeof PARTNERS)[number];

/** Which company a wine comes through: Francesca Mara's own labels, every other winery via Schenk Italia. */
export const partnerOf = (maker: string): Partner => PARTNERS[maker === 'Francesca Mara' ? 1 : 0];

/** `bare`: drop the cream plate behind a transparent logo (for light backgrounds). */
function Plate({ p, height, bare = false }: { p: Partner; height: number; bare?: boolean }) {
  return (
    <span className={styles.plate} data-ground={p.ground} data-bare={bare && p.ground === 'light'} style={{ aspectRatio: p.ratio, '--h': `${height}px` } as CSSProperties}>
      <Image src={p.src} alt={p.name} width={p.w} height={p.h} sizes={`${Math.round(height * p.ratio * 2)}px`} />
    </span>
  );
}

/** Row of partner logo plates at a shared height; `href` makes each plate a link (e.g. to the About section). */
export function PartnerLogos({ height = 56, href, className }: { height?: number; href?: string; className?: string }) {
  return (
    <ul className={`${styles.row} ${className ?? ''}`}>
      {PARTNERS.map((p) => (
        <li key={p.name}>{href ? <a href={href} className={styles.link} aria-label={p.name}><Plate p={p} height={height} /></a> : <Plate p={p} height={height} />}</li>
      ))}
    </ul>
  );
}

/** "From the range of" + the one partner logo a wine comes through. */
export function PartnerBadge({ maker, label, height = 40, className }: { maker: string; label: string; height?: number; className?: string }) {
  return (
    <div className={`${styles.badge} ${className ?? ''}`}>
      <span className={styles.badgeLabel}>{label}</span>
      <Plate p={partnerOf(maker)} height={height} bare />
    </div>
  );
}
