"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import type { Transaction, TransactionStatus } from "@/types/entities";
import { ChangeStatusDialog } from "./ChangeStatusDialog";
import PageTitle from "@/components/common/PageTitle";
import { useTransactions } from "@/hooks/useTransactions";

export function TransactionsContent() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const {
    data: transactions,
    total,
    isLoading,
    changeStatus,
    isChangingStatus,
  } = useTransactions({ page: pageIndex, size: pageSize });

  const [changingTransaction, setChangingTransaction] =
    useState<Transaction | null>(null);

  const pageCount = Math.ceil(total / pageSize);

  const handleChangeStatus = (transaction: Transaction) => {
    setChangingTransaction(transaction);
  };

  const handleStatusUpdate = (
    transactionId: number,
    newStatus: TransactionStatus,
  ) => {
    changeStatus(
      { id: transactionId, status: newStatus },
      {
        onSuccess: () => {
          setChangingTransaction(null);
        },
      },
    );
  };

  const handlePaginationChange = (
    newPageIndex: number,
    newPageSize: number,
  ) => {
    setPageIndex(newPageIndex);
    setPageSize(newPageSize);
  };

  const columns = createColumns(handleChangeStatus);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex px-5 py-2 rounded-lg border bg-white dark:bg-gray-900 items-center justify-between">
          <PageTitle title="Transactions" />
        </div>
        <div className="flex bg-white dark:bg-gray-900 p-5 rounded-lg">
          <DataTable
            columns={columns}
            data={transactions}
            searchPlaceholder="Search by reference, gateway..."
            searchableColumns={[
              "reference",
              "gateway",
              "status",
              "payableType",
            ]}
            isLoading={isLoading}
            manualPagination={true}
            pageCount={pageCount}
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalItems={total}
            onPaginationChange={handlePaginationChange}
          />
        </div>
      </div>

      {/* Change Status Dialog */}
      <ChangeStatusDialog
        isOpen={!!changingTransaction}
        onClose={() => setChangingTransaction(null)}
        transaction={changingTransaction}
        onSave={handleStatusUpdate}
        isSaving={isChangingStatus}
      />
    </>
  );
}
