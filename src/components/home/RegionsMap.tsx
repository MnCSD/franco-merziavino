'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { GEO_IDS, GEO_LABEL, GEO_NAMES, type GeoData, type GeoId } from '@/lib/geo';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MaskHeading, Reveal } from '@/components/ui/Reveal';
import { useWineDrawer } from '@/components/wine/WineDrawerProvider';
import type { Locale, LocalizedWine } from '@/types/wine';
import styles from './RegionsMap.module.css';

const E = 'cubic-bezier(.16,1,.3,1)';
const TOUR_MS = 4800;
const TYPE_COLOR = { white: '#e9dc9a', rose: '#e8b4b0', red: '#6b1d28', sparkling: '#f3eccb' } as const;
/** 3D map: each wine region is extruded by its label count (stacked copies STEP px apart). */
const STEP = 2;
const LIFT_PER_LABEL = 2.2;
const MIN_LIFT = 6;
/** Room round the map (viewBox units): above for the tallest extrusions. */
const PADT = 90;
const PADX = 30;
const PADB = 30;
/** Extra room on the right for the Greece marker the routes run to. */
const PADR = 160;
/** Routes to Greece: where they land (map space, ~38°N east of Apulia) and how thick per label. */
const GREECE = { x: 880, y: 812 };
const ROUTE_W = (labels: number) => 0.9 + labels * 0.12;
/** Where the lamp sits when the pointer isn't over the map: north-west (viewBox units, map space). */
const LIGHT_HOME = { x: 150, y: -40 };
/** Side-face shading per state: lit colour near the lamp → shadow colour far from it. */
const SIDE_LIGHT = { n: ['#7a2030', '#24070d'], hv: ['#93303f', '#3a1018'], on: ['#c39a5c', '#4f3a1d'] } as const;

/** viewBox around an absolute M/L path (region outline for the card header). */
const boxOf = (d: string) => {
  const n = d.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i + 1 < n.length; i += 2) { x0 = Math.min(x0, n[i]); x1 = Math.max(x1, n[i]); y0 = Math.min(y0, n[i + 1]); y1 = Math.max(y1, n[i + 1]); }
  const pad = Math.max(x1 - x0, y1 - y0) * 0.06;
  return `${x0 - pad} ${y0 - pad} ${x1 - x0 + pad * 2} ${y1 - y0 + pad * 2}`;
};
/** Data-sheet grape lines → grape names ("Negroamaro και άλλες …" → "Negroamaro"; generic blends dropped). */
const grapesOf = (g?: string) => (g ?? '').split(/,\s*/).map((x) => x.split(/\s+(?:και|and)\s+/)[0].trim()).filter((x) => x && !/ποικιλ|variet/i.test(x));

/** Counts up from 0 the first time it scrolls into view. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.textContent = '0';
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / 1400);
        el.textContent = String(Math.round(to * (1 - (1 - k) ** 3)));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{to}</span>;
}

/** Ask the finder to filter by a map region and scroll to it. */
export const browseRegion = (id: GeoId) => {
  window.dispatchEvent(new CustomEvent('fmv:region', { detail: id }));
  setTimeout(() => document.getElementById('wines')?.scrollIntoView({ behavior: 'smooth' }), 60);
};

/**
 * Interactive Italy in relief: wine regions rise in height by their number of labels, lit by a
 * lamp that follows the pointer; an auto-tour highlights one region at a time, and a zoom-in
 * card shows stats, grapes, wineries and bottles. On first view the coastline draws itself in
 * gold, the regions fill north → south and then rise. Below the map, an index lists every region
 * by name (gold fills the one in focus); each opens its card.
 * Geometry: public/data/italy-regions.json (Natural Earth, pre-projected).
 */
