"use client";

import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import { FileUploadWithPreview } from "@/components/ui/FileUploadWithPreview";
import Image from "next/image";

interface RestaurantImagesProps {
  restaurantImage: string | null;
  foodImages: string[];
}

export function RestaurantImages({
  restaurantImage,
  foodImages,
}: RestaurantImagesProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRestaurantImage, setSelectedRestaurantImage] = useState<
    File[]
  >([]);
  const [selectedFoodImages, setSelectedFoodImages] = useState<File[]>([]);

  const handleSave = () => {
    console.log("Saving images...", {
      restaurantImage: selectedRestaurantImage,
      foodImages: selectedFoodImages,
    });
    closeModal();
  };

  return (
    <div className="p-5 border rounded-xl bg-white dark:bg-gray-900">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
            Restaurant Images
          </h4>

          {/* Restaurant Main Image */}
          <div className="mb-6">
            <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Restaurant Cover Image
            </p>
            {restaurantImage ? (
              <div className="relative w-full h-[300px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                <Image
                  src={restaurantImage}
                  alt="Restaurant"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-[300px] rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No restaurant image uploaded
                </p>
              </div>
            )}
          </div>

          {/* Food Images */}
          <div>
            <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Food Gallery ({foodImages.length})
            </p>
            {foodImages.length > 0 ? (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {foodImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative shrink-0 w-[150px] h-[100px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <Image
                      src={image}
                      alt={`Food ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-[100px] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No food images uploaded
                </p>
              </div>
            )}
          </div>
        </div>

        <Button
          usage="edit"
          onClick={openModal}
          className="lg:inline-flex lg:w-auto shrink-0">
          Edit Images
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Restaurant Images
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Upload or update restaurant and food images.
            </p>
          </div>
          <form
            className="flex flex-col"
            onSubmit={(e) => e.preventDefault()}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="space-y-6">
                {/* Restaurant Image Upload */}
                <div>
                  <h5 className="mb-3 text-lg font-medium text-gray-800 dark:text-white/90">
                    Restaurant Cover Image
                  </h5>
                  <FileUploadWithPreview
                    value={selectedRestaurantImage}
                    onChange={setSelectedRestaurantImage}
                    maxFiles={1}
                    accept="image/*"
                  />
                </div>

                {/* Food Images Upload */}
                <div>
                  <h5 className="mb-3 text-lg font-medium text-gray-800 dark:text-white/90">
                    Food Gallery
                  </h5>
                  <FileUploadWithPreview
                    value={selectedFoodImages}
                    onChange={setSelectedFoodImages}
                    maxFiles={10}
                    accept="image/*"
                  />
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
