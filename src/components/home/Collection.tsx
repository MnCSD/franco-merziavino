'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Beef, CakeSlice, Drumstick, Fish, Martini, PartyPopper, type LucideIcon } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { rungOf } from '@/lib/tones';
import type { Locale, LocalizedWine, Occasion, WineType } from '@/types/wine';
import { useWineDrawer } from '@/components/wine/WineDrawerProvider';
import { WineHeroFx } from '@/components/wine/WineHeroFx';
import { AwardSeal } from '@/components/wine/AwardSeal';
import styles from './Collection.module.css';

/** Wine colour in the glass, by category and rung on the light → full ladder (index 0–5). */
const LIQUID: Record<WineType, string[]> = {
  sparkling: ['#efe0a0', '#f2e6b4', '#ecd994', '#e5cb79', '#dcbb5f', '#cfa94a'],
  white: ['#e8d07e', '#efe0a6', '#e8d07e', '#dfbd55', '#d4ab40', '#c49a35'],
  rose: ['#f0a59e', '#f6c3bc', '#f0a59e', '#e98b85', '#dc716d', '#c85a5c'],
  red: ['#7a1626', '#b03045', '#9b2335', '#86182b', '#5e0d1f', '#3c0715'],
};
const liquidOf = (w: LocalizedWine) => LIQUID[w.type][rungOf(w.slug, w.body)];
/** Share of the bowl filled: fuller wines pour higher. */
const levelOf = (w: LocalizedWine) => 0.3 + rungOf(w.slug, w.body) * 0.1;

const hex = (c: string) => [1, 3, 5].map((k) => parseInt(c.slice(k, k + 2), 16));
const mixHex = (a: string, b: string, f: number) => {
  const A = hex(a), B = hex(b);
  return `rgb(${A.map((v, k) => Math.round(v + (B[k] - v) * f)).join(',')})`;
};
const smooth = (f: number) => f * f * (3 - 2 * f);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Bowl interior, glass viewBox 0 0 120 300 (rim at y 12, bottom at y 146). */
const BOWL = 'M20 12 C17 70 28 138 60 146 C92 138 103 70 100 12 Z';
const BOWL_TOP = 12, BOWL_BOTTOM = 146;

function CheeseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 15 20 8v10H3Z" /><path d="M3 15h17" /><circle cx="9" cy="16.5" r=".6" /><circle cx="15" cy="12.5" r="1.2" />
    </svg>
  );
}
const PAIR_ICON: Partial<Record<Occasion, LucideIcon | typeof CheeseIcon>> = {
  aperitif: Martini, fish: Fish, white: Drumstick, red: Beef, meat: Beef, cheese: CheeseIcon, celebration: PartyPopper, dessert: CakeSlice,
};

/** Where tasting-note "aromas" hover round the bottle neck (% offsets) and how deep they sit. */
const AROMA_SLOTS = [
  { x: -30, y: 4, z: 1.2 }, { x: 28, y: -6, z: 0.7 }, { x: -24, y: 30, z: 0.8 }, { x: 34, y: 20, z: 1.1 }, { x: -2, y: -14, z: 0.5 },
];

/**
 * Pinned scroll story, light → full. Scroll drives everything: the bottle turns on a turntable
 * into the next one, and the glass fills to that wine's colour and level (sloshing with scroll speed).
 * Tasting notes float off the bottle as aromas; a cursor spotlight glints on the label.
 * Each change also pours the next wine's tone over the last, with its category animation behind.
 */
