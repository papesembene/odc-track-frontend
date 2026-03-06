/**
 * API pour les situations professionnelles (apprenant)
 */
import { api } from "@/core/api/axios";
import { extractApiData, extractApiItems } from "@/core/api/response";

// ============================================
// TYPES
// ============================================

export type SituationStatut =
  | "RECHERCHE_EMPLOI"
  | "EN_STAGE"
  | "EN_EMPLOI"
  | "PROJET_PERSO"
  | "POURSUITE_ETUDES";

export interface SituationApi {
  id: string;
  statut: SituationStatut;
  valide: boolean;
  dateDebut: string;
  dateFin: string | null;
  commentaire: string | null;
  entreprise?: {
    nom?: string | null;
    secteur?: string | null;
    adresse?: string | null;
  } | null;
  nomEntrepriseLibre?: string | null;
  secteurEntrepriseLibre?: string | null;
  adresseEntrepriseLibre?: string | null;
}

// Type pour l'UI (affichage)
export type UiType = "Stage" | "Emploi" | "Alternance" | "Projet";
export type UiStatus = "En cours" | "En attente" | "Validée" | "Rejetée";

export interface SituationItem {
  id: string;
  type: UiType;
  status: UiStatus;
  entreprise: string;
  isExternal: boolean;
  secteur?: string;
  adresse?: string;
  description: string;
  dateDebut: string;
  dateFin?: string;
  feedback?: string;
}

// ============================================
// FONCTIONS API
// ============================================

/** Récupère les situations de l'apprenant connecté */
export async function getMesSituations(): Promise<SituationApi[]> {
  const res = await api.get("/apprenants/me/situations");
  return extractApiItems<SituationApi>(res);
}

// ============================================
// UTILITAIRES DE MAPPAGE
// ============================================

/** Convertit le statut API en type UI */
export function mapType(statut: SituationStatut): UiType {
  if (statut === "EN_STAGE") return "Stage";
  if (statut === "EN_EMPLOI") return "Emploi";
  if (statut === "PROJET_PERSO") return "Projet";
  if (statut === "POURSUITE_ETUDES") return "Alternance";
  return "Emploi";
}

/** Convertit le statut API en statut UI */
export function mapStatus(item: SituationApi): UiStatus {
  if (item.valide) return "Validée";
  if (!item.dateFin) return "En cours";

  const endDate = new Date(item.dateFin);
  const today = new Date();
  if (!Number.isNaN(endDate.getTime()) && endDate >= today) return "En cours";

  return "En attente";
}

/** Transforme une situation API en item UI */
export function mapToSituationItem(item: SituationApi): SituationItem {
  const isExternal = Boolean(item.nomEntrepriseLibre);
  return {
    id: item.id,
    type: mapType(item.statut),
    status: mapStatus(item),
    entreprise: item.entreprise?.nom || item.nomEntrepriseLibre || "—",
    isExternal,
    secteur:
      item.entreprise?.secteur || item.secteurEntrepriseLibre || undefined,
    adresse:
      item.entreprise?.adresse || item.adresseEntrepriseLibre || undefined,
    description: item.commentaire || "Aucune description",
    dateDebut: item.dateDebut,
    dateFin: item.dateFin || undefined,
    feedback: item.valide ? "Situation validée" : undefined,
  };
}

/** Formate une date pour l'affichage */
export function formatDate(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ============================================
// TYPES POUR L'UI
// ============================================

export type UiSituationType = "STAGE" | "EMPLOI" | "ALTERNANCE" | "PROJET";
export type CompanyMode = "PARTNER" | "EXTERNAL";

export interface EntreprisePartner {
  id: string;
  nom: string;
}

export interface DocumentApi {
  id: string;
  type: string;
  fichier: string;
  createdAt?: string;
  dateUpload?: string;
}

// ============================================
// FONCTIONS API SUPPLÉMENTAIRES
// ============================================

/** Récupère la liste des entreprises partenaires */
export async function getEntreprises(
  page: number = 1,
  limit: number = 100,
): Promise<EntreprisePartner[]> {
  const { data } = await api.get("/entreprises", {
    params: { page, limit },
  });
  return data?.data?.items ?? [];
}

/** Crée une nouvelle situation pour l'apprenant connecté */
export async function createSituationForApprenant(payload: {
  statut: string;
  dateDebut: string;
  dateFin?: string;
  commentaire?: string;
  entrepriseId?: string;
  nomEntrepriseLibre?: string;
  secteurEntrepriseLibre?: string;
  adresseEntrepriseLibre?: string;
}): Promise<SituationApi> {
  const res = await api.post("/apprenants/me/situations", payload);
  return extractApiData<SituationApi>(res) as SituationApi;
}

/** Récupère le détail d'une situation par ID */
export async function getSituationById(
  id: string,
): Promise<SituationApi | null> {
  const res = await api.get(`/situations/${id}`);
  return extractApiData<SituationApi | null>(res);
}

/** Récupère les documents d'une situation */
export async function getSituationDocuments(
  situationId: string,
): Promise<DocumentApi[]> {
  const res = await api.get(`/situations/${situationId}/documents`);
  return extractApiItems<DocumentApi>(res);
}
