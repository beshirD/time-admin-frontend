export type Customer = {
  id: number;
  fullName: string;
  email: string;
  contactNo: string;
  stateId: string;
  createdOn: string;
  createdById: string;
};

export type SubAdmin = {
  id: number;
  fullName: string;
  email: string;
  stateId: string;
  createdOn: string;
  createdById: string;
};

export type Tailor = {
  id: number;
  fullName: string;
  email: string;
  contactNo: string;
  stateId: string;
  createdOn: string;
  createdById: string;
};

export type TailorAdmin = {
  id: number;
  fullName: string;
  email: string;
  stateId: string;
  createdOn: string;
  createdById: string;
};


export type BannerPackages = {
  sNo: number;
  id: number;
  packageTitle: string;
  description: string;
  duration: number;
  price: number;
  maxBanners: number;
  isPopular: boolean;
  stateId: string;
  createdOn: string;
  createdBy: string;
};

export type Subscription = {
  id: number;
  restaurant: string;
  restaurantPhone?: string;
  restaurantEmail?: string;
  package: string;
  packageDetails?: string;
  startDate: string;
  endDate: string;
  duration?: string;
  status: string;
  banners: string;
  bannerUsagePercent?: number;
  amount: number;
  paymentMethod?: string;
  paymentStatus?: string;
  approvalStatus?: string;
  created: string;
  createdBy?: string;
};

export type SubscriptionQueue = {
  id: number;
  restaurant: string;
  package: string;
  paymentMethod: string;
  amount: number;
  merchant: string;
  merchantEmail?: string;
  requestedOn: string;
  paymentProof: string;
  paymentNotes?: string;
  startDate?: string;
  endDate?: string;
};
