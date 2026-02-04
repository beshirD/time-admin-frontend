"use client";

import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Subscription } from "@/types/entities";
import Textarea from "@/components/ui/Textarea";

interface SubscriptionInfoCardProps {
  subscriptionData: Subscription;
}

export default function SubscriptionInfoCard({
  subscriptionData,
}: SubscriptionInfoCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    status: subscriptionData.status,
    paymentStatus: subscriptionData.paymentStatus || "Paid",
    approvalStatus: subscriptionData.approvalStatus || "Approved",
    adminNote: "",
  });

  const handleSave = () => {
    console.log("Saving subscription info:", formData);
    closeModal();
  };

  return (
    <div className="p-7 bg-white dark:bg-gray-900 rounded-lg border ">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-6">
            Subscription Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                ID
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.id}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                Restaurant
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.restaurant}
              </p>
              {subscriptionData.restaurantPhone && (
                <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
                  {subscriptionData.restaurantPhone}
                </p>
              )}
              {subscriptionData.restaurantEmail && (
                <p className="text-base text-gray-600 dark:text-gray-400">
                  {subscriptionData.restaurantEmail}
                </p>
              )}
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                Package
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.package}
              </p>
              {subscriptionData.packageDetails && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {subscriptionData.packageDetails}
                </p>
              )}
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                Start Date
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.startDate}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                End Date
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.endDate}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                Duration
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.duration || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                Status
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.status}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                Banner Usage
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.banners}
              </p>
              {subscriptionData.bannerUsagePercent !== undefined && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {subscriptionData.bannerUsagePercent}%
                </p>
              )}
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                Amount
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                ${subscriptionData.amount.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                Payment Method
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.paymentMethod || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                Payment Status
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.paymentStatus || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                Approval Status
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.approvalStatus || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                Created On
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.created}
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                Created By
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white/90">
                {subscriptionData.createdBy || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 lg:inline-flex lg:w-auto shrink-0">
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
              Edit Subscription
            </h4>
            <p className="mb-6 text-base text-gray-500 dark:text-gray-400">
              Update subscription details and status.
            </p>
          </div>
          <form
            className="flex flex-col w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}>
            <div className="custom-scrollbar h-[500px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Subscription Details
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value })
                      }>
                      <SelectTrigger className="w-full h-11">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="paymentStatus">Payment Status</Label>
                    <Select
                      value={formData.paymentStatus}
                      onValueChange={(value) =>
                        setFormData({ ...formData, paymentStatus: value })
                      }>
                      <SelectTrigger className="w-full h-11">
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="approvalStatus">Approval Status</Label>
                    <Select
                      value={formData.approvalStatus}
                      onValueChange={(value) =>
                        setFormData({ ...formData, approvalStatus: value })
                      }>
                      <SelectTrigger className="w-full h-11">
                        <SelectValue placeholder="Select approval status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="adminNote">Admin Note</Label>
                    <Textarea
                      id="adminNote"
                      rows={4}
                      value={formData.adminNote}
                      onChange={(e) =>
                        setFormData({ ...formData, adminNote: e.target.value })
                      }
                      placeholder="Enter any notes or comments..."
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
