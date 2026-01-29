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
