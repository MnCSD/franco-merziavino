import type { CSSProperties } from 'react';
import styles from './BodyMeter.module.css';

interface Props {
  body: number;
  on?: string;
  off?: string;
  labels?: [string, string];
  /** Animate segments filling in (used in the collection). */
  animate?: boolean;
}

export function BodyMeter({ body, on = 'var(--color-accent)', off = 'var(--color-neutral-300)', labels, animate }: Props) {
  return (
    <div>
      {labels && (
        <div className={`label ${styles.labels}`}>
          <span>{labels[0]}</span>
          <span>{labels[1]}</span>
        </div>
      )}
      <div className={styles.track} role="meter" aria-valuemin={1} aria-valuemax={5} aria-valuenow={body}>
        {[1, 2, 3, 4, 5].map((k) => (
          <span key={k} className={styles.seg} style={{ background: off } as CSSProperties}>
            <span
              className={styles.fill}
              data-on={k <= body}
              data-animate={animate}
              style={{ background: on, '--i': k } as CSSProperties}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
