'use client';

import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import type { Locale } from '@/types/wine';
import styles from './MobileMenu.module.css';

interface Props {
  locale: Locale;
  items: { href: string; label: string }[];
  labels: { menu: string; close: string };
}

const noSubscribe = () => () => {};

export function MobileMenu({ items, labels }: Props) {
  const [open, setOpen] = useState(false);
  // false on the server and during hydration, true after — the portal needs document.body.
  const mounted = useSyncExternalStore(noSubscribe, () => true, () => false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    document.documentElement.dataset.menu = open ? 'open' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 1180px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => { window.removeEventListener('keydown', onKey); mq.removeEventListener('change', onMq); };
  }, [open]);

  return (
    <>
      <button type="button" className={styles.trigger} aria-expanded={open} onClick={() => setOpen(true)}>
        {labels.menu}
        <Menu size={18} aria-hidden />
      </button>
      {mounted && createPortal(
        <div className={styles.overlay} data-open={open} aria-hidden={!open} role="dialog" aria-modal="true">
          <button type="button" className={`btn btn-ghost-dark btn-icon ${styles.close}`} onClick={() => setOpen(false)} aria-label={labels.close}>
            <X size={22} />
          </button>
          <nav className={styles.list}>
            {items.map((i, idx) => (
              <Link key={i.href} href={i.href} className={styles.item} style={{ transitionDelay: open ? `${120 + idx * 60}ms` : '0ms' }} onClick={() => setOpen(false)}>
                <span className={styles.num}>{String(idx + 1).padStart(2, '0')}</span>
                <span className={styles.label}>{i.label}</span>
                <ArrowUpRight className={styles.arrow} size={28} />
              </Link>
            ))}
          </nav>
        </div>,
        document.body,
      )}
    </>
  );
}
