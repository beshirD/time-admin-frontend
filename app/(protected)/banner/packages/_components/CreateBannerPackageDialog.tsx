"use client";

import { useState } from "react";
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

export function CreateBannerPackageDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    packageTitle: "",
    description: "",
    duration: "",
    price: "",
    maxBanners: "",
    isPopular: "false",
    status: "Active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Banner Package created successfully");
    setOpen(false);
    // Reset form
    setFormData({
      packageTitle: "",
      description: "",
      duration: "",
      price: "",
      maxBanners: "",
      isPopular: "false",
      status: "Active",
    });
  };

  return (
    <>
      <Button
        usage="create"
        onClick={() => setOpen(true)}>
        Add New Package
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create New Package"
        hideTitle={true}
        className="max-w-[100px] m-1">
        <div className="no-scrollbar relative border w-full lg:w-[650px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Create New Package
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Fill the form to create a new banner package.
            </p>
          </div>

          <form
            className="flex flex-col w-full"
            onSubmit={handleSubmit}>
            <div className="custom-scrollbar h-[500px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Package Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  {/* Package Title */}
                  <div>
                    <Label htmlFor="packageTitle">
                      Package Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="packageTitle"
                      type="text"
                      required
                      value={formData.packageTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          packageTitle: e.target.value,
                        })
                      }
                      placeholder="e.g., Premium Monthly"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <textarea
                      id="description"
                      required
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-500 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/50 dark:focus:border-brand-800"
                      rows={3}
                      placeholder="Package description..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Duration */}
                    <div>
                      <Label htmlFor="duration">
                        Duration (Days) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="duration"
                        type="number"
                        required
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                        placeholder="30"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <Label htmlFor="price">
                        Price <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="99.99"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Max Banners */}
                    <div>
                      <Label htmlFor="maxBanners">
                        Max Banners <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="maxBanners"
                        type="number"
                        required
                        value={formData.maxBanners}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            maxBanners: e.target.value,
                          })
                        }
                        placeholder="5"
                      />
                    </div>

                    {/* Is Popular */}
                    <div>
                      <Label htmlFor="isPopular">Is Popular</Label>
                      <Select
                        value={formData.isPopular}
                        onValueChange={(value) =>
                          setFormData({ ...formData, isPopular: value })
                        }>
                        <SelectTrigger className="w-full h-11">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <Label htmlFor="status">
                      Status <span className="text-red-500">*</span>
                    </Label>
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
                        <SelectItem value="Inactive">Inactive</SelectItem>
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
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit">
                Create Package
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
