"use client";

import React from "react";

export default function OrderLocationMap({ location }: { location: string }) {
  return (
    <div className="p-5 border border-gray-200 rounded-lg dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-800">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2 font-primary">
        Order Location
      </h4>
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        {location}
      </p>

      {/* Map Placeholder */}
      <div className="w-full mt-4 h-[400px] bg-gray-100 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📍</div>
          <p className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
            Map Integration Coming Soon
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 max-w-sm">
            Order placement and delivery location tracking will be displayed
            here in the next update.
          </p>
        </div>
      </div>
    </div>
  );
}
