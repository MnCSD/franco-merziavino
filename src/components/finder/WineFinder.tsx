'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
import { GEO_NAMES, isGeoId } from '@/lib/geo';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { filterWines, filtersToQuery, type TypeFilter, type WineFilters } from '@/lib/wines';
import { WINERIES } from '@/data/wineries';
import type { Locale, LocalizedWine, Occasion } from '@/types/wine';
import { WineCard } from '@/components/wine/WineCard';
import styles from './WineFinder.module.css';

interface Props {
  wines: LocalizedWine[];
  makers: string[];
  locale: Locale;
  /** 'preview' on the home page (winery/catalogue tabs, limited + link to catalogue), 'catalogue' on /wines (load more, URL-synced). */
  mode: 'preview' | 'catalogue';
  pageSize?: number;
}

const FOODS: (Occasion | 'all')[] = ['all', 'aperitif', 'fish', 'white', 'red', 'cheese'];
const TYPES: [TypeFilter, string][] = [['all', 'transparent'], ['white', '#e9dc9a'], ['rose', '#e8b4b0'], ['red', '#6b1d28'], ['sparkling', '#f3eccb'], ['alcoholFree', 'transparent'], ['premium', '#a8814a']];

export function WineFinder({ wines, makers, locale, mode, pageSize = 8 }: Props) {
  const t = getDictionary(locale);
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const isCatalogue = mode === 'catalogue';

  const [f, setF] = useState<WineFilters>(() => ({
    food: (params.get('food') as Occasion) ?? 'all',
    type: (params.get('type') as TypeFilter) ?? 'all',
    winery: params.get('winery') ?? 'all',
    region: isGeoId(params.get('region')) ? params.get('region')! : 'all',
    q: params.get('q') ?? '',
  }));
  /** Home only: start from the winery tiles or the whole catalogue. */
  const [view, setView] = useState<'winery' | 'cat'>(isCatalogue ? 'cat' : 'winery');
  const [shown, setShown] = useState(pageSize);

  const update = (patch: Partial<WineFilters>) => {
    const next = { ...f, ...patch };
    setF(next);
    setShown(pageSize);
    if (isCatalogue) {
      const qs = new URLSearchParams(filtersToQuery(next).slice(1));
      if (next.q) qs.set('q', next.q);
      const s = qs.toString();
      startTransition(() => router.replace(`${pathname}${s ? `?${s}` : ''}`, { scroll: false }));
    }
  };

  // The regions map asks to filter by a region.
  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (!isGeoId(id)) return;
      setView('cat');
      update({ region: id, food: 'all', type: 'all', winery: 'all', q: '' });
    };
    window.addEventListener('fmv:region', on);
    return () => window.removeEventListener('fmv:region', on);
  });

  const filtered = useMemo(() => filterWines(wines, f), [wines, f]);
  const list = filtered.slice(0, shown);
  const hidden = filtered.length - list.length;
  const wineries = WINERIES.filter((w) => wines.some((x) => x.maker === w.name));
  const showTiles = !isCatalogue && view === 'winery' && f.winery === 'all';
  const winery = view === 'winery' && f.winery !== 'all' ? wineries.find((w) => w.name === f.winery) : undefined;
  const chip = (on: boolean) => ({ 'aria-checked': on, role: 'radio' as const, 'data-on': on });

  return (
    <div className={styles.finder}>
      {!isCatalogue && (
        <div className={styles.modeBar}>
          <div role="tablist" aria-label={t.finder.modes} className={styles.modes}>
            {(['winery', 'cat'] as const).map((k) => (
              <button key={k} type="button" role="tab" aria-selected={view === k} data-on={view === k}
                onClick={() => { setView(k); update(k === 'winery' ? { winery: 'all', region: 'all', q: '' } : { winery: 'all' }); }}>
                {k === 'winery' ? t.finder.byWinery : t.finder.wholeCatalogue}
              </button>
            ))}
          </div>
          <span className={styles.catalogText}>{t.finder.catalogText(wines.length, wineries.length)}</span>
        </div>
      )}

      {showTiles ? (
        <div className={styles.tiles}>
          {wineries.map((w, i) => {
            const ws = wines.filter((x) => x.maker === w.name);
            return (
              <button key={w.name} type="button" className={styles.tile} onClick={() => update({ winery: w.name })}>
                <div className={styles.tileTop}><span>{String(i + 1).padStart(2, '0')}</span><span>{t.finder.labels(ws.length)}</span></div>
                <div className={styles.tileName}>{w.name}</div>
                <div className={styles.tileRegion}>{w.region[locale]}</div>
                <div className={styles.thumbs}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- natural aspect at a fixed height */}
                  {ws.slice(0, 5).map((x, k) => <img key={x.slug} src={x.image} alt="" loading="lazy" style={{ height: `${100 - k * 6}%` }} />)}
                </div>
                <div className={styles.tileMore}>{t.finder.seeLabels}<ArrowRight size={18} /></div>
              </button>
            );
          })}
        </div>
      ) : (
        <>
          {winery && (
            <div className={styles.wineryHead}>
              <div>
                <div className={styles.wineryKicker}>{t.finder.wineryOf} · {winery.region[locale]}</div>
                <div className={styles.wineryName}>{winery.name}</div>
              </div>
              <button type="button" className="btn btn-secondary" onClick={() => update({ winery: 'all' })}><ArrowLeft size={18} />{t.finder.allWineries}</button>
            </div>
          )}

          <div className={styles.filters}>
            <div className={styles.row}>
              <span className={styles.rowLabel}>{t.finder.search}</span>
              <label className={styles.search}>
                <Search size={18} aria-hidden />
                <input value={f.q} onChange={(e) => update({ q: e.target.value })} placeholder={t.finder.searchPlaceholder} aria-label={t.finder.search} />
              </label>
            </div>
            <div className={styles.row} role="radiogroup" aria-label={t.finder.food}>
              <span className={styles.rowLabel}>{t.finder.food}</span>
              {FOODS.map((k) => <button key={k} type="button" className={styles.chip} {...chip(f.food === k)} onClick={() => update({ food: k })}>{t.food[k]}</button>)}
            </div>
            {f.region && f.region !== 'all' && isGeoId(f.region) && (
              <div className={styles.row}>
                <span className={styles.rowLabel}>{t.finder.region}</span>
                <button type="button" className={styles.regionChip} onClick={() => update({ region: 'all' })}>{GEO_NAMES[f.region][locale][0]}<X size={16} /></button>
              </div>
            )}
            <div className={styles.row} role="radiogroup" aria-label={t.finder.category}>
              <span className={styles.rowLabel}>{t.finder.category}</span>
              {TYPES.map(([k, dot]) => (
                <button key={k} type="button" className={styles.chip} {...chip(f.type === k)} onClick={() => update({ type: k })}>
                  <i className={styles.dot} style={{ background: dot }} />{t.typeFilter[k]}
                </button>
              ))}
              <span className={styles.count}>{t.finder.count(filtered.length)}</span>
            </div>
            {makers.length > 1 && view !== 'winery' && (
              <div className={styles.row} role="radiogroup" aria-label={t.finder.winery}>
                <span className={styles.rowLabel}>{t.finder.winery}</span>
                {['all', ...makers].map((m) => <button key={m} type="button" className={styles.chip} {...chip(f.winery === m)} onClick={() => update({ winery: m })}>{m === 'all' ? t.typeFilter.all : m}</button>)}
              </div>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <p>{f.type === 'premium' || f.type === 'alcoholFree' ? t.finder.emptySoon : t.finder.empty}</p>
              <button type="button" className="btn btn-secondary" onClick={() => update({ food: 'all', type: 'all', winery: view === 'winery' ? f.winery : 'all', region: 'all', q: '' })}>{t.finder.reset}</button>
            </div>
          ) : (
            <div className={styles.grid} key={JSON.stringify(f)}>
              {list.map((w, i) => <WineCard key={w.slug} wine={w} t={t} index={i % pageSize} boost={f.type === w.type} />)}
            </div>
          )}

          {hidden > 0 && isCatalogue && (
            <div className={styles.more}>
              <button type="button" className="btn btn-secondary" onClick={() => setShown((s) => s + pageSize)}>{t.finder.more(hidden)}<ArrowDown size={18} /></button>
            </div>
          )}
        </>
      )}

      {!isCatalogue && (
        <div className={styles.more}>
          <Link href={`/${locale}/wines${filtersToQuery(f)}`} className="btn btn-primary">{t.finder.viewAll}<ArrowRight size={18} /></Link>
          {!showTiles && hidden > 0 && <span className={styles.moreText}>{t.finder.more(hidden)}</span>}
        </div>
      )}
    </div>
  );
}