export function Collection({ wines, locale }: { wines: LocalizedWine[]; locale: Locale }) {
  const t = getDictionary(locale);
  const n = wines.length;
  const ref = useRef<HTMLElement>(null);
  const bottlesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const bottlesBoxRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<SVGPathElement>(null);
  const surfaceRef = useRef<SVGPathElement>(null);
  const fizzRef = useRef<SVGGElement>(null);
  const aromasRef = useRef<HTMLDivElement>(null);
  const [ch, setCh] = useState(0);
  const chRef = useRef(0);
  const [wash, setWash] = useState({ key: 0, under: wines[0].tone.bg, dir: 0 });
  const [near, setNear] = useState(false);
  const fxTypes = [...new Set(wines.map((w) => w.type))] as WineType[];
  const { open } = useWineDrawer();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const s = { lastY: window.scrollY, v: 0, tilt: 0, mx: 0, my: 0 };
    let raf = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const el = ref.current;
      if (!el) return;
      const span = el.offsetHeight - window.innerHeight;
      const p = clamp(-el.getBoundingClientRect().top / Math.max(1, span), 0, 1);
      const pos = p * (n - 1);
      const idx = Math.round(pos);
      if (idx !== chRef.current) {
        const from = chRef.current;
        setWash((w) => ({ key: w.key + 1, under: wines[from].tone.bg, dir: idx > from ? 1 : -1 }));
        chRef.current = idx;
        setCh(idx);
      }

      // Scroll velocity (px/frame, smoothed) drives the slosh.
      const y = window.scrollY;
      s.v += (y - s.lastY - s.v) * 0.2;
      s.lastY = y;

      // Turntable: the bottle turns edge-on at the halfway point and the next one turns in.
      bottlesRef.current.forEach((b, i) => {
        if (!b) return;
        const d = pos - i;
        const on = Math.abs(d) <= 0.5;
        if (reduced) { b.style.opacity = i === idx ? '1' : '0'; return; }
        b.style.opacity = on ? '1' : '0';
        b.style.transform = `perspective(1200px) rotateY(${(d * 180).toFixed(2)}deg) scale(${(1 - Math.abs(d) * 0.14).toFixed(3)})`;
        b.style.filter = `brightness(${(1 - Math.abs(d) * 0.9).toFixed(3)}) drop-shadow(0 26px 24px rgba(0,0,0,.3))`;
      });

      // Glass: level and colour blend between neighbouring wines; the surface waves and tilts.
      const i0 = Math.floor(pos), i1 = Math.min(n - 1, i0 + 1), f = smooth(pos - i0);
      const level = levelOf(wines[i0]) + (levelOf(wines[i1]) - levelOf(wines[i0])) * f;
      const top = BOWL_BOTTOM - level * (BOWL_BOTTOM - BOWL_TOP);
      s.tilt += (clamp(s.v * 0.35, -9, 9) - s.tilt) * 0.08;
      const amp = reduced ? 0 : 1.2 + Math.min(Math.abs(s.v) * 0.18, 5);
      const ph = reduced ? 0 : now / 520;
      let surf = '';
      for (let x = 0; x <= 120; x += 6) {
        const yy = top + amp * Math.sin(x * 0.09 + ph) + (s.tilt * (x - 60)) / 60;
        surf += `${x ? 'L' : 'M'}${x} ${yy.toFixed(2)} `;
      }
      liquidRef.current?.setAttribute('d', `${surf}L120 300 L0 300 Z`);
      surfaceRef.current?.setAttribute('d', surf);
      const color = mixHex(liquidOf(wines[i0]), liquidOf(wines[i1]), f);
      if (liquidRef.current) liquidRef.current.style.fill = color;
      if (fizzRef.current) {
        const fz = (k: number) => (wines[k].type === 'sparkling' ? 1 : 0);
        fizzRef.current.style.opacity = String(fz(i0) + (fz(i1) - fz(i0)) * f);
      }

      if (aromasRef.current && !reduced) {
        aromasRef.current.querySelectorAll<HTMLElement>('[data-z]').forEach((a) => {
          const z = Number(a.dataset.z);
          a.style.translate = `${(s.mx * z * 34).toFixed(1)}px ${(s.my * z * 22).toFixed(1)}px`;
        });
      }
    };

    const onMove = (e: PointerEvent) => { s.mx = e.clientX / window.innerWidth - 0.5; s.my = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', onMove);
    // Only animate while the section is on (or near) screen.
    const io = new IntersectionObserver(([e]) => {
      setNear(e.isIntersecting);
      cancelAnimationFrame(raf);
      if (e.isIntersecting) { s.lastY = window.scrollY; raf = requestAnimationFrame(loop); }
    }, { rootMargin: '50% 0px' });
    if (ref.current) io.observe(ref.current);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('pointermove', onMove); };
  }, [n, wines]);

  const skip = () => {
    const el = ref.current;
    if (el) window.scrollTo({ top: el.offsetTop + el.offsetHeight, behavior: 'smooth' });
  };
  // Spotlight follows the pointer across the bottle stage.
  const light = (e: RPointerEvent<HTMLDivElement>) => {
    const st = e.currentTarget.style;
    const r = e.currentTarget.getBoundingClientRect();
    st.setProperty('--lx', `${e.clientX - r.left}px`);
    st.setProperty('--ly', `${e.clientY - r.top}px`);
    // The glint is drawn inside the bottle box, so it gets its own coordinates.
    const b = bottlesBoxRef.current?.getBoundingClientRect();
    if (b) { st.setProperty('--bx', `${e.clientX - b.left}px`); st.setProperty('--by', `${e.clientY - b.top}px`); }
    st.setProperty('--lo', '1');
  };

  const wine = wines[ch];
  const tone = wine.tone;
  const vars = { '--bg': tone.bg, '--fg': tone.fg, '--mute': tone.mute, '--line': tone.line, height: `${100 + (n - 1) * 50}vh` } as CSSProperties;
  const aromas = wine.notes.split(/\s*[,،]\s*/).filter(Boolean).slice(0, AROMA_SLOTS.length);
  const pairs = [...new Set(wine.pairings.map((o) => (o === 'meat' ? 'red' : o)))] as Occasion[];

  return (
    <section id="collection" ref={ref} className={styles.section} style={vars}>
      {wines.map((_, i) => <div key={i} className={styles.snap} style={{ top: `calc(${i} * (100% - 100vh) / ${n - 1})` }} />)}

      <div className={styles.sticky}>
        <div className={styles.wash} style={{ background: wash.under }} aria-hidden />
        <div key={wash.key} className={styles.pour} data-dir={wash.dir} style={{ '--pour': tone.bg } as CSSProperties} aria-hidden />
        {near && fxTypes.map((type) => (
          <div key={type} className={styles.fxLayer} data-on={type === wine.type} data-dark={tone.fg !== 'var(--color-text)'} aria-hidden>
            <WineHeroFx type={type} className={styles.fx} calm />
          </div>
        ))}
        <div className={`container ${styles.top}`}>
          <span className="kicker" style={{ color: 'var(--mute)' }}>{t.collection.kicker}</span>
          <h2 className={styles.heading}>{t.collection.title}</h2>
          <Link href={`/${locale}/wines`} className={styles.viewAll}>{t.collection.viewAll}<ArrowUpRight size={16} /></Link>
        </div>

        <div className={`container ${styles.grid}`}>
          <div className={styles.text}>
            {wines.map((w, i) => (
              <div key={w.slug} className={styles.chapter} data-state={i === ch ? 'on' : i < ch ? 'past' : 'next'} aria-hidden={i !== ch}>
                <span className={styles.meta}>{[w.typeLabel, w.appellation].filter(Boolean).join(' · ')}</span>
                <h3 className={styles.name} aria-label={w.name}>
                  {w.name.split(' ').map((word, wi, arr) => (
                    <span key={wi} className={styles.word} aria-hidden>
                      {[...word].map((c, ci) => <span key={ci} className={styles.char} style={{ '--d': `${(arr.slice(0, wi).join('').length + ci) * 22}ms` } as CSSProperties}>{c}</span>)}
                      {wi < arr.length - 1 && ' '}
                    </span>
                  ))}
                </h3>
                <p className={styles.notes}>{w.notes}</p>
                <div className={styles.makerLine}>{w.maker} · {w.region}</div>
              </div>
            ))}
          </div>

          <div className={styles.stage} onPointerMove={light} onPointerLeave={(e) => e.currentTarget.style.setProperty('--lo', '0')}>
            <div className={styles.bigNum} aria-hidden>
              {wines.map((w, i) => <span key={w.slug} style={{ transform: `translateY(${(i - ch) * 100}%)` }}>{w.num}</span>)}
            </div>
            <div className={styles.floor} aria-hidden />

            <div ref={bottlesBoxRef} className={styles.bottles}>
              {wines.map((w, i) => (
                <button key={w.slug} ref={(el) => { bottlesRef.current[i] = el; }} type="button" className={styles.bottle}
                  data-view={t.wine.view} data-state={i === ch ? 'on' : 'off'} tabIndex={i === ch ? 0 : -1} aria-label={`${t.wine.view}: ${w.name}`}
                  onClick={(e) => open(w.slug, e.currentTarget.querySelector('img'))}>
                  <Image src={w.image} alt="" fill sizes="(max-width: 900px) 40vw, 340px" style={{ objectFit: 'contain', objectPosition: 'bottom' }} />
                  <span className={styles.spot} style={{ '--src': `url(${w.image})` } as CSSProperties} aria-hidden />
                </button>
              ))}
            </div>

            <svg className={styles.glass} viewBox="0 0 120 300" aria-hidden>
              <defs>
                <clipPath id="coll-bowl"><path d={BOWL} /></clipPath>
                <linearGradient id="coll-depth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity=".22" />
                  <stop offset="1" stopColor="#000" stopOpacity=".32" />
                </linearGradient>
              </defs>
              <path d={BOWL} className={styles.glassBody} />
              <g clipPath="url(#coll-bowl)">
                <path ref={liquidRef} className={styles.liquid} />
                <rect x="0" y="0" width="120" height="150" fill="url(#coll-depth)" style={{ mixBlendMode: 'soft-light' }} />
                <path ref={surfaceRef} className={styles.surface} />
                <g ref={fizzRef} className={styles.fizz}>
                  {Array.from({ length: 14 }, (_, k) => (
                    <circle key={k} cx={34 + ((k * 37) % 52)} cy={140} r={0.8 + (k % 3) * 0.5} style={{ animationDelay: `${(k * 0.37) % 3}s`, animationDuration: `${2.4 + (k % 4) * 0.5}s` }} />
                  ))}
                </g>
              </g>
              <path d={BOWL} className={styles.glassEdge} />
              <path d="M30 26 C27 64 33 108 47 130" className={styles.glint} />
              <path d="M56.5 145 Q60 149 63.5 145 L62.2 268 L57.8 268 Z" className={styles.stem} />
              <ellipse cx="60" cy="272" rx="36" ry="5" className={styles.foot} />
            </svg>

            <AwardSeal key={`seal-${wine.slug}`} wine={wine} className={styles.seal} idPrefix="coll-seal" />

            <div ref={aromasRef} key={`aromas-${wine.slug}`} className={styles.aromas} aria-hidden>
              {aromas.map((a, k) => {
                const slot = AROMA_SLOTS[k];
                return (
                  <span key={a} className={styles.aroma} data-z={slot.z}
                    style={{ '--sx': slot.x, '--sy': slot.y, '--k': k, '--z': slot.z } as CSSProperties}>
                    <span>{a}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className={styles.facts}>
            {wines.map((w, i) => (
              <dl key={w.slug} className={styles.factSet} data-state={i === ch ? 'on' : 'off'} aria-hidden={i !== ch}>
                <div>
                  <dt className="label">{t.wine.pairsWith}</dt>
                  <dd>
                    {i === ch && pairs.length > 0 && (
                      <ul className={styles.pairs}>
                        {pairs.map((o, k) => {
                          const Icon = PAIR_ICON[o];
                          return Icon ? <li key={o} title={t.food[o]} style={{ '--k': k } as CSSProperties}><Icon size={18} /><span>{t.food[o]}</span></li> : null;
                        })}
                      </ul>
                    )}
                    <span className={styles.pairText}>{w.pairsShort}</span>
                  </dd>
                </div>
                <div className={styles.factPair}>
                  {w.serve && <div><dt className="label">{t.wine.serve}</dt><dd>{w.serve}</dd></div>}
                  {w.abv && <div><dt className="label">{t.wine.abv}</dt><dd>{w.abv}</dd></div>}
                </div>
                <button type="button" className="btn" style={{ background: w.tone.btnBg, color: w.tone.btnFg }} onClick={() => open(w.slug)} tabIndex={i === ch ? 0 : -1}>
                  {t.wine.details}<ArrowRight size={18} />
                </button>
              </dl>
            ))}
          </div>
        </div>

        <div className={`container ${styles.rail}`}>
          <button type="button" className={styles.skip} onClick={skip}>{t.finder.kicker}<ArrowDown size={16} /></button>
        </div>
      </div>
    </section>
  );
}
