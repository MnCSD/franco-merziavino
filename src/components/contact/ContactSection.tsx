'use client';

import { useActionState, useEffect, useRef, useState, type CSSProperties, type FormEvent, type MouseEvent as RMouseEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Check, Copy, X } from 'lucide-react';
import { sendEnquiry } from '@/app/actions/contact';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { Locale, LocalizedWine } from '@/types/wine';
import { MaskHeading, Reveal } from '@/components/ui/Reveal';
import type { ContactState, EnquiryKind } from './types';
import styles from './ContactSection.module.css';

const KINDS: EnquiryKind[] = ['wholesale', 'catalog', 'gifts', 'other'];
const PHONE = { label: '6972 805 605', href: 'tel:+306972805605' };
const EMAIL = 'katsiroubas.e@gmail.com';
const INSTAGRAM = { label: '@francomerziavino', href: 'https://www.instagram.com/francomerziavino/' };
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Αργοναυτών+24+Ζωγράφου+15772';
/** Optional fields that pour wine into the progress glass (name and contact are required too). */
const POUR_FIELDS = ['company', 'name', 'reach', 'message'] as const;

/** Wine glass that fills to `level` (0–1) with a slow wave on the surface. */
function PourGlass({ level }: { level: number }) {
  const top = 50 - level * 40;
  return (
    <svg className={styles.glass} viewBox="0 0 48 92" aria-hidden>
      <defs><clipPath id="pour-bowl"><path d="M8 6 C7 26 12 46 24 49 C36 46 41 26 40 6 Z" /></clipPath></defs>
      <g clipPath="url(#pour-bowl)">
        <g className={styles.wine} style={{ transform: `translateY(${top}px)` }}>
          <path className={styles.wave} d="M-48 2 Q-36 -2 -24 2 T0 2 T24 2 T48 2 T72 2 T96 2 V60 H-48 Z" />
        </g>
      </g>
      <path className={styles.glassEdge} d="M8 6 C7 26 12 46 24 49 C36 46 41 26 40 6" />
      <path className={styles.glassEdge} d="M24 49 V82 M12 86 Q24 80 36 86" />
      <path className={styles.glassGlint} d="M12 12 C11 24 13 34 18 40" />
    </svg>
  );
}

