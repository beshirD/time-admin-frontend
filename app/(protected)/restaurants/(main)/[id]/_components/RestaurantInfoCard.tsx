"use client";

import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

interface Restaurant {
  id: number;
  merchantId: string;
  email: string;
  ownerName: string;
  restaurantName: string;
  deliveryFees: number;
  maxDeliveryDistance: number;
  platformFeePercentage: number;
  location: string;
  averageRating: number | null;
  state: string;
  createdOn: string;
}

interface RestaurantInfoCardProps {
  restaurant: Restaurant;
}

export function RestaurantInfoCard({ restaurant }: RestaurantInfoCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    merchantId: restaurant.merchantId,
    email: restaurant.email,
    ownerName: restaurant.ownerName,
    restaurantName: restaurant.restaurantName,
    deliveryFees: restaurant.deliveryFees,
    maxDeliveryDistance: restaurant.maxDeliveryDistance,
    platformFeePercentage: restaurant.platformFeePercentage,
    location: restaurant.location,
  });

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...", formData);
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
                Merchant Id
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.merchantId}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Owner Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.ownerName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Restaurant Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.restaurantName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Delivery Fees
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                AFN {restaurant.deliveryFees.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Max Delivery Distance
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.maxDeliveryDistance} KM
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
                Location
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.location}
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
                State
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.state}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Created On
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {restaurant.createdOn}
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
                    <Label>Merchant ID</Label>
                    <Input
                      type="text"
                      value={formData.merchantId}
                      onChange={(e) =>
                        setFormData({ ...formData, merchantId: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Owner Name</Label>
                    <Input
                      type="text"
                      value={formData.ownerName}
                      onChange={(e) =>
                        setFormData({ ...formData, ownerName: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Restaurant Name</Label>
                    <Input
                      type="text"
                      value={formData.restaurantName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          restaurantName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Delivery Fees (AFN)</Label>
                    <Input
                      type="number"
                      value={formData.deliveryFees}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliveryFees: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Max Delivery Distance (KM)</Label>
                    <Input
                      type="number"
                      value={formData.maxDeliveryDistance}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxDeliveryDistance: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Platform Fee Percentage (%)</Label>
                    <Input
                      type="number"
                      value={formData.platformFeePercentage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          platformFeePercentage: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Location</Label>
                    <Input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
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
