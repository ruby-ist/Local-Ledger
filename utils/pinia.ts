import { mapState, mapWritableState, mapActions } from 'pinia';

export type AppSettings = {
  currency: string;
  target: number;
  duration: 'Per month' | 'Per week';
};

export const defaultSettings: AppSettings = {
  currency: '₹',
  target: 50000,
  duration: 'Per month',
};

export { mapState, mapWritableState, mapActions };
