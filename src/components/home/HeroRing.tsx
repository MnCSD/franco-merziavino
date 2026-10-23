'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { Locale, LocalizedWine } from '@/types/wine';
import { useWineDrawer } from '@/components/wine/WineDrawerProvider';
import { AwardSeal } from '@/components/wine/AwardSeal';
import styles from './HeroRing.module.css';

const AUTOPLAY_MS = 4200;
const PERSPECTIVE = 1100;
const RING_C = 2 * Math.PI * 22;

/** Ambient aura colour per wine — the stage light shifts with the bottle in front. */
const AURA_BY_SLUG: Record<string, string> = { spritz: 'rgba(238,118,46,.52)', 'moscato-premium': 'rgba(232,206,128,.46)' };
const AURA_BY_TYPE = { red: 'rgba(176,26,52,.62)', white: 'rgba(214,188,118,.46)', sparkling: 'rgba(230,208,156,.44)', rose: 'rgba(228,126,140,.5)' };
const auraOf = (w: LocalizedWine) => AURA_BY_SLUG[w.slug] ?? AURA_BY_TYPE[w.type];

/** Drop-in entrance: bottles fall onto the orbit back-to-front, the front one last. */
const DROP_MS = 1100;
const DROP_GAP = 110;
/** Damped bounce: 1 = held above the stage, 0 = resting on the floor. */
const dropAt = (t: number) => (t <= 0 ? 1 : t >= 1 ? 0 : Math.exp(-4.5 * t) * Math.abs(Math.cos(7.5 * t)));

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%°·';

