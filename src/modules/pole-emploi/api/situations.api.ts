import { api } from "../../../core/api/axios";
import { extractItems } from "./helpers";

type PromotionOption = {
  id: string;
  nom: string;
  annee?: number;
  createdAt?: string;
};

type ReferentielOption = {
  id: string;
  nom: string;
  createdAt?: string;
};

type PendingSituation = {
  id: string;
  statut: string;
  dateDebut: string;
  dateFin: string | null;
  createdAt: string;
  nomEntrepriseLibre?: string | null;
  entreprise?: { nom?: string | null } | null;
  apprenant: {
    user: {
      nom: string;
      prenom: string;
    };
    promotion: {
      nom: string;
    };
    referentiel: {
      nom: string;
    };
  };
};

export interface PendingSituationsQuery {
  search?: string;
  promotionId?: string;
  referentielId?: string;
  statut?: string;
}

/**
 * Récupère la liste des situations professionnelles en attente de validation.
 * @returns Tableau de situations en attente
 */
export async function getSituationsEnAttente(
  query?: PendingSituationsQuery,
): Promise<PendingSituation[]> {
  const res = await api.get("/situations/attentes", { params: query });
  return extractItems<PendingSituation>(res);
}

/**
 * Récupère la liste de toutes les promotions.
 * @returns Tableau de promotions
 */
export async function getPromotions(): Promise<PromotionOption[]> {
  const res = await api.get("/promotions");
  return extractItems<PromotionOption>(res);
}

/**
 * Récupère la promotion active.
 * Le pôle emploi l'utilise comme filtre initial, sans empêcher ensuite
 * la consultation d'une autre promotion.
 */
export async function getActivePromotion(): Promise<PromotionOption | null> {
  const res = await api.get("/promotions/active");
  return res?.data?.data || null;
}

/**
 * Récupère la liste de tous les référentiels.
 * @returns Tableau de référentiels
 */
export async function getReferentiels(): Promise<ReferentielOption[]> {
  const res = await api.get("/referentiels");
  return extractItems<ReferentielOption>(res);
}
