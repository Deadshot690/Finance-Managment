import { collection, doc, getDocs, setDoc, addDoc, query, orderBy, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import type { Transaction, Budget } from './types';
import { budgets as placeholderBudgets, transactions as placeholderTransactions } from './placeholder-data';

// Fetch transactions for a user
export const getTransactions = async (userId: string): Promise<Transaction[]> => {
  const transactionsCol = collection(db, 'users', userId, 'transactions');
  const q = query(transactionsCol, orderBy('date', 'desc'));
  const transactionSnapshot = await getDocs(q);
  const transactionList = transactionSnapshot.docs.map(doc => {
    const data = doc.data();
    // Safely convert timestamp to date string
    const date = data.date?.toDate ? data.date.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    return {
      id: doc.id,
      ...data,
      date,
    } as Transaction;
  });
  return transactionList;
};

// Add a new transaction for a user
export const addTransaction = async (userId: string, transaction: Omit<Transaction, 'id' | 'date'> & { date: Date }) => {
  const transactionsCol = collection(db, 'users', userId, 'transactions');
  await addDoc(transactionsCol, {
    ...transaction,
    createdAt: serverTimestamp(),
  });
};

// Fetch budgets for a user
export const getBudgets = async (userId: string): Promise<Budget[]> => {
    const budgetsCol = collection(db, 'users', userId, 'budgets');
    const budgetSnapshot = await getDocs(budgetsCol);
    if (budgetSnapshot.empty) {
        return [];
    }
    const budgetList = budgetSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Budget[];
    return budgetList;
};

// Set a new budget for a user
export const addBudget = async (userId: string, budget: Omit<Budget, 'id' | 'spent'>) => {
    // We use the category name as the document ID to prevent duplicate budgets for the same category.
    const budgetDoc = doc(db, 'users', userId, 'budgets', budget.category);
    await setDoc(budgetDoc, {
        category: budget.category,
        amount: budget.amount,
    });
};


// Seed initial data for a new user
export const seedInitialData = async (userId: string) => {
    const batch = writeBatch(db);

    // Seed transactions
    const transactionsCol = collection(db, 'users', userId, 'transactions');
    placeholderTransactions.forEach(transaction => {
        const docRef = doc(transactionsCol);
        const { id, ...data } = transaction;
        batch.set(docRef, { 
            ...data, 
            date: new Date(data.date),
            createdAt: serverTimestamp() 
        });
    });

    // Seed budgets
    placeholderBudgets.forEach(budget => {
        // Use category as the ID
        const docRef = doc(db, 'users', userId, 'budgets', budget.category);
        const { id, spent, ...data } = budget;
        batch.set(docRef, data);
    });

    await batch.commit();
}
