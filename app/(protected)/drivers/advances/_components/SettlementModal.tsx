"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { toast } from "sonner";
import { DriverAdvance } from "@/types/entities";

interface SettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  advance: DriverAdvance | null;
  onSubmit: (data: { amountReturned: number; notes: string }) => void;
}

export default function SettlementModal({
  isOpen,
  onClose,
  advance,
  onSubmit,
}: SettlementModalProps) {
  const [amountReturned, setAmountReturned] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    // Validation
    if (!amountReturned || parseFloat(amountReturned) < 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    onSubmit({
      amountReturned: parseFloat(amountReturned),
      notes: notes.trim(),
    });

    // Reset form
    setAmountReturned("");
    setNotes("");
    onClose();
  };

  const handleClose = () => {
    setAmountReturned("");
    setNotes("");
    onClose();
  };

  if (!advance) return null;

  const expectedReturn = advance.expectedReturn || 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Driver Settlement"
      hideTitle={true}
      className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-[550px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 border lg:p-8">
        <div className="mb-6">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Driver Settlement
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {advance.driverName} - {advance.date}
          </p>
        </div>

        {/* Settlement Information */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Advance Amount:
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {advance.advanceAmount.toLocaleString()} AFN
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Paid to Restaurants:
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {(advance.paidToRestaurants || 0).toLocaleString()} AFN
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Collected from Customers:
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {(advance.collectedFromCustomers || 0).toLocaleString()} AFN
            </span>
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Expected Return:
              </span>
              <span className="text-base font-bold text-primary">
                {expectedReturn.toLocaleString()} AFN
              </span>
            </div>
          </div>
        </div>

        {/* Amount Returned Input */}
        <div className="mb-6">
          <Label>
            Amount Returned by Driver <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            placeholder="0"
            value={amountReturned}
            onChange={(e) => setAmountReturned(e.target.value)}
            className="mt-2"
            min="0"
            step="0.01"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Expected amount: {expectedReturn.toLocaleString()} AFN
          </p>
        </div>

        {/* Settlement Notes */}
        <div className="mb-6">
          <Label>Settlement Notes</Label>
          <textarea
            placeholder="Optional notes about the settlement"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="mt-2 w-full px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}>
            Submit Settlement
          </Button>
        </div>
      </div>
    </Modal>
  );
}
