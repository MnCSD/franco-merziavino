import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendEnquiry } from './contact';
import type { ContactState } from '@/components/contact/types';

describe('contact server action', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  const createFormData = (data: Record<string, string | string[]>) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => form.append(key, v));
      } else {
        form.set(key, value);
      }
    });
    return form;
  };

  describe('validation', () => {
    it('returns error when name is missing', async () => {
      const form = createFormData({ reach: 'email@test.com' });
      const prevState: ContactState = { status: 'idle' };

      const result = await sendEnquiry(prevState, form);

      expect(result.status).toBe('error');
      expect(result.errors?.name).toBe(true);
    });

    it('returns error when reach is missing', async () => {
      const form = createFormData({ name: 'John Doe' });
      const prevState: ContactState = { status: 'idle' };

      const result = await sendEnquiry(prevState, form);

      expect(result.status).toBe('error');
      expect(result.errors?.reach).toBe(true);
    });

    it('returns error when both name and reach are missing', async () => {
      const form = createFormData({});
      const prevState: ContactState = { status: 'idle' };

      const result = await sendEnquiry(prevState, form);

      expect(result.status).toBe('error');
      expect(result.errors?.name).toBe(true);
      expect(result.errors?.reach).toBe(true);
    });

    it('trims whitespace from name', async () => {
      const form = createFormData({ name: '   ', reach: 'email@test.com' });
      const prevState: ContactState = { status: 'idle' };

      const result = await sendEnquiry(prevState, form);

      expect(result.status).toBe('error');
      expect(result.errors?.name).toBe(true);
    });

    it('trims whitespace from reach', async () => {
      const form = createFormData({ name: 'John', reach: '   ' });
      const prevState: ContactState = { status: 'idle' };

      const result = await sendEnquiry(prevState, form);

      expect(result.status).toBe('error');
      expect(result.errors?.reach).toBe(true);
    });
  });

  describe('successful submission', () => {
    it('returns sent status with valid name and reach', async () => {
      const form = createFormData({
        name: 'John Doe',
        reach: 'john@example.com'
      });
      const prevState: ContactState = { status: 'idle' };

      const result = await sendEnquiry(prevState, form);

      expect(result.status).toBe('sent');
      expect(result.errors).toBeUndefined();
    });

    it('logs enquiry payload', async () => {
      const form = createFormData({
        name: 'John Doe',
        reach: 'john@example.com',
        company: 'Test Co',
        kind: 'retail',
        message: 'Hello',
        wines: ['wine1', 'wine2']
      });
      const prevState: ContactState = { status: 'idle' };

      await sendEnquiry(prevState, form);

      expect(console.info).toHaveBeenCalledWith('[enquiry]', expect.objectContaining({
        name: 'John Doe',
        reach: 'john@example.com',
        company: 'Test Co',
        kind: 'retail',
        message: 'Hello',
        wines: ['wine1', 'wine2']
      }));
    });

    it('defaults kind to wholesale', async () => {
      const form = createFormData({
        name: 'John',
        reach: 'john@test.com'
      });
      const prevState: ContactState = { status: 'idle' };

      await sendEnquiry(prevState, form);

      expect(console.info).toHaveBeenCalledWith('[enquiry]', expect.objectContaining({
        kind: 'wholesale'
      }));
    });

    it('handles empty optional fields', async () => {
      const form = createFormData({
        name: 'John',
        reach: 'john@test.com'
      });
      const prevState: ContactState = { status: 'idle' };

      await sendEnquiry(prevState, form);

      expect(console.info).toHaveBeenCalledWith('[enquiry]', expect.objectContaining({
        company: '',
        message: '',
        wines: []
      }));
    });

    it('handles multiple wine selections', async () => {
      const form = createFormData({
        name: 'John',
        reach: 'john@test.com',
        wines: ['prosecco', 'amarone', 'barolo']
      });
      const prevState: ContactState = { status: 'idle' };

      await sendEnquiry(prevState, form);

      expect(console.info).toHaveBeenCalledWith('[enquiry]', expect.objectContaining({
        wines: ['prosecco', 'amarone', 'barolo']
      }));
    });
  });

  describe('previous state handling', () => {
    it('ignores previous state on success', async () => {
      const form = createFormData({ name: 'John', reach: 'john@test.com' });
      const prevState: ContactState = { status: 'error', errors: { name: true } };

      const result = await sendEnquiry(prevState, form);

      expect(result.status).toBe('sent');
    });

    it('ignores previous state on error', async () => {
      const form = createFormData({});
      const prevState: ContactState = { status: 'sent' };

      const result = await sendEnquiry(prevState, form);

      expect(result.status).toBe('error');
    });
  });
});
