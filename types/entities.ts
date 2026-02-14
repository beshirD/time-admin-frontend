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



export type BannerPackageStatus = "active" | "inactive";

export type BannerPackage = {
  id: number;
  title: string;
  description: string;
  price: number;
  durationDays: number;
  maxBanners: number;
  isPopular: boolean;
  status: BannerPackageStatus;
  createdAt: string;
};

export type BannerPackagesResponse = {
  content: BannerPackage[];
  page: PageMetadata;
};

export type CreateBannerPackageRequest = {
  title: string;
  description: string;
  price: number;
  durationDays: number;
  maxBanners: number;
};

export type CreateBannerPackageResponse = {
  success: boolean;
  message: string;
  data: BannerPackage;
};

// Legacy type for backward compatibility
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

export type CreateSubscriptionRequest = {
  packageId: number;
};

export type CreateSubscriptionResponse = {
  success: boolean;
  message: string;
  data: string;
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
  latitude: number;
  longitude: number;
  contactNumber?: string;
  website?: string;
  deliveryFee: number;
  deliveryDistanceKm: number;
  platformFeePercentage: number;
  status: RestaurantStatus;
  businessLicense?: string;
  category: {
    id: number;
    title: string;
  } | null;
  cuisine: string | null;
  openingHours: OpeningHour[];
  averageRating: number | null;
  numberOfRatings: number | null;
  distanceKm: number | null;
  isFavorite: boolean;
  deliveryTimeMinutes: number | null;
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
  addons?: AddOn[];
  createdOn?: string;
  createdBy?: string;
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
  restaurantId: number;
  title: string;
  description: string;
  imageUrl: string;
  couponCode: string;
  discountType: "percentage" | "fixed_amount";
  discountValue: number;
  maxDiscountAmount: number;
  minOrderAmount: number;
  startDate: string;
  endDate: string;
  status: "active" | "inactive";
  usageLimitPerUser: number;
  totalUsageLimit: number;
  createdAt: string;
};

export type OffersResponse = {
  content: RestaurantOffer[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};
export type OrderStatus = 
  | "pending" 
  | "accepted" 
  | "preparing" 
  | "ready" 
  | "out_for_delivery" 
  | "delivered" 
  | "cancelled";

export type StatusOrder = {
  orderId: number;
  orderNo: string;
  restaurantId: number;
  restaurantName: string;
  restaurantImage: string;
  addressId: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  discount: number;
  payableAmount: number;
  deliveryFee: number;
  createdAt: string;
};

export type OrderStatusGroup = {
  status: OrderStatus;
  orders: StatusOrder[];
};

export type OrdersStatusResponse = OrderStatusGroup[];

export type PaymentMethod = "cash" | "card" | "online";

export type PaymentStatus = "pending" | "paid" | "failed";

export type Order = {
  id: number;
  orderNo: string;
  status: OrderStatus;
  createdAt: string;
  customerId: number;
  customerName: string;
  customerPhone: string;
  restaurantId: number;
  restaurantName: string;
  address: string;
  addressId: number;
  createdBy: string;
  totalPrice: number;
  deliveryFee: number;
  offerDiscount: number;
  finalTotal: number;
  platformFeeAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryStatus: string;
  driverId: number;
  deliveryLatitude: number;
  deliveryLongitude: number;
};

export type OrdersResponse = {
  total: number;
  page: number;
  size: number;
  orders: Order[];
};

export type OrderItemAddon = {
  addonId: number;
  price: number;
};

export type OrderItem = {
  itemId: number;
  priceId: number;
  quantity: number;
  priceEach: number;
  addons: OrderItemAddon[];
};

export type OrderDetail = {
  id: number;
  orderNo: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  customerId: number;
  customerName: string;
  customerPhone: string;
  restaurantId: number;
  restaurantName: string;
  addressId: number;
  address: string;
  city: string;
  postalCode: string;
  totalPrice: number;
  deliveryFee: number;
  offerDiscount: number;
  platformFeeAmount: number;
  finalTotal: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryStatus: string;
  driverId: number;
  deliveryId: string;
  assignedRiderId: string;
  specialInstructions: string;
  rejectionReason: string;
  cancellationReason: string;
  couponCode: string;
  referralCode: string;
  items: OrderItem[];
};

export type OrderDetailResponse = {
  success: boolean;
  message: string;
  data: OrderDetail;
};

export type ManualOrderItemAddon = {
  addonId: number;
  priceOverride?: number;
};

export type ManualOrderItem = {
  itemId: number;
  priceId: number;
  quantity: number;
  unitPriceOverride?: number;
  addons?: ManualOrderItemAddon[];
};

export type CreateManualOrderRequest = {
  customerId: number;
  restaurantId: number;
  addressId?: number;
  address?: string;
  items: ManualOrderItem[];
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  specialInstructions?: string;
  discountOverride?: number;
  deliveryFeeOverride?: number;
  platformFeeOverride?: number;
  initialStatus?: OrderStatus;
  skipApproval?: boolean;
};

export type CreateManualOrderResponse = {
  success: boolean;
  message: string;
  data: OrderDetail;
};
export type MenuItemType = "VEG" | "NON_VEG" | "VEGAN";

export type MenuItemPrice = {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  sortOrder: number;
};

export type MenuItemAddOn = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export type MenuItemCategory = {
  id: number;
  title: string;
  description: string;
  status: "active" | "inactive";
};

export type MenuItem = {
  id: number;
  restaurantId: number;
  title: string;
  description: string;
  images: string[];
  itemType: MenuItemType;
  basePrice: number;
  platformFeePercentage: number;
  availabilityStartTime: string;
  availabilityEndTime: string;
  cookTimeMins: number;
  isAvailable: boolean;
  stock: number;
  prices: MenuItemPrice[];
  addons: MenuItemAddOn[];
  category: MenuItemCategory;
  averageRating: number;
  numberOfRatings: number;
  numberOfOrders: number;
  totalQuantitySold: number;
  estimatedDeliveryTimeMinutes: number;
  isFavorite: boolean;
};

export type MenuItemsResponse = {
  content: MenuItem[];
  page: PageMetadata;
};

export type OpeningHour = {
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
};

export type BannerStatus = "active" | "inactive" | "pending" | "archive";

export type Banner = {
  id: number;
  subscriptionId: number;
  restaurantId: number;
  itemId: number;
  bannerImage: string;
  status: BannerStatus;
  createdAt: string;
};

export type BannersResponse = {
  content: Banner[];
  page: PageMetadata;
};

export type CreateBannerResponse = {
  success: boolean;
  message: string;
  data: Banner;
};

export type Activity = {
  id: number;
  content: string;
  userIp: string;
  userAgent: string;
  state: string;
  createdOn: string;
  createdBy: string;
  modelType: string;
  model: string;
  type: string;
};

export type Page = {
  id: number;
  title: string;
  description: string;
  state: string;
  type: string;
  createdOn: string;
};

export type PageType = {
  id: number;
  name: string;
};

export type Backup = {
  id: number;
  name: string;
  size: string;
  createTime: string;
};

export type CronJob = {
  id: number;
  title: string;
  when: string;
  type: string;
  logs: number;
  state: string;
  createdOn: string;
  command: string;
  createdBy: string;
};

export type CronJobType = {
  id: number;
  name: string;
  state: string;
  createdOn: string;
};

export type CronJobLog = {
  id: number;
  state: string;
  type: string;
  cronjob: string;
  scheduledOn: string;
  executedOn: string;
  createdOn: string;
  createdBy: string;
};
