'use server';

import path from 'node:path';
import nodemailer from 'nodemailer';
import type { ContactState } from '@/components/contact/types';
import { LOGO_CID, enquiryHtml, enquirySubject, enquiryText, type Enquiry } from './enquiryEmail';

/**
 * Contact enquiry, emailed over SMTP. Needs SMTP_USER + SMTP_PASS in the environment. SMTP_HOST (+ optional
 * SMTP_PORT, default 465 over TLS) selects the server, e.g. Papaki's smtp-gr.securemail.pro; without it Gmail
 * is used and SMTP_PASS must be a Google App password. CONTACT_TO overrides the recipient (defaults to SMTP_USER).
 * Without credentials the enquiry is only logged. Validation runs here so it can't be bypassed from the client.
 */
export async function sendEnquiry(_prev: ContactState, form: FormData): Promise<ContactState> {
  const name = String(form.get('name') ?? '').trim();
  const reach = String(form.get('reach') ?? '').trim();
  const errors: ContactState['errors'] = {};
  if (!name) errors.name = true;
  if (!reach) errors.reach = true;
  if (Object.keys(errors).length) return { status: 'error', errors };

  const payload: Enquiry = {
    kind: String(form.get('kind') ?? 'wholesale'),
    company: String(form.get('company') ?? '').trim(),
    name,
    reach,
    wines: form.getAll('wines').map(String),
    message: String(form.get('message') ?? '').trim(),
  };

  const { SMTP_HOST: host, SMTP_PORT, SMTP_USER: user, SMTP_PASS: pass, CONTACT_TO: to } = process.env;
  if (!user || !pass) {
    console.info('[enquiry]', payload);
    return { status: 'sent' };
  }

  const port = Number(SMTP_PORT) || 465;
  // 465 is implicit TLS; other ports (587) upgrade via STARTTLS.
  const server = host ? { host, port, secure: port === 465 } : { service: 'gmail' };

  try {
    await nodemailer.createTransport({ ...server, auth: { user, pass } }).sendMail({
      from: `"Franco Merzia Vino · Website" <${user}>`,
      to: to || user,
      // Reply straight to the visitor when they left an email address.
      ...(/^\S+@\S+\.\S+$/.test(reach) ? { replyTo: `"${name.replace(/"/g, '')}" <${reach}>` } : {}),
      subject: enquirySubject(payload),
      text: enquiryText(payload),
      html: enquiryHtml(payload),
      attachments: [{ filename: 'franco-merzia-vino.png', path: path.join(process.cwd(), 'src/app/actions/assets/email-logo.png'), cid: LOGO_CID }],
    });
    return { status: 'sent' };
  } catch (e) {
    console.error('[enquiry] send failed', e);
    return { status: 'failed' };
  }
}
