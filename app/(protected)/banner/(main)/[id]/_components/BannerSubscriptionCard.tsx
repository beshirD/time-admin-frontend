"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Banner {
  subscriptionEndDate: string;
  subscriptionStatus: string;
}

interface BannerSubscriptionCardProps {
  banner: Banner;
}

const subscriptionStatusConfig: Record<string, { className: string }> = {
  Active: {
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500",
  },
  Expired: {
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500",
  },
  Pending: {
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-500",
  },
};

const subscriptionStatusOptions = [
  { value: "Active", label: "Active" },
  { value: "Expired", label: "Expired" },
  { value: "Pending", label: "Pending" },
];

export default function BannerSubscriptionCard({
  banner,
}: BannerSubscriptionCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    subscriptionEndDate: banner.subscriptionEndDate,
    subscriptionStatus: banner.subscriptionStatus,
  });

  const statusInfo = subscriptionStatusConfig[banner.subscriptionStatus] || {
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  };

  const handleSave = () => {
    console.log("Saving subscription info:", formData);
    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-800">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Subscription Details
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Subscription End Date
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {banner.subscriptionEndDate}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Subscription Status
              </p>
              <span
                className={cn(
                  "inline-block px-3 py-1 rounded-full text-sm font-semibold",
                  statusInfo.className,
                )}>
                {banner.subscriptionStatus}
              </span>
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
        className="max-w-[100px] m-1">
        <div className="no-scrollbar relative border w-full lg:w-[650px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Subscription Details
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Update subscription information for this banner.
            </p>
          </div>
          <form
            className="flex flex-col w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}>
            <div className="custom-scrollbar h-[300px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Subscription Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  <div>
                    <Label htmlFor="subscriptionEndDate">
                      Subscription End Date
                    </Label>
                    <Input
                      id="subscriptionEndDate"
                      type="text"
                      value={formData.subscriptionEndDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subscriptionEndDate: e.target.value,
                        })
                      }
                      placeholder="e.g., Oct 9, 2025, 1:42:52 PM"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subscriptionStatus">
                      Subscription Status
                    </Label>
                    <Select
                      value={formData.subscriptionStatus}
                      onValueChange={(value) =>
                        setFormData({ ...formData, subscriptionStatus: value })
                      }>
                      <SelectTrigger className="w-full h-11">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {subscriptionStatusOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
