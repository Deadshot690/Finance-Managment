export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
};

export type Budget = {
  id: string;
  category: string;
  amount: number;
  spent: number;
};

export type TransactionHistoryItem = {
  category: string;
  amount: number;
  date: string;
};