/** Text that decodes from random glyphs, left to right, each time `run` turns on. */
function Scramble({ text, run, delay }: { text: string; run: boolean; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = text;
    if (!run || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const begin = performance.now() + delay;
    const dur = 400 + text.length * 30;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(Math.max((now - begin) / dur, 0), 1);
      const done = Math.floor(p * text.length);
      el.textContent = text.slice(0, done) + [...text.slice(done)].map((ch) => (ch === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join('');
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, run, delay]);
  return <span ref={ref} className="cValue">{text}</span>;
}

/**
 * Hero: bestseller bottles orbit on a ring projected in JS (every bottle faces the viewer,
 * scaled and faded by depth, leaning with the ring's velocity). Drag/swipe, arrows, keyboard,
 * or a side bottle turn it; click the front bottle to open the quick look. When the ring
 * rests, hairline callouts draw out from the front bottle with its key facts, plus an award
 * seal when it has one. Bottles drop in on load, flicks carry momentum, and the ring tips
 * back and fades as the hero scrolls away. Opening a bottle morphs it into the quick look.
 */
export function HeroRing({ wines, locale }: { wines: LocalizedWine[]; locale: Locale }) {
  const t = getDictionary(locale);
  const n = wines.length;
  const step = 360 / n;
  const { open } = useWineDrawer();

  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const sparksRef = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<SVGCircleElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);
  const settledRef = useRef(false);
  const m = useRef({
    tgt: 0, rot: 540, lastAuto: 0, mx: 0, my: 0, cx: 0, cy: 0, px: 0, py: 0,
    drag: null as null | { x: number; t: number; moved: boolean; lx: number; lt: number; vx: number }, moved: false, paused: false,
  });
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const turn = useCallback((d: number) => { m.current.tgt -= d * step; m.current.lastAuto = performance.now(); }, [step]);
  const goTo = useCallback((i: number) => {
    const s = m.current;
    let d = i - activeRef.current;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    s.tgt -= d * step; s.lastAuto = performance.now();
  }, [n, step]);

  useEffect(() => {
    const s = m.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const introDelay = document.documentElement.dataset.intro === 'playing' ? 2700 : 0;
    s.rot = s.tgt;
    let start = performance.now() + introDelay;
    const dist = (i: number) => Math.min(i, n - i);
    const maxDist = Math.floor(n / 2);
    const introEnd = reduced ? start : start + maxDist * DROP_GAP + DROP_MS;
    s.lastAuto = introEnd + 1600;
    let landed = reduced;
    let raf = 0;
    let heroH = heroRef.current?.offsetHeight ?? 1;
    const onResize = () => { heroH = heroRef.current?.offsetHeight ?? 1; };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const stage = stageRef.current;
      if (!stage) return;

      // Cursor follower and parallax ease toward the pointer even before the ring starts.
      s.px += (s.cx - s.px) * 0.18; s.py += (s.cy - s.py) * 0.18;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${s.px}px, ${s.py}px)`;
      if (bigRef.current && !reduced) bigRef.current.style.transform = `translate3d(${s.mx * -60}px, ${s.my * -24}px, 0)`;
      if (now < start) return;

      // Scroll exit: the ring tips back, spreads and fades as the hero scrolls away.
      const q = reduced ? 0 : Math.min(Math.max(window.scrollY / heroH, 0), 1);
      if (ringRef.current) {
        ringRef.current.style.transform = q ? `perspective(1400px) translateY(${q * -50}px) rotateX(${q * 34}deg) scale(${1 - q * 0.14})` : '';
        ringRef.current.style.opacity = String(Math.max(0, 1 - q * 1.25));
      }
      if (bigRef.current) bigRef.current.style.opacity = String(Math.max(0, 1 - q * 1.6));

      const autoOn = now > introEnd && !s.drag && !reduced && !s.paused && !document.body.style.overflow;
      if (autoOn && now - s.lastAuto > AUTOPLAY_MS) { s.tgt -= step; s.lastAuto = now; }
      if (progRef.current) {
        const p = autoOn ? Math.min(Math.max((now - s.lastAuto) / AUTOPLAY_MS, 0), 1) : 0;
        progRef.current.style.strokeDashoffset = String(RING_C * (1 - p));
      }

      const vel = s.tgt - s.rot;
      s.rot += vel * (reduced ? 1 : s.drag ? 0.3 : 0.06);
      const lean = reduced ? 0 : Math.max(-11, Math.min(11, vel * 0.09));
      const W = stage.clientWidth;
      const R = Math.min(W * 0.3, 520) * (1 + q * 0.7);
      if (orbitRef.current) orbitRef.current.style.width = `${(2 * R * PERSPECTIVE) / (PERSPECTIVE + R) + 160}px`;

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const th = ((i * step + s.rot) * Math.PI) / 180;
        const x = Math.sin(th) * R;
        const z = Math.cos(th) * R - R;
        const sc = PERSPECTIVE / (PERSPECTIVE - z);
        const dp = (Math.cos(th) + 1) / 2;
        const front = dp > 0.97 && !reduced;
        const bob = front ? Math.sin(now / 700) * 7 : 0;
        const fall = reduced ? 0 : dropAt((now - start - (maxDist - dist(i)) * DROP_GAP) / DROP_MS) * -stage.clientHeight;
        const tilt = front ? s.mx * 26 : 0;
        el.style.transform = `translateX(-50%) translateX(${x * sc}px) translateY(${bob + fall}px) scale(${sc}) rotate(${-lean * (0.4 + 0.6 * dp)}deg) perspective(900px) rotateY(${Math.sin(th) * -22 + tilt}deg)`;
        el.style.zIndex = String(Math.round(dp * 100));
        el.style.opacity = (fall < -stage.clientHeight * 0.92 ? 0 : 0.3 + 0.7 * dp).toFixed(3);
        // Steeper falloff than opacity so the neighbours recede behind the front bottle's callouts.
        el.style.filter = `brightness(${(0.32 + 0.68 * dp ** 5).toFixed(3)}) drop-shadow(0 24px 22px rgba(0,0,0,.45))`;
      });
      // The front bottle's first touchdown sends a ring of dust across the floor.
      if (!landed && now - start - maxDist * DROP_GAP > DROP_MS * 0.21) {
        landed = true;
        impactRef.current?.animate(
          [{ transform: 'translate(-50%, 50%) scale(.2)', opacity: 0.9 }, { transform: 'translate(-50%, 50%) scale(1.6)', opacity: 0 }],
          { duration: 900, easing: 'cubic-bezier(.2,.7,.3,1)' },
        );
      }
      // Callouts draw in once the ring comes to rest and ride the front bottle's bob.
      const still = now > introEnd && !s.drag && Math.abs(vel) < 0.8;
      if (still !== settledRef.current) { settledRef.current = still; setSettled(still); }
      if (calloutsRef.current) calloutsRef.current.style.translate = `0 ${reduced ? 0 : Math.sin(now / 700) * 7}px`;
      const idx = ((Math.round(-s.tgt / step) % n) + n) % n;
      if (idx !== activeRef.current) { activeRef.current = idx; setActive(idx); }
    };
    raf = requestAnimationFrame(loop);

    // Off-screen: stop the frame loop and freeze every animation; resume where it left off.
    const hero = heroRef.current;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting === visible || !hero) return;
      visible = e.isIntersecting;
      hero.toggleAttribute('data-off', !visible);
      hero.getAnimations({ subtree: true }).forEach((a) => (visible ? a.play() : a.pause()));
      cancelAnimationFrame(raf);
      if (visible) { s.lastAuto = performance.now(); raf = requestAnimationFrame(loop); }
    });
    if (hero) io.observe(hero);

    const onMove = (e: PointerEvent) => {
      s.mx = e.clientX / window.innerWidth - 0.5;
      s.my = e.clientY / window.innerHeight - 0.5;
      const r = stageRef.current?.getBoundingClientRect();
      if (r) { s.cx = e.clientX - r.left; s.cy = e.clientY - r.top; }
      if (!s.drag) return;
      const d = s.drag;
      const dx = e.clientX - d.x;
      if (Math.abs(dx) > 6) d.moved = true;
      s.tgt = d.t + dx * 0.28;
      // Smoothed pointer velocity (px/ms) for the flick on release.
      const dt = Math.max(1, e.timeStamp - d.lt);
      d.vx = d.vx * 0.6 + ((e.clientX - d.lx) / dt) * 0.4;
      d.lx = e.clientX; d.lt = e.timeStamp;
    };
    const onUp = () => {
      cursorRef.current?.removeAttribute('data-down');
      if (!s.drag) return;
      const d = s.drag;
      s.moved = d.moved; s.drag = null;
      // Flick: carry the swipe on (up to 5 bottles), then settle on the nearest one.
      const fresh = performance.now() - d.lt < 80;
      const fling = fresh ? Math.max(-5 * step, Math.min(5 * step, d.vx * 0.28 * 320)) : 0;
      s.tgt = Math.round((s.tgt + fling) / step) * step; s.lastAuto = performance.now();
      setTimeout(() => { s.moved = false; }, 0);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('resize', onResize);

    // Rising gold sparks
    const box = sparksRef.current;
    if (box && !reduced && !box.childElementCount) {
      for (let k = 0; k < 30; k++) {
        const sp = document.createElement('span');
        const size = 2 + Math.random() * 4;
        sp.style.cssText = `position:absolute;left:${28 + Math.random() * 44}%;bottom:18%;width:${size}px;height:${size}px;background:var(--color-accent-2-300);transform:rotate(45deg);opacity:0`;
        box.appendChild(sp);
        const drift = (Math.random() - 0.5) * 140, rise = 280 + Math.random() * 360, dur = 5000 + Math.random() * 6000;
        sp.animate(
          [{ transform: 'translate(0,0) rotate(45deg) scale(.4)', opacity: 0 }, { opacity: 0.85, offset: 0.15 }, { transform: `translate(${drift}px,-${rise}px) rotate(225deg) scale(1)`, opacity: 0 }],
          { duration: dur, delay: -Math.random() * dur, iterations: Infinity, easing: 'cubic-bezier(.3,0,.6,1)' },
        );
      }
    }
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); window.removeEventListener('resize', onResize); start = Infinity; };
  }, [n, step]);

  const onDown = (e: RPointerEvent) => {
    m.current.drag = { x: e.clientX, t: m.current.tgt, moved: false, lx: e.clientX, lt: e.timeStamp, vx: 0 };
    cursorRef.current?.setAttribute('data-down', '');
  };
  const setMode = (mode: string) => cursorRef.current?.setAttribute('data-mode', mode);
  const wine = wines[active];
  const callouts = [
    { side: 'l', top: '30%', k: wine.maker, v: [wine.region, wine.appellation].filter(Boolean).join(' · ') },
    { side: 'r', top: '44%', k: t.wine.grapes, v: wine.grapes ?? '' },
    { side: 'l', top: '64%', k: [wine.abv && t.wine.abv, wine.serve && t.wine.serve].filter(Boolean).join(' · '), v: [wine.abv, wine.serve].filter(Boolean).join(' · ') },
  ].filter((c) => c.v);
  // Phones: no room beside the bottle, so the key facts sit in one strip beneath it.
  const specs = [
    [t.wine.grapes, wine.grapes],
    [t.wine.abv, wine.abv],
    [t.wine.serve, wine.serve],
  ].filter((f): f is [string, string] => !!f[1]);

  return (
    <section ref={heroRef} className={styles.hero} aria-roledescription="carousel" style={{ '--aura': auraOf(wine) } as CSSProperties}
      onMouseEnter={() => { m.current.paused = true; }} onMouseLeave={() => { m.current.paused = false; }}>
      <div ref={stageRef} className={styles.stage} onPointerDown={onDown} tabIndex={0}
        onPointerEnter={() => cursorRef.current?.setAttribute('data-on', '')}
        onPointerLeave={() => cursorRef.current?.removeAttribute('data-on')}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') turn(1); if (e.key === 'ArrowLeft') turn(-1); }}>
        <div className={styles.aura} aria-hidden />
        <div className={styles.spot} aria-hidden />
        <div ref={sparksRef} className={styles.sparks} aria-hidden />

        <div ref={bigRef} className={styles.bigName} aria-hidden>
          {wines.map((w, i) => (
            <div key={w.slug} className={styles.bigRow} style={{ '--len': Math.max(w.short.length, 6) } as CSSProperties}>
              {[...w.short].map((ch, k) => (
                <span key={k} data-on={i === active} style={{ transitionDelay: `${i === active ? 160 + k * 40 : k * 14}ms` }}>
                  {ch === ' ' ? ' ' : ch}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div ref={ringRef} className={styles.ring}>
        <div ref={orbitRef} className={styles.orbit} aria-hidden>
          <svg viewBox="0 0 1000 140" preserveAspectRatio="none">
            <ellipse cx="500" cy="70" rx="496" ry="66" className={styles.orbitBase} />
            <ellipse cx="500" cy="70" rx="496" ry="66" className={styles.orbitDash} />
            <ellipse cx="500" cy="70" rx="496" ry="66" className={styles.orbitHot} />
          </svg>
        </div>
        <div className={styles.shadow} />
        <div ref={impactRef} className={styles.impact} aria-hidden />

        {wines.map((w, i) => (
          <button key={w.slug} ref={(el) => { itemsRef.current[i] = el; }} type="button" className={styles.item}
            data-on={i === active} aria-label={w.name}
            onPointerEnter={() => setMode(i === activeRef.current ? 'open' : 'view')}
            onPointerLeave={() => setMode('drag')}
            onClick={(e) => { if (m.current.moved) return; if (i === active) open(w.slug, e.currentTarget.querySelector('img')); else { goTo(i); setMode('open'); } }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- height-driven sizing with natural aspect ratio */}
            <img src={w.image} alt="" draggable={false} decoding="async" fetchPriority={i < 2 || i === n - 1 ? 'high' : 'low'} />
            <span className={styles.sheen} style={{ '--src': `url(${w.image})` } as CSSProperties} aria-hidden />
          </button>
        ))}
        <div ref={calloutsRef} className={styles.callouts} data-settled={settled} aria-hidden>
          {callouts.map((c, k) => (
            <div key={`${wine.slug}-${k}`} className={styles.callout} data-side={c.side} style={{ top: c.top, '--d': `${k * 0.18}s` } as CSSProperties}>
              <span className={styles.cDot} />
              <span className={styles.cLine} />
              <span className={styles.cText}>
                <span className={styles.cKicker}>{c.k}</span>
                <Scramble text={c.v} run={settled} delay={450 + k * 180} />
              </span>
            </div>
          ))}
          <AwardSeal key={wine.slug} wine={wine} className={styles.seal} idPrefix="hero-seal" />
        </div>
        </div>
        <div className={styles.fade} />
        {specs.length > 0 && (
          <dl key={wine.slug} className={styles.specs} data-settled={settled} aria-hidden>
            {specs.map(([k, v], i) => (
              <div key={k} style={{ '--d': `${i * 0.12}s` } as CSSProperties}>
                <dt>{k}</dt>
                <dd><Scramble text={v} run={settled} delay={250 + i * 120} /></dd>
              </div>
            ))}
          </dl>
        )}

        <div ref={cursorRef} className={styles.cursor} data-mode="drag" aria-hidden>
          <span className={styles.cursorDot} />
          <span className={styles.cursorLabel} data-l="drag"><ArrowLeft size={12} />{t.hero.drag}<ArrowRight size={12} /></span>
          <span className={styles.cursorLabel} data-l="open">{t.hero.open}<ArrowUpRight size={13} /></span>
          <span className={styles.cursorLabel} data-l="view">{t.wine.view}</span>
        </div>
      </div>

      <div className={styles.bar}>
        <div className={styles.count}>
          <svg viewBox="0 0 50 50" aria-hidden>
            <circle cx="25" cy="25" r="22" className={styles.countTrack} />
            <circle ref={progRef} cx="25" cy="25" r="22" className={styles.countProg} style={{ strokeDasharray: RING_C, strokeDashoffset: RING_C }} />
          </svg>
          <span className={styles.countNum}><span key={wine.num}>{String(active + 1).padStart(2, '0')}</span></span>
          <span className={styles.countTotal}>/ {String(n).padStart(2, '0')}</span>
        </div>
        <div className={styles.caps} aria-hidden>
          {wines.map((w, i) => (
            <div key={w.slug} className={styles.cap} data-on={i === active}>
              <div className={styles.capName}>{w.name}</div>
              <div className={styles.capMeta}>{w.typeLabel} · {w.region}</div>
            </div>
          ))}
        </div>
        <Link href={`/${locale}/wines`} className={styles.all}>{t.hero.viewAll}<ArrowRight size={16} /></Link>
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => turn(-1)} aria-label={t.wine.prev}><ArrowLeft size={18} /></button>
          <button type="button" className={styles.arrow} onClick={() => turn(1)} aria-label={t.wine.next}><ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
