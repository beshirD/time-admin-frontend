"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { RestaurantOffer } from "@/types/entities";

interface EditBasicInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  offer: RestaurantOffer;
  onSave: (data: { title: string; code: string }) => void;
}

export function EditBasicInfoDialog({
  isOpen,
  onClose,
  offer,
  onSave,
}: EditBasicInfoDialogProps) {
  const [title, setTitle] = useState(offer.title);
  const [code, setCode] = useState(offer.code);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, code });
    onClose();
  };

  const handleClose = () => {
    setTitle(offer.title);
    setCode(offer.code);
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
            Edit Basic Information
          </h4>
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
                placeholder="Enter offer title"
              />
            </div>

            <div>
              <Label htmlFor="code">
                Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter offer code"
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
              Update
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
