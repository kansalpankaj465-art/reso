import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Mail, ChevronRight } from 'lucide-react-native';
import { Colors } from '../constants/Colors';

interface EmailCardProps {
  emailType: string;
  emailAddress: string;
  description: string;
  onPress: () => void;
}

export function EmailCard({
  emailType,
  emailAddress,
  description,
  onPress,
}: EmailCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Mail size={20} color={Colors.secondary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.emailType}>{emailType}</Text>
        <Text style={styles.emailAddress}>{emailAddress}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <ChevronRight size={16} color={Colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  emailType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  emailAddress: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.secondary,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});