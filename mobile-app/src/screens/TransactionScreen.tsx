import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionCard from '../components/TransactionCard';
import { mockTransactions } from '../data/mock';

export default function TransactionScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-4 flex-1">
        <Text className="text-2xl font-bold text-text mb-4 mt-2">All Transactions</Text>
        
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text className="text-gray-500 mt-2">Loading transactions...</Text>
          </View>
        ) : (
          <FlatList
            data={mockTransactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionCard transaction={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}