import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CalendarProps {
  onDateSelect: (date: string) => void;
  selectedDate: string; // YYYY-MM-DD
}

export default function Calendar({ onDateSelect, selectedDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  useEffect(() => {
    console.log(`[CALENDAR] Month loaded: ${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`);
  }, [currentMonth]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handleDatePress = (day: number) => {
    if (!day) return;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    console.log(`[CALENDAR] User selected date: ${dateStr}`);
    onDateSelect(dateStr);
  };

  const isSelected = (day: number) => {
    if (!day) return false;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateStr === selectedDate;
  };

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  return (
    <View className="bg-white rounded-3xl p-4 shadow-sm mb-6">
      <View className="flex-row justify-between items-center mb-4 px-2">
        <TouchableOpacity 
          className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-2"
          onPress={() => {
            const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
            setCurrentMonth(prev);
          }}
        >
          <Text className="font-bold text-lg text-text">
            {monthNames[currentMonth.getMonth()]}, {currentMonth.getFullYear()}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-primary rounded-full px-4 py-2"
          onPress={() => {
            const now = new Date();
            setCurrentMonth(now);
            onDateSelect(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`);
          }}
        >
          <Text className="text-white font-bold text-sm">Hôm nay</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between mb-2 px-2">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, i) => (
          <Text key={i} className={`w-10 text-center text-xs font-bold ${i === 6 ? 'text-red-500' : 'text-gray-400'}`}>
            {d}
          </Text>
        ))}
      </View>

      <View className="flex-row flex-wrap px-1">
        {days.map((day, index) => (
          <TouchableOpacity 
            key={index} 
            className="w-[14.28%] aspect-square items-center justify-center p-1"
            onPress={() => day && handleDatePress(day)}
            disabled={!day}
          >
            {day && (
              <View className={`w-full h-full rounded-2xl items-center justify-center ${isSelected(day) ? 'bg-primary' : 'bg-transparent'}`}>
                <Text className={`font-medium ${isSelected(day) ? 'text-white font-bold' : 'text-text'}`}>
                  {day}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
