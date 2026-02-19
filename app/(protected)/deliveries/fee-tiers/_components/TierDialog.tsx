"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { DeliveryFeeTier } from "@/types/entities";

interface TierDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tier?: DeliveryFeeTier | null;
  onSuccess?: () => void;
}

export function TierDialog({
  isOpen,
  onClose,
  tier,
  onSuccess,
}: TierDialogProps) {
  const [formData, setFormData] = useState({
    minDistance: "",
    maxDistance: "",
    price: "",
    sortOrder: "",
    state: "Active",
  });

  useEffect(() => {
    if (tier) {
      setFormData({
        minDistance: tier.minDistance.toString(),
        maxDistance:
          tier.maxDistance !== null ? tier.maxDistance.toString() : "",
        price: tier.price.toString(),
        sortOrder: tier.sortOrder.toString(),
        state: tier.state,
      });
    } else {
      setFormData({
        minDistance: "",
        maxDistance: "",
        price: "",
        sortOrder: "",
        state: "Active",
      });
    }
  }, [tier, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.success(
      tier
        ? "Delivery fee tier updated successfully"
        : "Delivery fee tier created successfully",
    );
    handleClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClose = () => {
    setFormData({
      minDistance: "",
      maxDistance: "",
      price: "",
      sortOrder: "",
      state: "Active",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[600px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[600px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {tier ? "Edit Delivery Fee Tier" : "Create Delivery Fee Tier"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {tier
              ? "Update delivery fee tier information."
              : "Add a new delivery fee tier."}
          </p>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3 space-y-5">
            {/* Min Distance */}
            <div>
              <Label htmlFor="minDistance">
                Min Distance (km, inclusive){" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="minDistance"
                type="number"
                step="0.01"
                required
                value={formData.minDistance}
                onChange={(e) =>
                  setFormData({ ...formData, minDistance: e.target.value })
                }
                placeholder="0.00"
              />
            </div>

            {/* Max Distance */}
            <div>
              <Label htmlFor="maxDistance">
                Max Distance (km, exclusive, leave empty for max tier)
              </Label>
              <Input
                id="maxDistance"
                type="number"
                step="0.01"
                value={formData.maxDistance}
                onChange={(e) =>
                  setFormData({ ...formData, maxDistance: e.target.value })
                }
                placeholder="Leave empty for max tier"
              />
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price">
                Price (AFN) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="0.00"
              />
            </div>

            {/* Sort Order */}
            <div>
              <Label htmlFor="sortOrder">
                Sort Order <span className="text-red-500">*</span>
              </Label>
              <Input
                id="sortOrder"
                type="number"
                required
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData({ ...formData, sortOrder: e.target.value })
                }
                placeholder="0"
              />
            </div>

            {/* State */}
            <div>
              <Label htmlFor="state">
                State <span className="text-red-500">*</span>
              </Label>
              <Select
                required
                value={formData.state}
                onValueChange={(value) =>
                  setFormData({ ...formData, state: value })
                }>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
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
              {tier ? "Update Tier" : "Create Tier"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
