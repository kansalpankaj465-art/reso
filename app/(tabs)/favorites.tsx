import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { Heart, Phone, Share2 } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { BankCard } from '../../components/BankCard';
import { EmptyState } from '../../components/EmptyState';
import { useBankData } from '../../hooks/useBankData';
import { useFavorites } from '../../hooks/useFavorites';
import { useRecentCalls } from '../../hooks/useRecentCalls';
import { Bank } from '../../types/Bank';

export default function FavoritesScreen() {
  const { banks } = useBankData();
  const { favorites, toggleFavorite } = useFavorites();
  const { addToRecent } = useRecentCalls();

  const favoriteBanks = banks.filter(bank => favorites.includes(bank.id));

  const handleBankPress = (bank: Bank) => {
    addToRecent(bank.id);
    router.push(`/bank-detail/${bank.id}`);
  };

  const handleCallPress = async (bank: Bank) => {
    addToRecent(bank.id);
    const phoneUrl = `tel:${bank.helpline}`;
    
    try {
      const supported = await Linking.canOpenURL(phoneUrl);
      if (supported) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to make phone call');
    }
  };

  const handleSharePress = (bank: Bank) => {
    const shareText = `${bank.name}\nHelpline: ${bank.helpline}\nService Hours: ${bank.serviceHours}\nType: ${bank.type}`;
    Alert.alert('Share', shareText);
  };

  const renderBankItem = ({ item }: { item: Bank }) => (
    <BankCard
      bank={item}
      isFavorite={true}
      onPress={() => handleBankPress(item)}
      onCallPress={() => handleCallPress(item)}
      onFavoritePress={() => toggleFavorite(item.id)}
      onSharePress={() => handleSharePress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteBanks}
        renderItem={renderBankItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <EmptyState
            icon={<Heart size={64} color={Colors.primary} />}
            title="No Favorites Yet"
            subtitle="Add banks to favorites for quick access"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    paddingBottom: 16,
  },
});