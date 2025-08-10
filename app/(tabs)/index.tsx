import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Alert,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { Search, Filter, Mic, Phone, Heart, Share2, Building2 } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { BankCard } from '../../components/BankCard';
import { FilterChip } from '../../components/FilterChip';
import { EmptyState } from '../../components/EmptyState';
import { useBankData } from '../../hooks/useBankData';
import { useFavorites } from '../../hooks/useFavorites';
import { useRecentCalls } from '../../hooks/useRecentCalls';
import { Bank } from '../../types/Bank';

export default function BanksScreen() {
  const { banks, loading, refreshBanks } = useBankData();
  const { favorites, toggleFavorite } = useFavorites();
  const { addToRecent } = useRecentCalls();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);

  const filters = [
    { label: 'All', count: banks.length },
    { label: 'Public', count: banks.filter(b => b.type === 'Public').length },
    { label: 'Private', count: banks.filter(b => b.type === 'Private').length },
    { label: 'Cooperative', count: banks.filter(b => b.type === 'Cooperative').length },
    { label: 'Foreign', count: banks.filter(b => b.type === 'Foreign').length },
  ];

  useEffect(() => {
    filterBanks();
  }, [banks, searchQuery, selectedFilter]);

  const filterBanks = () => {
    let filtered = [...banks];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(bank =>
        bank.name.toLowerCase().includes(query) ||
        bank.type.toLowerCase().includes(query) ||
        bank.helpline.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(bank => bank.type === selectedFilter);
    }

    setFilteredBanks(filtered);
  };

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
    // In a real app, you would use react-native-share or similar
    Alert.alert('Share', shareText);
  };

  const handleVoiceSearch = () => {
    Alert.alert('Voice Search', 'Voice search functionality would be implemented here');
  };

  const renderBankItem = ({ item }: { item: Bank }) => (
    <BankCard
      bank={item}
      isFavorite={favorites.includes(item.id)}
      onPress={() => handleBankPress(item)}
      onCallPress={() => handleCallPress(item)}
      onFavoritePress={() => toggleFavorite(item.id)}
      onSharePress={() => handleSharePress(item)}
    />
  );

  const renderFilterChip = ({ item }: { item: typeof filters[0] }) => (
    <FilterChip
      label={item.label}
      count={item.count}
      isSelected={selectedFilter === item.label}
      onPress={() => setSelectedFilter(item.label)}
    />
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search banks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearButton}>×</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => router.push('/search')}>
          <Filter size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <FlatList
        data={filters}
        renderItem={renderFilterChip}
        keyExtractor={(item) => item.label}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
        style={styles.filtersList}
      />

      {/* Banks List */}
      <FlatList
        data={filteredBanks}
        renderItem={renderBankItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshBanks}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <EmptyState
            icon={<Search size={64} color={Colors.primary} />}
            title="No Banks Found"
            subtitle="Try adjusting your search or filters"
            actionText="Clear Search"
            onActionPress={() => {
              setSearchQuery('');
              setSelectedFilter('All');
            }}
          />
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleVoiceSearch}>
        <Mic size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  clearButton: {
    fontSize: 24,
    color: Colors.textSecondary,
    paddingHorizontal: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersList: {
    maxHeight: 48,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  listContainer: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});