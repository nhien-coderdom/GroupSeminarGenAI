import React from 'react';
import { View, Text } from 'react-native';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: string;
  date: string;
}

export default function TransactionCard({ transaction }: { transaction: Transaction }) {
  const isExpense = transaction.type === 'expense';
  return (
    <View className="flex-row justify-between items-center bg-white p-4 mb-2 rounded-xl border border-gray-100 shadow-sm">
      <View className="flex-row items-center">
        <View className={`w-10 h-10 rounded-full items-center justify-center ${isExpense ? 'bg-red-100' : 'bg-secondary'}`}>
          <Text className={`font-bold ${isExpense ? 'text-red-500' : 'text-white'}`}>
            {transaction.title.charAt(0)}
          </Text>
        </View>
        <View className="ml-3">
          <Text className="font-semibold text-text">{transaction.title}</Text>
          <Text className="text-gray-400 text-xs">{transaction.category}</Text>
        </View>
      </View>
      <Text className={`font-bold ${isExpense ? 'text-red-500' : 'text-secondary'}`}>
        {isExpense ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
      </Text>
    </View>
  );
}