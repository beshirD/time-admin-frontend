"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { Cuisine } from "@/types/entities";

interface CuisineDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cuisine?: Cuisine | null;
  onSave: (title: string) => void;
}

export function CuisineDialog({
  isOpen,
  onClose,
  cuisine,
  onSave,
}: CuisineDialogProps) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (cuisine) {
      setTitle(cuisine.title);
    } else {
      setTitle("");
    }
  }, [cuisine, isOpen]);

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
            {cuisine ? "Edit Cuisine" : "Create Cuisine"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {cuisine
              ? "Update the cuisine title below."
              : "Fill the form to create a new cuisine."}
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
                placeholder="e.g., Italian, Chinese, Mexican"
                autoFocus
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
