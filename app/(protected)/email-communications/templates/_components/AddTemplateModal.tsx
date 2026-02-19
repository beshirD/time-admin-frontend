"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { cn } from "@/lib/utils";
import type { EmailTemplate, TemplateStatus } from "@/types/entities";

interface AddTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<EmailTemplate, "id" | "createdOn" | "createdBy" | "type">,
  ) => void;
  editData?: EmailTemplate | null;
}

export function AddTemplateModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
}: AddTemplateModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    state: "Active" as TemplateStatus,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title,
        description: editData.description,
        state: editData.state,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        state: "Active",
      });
    }
  }, [editData, isOpen]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title cannot be blank.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description cannot be blank.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error saving template:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        title: "",
        description: "",
        state: "Active",
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[800px] m-4">
      <div className="relative border w-[800px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 no-scrollbar">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {editData ? "Edit Template" : "Add New Template"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {editData
              ? "Update template details"
              : "Create a new email template"}
          </p>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[500px] overflow-y-auto px-2 pb-3">
            <div className="grid grid-cols-1 gap-y-5">
              {/* Title */}
              <div>
                <Label>
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter template title"
                  className={cn(errors.title && "border-red-500")}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Description - Rich Text Editor */}
              <div>
                <Label>
                  Description <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2">
                  <RichTextEditor
                    value={formData.description}
                    onChange={(value) => handleChange("description", value)}
                    placeholder="Enter template description..."
                  />
                </div>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <Label>Status</Label>
                <select
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="Active">Active</option>
                  <option value="New">New</option>
                  <option value="Deleted">Deleted</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClose}
              type="button"
              disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : editData
                  ? "Update Template"
                  : "Add Template"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
