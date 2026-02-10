"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Upload, X } from "lucide-react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useCreateMenuItem } from "@/hooks/useCreateMenuItem";

interface CreateMenuItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMenuItemDialog({
  isOpen,
  onClose,
}: CreateMenuItemDialogProps) {
  const params = useParams();
  const restaurantId = params.id as string;
  const createMenuItem = useCreateMenuItem();

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    itemType: "VEG" as "VEG" | "NON_VEG" | "VEGAN",
    basePrice: "",
    platformFeePercentage: "",
    availabilityStartTime: "",
    availabilityEndTime: "",
    cookTimeMins: "",
    stock: "",
    isAvailable: true,
    images: [] as File[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      restaurantId: parseInt(restaurantId),
      title: formData.title,
      description: formData.description,
      categoryId: parseInt(formData.categoryId),
      itemType: formData.itemType,
      basePrice: parseFloat(formData.basePrice),
      platformFeePercentage: parseFloat(formData.platformFeePercentage),
      availabilityStartTime: formData.availabilityStartTime,
      availabilityEndTime: formData.availabilityEndTime,
      cookTimeMins: parseInt(formData.cookTimeMins),
      stock: parseInt(formData.stock),
      isAvailable: formData.isAvailable,
    };

    const formDataToSend = new FormData();
    formDataToSend.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" }),
      "data.json",
    );

    // Append images
    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    createMenuItem.mutate(formDataToSend, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData({ ...formData, images: [...formData.images, ...filesArray] });

      // Create previews
      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      categoryId: "",
      itemType: "VEG",
      basePrice: "",
      platformFeePercentage: "",
      availabilityStartTime: "",
      availabilityEndTime: "",
      cookTimeMins: "",
      stock: "",
      isAvailable: true,
      images: [],
    });
    setImagePreviews([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[800px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[800px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Create Menu Item
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Add a new item to your restaurant menu.
          </p>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[550px] overflow-y-auto px-2 pb-3">
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                  Basic Information
                </h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="lg:col-span-2">
                    <Label htmlFor="title">
                      Item Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="e.g., Margherita Pizza"
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      className="w-full min-h-[100px] px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe your menu item..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="itemType">
                      Item Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      required
                      value={formData.itemType}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, itemType: value })
                      }>
                      <SelectTrigger className="w-full h-11">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VEG">Vegetarian</SelectItem>
                        <SelectItem value="NON_VEG">Non-Vegetarian</SelectItem>
                        <SelectItem value="VEGAN">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="categoryId">
                      Category ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="categoryId"
                      type="number"
                      required
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({ ...formData, categoryId: e.target.value })
                      }
                      placeholder="Category ID"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div>
                <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                  Pricing & Stock
                </h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="basePrice">
                      Base Price (AFN) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="basePrice"
                      type="number"
                      step="0.01"
                      required
                      value={formData.basePrice}
                      onChange={(e) =>
                        setFormData({ ...formData, basePrice: e.target.value })
                      }
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="platformFeePercentage">
                      Platform Fee (%) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="platformFeePercentage"
                      type="number"
                      step="0.1"
                      required
                      value={formData.platformFeePercentage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          platformFeePercentage: e.target.value,
                        })
                      }
                      placeholder="0.0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">
                      Stock <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cookTimeMins">
                      Cook Time (mins) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cookTimeMins"
                      type="number"
                      required
                      value={formData.cookTimeMins}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cookTimeMins: e.target.value,
                        })
                      }
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                  Availability
                </h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="availabilityStartTime">
                      Start Time <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="availabilityStartTime"
                      type="time"
                      required
                      value={formData.availabilityStartTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availabilityStartTime: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="availabilityEndTime">
                      End Time <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="availabilityEndTime"
                      type="time"
                      required
                      value={formData.availabilityEndTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availabilityEndTime: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isAvailable}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isAvailable: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Item is available
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                  Images
                </h5>
                <div>
                  <Label htmlFor="images">Menu Item Images</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="images"
                      className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary dark:hover:border-primary transition-colors bg-gray-50 dark:bg-gray-800/50">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Click to upload images
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        PNG, JPG, WEBP (Multiple files allowed)
                      </span>
                    </label>
                    <input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative">
                          <div className="relative w-full h-24 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
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
              onClick={handleClose}
              disabled={createMenuItem.isPending}>
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={createMenuItem.isPending}>
              {createMenuItem.isPending ? "Creating..." : "Create Menu Item"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
