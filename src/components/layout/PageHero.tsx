import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { MaskHeading, Reveal } from '@/components/ui/Reveal';
import styles from './PageHero.module.css';

interface Props {
  kicker: string;
  title: string;
  lead?: string;
  crumbs?: { href: string; label: string }[];
}

/** Dark intro band for inner pages — keeps the header contrast identical to the home hero. */
export function PageHero({ kicker, title, lead, crumbs = [] }: Props) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          {crumbs.map((c) => (
            <span key={c.href}><Link href={c.href}>{c.label}</Link><ChevronRight size={14} /></span>
          ))}
          <span aria-current="page">{title}</span>
        </nav>
        <Reveal className="kicker" style={{ color: 'var(--color-accent-2-300)' }}>{kicker}</Reveal>
        <MaskHeading as="h1" lines={[title]} className={styles.title} />
        {lead && <Reveal as="p" className={styles.lead} delay={150}>{lead}</Reveal>}
      </div>
    </section>
  );
}
