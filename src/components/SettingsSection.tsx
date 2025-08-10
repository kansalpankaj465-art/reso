import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Colors } from '../constants/Colors';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  content: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});