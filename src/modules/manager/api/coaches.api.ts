/**
 * API pour les coaches (Manager)
 */
import { api } from "@/core/api/axios";
import { extractApiData, extractApiItems } from "@/core/api/response";

// ============================================
// TYPES
// ============================================

/**
 * Référentiel associé à un coach
 */
export type CoachReferentiel = {
  id: string;
  nom: string;
};

/**
 * Type représentant un coach
 */
export type CoachItem = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  actif: boolean;
  createdAt: string;
  updatedAt?: string;
  referentiel: CoachReferentiel | null;
  specialite: string | null;
};

/**
 * Type pour la pagination
 */
export type CoachesPagination = {
  items: CoachItem[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

/**
 * Paramètres pour créer un coach
 */
export interface CreateCoachDto {
  nom: string;
  prenom: string;
  email: string;
  referentielId: string;
  specialite?: string;
}

// ============================================
// API
// ============================================

/**
 * Récupère la liste des coaches.
 *
 * @returns Promesse avec la liste des coaches
 */
export async function getCoaches(): Promise<CoachItem[]> {
  const res = await api.get("/coaches");
  return extractApiItems<CoachItem>(res);
}

/**
 * Crée un nouveau coach.
 *
 * @param data - Données du coach à créer
 * @returns Promesse avec le coach créé
 */
export async function createCoach(data: CreateCoachDto): Promise<CoachItem> {
  const res = await api.post("/coaches", data);
  return extractApiData<CoachItem>(res) as CoachItem;
}