export function RegionsMap({ locale, wines }: { locale: Locale; wines: LocalizedWine[] }) {
  const t = getDictionary(locale);
  const r = t.regions;
  const { open } = useWineDrawer();
  const reduced = useReducedMotion();
  const [geo, setGeo] = useState<GeoData | null>(null);
  const [sel, setSel] = useState<GeoId>('Veneto');
  const [hov, setHov] = useState<GeoId | null>(null);
  const [pop, setPop] = useState<GeoId | null>(null);
  const [vw, setVw] = useState(1200);
  const secRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const tour = useRef<{ id: number | null; done: boolean; seen: boolean }>({ id: null, done: false, seen: false });

  useEffect(() => {
    fetch('/data/italy-regions.json').then((res) => res.json()).then(setGeo).catch(() => {});
    const onR = () => setVw(window.innerWidth);
    onR();
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);

  const winesOf = useCallback((id: GeoId) => wines.filter((w) => w.geo.includes(id)), [wines]);
  const liftOf = useMemo(
    () => Object.fromEntries(GEO_IDS.map((id) => [id, Math.max(MIN_LIFT, winesOf(id).length * LIFT_PER_LABEL)])) as Record<GeoId, number>,
    [winesOf],
  );
  const onMap = wines.filter((w) => w.geo.length);
  const totals = [
    [r.statRegions, GEO_IDS.filter((id) => winesOf(id).length).length],
    [r.statLabels, onMap.length],
    [r.statWineries, new Set(onMap.map((w) => w.maker)).size],
  ] as const;
  const name = (id: GeoId) => GEO_NAMES[id][locale][0];
  const zone = (id: GeoId) => GEO_NAMES[id][locale][1];

  const stopTour = useCallback(() => { if (tour.current.id) clearInterval(tour.current.id); tour.current.id = null; }, []);
  const startTour = useCallback(() => {
    if (reduced || tour.current.id) return;
    tour.current.id = window.setInterval(() => setSel((s) => GEO_IDS[(GEO_IDS.indexOf(s) + 1) % GEO_IDS.length]), TOUR_MS);
  }, [reduced]);

  const openPop = useCallback((id: GeoId) => { stopTour(); setSel(id); setPop(id); }, [stopTour]);
  const closePop = useCallback(() => setPop(null), []);

  // Entrance + tour while in view
  useEffect(() => {
    const sec = secRef.current;
    if (!sec || !geo) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!tour.current.seen) {
          tour.current.seen = true;
          if (!reduced) {
            // 1. Coastline and borders draw on in gold.
            sec.querySelectorAll('[data-draw]').forEach((p, i) => p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1600, delay: i * 35, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'backwards' }));
            // 2. Fills arrive north → south (elements are already in latitude order).
            sec.querySelectorAll('[data-fade]').forEach((p, i) => p.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 900 + i * 50, fill: 'backwards' }));
            // 3. Wine regions rise to their height, north → south; pins ride up with them.
            GEO_IDS.map((id) => geo.regions.find((x) => x.id === id)).filter((g) => !!g).sort((a, b) => a.cy - b.cy).forEach((g, i) => {
              sec.querySelectorAll(`[data-rise="${g.id}"]`).forEach((el) => el.animate([{ '--g': 0 }, { '--g': 1 }], { duration: 1200, delay: 1500 + i * 120, easing: E, fill: 'backwards' }));
            });
            sec.querySelectorAll('[data-pin]').forEach((g, i) => g.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: 2200 + i * 80, fill: 'backwards' }));
            // 4. Routes to Greece draw on, then the shipments start moving.
            sec.querySelectorAll('[data-route]').forEach((p, i) => p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1500, delay: 3000 + i * 140, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'backwards' }));
            sec.querySelectorAll('[data-greece], [data-ships]').forEach((g) => g.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 4200, fill: 'backwards' }));
            // 5. The region index rises in under the map.
            sec.querySelectorAll('[data-strip]').forEach((g) => g.animate([{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }], { duration: 1200, delay: 1800, easing: E, fill: 'backwards' }));
          }
          setTimeout(startTour, reduced ? 1400 : 3400);
        } else startTour();
      } else stopTour();
    }, { threshold: 0.25 });
    io.observe(sec);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closePop();
    window.addEventListener('keydown', onKey);
    return () => { io.disconnect(); stopTour(); window.removeEventListener('keydown', onKey); };
  }, [geo, reduced, startTour, stopTour, closePop]);

  // The lamp: every light gradient's centre follows the pointer (map coordinates). No tilt: the
  // map stays flat so nothing skews; the stacked sides carry the 3D.
  useEffect(() => {
    const tilt = tiltRef.current, map = mapRef.current;
    if (!tilt || !map || reduced || !window.matchMedia('(pointer: fine)').matches) return;
    // Cache gradient elements to avoid querySelectorAll on every move
    const lights = map.querySelectorAll('[data-light]');
    const lamp = (x: number, y: number) => lights.forEach((g) => { g.setAttribute('cx', x.toFixed(0)); g.setAttribute('cy', y.toFixed(0)); });
    // Throttle mouse move to ~30fps for better performance
    let lastMove = 0;
    const move = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMove < 33) return; // ~30fps throttle
      lastMove = now;
      const b = tilt.getBoundingClientRect(), vb = map.querySelector('svg')?.viewBox.baseVal;
      if (vb) lamp(((e.clientX - b.left) / b.width) * vb.width - PADX, ((e.clientY - b.top) / b.height) * vb.height - PADT);
    };
    const leave = () => lamp(LIGHT_HOME.x, LIGHT_HOME.y);
    tilt.addEventListener('mousemove', move);
    tilt.addEventListener('mouseleave', leave);
    tilt.addEventListener('pointerdown', stopTour);
    return () => { tilt.removeEventListener('mousemove', move); tilt.removeEventListener('mouseleave', leave); tilt.removeEventListener('pointerdown', stopTour); };
  }, [reduced, stopTour, geo]);

  // Pulse on the selected pin
  useEffect(() => {
    if (reduced) return;
    const anims = [...(secRef.current?.querySelectorAll('[data-pulse="true"]') ?? [])].map((c) =>
      c.animate([{ transform: 'scale(.6)', opacity: 0.55 }, { transform: 'scale(4.2)', opacity: 0 }], { duration: 1800, iterations: Infinity, easing: 'cubic-bezier(.2,.6,.3,1)' }));
    return () => anims.forEach((a) => a.cancel());
  }, [sel, pop, geo, reduced]);

  // Popup entrance
  useEffect(() => {
    if (!pop || reduced) return;
    const sec = secRef.current;
    const card = sec?.querySelector<HTMLElement>('[data-pop]'), line = sec?.querySelector('[data-popline]');
    line?.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 500, delay: 900, easing: E, fill: 'backwards' });
    card?.animate([{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }], { duration: 800, delay: 1050, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'backwards' });
    card?.querySelectorAll('[data-mix]').forEach((el, i) => el.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 900, delay: 1550 + i * 120, easing: E, fill: 'backwards' }));
    card?.querySelectorAll('[data-pi]').forEach((el, i) => el.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: 700, delay: 1350 + i * 70, easing: E, fill: 'backwards' }));
  }, [pop, reduced]);

  const wideMap = vw >= 760, wide = vw >= 900;
  const W2 = geo ? geo.w + PADX + PADR : 990;
  const H2 = geo ? geo.h + PADT + PADB : 1190;
  const has = (id: string): id is GeoId => (GEO_IDS as readonly string[]).includes(id);
  const count = (n: number) => (n === 1 ? r.oneLabel : r.labels(n));

  let zoom = 'none';
  const popR = pop && geo ? geo.regions.find((x) => x.id === pop) : null;
  if (popR && pop) {
    const k = ['Trentino', 'Friuli', 'Abruzzo', 'Campania'].includes(pop) ? 2.1 : 1.7;
    const fx = wide ? 0.72 : 0.5, fy = wide ? 0.5 : 0.32;
    const cyTop = popR.cy + PADT - liftOf[pop] * 1.6;
    zoom = `translate(${(((fx * W2 - (popR.cx + PADX) * k) / W2) * 100).toFixed(2)}%, ${(((fy * H2 - cyTop * k) / H2) * 100).toFixed(2)}%) scale(${k})`;
  }
  // Regions in latitude order: plain ones lie flat, wine regions are extruded.
  const flat = geo ? geo.regions.filter((g) => !has(g.id)).sort((x, y) => x.cy - y.cy) : [];
  const ext = geo ? geo.regions.filter((g) => has(g.id)).sort((x, y) => x.cy - y.cy) : [];
  const latOf = (cy: number) => (geo ? 47.09 - (cy / geo.h) * 11.6 : 0);
  const coords = ext.length ? `${latOf(ext[0].cy).toFixed(1)}°N  →  ${latOf(ext[ext.length - 1].cy).toFixed(1)}°N` : '';
  // Each wine region's route: from its raised pin, arcing east over the sea to Greece.
  const routes = ext.map((g) => {
    const id = g.id as GeoId, sx = g.cx, sy = g.cy - liftOf[id];
    const lift = 90 + Math.abs(GREECE.x - sx) * 0.18;
    const d = `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${((sx + GREECE.x) / 2).toFixed(1)} ${(Math.min(sy, GREECE.y) - lift).toFixed(1)} ${GREECE.x} ${GREECE.y}`;
    return { id, d, n: winesOf(id).length };
  });
  const popWines = pop ? winesOf(pop) : [];
  const tally = (xs: string[]) => [...xs.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map<string, number>())].sort((a, b) => b[1] - a[1]);
  const popMakers = tally(popWines.map((w) => w.maker));
  const popGrapes = tally(popWines.flatMap((w) => [...new Set(grapesOf(w.grapes))]));
  const GRAPES_SHOWN = 8;
  const popAwards = popWines.reduce((a, w) => a + (w.awards.length || (w.award ? 1 : 0)), 0);
  const popMix = (Object.keys(TYPE_COLOR) as (keyof typeof TYPE_COLOR)[]).map((k) => ({ k, n: popWines.filter((w) => w.type === k).length })).filter((m) => m.n);

  return (
    <section id="regions" ref={secRef} className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.layout}>
        <div className={styles.intro}>
          <Reveal className="kicker" style={{ color: 'var(--color-accent-2-300)' }}>{r.kicker}</Reveal>
          <MaskHeading lines={r.title} className={styles.title} />
          <div className={styles.coords} aria-hidden><span>{coords}</span><i /></div>
          <Reveal as="p" className={styles.lead}>{r.lead}</Reveal>
          {/* Region index: every name on show, north → south; gold floods the one in focus */}
          <ol data-strip="" className={styles.index} aria-label={r.kicker}>
            {ext.map((g, i) => {
              const id = g.id as GeoId;
              return (
                <li key={id}>
                  <button type="button" data-on={id === sel || id === hov} aria-pressed={id === pop}
                    onMouseEnter={() => setHov(id)} onMouseLeave={() => setHov(null)} onFocus={() => setHov(id)} onBlur={() => setHov(null)}
                    onClick={() => openPop(id)}>
                    <span className={styles.idxNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.idxName} data-text={name(id)}>{name(id)}</span>
                    <span className={styles.idxMeta}><b>{count(winesOf(id).length)}</b> · {zone(id)}<ArrowRight size={14} /></span>
                  </button>
                </li>
              );
            })}
          </ol>
          <aside className={styles.totals}>
            {totals.map(([k, v]) => (
              <div key={k} className={styles.total}>
                <div className={styles.totalV}><CountUp to={v} /></div>
                <div className={styles.totalK}>{k}</div>
              </div>
            ))}
            <div className={styles.key}>
              <svg viewBox="0 0 54 34" aria-hidden>
                {[[0, 10], [18, 18], [36, 30]].map(([x, h]) => (
                  <g key={x}><rect x={x} y={34 - h} width={16} height={h} fill="#3a0d15" /><rect x={x} y={34 - h - 4} width={16} height={5} fill="#6b1d28" /></g>
                ))}
              </svg>
              <span>{r.heightKey}</span>
            </div>
          </aside>
        </div>

        <div className={styles.stage}>
          <div ref={tiltRef} className={styles.tilt}>
            <div ref={mapRef} className={styles.map}>
              <div className={styles.frame} onClick={closePop}>
                <div style={{ transformOrigin: '0 0', transform: zoom, transition: 'transform 1.25s cubic-bezier(.65,0,.35,1)' }}>
                  <svg viewBox={`0 0 ${W2} ${H2}`} role="img" aria-label={r.aria} className={styles.svg}>
                    {geo && (
                        <>
                          <defs>
                            {ext.map((g) => <path key={g.id} id={`rg-${g.id}`} d={g.d} />)}
                            {(Object.keys(SIDE_LIGHT) as (keyof typeof SIDE_LIGHT)[]).map((k) => (
                              <radialGradient key={k} id={`map-side-${k}`} data-light="" gradientUnits="userSpaceOnUse" cx={LIGHT_HOME.x} cy={LIGHT_HOME.y} r={560}>
                                <stop offset="0" stopColor={SIDE_LIGHT[k][0]} /><stop offset="1" stopColor={SIDE_LIGHT[k][1]} />
                              </radialGradient>
                            ))}
                            <radialGradient id="map-top-light" data-light="" gradientUnits="userSpaceOnUse" cx={LIGHT_HOME.x} cy={LIGHT_HOME.y} r={420}>
                              <stop offset="0" stopColor="#fff4dc" stopOpacity=".34" /><stop offset="1" stopColor="#fff4dc" stopOpacity="0" />
                            </radialGradient>
                          </defs>
                          <g transform={`translate(${PADX} ${PADT})`}>
                            {flat.map((g) => (
                              <path key={g.id} data-fade="" d={g.d} stroke="#26090e" strokeWidth={1.6} strokeLinejoin="round" fill="color-mix(in srgb,#f7f3ee 13%,transparent)" aria-label={g.name}
                                style={{ opacity: pop ? 0.5 : 1, transition: 'opacity .5s ease' }} />
                            ))}
                            <g className={styles.outline} aria-hidden>
                              {[...flat, ...ext].map((g) => <path key={g.id} data-draw="" d={g.d} pathLength={1} />)}
                            </g>
                            {ext.map((g) => {
                              const id = g.id as GeoId, on = id === sel, hv = id === hov, lift = liftOf[id];
                              const top = on ? '#b8945e' : hv ? '#8a3440' : '#6b1d28';
                              const focus = pop === id;
                              const raise = { transition: `--g .95s ${E}` } as const;
                              return (
                                <g key={id} data-rise={id} role="button" aria-label={`${name(id)} · ${count(winesOf(id).length)}`}
                                  onClick={(e) => { e.stopPropagation(); openPop(id); }} onMouseEnter={() => setHov(id)} onMouseLeave={() => setHov(null)}
                                  style={{ ...raise, '--g': pop ? (focus ? 1.6 : 0.05) : 1, cursor: 'pointer', opacity: pop && !focus ? 0.4 : 1, transition: `${raise.transition}, opacity .6s ease` } as CSSProperties}>
                                  {Array.from({ length: Math.round(lift / STEP) }, (_, k) => (
                                    <use key={k} href={`#rg-${id}`} fill={`url(#map-side-${on ? 'on' : hv ? 'hv' : 'n'})`} style={{ transform: `translateY(calc(var(--g, 1) * ${-(k + 1) * STEP}px))` }} />
                                  ))}
                                  <use href={`#rg-${id}`} data-fade="" fill={top} stroke={focus ? '#fff1cf' : on ? '#f3e2bd' : '#26090e'} strokeWidth={focus ? 2.6 : on ? 2 : 1.4} strokeLinejoin="round"
                                    style={{ transform: `translateY(calc(var(--g, 1) * ${-lift}px))`, transition: 'fill .45s ease, stroke .45s ease, filter .6s ease', filter: focus ? 'drop-shadow(0 0 10px rgba(243,226,189,.75)) drop-shadow(0 0 26px rgba(220,197,158,.45))' : 'none' }} />
                                  <use href={`#rg-${id}`} fill="url(#map-top-light)" style={{ transform: `translateY(calc(var(--g, 1) * ${-lift}px))`, mixBlendMode: 'screen', pointerEvents: 'none' }} />
                                </g>
                              );
                            })}
                            {ext.map((g) => {
                              const id = g.id as GeoId, on = id === sel || id === hov;
                              return (
                                <g key={id} data-rise={id} style={{ '--g': pop ? (pop === id ? 1.6 : 0.05) : 1, transition: `--g .95s ${E}`, pointerEvents: 'none', transform: `translateY(calc(var(--g, 1) * ${-liftOf[id]}px))` } as CSSProperties}>
                                  <g data-pin="" style={{ opacity: pop ? (id === pop ? 1 : 0) : 1, transition: 'opacity .5s ease' }}>
                                    <circle data-pulse={String(id === sel)} cx={g.cx} cy={g.cy} r={10} fill="#dcc59e" style={{ transformBox: 'fill-box', transformOrigin: '50% 50%', opacity: 0 }} />
                                    <circle cx={g.cx} cy={g.cy} r={on ? 14 : 0} fill="none" stroke="#dcc59e" strokeWidth={1.5} style={{ transition: `r .5s ${E}` }} />
                                    <circle cx={g.cx} cy={g.cy} r={4.5} fill="#f7f3ee" />
                                    {!wideMap && <text x={g.cx + GEO_LABEL[id][0]} y={g.cy + GEO_LABEL[id][1]} textAnchor={GEO_LABEL[id][2]} className={styles.pinLabel}>{name(id)}</text>}
                                  </g>
                                </g>
                              );
                            })}
                            {/* Routes to Greece: one gold arc per region (thicker = more labels), shipments travelling along */}
                            <g className={styles.routes} data-focus={hov ?? undefined} style={{ opacity: pop ? 0 : 1 }} aria-hidden>
                              {routes.map((rt) => (
                                <path key={rt.id} data-route="" data-id={rt.id} d={rt.d} pathLength={1} strokeWidth={ROUTE_W(rt.n)} data-lit={rt.id === hov} />
                              ))}
                              {!reduced && (
                                <g data-ships="">
                                  {routes.flatMap((rt, i) => Array.from({ length: 1 + Math.floor(rt.n / 8) }, (_, k) => {
                                    const dur = 5 + (i % 3) * 0.8;
                                    return (
                                      <g key={`${rt.id}-${k}`} className={styles.ship} data-lit={rt.id === hov}>
                                        <circle r={6} className={styles.shipGlow} />
                                        <circle r={2.2} className={styles.shipCore} />
                                        <animateMotion dur={`${dur}s`} begin={`${-((i * 0.9 + (k * dur) / (1 + Math.floor(rt.n / 8))) % dur).toFixed(2)}s`} repeatCount="indefinite" path={rt.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".45 0 .55 1" />
                                      </g>
                                    );
                                  }))}
                                </g>
                              )}
                              <g data-greece="" transform={`translate(${GREECE.x} ${GREECE.y})`}>
                                <circle r={16} className={styles.greeceRing} />
                                <circle r={5} className={styles.greeceDot} />
                                <text x={0} y={44} textAnchor="middle" className={styles.greeceName}>→ {r.routesTo}</text>
                                <text x={0} y={66} textAnchor="middle" className={styles.greeceSub}>{r.routesSub}</text>
                              </g>
                            </g>
                          </g>
                        </>
                    )}
                  </svg>
                </div>

              </div>
            </div>
            {/* Card + leader line live outside the tilted map so they always read flat */}
            {pop && geo && (
              <>
                {wide && <div data-popline="" className={styles.popLine} />}
                <div data-pop="" role="dialog" aria-label={name(pop)} className={styles.pop} data-wide={wide} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.popHead}>
                    <svg className={styles.popShape} viewBox={boxOf(popR!.d)} aria-hidden><path d={popR!.d} pathLength={1} /></svg>
                    <div data-pi="" className={styles.popTop}>
                      <span>N° {String(ext.findIndex((g) => g.id === pop) + 1).padStart(2, '0')} · {zone(pop)} · {latOf(popR!.cy).toFixed(1)}°N</span>
                      <button type="button" onClick={closePop} aria-label={t.nav.close}><X size={16} /></button>
                    </div>
                    <div data-pi="" className={styles.popName} data-long={name(pop).length > 12}>{name(pop)}</div>
                  </div>
                  <div data-pi="" className={styles.stats}>
                    {[[r.statLabels, popWines.length], [r.statWineries, popMakers.length], popAwards ? [r.statAwards, popAwards] : [r.grapes, popGrapes.length]].map(([k, v]) => (
                      <div key={String(k)}><div className={styles.statV}><CountUp key={`${pop}-${k}`} to={Number(v)} /></div><div className={styles.statK}>{k}</div></div>
                    ))}
                  </div>
                  <div className={styles.popBody}>
                    <div data-pi="" className={styles.block}>
                      <div className={styles.blockK}>{r.mix}</div>
                      <div className={styles.mixBar}>{popMix.map((m) => <span key={m.k} data-mix="" style={{ flex: m.n, background: TYPE_COLOR[m.k] }} />)}</div>
                      <div className={styles.mixKey}>
                        {popMix.map((m) => (
                          <span key={m.k}><i style={{ background: TYPE_COLOR[m.k] }} />{t.typeFilter[m.k]}<em>{Math.round((m.n / popWines.length) * 100)}%</em></span>
                        ))}
                      </div>
                    </div>
                    {popGrapes.length > 0 && (
                      <div data-pi="" className={styles.block}>
                        <div className={styles.blockK}>{r.grapes}</div>
                        <div className={styles.grapes}>
                          {popGrapes.slice(0, GRAPES_SHOWN).map(([g, n]) => <span key={g}>{g}{n > 1 && <em>{n}</em>}</span>)}
                          {popGrapes.length > GRAPES_SHOWN && <span className={styles.more}>+{popGrapes.length - GRAPES_SHOWN}</span>}
                        </div>
                      </div>
                    )}
                    <div data-pi="" className={styles.block}>
                      <div className={styles.blockK}>{r.wineries}</div>
                      <ul className={styles.makers}>
                        {popMakers.map(([m, n]) => <li key={m}><span>{m}</span><em>{count(n)}</em></li>)}
                      </ul>
                    </div>
                    <div data-pi="" className={styles.block}>
                      <div className={styles.shelfHead}>
                        <div className={styles.blockK}>{r.statLabels}</div>
                        {popWines.length > 4 && (
                          <div className={styles.shelfNav}>
                            <button type="button" aria-label={t.wine.prev} onClick={(e) => e.currentTarget.closest('[data-pi]')?.querySelector('[data-shelf]')?.scrollBy({ left: -240, behavior: 'smooth' })}><ArrowLeft size={14} /></button>
                            <button type="button" aria-label={t.wine.next} onClick={(e) => e.currentTarget.closest('[data-pi]')?.querySelector('[data-shelf]')?.scrollBy({ left: 240, behavior: 'smooth' })}><ArrowRight size={14} /></button>
                          </div>
                        )}
                      </div>
                      <div className={styles.shelfWrap}>
                        <div data-shelf="" className={styles.bottles}>
                          {popWines.map((w) => (
                            <button key={w.slug} type="button" onClick={(e) => open(w.slug, e.currentTarget.querySelector('img'))}>
                              {/* eslint-disable-next-line @next/next/no-img-element -- natural aspect at fixed height */}
                              <span><img src={w.image} alt={w.name} loading="lazy" /></span>
                              <span>{w.short}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.popFoot}>
                    <button type="button" className="btn btn-primary" onClick={() => { closePop(); browseRegion(pop); }}>{r.browse}<ArrowRight size={18} /></button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        </div>
      </div>

    </section>
  );
}
