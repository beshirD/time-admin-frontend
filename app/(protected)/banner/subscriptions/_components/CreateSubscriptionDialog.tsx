"use client";

import { useState } from "react";
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
import { useCreateSubscription } from "@/hooks/useSubscriptions";
import { useRestaurants } from "@/hooks/useRestaurants";
import { useBannerPackages } from "@/hooks/useBannerPackages";

export function CreateSubscriptionDialog({
  title,
  isExtend,
  resturant,
}: {
  title: string;
  isExtend: boolean;
  resturant?: string;
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    restaurantId: "",
    packageId: "",
  });

  const createSubscription = useCreateSubscription();
  const { data: restaurants, isLoading: loadingRestaurants } = useRestaurants();
  const { packages, isLoading: loadingPackages } = useBannerPackages();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.restaurantId || !formData.packageId) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createSubscription.mutateAsync({
        restaurantId: parseInt(formData.restaurantId),
        packageId: parseInt(formData.packageId),
      });

      // Close dialog and reset form on success
      setOpen(false);
      setFormData({
        restaurantId: "",
        packageId: "",
      });
    } catch (error) {
      // Error is handled by the mutation hook
      console.error("Failed to create subscription:", error);
    }
  };

  return (
    <>
      <Button
        usage="create"
        onClick={() => setOpen(true)}>
        {title}
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create New Subscription"
        hideTitle={true}
        className="max-w-[700px]">
        <div className="no-scrollbar border relative w-full min-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-6">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {isExtend ? "Extend Subscription" : "Create New Subscription"}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg: ">
              Fill the form to {isExtend ? "extend" : "create"} a new
              subscription for a restaurant.
            </p>
          </div>

          <form
            className="flex flex-col"
            onSubmit={handleSubmit}>
            <div className="custom-scrollbar w-full h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Subscription Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  {/* Restaurant */}
                  <div>
                    <Label htmlFor="restaurant">
                      Restaurant <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.restaurantId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, restaurantId: value })
                      }
                      required
                      disabled={loadingRestaurants}>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            loadingRestaurants
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

                  {/* Package */}
                  <div>
                    <Label htmlFor="package">
                      Package <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.packageId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, packageId: value })
                      }
                      required
                      disabled={loadingPackages}>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            loadingPackages
                              ? "Loading packages..."
                              : "Select a package"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem
                            key={pkg.id}
                            value={pkg.id.toString()}>
                            {pkg.title} - {pkg.durationDays} days (${pkg.price})
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
                type="button"
                onClick={() => setOpen(false)}
                disabled={createSubscription.isPending}>
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={createSubscription.isPending}>
                {createSubscription.isPending
                  ? "Creating..."
                  : isExtend
                    ? "Extend Subscription"
                    : "Create Subscription"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
