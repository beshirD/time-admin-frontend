"use client";

import { useState } from "react";
import { RestaurantOffer } from "@/types/entities";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import PageTitle from "@/components/common/PageTitle";
import Image from "next/image";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { EditBasicInfoDialog } from "./EditBasicInfoDialog";
import { EditDiscountDialog } from "./EditDiscountDialog";
import { EditDescriptionDialog } from "./EditDescriptionDialog";
import { useDeleteOffer } from "@/hooks/useDeleteOffer";
import { useUpdateOffer } from "@/hooks/useUpdateOffer";

interface OfferDetailsContentProps {
  offer: RestaurantOffer;
  restaurantName: string;
}

export function OfferDetailsContent({
  offer,
  restaurantName,
}: OfferDetailsContentProps) {
  const router = useRouter();
  const deleteOffer = useDeleteOffer();
  const updateOffer = useUpdateOffer(offer.id);
  const [isEditBasicOpen, setIsEditBasicOpen] = useState(false);
  const [isEditDiscountOpen, setIsEditDiscountOpen] = useState(false);
  const [isEditDescriptionOpen, setIsEditDescriptionOpen] = useState(false);

  const handleUpdateBasicInfo = (data: {
    restaurantId: number;
    title: string;
    couponCode: string;
    status: "active" | "inactive";
    startDate: string;
    endDate: string;
    usageLimitPerUser: number;
    totalUsageLimit: number;
  }) => {
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" }),
      "data.json",
    );
    updateOffer.mutate(formData);
  };

  const handleUpdateDiscount = (data: {
    discountType: "fixed_amount" | "percentage";
    discountValue: number;
    maxDiscountAmount: number;
    minOrderAmount: number;
  }) => {
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" }),
      "data.json",
    );
    updateOffer.mutate(formData);
  };

  const handleUpdateDescription = (data: {
    description: string;
    imageFile?: File;
  }) => {
    const formData = new FormData();
    const jsonData = { description: data.description };
    formData.append(
      "data",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" }),
      "data.json",
    );

    if (data.imageFile) {
      formData.append("image", data.imageFile);
    }

    updateOffer.mutate(formData);
  };

  return (
    <>
      <div className="w-full space-y-5 mb-7">
        {/* Header */}
        <div className="flex px-5 py-2 rounded-lg border bg-white dark:bg-gray-900 items-center justify-between">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => router.push("/restaurants/offers")}
              className="flex items-center gap-2 text-gray-600 p-2 rounded-full border dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <PageTitle title={offer.title} />
          </div>
          <div className="flex items-center gap-2">
            <DeleteConfirmationDialog
              itemType="Offer"
              itemName={offer.title}
              onConfirm={async () => {
                await deleteOffer.mutateAsync(offer.id);
              }}
              onSuccess={() => {
                router.push("/restaurants/offers");
              }}
              trigger={
                <Button
                  suppressHydrationWarning
                  usage="delete">
                  Delete
                </Button>
              }
            />
          </div>
        </div>

        {/* Offer Details Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border">
          <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Offer Details
            </h3>
            <Button
              usage="edit"
              onClick={() => setIsEditBasicOpen(true)}>
              Edit
            </Button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ID
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {offer.id}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Restaurant
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {restaurantName || `ID: ${offer.restaurantId}`}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Title
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {offer.title}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Coupon Code
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90 font-mono">
                {offer.couponCode}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </label>
              <p className="mt-1">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    offer.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                  }`}>
                  {offer.status.toUpperCase()}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Discount Type
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90 capitalize">
                {offer.discountType === "fixed_amount"
                  ? "Amount (AFN)"
                  : "Percentage (%)"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Discount Value
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90 font-semibold">
                {offer.discountType === "fixed_amount"
                  ? `${offer.discountValue} AFN`
                  : `${offer.discountValue}%`}
              </p>
            </div>
            {offer.maxDiscountAmount > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Max Discount
                </label>
                <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                  {offer.maxDiscountAmount} AFN
                </p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Min Order Amount
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {offer.minOrderAmount} AFN
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Start Date
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {new Date(offer.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                End Date
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {new Date(offer.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Usage Limit Per User
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {offer.usageLimitPerUser}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Usage Limit
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {offer.totalUsageLimit}
              </p>
            </div>
          </div>
        </div>

        {/* Description & Image Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border">
          <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Description & Image
            </h3>
            <Button
              usage="edit"
              onClick={() => setIsEditDescriptionOpen(true)}>
              Edit
            </Button>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">
                Offer Image
              </label>
              <div className="relative w-full h-64 border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={offer.imageUrl || "/demo-banner.jpg"}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">
                Description
              </label>
              <div
                className="prose dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                dangerouslySetInnerHTML={{ __html: offer.description }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialogs */}
      <EditBasicInfoDialog
        isOpen={isEditBasicOpen}
        onClose={() => setIsEditBasicOpen(false)}
        offer={offer}
        onSave={handleUpdateBasicInfo}
      />
      <EditDiscountDialog
        isOpen={isEditDiscountOpen}
        onClose={() => setIsEditDiscountOpen(false)}
        offer={offer}
        onSave={handleUpdateDiscount}
      />
      <EditDescriptionDialog
        isOpen={isEditDescriptionOpen}
        onClose={() => setIsEditDescriptionOpen(false)}
        offer={offer}
        onSave={handleUpdateDescription}
      />
    </>
  );
}
