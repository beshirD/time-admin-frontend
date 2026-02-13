"use client";

import type { CurrentUser } from "@/types/settings";
import { format } from "date-fns";

interface ProfileInfoProps {
  user: CurrentUser;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Information Card */}
      <div className="p-6 border rounded-lg bg-white dark:bg-gray-900">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem
            label="First Name"
            value={user.firstName}
          />
          <InfoItem
            label="Last Name"
            value={user.lastName}
          />
          <InfoItem
            label="Email"
            value={user.email}
          />
          <InfoItem
            label="Phone"
            value={`${user.countryCode} ${user.phoneNumber}`}
          />
          <InfoItem
            label="Date of Birth"
            value={formatDate(user.dateOfBirth)}
          />
          <InfoItem
            label="Gender"
            value={user.gender}
          />
        </div>
      </div>

      {/* Account Information Card */}
      <div className="p-6 border rounded-lg bg-white dark:bg-gray-900">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
          Account Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem
            label="Role"
            value={user.role.name}
          />
          <InfoItem
            label="Status"
            value={user.status}
          />
          <InfoItem
            label="Language"
            value={user.language}
          />
          <InfoItem
            label="Timezone"
            value={user.timezone}
          />
          <InfoItem
            label="Referral Code"
            value={user.referralCode}
          />
          <InfoItem
            label="Member Since"
            value={formatDate(user.createdAt)}
          />
          {user.lastLoginAt && (
            <InfoItem
              label="Last Login"
              value={formatDate(user.lastLoginAt)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-white">
        {value || "-"}
      </p>
    </div>
  );
}
