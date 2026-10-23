import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { WineFinder } from '@/components/finder/WineFinder';
import { PageHero } from '@/components/layout/PageHero';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { localize, makers } from '@/lib/wines';
import styles from './page.module.css';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDictionary(lang).catalogue.title } : {};
}

export default async function WinesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const all = localize(lang);

  return (
    <main>
      <PageHero kicker={t.catalogue.kicker} title={t.catalogue.title} lead={t.finder.lead} crumbs={[{ href: `/${lang}`, label: t.nav.home }]} />
      <section className={`container ${styles.body}`}>
        <Suspense>
          <WineFinder wines={all} makers={makers()} locale={lang} mode="catalogue" pageSize={12} />
        </Suspense>
      </section>
    </main>
  );
}
