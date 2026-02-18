export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

export type BillingCycle = 'monthly' | 'yearly' | 'one-time';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  billingCycle: BillingCycle;
  startDate: string; // YYYY-MM-DD
  category: string;
  iconUrl?: string;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  FORM = 'FORM',
}
