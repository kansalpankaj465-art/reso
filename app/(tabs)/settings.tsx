import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {
  Phone,
  Bell,
  Database,
  Shield,
  Accessibility,
  Info,
  ChevronRight,
  HelpCircle,
  Volume2,
  Sync,
  Trash2,
  BarChart3,
  Share,
  History,
  Type,
  Contrast,
  Eye,
  FileText,
  PrivacyTip,
} from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { SettingsSection } from '../../components/SettingsSection';
import { SettingsTile } from '../../components/SettingsTile';
import { SettingsSwitch } from '../../components/SettingsSwitch';

export default function SettingsScreen() {
  // Calling Preferences
  const [confirmationDialogs, setConfirmationDialogs] = useState(true);
  const [autoSpeaker, setAutoSpeaker] = useState(false);

  // Notifications
  const [updateAlerts, setUpdateAlerts] = useState(true);
  const [emergencyNotifications, setEmergencyNotifications] = useState(true);
  const [maintenanceAnnouncements, setMaintenanceAnnouncements] = useState(false);

  // Data Management
  const [accuracyReporting, setAccuracyReporting] = useState(true);

  // Privacy
  const [analyticsOptOut, setAnalyticsOptOut] = useState(false);
  const [contactSharing, setContactSharing] = useState(true);

  // Accessibility
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [voiceOver, setVoiceOver] = useState(false);

  const showCallingAppSelector = () => {
    Alert.alert(
      'Default Calling App',
      'Select your preferred calling application',
      [
        { text: 'System Default', onPress: () => {} },
        { text: 'Google Phone', onPress: () => {} },
        { text: 'Samsung Phone', onPress: () => {} },
        { text: 'Truecaller', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const showClearCacheDialog = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached bank contact data. You\'ll need an internet connection to reload the information. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'Cache cleared successfully'),
        },
      ]
    );
  };

  const showPrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'Data Collection\n\nWe collect minimal data to provide banking helpline services. This includes call history for your convenience and usage analytics to improve app performance.\n\nData Usage\n\nYour data is used solely to enhance your banking support experience. We never share personal information with third parties without explicit consent.',
      [{ text: 'OK' }]
    );
  };

  const showTermsOfService = () => {
    Alert.alert(
      'Terms of Service',
      'Service Usage\n\nBank Helpline Hub provides contact information for banking customer service. We are not affiliated with any bank and do not provide banking services directly.\n\nAccuracy Disclaimer\n\nWhile we strive to maintain accurate contact information, banks may change their helpline numbers. Always verify critical information directly with your bank.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Calling Preferences */}
      <SettingsSection title="CALLING PREFERENCES">
        <SettingsTile
          icon={<Phone size={20} color={Colors.primary} />}
          title="Default Calling App"
          subtitle="System Default"
          showArrow
          onPress={showCallingAppSelector}
        />
        <SettingsSwitch
          icon={<HelpCircle size={20} color={Colors.secondary} />}
          title="Confirmation Dialogs"
          subtitle="Show confirmation before making calls"
          value={confirmationDialogs}
          onValueChange={setConfirmationDialogs}
        />
        <SettingsSwitch
          icon={<Volume2 size={20} color="#FF9800" />}
          title="Auto-Speaker Activation"
          subtitle="Automatically enable speaker during calls"
          value={autoSpeaker}
          onValueChange={setAutoSpeaker}
        />
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="NOTIFICATIONS">
        <SettingsSwitch
          icon={<Bell size={20} color="#2196F3" />}
          title="Update Alerts"
          subtitle="Notify when contact information changes"
          value={updateAlerts}
          onValueChange={setUpdateAlerts}
        />
        <SettingsSwitch
          icon={<Bell size={20} color="#F44336" />}
          title="Emergency Helpline Notifications"
          subtitle="Priority alerts for emergency banking services"
          value={emergencyNotifications}
          onValueChange={setEmergencyNotifications}
        />
        <SettingsSwitch
          icon={<Bell size={20} color="#9E9E9E" />}
          title="Maintenance Announcements"
          subtitle="App updates and maintenance notifications"
          value={maintenanceAnnouncements}
          onValueChange={setMaintenanceAnnouncements}
        />
      </SettingsSection>

      {/* Data Management */}
      <SettingsSection title="DATA MANAGEMENT">
        <SettingsTile
          icon={<Trash2 size={20} color="#9C27B0" />}
          title="Clear Cache"
          subtitle="Remove stored contact data"
          onPress={showClearCacheDialog}
        />
        <SettingsSwitch
          icon={<BarChart3 size={20} color="#009688" />}
          title="Contact Accuracy Reporting"
          subtitle="Help improve data quality by reporting issues"
          value={accuracyReporting}
          onValueChange={setAccuracyReporting}
        />
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection title="PRIVACY">
        <SettingsSwitch
          icon={<BarChart3 size={20} color="#795548" />}
          title="Analytics Opt-out"
          subtitle="Disable usage analytics collection"
          value={analyticsOptOut}
          onValueChange={setAnalyticsOptOut}
        />
        <SettingsSwitch
          icon={<Share size={20} color="#E91E63" />}
          title="Contact Sharing Permissions"
          subtitle="Allow sharing bank contacts via messaging apps"
          value={contactSharing}
          onValueChange={setContactSharing}
        />
      </SettingsSection>

      {/* Accessibility */}
      <SettingsSection title="ACCESSIBILITY">
        <SettingsSwitch
          icon={<Type size={20} color="#00BCD4" />}
          title="Large Text Support"
          subtitle="Increase text size for better readability"
          value={largeText}
          onValueChange={setLargeText}
        />
        <SettingsSwitch
          icon={<Contrast size={20} color="#FF5722" />}
          title="High Contrast Mode"
          subtitle="Enhanced contrast for better visibility"
          value={highContrast}
          onValueChange={setHighContrast}
        />
        <SettingsSwitch
          icon={<Eye size={20} color="#673AB7" />}
          title="Voice-over Optimizations"
          subtitle="Enhanced screen reader support"
          value={voiceOver}
          onValueChange={setVoiceOver}
        />
      </SettingsSection>

      {/* About */}
      <SettingsSection title="ABOUT">
        <SettingsTile
          icon={<Shield size={20} color="#03A9F4" />}
          title="Privacy Policy"
          subtitle="How we handle your data"
          showArrow
          onPress={showPrivacyPolicy}
        />
        <SettingsTile
          icon={<FileText size={20} color="#FFC107" />}
          title="Terms of Service"
          subtitle="App usage terms and conditions"
          showArrow
          onPress={showTermsOfService}
        />
      </SettingsSection>

      {/* App Version */}
      <View style={styles.appVersionContainer}>
        <View style={styles.appIconContainer}>
          <Phone size={32} color={Colors.primary} />
        </View>
        <Text style={styles.appName}>Bank Helpline Hub</Text>
        <Text style={styles.appVersion}>Version 2.1.4</Text>
        <Text style={styles.lastUpdated}>Last Updated: August 9, 2025</Text>
        <Text style={styles.appDescription}>
          Your trusted companion for banking customer service access
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  appVersionContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 24,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  appIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  lastUpdated: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  appDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});