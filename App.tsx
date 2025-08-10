import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigator from './src/navigation/TabNavigator';
import BankDetailScreen from './src/screens/BankDetailScreen';
import SearchScreen from './src/screens/SearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import {Colors} from './src/constants/Colors';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.surface,
              },
              headerTintColor: Colors.textPrimary,
              headerTitleStyle: {
                fontWeight: '600',
                fontSize: 20,
              },
            }}>
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BankDetail"
              component={BankDetailScreen}
              options={{
                title: 'Bank Details',
                presentation: 'card',
              }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                title: 'Search Banks',
                presentation: 'card',
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                title: 'Settings',
                presentation: 'card',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;