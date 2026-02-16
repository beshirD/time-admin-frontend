"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import type {
  EmailAccount,
  EmailEncryption,
  EmailAccountType,
} from "@/types/entities";

interface AddEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<EmailAccount, "id" | "createdOn" | "updatedOn" | "createdBy">,
  ) => void;
  editData?: EmailAccount | null;
}

export function AddEmailModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
}: AddEmailModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    email: "",
    password: "",
    server: "",
    port: 465,
    encryption: "SSL" as EmailEncryption,
    limitPerEmail: null as number | null,
    type: "SMTP" as EmailAccountType,
    state: "Active" as "Active" | "Inactive",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title,
        email: editData.email,
        password: editData.password,
        server: editData.server,
        port: editData.port,
        encryption: editData.encryption,
        limitPerEmail: editData.limitPerEmail,
        type: editData.type,
        state: editData.state,
      });
    } else {
      setFormData({
        title: "",
        email: "",
        password: "",
        server: "",
        port: 465,
        encryption: "SSL",
        limitPerEmail: null,
        type: "SMTP",
        state: "Active",
      });
    }
  }, [editData, isOpen]);

  const handleChange = (field: string, value: string | number) => {
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
    if (!formData.email.trim()) {
      newErrors.email = "Email cannot be blank.";
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
      console.error("Error saving email account:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        title: "",
        email: "",
        password: "",
        server: "",
        port: 465,
        encryption: "SSL",
        limitPerEmail: null,
        type: "SMTP",
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
      className="max-w-[700px] m-4">
      <div className="relative border w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 no-scrollbar">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {editData ? "Edit Email Account" : "Add Email Account"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {editData
              ? "Update email account details"
              : "Configure a new email account"}
          </p>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              {/* Title */}
              <div>
                <Label>
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter title"
                  className={cn(errors.title && "border-red-500")}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label>
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter email"
                  className={cn(errors.email && "border-red-500")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter password"
                />
              </div>

              {/* Server */}
              <div>
                <Label>Server</Label>
                <Input
                  type="text"
                  value={formData.server}
                  onChange={(e) => handleChange("server", e.target.value)}
                  placeholder="mail.example.com"
                />
              </div>

              {/* Port */}
              <div>
                <Label>Port</Label>
                <Input
                  type="number"
                  value={formData.port}
                  onChange={(e) =>
                    handleChange("port", parseInt(e.target.value))
                  }
                  placeholder="465"
                />
              </div>

              {/* Encryption */}
              <div>
                <Label>Encryption</Label>
                <select
                  value={formData.encryption}
                  onChange={(e) => handleChange("encryption", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="SSL">SSL</option>
                  <option value="TLS">TLS</option>
                  <option value="None">None</option>
                </select>
              </div>

              {/* Limit Per Email */}
              <div>
                <Label>Limit Per Email</Label>
                <Input
                  type="number"
                  value={formData.limitPerEmail || ""}
                  onChange={(e) =>
                    handleChange(
                      "limitPerEmail",
                      e.target.value ? parseInt(e.target.value) : (null as any),
                    )
                  }
                  placeholder="Optional"
                />
              </div>

              {/* Type */}
              <div>
                <Label>Type</Label>
                <select
                  value={formData.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="SMTP">SMTP</option>
                  <option value="IMAP">IMAP</option>
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
                  ? "Update Account"
                  : "Add Account"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
