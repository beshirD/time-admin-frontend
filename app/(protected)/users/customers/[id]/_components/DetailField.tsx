interface DetailFieldProps {
  label: string;
  value: string | number;
  badge?: {
    text: string;
    variant: "success" | "error";
  };
}

export function DetailField({ label, value, badge }: DetailFieldProps) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </label>
      {badge ? (
        <p className="mt-1">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              badge.variant === "success"
                ? "bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400"
                : "bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-400"
            }`}>
            {badge.text}
          </span>
        </p>
      ) : (
        <p className="mt-1 text-base text-gray-900 dark:text-white">{value}</p>
      )}
    </div>
  );
}
