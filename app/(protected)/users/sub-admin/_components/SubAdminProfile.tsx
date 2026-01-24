import Image from "next/image";
import { User } from "lucide-react";

interface SubAdminProfileProps {
  fullName: string;
  profileImage?: string | null;
}

export function SubAdminProfile({
  fullName,
  profileImage,
}: SubAdminProfileProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg h-full">
      <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md mb-4">
        {profileImage ? (
          <Image
            src={profileImage}
            alt={fullName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
            <User className="h-16 w-16" />
          </div>
        )}
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">
        {fullName}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
        Sub-Admin
      </p>
    </div>
  );
}
