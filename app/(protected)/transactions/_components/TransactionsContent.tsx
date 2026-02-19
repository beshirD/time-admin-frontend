"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { RestaurantTransaction } from "@/types/entities";
import { ChangeStatusDialog } from "./ChangeStatusDialog";
import PageTitle from "@/components/common/PageTitle";

interface TransactionsContentProps {
  initialData: RestaurantTransaction[];
}

export function TransactionsContent({ initialData }: TransactionsContentProps) {
  const [changingTransaction, setChangingTransaction] =
    useState<RestaurantTransaction | null>(null);

  const handleChangeStatus = (transaction: RestaurantTransaction) => {
    setChangingTransaction(transaction);
  };

  const handleStatusUpdate = (newStatus: string) => {
    console.log(
      "Updating transaction:",
      changingTransaction?.id,
      "to status:",
      newStatus,
    );
    // TODO: Implement API call to update status
    setChangingTransaction(null);
  };

  const columns = createColumns(handleChangeStatus);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex px-5 py-2 rounded-lg border bg-white dark:bg-gray-900 items-center justify-between">
          <PageTitle title="Restaurant Transactions" />
        </div>
        <div className="flex bg-white dark:bg-gray-900 p-5 rounded-lg">
          <DataTable
            columns={columns}
            data={initialData}
            searchPlaceholder="Search by order ID, user, restaurant..."
            searchableColumns={["orderId", "user", "restaurant", "reference"]}
          />
        </div>
      </div>

      {/* Change Status Dialog */}
      <ChangeStatusDialog
        isOpen={!!changingTransaction}
        onClose={() => setChangingTransaction(null)}
        transaction={changingTransaction}
        onSave={handleStatusUpdate}
      />
    </>
  );
}
