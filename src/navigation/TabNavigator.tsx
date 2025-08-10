import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Phone, Heart, Clock, Settings} from 'lucide-react-native';
import {Colors} from '../constants/Colors';
import BanksScreen from '../screens/BanksScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import RecentScreen from '../screens/RecentScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: Colors.surface,
        },
        headerTintColor: Colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 20,
        },
      }}>
      <Tab.Screen
        name="Banks"
        component={BanksScreen}
        options={{
          title: 'Banks',
          headerTitle: 'Bank Helpline Hub',
          tabBarIcon: ({color, size}) => <Phone size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: ({color, size}) => <Heart size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Recent"
        component={RecentScreen}
        options={{
          title: 'Recent',
          tabBarIcon: ({color, size}) => <Clock size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({color, size}) => <Settings size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}