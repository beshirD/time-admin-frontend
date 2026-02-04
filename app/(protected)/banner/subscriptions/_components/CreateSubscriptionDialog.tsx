"use client";

import { useState } from "react";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for dropdowns
const restaurants = [
  { id: 1, name: "Ahlan Gourmet" },
  { id: 2, name: "Spice Garden" },
  { id: 3, name: "Ocean Breeze" },
  { id: 4, name: "Mountain View Cafe" },
  { id: 5, name: "Urban Kitchen" },
];

const packages = [
  { id: 1, name: "Basic Package - 1 Month" },
  { id: 2, name: "Standard Package - 3 Months" },
  { id: 3, name: "Premium Package - 6 Months" },
  { id: 4, name: "Enterprise Package - 12 Months" },
];

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
    restaurant: resturant || "",
    package: "",
    adminNote: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Subscription created successfully");
    setOpen(false);
    // Reset form
    setFormData({
      restaurant: isExtend ? resturant || "" : "",
      package: "",
      adminNote: "",
    });
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
                      value={formData.restaurant}
                      onValueChange={(value) =>
                        setFormData({ ...formData, restaurant: value })
                      }
                      required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a restaurant" />
                      </SelectTrigger>
                      <SelectContent>
                        {restaurants.map((restaurant) => (
                          <SelectItem
                            key={restaurant.id}
                            value={restaurant.name}>
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
                      value={formData.package}
                      onValueChange={(value) =>
                        setFormData({ ...formData, package: value })
                      }
                      required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem
                            key={pkg.id}
                            value={pkg.name}>
                            {pkg.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Admin Note */}
                  <div>
                    <Label htmlFor="adminNote">Admin Note</Label>
                    <Textarea
                      id="adminNote"
                      rows={4}
                      value={formData.adminNote}
                      onChange={(e) =>
                        setFormData({ ...formData, adminNote: e.target.value })
                      }
                      placeholder="Enter any notes or comments about this subscription..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit">
                {isExtend ? "Extend Subscription" : "Create Subscription"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
