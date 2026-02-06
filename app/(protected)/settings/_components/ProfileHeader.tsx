"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import type { CurrentUser } from "@/types/settings";
import { EditProfileModal } from "./EditProfileModal";

interface ProfileHeaderProps {
  user: CurrentUser;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 shrink-0">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.fullName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {user.fullName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.role.name} • {user.email}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Pencil className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      <EditProfileModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
