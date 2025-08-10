import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Phone, Heart, Share2, Clock, Building2 } from 'lucide-react-native';
import { Colors } from '../constants/Colors';
import { Bank } from '../types/Bank';

interface BankCardProps {
  bank: Bank;
  isFavorite: boolean;
  onPress: () => void;
  onCallPress: () => void;
  onFavoritePress: () => void;
  onSharePress: () => void;
}

export function BankCard({
  bank,
  isFavorite,
  onPress,
  onCallPress,
  onFavoritePress,
  onSharePress,
}: BankCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: bank.logoUrl }}
              style={styles.logo}
              defaultSource={require('../assets/icon.png')}
            />
          </View>
          <View style={styles.bankInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.bankName} numberOfLines={1}>
                {bank.name}
              </Text>
              {bank.isEmergency && (
                <View style={styles.emergencyBadge}>
                  <Text style={styles.emergencyText}>EMERGENCY</Text>
                </View>
              )}
            </View>
            <Text style={styles.bankType}>{bank.type}</Text>
          </View>
          <TouchableOpacity onPress={onFavoritePress} style={styles.favoriteButton}>
            <Heart
              size={20}
              color={isFavorite ? Colors.error : Colors.textSecondary}
              fill={isFavorite ? Colors.error : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.helplineRow}>
          <Phone size={16} color={Colors.primary} />
          <Text style={styles.helplineNumber}>{bank.helpline}</Text>
          <TouchableOpacity style={styles.callButton} onPress={onCallPress}>
            <Phone size={16} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.hoursRow}>
            <Clock size={16} color={Colors.textSecondary} />
            <Text style={styles.hoursText}>Service Hours: {bank.serviceHours}</Text>
          </View>
          <TouchableOpacity onPress={onSharePress} style={styles.shareButton}>
            <Share2 size={16} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  logoContainer: {
    width: 48,
    height: 48,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  bankInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
  },
  emergencyBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  bankType: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  favoriteButton: {
    padding: 4,
  },
  helplineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  helplineNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    flex: 1,
    marginLeft: 8,
  },
  callButton: {
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  hoursText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  shareButton: {
    padding: 4,
  },
});