export type EnquiryKind = 'wholesale' | 'catalog' | 'gifts' | 'other';

export interface ContactState {
  status: 'idle' | 'error' | 'sent';
  errors?: { name?: boolean; reach?: boolean };
}
