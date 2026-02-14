"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Page, PageType } from "@/types/entities";

interface EditPageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  page: Page | null;
  onSuccess?: () => void;
}

// Mock page types
const mockPageTypes: PageType[] = [
  { id: 1, name: "About Us" },
  { id: 2, name: "Privacy" },
  { id: 3, name: "Term & Conditions" },
  { id: 4, name: "Refund Policy" },
];

export function EditPageDialog({
  isOpen,
  onClose,
  page,
  onSuccess,
}: EditPageDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    newType: "",
  });
  const [showNewTypeInput, setShowNewTypeInput] = useState(false);

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title,
        description: page.description,
        type: page.type,
        newType: "",
      });
      setShowNewTypeInput(false);
    }
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // For now, just show success toast
    toast.success("Page updated successfully");
    handleClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      type: "",
      newType: "",
    });
    setShowNewTypeInput(false);
    onClose();
  };

  const handleTypeChange = (value: string) => {
    if (value === "new") {
      setShowNewTypeInput(true);
      setFormData({ ...formData, type: "", newType: "" });
    } else {
      setShowNewTypeInput(false);
      setFormData({ ...formData, type: value, newType: "" });
    }
  };

  if (!page) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[900px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[900px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Page
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Update page information.
          </p>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[600px] overflow-y-auto px-2 pb-3">
            <div className="space-y-6">
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
                  placeholder="Enter page title"
                />
              </div>

              {/* Description - Rich Text Editor */}
              <div>
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2">
                  <RichTextEditor
                    value={formData.description}
                    onChange={(value) =>
                      setFormData({ ...formData, description: value })
                    }
                    placeholder="Enter page description..."
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <Label htmlFor="type">
                  Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  required={!showNewTypeInput}
                  value={formData.type}
                  onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Select page type" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPageTypes.map((type) => (
                      <SelectItem
                        key={type.id}
                        value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ Add New Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* New Type Input */}
              {showNewTypeInput && (
                <div>
                  <Label htmlFor="newType">
                    New Category Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="newType"
                    type="text"
                    required
                    value={formData.newType}
                    onChange={(e) =>
                      setFormData({ ...formData, newType: e.target.value })
                    }
                    placeholder="Enter new category name"
                  />
                </div>
              )}
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
              Update Page
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
