"use client";

interface RestaurantLocationMapProps {
  location: string;
}

export function RestaurantLocationMap({
  location,
}: RestaurantLocationMapProps) {
  return (
    <div className="p-5 border bg-white dark:bg-gray-900 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
        Restaurant Location
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        📍 {location}
      </p>
      <div className="w-full h-[300px] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🗺️ Map will be displayed here
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Map integration coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
