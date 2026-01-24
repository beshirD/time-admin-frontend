import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  children: ReactNode;
  variant?: "view" | "edit" | "delete";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = "view",
  onClick,
  disabled = false,
  className = "",
  title,
  type = "button",
}) => {
  // Variant Classes using design system colors
  const variantClasses = {
    view: "border border-brand-500 text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 dark:hover:bg-brand-500/20",
    edit: "border border-warning-500 text-warning-600 dark:text-warning-400 hover:bg-warning-500/20 dark:hover:bg-warning-500/20",
    delete:
      "border border-error-500 text-error-600 dark:text-error-400 hover:bg-error-500/20 dark:hover:bg-error-500/20",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "h-8 w-8 flex items-center justify-center rounded-md transition-colors duration-200",
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}>
      {children}
    </button>
  );
};

export default IconButton;
