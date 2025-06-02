import { toast, type ToastOptions } from "react-toastify";

export const showSuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

export const showInfo = (message: string, options?: ToastOptions) => {
  toast.info(message, {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

export const showWarning = (message: string, options?: ToastOptions) => {
  toast.warning(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

export const showLoading = (message: string, options?: ToastOptions) => {
  return toast.loading(message, {
    position: "bottom-right",
    closeOnClick: false,
    draggable: false,
    ...options,
  });
};

export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};
