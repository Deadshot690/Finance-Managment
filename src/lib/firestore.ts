import { collection, doc, getDocs, setDoc, addDoc, query, orderBy, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import type { Transaction, Budget } from './types';
import { budgets as placeholderBudgets, transactions as placeholderTransactions } from './placeholder-data';

// Fetch transactions for a user
export const getTransactions = async (userId: string): Promise<Transaction[]> => {
  const transactionsCol = collection(db, 'users', userId, 'transactions');
  const q = query(transactionsCol, orderBy('date', 'desc'));
  const transactionSnapshot = await getDocs(q);
  const transactionList = transactionSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date.toDate().toISOString().split('T')[0], // Convert timestamp to YYYY-MM-DD
  })) as Transaction[];
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
    const budgetsCol = collection(db, 'users', userId, 'budgets');
    placeholderBudgets.forEach(budget => {
        const docRef = doc(budgetsCol, budget.category.toLowerCase());
        const { id, ...data } = budget;
        batch.set(docRef, data);
    });

    await batch.commit();
}
