/**
 * API pour les statistiques
 */
import { api } from "@/core/api/axios";

// ============================================
// TYPES
// ============================================

/** Stats par statut */
export interface ParStatut {
  EN_EMPLOI: number;
  EN_STAGE: number;
  RECHERCHE_EMPLOI: number;
  PROJET_PERSO: number;
  POURSUITE_ETUDES: number;
}

/** Stats d'une promotion */
export interface ParPromotion {
  promotionId: string;
  promotionNom: string;
  total: number;
  enEmploi: number;
}

/** Stats d'un référentiel */
export interface ParReferentiel {
  referentielId: string;
  referentielNom: string;
  total: number;
  enEmploi: number;
}

/** Situation récente */
export interface SituationRecente {
  id: string;
  statut: string;
  createdAt: string;
  valide: boolean;
  apprenant: {
    user: {
      nom: string;
      prenom: string;
    };
  };
}

/** Stats globales */
export interface StatistiquesGlobales {
  totalApprenants: number;
  totalSituations: number;
  enAttente: number;
  validees: number;
  tauxInsertion: number;
  parStatut: ParStatut;
  parPromotion: ParPromotion[];
  parReferentiel: ParReferentiel[];
  situationsRecentes: SituationRecente[];
}

/** Stats par promotion (détail) */
export interface StatistiquesPromotion {
  promotion: { id: string; nom: string; annee: number };
  totalApprenants: number;
  totalSituations: number;
  enAttente: number;
  validees: number;
  tauxInsertion: number;
  parStatut: ParStatut;
}

/** Stats par référentiel (détail) */
export interface StatistiquesReferentiel {
  referentiel: { id: string; nom: string };
  totalApprenants: number;
  tauxInsertion: number;
  parStatut: ParStatut;
}

// ============================================
// API
// ============================================

/** Stats globales */
export async function getStatistiques(): Promise<StatistiquesGlobales> {
  const res = await api.get("/statistiques/globales");
  return res.data.data;
}

/** Stats par promotion */
export async function getStatistiquesPromotion(
  promotionId: string
): Promise<StatistiquesPromotion> {
  const res = await api.get(`/statistiques/promotions/${promotionId}`);
  return res.data.data;
}

/** Stats par référentiel */
export async function getStatistiquesReferentiel(
  referentielId: string
): Promise<StatistiquesReferentiel> {
  const res = await api.get(`/statistiques/referentiels/${referentielId}`);
  return res.data.data;
}
