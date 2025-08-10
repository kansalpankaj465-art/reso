import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Share2,
  Heart,
  Clock,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { useBankData } from '../../hooks/useBankData';
import { useFavorites } from '../../hooks/useFavorites';
import { useRecentCalls } from '../../hooks/useRecentCalls';
import { ContactCard } from '../../components/ContactCard';
import { EmailCard } from '../../components/EmailCard';
import { ChatCard } from '../../components/ChatCard';

export default function BankDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { banks } = useBankData();
  const { favorites, toggleFavorite } = useFavorites();
  const { addToRecent } = useRecentCalls();
  
  const [activeTab, setActiveTab] = useState(0);
  
  const bank = banks.find(b => b.id === id);
  
  if (!bank) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Bank not found</Text>
      </View>
    );
  }

  const isFavorite = favorites.includes(bank.id);

  const handleCall = async (phoneNumber: string) => {
    addToRecent(bank.id);
    const phoneUrl = `tel:${phoneNumber}`;
    
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

  const handleEmail = async (email: string) => {
    const emailUrl = `mailto:${email}?subject=Banking Inquiry`;
    
    try {
      const supported = await Linking.canOpenURL(emailUrl);
      if (supported) {
        await Linking.openURL(emailUrl);
      } else {
        Alert.alert('Error', 'Email is not supported on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open email');
    }
  };

  const handleOpenMaps = async () => {
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(bank.name)}+near+me`;
    
    try {
      const supported = await Linking.canOpenURL(mapsUrl);
      if (supported) {
        await Linking.openURL(mapsUrl);
      } else {
        Alert.alert('Error', 'Maps is not supported on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open maps');
    }
  };

  const handleShare = () => {
    const shareText = `${bank.name}\nHelpline: ${bank.helpline}\nService Hours: ${bank.serviceHours}\nType: ${bank.type}`;
    Alert.alert('Share', shareText);
  };

  const tabs = [
    { title: 'Phone', icon: Phone },
    { title: 'Email', icon: Mail },
    { title: 'Chat', icon: MessageCircle },
    { title: 'Locate', icon: MapPin },
  ];

  const phoneNumbers = [
    {
      type: 'General Customer Service',
      number: bank.helpline,
      hours: bank.serviceHours,
      icon: 'support_agent',
    },
    {
      type: 'Credit Card Support',
      number: '+1-800-432-3117',
      hours: 'Mon-Fri 8AM-10PM EST',
      icon: 'credit_card',
    },
    {
      type: 'Business Banking',
      number: '+1-800-225-5935',
      hours: 'Mon-Fri 7AM-9PM EST',
      icon: 'business',
    },
  ];

  const emailSupports = [
    {
      type: 'General Inquiries',
      email: bank.email || 'support@bank.com',
      description: 'For general banking questions and account inquiries',
    },
    {
      type: 'Credit Card Issues',
      email: 'creditcard.support@bank.com',
      description: 'For credit card related concerns and disputes',
    },
  ];

  const chatSupports = [
    {
      type: 'Live Chat Support',
      url: 'https://bank.com/chat',
      availability: 'Available 24/7',
      isActive: true,
    },
    {
      type: 'WhatsApp Business',
      url: `https://wa.me/${bank.helpline.replace(/[^0-9]/g, '')}`,
      availability: 'Mon-Fri 9AM-6PM EST',
      isActive: false,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Phone
        return (
          <View style={styles.tabContent}>
            {phoneNumbers.map((contact, index) => (
              <ContactCard
                key={index}
                contactType={contact.type}
                contactNumber={contact.number}
                serviceHours={contact.hours}
                onPress={() => handleCall(contact.number)}
              />
            ))}
          </View>
        );
      case 1: // Email
        return (
          <View style={styles.tabContent}>
            {emailSupports.map((email, index) => (
              <EmailCard
                key={index}
                emailType={email.type}
                emailAddress={email.email}
                description={email.description}
                onPress={() => handleEmail(email.email)}
              />
            ))}
          </View>
        );
      case 2: // Chat
        return (
          <View style={styles.tabContent}>
            {chatSupports.map((chat, index) => (
              <ChatCard
                key={index}
                chatType={chat.type}
                availability={chat.availability}
                isActive={chat.isActive}
                onPress={() => Linking.openURL(chat.url)}
              />
            ))}
          </View>
        );
      case 3: // Locate
        return (
          <View style={styles.locateContainer}>
            <MapPin size={64} color={Colors.primary} />
            <Text style={styles.locateTitle}>Find Nearby Branches</Text>
            <Text style={styles.locateSubtitle}>
              Locate the nearest {bank.name} branch or ATM using Google Maps
            </Text>
            <TouchableOpacity style={styles.mapsButton} onPress={handleOpenMaps}>
              <MapPin size={20} color="white" />
              <Text style={styles.mapsButtonText}>Open in Maps</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Share2 size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: bank.logoUrl }}
            style={styles.logo}
            defaultSource={require('../../assets/icon.png')}
          />
        </View>
        <Text style={styles.bankName}>{bank.name}</Text>
        <Text style={styles.bankType}>{bank.type} Bank</Text>

        {/* Primary Helpline */}
        <TouchableOpacity
          style={styles.primaryHelpline}
          onPress={() => handleCall(bank.helpline)}
        >
          <Text style={styles.primaryHelplineLabel}>Primary Helpline</Text>
          <View style={styles.primaryHelplineNumber}>
            <Phone size={24} color="white" />
            <Text style={styles.primaryHelplineText}>{bank.helpline}</Text>
          </View>
          <Text style={styles.primaryHelplineSubtext}>Tap to call now</Text>
        </TouchableOpacity>

        {/* Emergency Helpline */}
        {bank.isEmergency && (
          <TouchableOpacity
            style={styles.emergencyHelpline}
            onPress={() => handleCall(bank.helpline)}
          >
            <AlertTriangle size={20} color={Colors.error} />
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyText}>Emergency: {bank.helpline}</Text>
              <Text style={styles.emergencySubtext}>24/7 Available</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === index;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => setActiveTab(index)}
            >
              <IconComponent
                size={16}
                color={isActive ? 'white' : Colors.primary}
              />
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => toggleFavorite(bank.id)}
      >
        <Heart
          size={24}
          color="white"
          fill={isFavorite ? 'white' : 'transparent'}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  shareButton: {
    padding: 8,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: Colors.primaryLight,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  bankName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  bankType: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  primaryHelpline: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryHelplineLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 8,
  },
  primaryHelplineNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  primaryHelplineText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginLeft: 8,
  },
  primaryHelplineSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  emergencyHelpline: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.errorLight,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  emergencyContent: {
    marginLeft: 12,
  },
  emergencyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error,
  },
  emergencySubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 4,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  tabContent: {
    paddingBottom: 80,
  },
  locateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  locateTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  locateSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  mapsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  mapsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
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