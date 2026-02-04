"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { FileUploadWithPreview } from "@/components/ui/FileUploadWithPreview";
import { AvailabilitySelector } from "@/components/ui/AvailabilitySelector";

// Mock data for dropdowns
const CATEGORIES = [
  "Soda",
  "Food",
  "Burger",
  "Sweets",
  "Ice cream",
  "Juice",
  "Pizza",
  "Rice",
];

const FOOD_TYPES = [
  "Italian",
  "Chinese",
  "Indian",
  "Mexican",
  "Japanese",
  "American",
  "Mediterranean",
  "Ethiopian",
  "Mixed",
];

const MERCHANTS = [
  { id: "1", name: "Restaurant Owner 1" },
  { id: "2", name: "Restaurant Owner 2" },
  { id: "3", name: "Restaurant Owner 3" },
  { id: "4", name: "Restaurant Owner 4" },
  { id: "5", name: "Restaurant Owner 5" },
];

export function CreateRestaurantForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    restaurantName: "",
    category: "",
    foodType: "",
    location: "",
    description: "",
    pricePerPerson: "",
    deliveryFee: "",
    maxDeliveryDistance: "",
    platformFeePercentage: "",
    merchantId: "",
  });

  const [restaurantImage, setRestaurantImage] = useState<File | null>(null);
  const [foodImages, setFoodImages] = useState<File[]>([]);
  const [availability, setAvailability] = useState<
    Record<string, { enabled: boolean; openTime: string; closeTime: string }>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form Data:", {
      ...formData,
      restaurantImage,
      foodImages,
      availability,
    });

    toast.success("Restaurant created successfully!");
    setIsSubmitting(false);
    router.push("/restaurants");
  };

  const handleRestaurantImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setRestaurantImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-8">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="restaurantName">
                Restaurant Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="restaurantName"
                type="text"
                required
                value={formData.restaurantName}
                onChange={(e) =>
                  setFormData({ ...formData, restaurantName: e.target.value })
                }
                placeholder="e.g., Golden Palace Restaurant"
              />
            </div>

            <div>
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="foodType">
                Food Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.foodType}
                onValueChange={(value) =>
                  setFormData({ ...formData, foodType: value })
                }>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select food type" />
                </SelectTrigger>
                <SelectContent>
                  {FOOD_TYPES.map((type) => (
                    <SelectItem
                      key={type}
                      value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Restaurant Details
          </h3>
          <div className="space-y-5">
            <div>
              <Label>
                Description <span className="text-red-500">*</span>
              </Label>
              <RichTextEditor
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="pricePerPerson">Price Per Person (AFN)</Label>
                <Input
                  id="pricePerPerson"
                  type="number"
                  step={0.01}
                  value={formData.pricePerPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerPerson: e.target.value })
                  }
                  placeholder="e.g., 250.00"
                />
              </div>

              <div>
                <Label htmlFor="deliveryFee">Delivery Fee (AFN)</Label>
                <Input
                  id="deliveryFee"
                  type="number"
                  step={0.01}
                  value={formData.deliveryFee}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryFee: e.target.value })
                  }
                  placeholder="e.g., 2.50 for AFN 2.50"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Fixed delivery fee for this restaurant. Leave empty to use
                  dynamic pricing based on distance.
                </p>
              </div>

              <div>
                <Label htmlFor="maxDeliveryDistance">
                  Max Delivery Distance (KM)
                </Label>
                <Input
                  id="maxDeliveryDistance"
                  type="number"
                  step={0.1}
                  value={formData.maxDeliveryDistance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxDeliveryDistance: e.target.value,
                    })
                  }
                  placeholder="e.g., 5 for 5 KM"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Maximum delivery radius in kilometers. Leave empty to use
                  default settings.
                </p>
              </div>

              <div>
                <Label htmlFor="platformFeePercentage">
                  Platform Fee Percentage
                </Label>
                <Input
                  id="platformFeePercentage"
                  type="number"
                  step={0.1}
                  value={formData.platformFeePercentage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      platformFeePercentage: e.target.value,
                    })
                  }
                  placeholder="e.g., 15.0 for 15%"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Images
          </h3>
          <div className="space-y-5">
            <div>
              <Label htmlFor="restaurantImage">Restaurant Image</Label>
              <Input
                id="restaurantImage"
                type="file"
                accept="image/*"
                onChange={handleRestaurantImageChange}
              />
              {restaurantImage && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Selected: {restaurantImage.name}
                </p>
              )}
            </div>

            <div>
              <Label>Add Food Images</Label>
              <FileUploadWithPreview
                value={foodImages}
                onChange={setFoodImages}
                maxFiles={10}
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Set Availability
          </h3>
          <AvailabilitySelector
            value={availability}
            onChange={setAvailability}
          />
        </div>

        {/* Merchant Assignment */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Restaurant Owner
          </h3>
          <div>
            <Label htmlFor="merchantId">
              Restaurant Owner ID <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.merchantId}
              onValueChange={(value) =>
                setFormData({ ...formData, merchantId: value })
              }>
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="Select restaurant owner" />
              </SelectTrigger>
              <SelectContent>
                {MERCHANTS.map((merchant) => (
                  <SelectItem
                    key={merchant.id}
                    value={merchant.id}>
                    {merchant.name} (ID: {merchant.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Restaurant Location
          </h3>
          <div className="space-y-5">
            <div>
              <Label htmlFor="location">
                Select Restaurant Location{" "}
                <span className="text-red-500">*</span>
              </Label>

              <div className="mt-3 py-28 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  📍 Map will be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/restaurants")}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Restaurant"}
          </Button>
        </div>
      </div>
    </form>
  );
}
