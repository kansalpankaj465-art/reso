import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Phone } from 'lucide-react-native';
import { Colors } from '../constants/Colors';

interface ContactCardProps {
  contactType: string;
  contactNumber: string;
  serviceHours: string;
  onPress: () => void;
}

export function ContactCard({
  contactType,
  contactNumber,
  serviceHours,
  onPress,
}: ContactCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Phone size={20} color={Colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.contactType}>{contactType}</Text>
        <Text style={styles.contactNumber}>{contactNumber}</Text>
        <Text style={styles.serviceHours}>{serviceHours}</Text>
      </View>
      <View style={styles.callButton}>
        <Phone size={18} color={Colors.secondary} />
      </View>
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
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  contactType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
    marginBottom: 4,
  },
  serviceHours: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  callButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});