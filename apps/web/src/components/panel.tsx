import React, { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PanelProps {
  children: ReactNode;
  className?: string;
}

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ children, className }, ref) => {
    return (
      <div
        className={twMerge(
          "backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-2xl",
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

Panel.displayName = "Panel";
