"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { Cuisine } from "@/types/entities";
import { Upload, X } from "lucide-react";

interface CuisineDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cuisine?: Cuisine | null;
  onSave: (formData: FormData) => void;
}

export function CuisineDialog({
  isOpen,
  onClose,
  cuisine,
  onSave,
}: CuisineDialogProps) {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (cuisine) {
      setTitle(cuisine.title);
      setImagePreview(cuisine.image || "");
      setImageFile(null);
    } else {
      setTitle("");
      setImagePreview("");
      setImageFile(null);
    }
  }, [cuisine, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(cuisine?.image || "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const formData = new FormData();

      // Create the data object
      const data = {
        title: title.trim(),
        status: cuisine?.status || "active",
      };

      // Append data as JSON blob with filename
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" }),
        "data.json",
      );

      // Append image if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      onSave(formData);
      setTitle("");
      setImageFile(null);
      setImagePreview("");
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setImageFile(null);
    setImagePreview("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[100px] m-1">
      <div className="no-scrollbar relative border w-full lg:w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {cuisine ? "Edit Cuisine" : "Create Cuisine"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {cuisine
              ? "Update the cuisine details below."
              : "Fill the form to create a new cuisine."}
          </p>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3 space-y-4">
            <div>
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Italian, Chinese, Mexican"
                autoFocus
              />
            </div>

            <div>
              <Label htmlFor="image">
                Cuisine Image{" "}
                {!cuisine && <span className="text-red-500">*</span>}
              </Label>

              {imagePreview ? (
                <div className="mt-2 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="mt-2 flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </label>
              )}

              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required={!cuisine && !imageFile}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit">
              {cuisine ? "Update Cuisine" : "Create Cuisine"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
