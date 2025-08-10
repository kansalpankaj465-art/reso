export interface Bank {
  id: string;
  name: string;
  type: 'Public' | 'Private' | 'Cooperative' | 'Foreign';
  helpline: string;
  serviceHours: string;
  logoUrl: string;
  isEmergency: boolean;
  email?: string;
  website?: string;
}

export interface ContactInfo {
  type: string;
  number: string;
  hours: string;
  icon: string;
}

export interface EmailSupport {
  type: string;
  email: string;
  description: string;
}

export interface ChatSupport {
  type: string;
  url: string;
  availability: string;
  isActive: boolean;
}