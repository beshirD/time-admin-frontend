export type Customer = {
  id: number;
  fullName: string;
  email: string;
  contactNo: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "BANNED";
  createdOn: string;
  createdById: string;
};

export type SubAdmin = {
  id: number;
  fullName: string;
  email: string;
  status: string;
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

// API Response Types for Restaurants
export type RestaurantCategory = {
  id: number;
  title: string;
};

export type RestaurantStatus = 
  | "active" 
  | "inactive" 
  | "pending" 
  | "approved" 
  | "rejected" 
  | "suspended";

export type Restaurant = {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  featuredImage: string;
  images: string[];
  addressLine: string;
  status: RestaurantStatus;
  category: RestaurantCategory;
  cuisine: string;
  deliveryFee: number;
  deliveryDistanceKm: number;
  averageRating: number;
  numberOfRatings: number;
  distanceKm: number;
  isFavorite: boolean;
  deliveryTimeMinutes: number;
  isAvailable: boolean;
  averagePrice: number;
};

export type PageMetadata = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};

export type RestaurantsResponse = {
  content: Restaurant[];
  page: PageMetadata;
};

export type Cuisine = {
  id: number;
  title: string;
  image: string;
  status: "active" | "inactive";
};

export type CuisinesResponse = {
  content: Cuisine[];
  page: PageMetadata;
};

export type AddOn = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export type AddOnCategory = {
  id: number;
  title: string;
  addons: AddOn[];
};

export type AddOnCategoriesResponse = {
  content: AddOnCategory[];
  page: PageMetadata;
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
  image?: string;
  status?: "active" | "inactive";
  // Legacy fields for backward compatibility
  state?: string;
  type?: "Restaurant" | "Store";
};

export type FoodCategoriesResponse = {
  content: FoodCategory[];
  page: PageMetadata;
};

export type RestaurantTransaction = {
  id: number;
  orderId: number;
  user: string;
  restaurant: string;
  amount: string;
  reference: string;
  status: "pending" | "completed" | "failed" | "canceled";
  gateway: string;
};

export type RestaurantOffer = {
  id: number;
  title: string;
  code: string;
  discountType: "amount" | "percentage";
  discount: number;
  minimumAmount?: number;
  endTime: string;
  description: string;
  image?: string;
};
export type Order = {
  id: number;
  orderNo: string;
  store: string;
  address: string;
  totalPrice: number;
  deliveryStatus:
    | "RESTAURANT_REJECTED"
    | "PENDING"
    | "CONFIRMED"
    | "PREPARING"
    | "READY_FOR_PICKUP"
    | "PICKED_UP"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED"
    | "PLACED"
    | "ACCEPTED"
    | "ON_THE_WAY"
    | "DRIVER_REJECTED";
  createdOn: string;
  createdBy: string;
};
export type MenuItem = {
  id: number;
  name: string;
  category: string;
  type: string;
  description: string;
  price: number;
  image?: string;
};
