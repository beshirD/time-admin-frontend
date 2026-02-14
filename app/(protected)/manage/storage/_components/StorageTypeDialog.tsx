"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { toast } from "sonner";
import { StorageType } from "@/types/entities";

interface StorageTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type?: StorageType | null;
  onSuccess?: () => void;
}

export function StorageTypeDialog({
  isOpen,
  onClose,
  type,
  onSuccess,
}: StorageTypeDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (type) {
      setFormData({
        title: type.title,
        description: type.description || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
      });
    }
  }, [type, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.success(
      type
        ? "Storage type updated successfully"
        : "Storage type created successfully",
    );
    handleClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[600px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[780px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {type ? "Edit Storage Type" : "Create Storage Type"}
          </h4>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3 space-y-5">
            {/* Title */}
            <div>
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter type title"
              />
            </div>

            {/* Description - Rich Textarea */}
            <div>
              <Label htmlFor="description">Description</Label>
              <RichTextEditor
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
                placeholder="Enter type description"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Supports rich text formatting
              </p>
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
              {type ? "Update Type" : "Create Type"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
