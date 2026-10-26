export type EnquiryKind = 'wholesale' | 'catalog' | 'gifts' | 'other';

export interface ContactState {
  status: 'idle' | 'error' | 'sent' | 'failed';
  errors?: { name?: boolean; reach?: boolean };
}
