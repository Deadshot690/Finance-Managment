'use client';

import { createContext, useContext, ReactNode } from 'react';
import useSWR from 'swr';
import { getTransactions, getBudgets, getSavingsGoal } from '@/lib/firestore';
import type { Transaction, Budget } from '@/lib/types';

interface UserDataContextType {
  transactions: Transaction[] | undefined;
  budgets: Budget[] | undefined;
  savingsGoal: number;
  isLoading: boolean;
  mutateTransactions: () => void;
  mutateBudgets: () => void;
  mutateSavingsGoal: () => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

const fetchTransactions = ([, userId]: [string, string]) => getTransactions(userId);
const fetchBudgets = ([, userId]: [string, string]) => getBudgets(userId);
const fetchSavingsGoal = ([, userId]: [string, string]) => getSavingsGoal(userId);

export const UserDataProvider = ({ userId, children }: { userId: string, children: ReactNode }) => {
  const { data: transactions, isLoading: isLoadingTransactions, mutate: mutateTransactions } = useSWR(userId ? ['transactions', userId] : null, fetchTransactions);
  const { data: budgets, isLoading: isLoadingBudgets, mutate: mutateBudgets } = useSWR(userId ? ['budgets', userId] : null, fetchBudgets);
  const { data: savingsGoal, isLoading: isLoadingSavingsGoal, mutate: mutateSavingsGoal } = useSWR(userId ? ['savingsGoal', userId] : null, fetchSavingsGoal);

  const value = {
    transactions,
    budgets,
    savingsGoal: savingsGoal || 0,
    isLoading: isLoadingTransactions || isLoadingBudgets || isLoadingSavingsGoal,
    mutateTransactions,
    mutateBudgets,
    mutateSavingsGoal: mutateSavingsGoal as () => void,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
