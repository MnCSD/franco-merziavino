import { WINES } from '@/data/wines';

export interface Enquiry {
  kind: string;
  company: string;
  name: string;
  reach: string;
  wines: string[];
  message: string;
}

export const KINDS: Record<string, string> = {
  wholesale: 'Συνεργασία χονδρικής',
  catalog: 'Πληροφορίες καταλόγου',
  gifts: 'Εταιρικά δώρα',
  other: 'Άλλο επαγγελματικό αίτημα',
};

/** Content-ID of the logo attached to the email (see contact.ts). */
export const LOGO_CID = 'fmv-logo';

const C = { wine: '#6b1d28', deep: '#26090e', gold: '#a8814a', goldLight: '#dcc59e', cream: '#f7f3ee', paper: '#ffffff', ink: '#1d1a19', mute: '#7d7979', line: '#e6ddd2' };
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);
const phoneOf = (s: string) => (/^[+\d][\d\s().-]{6,}$/.test(s) ? s.replace(/[^\d+]/g, '') : null);
const wineNames = (slugs: string[]) => slugs.map((s) => WINES.find((w) => w.slug === s)).filter((w) => !!w).map((w) => ({ name: w.name, maker: w.maker }));

export function enquirySubject(e: Enquiry) {
  return `Νέο αίτημα: ${KINDS[e.kind] ?? e.kind} — ${e.name}${e.company ? ` (${e.company})` : ''}`;
}

export function enquiryText(e: Enquiry) {
  const wines = wineNames(e.wines);
  return [
    `Νέο αίτημα από την ιστοσελίδα — ${KINDS[e.kind] ?? e.kind}`,
    '',
    `Όνομα: ${e.name}`,
    `Επιχείρηση: ${e.company || '—'}`,
    `Επικοινωνία: ${e.reach}`,
    `Κρασιά: ${wines.map((w) => `${w.name} (${w.maker})`).join(', ') || '—'}`,
    '',
    e.message || '(χωρίς μήνυμα)',
  ].join('\n');
}

/** Branded, email-client-safe HTML (tables + inline styles, 600px max). */
export function enquiryHtml(e: Enquiry, sentAt = new Date()) {
  const kind = KINDS[e.kind] ?? e.kind;
  const wines = wineNames(e.wines);
  const phone = phoneOf(e.reach);
  const when = sentAt.toLocaleString('el-GR', { timeZone: 'Europe/Athens', dateStyle: 'full', timeStyle: 'short' });

  const row = (label: string, value: string, last = false) => `
    <tr>
      <td style="padding:14px 0;${last ? '' : `border-bottom:1px solid ${C.line};`}width:120px;vertical-align:top;font:600 11px/1.6 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${C.mute}">${label}</td>
      <td style="padding:14px 0;${last ? '' : `border-bottom:1px solid ${C.line};`}vertical-align:top;font:600 16px/1.5 ${FONT};color:${C.ink}">${value}</td>
    </tr>`;

  const reachHtml = isEmail(e.reach)
    ? `<a href="mailto:${esc(e.reach)}" style="color:${C.wine};text-decoration:none">${esc(e.reach)}</a>`
    : phone ? `<a href="tel:${phone}" style="color:${C.wine};text-decoration:none">${esc(e.reach)}</a>` : esc(e.reach);

  const button = (href: string, label: string, primary: boolean) => `
    <td style="padding:0 6px">
      <a href="${href}" style="display:inline-block;padding:13px 22px;font:700 15px/1 ${FONT};text-decoration:none;${primary ? `background:${C.wine};color:${C.cream};border:1px solid ${C.wine}` : `background:${C.paper};color:${C.wine};border:1px solid ${C.wine}`}">${label}</a>
    </td>`;
  const replySubject = encodeURIComponent(`Re: ${kind} — Franco Merzia Vino`);
  const buttons = [
    isEmail(e.reach) ? button(`mailto:${esc(e.reach)}?subject=${replySubject}`, 'Απάντηση με email', true) : '',
    phone ? button(`tel:${phone}`, 'Κλήση', !isEmail(e.reach)) : '',
  ].join('');

  return `<!doctype html>
<html lang="el"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(enquirySubject(e))}</title></head>
<body style="margin:0;padding:0;background:${C.cream}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(`${e.name}${e.company ? ` · ${e.company}` : ''} — ${(e.message || kind).slice(0, 110)}`)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream}">
    <tr><td align="center" style="padding:32px 12px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.paper};border:1px solid ${C.line}">

        <tr><td style="height:6px;background:${C.wine};font-size:0;line-height:0">&nbsp;</td></tr>
        <tr><td align="center" style="padding:28px 24px 20px;background:${C.cream}">
          <img src="cid:${LOGO_CID}" width="150" alt="Franco Merzia Vino" style="display:block;width:150px;height:auto;border:0">
        </td></tr>
        <tr><td style="height:1px;background:${C.goldLight};font-size:0;line-height:0">&nbsp;</td></tr>

        <tr><td style="padding:32px 32px 8px">
          <div style="font:600 11px/1 ${FONT};letter-spacing:2px;text-transform:uppercase;color:${C.gold}">Νέο αίτημα από την ιστοσελίδα</div>
          <h1 style="margin:12px 0 6px;font:800 26px/1.2 ${FONT};letter-spacing:-0.5px;color:${C.ink}">${esc(e.name)}</h1>
          ${e.company ? `<div style="font:600 16px/1.4 ${FONT};color:${C.mute}">${esc(e.company)}</div>` : ''}
          <div style="margin-top:16px"><span style="display:inline-block;padding:6px 12px;background:${C.wine};color:${C.cream};font:700 12px/1 ${FONT};letter-spacing:1px;text-transform:uppercase">${esc(kind)}</span></div>
        </td></tr>

        <tr><td style="padding:16px 32px 8px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row('Επικοινωνία', reachHtml)}
            ${row('Κρασιά', wines.length ? wines.map((w) => `${esc(w.name)}<br><span style="font-weight:400;font-size:13px;color:${C.mute}">${esc(w.maker)}</span>`).join('<div style="height:8px"></div>') : '—', true)}
          </table>
        </td></tr>

        <tr><td style="padding:16px 32px 8px">
          <div style="font:600 11px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${C.mute};margin-bottom:10px">Μήνυμα</div>
          <div style="padding:18px 20px;background:${C.cream};border-left:3px solid ${C.gold};font:400 16px/1.6 ${FONT};color:${C.ink};white-space:pre-wrap">${e.message ? esc(e.message) : `<span style="color:${C.mute}">Δεν γράφτηκε μήνυμα.</span>`}</div>
        </td></tr>

        ${buttons ? `<tr><td align="center" style="padding:28px 26px 8px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>${buttons}</tr></table></td></tr>` : ''}

        <tr><td style="padding:28px 32px 28px">
          <div style="font:400 12px/1.6 ${FONT};color:${C.mute}">Στάλθηκε ${esc(when)} από τη φόρμα επικοινωνίας της ιστοσελίδας.${isEmail(e.reach) ? ' Πατώντας «Απάντηση» το μήνυμα πηγαίνει απευθείας στον αποστολέα.' : ''}</div>
        </td></tr>

        <tr><td style="padding:16px 32px;background:${C.deep};font:600 12px/1.5 ${FONT};letter-spacing:1px;color:${C.goldLight};text-align:center">FRANCO MERZIA VINO · Ιταλικά κρασιά στην Ελλάδα</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
