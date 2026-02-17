"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { cn } from "@/lib/utils";

interface UnsubscribeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  editData?: { email: string } | null;
}

export function UnsubscribeEmailModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
}: UnsubscribeEmailModalProps) {
  const [email, setEmail] = useState(editData?.email || "");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    onSubmit(email);
    setEmail("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setEmail(editData?.email || "");
    setError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[500px] m-4">
      <div className="relative border w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 no-scrollbar">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {editData ? "Edit Email" : "Unsubscribe Email"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {editData
              ? "Update the email address"
              : "Add an email to the unsubscribe list"}
          </p>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3">
            <div className="grid grid-cols-1 gap-y-5">
              <div>
                <Label>
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter email address"
                  className={cn(error && "border-red-500 focus:ring-red-500")}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClose}
              type="button">
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit">
              {editData ? "Update" : "Unsubscribe"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
