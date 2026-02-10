"use client";

import { useState, useEffect } from "react";
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
import { api } from "@/services/api";

export function CreateRestaurantForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<{ id: number; title: string }[]>(
    [],
  );
  const [cuisines, setCuisines] = useState<{ id: number; title: string }[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    cuisine: "",
    addressLine: "",
    latitude: "",
    longitude: "",
    contactNumber: "",
    website: "",
    description: "",
    averagePrice: "",
    deliveryFee: "",
    deliveryDistanceKm: "",
    platformFeePercentage: "",
    ownerId: "",
  });

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [availability, setAvailability] = useState<
    Record<string, { enabled: boolean; openTime: string; closeTime: string }>
  >({});

  // Fetch categories and cuisines on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await api.get(
          "/api/v1/restaurant-categories",
          {
            params: {
              page: 0,
              size: 100,
              sortBy: "id",
              direction: "DESC",
            },
          },
        );
        setCategories(categoriesResponse.data.content || []);

        // Fetch cuisines
        const cuisinesResponse = await api.get("/api/v1/cuisines");
        setCuisines(cuisinesResponse.data || []);
      } catch (error) {
        console.error("Error fetching form data:", error);
        toast.error("Failed to load form data");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the data object
      const data = {
        name: formData.name,
        categoryId: parseInt(formData.categoryId),
        cuisine: formData.cuisine,
        addressLine: formData.addressLine,
        latitude: parseFloat(formData.latitude) || 0,
        longitude: parseFloat(formData.longitude) || 0,
        contactNumber: formData.contactNumber,
        website: formData.website,
        description: formData.description,
        averagePrice: parseFloat(formData.averagePrice) || 0,
        deliveryFee: parseFloat(formData.deliveryFee) || 0,
        deliveryDistanceKm: parseFloat(formData.deliveryDistanceKm) || 0,
        platformFeePercentage: parseFloat(formData.platformFeePercentage) || 0,
        ownerId: parseInt(formData.ownerId),
        openingHours: Object.entries(availability)
          .filter(([_, value]) => value.enabled)
          .map(([day, value]) => ({
            dayOfWeek: getDayNumber(day),
            openTime: value.openTime,
            closeTime: value.closeTime,
            status: "active" as const,
          })),
      };

      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();

      // Add the data object as JSON
      formDataToSend.append("data", JSON.stringify(data));

      // Add files
      if (featuredImage) {
        formDataToSend.append("featuredImage", featuredImage);
      }

      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      if (businessLicense) {
        formDataToSend.append("businessLicense", businessLicense);
      }

      // Make API call
      await api.post("/api/v1/restaurants", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Restaurant created successfully!");
      router.push("/restaurants");
    } catch (error: any) {
      console.error("Error creating restaurant:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create restaurant",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDayNumber = (day: string): number => {
    const days: Record<string, number> = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 0,
    };
    return days[day.toLowerCase()] || 0;
  };

  const handleFeaturedImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImage(e.target.files[0]);
    }
  };

  const handleBusinessLicenseChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setBusinessLicense(e.target.files[0]);
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
              <Label htmlFor="name">
                Restaurant Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Golden Palace Restaurant"
              />
            </div>

            <div>
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={cat.id.toString()}>
                      {cat.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cuisine">
                Cuisine <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.cuisine}
                onValueChange={(value) =>
                  setFormData({ ...formData, cuisine: value })
                }>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select cuisine" />
                </SelectTrigger>
                <SelectContent>
                  {cuisines.map((cuisine) => (
                    <SelectItem
                      key={cuisine.id}
                      value={cuisine.title}>
                      {cuisine.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ownerId">
                Owner ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="ownerId"
                type="number"
                required
                value={formData.ownerId}
                onChange={(e) =>
                  setFormData({ ...formData, ownerId: e.target.value })
                }
                placeholder="Enter owner ID"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
                placeholder="e.g., +251912345678"
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="e.g., https://example.com"
              />
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
                <Label htmlFor="averagePrice">Average Price ($)</Label>
                <Input
                  id="averagePrice"
                  type="number"
                  step={0.01}
                  value={formData.averagePrice}
                  onChange={(e) =>
                    setFormData({ ...formData, averagePrice: e.target.value })
                  }
                  placeholder="e.g., 15.00"
                />
              </div>

              <div>
                <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
                <Input
                  id="deliveryFee"
                  type="number"
                  step={0.01}
                  value={formData.deliveryFee}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryFee: e.target.value })
                  }
                  placeholder="e.g., 2.50"
                />
              </div>

              <div>
                <Label htmlFor="deliveryDistanceKm">
                  Max Delivery Distance (KM)
                </Label>
                <Input
                  id="deliveryDistanceKm"
                  type="number"
                  step={0.1}
                  value={formData.deliveryDistanceKm}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deliveryDistanceKm: e.target.value,
                    })
                  }
                  placeholder="e.g., 5"
                />
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
                  placeholder="e.g., 15.0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Restaurant Location
          </h3>
          <div className="space-y-5">
            <div>
              <Label htmlFor="addressLine">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="addressLine"
                type="text"
                required
                value={formData.addressLine}
                onChange={(e) =>
                  setFormData({ ...formData, addressLine: e.target.value })
                }
                placeholder="e.g., Bole, Addis Ababa, Ethiopia"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) =>
                    setFormData({ ...formData, latitude: e.target.value })
                  }
                  placeholder="e.g., 9.0320"
                />
              </div>

              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) =>
                    setFormData({ ...formData, longitude: e.target.value })
                  }
                  placeholder="e.g., 38.7469"
                />
              </div>
            </div>

            <div className="py-28 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                📍 Map integration coming soon
              </p>
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
              <Label htmlFor="featuredImage">
                Featured Image <span className="text-red-500">*</span>
              </Label>
              <Input
                id="featuredImage"
                type="file"
                accept="image/*"
                required
                onChange={handleFeaturedImageChange}
              />
              {featuredImage && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Selected: {featuredImage.name}
                </p>
              )}
            </div>

            <div>
              <Label>Additional Images</Label>
              <FileUploadWithPreview
                value={images}
                onChange={setImages}
                maxFiles={10}
              />
            </div>

            <div>
              <Label htmlFor="businessLicense">
                Business License <span className="text-red-500">*</span>
              </Label>
              <Input
                id="businessLicense"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onChange={handleBusinessLicenseChange}
              />
              {businessLicense && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Selected: {businessLicense.name}
                </p>
              )}
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
