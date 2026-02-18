import { Subscription, User, BillingCycle } from './types';

export const MOCK_USER: User = {
  id: 'user-1',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  username: 'alexd',
};

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub-1',
    name: 'Netflix',
    price: 15.49,
    billingCycle: 'monthly',
    startDate: '2023-01-15',
    category: 'Entertainment',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/732/732228.png',
  },
  {
    id: 'sub-2',
    name: 'Spotify Premium',
    price: 9.99,
    billingCycle: 'monthly',
    startDate: '2022-11-20',
    category: 'Music',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2111/2111624.png'
  },
  {
    id: 'sub-3',
    name: 'Adobe Creative Cloud',
    price: 599.88,
    billingCycle: 'yearly',
    startDate: '2023-03-01',
    category: 'Productivity',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1126/1126415.png'
  },
  {
    id: 'sub-4',
    name: 'Amazon Prime',
    price: 139.00,
    billingCycle: 'yearly',
    startDate: '2022-06-10',
    category: 'Services',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968313.png'
  },
  {
    id: 'sub-5',
    name: 'Notion',
    price: 8.00,
    billingCycle: 'monthly',
    startDate: '2023-05-25',
    category: 'Productivity',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png'
  }
];

export const BILLING_CYCLES: BillingCycle[] = ['monthly', 'yearly', 'one-time'];
export const CATEGORIES: string[] = ['Entertainment', 'Music', 'Productivity', 'Services', 'Health', 'Education', 'Other'];
