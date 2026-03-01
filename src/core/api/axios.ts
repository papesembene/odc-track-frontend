import axios from "axios";
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
