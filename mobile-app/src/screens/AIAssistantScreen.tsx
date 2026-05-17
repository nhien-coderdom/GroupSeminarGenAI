import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import Button from '../components/Button';

export default function AIAssistantScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold text-text mb-6 mt-2">AI Assistant</Text>
        
        <Card className="mb-4">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-primary/20 rounded-full items-center justify-center mr-3">
              <Text className="text-xl">🤖</Text>
            </View>
            <Text className="text-lg font-bold text-text">Smart Insights</Text>
          </View>
          <Text className="text-gray-600 mb-4 leading-6">
            Based on your recent spending, you've spent 40% more on food this week. Consider reducing dining out to stay within your monthly budget goals.
          </Text>
          <Button title="View Detailed Report" onPress={() => {}} variant="outline" />
        </Card>
        
        <Card className="mb-4">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-secondary/20 rounded-full items-center justify-center mr-3">
              <Text className="text-xl">📷</Text>
            </View>
            <Text className="text-lg font-bold text-text">Scan Receipt</Text>
          </View>
          <Text className="text-gray-600 mb-4 leading-6">
            Upload or take a photo of your receipt to automatically extract transaction details.
          </Text>
          <Button title="Scan Now" onPress={() => {}} variant="primary" />
        </Card>
        
      </ScrollView>
    </SafeAreaView>
  );
}