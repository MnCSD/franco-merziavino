'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES } from '@/lib/i18n/config';
import type { Locale } from '@/types/wine';
import styles from './LangSwitch.module.css';

/** Swaps the locale segment in the current path and remembers the choice for the proxy. */
export function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.replace(/^\/(el|en)(?=\/|$)/, '');

  return (
    <div className={styles.switch} role="group" aria-label="Language">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          aria-current={l === locale ? 'true' : undefined}
          className={styles.opt}
          onClick={() => { document.cookie = `locale=${l}; path=/; max-age=31536000; samesite=lax`; }}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
