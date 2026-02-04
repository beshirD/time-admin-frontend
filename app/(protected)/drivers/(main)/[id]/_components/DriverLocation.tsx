import React from "react";

export default function DriverLocation() {
  return (
    <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-800">
      <h4 className="text-lg font-semibold  mb-2">Driver Location</h4>

      {/* Map Placeholder */}
      <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Map Integration Coming Soon
          </p>
          <p className="text-base text-gray-500 dark:text-gray-500 mt-2">
            Real-time driver location tracking will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
}
