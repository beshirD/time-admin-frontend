/**
 * User preferences types
 */

export type Theme = 'LIGHT' | 'DARK' | 'SYSTEM';

export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  language: string;
  currency: string;
  theme: Theme;
}

export interface PreferencesResponse {
  success: boolean;
  message: string;
  data: UserPreferences;
  timestamp: string;
  statusCode: number | null;
  errorCode: string | null;
}

export interface UpdatePreferences {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  smsNotifications?: boolean;
  marketingEmails?: boolean;
  language?: string;
  currency?: string;
  theme?: Theme;
}
