import { Suspense } from 'react';
import { IntroCurtain } from '@/components/home/IntroCurtain';
import { HeroRing } from '@/components/home/HeroRing';
import { About } from '@/components/home/About';
import { Collection } from '@/components/home/Collection';
import { LabelGuide } from '@/components/home/LabelGuide';
import { Gifts } from '@/components/home/Gifts';
import { RegionsMap } from '@/components/home/RegionsMap';
import { WineFinder } from '@/components/finder/WineFinder';
import { ContactSection } from '@/components/contact/ContactSection';
import { MaskHeading, Reveal } from '@/components/ui/Reveal';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale } from '@/lib/i18n/config';
import { bestsellers, featured, localize, makers } from '@/lib/wines';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const all = localize(lang);
  const feat = featured(lang);

  return (
    <main id="top">
      <IntroCurtain regions={t.intro.regions} est={t.intro.est} />
      <HeroRing wines={bestsellers(lang)} locale={lang} />
      <About t={t} />
      <Collection wines={feat} locale={lang} />

      <section id="wines" className={`container ${styles.finder}`}>
        <Reveal className="kicker">{t.finder.kicker}</Reveal>
        <MaskHeading lines={t.finder.title} className={styles.title} />
        <Reveal as="p" className={styles.lead} delay={150}>{t.finder.lead}</Reveal>
        <Suspense>
          <WineFinder wines={all} makers={makers()} locale={lang} mode="preview" pageSize={8} />
        </Suspense>
      </section>

      <LabelGuide t={t} />
      <RegionsMap locale={lang} wines={all} />
      <Gifts locale={lang} />
      <Suspense>
        <ContactSection locale={lang} wines={all} />
      </Suspense>
    </main>
  );
}
