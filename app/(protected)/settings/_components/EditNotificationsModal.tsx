"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { Switch } from "@/components/ui/switch";
import type { UserPreferences } from "@/types/preferences";
import { usePatchPreferences } from "@/hooks/usePreferences";

interface EditNotificationsModalProps {
  preferences: UserPreferences;
  isOpen: boolean;
  onClose: () => void;
}

export function EditNotificationsModal({
  preferences,
  isOpen,
  onClose,
}: EditNotificationsModalProps) {
  const patchPreferences = usePatchPreferences();

  const [formData, setFormData] = useState({
    emailNotifications: preferences.emailNotifications,
    pushNotifications: preferences.pushNotifications,
    smsNotifications: preferences.smsNotifications,
    marketingEmails: preferences.marketingEmails,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await patchPreferences.mutateAsync(formData);
      onClose();
    } catch (error) {
      console.error("Failed to update notifications:", error);
    }
  };

  const handleClose = () => {
    if (!patchPreferences.isPending) {
      // Reset form data to original values
      setFormData({
        emailNotifications: preferences.emailNotifications,
        pushNotifications: preferences.pushNotifications,
        smsNotifications: preferences.smsNotifications,
        marketingEmails: preferences.marketingEmails,
      });
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[600px] m-4">
      <div className="relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 no-scrollbar">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Notifications
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Manage your notification preferences
          </p>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3 space-y-6">
            <NotificationToggle
              label="Email Notifications"
              description="Receive notifications via email"
              checked={formData.emailNotifications}
              onToggle={(value) =>
                setFormData((prev) => ({ ...prev, emailNotifications: value }))
              }
            />

            <NotificationToggle
              label="Push Notifications"
              description="Receive push notifications in your browser"
              checked={formData.pushNotifications}
              onToggle={(value) =>
                setFormData((prev) => ({ ...prev, pushNotifications: value }))
              }
            />

            <NotificationToggle
              label="SMS Notifications"
              description="Receive notifications via SMS"
              checked={formData.smsNotifications}
              onToggle={(value) =>
                setFormData((prev) => ({ ...prev, smsNotifications: value }))
              }
            />

            <NotificationToggle
              label="Marketing Emails"
              description="Receive promotional and marketing emails"
              checked={formData.marketingEmails}
              onToggle={(value) =>
                setFormData((prev) => ({ ...prev, marketingEmails: value }))
              }
            />

            {/* Error Message */}
            {patchPreferences.error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">
                  Failed to update notifications. Please try again.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClose}
              type="button"
              disabled={patchPreferences.isPending}>
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={patchPreferences.isPending}>
              {patchPreferences.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

interface NotificationToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onToggle: (value: boolean) => void;
}

function NotificationToggle({
  label,
  description,
  checked,
  onToggle,
}: NotificationToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <Label className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onToggle}
      />
    </div>
  );
}
