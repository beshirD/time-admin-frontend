"use client";

import { useState, useEffect } from "react";
import { usePreferences, useUpdatePreferences } from "@/hooks/usePreferences";
import { Switch } from "@/components/ui/switch";
import Button from "@/components/ui/Button";
import { Sun, Moon, Monitor } from "lucide-react";
import type { Theme } from "@/types/preferences";

export function PreferencesTab() {
  const { data: preferences, isLoading, error } = usePreferences();

  // Separate mutation hooks for each section to prevent interference
  const updateNotifications = useUpdatePreferences();
  const updateDisplay = useUpdatePreferences();

  // Notification states
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: false,
    pushNotifications: false,
    smsNotifications: false,
    marketingEmails: false,
  });
  const [hasNotificationChanges, setHasNotificationChanges] = useState(false);

  // Display preferences states
  const [displaySettings, setDisplaySettings] = useState({
    language: "",
    currency: "",
    theme: "LIGHT" as Theme,
  });
  const [hasDisplayChanges, setHasDisplayChanges] = useState(false);

  // Initialize states when preferences load
  useEffect(() => {
    if (preferences) {
      setNotificationSettings({
        emailNotifications: preferences.emailNotifications,
        pushNotifications: preferences.pushNotifications,
        smsNotifications: preferences.smsNotifications,
        marketingEmails: preferences.marketingEmails,
      });
      setDisplaySettings({
        language: preferences.language,
        currency: preferences.currency,
        theme: preferences.theme,
      });
    }
  }, [preferences]);

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

  const handleNotificationToggle = (
    field: keyof typeof notificationSettings,
    value: boolean,
  ) => {
    setNotificationSettings((prev) => ({ ...prev, [field]: value }));
    setHasNotificationChanges(true);
  };

  const handleSaveNotifications = async () => {
    if (!preferences) return;

    try {
      // Send complete preferences object with updated notification settings
      await updateNotifications.mutateAsync({
        ...notificationSettings,
        language: preferences.language,
        currency: preferences.currency,
        theme: preferences.theme,
      });
      setHasNotificationChanges(false);
    } catch (error) {
      console.error("Failed to save notifications:", error);
    }
  };

  const handleThemeChange = (theme: Theme) => {
    setDisplaySettings((prev) => ({ ...prev, theme }));
    setHasDisplayChanges(true);

    // Update dark mode immediately
    const root = document.documentElement;
    if (theme === "DARK") {
      root.classList.add("dark");
    } else if (theme === "LIGHT") {
      root.classList.remove("dark");
    } else {
      // SYSTEM - check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  const handleDisplayChange = (
    field: "language" | "currency",
    value: string,
  ) => {
    setDisplaySettings((prev) => ({ ...prev, [field]: value }));
    setHasDisplayChanges(true);
  };

  const handleSaveDisplay = async () => {
    if (!preferences) return;

    try {
      // Send complete preferences object with updated display settings
      await updateDisplay.mutateAsync({
        emailNotifications: preferences.emailNotifications,
        pushNotifications: preferences.pushNotifications,
        smsNotifications: preferences.smsNotifications,
        marketingEmails: preferences.marketingEmails,
        ...displaySettings,
      });
      setHasDisplayChanges(false);
    } catch (error) {
      console.error("Failed to save display preferences:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Notifications Section */}
      <div className="p-6 border rounded-lg bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Notifications
          </h3>
          <Button
            size="sm"
            onClick={handleSaveNotifications}
            disabled={!hasNotificationChanges || updateNotifications.isPending}>
            {updateNotifications.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="space-y-4">
          <PreferenceToggle
            label="Email Notifications"
            description="Receive notifications via email"
            checked={notificationSettings.emailNotifications}
            onToggle={(value) =>
              handleNotificationToggle("emailNotifications", value)
            }
          />
          <PreferenceToggle
            label="Push Notifications"
            description="Receive push notifications in your browser"
            checked={notificationSettings.pushNotifications}
            onToggle={(value) =>
              handleNotificationToggle("pushNotifications", value)
            }
          />
          <PreferenceToggle
            label="SMS Notifications"
            description="Receive notifications via SMS"
            checked={notificationSettings.smsNotifications}
            onToggle={(value) =>
              handleNotificationToggle("smsNotifications", value)
            }
          />
          <PreferenceToggle
            label="Marketing Emails"
            description="Receive promotional and marketing emails"
            checked={notificationSettings.marketingEmails}
            onToggle={(value) =>
              handleNotificationToggle("marketingEmails", value)
            }
          />
        </div>
      </div>

      {/* Display Preferences Section */}
      <div className="p-6 border rounded-lg bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Display Preferences
          </h3>
          <Button
            size="sm"
            onClick={handleSaveDisplay}
            disabled={!hasDisplayChanges || updateDisplay.isPending}>
            {updateDisplay.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Theme Selector */}
          <div>
            <label className="text-sm font-medium text-gray-800 dark:text-white mb-3 block">
              Theme
            </label>
            <div className="grid grid-cols-3 gap-3">
              <ThemeOption
                icon={<Sun className="w-5 h-5" />}
                label="Light"
                isActive={displaySettings.theme === "LIGHT"}
                onClick={() => handleThemeChange("LIGHT")}
              />
              <ThemeOption
                icon={<Moon className="w-5 h-5" />}
                label="Dark"
                isActive={displaySettings.theme === "DARK"}
                onClick={() => handleThemeChange("DARK")}
              />
              <ThemeOption
                icon={<Monitor className="w-5 h-5" />}
                label="System"
                isActive={displaySettings.theme === "SYSTEM"}
                onClick={() => handleThemeChange("SYSTEM")}
              />
            </div>
          </div>

          {/* Language and Currency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-800 dark:text-white mb-2 block">
                Language
              </label>
              <input
                type="text"
                value={displaySettings.language}
                onChange={(e) =>
                  handleDisplayChange("language", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="en"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-800 dark:text-white mb-2 block">
                Currency
              </label>
              <input
                type="text"
                value={displaySettings.currency}
                onChange={(e) =>
                  handleDisplayChange("currency", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="USD"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PreferenceToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onToggle: (value: boolean) => void;
}

function PreferenceToggle({
  label,
  description,
  checked,
  onToggle,
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
      />
    </div>
  );
}

interface ThemeOptionProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function ThemeOption({ icon, label, isActive, onClick }: ThemeOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all
        ${
          isActive
            ? "border-primary bg-primary/5 dark:bg-primary/10"
            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
        }
      `}>
      <div
        className={`
        ${isActive ? "text-primary" : "text-gray-600 dark:text-gray-400"}
      `}>
        {icon}
      </div>
      <span
        className={`
        text-sm font-medium
        ${isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"}
      `}>
        {label}
      </span>
    </button>
  );
}
