import Image from "next/image";

interface CustomerProfileProps {
  fullName: string;
  profileImage: string | null;
}

export function CustomerProfile({
  fullName,
  profileImage,
}: CustomerProfileProps) {
  return (
    <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
      {profileImage ? (
        <Image
          src={profileImage}
          alt={fullName}
          width={200}
          height={200}
          className="rounded-lg object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg
            className="w-24 h-24 text-gray-400 dark:text-gray-500"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      )}
    </div>
  );
}
