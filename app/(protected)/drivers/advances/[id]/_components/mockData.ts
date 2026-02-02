import { DriverAdvance } from "@/types/entities";
import { AdvanceOrder } from "./OrdersTable";

// Mock data fetcher
export async function getAdvanceData(
  id: string,
): Promise<
  DriverAdvance & {
    created?: string;
    balance?: number;
    netCashPosition?: number;
  }
> {
  return {
    id: Number(id),
    driverId: 1,
    driverName: "Tailor order",
    date: "Oct 31, 2025",
    advanceAmount: 90000,
    status: "Active",
    paidToRestaurants: 766,
    collectedFromCustomers: 119,
    expectedReturn: 0,
    created: "Oct 31, 2025, 9:03:50 PM",
    balance: 89353,
    netCashPosition: -647.0,
  };
}

// Mock orders data
export const mockOrders: AdvanceOrder[] = [
  {
    id: 1,
    orderNo: "1886",
    restaurant: "Mus diner",
    orderTotal: 100.0,
    paidToRestaurant: 100.0,
    collectedFromCustomer: 23.0,
    cashFlowStatus: "Completed",
    orderDate: "Oct 31, 2025 16:01",
    hasCashFlow: true,
  },
  {
    id: 2,
    orderNo: "3366",
    restaurant: "fixer",
    orderTotal: 36.0,
    paidToRestaurant: 36.0,
    collectedFromCustomer: 76.0,
    cashFlowStatus: "Completed",
    orderDate: "Oct 22, 2025 11:41",
    hasCashFlow: true,
  },
];
