"use client";

import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { Restaurant } from "@/types/entities";

interface RestaurantInfoCardProps {
  restaurant: Restaurant;
  updateRestaurant?: (formData: FormData) => void;
  isUpdating?: boolean;
}

export function RestaurantInfoCard({
  restaurant,
  updateRestaurant,
  isUpdating = false,
}: RestaurantInfoCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: restaurant.name,
    contactNumber: restaurant.contactNumber || "",
    website: restaurant.website || "",
    deliveryFee: restaurant.deliveryFee.toString(),
    deliveryDistanceKm: restaurant.deliveryDistanceKm.toString(),
    platformFeePercentage: restaurant.platformFeePercentage.toString(),
    addressLine: restaurant.addressLine,
    cuisine: restaurant.cuisine || "",
    averagePrice: restaurant.averagePrice.toString(),
    description: restaurant.description || "",
    latitude: restaurant.latitude.toString(),
    longitude: restaurant.longitude.toString(),
  });

  const handleSave = () => {
    if (!updateRestaurant) return;

    // Prepare the data object
    const data = {
      name: formData.name,
      contactNumber: formData.contactNumber,
      website: formData.website,
      deliveryFee: parseFloat(formData.deliveryFee.toString()),
      deliveryDistanceKm: parseFloat(formData.deliveryDistanceKm.toString()),
      platformFeePercentage: parseFloat(
        formData.platformFeePercentage.toString(),
      ),
      addressLine: formData.addressLine,
      cuisine: formData.cuisine,
      averagePrice: parseFloat(formData.averagePrice.toString()),
      description: formData.description,
      latitude: parseFloat(formData.latitude.toString()),
      longitude: parseFloat(formData.longitude.toString()),
    };

    // Create FormData for multipart/form-data
    const formDataToSend = new FormData();
    formDataToSend.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" }),
      "data.json",
    );

    updateRestaurant(formDataToSend);
    closeModal();
  };

  return (
    <div className="p-7 border rounded-xl bg-white dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Restaurant Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                ID
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.id}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Owner ID
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.ownerId}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Category
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.category?.title || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Cuisine
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.cuisine || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Contact Number
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.contactNumber || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Website
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.website || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Delivery Fee
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                ${restaurant.deliveryFee.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Platform Fee Percentage
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.platformFeePercentage}% (Custom)
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Max Delivery Distance
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.deliveryDistanceKm} KM
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Average Rating
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.averageRating
                  ? `${restaurant.averageRating.toFixed(1)} ⭐`
                  : "No ratings yet"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Average Price
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                ${restaurant.averagePrice.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Status
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.status.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto shrink-0">
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Restaurant Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Update restaurant details to keep information current.
            </p>
          </div>
          <form
            className="flex flex-col"
            onSubmit={(e) => e.preventDefault()}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Restaurant Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Restaurant Name *</Label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Cuisine</Label>
                    <Input
                      type="text"
                      value={formData.cuisine}
                      onChange={(e) =>
                        setFormData({ ...formData, cuisine: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Contact Number</Label>
                    <Input
                      type="text"
                      value={formData.contactNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactNumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Website</Label>
                    <Input
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Delivery Fee ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.deliveryFee}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliveryFee: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Max Delivery Distance (KM)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.deliveryDistanceKm}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliveryDistanceKm: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Platform Fee Percentage (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.platformFeePercentage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          platformFeePercentage: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Average Price ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.averagePrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          averagePrice: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Address</Label>
                    <Input
                      type="text"
                      value={formData.addressLine}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          addressLine: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Latitude</Label>
                    <Input
                      type="number"
                      step="any"
                      value={formData.latitude}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          latitude: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Longitude</Label>
                    <Input
                      type="number"
                      step="any"
                      value={formData.longitude}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          longitude: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Description</Label>
                    <textarea
                      className="w-full min-h-[100px] px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModal}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
