"use client";

import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

interface RestaurantLocationMapProps {
  location: string;
  latitude: number;
  longitude: number;
  updateRestaurant?: (formData: FormData) => void;
  isUpdating?: boolean;
}

export function RestaurantLocationMap({
  location,
  latitude,
  longitude,
  updateRestaurant,
  isUpdating = false,
}: RestaurantLocationMapProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    addressLine: location,
    latitude: latitude.toString(),
    longitude: longitude.toString(),
  });

  const handleSave = () => {
    if (!updateRestaurant) return;

    // Prepare the data object with only location-related fields
    const data = {
      addressLine: formData.addressLine,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
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
    <div className="p-7 border bg-white dark:bg-gray-900 rounded-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
            Restaurant Location
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            📍 {location}
          </p>
          <div className="w-full h-[300px] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                🗺️ Map will be displayed here
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Map integration coming soon
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 lg:inline-flex lg:w-auto shrink-0">
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
        className="max-w-[600px] m-4">
        <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Restaurant Location
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Update the restaurant&apos;s address and coordinates.
            </p>
          </div>
          <form
            className="flex flex-col"
            onSubmit={(e) => e.preventDefault()}>
            <div className="px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  <div className="col-span-1">
                    <Label>Address *</Label>
                    <Input
                      type="text"
                      value={formData.addressLine}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          addressLine: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <Label>Latitude</Label>
                    <Input
                      type="text"
                      value={formData.latitude}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          latitude: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-1">
                    <Label>Longitude</Label>
                    <Input
                      type="text"
                      value={formData.longitude}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          longitude: e.target.value,
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
                onClick={handleSave}
                disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
