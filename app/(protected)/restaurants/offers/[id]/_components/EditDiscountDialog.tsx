"use client";

import { useState, useEffect, useRef } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface EditDiscountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  offer: RestaurantOffer;
  onSave: (data: {
    discountType: "amount" | "percentage";
    discount: number;
    minimumAmount?: number;
    endTime: string;
  }) => void;
}

export function EditDiscountDialog({
  isOpen,
  onClose,
  offer,
  onSave,
}: EditDiscountDialogProps) {
  const [discountType, setDiscountType] = useState<"amount" | "percentage">(
    offer.discountType,
  );
  const [discount, setDiscount] = useState(offer.discount.toString());
  const [minimumAmount, setMinimumAmount] = useState(
    offer.minimumAmount?.toString() || "",
  );
  const [endTime, setEndTime] = useState<Date>(new Date(offer.endTime));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      discountType,
      discount: parseFloat(discount),
      minimumAmount: minimumAmount ? parseFloat(minimumAmount) : undefined,
      endTime: endTime.toISOString().split("T")[0],
    });
    onClose();
  };

  const handleClose = () => {
    setDiscountType(offer.discountType);
    setDiscount(offer.discount.toString());
    setMinimumAmount(offer.minimumAmount?.toString() || "");
    setEndTime(new Date(offer.endTime));
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
                  setDiscountType(value as "amount" | "percentage")
                }>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount">Amount (AFN)</SelectItem>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="discount">
                Discount ({discountType === "amount" ? "AFN" : "%"}){" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="discount"
                type="number"
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
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
              <Label htmlFor="minimumAmount">Minimum Amount (AFN)</Label>
              <Input
                id="minimumAmount"
                type="number"
                value={minimumAmount}
                onChange={(e) => setMinimumAmount(e.target.value)}
                placeholder="Enter minimum amount"
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="endTime">
                End Time <span className="text-red-500">*</span>
              </Label>
              <div
                className="relative"
                ref={calendarRef}>
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="w-full h-11 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-left flex items-center justify-between hover:border-primary transition">
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900 dark:text-white">
                      {format(endTime, "PPP")}
                    </span>
                  </span>
                </button>

                {isCalendarOpen && (
                  <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Select End Date
                      </h3>
                    </div>
                    <Calendar
                      mode="single"
                      selected={endTime}
                      onSelect={(date) => date && setEndTime(date)}
                      className="rounded-md"
                    />
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsCalendarOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition">
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
