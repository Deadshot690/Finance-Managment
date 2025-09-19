import type { Transaction, Budget } from '@/lib/types';

export const transactions: Transaction[] = [
  { id: '1', type: 'expense', category: 'Food', amount: 25.50, date: '2024-07-28', description: 'Lunch at Cafe' },
  { id: '2', type: 'income', category: 'Salary', amount: 5000, date: '2024-07-28', description: 'Monthly Salary' },
  { id: '3', type: 'expense', category: 'Transport', amount: 50, date: '2024-07-27', description: 'Metro card top-up' },
  { id: '4', type: 'expense', category: 'Shopping', amount: 120.00, date: '2024-07-26', description: 'New shoes' },
  { id: '5', type: 'expense', category: 'Bills', amount: 150.75, date: '2024-07-25', description: 'Electricity Bill' },
  { id: '6', type: 'income', category: 'Freelance', amount: 750, date: '2024-07-24', description: 'Web design project' },
];

export const budgets: Budget[] = [
  { id: '1', category: 'Food', amount: 500, spent: 275.30 },
  { id: '2', category: 'Shopping', amount: 300, spent: 120.00 },
  { id: '3', category: 'Transport', amount: 150, spent: 85.50 },
  { id: '4', category: 'Health', amount: 200, spent: 50.00 },
  { id: '5', category: 'Entertainment', amount: 250, spent: 350.00 },
];

export const expenseCategories = [
  { value: 'food', label: 'Food' },
  { value: 'transport', label: 'Transport' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'bills', label: 'Bills' },
  { value: 'health', label: 'Health' },
  { value: 'education', label: 'Education' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'other', label: 'Other' },
];

export const incomeCategories = [
  { value: 'salary', label: 'Salary' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'business', label: 'Business' },
  { value: 'investment', label: 'Investment' },
  { value: 'other', label: 'Other' },
];
