import { useState, useEffect } from 'react';
import { Bank } from '../types/Bank';

const mockBanks: Bank[] = [
  {
    id: '1',
    name: 'State Bank of India',
    type: 'Public',
    helpline: '1800-11-2211',
    serviceHours: '24/7',
    logoUrl: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    isEmergency: true,
    email: 'customercare@sbi.co.in',
    website: 'https://www.onlinesbi.com',
  },
  {
    id: '2',
    name: 'HDFC Bank',
    type: 'Private',
    helpline: '1800-202-6161',
    serviceHours: '24/7',
    logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
    isEmergency: false,
    email: 'support@hdfcbank.com',
    website: 'https://www.hdfcbank.com',
  },
  {
    id: '3',
    name: 'ICICI Bank',
    type: 'Private',
    helpline: '1800-1080',
    serviceHours: '24/7',
    logoUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&h=200&fit=crop',
    isEmergency: false,
    email: 'customercare@icicibank.com',
    website: 'https://www.icicibank.com',
  },
  {
    id: '4',
    name: 'Punjab National Bank',
    type: 'Public',
    helpline: '1800-180-2222',
    serviceHours: '9:00 AM - 6:00 PM',
    logoUrl: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    isEmergency: false,
    email: 'pnbhelp@pnb.co.in',
    website: 'https://www.pnbindia.in',
  },
  {
    id: '5',
    name: 'Axis Bank',
    type: 'Private',
    helpline: '1800-419-5959',
    serviceHours: '24/7',
    logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
    isEmergency: false,
    email: 'customercare@axisbank.com',
    website: 'https://www.axisbank.com',
  },
  {
    id: '6',
    name: 'Bank of Baroda',
    type: 'Public',
    helpline: '1800-258-4455',
    serviceHours: '24/7',
    logoUrl: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    isEmergency: true,
    email: 'connect@bankofbaroda.com',
    website: 'https://www.bankofbaroda.in',
  },
  {
    id: '7',
    name: 'Kotak Mahindra Bank',
    type: 'Private',
    helpline: '1800-274-0110',
    serviceHours: '24/7',
    logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
    isEmergency: false,
    email: 'service@kotak.com',
    website: 'https://www.kotak.com',
  },
  {
    id: '8',
    name: 'Canara Bank',
    type: 'Public',
    helpline: '1800-425-0018',
    serviceHours: '9:00 AM - 8:00 PM',
    logoUrl: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=200&fit=crop',
    isEmergency: false,
    email: 'helpdesk@canarabank.com',
    website: 'https://www.canarabank.com',
  },
];

export function useBankData() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBanks = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setBanks(mockBanks);
    setLoading(false);
  };

  const refreshBanks = async () => {
    await loadBanks();
  };

  useEffect(() => {
    loadBanks();
  }, []);

  return {
    banks,
    loading,
    refreshBanks,
  };
}