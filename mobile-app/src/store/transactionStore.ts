import { create } from 'zustand';
import api from '../services/api';

export interface ICategory {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface ITransaction {
  id: string;
  amount: number;
  type: 'expense' | 'income';
  categoryId: string;
  category?: ICategory;
  note?: string;
  createdAt: string;
}

interface TransactionState {
  selectedDate: string;
  selectedTransactions: ITransaction[];
  totalIncome: number;
  totalExpense: number;
  monthlyIncome: number;
  monthlyExpense: number;
  isLoading: boolean;
  error: string | null;

  setSelectedDate: (date: string) => void;
  fetchTransactionsByDate: (date: string) => Promise<void>;
  fetchMonthlySummary: (yearMonth: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  selectedDate: new Date().toISOString().split('T')[0],
  selectedTransactions: [],
  totalIncome: 0,
  totalExpense: 0,
  monthlyIncome: 0,
  monthlyExpense: 0,
  isLoading: false,
  error: null,

  setSelectedDate: (date: string) => {
    set({ selectedDate: date });
  },

  fetchTransactionsByDate: async (date: string) => {
    try {
      set({ isLoading: true, error: null });
      console.log(`[STORE] Fetching transactions for date: ${date}`);
      
      const response = await api.get(`/transactions/by-date?date=${date}`);
      
      console.log(`[STORE] Fetched ${response.data.transactions.length} transactions for ${date}`);
      set({ 
        selectedTransactions: response.data.transactions,
        totalIncome: response.data.totalIncome,
        totalExpense: response.data.totalExpense,
        isLoading: false 
      });
    } catch (error: any) {
      console.error('[STORE ERROR] fetchTransactionsByDate failed:', error);
      set({ error: error.message || 'Failed to fetch transactions', isLoading: false });
    }
  },

  fetchMonthlySummary: async (yearMonth: string) => {
    try {
      set({ isLoading: true, error: null });
      console.log(`[STORE] Fetching monthly summary for: ${yearMonth}`);
      
      // Simple approach: get all transactions for the month using start/end date
      const [year, month] = yearMonth.split('-');
      const startDate = new Date(Number(year), Number(month) - 1, 1).toISOString();
      const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59, 999).toISOString();
      
      const response = await api.get(`/transactions?startDate=${startDate}&endDate=${endDate}&limit=1000`);
      
      const transactions = response.data.data || [];
      
      let mIncome = 0;
      let mExpense = 0;
      
      transactions.forEach((tx: any) => {
        if (tx.type === 'income') mIncome += tx.amount;
        if (tx.type === 'expense') mExpense += tx.amount;
      });
      
      console.log(`[STORE] Monthly summary computed: Income=${mIncome}, Expense=${mExpense}`);
      set({ 
        monthlyIncome: mIncome,
        monthlyExpense: mExpense,
        isLoading: false 
      });
    } catch (error: any) {
      console.error('[STORE ERROR] fetchMonthlySummary failed:', error);
      set({ error: error.message || 'Failed to fetch monthly summary', isLoading: false });
    }
  }
}));
