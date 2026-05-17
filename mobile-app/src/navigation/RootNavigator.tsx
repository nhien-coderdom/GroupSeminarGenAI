import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import SplashScreen from '../screens/SplashScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoading, token, restoreToken } = useAuthStore();

  useEffect(() => {
    restoreToken();
  }, [restoreToken]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token == null ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}