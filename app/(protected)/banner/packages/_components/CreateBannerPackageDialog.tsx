"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";
import { useCreateBannerPackage } from "@/hooks/useBannerPackages";

export function CreateBannerPackageDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    durationDays: "",
    price: "",
    maxBanners: "",
  });

  const createPackage = useCreateBannerPackage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.title ||
      !formData.description ||
      !formData.durationDays ||
      !formData.price ||
      !formData.maxBanners
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createPackage.mutateAsync({
        title: formData.title,
        description: formData.description,
        durationDays: parseInt(formData.durationDays),
        price: parseFloat(formData.price),
        maxBanners: parseInt(formData.maxBanners),
      });

      // Close dialog and reset form on success
      setOpen(false);
      setFormData({
        title: "",
        description: "",
        durationDays: "",
        price: "",
        maxBanners: "",
      });
    } catch (error) {
      // Error is handled by the mutation hook
      console.error("Failed to create banner package:", error);
    }
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
                    <Label htmlFor="title">
                      Package Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
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
                      <Label htmlFor="durationDays">
                        Duration (Days) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="durationDays"
                        type="number"
                        required
                        min="1"
                        value={formData.durationDays}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            durationDays: e.target.value,
                          })
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
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="99.99"
                      />
                    </div>
                  </div>

                  {/* Max Banners */}
                  <div>
                    <Label htmlFor="maxBanners">
                      Max Banners <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="maxBanners"
                      type="number"
                      required
                      min="1"
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
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
                disabled={createPackage.isPending}>
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={createPackage.isPending}>
                {createPackage.isPending ? "Creating..." : "Create Package"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
