'use client';

import styles from './Chips.module.css';

interface Props<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}

/** Single-select chip group (radio semantics). */
export function Chips<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <div className={styles.group} role="radiogroup">
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={o.value === value} className={styles.chip} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
