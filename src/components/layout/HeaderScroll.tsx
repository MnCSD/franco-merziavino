'use client';

import { useEffect, useRef } from 'react';
import styles from './Header.module.css';

/** Scroll progress bar under the header; hides the header while scrolling down, shows it on scroll up. */
export function HeaderScroll() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const header = bar.current?.closest('header');
    let last = window.scrollY, raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      const menuOpen = document.documentElement.dataset.menu === 'open';
      if (header) header.dataset.hidden = String(!menuOpen && y > 160 && y > last + 4);
      if (Math.abs(y - last) > 4) last = y;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={bar} className={styles.progress} aria-hidden />;
}
