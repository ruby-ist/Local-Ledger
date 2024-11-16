import { mapState, mapWritableState, mapActions } from 'pinia';

export type AppSettings = {
  currency: string;
  target: number;
};

export const DEFAULT_SETTINGS: AppSettings = {
  currency: '₹',
  target: 50000,
};

export { mapState, mapWritableState, mapActions };
