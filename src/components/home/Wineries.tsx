import Image from 'next/image';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { MaskHeading, Reveal } from '@/components/ui/Reveal';
import styles from './Wineries.module.css';

export function Wineries({ t }: { t: Dictionary }) {
  const w = t.wineries;
  return (
    <section id="wineries" className={`container ${styles.section}`}>
      <Reveal className="kicker">{w.kicker}</Reveal>
      <MaskHeading lines={w.title} className={styles.title} />
      <div className={styles.grid}>
        <Reveal as="article" className={styles.card}>
          <div className={styles.logo}>
            <Image src="/images/logo-schenk.png" alt="Schenk Italian Wineries" width={330} height={120} style={{ height: 'clamp(84px, 8vw, 120px)', width: 'auto' }} />
          </div>
          <div className={styles.text}>
            <h3>Schenk Italian Wineries</h3>
            <p>{w.schenk}</p>
          </div>
        </Reveal>
        <Reveal as="article" className={styles.card} delay={120}>
          <div className={styles.logo}>
            <Image src="/images/logo-francesca.png" alt="Francesca Mara" width={287} height={242} style={{ height: 'clamp(90px, 8.6vw, 130px)', width: 'auto' }} />
          </div>
          <div className={styles.text}>
            <h3>Francesca Mara</h3>
            <p>{w.francesca}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
