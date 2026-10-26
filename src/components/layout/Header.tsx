import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/types/wine';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { LangSwitch } from './LangSwitch';
import { MobileMenu } from './MobileMenu';
import { HeaderScroll } from './HeaderScroll';
import styles from './Header.module.css';

export function navItems(locale: Locale) {
  const t = getDictionary(locale).nav;
  const home = `/${locale}`;
  return [
    { href: `${home}#top`, label: t.home },
    { href: `${home}#about`, label: t.about },
    { href: `${home}#wines`, label: t.find },
    { href: `${home}/wines`, label: t.all },
    { href: `${home}#guide`, label: t.guide },
    { href: `${home}#regions`, label: t.regions },
  ];
}

/** Same bar on every page: logo · links (≥1180px) · menu (<1180px) · EL/EN · contact (≥600px). */
export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).nav;
  const items = navItems(locale);

  return (
    <header className={styles.header}>
      <nav className={styles.bar}>
        <Link href={`/${locale}`} className={styles.brand} aria-label="Franco Merzia Vino">
          <Image src="/images/logo-mark.png" alt="" width={41} height={38} priority className={styles.mark} />
          <span className={styles.wordmark}>
            <span className={styles.name}>FRANCO MERZIA</span>
            <span className={styles.sub}>VINO</span>
          </span>
        </Link>

        <div className={styles.links}>
          {items.map((i) => (
            <Link key={i.href} href={i.href} className={styles.link}>{i.label}</Link>
          ))}
        </div>

        <MobileMenu locale={locale} items={[...items, { href: `/${locale}#contact`, label: t.contact }]} labels={{ menu: t.menu, close: t.close }} />
        <LangSwitch locale={locale} />
        <Link href={`/${locale}#contact`} className={styles.contact}>{t.contact}</Link>
      </nav>
      <HeaderScroll />
    </header>
  );
}
