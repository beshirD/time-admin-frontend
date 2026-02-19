"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { DeliveryFeeSettings } from "@/types/entities";

interface DeliveryFeeSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockSettings: DeliveryFeeSettings = {
  useTieredPricing: true,
  baseDeliveryFee: 1.0,
  feePerKilometer: 20.0,
  deliveryRadius: 15,
  averageDeliverySpeed: 20,
  freeDeliveryThreshold: 5000.0,
};

export function DeliveryFeeSettingsDialog({
  isOpen,
  onClose,
}: DeliveryFeeSettingsDialogProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [settings, setSettings] = useState<DeliveryFeeSettings>(mockSettings);

  const handleSave = () => {
    toast.success("Delivery fee settings updated successfully");
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setSettings(mockSettings);
    setIsEditMode(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14 mb-6">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Delivery Fee Settings
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Delivery Fee Configuration
          </p>
        </div>

        <div className="px-2 space-y-6">
          {!isEditMode ? (
            /* View Mode */
            <>
              <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Use Tiered Pricing
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      If enabled, the fixed distance tiers will be applied
                      instead of per-kilometer pricing.
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      settings.useTieredPricing
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                    }`}>
                    {settings.useTieredPricing ? "Enabled" : "Disabled"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Base Delivery Fee (AFN)
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {settings.baseDeliveryFee.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Fee Per Kilometer (AFN)
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {settings.feePerKilometer.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Delivery Radius (km)
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {settings.deliveryRadius}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Average Delivery Speed (km/h)
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {settings.averageDeliverySpeed}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Free Delivery Threshold (AFN)
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {settings.freeDeliveryThreshold.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setIsEditMode(true)}>
                  Update Settings
                </Button>
              </div>
            </>
          ) : (
            /* Edit Mode */
            <div className="space-y-5">
              {/* Use Tiered Pricing */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                <div className="flex-1">
                  <Label htmlFor="useTieredPricing">Use Tiered Pricing</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    If enabled, the fixed distance tiers will be applied instead
                    of per-kilometer pricing.
                  </p>
                </div>
                <Switch
                  id="useTieredPricing"
                  checked={settings.useTieredPricing}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, useTieredPricing: checked })
                  }
                />
              </div>

              {/* Base Delivery Fee */}
              <div>
                <Label htmlFor="baseDeliveryFee">Base Delivery Fee (AFN)</Label>
                <Input
                  id="baseDeliveryFee"
                  type="number"
                  step="0.01"
                  value={settings.baseDeliveryFee}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      baseDeliveryFee: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              {/* Fee Per Kilometer */}
              <div>
                <Label htmlFor="feePerKilometer">Fee Per Kilometer (AFN)</Label>
                <Input
                  id="feePerKilometer"
                  type="number"
                  step="0.01"
                  value={settings.feePerKilometer}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      feePerKilometer: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              {/* Delivery Radius */}
              <div>
                <Label htmlFor="deliveryRadius">Delivery Radius (km)</Label>
                <Input
                  id="deliveryRadius"
                  type="number"
                  value={settings.deliveryRadius}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      deliveryRadius: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              {/* Average Delivery Speed */}
              <div>
                <Label htmlFor="averageDeliverySpeed">
                  Average Delivery Speed (km/h)
                </Label>
                <Input
                  id="averageDeliverySpeed"
                  type="number"
                  value={settings.averageDeliverySpeed}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      averageDeliverySpeed: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              {/* Free Delivery Threshold */}
              <div>
                <Label htmlFor="freeDeliveryThreshold">
                  Free Delivery Threshold (AFN)
                </Label>
                <Input
                  id="freeDeliveryThreshold"
                  type="number"
                  step="0.01"
                  value={settings.freeDeliveryThreshold}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      freeDeliveryThreshold: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-3 justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
