import React, { ReactNode } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  size?: "sm" | "md" | "icon" | "default";
  variant?: "primary" | "outline" | "destructive" | "ghost" | "default";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  usage?: "create" | "edit" | "delete" | "view";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      startIcon,
      endIcon,
      usage,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    // Map 'default' safely
    const safeSize = size === "default" ? "md" : size;
    const safeVariant = variant === "default" ? "primary" : variant;

    // Size Classes
    const sizeClasses = {
      sm: "px-4 py-3 text-sm",
      md: "px-5 py-3.5 text-sm",
      icon: "h-9 w-9 p-0",
    };

    // Variant Classes
    const variantClasses = {
      primary:
        "bg-primary text-white shadow-theme-xs hover:bg-primary/80 disabled:bg-primary/30",

      outline:
        "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",

      destructive:
        "bg-red-500 text-white shadow-theme-xs hover:bg-red-600 disabled:bg-red-300",

      ghost:
        "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground shadow-none",
    };

    const effectiveStartIcon =
      usage === "create" ? (
        <Plus className="w-4 h-4" />
      ) : usage === "edit" ? (
        <Pencil className="w-4 h-4" />
      ) : usage === "delete" ? (
        <Trash2 className="h-4 w-4" />
      ) : usage === "view" ? (
        <Eye className="w-4 h-4" />
      ) : (
        startIcon
      );

    const usageClasses =
      usage === "create"
        ? "bg-primary text-white py-2 px-4 rounded-sm gap-2"
        : usage === "edit"
          ? "px-3 py-1.5 text-sm font-medium border-primary border-2 text-primary hover:bg-primary/30 dark:hover:bg-primary/40 bg-primary/10 rounded-md gap-2"
          : usage === "delete"
            ? "px-3 py-1.5 text-sm font-medium border-red-700 border-2 hover:bg-red-500/30 dark:hover:bg-red-500/40 text-red-500 bg-red-600/10 rounded-md gap-2"
            : usage === "view"
              ? "px-3 py-1.5 text-sm font-medium border-blue-600 border-2 text-blue-600 dark:text-blue-300 bg-blue-100 hover:bg-blue-500/30 dark:hover:bg-blue-500/30 dark:bg-blue-800/20 rounded-md gap-2"
              : "";

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium gap-2 rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[safeSize as keyof typeof sizeClasses],
          variantClasses[safeVariant as keyof typeof variantClasses],
          usageClasses,
          className,
        )}
        {...props}>
        {asChild ? (
          children
        ) : (
          <>
            {effectiveStartIcon && (
              <span className="flex items-center">{effectiveStartIcon}</span>
            )}
            {children}
            {endIcon && <span className="flex items-center">{endIcon}</span>}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export default Button;
