import { api } from "../../../core/api/axios";
import { extractItems } from "./helpers";

type PromotionOption = {
  id: string;
  nom: string;
  annee?: number;
  createdAt?: string;
  estActive?: boolean;
  totalApprenants?: number;
  enEmploi?: number;
  tauxInsertion?: number;
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
  const res = await api.get("/promotions/master-data");
  return extractItems<PromotionOption>(res);
}

/**
 * Récupère la promotion active.
 * Le pôle emploi l'utilise comme filtre initial, sans empêcher ensuite
 * la consultation d'une autre promotion.
 */
export async function getActivePromotion(): Promise<PromotionOption | null> {
  const res = await api.get("/promotions/master-data/active");
  return res?.data?.data || null;
}

/**
 * Récupère la liste de tous les référentiels.
 * @returns Tableau de référentiels
 */
export async function getReferentiels(): Promise<ReferentielOption[]> {
  const res = await api.get("/referentiels/master-data");
  return extractItems<ReferentielOption>(res);
}

/**
 * Récupère les promotions locales de Soutenance.
 * Utilisé pour les cas historiques afin de réutiliser une promotion déjà créée.
 */
export async function getLocalPromotions(): Promise<PromotionOption[]> {
  const res = await api.get("/promotions", {
    params: { page: 1, limit: 100 },
  });
  return extractItems<PromotionOption>(res);
}

/**
 * Récupère les référentiels locaux de Soutenance.
 * Utilisé pour sélectionner un référentiel historique existant.
 */
export async function getLocalReferentiels(): Promise<ReferentielOption[]> {
  const res = await api.get("/referentiels", {
    params: { page: 1, limit: 100 },
  });
  return extractItems<ReferentielOption>(res);
}
