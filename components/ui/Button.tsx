import React, { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  size?: "sm" | "md" | "default";
  variant?: "primary" | "outline" | "destructive" | "default";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
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
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    // Map 'default' to 'md' for size and 'primary' for variant if needed
    const safeSize = size === "default" ? "md" : size;
    const safeVariant = variant === "default" ? "primary" : variant;

    // Size Classes
    const sizeClasses = {
      sm: "px-4 py-3 text-sm",
      md: "px-5 py-3.5 text-sm",
    };

    // Variant Classes
    const variantClasses = {
      primary:
        "bg-primary text-white shadow-theme-xs hover:bg-primary/80 disabled:bg-primary/30",
      outline:
        "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
      destructive:
        "bg-red-500 text-white shadow-theme-xs hover:bg-red-600 disabled:bg-red-300",
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center font-medium gap-2 rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[safeSize as keyof typeof sizeClasses],
          variantClasses[safeVariant as keyof typeof variantClasses],
          className,
        )}
        ref={ref}
        {...props}>
        {asChild ? (
          children
        ) : (
          <>
            {startIcon && (
              <span className="flex items-center">{startIcon}</span>
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
