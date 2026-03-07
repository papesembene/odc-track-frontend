/**
 * API pour les promotions et référentiels (Manager)
 */
import { api } from "@/core/api/axios";
import { extractApiData, extractApiItems } from "@/core/api/response";

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
};

export type PromotionWithReferentiels = PromotionItem & {
  referentiels?: Array<{
    referentielId: string;
    referentiel: ReferentielItem;
  }>;
};

/**
 * Type représentant un référentiel
 */
export type ReferentielItem = {
  id: string;
  nom: string;
  description?: string;
};

// ============================================
// API
// ============================================

/**
 * Récupère la liste des promotions.
 *
 * @returns Promesse avec la liste des promotions
 */
export async function getPromotions(): Promise<PromotionItem[]> {
  const res = await api.get("/promotions");
  return extractApiItems<PromotionItem>(res);
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
