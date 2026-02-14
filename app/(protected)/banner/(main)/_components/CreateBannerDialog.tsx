"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useCreateBanner } from "@/hooks/useBanners";
import { useRestaurants } from "@/hooks/useRestaurants";

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "archive", label: "Archive" },
];

export function CreateBannerDialog() {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    restaurantId: "",
    status: "pending",
    bannerImage: null as File | null,
  });

  // Fetch restaurants for dropdown
  const { data: restaurants, isLoading: isLoadingRestaurants } = useRestaurants(
    {
      page: 0,
      size: 100,
      status: "approved",
    },
  );

  // Create banner mutation
  const createBanner = useCreateBanner();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.bannerImage) {
      toast.error("Please select a banner image");
      return;
    }

    if (!formData.restaurantId) {
      toast.error("Please select a restaurant");
      return;
    }

    // Create FormData for multipart/form-data request
    const apiFormData = new FormData();
    apiFormData.append("bannerImage", formData.bannerImage);

    try {
      await createBanner.mutateAsync({
        restaurantId: parseInt(formData.restaurantId),
        formData: apiFormData,
      });

      // Close dialog and reset form on success
      setOpen(false);
      setFormData({
        name: "",
        restaurantId: "",
        status: "pending",
        bannerImage: null,
      });
      setImagePreview(null);
    } catch (error) {
      // Error is handled by the mutation hook
      console.error("Failed to create banner:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, bannerImage: file });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, bannerImage: null });
    setImagePreview(null);
  };

  return (
    <>
      <Button
        usage="create"
        onClick={() => setOpen(true)}>
        Create Banner
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create New Banner"
        hideTitle={true}
        className="max-w-[100px] m-1">
        <div className="no-scrollbar relative border w-full lg:w-[650px] overflow-y-auto rou  nded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Create New Banner
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Fill the form to create a new promotional banner.
            </p>
          </div>

          <form
            className="flex flex-col w-full"
            onSubmit={handleSubmit}>
            <div className="custom-scrollbar h-[500px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Banner Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  {/* Banner Name */}
                  <div>
                    <Label htmlFor="bannerName">
                      Banner Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bannerName"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Summer Special Offer"
                    />
                  </div>

                  {/* Restaurant */}
                  <div>
                    <Label htmlFor="restaurant">
                      Restaurant <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      required
                      value={formData.restaurantId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, restaurantId: value })
                      }>
                      <SelectTrigger className="w-full h-11">
                        <SelectValue
                          placeholder={
                            isLoadingRestaurants
                              ? "Loading restaurants..."
                              : "Select a restaurant"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {restaurants.map((restaurant) => (
                          <SelectItem
                            key={restaurant.id}
                            value={restaurant.id.toString()}>
                            {restaurant.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status */}
                  <div>
                    <Label htmlFor="status">
                      Status <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      required
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value })
                      }>
                      <SelectTrigger className="w-full h-11">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Banner Image */}
                  <div>
                    <Label htmlFor="bannerImage">
                      Banner Image <span className="text-red-500">*</span>
                    </Label>

                    {!imagePreview ? (
                      <div className="mt-2">
                        <label
                          htmlFor="bannerImage"
                          className="cursor-pointer flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary dark:hover:border-primary transition-colors bg-gray-50 dark:bg-gray-800/50">
                          <Upload className="w-10 h-10 text-gray-400 mb-3" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Click to upload banner image
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            PNG, JPG, WEBP (recommended: 1200x400px)
                          </span>
                        </label>
                        <input
                          id="bannerImage"
                          type="file"
                          accept="image/*"
                          required
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="mt-2 relative">
                        <div className="relative w-full aspect-8/5 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                          <Image
                            src={imagePreview}
                            alt="Banner preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg">
                          <X className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {formData.bannerImage?.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
                disabled={createBanner.isPending}>
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={createBanner.isPending}>
                {createBanner.isPending ? "Creating..." : "Create Banner"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
