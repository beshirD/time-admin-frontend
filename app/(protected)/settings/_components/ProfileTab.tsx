"use client";

import { useCurrentUserProfile } from "@/hooks/useCurrentUserProfile";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileInfo } from "./ProfileInfo";

export function ProfileTab() {
  const { data: user, isLoading, error } = useCurrentUserProfile();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          Loading profile...
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-error-500">
          Failed to load profile. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <ProfileHeader user={user} />
      <ProfileInfo user={user} />
    </div>
  );
}
