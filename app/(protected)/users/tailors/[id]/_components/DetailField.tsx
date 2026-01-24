interface DetailFieldProps {
  label: string;
  value: string | number | boolean | null | undefined;
  badge?: {
    text: string;
    variant: "success" | "warning" | "error" | "info" | "default";
  };
}

export function DetailField({ label, value, badge }: DetailFieldProps) {
  const badgeVariants = {
    success:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    default: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <div className="flex items-center gap-2 min-h-[24px]">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {value || "-"}
        </span>
        {badge && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              badgeVariants[badge.variant] || badgeVariants.default
            }`}>
            {badge.text}
          </span>
        )}
      </div>
    </div>
  );
}
