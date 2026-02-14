"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CronJobType } from "@/types/entities";

interface TypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type?: CronJobType | null;
  onSuccess?: () => void;
}

export function TypeDialog({
  isOpen,
  onClose,
  type,
  onSuccess,
}: TypeDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    state: "Active",
  });

  useEffect(() => {
    if (type) {
      setFormData({
        name: type.name,
        state: type.state || "Active",
      });
    } else {
      setFormData({
        name: "",
        state: "Active",
      });
    }
  }, [type, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.success(
      type
        ? "Cron job type updated successfully"
        : "Cron job type created successfully",
    );
    handleClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      state: "Active",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[500px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {type ? "Edit Cron Job Type" : "Create New Type"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {type
              ? "Update cron job type information."
              : "Add a new cron job type."}
          </p>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3 space-y-5">
            {/* Title */}
            <div>
              <Label htmlFor="name">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter type title"
              />
            </div>

            {/* State */}
            <div>
              <Label htmlFor="state">
                State <span className="text-red-500">*</span>
              </Label>
              <Select
                required
                value={formData.state}
                onValueChange={(value) =>
                  setFormData({ ...formData, state: value })
                }>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Disabled">Disabled</SelectItem>
                  <SelectItem value="Deleted">Deleted</SelectItem>
                </SelectContent>
              </Select>
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
