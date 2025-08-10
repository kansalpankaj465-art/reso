import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/Colors';

interface FilterChipProps {
  label: string;
  count: number;
  isSelected: boolean;
  onPress: () => void;
}

export function FilterChip({ label, count, isSelected, onPress }: FilterChipProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
    >
      <Text style={[styles.label, isSelected && styles.selectedLabel]}>
        {label}
      </Text>
      {count > 0 && (
        <View style={[styles.countBadge, isSelected && styles.selectedCountBadge]}>
          <Text style={[styles.countText, isSelected && styles.selectedCountText]}>
            {count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
  },
  selectedContainer: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  selectedLabel: {
    color: 'white',
  },
  countBadge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
  },
  selectedCountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  selectedCountText: {
    color: 'white',
  },
});