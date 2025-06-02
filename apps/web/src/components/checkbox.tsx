"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { twMerge } from "tailwind-merge";
import { PiCheckBold } from "react-icons/pi";

const sizeVariants = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
} as const;

const iconSizeVariants = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
} as const;

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: keyof typeof sizeVariants;
}

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size = "md", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={twMerge(
      "peer shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      "cursor-pointer",
      sizeVariants[size],
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={twMerge(
        "flex items-center justify-center text-current",
        iconSizeVariants[size]
      )}
    >
      <PiCheckBold />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
