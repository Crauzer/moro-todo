import { toast } from "react-toastify";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export * from "./toasts";

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
      switch (error.status) {
        case 400:
          return "Bad request - please check your input";
        case 401:
          return "Unauthorized - please log in again";
        case 403:
          return "Forbidden - you don't have permission";
        case 404:
          return "Not found - the item may have been deleted";
        case 422:
          return "Invalid input - please check your data";
        case 500:
          return "Server error - please try again later";
        default:
          return `Server error (${error.status}) - please try again later`;
      }
    }
  }

  if ("message" in error && error.message) {
    return error.message;
  }

  return "An unexpected error occurred";
}

export const handleError = (error: unknown, context = "Operation") => {
  console.error(`${context} failed:`, error);

  const errorMessage = getErrorMessage(
    error as FetchBaseQueryError | SerializedError
  );

  toast.error(`${context} failed: ${errorMessage}`, {
    position: "bottom-right",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
