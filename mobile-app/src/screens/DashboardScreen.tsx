import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Calendar from '../components/Calendar';
import { useAuthStore } from '../store/authStore';
import { useTransactionStore } from '../store/transactionStore';

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuthStore();
  const { 
    selectedDate, 
    setSelectedDate, 
    monthlyIncome, 
    monthlyExpense,
    fetchMonthlySummary 
  } = useTransactionStore();

  useEffect(() => {
    console.log("[DASHBOARD] Dashboard mounted");
    // Fetch initial monthly summary for the current month
    const yearMonth = selectedDate.substring(0, 7);
    fetchMonthlySummary(yearMonth);
  }, []);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    const newYearMonth = date.substring(0, 7);
    const currentYearMonth = selectedDate.substring(0, 7);
    
    if (newYearMonth !== currentYearMonth) {
      fetchMonthlySummary(newYearMonth);
    }
    
    console.log(`[NAVIGATION] Navigate to TransactionDetailScreen for date: ${date}`);
    navigation.navigate('TransactionDetail', { date });
  };

  const balance = monthlyIncome - monthlyExpense;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View className="flex-row justify-between items-center mb-6 mt-4">
          <View className="flex-row items-center space-x-3">
            <View className="w-12 h-12 rounded-full bg-blue-400 items-center justify-center">
              <Text className="text-white text-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
            <View>
              <Text className="text-text font-bold text-lg">S.Budget</Text>
              <Text className="text-gray-500 text-sm">Chào bạn, {user?.name?.split(' ').pop()} 👋</Text>
            </View>
          </View>
          <View className="w-10 h-10 rounded-full items-center justify-center">
            {/* Bell Icon Placeholder */}
            <Text className="text-gray-400 text-2xl">🔔</Text>
          </View>
        </View>

        {/* BALANCE CARD */}
        <View className="mb-6 bg-primary rounded-3xl p-6 shadow-md">
          <Text className="text-white/80 text-sm font-medium mb-1">Tổng số dư hiện tại</Text>
          <Text className="text-white text-4xl font-bold mb-4">
            {balance.toLocaleString('vi-VN')} đ
          </Text>
          <View className="bg-white/20 self-start px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">
              ↗ +2.4% so với tháng trước
            </Text>
          </View>
        </View>

        {/* INCOME / EXPENSE CARDS */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-gray-100 rounded-3xl p-4 flex-1 mr-2 shadow-sm">
            <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mb-2">
              <Text className="text-blue-600 font-bold">↓</Text>
            </View>
            <Text className="text-gray-500 text-xs font-medium mb-1">Thu nhập</Text>
            <Text className="text-blue-600 text-lg font-bold">{monthlyIncome.toLocaleString('vi-VN')} đ</Text>
          </View>
          <View className="bg-gray-100 rounded-3xl p-4 flex-1 ml-2 shadow-sm">
            <View className="w-8 h-8 rounded-full bg-red-100 items-center justify-center mb-2">
              <Text className="text-red-500 font-bold">↑</Text>
            </View>
            <Text className="text-gray-500 text-xs font-medium mb-1">Chi tiêu</Text>
            <Text className="text-red-500 text-lg font-bold">{monthlyExpense.toLocaleString('vi-VN')} đ</Text>
          </View>
        </View>

        {/* CALENDAR */}
        <Calendar 
          selectedDate={selectedDate} 
          onDateSelect={handleDateSelect} 
        />
        
        <View className="h-24" />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 w-16 h-16 bg-primary rounded-full items-center justify-center shadow-lg"
        onPress={() => console.log('Add FAB pressed')}
      >
        <Text className="text-white text-3xl mb-1">+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}