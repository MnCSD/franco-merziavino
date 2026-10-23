import type { WineType } from '@/types/wine';

/** Media tint per wine type (cards, drawer, wine page). */
export const TINT: Partial<Record<WineType, string>> = {
  sparkling: 'var(--color-accent-2-100)',
  white: '#f5eecf',
  rose: '#f7e2dd',
  red: '#ecd5d5',
};

type Fx = (L: HTMLElement, B: boolean, still: boolean, k: number, calm: boolean) => void;

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const sign = () => (Math.random() < 0.5 ? -1 : 1);
const mk = (layer: HTMLElement, css: string) => {
  const e = document.createElement('span');
  e.style.cssText = `position:absolute;${css}`;
  layer.appendChild(e);
  return e;
};
const loop = (still: boolean, el: Element, kf: Keyframe[], o: { duration: number; easing?: string }) => {
  if (!still) el.animate(kf, { iterations: Infinity, ...o, delay: -rnd(0, o.duration) });
};

/** `k` = panel height / card height (≥1): distances and counts scale up on big panels. */
const FX: Partial<Record<WineType, Fx>> = {
  sparkling(L, B, still, k) {
    const n = Math.round((B ? 48 : 22) * Math.min(k, 2.5)), up = 330 * k;
    for (let i = 0; i < n; i++) {
      const d = (Math.random() < 0.75 ? rnd(3, B ? 8 : 7) : rnd(8, B ? 16 : 13)) * Math.sqrt(k);
      const x = B ? rnd(4, 96) : Math.random() < 0.5 ? rnd(8, 36) : rnd(64, 92);
      const w = rnd(4, 12) * sign() * Math.sqrt(k);
      const b = mk(L, `bottom:${still ? `${rnd(10, 80)}%` : '-14px'};left:${x}%;width:${d}px;height:${d}px;border-radius:50%;border:1px solid rgba(168,129,74,.55);background:radial-gradient(circle at 32% 30%,#fff 0 18%,rgba(255,255,255,.25) 40%,transparent 72%)`);
      loop(still, b, [
        { transform: 'translate(0,0)', opacity: 0 },
        { opacity: 1, offset: 0.1 },
        { transform: `translate(${w}px,${-up * 0.36}px)`, offset: 0.4 },
        { transform: `translate(${-w}px,${-up * 0.72}px)`, offset: 0.75 },
        { transform: `translate(${w}px,${-up}px) scale(1.2)`, opacity: 0 },
      ], { duration: (B ? rnd(2400, 5000) : rnd(3200, 6500)) * Math.sqrt(k), easing: 'cubic-bezier(.4,0,.8,1)' });
    }
  },
  white(L, B, still, k, calm) {
    for (let i = 0; i < (B ? 7 : 4); i++) {
      const w = rnd(90, 170) * k, h = w * rnd(0.45, 0.7);
      const c = mk(L, `left:${rnd(-10, 70)}%;top:${rnd(-5, 70)}%;width:${w}px;height:${h}px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,236,170,${B ? 0.85 : 0.6}),rgba(240,214,130,${B ? 0.35 : 0.22}) 55%,transparent);filter:blur(${rnd(6, 12) * k}px);mix-blend-mode:multiply`);
      loop(still, c, [
        { transform: 'translate(0,0) scale(1) rotate(0)', opacity: 0.7 },
        { transform: `translate(${rnd(-40, 40) * k}px,${rnd(-30, 30) * k}px) scale(${rnd(1.1, 1.35)},${rnd(0.8, 0.95)}) rotate(${rnd(-20, 20)}deg)`, opacity: 1, offset: 0.5 },
        { transform: 'translate(0,0) scale(1) rotate(0)', opacity: 0.7 },
      ], { duration: rnd(7000, 12000) * (B ? 0.7 : 1), easing: 'ease-in-out' });
    }
    if (!calm) {
    const sh = mk(L, `inset:0;background:repeating-linear-gradient(115deg,transparent 0 22px,rgba(255,255,255,${B ? 0.28 : 0.18}) 22px 24px,transparent 24px 46px);-webkit-mask:linear-gradient(to top,#000,transparent 70%);mask:linear-gradient(to top,#000,transparent 70%)`);
    loop(still, sh, [{ backgroundPosition: '0 0' }, { backgroundPosition: '92px 0' }], { duration: B ? 5000 : 8000, easing: 'linear' });
    }
    for (let i = 0; i < Math.round((B ? 26 : 12) * Math.min(k, 2.5)); i++) {
      const d = rnd(2, B ? 5 : 4) * Math.sqrt(k), s = rnd(-18, 18) * k;
      const m = mk(L, `left:${rnd(4, 96)}%;bottom:${still ? rnd(10, 80) : rnd(-5, 40)}%;width:${d}px;height:${d}px;border-radius:50%;background:#c9a24a;box-shadow:0 0 ${d * 2}px rgba(255,220,130,.9);opacity:${still ? 0.6 : 0}`);
      loop(still, m, [
        { transform: 'translate(0,0)', opacity: 0 },
        { opacity: 0.9, offset: 0.2 },
        { transform: `translate(${s}px,${-90 * k}px)`, opacity: 0.7, offset: 0.6 },
        { transform: `translate(${-s}px,${-180 * k}px)`, opacity: 0 },
      ], { duration: rnd(5000, 9000) * Math.sqrt(k), easing: 'ease-in-out' });
    }
  },
  rose(L, B, still, k) {
    const down = 360 * k;
    for (let i = 0; i < Math.round((B ? 16 : 7) * Math.min(k, 2.5)); i++) {
      const d = rnd(9, B ? 18 : 14) * Math.sqrt(k), s = rnd(14, 34) * sign() * Math.sqrt(k), rot = rnd(180, 540);
      const p = mk(L, `top:${still ? `${rnd(10, 80)}%` : '-24px'};left:${rnd(4, 92)}%;width:${d}px;height:${d * 0.78}px;border-radius:80% 0 80% 0;background:linear-gradient(135deg,#f6c9c3,#e39a93);box-shadow:inset -2px -2px 4px rgba(176,88,84,.25);opacity:.9`);
      loop(still, p, [
        { transform: 'translate(0,0) rotate(0)', opacity: 0 },
        { opacity: 0.95, offset: 0.1 },
        { transform: `translate(${s}px,${down / 3}px) rotate(${rot / 3}deg)`, offset: 0.35 },
        { transform: `translate(${-s}px,${down * 0.67}px) rotate(${rot * 0.7}deg)`, offset: 0.7 },
        { transform: `translate(${s / 2}px,${down}px) rotate(${rot}deg)`, opacity: 0 },
      ], { duration: (B ? rnd(5000, 8000) : rnd(7000, 11000)) * Math.sqrt(k), easing: 'linear' });
    }
  },
  red(L, B, still, k) {
    const wave = (fill: string, h: number, dur: number, op: number, rev: boolean) => {
      const w = mk(L, `left:0;bottom:0;width:200%;height:${h}%;opacity:${op}`);
      w.innerHTML = `<svg viewBox="0 0 800 100" preserveAspectRatio="none" style="display:block;width:100%;height:100%"><path d="M0 30 C100 0 100 0 200 30 S300 60 400 30 S500 0 600 30 S700 60 800 30 V100 H0Z" fill="${fill}"/></svg>`;
      loop(still, w, rev ? [{ transform: 'translateX(-50%)' }, { transform: 'translateX(0)' }] : [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: dur, easing: 'linear' });
      if (!still && w.firstElementChild) w.firstElementChild.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.25)' }, { transform: 'scaleY(1)' }], { duration: dur * 0.6, iterations: Infinity, easing: 'ease-in-out' });
    };
    wave('#6b1d28', B ? 34 : 18, (B ? 9000 : 14000) * Math.sqrt(k), B ? 0.22 : 0.12, false);
    wave('#4a1019', B ? 26 : 13, (B ? 6500 : 10000) * Math.sqrt(k), B ? 0.28 : 0.14, true);
    if (B) for (let i = 0; i < Math.round(6 * Math.min(k, 2)); i++) {
      const d = rnd(4, 8) * Math.sqrt(k);
      const dr = mk(L, `top:-12px;left:${rnd(10, 90)}%;width:${d}px;height:${d * 1.4}px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#6b1d28;opacity:.55`);
      loop(still, dr, [
        { transform: 'translateY(0)', opacity: 0 },
        { opacity: 0.55, offset: 0.15 },
        { transform: `translateY(${260 * k}px)`, opacity: 0.4, offset: 0.9 },
        { transform: `translateY(${280 * k}px) scale(1.6,.3)`, opacity: 0 },
      ], { duration: rnd(2600, 4200) * Math.sqrt(k), easing: 'cubic-bezier(.5,0,1,1)' });
    }
  },
};

/** Fill `layer` with the animation for `type`. `calm` drops the white shimmer stripes. Returns a cleanup. */
export function mountFx(layer: HTMLElement, type: WineType, boost: boolean, still: boolean, calm = false) {
  const k = Math.max(1, (layer.clientHeight || 340) / 340);
  FX[type]?.(layer, boost, still, k, calm);
  return () => { layer.getAnimations({ subtree: true }).forEach((a) => a.cancel()); layer.replaceChildren(); };
}
