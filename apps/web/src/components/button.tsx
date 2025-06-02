import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { LoadingSpinner } from "./loading-spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium font-mono transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-30 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-cyan-400/30",
  {
    variants: {
      variant: {
        default:
          "bg-gray-900 text-cyan-400 border-cyan-400/30 hover:bg-gray-800 hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-cyan-400/10",
        destructive:
          "bg-red-950 text-red-400 border-red-400/30 hover:bg-red-900 hover:border-red-400/50 hover:text-red-300 hover:shadow-red-400/10",
        error:
          "bg-red-950 text-red-300 border-red-500/40 hover:bg-red-900 hover:border-red-500/60 hover:text-red-200 hover:shadow-red-500/10",
        outline:
          "bg-transparent text-gray-300 border-gray-500/50 hover:bg-gray-900/50 hover:border-gray-400 hover:text-gray-100 hover:shadow-gray-400/10",
        secondary:
          "bg-gray-800 text-gray-300 border-gray-600/40 hover:bg-gray-700 hover:border-gray-500/60 hover:text-gray-100 hover:shadow-gray-500/10",
        ghost:
          "bg-transparent text-gray-400 border-transparent hover:bg-gray-900/30 hover:border-gray-600/40 hover:text-gray-200",
        link: "bg-transparent text-cyan-400 border-transparent underline-offset-4 hover:underline hover:text-cyan-300",
        success:
          "bg-green-950 text-green-400 border-green-400/30 hover:bg-green-900 hover:border-green-400/50 hover:text-green-300 hover:shadow-green-400/10",
        warning:
          "bg-yellow-950 text-yellow-400 border-yellow-400/30 hover:bg-yellow-900 hover:border-yellow-400/50 hover:text-yellow-300 hover:shadow-yellow-400/10",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        className={twMerge(
          "cursor-pointer",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <LoadingSpinner />}
        {isLoading ? "Loading..." : children}
      </Component>
    );
  }
);
Button.displayName = "Button";
