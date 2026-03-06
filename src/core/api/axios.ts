import axios, { AxiosError } from "axios";
import { env } from "@/core/config/env";
import { tokenStorage } from "@/core/auth/token-storage";

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string | string[]; error?: { message?: string } }>) => {
    const status = error.response?.status;
    const apiMessage = error.response?.data?.message;
    const nestedMessage = error.response?.data?.error?.message;

    if (error.code === "ECONNABORTED") {
      error.message =
        "Le serveur met trop de temps a repondre. Veuillez reessayer.";
      return Promise.reject(error);
    }

    if (!error.response) {
      error.message =
        "Le serveur est injoignable pour le moment. Verifiez votre connexion ou reessayez plus tard.";
      return Promise.reject(error);
    }

    if (status === 401) {
      tokenStorage.clear();
      localStorage.removeItem("role");
      error.message = "Votre session a expire. Veuillez vous reconnecter.";
      return Promise.reject(error);
    }

    if (status === 403) {
      error.message = "Vous n'avez pas les droits pour effectuer cette action.";
      return Promise.reject(error);
    }

    if (status === 503) {
      error.message =
        "Service temporairement indisponible. Veuillez reessayer dans quelques instants.";
      return Promise.reject(error);
    }

    if (Array.isArray(apiMessage)) {
      error.message = apiMessage.join(", ");
      return Promise.reject(error);
    }

    if (typeof apiMessage === "string" && apiMessage.trim().length > 0) {
      error.message = apiMessage;
      return Promise.reject(error);
    }

    if (typeof nestedMessage === "string" && nestedMessage.trim().length > 0) {
      error.message = nestedMessage;
      return Promise.reject(error);
    }

    error.message = "Une erreur serveur est survenue. Veuillez reessayer.";
    return Promise.reject(error);
  },
);
