"use client";

import { useState } from "react";
import { usePreferences, usePatchPreferences } from "@/hooks/usePreferences";
import { Switch } from "@/components/ui/switch";
import { Pencil } from "lucide-react";
import { EditDisplayPreferencesModal } from "./EditDisplayPreferencesModal";

export function PreferencesTab() {
  const { data: preferences, isLoading, error } = usePreferences();
  const patchPreferences = usePatchPreferences();
  const [isDisplayModalOpen, setIsDisplayModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          Loading preferences...
        </div>
      </div>
    );
  }

  if (error || !preferences) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-error-500">
          Failed to load preferences. Please try again.
        </div>
      </div>
    );
  }

  const handleToggle = async (field: string, value: boolean) => {
    try {
      await patchPreferences.mutateAsync({ [field]: value });
    } catch (error) {
      console.error("Failed to update preference:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Notifications Section */}
        <div className="p-6 border rounded-lg bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Notifications
            </h3>
          </div>

          <div className="space-y-4">
            <PreferenceToggle
              label="Email Notifications"
              description="Receive notifications via email"
              checked={preferences.emailNotifications}
              onToggle={(value) => handleToggle("emailNotifications", value)}
              disabled={patchPreferences.isPending}
            />
            <PreferenceToggle
              label="Push Notifications"
              description="Receive push notifications in your browser"
              checked={preferences.pushNotifications}
              onToggle={(value) => handleToggle("pushNotifications", value)}
              disabled={patchPreferences.isPending}
            />
            <PreferenceToggle
              label="SMS Notifications"
              description="Receive notifications via SMS"
              checked={preferences.smsNotifications}
              onToggle={(value) => handleToggle("smsNotifications", value)}
              disabled={patchPreferences.isPending}
            />
            <PreferenceToggle
              label="Marketing Emails"
              description="Receive promotional and marketing emails"
              checked={preferences.marketingEmails}
              onToggle={(value) => handleToggle("marketingEmails", value)}
              disabled={patchPreferences.isPending}
            />
          </div>
        </div>

        {/* Display Preferences Section */}
        <div className="p-6 border rounded-lg bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Display Preferences
            </h3>
            <button
              onClick={() => setIsDisplayModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PreferenceItem
              label="Language"
              value={preferences.language}
            />
            <PreferenceItem
              label="Currency"
              value={preferences.currency}
            />
            <PreferenceItem
              label="Theme"
              value={preferences.theme}
            />
          </div>
        </div>
      </div>

      {/* Display Preferences Modal */}
      <EditDisplayPreferencesModal
        preferences={preferences}
        isOpen={isDisplayModalOpen}
        onClose={() => setIsDisplayModalOpen(false)}
      />
    </>
  );
}

interface PreferenceToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
}

function PreferenceToggle({
  label,
  description,
  checked,
  onToggle,
  disabled,
}: PreferenceToggleProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800 dark:text-white">
          {label}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onToggle}
        disabled={disabled}
      />
    </div>
  );
}

function PreferenceItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-white">
        {value || "-"}
      </p>
    </div>
  );
}