export function ContactSection({ locale, wines }: { locale: Locale; wines: LocalizedWine[] }) {
  const t = getDictionary(locale);
  const c = t.contact;
  const [state, action, pending] = useActionState<ContactState, FormData>(sendEnquiry, { status: 'idle' });
  const [kind, setKind] = useState<EnquiryKind>('wholesale');
  const [picks, setPicks] = useState<string[]>([]);
  const [formKey, setFormKey] = useState(0);
  const params = useSearchParams();
  const [filled, setFilled] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef(0);
  const fine = useRef(false);
  useEffect(() => { fine.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches; }, []);

  // Each completed field pours a little more wine; a chosen wine counts as one more.
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    setFilled(POUR_FIELDS.filter((n) => String((form.elements.namedItem(n) as HTMLInputElement | null)?.value ?? '').trim()).length);
  };
  const pour = (filled + (picks.length ? 1 : 0)) / (POUR_FIELDS.length + 1);

  // Desktop: clicking the phone or email copies it (phones still dial / open mail).
  const copy = (e: RMouseEvent, value: string) => {
    if (!fine.current || !navigator.clipboard) return;
    e.preventDefault();
    navigator.clipboard.writeText(value).then(() => {
      setToast(value);
      window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 2200);
    }).catch(() => {});
  };



  // "Ask us" links arrive as ?wine=<slug>#contact — preselect that wine.
  useEffect(() => {
    const w = params.get('wine');
    if (w) setPicks((p) => (p.includes(w) ? p : [...p, w]));
  }, [params]);

  // The gifts section's button preselects "corporate gifts".
  useEffect(() => {
    const on = (e: Event) => { const k = (e as CustomEvent<EnquiryKind>).detail; if (KINDS.includes(k)) { setKind(k); setFormKey(0); } };
    window.addEventListener('fmv:enquiry', on);
    return () => window.removeEventListener('fmv:enquiry', on);
  }, []);

  const sent = state.status === 'sent' && formKey === 0;
  const byId = new Map(wines.map((w) => [w.slug, w]));
  const rows = [
    { label: c.phoneLabel, value: PHONE.label, href: PHONE.href, copy: PHONE.label },
    { label: c.emailLabel, value: EMAIL, href: `mailto:${EMAIL}`, copy: EMAIL },
    { label: 'Instagram', value: INSTAGRAM.label, href: INSTAGRAM.href, ext: true },
    { label: c.addressLabel, value: c.address, href: MAPS, ext: true },
  ];

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.split}>
        <div className={styles.left}>
          <MaskHeading lines={c.title} className={styles.title} />
          <div className={styles.about}>
            <Reveal as="p" className={styles.lead}>{c.lead}</Reveal>
            <Reveal className={styles.person}>
              <strong>{c.person}</strong>
              <span>{c.role}</span>
            </Reveal>
          </div>
          <div className={styles.rows}>
            {rows.map((r) => (
              <a key={r.label} href={r.href} className={styles.row} data-copy={!!r.copy} onClick={r.copy ? (e) => copy(e, r.copy) : undefined}
                {...(r.ext ? { target: '_blank', rel: 'noopener' } : {})}>
                <span className={styles.rowLabel}>{r.label}</span>
                <span className={styles.rowValue}>{r.value}</span>
                {r.copy ? (
                  <span className={styles.rowAct}><span className={styles.rowHint}>{c.copy}</span><Copy size={17} strokeWidth={1.9} /></span>
                ) : <ArrowUpRight size={20} strokeWidth={1.75} />}
              </a>
            ))}
          </div>
          <div className={styles.toast} data-on={!!toast} role="status" aria-live="polite">
            <Check size={16} strokeWidth={2.6} />{c.copied}{toast ? ` · ${toast}` : ''}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.paper}>
          <div className={styles.letterHead}>
            <MaskHeading as="h3" lines={[c.formTitle]} className={styles.formTitle} />
          </div>
          {sent ? (
            <div className={styles.thanks}>
              <span className={styles.cheers} aria-hidden>
                <svg viewBox="0 0 120 90">
                  {[0, 1].map((k) => (
                    <g key={k} className={k ? styles.glassR : styles.glassL}>
                      <path d="M-14 0 C-15 18 -10 34 0 36 C10 34 15 18 14 0 Z" className={styles.cheersWine} />
                      <path d="M-14 0 C-15 18 -10 34 0 36 C10 34 15 18 14 0 M0 36 V62 M-10 66 Q0 60 10 66" className={styles.cheersEdge} />
                    </g>
                  ))}
                </svg>
                {Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--a': `${i * 30}deg`, '--d': `${(i % 3) * 60}ms` } as CSSProperties} />)}
              </span>
              <h3>{c.thanks}</h3>
              <p>{c.thanksBody}</p>
              <button type="button" className={`btn ${styles.ghost}`} onClick={() => { setPicks([]); setFilled(0); setFormKey((k) => k + 1); }}>{c.again}</button>
            </div>
          ) : (
            <form key={formKey} action={action} className={styles.form} noValidate onInput={onInput}>
              <input type="hidden" name="kind" value={kind} />
              <div className={styles.field}>
                <span className={styles.label}>{c.interest}</span>
                <div className={styles.kinds} role="radiogroup" aria-label={c.interest}>
                  {KINDS.map((k) => (
                    <button key={k} type="button" role="radio" aria-checked={kind === k} data-on={kind === k} onClick={() => setKind(k)}>{c.kinds[k]}</button>
                  ))}
                </div>
              </div>
              <div className={styles.two}>
                <label className={styles.field}>
                  <span className={styles.label}>{c.name}</span>
                  <input className={styles.input} name="name" placeholder={c.namePlaceholder} autoComplete="name" aria-invalid={!!state.errors?.name} />
                  {state.errors?.name && <span className={styles.err}>{c.errName}</span>}
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>{c.company}</span>
                  <input className={styles.input} name="company" placeholder={c.companyPlaceholder} autoComplete="organization" />
                </label>
              </div>
              <label className={styles.field}>
                <span className={styles.label}>{c.reach}</span>
                <input className={styles.input} name="reach" placeholder={c.reachPlaceholder} autoComplete="email" aria-invalid={!!state.errors?.reach} />
                {state.errors?.reach && <span className={styles.err}>{c.errReach}</span>}
              </label>
              <div className={styles.field}>
                <span className={styles.label}>{c.wines} <span className={styles.opt}>{c.optional}</span></span>
                <select className={`${styles.input} ${styles.select}`} value="" onChange={(e) => e.target.value && setPicks((p) => [...p, e.target.value])} aria-label={c.addWine}>
                  <option value="">{picks.length ? c.addMore : c.addWine}</option>
                  {wines.filter((w) => !picks.includes(w.slug)).map((w) => <option key={w.slug} value={w.slug}>{w.name} · {w.maker}</option>)}
                </select>
                {picks.length > 0 && (
                  <div className={styles.picks}>
                    {picks.map((p) => (
                      <button key={p} type="button" onClick={() => setPicks((x) => x.filter((y) => y !== p))} aria-label={`${c.remove}: ${byId.get(p)?.name}`}>
                        {byId.get(p)?.name}<X size={13} strokeWidth={2.6} />
                        <input type="hidden" name="wines" value={p} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <label className={styles.field}>
                <span className={styles.label}>{c.message}</span>
                <textarea className={`${styles.input} ${styles.area}`} name="message" placeholder={c.messagePlaceholder} rows={3} />
              </label>
              <div className={styles.sendRow}>
                <button type="submit" className={styles.send} disabled={pending}>{pending ? c.sending : c.send}<ArrowRight size={20} strokeWidth={1.75} /></button>
                <div className={styles.pour}>
                  <PourGlass level={pending ? 1 : pour} />
                  <span>{Math.round((pending ? 1 : pour) * 100)}%</span>
                </div>
              </div>
            </form>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}

