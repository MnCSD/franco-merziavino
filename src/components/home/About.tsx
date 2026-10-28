import Image from 'next/image';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { MaskHeading, Reveal } from '@/components/ui/Reveal';
import { PARTNERS } from '@/components/ui/PartnerLogos';
import styles from './About.module.css';

export function About({ t }: { t: Dictionary }) {
  const a = t.about;
  const texts = [a.schenk, a.francesca];
  const companies = PARTNERS.map((p, i) => ({ ...p, text: texts[i], plate: p.ground === 'light' ? styles.plateLight : styles.plateDark }));

  return (
    <section id="about" className={styles.section}>
      {/* Vineyard at sunset — Beatrice Zinetti, Unsplash */}
      <Image src="/images/about-vineyard.jpg" alt="" fill sizes="100vw" className={styles.photo} />
      <div className={styles.veil} aria-hidden />
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div>
            <Reveal className={`kicker ${styles.kicker}`}>{a.kicker}</Reveal>
            <MaskHeading lines={['Franco Merzia', 'Vino']} className={styles.title} />
            <Reveal as="p" className={styles.tagline} delay={150}>{a.tagline}</Reveal>
            <Reveal as="p" className={styles.lede} delay={220}>{a.lede}</Reveal>
          </div>
          <div className={styles.body}>
            <Reveal as="figure" className={styles.marks} delay={200}>
              <div className={styles.marksMedia}>
                <div className={styles.marksClip}>
                  <Image src="/images/about-italy-greece.jpg" alt="Franco Merzia Vino — from Italy to Greece" width={1000} height={939} sizes="(max-width: 599px) 92vw, 440px" />
                </div>
              </div>
            </Reveal>
            {a.body.map((p, i) => (
              <Reveal key={i} as="p" delay={150 + i * 80}>{p}</Reveal>
            ))}
          </div>
        </div>

        <div className={styles.history}>
          <div className={styles.milestones}>
            {a.milestones.map((m, i) => (
              <Reveal key={m.year} className={styles.milestone} delay={i * 120}>
                <span className={styles.year}>{m.year}</span>
                <span className={styles.yearText}>{m.text}</span>
              </Reveal>
            ))}
          </div>
          <div className={styles.body}>
            <Reveal as="h3" className={styles.historyTitle}>{a.historyTitle}</Reveal>
            {a.history.map((p, i) => (
              <Reveal key={i} as="p" delay={100 + i * 80}>{p}</Reveal>
            ))}
          </div>
        </div>

        <Reveal className={`label ${styles.subhead}`}>{a.companies}</Reveal>
        <div className={styles.grid}>
          {companies.map((c, i) => (
            <Reveal key={c.name} as="article" className={styles.card} delay={i * 120}>
              <div className={`${styles.plate} ${c.plate}`}>
                <Image src={c.src} alt={c.name} width={c.w} height={c.h} sizes="(max-width: 599px) 220px, 200px" />
              </div>
              <div className={styles.text}>
                <h3>{c.name}</h3>
                <p>{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
