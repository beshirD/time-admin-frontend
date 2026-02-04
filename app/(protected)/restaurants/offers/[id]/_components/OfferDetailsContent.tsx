"use client";

import { useState } from "react";
import { RestaurantOffer } from "@/types/entities";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/common/PageTitle";
import Image from "next/image";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { EditBasicInfoDialog } from "./EditBasicInfoDialog";
import { EditDiscountDialog } from "./EditDiscountDialog";
import { EditDescriptionDialog } from "./EditDescriptionDialog";

interface OfferDetailsContentProps {
  offer: RestaurantOffer;
}

export function OfferDetailsContent({ offer }: OfferDetailsContentProps) {
  const router = useRouter();
  const [isEditBasicOpen, setIsEditBasicOpen] = useState(false);
  const [isEditDiscountOpen, setIsEditDiscountOpen] = useState(false);
  const [isEditDescriptionOpen, setIsEditDescriptionOpen] = useState(false);

  const handleUpdateBasicInfo = (data: { title: string; code: string }) => {
    console.log("Updating basic info:", data);
    // TODO: Implement API call
  };

  const handleUpdateDiscount = (data: {
    discountType: "amount" | "percentage";
    discount: number;
    minimumAmount?: number;
    endTime: string;
  }) => {
    console.log("Updating discount:", data);
    // TODO: Implement API call
  };

  const handleUpdateDescription = (data: {
    description: string;
    image?: string;
  }) => {
    console.log("Updating description:", data);
    // TODO: Implement API call
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
              onSuccess={() => {
                router.push("/restaurants/offers");
              }}
              trigger={
                <button
                  suppressHydrationWarning
                  className="px-3 py-1.5 text-sm font-medium border-red-700 border-2 text-red-500 bg-red-600/10 rounded-md transition-colors flex items-center gap-2">
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
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
            <button
              onClick={() => setIsEditBasicOpen(true)}
              className="px-3 py-1.5 text-sm font-medium border-primary border-2 text-primary bg-primary/10 rounded-md transition-colors flex items-center gap-2">
              <Pencil className="h-3 w-3" />
              Edit
            </button>
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
                Title
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {offer.title}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Code
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90 font-mono">
                {offer.code}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Discount Type
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90 capitalize">
                {offer.discountType === "amount"
                  ? "Amount (AFN)"
                  : "Percentage (%)"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Discount
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90 font-semibold">
                {offer.discountType === "amount"
                  ? `${offer.discount} AFN`
                  : `${offer.discount}%`}
              </p>
            </div>
            {offer.minimumAmount && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Minimum Amount
                </label>
                <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                  {offer.minimumAmount} AFN
                </p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                End Time
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {new Date(offer.endTime).toLocaleDateString()}
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
            <button
              onClick={() => setIsEditDescriptionOpen(true)}
              className="px-3 py-1.5 text-sm font-medium border-primary border-2 text-primary bg-primary/10 rounded-md transition-colors flex items-center gap-2">
              <Pencil className="h-3 w-3" />
              Edit
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">
                Offer Image
              </label>
              <div className="relative w-full h-64 border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={offer.image || "/demo-banner.jpg"}
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
