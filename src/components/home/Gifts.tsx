'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Locale } from '@/types/wine';
import styles from './Gifts.module.css';

const GIFTS = ['g16', 'g12', 'g02-v2', 'g05', 'g15-v2', 'g11', 'g14-v2', 'g01', 'g07-v2', 'g03-v2', 'g04-v2', 'g06-v2', 'g08', 'g13'].map((n) => `/images/gifts/${n}.jpg`);
/** The two drifting photo columns, and the photo that grows behind each service card. */
const COL_A = GIFTS.filter((_, i) => i % 2 === 0);
const COL_B = GIFTS.filter((_, i) => i % 2 === 1);
const CARD_PHOTO = [GIFTS[0], GIFTS[5], GIFTS[10]];

/** Small satin bow that ties itself on the ribbon beside the open service. */
function Bow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-30 -18 60 40" aria-hidden>
      <path d="M-2 0 C-12 -16 -30 -12 -28 -1 C-26 8 -12 6 -2 1 Z" />
      <path d="M2 0 C12 -16 30 -12 28 -1 C26 8 12 6 2 1 Z" />
      <path d="M-2 3 L-14 20 L-9 19 L-6 22 L1 4 Z" />
      <path d="M2 3 L14 20 L9 19 L6 22 L-1 4 Z" />
      <rect x="-4.5" y="-4" width="9" height="9" rx="2.5" />
    </svg>
  );
}

/** Ask the contact form to preselect "corporate gifts" (and note the service) and scroll to it. */
export const askGifts = (note?: string) => {
  window.dispatchEvent(new CustomEvent('fmv:enquiry', { detail: 'gifts' }));
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  if (!note) return;
  const box = document.querySelector<HTMLTextAreaElement>('#contact textarea[name="message"]');
  if (box && !box.value.trim()) box.value = `${note}: `;
};

/**
 * Corporate gifts. Desktop: the section arrives gift-wrapped — burgundy paper, a gold satin ribbon
 * and bow. Scrolling unties the bow, slides the ribbon off and parts the paper to reveal a split
 * layout: copy and three gift-box service cards on the left, two photo columns gliding on their
 * own in opposite directions on the right (paused on hover). Phones / reduced motion get the same content, unwrapped.
 */
