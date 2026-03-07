/**
 * API pour les promotions et référentiels (Manager)
 */
import { api } from "@/core/api/axios";
import {
  extractApiData,
  extractApiItems,
  extractApiPagination,
} from "@/core/api/response";

// ============================================
// TYPES
// ============================================

/**
 * Type représentant une promotion
 */
export type PromotionItem = {
  id: string;
  nom: string;
  annee: number;
  estActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  referentiels?: Array<{
    referentielId: string;
    referentiel: ReferentielItem;
  }>;
};

export type PromotionWithReferentiels = PromotionItem;

/**
 * Type représentant un référentiel
 */
export type ReferentielItem = {
  id: string;
  nom: string;
  description?: string;
};

export type PromotionsPagination = {
  items: PromotionItem[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

export interface PromotionInput {
  nom: string;
  annee: number;
  referentielIds: string[];
}

// ============================================
// API
// ============================================

/**
 * Récupère la liste des promotions.
 *
 * @returns Promesse avec la liste des promotions
 */
export async function getPromotions(): Promise<PromotionsPagination> {
  const res = await api.get("/promotions");
  return {
    items: extractApiItems<PromotionItem>(res),
    pagination: extractApiPagination(res),
  };
}

/**
 * Récupère la liste des référentiels.
 *
 * @returns Promesse avec la liste des référentiels
 */
export async function getReferentiels(): Promise<ReferentielItem[]> {
  const res = await api.get("/referentiels");
  return extractApiItems<ReferentielItem>(res);
}

/**
 * Active une promotion (désactive automatiquement les autres)
 *
 * @param id - ID de la promotion à activer
 * @returns Promesse avec la promotion activée
 */
export async function activatePromotion(id: string): Promise<PromotionItem> {
  const res = await api.post(`/promotions/${id}/activate`);
  return extractApiData<PromotionItem>(res) as PromotionItem;
}

/**
 * Récupère la promotion active
 *
 * @returns Promesse avec la promotion active ou null
 */
export async function getActivePromotion(): Promise<PromotionWithReferentiels | null> {
  const res = await api.get("/promotions/active");
  return extractApiData<PromotionWithReferentiels | null>(res);
}

export async function createPromotion(
  payload: PromotionInput,
): Promise<PromotionWithReferentiels> {
  const res = await api.post("/promotions", payload);
  return extractApiData<PromotionWithReferentiels>(res) as PromotionWithReferentiels;
}
