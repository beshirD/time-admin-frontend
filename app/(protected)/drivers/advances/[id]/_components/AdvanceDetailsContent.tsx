"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DriverAdvance } from "@/types/entities";
import AdvanceDetailsHeader from "./AdvanceDetailsHeader";
import AdvanceInfoCard from "./AdvanceInfoCard";
import OrdersTable, { AdvanceOrder } from "./OrdersTable";
import OrderSummary from "./OrderSummary";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";

interface AdvanceDetailsContentProps {
  advanceData: DriverAdvance & {
    created?: string;
    balance?: number;
    netCashPosition?: number;
  };
  orders: AdvanceOrder[];
}

export default function AdvanceDetailsContent({
  advanceData,
  orders,
}: AdvanceDetailsContentProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Calculate order summary
  const totalOrders = orders.length;
  const ordersWithCashFlow = orders.filter((o) => o.hasCashFlow).length;
  const completedOrders = orders.filter(
    (o) => o.cashFlowStatus === "Completed",
  ).length;
  const pendingOrders = orders.filter(
    (o) => o.cashFlowStatus === "Pending",
  ).length;

  const handleDelete = async () => {
    toast.success("Advance deleted successfully");
    router.push("/drivers/advances");
  };

  return (
    <div className="mx-auto">
      <div className="w-full space-y-5">
        {/* Header */}
        <AdvanceDetailsHeader
          advanceData={advanceData}
          onDelete={() => setShowDeleteDialog(true)}
        />

        {/* Advance Info Card */}
        <AdvanceInfoCard advanceData={advanceData} />

        {/* Orders Table */}
        <OrdersTable orders={orders} />

        {/* Order Summary */}
        {/* <OrderSummary
          totalOrders={totalOrders}
          ordersWithCashFlow={ordersWithCashFlow}
          pendingOrders={pendingOrders}
          completedOrders={completedOrders}
        /> */}

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && (
          <DeleteConfirmationDialog
            trigger={<div />}
            title="Delete Advance"
            itemName={`Advance for ${advanceData.driverName}`}
            itemType="Advance"
            onConfirm={handleDelete}
            onSuccess={() => setShowDeleteDialog(false)}
          />
        )}
      </div>
    </div>
  );
}
