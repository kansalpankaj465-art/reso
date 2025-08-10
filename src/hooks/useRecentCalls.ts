import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENT_CALLS_KEY = 'recent_calls';
const MAX_RECENT_CALLS = 10;

export function useRecentCalls() {
  const [recentCalls, setRecentCalls] = useState<string[]>([]);

  useEffect(() => {
    loadRecentCalls();
  }, []);

  const loadRecentCalls = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_CALLS_KEY);
      if (stored) {
        setRecentCalls(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load recent calls:', error);
    }
  };

  const saveRecentCalls = async (newRecentCalls: string[]) => {
    try {
      await AsyncStorage.setItem(RECENT_CALLS_KEY, JSON.stringify(newRecentCalls));
      setRecentCalls(newRecentCalls);
    } catch (error) {
      console.error('Failed to save recent calls:', error);
    }
  };

  const addToRecent = (bankId: string) => {
    const newRecentCalls = [bankId, ...recentCalls.filter(id => id !== bankId)]
      .slice(0, MAX_RECENT_CALLS);
    
    saveRecentCalls(newRecentCalls);
  };

  return {
    recentCalls,
    addToRecent,
  };
}