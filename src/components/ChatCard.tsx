import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MessageCircle, ExternalLink, Clock } from 'lucide-react-native';
import { Colors } from '../constants/Colors';

interface ChatCardProps {
  chatType: string;
  availability: string;
  isActive: boolean;
  onPress: () => void;
}

export function ChatCard({
  chatType,
  availability,
  isActive,
  onPress,
}: ChatCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, !isActive && styles.inactiveContainer]} 
      onPress={isActive ? onPress : undefined}
    >
      <View style={[styles.iconContainer, !isActive && styles.inactiveIconContainer]}>
        <MessageCircle size={20} color={isActive ? Colors.secondary : Colors.textSecondary} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.chatType, !isActive && styles.inactiveText]}>
            {chatType}
          </Text>
          {isActive && (
            <View style={styles.onlineBadge}>
              <Text style={styles.onlineText}>ONLINE</Text>
            </View>
          )}
        </View>
        <Text style={styles.availability}>{availability}</Text>
      </View>
      {isActive ? (
        <ExternalLink size={18} color={Colors.secondary} />
      ) : (
        <Clock size={18} color={Colors.textSecondary} />
      )}
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
  inactiveContainer: {
    opacity: 0.6,
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
  inactiveIconContainer: {
    backgroundColor: 'rgba(97, 97, 97, 0.1)',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
  },
  inactiveText: {
    color: Colors.textSecondary,
  },
  onlineBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  onlineText: {
    fontSize: 8,
    fontWeight: '600',
    color: 'white',
  },
  availability: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});