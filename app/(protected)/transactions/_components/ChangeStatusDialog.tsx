"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import type { Transaction, TransactionStatus } from "@/types/entities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChangeStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onSave: (transactionId: number, newStatus: TransactionStatus) => void;
  isSaving?: boolean;
}

export function ChangeStatusDialog({
  isOpen,
  onClose,
  transaction,
  onSave,
  isSaving = false,
}: ChangeStatusDialogProps) {
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (transaction && isOpen) {
      setStatus(transaction.status);
    }
  }, [transaction, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status && transaction) {
      onSave(transaction.id, status as TransactionStatus);
    }
  };

  const handleClose = () => {
    setStatus("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[100px] m-1">
      <div className="no-scrollbar relative border w-full lg:w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Change Transaction Status
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Update the status for transaction #{transaction?.id}
          </p>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3 space-y-4">
            {/* Transaction Info */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Reference:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                  {transaction?.reference}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Amount:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {transaction?.amount?.toFixed(2)} {transaction?.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Gateway:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {transaction?.gateway}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Current Status:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {transaction?.status}
                </span>
              </div>
            </div>

            {/* Status Dropdown */}
            <div>
              <Label htmlFor="status">
                New Status <span className="text-red-500">*</span>
              </Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="SUCCESS">Success</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={handleClose}
              disabled={isSaving}>
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={isSaving}>
              {isSaving ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
