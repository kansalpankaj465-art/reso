import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after app is ready
    const hideSplash = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    };
    
    hideSplash();
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#1B365D" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FAFAFA',
          },
          headerTintColor: '#212121',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="bank-detail/[id]" 
          options={{ 
            title: 'Bank Details',
            presentation: 'card'
          }} 
        />
        <Stack.Screen 
          name="search" 
          options={{ 
            title: 'Search Banks',
            presentation: 'card'
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            title: 'Settings',
            presentation: 'card'
          }} 
        />
      </Stack>
    </>
  );
}