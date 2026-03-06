const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl || typeof apiBaseUrl !== "string") {
  throw new Error(
    "La variable VITE_API_BASE_URL est requise pour demarrer le frontend.",
  );
}

export const env = {
  apiBaseUrl,
};
