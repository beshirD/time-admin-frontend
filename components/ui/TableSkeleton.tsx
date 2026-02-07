import React from "react";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  showActions?: boolean;
}

export function TableSkeleton({
  rows = 5,
  columns = 5,
  showHeader = true,
  showActions = false,
}: TableSkeletonProps) {
  return (
    <div className="w-full animate-pulse">
      {/* Table Header */}
      {showHeader && (
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div
            className="grid gap-4 px-4 py-3"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, index) => (
              <div
                key={`header-${index}`}
                className="h-4 bg-gray-300 dark:bg-gray-600 rounded"
              />
            ))}
          </div>
        </div>
      )}

      {/* Table Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="grid gap-4 px-4 py-4 bg-white dark:bg-gray-900"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="flex items-center">
                <div
                  className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                  style={{
                    width: `${Math.random() * 40 + 60}%`, // Random width between 60-100%
                  }}
                />
              </div>
            ))}
            {showActions && (
              <div className="flex items-center gap-2 justify-end">
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Compact version for smaller tables
export function CompactTableSkeleton({
  rows = 3,
  columns = 4,
}: Pick<TableSkeletonProps, "rows" | "columns">) {
  return (
    <div className="w-full animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`compact-row-${rowIndex}`}
          className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={`compact-cell-${rowIndex}-${colIndex}`}
              className="flex-1">
              <div
                className="h-3 bg-gray-300 dark:bg-gray-600 rounded"
                style={{
                  width: `${Math.random() * 30 + 70}%`,
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
