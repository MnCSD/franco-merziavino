import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Award, ChevronRight } from 'lucide-react';
import { BodyMeter } from '@/components/wine/BodyMeter';
import { WineHeroFx } from '@/components/wine/WineHeroFx';
import { TINT } from '@/components/wine/categoryFx';
import { Reveal } from '@/components/ui/Reveal';
import { PartnerBadge } from '@/components/ui/PartnerLogos';
import { LOCALES, isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { findWine, slugs } from '@/lib/wines';
import styles from './page.module.css';

type Params = Promise<{ lang: string; slug: string }>;

export const generateStaticParams = () => LOCALES.flatMap((lang) => slugs().map((slug) => ({ lang, slug })));
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const r = findWine(lang, slug);
  if (!r) return {};
  return {
    title: r.wine.name,
    description: r.wine.notes,
    // Share previews use the source PNG: some social crawlers still skip WebP.
    openGraph: { images: [r.wine.image.replace(/\.webp$/, '.png')] },
    alternates: { languages: { el: `/el/wines/${slug}`, en: `/en/wines/${slug}` } },
  };
}

export default async function WinePage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const r = findWine(lang, slug);
  if (!r) notFound();
  const { wine: w, prev, next } = r;
  const t = getDictionary(lang);
  // Category tint + animation behind the hero (light ground → ink text).
  const tint = TINT[w.type];
  const tone = tint
    ? { bg: tint, fg: 'var(--color-text)', mute: 'var(--color-neutral-700)', seg: 'var(--color-accent)', segOff: 'rgba(0,0,0,.12)', btnBg: 'var(--color-accent)', btnFg: 'var(--color-bg)' }
    : w.tone;

  const facts = [
    { k: t.wine.abv, v: w.abv },
    { k: t.wine.serveAt, v: w.serve },
    ...(w.body > 0 ? [{ k: t.wine.body, v: t.wine.bodies[w.body] }] : []),
    ...(w.grapes ? [{ k: t.wine.grapes, v: w.grapes }] : []),
  ];

  return (
    <main>
      <section className={styles.hero} style={{ background: tone.bg, color: tone.fg }}>
        <WineHeroFx type={w.type} className={styles.fx} />
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <nav className={styles.crumbs} aria-label="Breadcrumb" style={{ color: tone.mute }}>
              <Link href={`/${lang}`}>{t.nav.home}</Link><ChevronRight size={14} />
              <Link href={`/${lang}/wines`}>{t.catalogue.back}</Link><ChevronRight size={14} />
              <span aria-current="page">{w.short}</span>
            </nav>
            <span className={styles.meta} style={{ color: tone.mute }}>{[w.typeLabel, w.appellation].filter(Boolean).join(' · ')}</span>
            <h1 className={styles.title}>{w.name}</h1>
            <p className={styles.notes}>{w.notes}</p>
            <div className={styles.maker} style={{ color: tone.mute }}>{w.maker} · {w.region}</div>
            <div style={{ color: tone.mute }}><PartnerBadge maker={w.maker} label={t.wine.range} height={44} /></div>
            <div className={styles.meter}>
              {w.body > 0 && <BodyMeter body={w.body} on={tone.seg} off={tone.segOff} labels={[t.wine.light, t.wine.full]} />}
            </div>
            <Link href={`/${lang}?wine=${w.slug}#contact`} className="btn" style={{ background: tone.btnBg, color: tone.btnFg, alignSelf: 'flex-start' }}>
              {t.wine.askAbout}<ArrowRight size={18} />
            </Link>
          </div>
          <div className={styles.bottle}>
            <span className={styles.bigNum} aria-hidden>{w.num}</span>
            <Image src={w.image} alt={w.name} fill priority sizes="(max-width: 900px) 70vw, 480px" style={{ objectFit: 'contain', objectPosition: 'bottom' }} />
          </div>
        </div>
      </section>

      <section className={`container ${styles.detail}`}>
        <dl className={styles.facts}>
          {facts.map((f) => <div key={f.k}><dt className="label">{f.k}</dt><dd>{f.v}</dd></div>)}
        </dl>

        {w.tip && <Reveal as="p" className={styles.tip}><strong>{t.wine.tip}</strong> {w.tip}</Reveal>}

        <div className={styles.cols}>
          <Reveal><h2 className={styles.h}>{t.wine.inGlass}</h2><p>{w.profile}</p></Reveal>
          <Reveal delay={100}><h2 className={styles.h}>{t.wine.pairsWith}</h2><p>{w.pairing}</p></Reveal>
          {w.making && <Reveal delay={200}><h2 className={styles.h}>{t.wine.making}</h2><p>{w.making}</p></Reveal>}
        </div>

        {w.awards.length > 0 && (
          <Reveal className={styles.awards}>
            <h2 className={styles.h}>{t.wine.awards}</h2>
            <ul>
              {w.awards.map((a) => <li key={a.who + a.what}><Award size={18} /><span>{a.who}</span><strong>{a.what}</strong></li>)}
            </ul>
            {w.awardsNote && <p className={styles.awardsNote}>{w.awardsNote}</p>}
          </Reveal>
        )}
      </section>

      <nav className={styles.pager} aria-label="Wines">
        <Link href={`/${lang}/wines/${prev.slug}`} className={styles.pagerLink}>
          <span className="label"><ArrowLeft size={14} />{t.wine.prev}</span>
          <strong>{prev.name}</strong>
        </Link>
        <Link href={`/${lang}/wines/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
          <span className="label">{t.wine.next}<ArrowRight size={14} /></span>
          <strong>{next.name}</strong>
        </Link>
      </nav>
    </main>
  );
}