export function Gifts({ locale }: { locale: Locale }) {
  const g = getDictionary(locale).gifts;
  const reduced = useReducedMotion();
  const sec = useRef<HTMLDivElement>(null);
  const [openRow, setOpenRow] = useState(0);
  // Magnetic CTA: the button leans toward a nearby pointer.
  const magnet = (e: RPointerEvent<HTMLDivElement>) => {
    const btn = e.currentTarget.querySelector<HTMLElement>('button');
    if (!btn || reduced) return;
    const b = btn.getBoundingClientRect();
    const dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2);
    btn.style.transform = `translate(${(dx * 0.22).toFixed(1)}px, ${(dy * 0.3).toFixed(1)}px)`;
  };
  const unmagnet = (e: RPointerEvent<HTMLDivElement>) => {
    const btn = e.currentTarget.querySelector<HTMLElement>('button');
    if (btn) btn.style.transform = '';
  };

  useEffect(() => {
    const root = sec.current;
    if (!root || reduced) return;
    const q = <T extends Element = HTMLElement>(s: string) => root.querySelector<T & HTMLElement>(s);
    const bow = q('[data-bow]'), tag = q('[data-tag]');
    const ribV = q('[data-rib-v]'), ribH = q('[data-rib-h]');
    const paperL = q('[data-paper-l]'), paperR = q('[data-paper-r]');
    const lines = [...root.querySelectorAll<HTMLElement>('[data-line]')];
    const seg = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
    const ez = (v: number) => 1 - Math.pow(1 - v, 3);
    const ezio = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const vh = window.innerHeight, r = root.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
      const untie = ez(seg(p, 0.02, 0.16)), slide = ezio(seg(p, 0.12, 0.28)), part = ezio(seg(p, 0.24, 0.42));
      if (bow) {
        bow.style.setProperty('--u', untie.toFixed(3));
        bow.style.opacity = String(1 - seg(untie, 0.55, 1));
      }
      if (tag) {
        tag.style.transform = `translate(-50%, ${untie * 140}px) rotate(${8 + untie * 40}deg)`;
        tag.style.opacity = String(1 - untie);
      }
      if (ribV) ribV.style.transform = `translateY(${slide * 110}%)`;
      if (ribH) ribH.style.transform = `translateX(${slide * 110}%)`;
      if (paperL) paperL.style.transform = `translateX(${-part * 101}%)`;
      if (paperR) paperR.style.transform = `translateX(${part * 101}%)`;
      lines.forEach((el, k) => {
        const v = ez(seg(p, 0.34 + k * 0.035, 0.5 + k * 0.035));
        el.style.opacity = String(v);
        el.style.transform = `translateY(${(1 - v) * 48}px)`;
        el.style.pointerEvents = v > 0.6 ? 'auto' : 'none';
      });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const content = (scroll: boolean) => {
    const L = scroll ? '' : undefined;
    return (
      <div className={styles.copy}>
        <div data-line={L} className={styles.kicker}>{g.kicker}</div>
        <h2 className={styles.title}>{g.title.map((l, i) => <span key={l} data-line={L} className={i === g.title.length - 1 ? styles.foil : undefined} data-text={l}>{l}</span>)}</h2>
        <p data-line={L} className={styles.lead}>{g.lead}</p>
        {/* Services threaded on a gold ribbon; the open one gets a bow, its photo and a quote link */}
        <ol className={styles.services}>
          {g.items.map((item, i) => {
            const on = openRow === i;
            return (
              <li key={item} data-line={L} data-open={on} onMouseEnter={() => setOpenRow(i)}>
                <button type="button" className={styles.svcHead} aria-expanded={on} onClick={() => setOpenRow(i)} onFocus={() => setOpenRow(i)}>
                  <span className={styles.svcMark} aria-hidden><i /><Bow className={styles.svcBow} /></span>
                  <span className={styles.svcNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.svcTitle}>{item}</span>
                </button>
                <div className={styles.svcBody}>
                  <div className={styles.svcInner}>
                    <span className={styles.svcPhoto}><Image src={CARD_PHOTO[i]} alt="" fill sizes="120px" style={{ objectFit: 'cover' }} /></span>
                    <span className={styles.svcText}>
                      {g.itemsText[i]}
                      <button type="button" className={styles.svcLink} tabIndex={on ? 0 : -1} onClick={() => askGifts(item)}>{g.quote}<ArrowUpRight size={15} /></button>
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div data-line={L}>
          <div className={styles.magnet} onPointerMove={magnet} onPointerLeave={unmagnet}>
            <button type="button" className={`btn ${styles.cta}`} onClick={() => askGifts()}>
              <span>{g.cta}</span>
              <Bow className={styles.ctaBow} />
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const column = (list: string[], attr: Record<string, string>) => (
    <div className={styles.col} {...attr}>
      {[...list, ...list].map((src, i) => (
        <div key={`${src}-${i}`} className={styles.photo}><Image src={src} alt="" fill sizes="(max-width: 1400px) 25vw, 340px" style={{ objectFit: 'cover' }} /></div>
      ))}
    </div>
  );

  return (
    <section id="gifts" className={styles.section}>
      {/* Scroll scene (desktop, motion allowed) */}
      <div ref={sec} className={styles.scene} data-reduced={reduced}>
        <div className={styles.sticky}>
          <div className={styles.split}>
            <div className={styles.left}>{content(true)}</div>
            <div className={styles.right} aria-hidden>
              {column(COL_A, { 'data-col-a': '' })}
              {column(COL_B, { 'data-col-b': '' })}
            </div>
          </div>

          {/* The wrapping: paper halves, satin ribbon, bow and tag */}
          <div className={styles.wrap} aria-hidden>
            <div data-paper-l="" className={`${styles.paper} ${styles.paperL}`} />
            <div data-paper-r="" className={`${styles.paper} ${styles.paperR}`} />
            <div data-rib-h="" className={styles.ribH} />
            <div data-rib-v="" className={styles.ribV} />
            <div data-bow="" className={styles.bow}>
              <svg viewBox="-160 -90 320 200">
                <defs>
                  <linearGradient id="satin" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f6e3b4" /><stop offset=".35" stopColor="#c9a25f" /><stop offset=".55" stopColor="#f3dca6" /><stop offset="1" stopColor="#9a7434" />
                  </linearGradient>
                </defs>
                <g className={styles.tailL}><path d="M-8 10 L-70 96 L-44 92 L-34 108 L4 16 Z" fill="url(#satin)" /></g>
                <g className={styles.tailR}><path d="M8 10 L70 96 L44 92 L34 108 L-4 16 Z" fill="url(#satin)" /></g>
                <g className={styles.loopL}><path d="M-6 0 C-60 -80 -150 -60 -140 -6 C-132 40 -60 30 -6 6 Z" fill="url(#satin)" /><path d="M-20 -2 C-60 -44 -112 -40 -114 -8" fill="none" stroke="#fff3d1" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" /></g>
                <g className={styles.loopR}><path d="M6 0 C60 -80 150 -60 140 -6 C132 40 60 30 6 6 Z" fill="url(#satin)" /><path d="M20 -2 C60 -44 112 -40 114 -8" fill="none" stroke="#fff3d1" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" /></g>
                <rect className={styles.knot} x="-20" y="-18" width="40" height="38" rx="10" fill="url(#satin)" />
              </svg>
            </div>
            <div data-tag="" className={styles.tag}><span>{g.tag}</span></div>
          </div>
        </div>
      </div>

      {/* Simple version (phones, reduced motion) */}
      <div className={styles.simple} data-reduced={reduced}>
        <div className="container">{content(false)}</div>
        <div className={styles.row}>
          {GIFTS.map((src) => (
            <div key={src} className={styles.rowItem}><Image src={src} alt="" fill sizes="320px" style={{ objectFit: 'cover' }} /></div>
          ))}
        </div>
      </div>
    </section>
  );
}
