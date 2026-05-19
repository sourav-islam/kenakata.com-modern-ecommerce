// src/components/ui/button.tsx — update koro

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

// Install koro
// npm install @radix-ui/react-slot

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?:     "sm" | "md" | "lg" | "icon";
  loading?:  boolean;
  asChild?:  boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant  = "default",
      size     = "md",
      loading  = false,
      asChild  = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const base = cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap",
      "rounded-md text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "active:scale-[0.98]"
    );

    const variants = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost:
        "hover:bg-accent hover:text-accent-foreground",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
    };

    const sizes = {
      sm:   "h-9  px-3 text-xs",
      md:   "h-10 px-4 py-2",
      lg:   "h-11 px-8 text-base",
      icon: "h-10 w-10",
    };

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(base, variants[variant], sizes[size], className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };