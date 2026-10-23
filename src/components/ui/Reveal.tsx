'use client';

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  as?: ElementType;
  /** 'fade' slides the block up; 'mask' slides the child span up from behind a clip. */
  variant?: 'fade' | 'mask';
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** Plays once when the element scrolls into view. Styles live in globals.css. */
export function Reveal({ as: Tag = 'div', variant = 'fade', delay = 0, className, style, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.visible = 'true';
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const attrs = variant === 'mask' ? { 'data-mask': '' } : { 'data-reveal': '' };
  return (
    <Tag ref={ref} {...attrs} className={className} style={{ ...style, '--delay': `${delay}ms` } as CSSProperties}>
      {variant === 'mask' ? <span>{children}</span> : children}
    </Tag>
  );
}

/** Two-line display heading with staggered mask reveals. */
export function MaskHeading({ lines, as: Tag = 'h2', className }: { lines: string[]; as?: ElementType; className?: string }) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <Reveal key={line} as="span" variant="mask" delay={i * 90}>
          {line}
        </Reveal>
      ))}
    </Tag>
  );
}
