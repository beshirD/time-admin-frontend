"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import type { CurrentUser, UpdateUserProfile } from "@/types/settings";
import { useUpdateUserProfile } from "@/hooks/useCurrentUserProfile";

interface EditProfileModalProps {
  user: CurrentUser;
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({
  user,
  isOpen,
  onClose,
}: EditProfileModalProps) {
  const updateProfile = useUpdateUserProfile();

  const initialFormData = (): UpdateUserProfile => ({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber || "",
    countryCode: user.countryCode || "",
    dateOfBirth: user.dateOfBirth || "",
    gender: user.gender || "MALE",
    language: user.language || "en",
    timezone: user.timezone || "UTC",
  });

  const [formData, setFormData] = useState<UpdateUserProfile>(initialFormData);

  const handleChange = (field: keyof UpdateUserProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile.mutateAsync(formData);
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleClose = () => {
    if (!updateProfile.isPending) {
      // Reset form data to original values
      setFormData(initialFormData());
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[700px] m-4">
      <div className="relative w-full border max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 no-scrollbar">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Profile
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Update your personal information
          </p>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              {/* First Name */}
              <div>
                <Label>First Name *</Label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <Label>Last Name *</Label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  required
                />
              </div>

              {/* Email (Read-only) */}
              <div className="col-span-2">
                <Label>Email (cannot be changed)</Label>
                <Input
                  type="email"
                  value={user.email}
                  disabled
                  className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                />
              </div>

              {/* Country Code */}
              <div>
                <Label>Country Code *</Label>
                <Input
                  type="text"
                  value={formData.countryCode}
                  onChange={(e) => handleChange("countryCode", e.target.value)}
                  placeholder="+1"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label>Phone Number *</Label>
                <Input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  required
                />
              </div>

              {/* Date of Birth */}
              <div>
                <Label>Date of Birth *</Label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <Label>Gender *</Label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    handleChange(
                      "gender",
                      e.target.value as "MALE" | "FEMALE" | "OTHER",
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <Label>Language *</Label>
                <Input
                  type="text"
                  value={formData.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                  placeholder="en"
                  required
                />
              </div>

              {/* Timezone */}
              <div>
                <Label>Timezone *</Label>
                <Input
                  type="text"
                  value={formData.timezone}
                  onChange={(e) => handleChange("timezone", e.target.value)}
                  placeholder="UTC"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClose}
              type="button"
              disabled={updateProfile.isPending}>
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={updateProfile.isPending}>
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
