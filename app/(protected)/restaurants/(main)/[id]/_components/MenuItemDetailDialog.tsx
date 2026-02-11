"use client";

import { MenuItem } from "@/types/entities";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import { Star, Clock, Package, TrendingUp } from "lucide-react";
import Image from "next/image";

interface MenuItemDetailDialogProps {
  menuItem: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MenuItemDetailDialog({
  menuItem,
  isOpen,
  onClose,
}: MenuItemDetailDialogProps) {
  if (!menuItem) return null;

  const getItemTypeBadge = (type: string) => {
    const styles = {
      VEG: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      NON_VEG: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      VEGAN: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    };
    return styles[type as keyof typeof styles] || styles.VEG;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[900px] m-4">
      <div className="no-scrollbar border relative w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                {menuItem.title}
              </h4>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getItemTypeBadge(menuItem.itemType)}`}>
                  {menuItem.itemType.replace("_", " ")}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    menuItem.isAvailable
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                  {menuItem.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
          </div>

          {/* Images */}
          {menuItem.images && menuItem.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {menuItem.images.slice(0, 6).map((image, index) => (
                <div
                  key={index}
                  className="relative w-full h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={image}
                    alt={`${menuItem.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="custom-scrollbar max-h-[500px] overflow-y-auto space-y-6">
          {/* Basic Information */}
          <div>
            <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-3">
              Description
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {menuItem.description || "No description available"}
            </p>
          </div>

          {/* Category */}
          <div>
            <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-3">
              Category
            </h5>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {menuItem.category.title}
              </p>
              {menuItem.category.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {menuItem.category.description}
                </p>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-3">
              Pricing
            </h5>
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Base Price
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  AFN {menuItem.basePrice.toFixed(2)}
                </p>
              </div>

              {menuItem.prices && menuItem.prices.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Variants
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {menuItem.prices.map((price) => (
                      <div
                        key={price.id}
                        className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              {price.title}
                            </p>
                            {price.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {price.description}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Quantity: {price.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-gray-800 dark:text-white ml-2">
                            AFN {price.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Add-ons */}
          {menuItem.addons && menuItem.addons.length > 0 && (
            <div>
              <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-3">
                Add-ons
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {menuItem.addons.map((addon) => (
                  <div
                    key={addon.id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center gap-3">
                    {addon.image && (
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                        <Image
                          src={addon.image}
                          alt={addon.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                        {addon.title}
                      </p>
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                        +AFN {addon.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div>
            <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-3">
              Statistics & Details
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Rating
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {menuItem.averageRating > 0
                    ? menuItem.averageRating.toFixed(1)
                    : "N/A"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {menuItem.numberOfRatings} ratings
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Cook Time
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {menuItem.cookTimeMins} min
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-4 w-4 text-green-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Stock
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {menuItem.stock}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Orders
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {menuItem.numberOfOrders}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {menuItem.totalQuantitySold} sold
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Delivery Time
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {menuItem.estimatedDeliveryTimeMinutes} min
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Platform Fee
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {menuItem.platformFeePercentage}%
                </p>
              </div>
            </div>
          </div>

          {/* Availability Times */}
          <div>
            <h5 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-3">
              Availability
            </h5>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Start:</span>{" "}
                {menuItem.availabilityStartTime}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span className="font-medium">End:</span>{" "}
                {menuItem.availabilityEndTime}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
