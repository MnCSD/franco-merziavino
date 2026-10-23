'use server';

import type { ContactState } from '@/components/contact/types';

/**
 * Contact enquiry. Wire this to your mail provider (Resend, Postmark, SMTP…)
 * or CRM. Validation runs here so it can't be bypassed from the client.
 */
export async function sendEnquiry(_prev: ContactState, form: FormData): Promise<ContactState> {
  const name = String(form.get('name') ?? '').trim();
  const reach = String(form.get('reach') ?? '').trim();
  const errors: ContactState['errors'] = {};
  if (!name) errors.name = true;
  if (!reach) errors.reach = true;
  if (Object.keys(errors).length) return { status: 'error', errors };

  const payload = {
    kind: String(form.get('kind') ?? 'wholesale'),
    company: String(form.get('company') ?? '').trim(),
    name,
    reach,
    wines: form.getAll('wines').map(String),
    message: String(form.get('message') ?? '').trim(),
  };

  // TODO: send `payload` — e.g. await resend.emails.send({ … })
  console.info('[enquiry]', payload);
  return { status: 'sent' };
}
