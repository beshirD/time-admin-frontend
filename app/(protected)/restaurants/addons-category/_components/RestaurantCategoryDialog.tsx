"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { FoodCategory } from "@/types/entities";
import { Upload } from "lucide-react";
import Image from "next/image";

interface RestaurantCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category?: FoodCategory | null;
  onSave: (data: { title: string; image?: File }) => void;
  mode: "create" | "edit" | "view";
}

export function RestaurantCategoryDialog({
  isOpen,
  onClose,
  category,
  onSave,
  mode,
}: RestaurantCategoryDialogProps) {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      if (category.image) {
        setImagePreview(category.image);
      }
    } else {
      setTitle("");
      setImageFile(null);
      setImagePreview("");
    }
  }, [category, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({
        title: title.trim(),
        image: imageFile || undefined,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setImageFile(null);
    setImagePreview("");
    onClose();
  };

  const isViewMode = mode === "view";

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[100px] m-1">
      <div className="no-scrollbar relative border w-full lg:w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {mode === "view"
              ? "Restaurant Category Details"
              : mode === "edit"
                ? "Edit Restaurant Category"
                : "Create Restaurant Category"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {mode === "view"
              ? "View the restaurant category details below."
              : mode === "edit"
                ? "Update the restaurant category information below."
                : "Fill the form to create a new restaurant category."}
          </p>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3 space-y-4">
            {/* Title */}
            <div>
              <Label htmlFor="title">
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Pizza, Burgers, Desserts"
                disabled={isViewMode}
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image">
                Image{" "}
                {!isViewMode && (
                  <span className="text-gray-500 text-xs">(Optional)</span>
                )}
              </Label>
              {!isViewMode && (
                <div className="mt-2">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or JPEG
                        </p>
                      </div>
                    )}
                    <input
                      id="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              )}
              {isViewMode && imagePreview && (
                <div className="mt-2 relative w-full h-32 border rounded-lg overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt={title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              {isViewMode && !imagePreview && (
                <p className="mt-2 text-sm text-gray-500">No image uploaded</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={handleClose}>
              {isViewMode ? "Close" : "Cancel"}
            </Button>
            {!isViewMode && (
              <Button
                size="sm"
                type="submit">
                {mode === "edit" ? "Update Category" : "Create Category"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
