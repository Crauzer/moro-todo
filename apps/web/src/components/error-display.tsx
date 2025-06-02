import * as React from "react";
import { twMerge } from "tailwind-merge";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Button } from "./button";
import { Panel } from "./panel";

export interface ErrorDisplayProps {
  error?: FetchBaseQueryError | SerializedError | string | null;
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
  variant?: "panel" | "inline";
  isLoading?: boolean;
}

function getErrorMessage(
  error?: FetchBaseQueryError | SerializedError | string | null
): string {
  if (typeof error === "string") {
    return error;
  }

  if (!error) {
    return "An unexpected error occurred";
  }

  if ("status" in error) {
    if (error.status === "FETCH_ERROR") {
      return "Network error - please check your connection";
    }
    if (error.status === "PARSING_ERROR") {
      return "Unable to parse server response";
    }
    if (error.status === "TIMEOUT_ERROR") {
      return "Request timed out - please try again";
    }
    if (typeof error.status === "number") {
      return `Server error (${error.status}) - please try again later`;
    }
  }

  if ("message" in error && error.message) {
    return error.message;
  }

  return "An unexpected error occurred";
}

export const ErrorDisplay = React.forwardRef<HTMLDivElement, ErrorDisplayProps>(
  (
    {
      error,
      title = "Error",
      message,
      onRetry,
      retryLabel = "Try Again",
      className,
      variant = "panel",
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const errorMessage = message || getErrorMessage(error);

    const content = (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-2">{title}</h2>
        <p className="text-red-300 mb-4">{errorMessage}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            isLoading={isLoading}
            className="border-red-500/20 hover:bg-red-500/10"
          >
            {retryLabel}
          </Button>
        )}
      </div>
    );

    if (variant === "panel") {
      return (
        <Panel ref={ref} className={className} {...props}>
          {content}
        </Panel>
      );
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          "p-4 backdrop-blur-sm bg-red-500/10 border border-red-500/20 rounded-lg text-center",
          className
        )}
        {...props}
      >
        {content}
      </div>
    );
  }
);

ErrorDisplay.displayName = "ErrorDisplay";
