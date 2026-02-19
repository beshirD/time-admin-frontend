"use client";

import { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  Gift,
  Percent,
  ShieldAlert,
  ShoppingCart,
} from "lucide-react";
import {
  useReferralSettings,
  useUpdateReferralSettings,
} from "@/hooks/useReferralSettings";
import type { UpdatePointsSettings } from "@/types/referral";

interface FieldConfig {
  key: keyof UpdatePointsSettings;
  label: string;
  description: string;
  icon: React.ElementType;
  prefix?: string;
  suffix?: string;
  min: number;
  max: number;
  step: number;
  validate: (v: number) => string | null;
}

const FIELDS: FieldConfig[] = [
  {
    key: "pointsPerReferredOrder",
    label: "Points per Referred Order",
    description:
      "How many points a user earns each time someone they referred places an order.",
    icon: Gift,
    suffix: "pts",
    min: 0,
    max: 10000,
    step: 1,
    validate: (v) =>
      v < 0 ? "Must be 0 or more" : v > 10000 ? "Cannot exceed 10,000" : null,
  },
  {
    key: "pointsPerDiscountPercentage",
    label: "Points per Discount Percentage",
    description: "How many points equal 1% discount. E.g. 100 pts = 1% off.",
    icon: Percent,
    suffix: "pts / 1%",
    min: 1,
    max: 100000,
    step: 1,
    validate: (v) => (v <= 0 ? "Must be greater than 0" : null),
  },
  {
    key: "maxDiscountPercentage",
    label: "Maximum Discount Percentage",
    description:
      "Safety cap — the highest discount that can ever be applied to a single order.",
    icon: ShieldAlert,
    suffix: "%",
    min: 1,
    max: 100,
    step: 1,
    validate: (v) =>
      v < 1 ? "Must be at least 1%" : v > 100 ? "Cannot exceed 100%" : null,
  },
  {
    key: "minOrderAmountForPoints",
    label: "Minimum Order Amount for Points",
    description: "Orders below this amount do not earn any points.",
    icon: ShoppingCart,
    prefix: "$",
    min: 0,
    max: 1000000,
    step: 0.01,
    validate: (v) => (v < 0 ? "Must be 0 or more" : null),
  },
];

function validate(
  form: UpdatePointsSettings,
): Partial<Record<keyof UpdatePointsSettings, string>> {
  const errors: Partial<Record<keyof UpdatePointsSettings, string>> = {};
  for (const field of FIELDS) {
    const err = field.validate(form[field.key]);
    if (err) errors[field.key] = err;
  }
  return errors;
}

export function PointsSettingsForm() {
  const { data: settings, isLoading, error } = useReferralSettings();
  const updateSettings = useUpdateReferralSettings();

  const [form, setForm] = useState<UpdatePointsSettings>({
    pointsPerReferredOrder: 0,
    pointsPerDiscountPercentage: 1,
    maxDiscountPercentage: 30,
    minOrderAmountForPoints: 0,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof UpdatePointsSettings, string>>
  >({});
  const [isDirty, setIsDirty] = useState(false);

  // Populate form when data arrives
  useEffect(() => {
    if (settings) {
      const loaded: UpdatePointsSettings = {
        pointsPerReferredOrder: settings.pointsPerReferredOrder,
        pointsPerDiscountPercentage: settings.pointsPerDiscountPercentage,
        maxDiscountPercentage: settings.maxDiscountPercentage,
        minOrderAmountForPoints: settings.minOrderAmountForPoints,
      };
      setForm(loaded);
      setIsDirty(false);
    }
  }, [settings]);

  const handleChange = (key: keyof UpdatePointsSettings, raw: string) => {
    const value = raw === "" ? 0 : parseFloat(raw);
    const updated = { ...form, [key]: value };
    setForm(updated);
    setIsDirty(true);
    // Clear individual field error on change
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleReset = () => {
    if (settings) {
      setForm({
        pointsPerReferredOrder: settings.pointsPerReferredOrder,
        pointsPerDiscountPercentage: settings.pointsPerDiscountPercentage,
        maxDiscountPercentage: settings.maxDiscountPercentage,
        minOrderAmountForPoints: settings.minOrderAmountForPoints,
      });
      setErrors({});
      setIsDirty(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await updateSettings.mutateAsync(form);
    setIsDirty(false);
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center bg-white dark:bg-gray-900 rounded-lg border">
        <div className="animate-spin h-7 w-7 rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
        <ShieldAlert className="h-10 w-10 mx-auto text-red-400 mb-2" />
        <p className="font-semibold text-red-600 dark:text-red-400">
          Failed to load settings
        </p>
        <p className="text-sm text-red-400 mt-1">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white dark:bg-gray-900 rounded-lg border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Reward Configuration
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Configure how users earn and redeem points globally.
            </p>
          </div>
          {settings && (
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                settings.isActive
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              }`}>
              <span
                className={`h-1.5 w-1.5 rounded-full ${settings.isActive ? "bg-green-500" : "bg-gray-400"}`}
              />
              {settings.isActive ? "System Active" : "System Inactive"}
            </span>
          )}
        </div>

        {/* Fields */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {FIELDS.map((field) => {
            const Icon = field.icon;
            const fieldError = errors[field.key];
            return (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {field.label}
                </label>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                  {field.description}
                </p>
                <div
                  className={`flex items-center border rounded-lg overflow-hidden transition-colors ${
                    fieldError
                      ? "border-red-400 dark:border-red-600"
                      : "border-gray-300 dark:border-gray-700 focus-within:border-primary"
                  }`}>
                  {field.prefix && (
                    <span className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm border-r border-gray-300 dark:border-gray-700 select-none">
                      {field.prefix}
                    </span>
                  )}
                  {!field.prefix && (
                    <span className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700">
                      <Icon className="h-4 w-4 text-gray-400" />
                    </span>
                  )}
                  <input
                    type="number"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={form[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-transparent text-sm text-gray-800 dark:text-white outline-none"
                  />
                  {field.suffix && (
                    <span className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm border-l border-gray-300 dark:border-gray-700 select-none whitespace-nowrap">
                      {field.suffix}
                    </span>
                  )}
                </div>
                {fieldError && (
                  <p className="mt-1 text-xs text-red-500">{fieldError}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50/50 dark:bg-gray-800/30 rounded-b-lg">
          <button
            type="button"
            disabled={!isDirty || updateSettings.isPending}
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            type="submit"
            disabled={!isDirty || updateSettings.isPending}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <Save className="h-4 w-4" />
            {updateSettings.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
