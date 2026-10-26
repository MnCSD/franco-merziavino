import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/types/wine';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { navItems } from './Header';
import styles from './Footer.module.css';

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Image src="/images/logo-mark.png" alt="" width={48} height={44} />
          <div>
            <div className={styles.name}>Franco Merzia Vino</div>
            <div className={styles.tagline}>{t.meta.title.split('— ')[1]}</div>
          </div>
        </div>
        <nav className={styles.links}>
          {[...navItems(locale), { href: `/${locale}#contact`, label: t.nav.contact }].map((i) => (
            <Link key={i.href} href={i.href}>{i.label}</Link>
          ))}
        </nav>
      </div>
      <div className={`container ${styles.legal}`}>
        <span>{t.footer.legal}</span>
        <span>© 2021 Franco Merzia Vino</span>
      </div>
    </footer>
  );
}
