"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import type { UserPreferences, Theme } from "@/types/preferences";
import { usePatchPreferences } from "@/hooks/usePreferences";

interface EditDisplayPreferencesModalProps {
  preferences: UserPreferences;
  isOpen: boolean;
  onClose: () => void;
}

export function EditDisplayPreferencesModal({
  preferences,
  isOpen,
  onClose,
}: EditDisplayPreferencesModalProps) {
  const patchPreferences = usePatchPreferences();

  const [formData, setFormData] = useState({
    language: preferences.language,
    currency: preferences.currency,
    theme: preferences.theme,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await patchPreferences.mutateAsync(formData);
      onClose();
    } catch (error) {
      console.error("Failed to update display preferences:", error);
    }
  };

  const handleClose = () => {
    if (!patchPreferences.isPending) {
      // Reset form data to original values
      setFormData({
        language: preferences.language,
        currency: preferences.currency,
        theme: preferences.theme,
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
            Edit Display Preferences
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Customize your display settings
          </p>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3 space-y-5">
            {/* Language */}
            <div>
              <Label>Language *</Label>
              <Input
                type="text"
                value={formData.language}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, language: e.target.value }))
                }
                placeholder="en"
                required
              />
            </div>

            {/* Currency */}
            <div>
              <Label>Currency *</Label>
              <Input
                type="text"
                value={formData.currency}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, currency: e.target.value }))
                }
                placeholder="USD"
                required
              />
            </div>

            {/* Theme */}
            <div>
              <Label>Theme *</Label>
              <select
                value={formData.theme}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    theme: e.target.value as Theme,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required>
                <option value="LIGHT">Light</option>
                <option value="DARK">Dark</option>
                <option value="SYSTEM">System</option>
              </select>
            </div>

            {/* Error Message */}
            {patchPreferences.error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">
                  Failed to update display preferences. Please try again.
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
