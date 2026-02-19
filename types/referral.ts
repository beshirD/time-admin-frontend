/**
 * Types for Referral & Points Settings
 */

export interface PointsSettings {
  id: number;
  pointsPerReferredOrder: number;
  pointsPerDiscountPercentage: number;
  maxDiscountPercentage: number;
  minOrderAmountForPoints: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePointsSettings {
  pointsPerReferredOrder: number;
  pointsPerDiscountPercentage: number;
  maxDiscountPercentage: number;
  minOrderAmountForPoints: number;
}

export interface PointsSettingsResponse {
  success: boolean;
  message: string;
  data: PointsSettings;
  timestamp: string;
  statusCode: number | null;
  errorCode: string | null;
}

export interface PointsSettingsHistoryResponse {
  success: boolean;
  message: string;
  data: PointsSettings[];
  timestamp: string;
  statusCode: number | null;
  errorCode: string | null;
}
