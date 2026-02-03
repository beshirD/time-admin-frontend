"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { AddOnCategory } from "@/types/entities";

interface AddOnsCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category?: AddOnCategory | null;
  onSave: (title: string) => void;
}

export function AddOnsCategoryDialog({
  isOpen,
  onClose,
  category,
  onSave,
}: AddOnsCategoryDialogProps) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (category) {
      setTitle(category.title);
    } else {
      setTitle("");
    }
  }, [category, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title.trim());
      setTitle("");
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
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
            {category ? "Edit Add-On Category" : "Create Add-On Category"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {category
              ? "Update the add-on category title below."
              : "Fill the form to create a new add-on category."}
          </p>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3">
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
                placeholder="e.g., Drink, Fresh (fast serve)"
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
              {category ? "Update Category" : "Create Category"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
