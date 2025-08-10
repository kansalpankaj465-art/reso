import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
} from 'react-native';
import { Colors } from '../constants/Colors';

interface SettingsSwitchProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function SettingsSwitch({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
}: SettingsSwitchProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Colors.border, true: Colors.primary }}
        thumbColor={value ? 'white' : Colors.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});