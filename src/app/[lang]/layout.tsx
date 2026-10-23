import type { Metadata, Viewport } from 'next';
import { Archivo, Commissioner } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { ViewCursor } from '@/components/ui/ViewCursor';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WineDrawerProvider } from '@/components/wine/WineDrawerProvider';
import { LOCALES, isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import '../globals.css';

// Archivo has no Greek glyphs; Commissioner covers Greek with a matching grotesque feel.
const archivo = Archivo({ subsets: ['latin', 'latin-ext'], weight: ['400', '600', '800'], variable: '--font-archivo', display: 'swap' });
const commissioner = Commissioner({ subsets: ['greek', 'latin'], weight: ['400', '600', '800'], variable: '--font-commissioner', display: 'swap' });

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: { default: t.meta.title, template: '%s · Franco Merzia Vino' },
    description: t.meta.description,
    alternates: { languages: { el: '/el', en: '/en' } },
    icons: { icon: '/images/logo-mark.png' },
  };
}

export const viewport: Viewport = { themeColor: '#26090e' };

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${archivo.variable} ${commissioner.variable}`}>
      <body>
        <WineDrawerProvider locale={lang}>
          <Header locale={lang} />
          {children}
          <Footer locale={lang} />
          <ViewCursor />
        </WineDrawerProvider>
      </body>
    </html>
  );
}
