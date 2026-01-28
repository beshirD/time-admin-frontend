"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";
import IconButton from "@/components/ui/IconButton";

interface EditAccessTokenDialogProps {
  tokenData: {
    id: number;
    accessToken: string;
    deviceToken: string;
    deviceType: string;
  };
}

export function EditAccessTokenDialog({
  tokenData,
}: EditAccessTokenDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    accessToken: tokenData.accessToken,
    deviceToken: tokenData.deviceToken,
    deviceType: tokenData.deviceType,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Access Token updated successfully");
    setOpen(false);
  };

  return (
    <>
      <div onClick={(e) => e.stopPropagation()}>
        <IconButton
          variant="edit"
          title="Edit"
          onClick={() => setOpen(true)}>
          <Pencil className="h-4 w-4" />
        </IconButton>
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Edit Access Token"
        hideTitle={true}
        className="max-w-[500px] m-4">
        <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
          <div className="px-2">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Access Token
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Update the access token details below.
            </p>
          </div>

          <form
            className="flex flex-col"
            onSubmit={handleSubmit}>
            <div className="space-y-4 px-2 pb-3">
              {/* Access Token */}
              <div>
                <Label htmlFor="accessToken">
                  Access Token <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="accessToken"
                  type="text"
                  required
                  value={formData.accessToken}
                  onChange={(e) =>
                    setFormData({ ...formData, accessToken: e.target.value })
                  }
                />
              </div>

              {/* Device Token */}
              <div>
                <Label htmlFor="deviceToken">
                  Device Token <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="deviceToken"
                  type="text"
                  required
                  value={formData.deviceToken}
                  onChange={(e) =>
                    setFormData({ ...formData, deviceToken: e.target.value })
                  }
                />
              </div>

              {/* Device Type */}
              <div>
                <Label htmlFor="deviceType">
                  Device Type <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="deviceType"
                  type="text"
                  required
                  value={formData.deviceType}
                  onChange={(e) =>
                    setFormData({ ...formData, deviceType: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
