/**
 * API pour le profil apprenant
 */
import { api } from "@/core/api/axios";

// ============================================
// TYPES
// ============================================

export interface ApprenantMe {
  user?: {
    prenom?: string | null;
    nom?: string | null;
    email?: string | null;
    actif?: boolean;
  };
  telephone?: string | null;
  adresse?: string | null;
  genre?: string | null;
  dateBirth?: string | null;
  createdAt?: string;
  promotion?: { nom?: string | null } | null;
  referentiel?: { nom?: string | null } | null;
}

export type ApprenantMeInput = {
  telephone?: string;
  adresse?: string;
  genre?: string;
  dateBirth?: string;
};

// ============================================
// FONCTIONS API
// ============================================

/** Récupère le profil de l'apprenant connecté */
export async function getApprenantMe(): Promise<ApprenantMe> {
  const { data } = await api.get("/apprenants/me");
  return data?.data ?? {};
}

/** Met à jour le profil de l'apprenant connecté */
export async function updateApprenantMe(
  payload: ApprenantMeInput,
): Promise<ApprenantMe> {
  const { data } = await api.put("/apprenants/me", payload);
  return data.data;
}
