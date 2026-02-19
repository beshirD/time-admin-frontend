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
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { toast } from "sonner";
import { StorageProvider } from "@/types/entities";

interface ProviderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  provider?: StorageProvider | null;
  onSuccess?: () => void;
}

export function ProviderDialog({
  isOpen,
  onClose,
  provider,
  onSuccess,
}: ProviderDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    key: "",
    secret: "",
    endpoint: "",
    type: "",
    description: "",
  });

  useEffect(() => {
    if (provider) {
      setFormData({
        title: provider.title,
        key: provider.key,
        secret: provider.secret,
        endpoint: provider.endpoint,
        type: provider.type,
        description: provider.description || "",
      });
    } else {
      setFormData({
        title: "",
        key: "",
        secret: "",
        endpoint: "",
        type: "",
        description: "",
      });
    }
  }, [provider, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.success(
      provider
        ? "Storage provider updated successfully"
        : "Storage provider created successfully",
    );
    handleClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      key: "",
      secret: "",
      endpoint: "",
      type: "",
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
            {provider ? "Edit Storage Provider" : "Create Storage Provider"}
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
                placeholder="Enter provider title"
              />
            </div>

            {/* Key */}
            <div>
              <Label htmlFor="key">
                Key <span className="text-red-500">*</span>
              </Label>
              <Input
                id="key"
                type="text"
                required
                value={formData.key}
                onChange={(e) =>
                  setFormData({ ...formData, key: e.target.value })
                }
                placeholder="Enter access key"
              />
            </div>

            {/* Secret */}
            <div>
              <Label htmlFor="secret">
                Secret <span className="text-red-500">*</span>
              </Label>
              <Input
                id="secret"
                type="password"
                required
                value={formData.secret}
                onChange={(e) =>
                  setFormData({ ...formData, secret: e.target.value })
                }
                placeholder="Enter secret key"
              />
            </div>

            {/* Endpoint */}
            <div>
              <Label htmlFor="endpoint">
                Endpoint <span className="text-red-500">*</span>
              </Label>
              <Input
                id="endpoint"
                type="url"
                required
                value={formData.endpoint}
                onChange={(e) =>
                  setFormData({ ...formData, endpoint: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            {/* Type */}
            <div>
              <Label htmlFor="type">
                Type <span className="text-red-500">*</span>
              </Label>
              <Select
                required
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select provider type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AWS S3">AWS S3</SelectItem>
                  <SelectItem value="Azure Blob">Azure Blob</SelectItem>
                  <SelectItem value="Google Cloud">Google Cloud</SelectItem>
                  <SelectItem value="MinIO">MinIO</SelectItem>
                  <SelectItem value="Local">Local</SelectItem>
                  <SelectItem value="FTP">FTP</SelectItem>
                  <SelectItem value="check 121">check 121</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <RichTextEditor
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
                placeholder="Enter provider description"
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
              {provider ? "Update Provider" : "Create Provider"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
