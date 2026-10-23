'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Award, X } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { Locale, LocalizedWine } from '@/types/wine';
import { BodyMeter } from './BodyMeter';
import { WineHeroFx } from './WineHeroFx';
import { TINT } from './categoryFx';
import styles from './WineDrawer.module.css';

interface Props {
  locale: Locale;
  wine: LocalizedWine | null;
  onClose: () => void;
}

export function WineDrawer({ locale, wine, onClose }: Props) {
  const t = getDictionary(locale);
  // Keep the last wine rendered while the panel animates out.
  // Derived during render (not in an effect) so the panel exists in the same commit that opens
  // it, which the bottle morph's "after" snapshot relies on.
  const [shown, setShown] = useState<LocalizedWine | null>(wine);
  if (wine && wine !== shown) setShown(wine);

  const open = !!wine;
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  const w = wine ?? shown;
  return (
    <div className={styles.root} data-open={open} aria-hidden={!open}>
      <div className={styles.backdrop} onClick={onClose} />
      {w && (
        <aside className={styles.panel} role="dialog" aria-modal="true" aria-label={w.name}>
          <div className={styles.media} style={{ background: TINT[w.type] ?? w.tone.bg }}>
            {open && <WineHeroFx key={w.slug} type={w.type} className={styles.fx} />}
            <span className={styles.num} style={{ color: TINT[w.type] ? 'var(--color-text)' : w.tone.fg }}>{w.num}</span>
            <div className={styles.bottle} style={open ? { viewTransitionName: 'wine-bottle' } : undefined}>
              <Image src={w.image} alt={w.name} fill sizes="(max-width: 900px) 60vw, 420px" style={{ objectFit: 'contain', objectPosition: 'bottom' }} />
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.head}>
              <div>
                <div className={styles.meta}><span className="tag">{w.typeLabel}</span><span>{[w.appellation, w.region].filter(Boolean).join(' · ')}</span></div>
                <h3 className={styles.title}>{w.name}</h3>
                <div className={styles.maker}>{w.maker}{w.grapes ? ` · ${w.grapes}` : ''}</div>
              </div>
              <button type="button" className="btn btn-secondary btn-icon" onClick={onClose} aria-label={t.nav.close}><X size={20} /></button>
            </div>

            <dl className={styles.facts}>
              <div><dt className="label">{t.wine.abv}</dt><dd>{w.abv}</dd></div>
              <div><dt className="label">{t.wine.serve}</dt><dd>{w.serve}</dd></div>
              {w.body > 0 && <div><dt className="label">{t.wine.body}</dt><dd><BodyMeter body={w.body} /></dd></div>}
            </dl>

            {w.tip && <p className={styles.tip}><strong>{t.wine.tip}</strong> {w.tip}</p>}
            <section><h5>{t.wine.inGlass}</h5><p className={styles.clamp4}>{w.profile}</p></section>
            <section><h5>{t.wine.pairsWith}</h5><p className={styles.clamp3}>{w.pairing}</p></section>
            {w.award && <div className={styles.award}><Award size={16} />{w.award}</div>}

            <div className={styles.cta}>
              <Link href={`/${locale}/wines/${w.slug}`} className="btn btn-secondary" onClick={onClose}>{t.wine.fullPage}<ArrowUpRight size={18} /></Link>
              <Link href={`/${locale}?wine=${w.slug}#contact`} className="btn btn-primary" onClick={onClose}>{t.wine.askUs}<ArrowRight size={18} /></Link>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
