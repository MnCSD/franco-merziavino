import type { Dictionary } from '@/lib/i18n/dictionaries';
import { MaskHeading, Reveal } from '@/components/ui/Reveal';
import styles from './Sections.module.css';

export function LabelGuide({ t }: { t: Dictionary }) {
  return (
    <section id="guide" className={`container ${styles.section}`}>
      <div className={styles.split}>
        <div>
          <Reveal className="kicker">{t.guide.kicker}</Reveal>
          <MaskHeading lines={t.guide.title} className={styles.title} />
          <Reveal as="p" className={styles.lead} delay={150}>{t.guide.lead}</Reveal>
        </div>
        <div className={styles.guideList}>
          {t.guide.items.map((g, i) => (
            <Reveal key={g.code} className={styles.guideRow} delay={i * 80}>
              <span className={styles.code}>{g.code}</span>
              <div>
                <p>{g.text}</p>
                <p className={styles.example}>{t.guide.inCollection} {g.example}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
