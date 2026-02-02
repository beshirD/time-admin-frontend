import { Driver, DriverAdvance } from "@/types/entities";

// Mock data for drivers
export const mockDrivers: Driver[] = [
  {
    id: 1,
    fullName: "Acshraf Ahmad",
    email: "ashraf@example.com",
    contactNo: "+93 700 123 456",
    stateId: "Active",
    createdOn: "2025-01-15",
    createdById: "1",
  },
  {
    id: 2,
    fullName: "Ahmad Hissien",
    email: "ah.hussein@example.com",
    contactNo: "+93 700 123 457",
    stateId: "Active",
    createdOn: "2025-01-10",
    createdById: "1",
  },
  {
    id: 3,
    fullName: "Mohammed Abdela",
    email: "ah.hussein@example.com",
    contactNo: "+93 700 123 458",
    stateId: "Active",
    createdOn: "2025-01-05",
    createdById: "1",
  },
  {
    id: 4,
    fullName: "Joseph Han",
    email: "joseph.hanan@example.com",
    contactNo: "+93 700 123 459",
    stateId: "Active",
    createdOn: "2025-01-01",
    createdById: "1",
  },
];

// Mock data for advances
export const mockAdvances: DriverAdvance[] = [
  {
    id: 1,
    driverId: 1,
    driverName: "Acshraf Ahmad",
    date: "Nov 19, 2025",
    advanceAmount: 2000,
    status: "Active",
    paidToRestaurants: 766,
    collectedFromCustomers: 119,
    expectedReturn: 0,
  },
  {
    id: 2,
    driverId: 2,
    driverName: "Ahmad Hissien",
    date: "Nov 8, 2025",
    advanceAmount: 8000,
    status: "Active",
    paidToRestaurants: 3200,
    collectedFromCustomers: 1500,
    expectedReturn: 500,
  },
  {
    id: 3,
    driverId: 3,
    driverName: "Mohammed Abdela",
    date: "Nov 8, 2025",
    advanceAmount: 9000,
    status: "Active",
    paidToRestaurants: 4500,
    collectedFromCustomers: 2000,
    expectedReturn: 1000,
  },
  {
    id: 4,
    driverId: 4,
    driverName: "Joseph Han",
    date: "Nov 5, 2025",
    advanceAmount: 7000,
    status: "Active",
    paidToRestaurants: 2800,
    collectedFromCustomers: 1200,
    expectedReturn: 300,
  },
];
