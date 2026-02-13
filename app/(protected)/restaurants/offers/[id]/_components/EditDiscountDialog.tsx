"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { RestaurantOffer } from "@/types/entities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditDiscountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  offer: RestaurantOffer;
  onSave: (data: {
    discountType: "fixed_amount" | "percentage";
    discountValue: number;
    maxDiscountAmount: number;
    minOrderAmount: number;
  }) => void;
}

export function EditDiscountDialog({
  isOpen,
  onClose,
  offer,
  onSave,
}: EditDiscountDialogProps) {
  const [discountType, setDiscountType] = useState<
    "fixed_amount" | "percentage"
  >(offer.discountType);
  const [discountValue, setDiscountValue] = useState(
    offer.discountValue.toString(),
  );
  const [maxDiscountAmount, setMaxDiscountAmount] = useState(
    offer.maxDiscountAmount?.toString() || "0",
  );
  const [minOrderAmount, setMinOrderAmount] = useState(
    offer.minOrderAmount?.toString() || "0",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      discountType,
      discountValue: parseFloat(discountValue),
      maxDiscountAmount: parseFloat(maxDiscountAmount),
      minOrderAmount: parseFloat(minOrderAmount),
    });
    onClose();
  };

  const handleClose = () => {
    setDiscountType(offer.discountType);
    setDiscountValue(offer.discountValue.toString());
    setMaxDiscountAmount(offer.maxDiscountAmount?.toString() || "0");
    setMinOrderAmount(offer.minOrderAmount?.toString() || "0");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[100px] m-1">
      <div className="no-scrollbar relative border w-full lg:w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Discount Settings
          </h4>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3 space-y-4">
            <div>
              <Label htmlFor="discountType">
                Discount Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={discountType}
                onValueChange={(value) =>
                  setDiscountType(value as "fixed_amount" | "percentage")
                }>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed_amount">Amount (AFN)</SelectItem>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="discountValue">
                Discount Value ({discountType === "fixed_amount" ? "AFN" : "%"}){" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="discountValue"
                type="number"
                step="0.01"
                required
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={
                  discountType === "percentage"
                    ? "Enter value between 1 and 100"
                    : "Enter AFN value"
                }
                min={discountType === "percentage" ? "1" : "0"}
                max={discountType === "percentage" ? "100" : undefined}
              />
            </div>

            <div>
              <Label htmlFor="maxDiscountAmount">
                Max Discount Amount (AFN)
              </Label>
              <Input
                id="maxDiscountAmount"
                type="number"
                step="0.01"
                value={maxDiscountAmount}
                onChange={(e) => setMaxDiscountAmount(e.target.value)}
                placeholder="Enter max discount amount"
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="minOrderAmount">
                Min Order Amount (AFN) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="minOrderAmount"
                type="number"
                step="0.01"
                required
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(e.target.value)}
                placeholder="Enter minimum order amount"
                min="0"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
