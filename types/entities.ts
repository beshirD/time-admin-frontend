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

export type Driver = {
  id: number;
  fullName: string;
  email: string;
  contactNo: string;
  stateId: string;
  createdOn: string;
  createdById: string;
  // Detail fields
  firstName?: string;
  lastName?: string;
  riderId?: string;
  isEmailVerified?: string;
  isApprove?: string;
  status?: string;
  role?: string;
  profilePicture?: string;
};

export type Manager = {
  id: number;
  fullName: string;
  email: string;
  profilePicture?: string;
  assignedDrivers: number;
  status: "high" | "low";
};

export type UnassignedDriver = {
  id: number;
  fullName: string;
  email: string;
  profilePicture?: string;
};

export type AssignedDriver = {
  id: number;
  fullName: string;
  email: string;
  contactNo: string;
  stateId: string;
  assignedTo: string;
  assignedToId: number;
  joinedDate: string;
  profilePicture?: string;
};

export type DriverAdvance = {
  id: number;
  driverId: number;
  driverName: string;
  date: string;
  advanceAmount: number;
  status: "Active" | "Settled" | "Cancelled";
  paidToRestaurants?: number;
  collectedFromCustomers?: number;
  expectedReturn?: number;
};

export type Restaurant = {
  id: number;
  restaurantName: string;
  fee?: string;
  location: string;
  image: string;
  stateId: string;
  createdOn: string;
};

export type Cuisine = {
  id: number;
  title: string;
  stateId: string;
  createdOn: string;
};

export type AddOnCategory = {
  id: number;
  title: string;
  createdOn: string;
  createdBy: string;
};

export type Feed = {
  id: number;
  content: string;
  createdOn: string;
  createdBy: string;
};

export type FoodCategory = {
  id: number;
  title: string;
  state: string;
  image?: string;
  type: "Restaurant" | "Store";
};
