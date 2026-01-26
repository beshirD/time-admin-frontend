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
  firstName: string;
  lastName: string;
  email: string;
  stateId: string;
  createdOn: string;
};
