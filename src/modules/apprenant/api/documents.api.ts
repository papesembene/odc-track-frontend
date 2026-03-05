/**
 * API pour les documents (apprenant)
 */
import { api } from "@/core/api/axios";

// ============================================
// TYPES
// ============================================

export interface DocumentApi {
  id: string;
  type: string;
  fichier: string;
  dateUpload?: string;
  createdAt?: string;
}

export interface SituationApi {
  id: string;
  statut: string;
  valide: boolean;
  dateDebut: string;
  dateFin: string | null;
  commentaire: string | null;
  entreprise?: { nom?: string | null } | null;
  nomEntrepriseLibre?: string | null;
  documents?: DocumentApi[];
}

// ============================================
// FONCTIONS API
// ============================================

/** Récupère les situations avec leurs documents */
export async function getSituationsAvecDocuments(): Promise<SituationApi[]> {
  const { data } = await api.get("/apprenants/me/situations");
  return data?.data ?? [];
}

/** Récupère le chemin du fichier pour un document */
export async function getDocumentPath(
  documentId: string,
): Promise<string | undefined> {
  const { data } = await api.get(`/documents/${documentId}`);
  return data?.data?.fichier as string | undefined;
}

/** Supprime un document */
export async function deleteDocument(documentId: string): Promise<void> {
  await api.delete(`/documents/${documentId}`);
}

/** Upload un document */
export async function uploadDocument(
  situationId: string,
  type: string,
  file: File,
): Promise<DocumentApi> {
  const formData = new FormData();
  formData.append("fichier", file);
  formData.append("type", type);
  formData.append("situationId", situationId);

  const { data } = await api.post("/documents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}

// ============================================
// UTILITAIRES
// ============================================

/** Extrait le nom du fichier depuis un chemin */
export function extractFileName(path: string): string {
  if (!path) return "Document";
  const chunks = path.split("/");
  return chunks[chunks.length - 1] || path;
}

/** Résout l'URL complète du fichier */
export function resolveFileUrl(filePath: string): string {
  if (!filePath) return "";
  if (filePath.startsWith("http://") || filePath.startsWith("https://"))
    return filePath;

  const baseUrl = String(api.defaults.baseURL ?? "");
  const origin = baseUrl.replace(/\/api\/v\d+\/?$/, "");
  const normalizedPath = filePath.startsWith("/") ? filePath : `/${filePath}`;
  return `${origin}${normalizedPath}`;
}

// ============================================
// TYPES POUR L'UI
// ============================================

export type DocStatus = "Validée" | "En attente" | "En cours" | "Rejetée";
export type SituationType = "Stage" | "Emploi" | "Alternance" | "Projet";

export type SituationStatut =
  | "RECHERCHE_EMPLOI"
  | "EN_STAGE"
  | "EN_EMPLOI"
  | "PROJET_PERSO"
  | "POURSUITE_ETUDES";

// ============================================
// FONCTIONS DE MAPPAGE
// ============================================

/** Convertit le statut API en type UI */
export function mapType(statut: SituationStatut): SituationType {
  if (statut === "EN_STAGE") return "Stage";
  if (statut === "EN_EMPLOI") return "Emploi";
  if (statut === "POURSUITE_ETUDES") return "Alternance";
  return "Projet";
}

/** Convertit le statut API en statut document */
export function mapStatus(item: SituationApi): DocStatus {
  if (item.valide) return "Validée";
  if (!item.dateFin) return "En cours";

  const endDate = new Date(item.dateFin);
  const today = new Date();
  if (!Number.isNaN(endDate.getTime()) && endDate >= today) return "En cours";
  return "En attente";
}

/** Formate une date pour l'affichage */
export function formatDate(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("fr-FR");
}
