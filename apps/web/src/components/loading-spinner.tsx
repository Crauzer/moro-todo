import React from "react";
import { twMerge } from "tailwind-merge";

export interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  className?: string;
}

const sizeMap = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
} as const;

export const LoadingSpinner = React.forwardRef<
  SVGSVGElement,
  LoadingSpinnerProps
>(({ size = "sm", className, ...props }, ref) => {
  const sizeClass =
    typeof size === "string" && size in sizeMap
      ? sizeMap[size as keyof typeof sizeMap]
      : size;

  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge(sizeClass, className)}
      ref={ref}
      {...props}
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";
