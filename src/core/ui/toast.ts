import { ref } from "vue";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

const toasts = ref<ToastItem[]>([]);
let nextToastId = 1;

export const useToastStore = () => ({ toasts });

export const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

export const showToast = (
  message: string,
  type: ToastType = "info",
  durationMs = 5000,
) => {
  const id = nextToastId++;
  toasts.value.push({ id, message, type });

  window.setTimeout(() => {
    removeToast(id);
  }, durationMs);
};

