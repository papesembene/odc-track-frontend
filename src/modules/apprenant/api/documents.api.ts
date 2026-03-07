/**
 * API pour les documents (apprenant)
 */
import { api } from "@/core/api/axios";
import { extractApiData, extractApiItems } from "@/core/api/response";

// ============================================
// TYPES
// ============================================

export interface DocumentApi {
  id: string;
  type: string;
  fichier: string;
  situationId?: string | null;
  dateUpload?: string;
  createdAt?: string;
  updatedAt?: string;
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
  const res = await api.get("/apprenants/me/situations");
  return extractApiItems<SituationApi>(res);
}

/** Récupère le chemin du fichier pour un document */
export async function getDocumentPath(
  documentId: string,
): Promise<string | undefined> {
  const res = await api.get(`/documents/${documentId}`);
  return extractApiData<{ fichier?: string }>(res)?.fichier;
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
  // L'endpoint apprenant attend le champ multipart "file".
  formData.append("file", file);
  formData.append("type", type);
  formData.append("situationId", situationId);

  const res = await api.post("/apprenants/me/documents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return extractApiData<DocumentApi>(res) as DocumentApi;
}

/** Upload ou remplace le CV global de l'apprenant connecté */
export async function uploadMyCv(file: File): Promise<DocumentApi> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/apprenants/me/cv", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return extractApiData<DocumentApi>(res) as DocumentApi;
}

/** Récupère le CV global de l'apprenant connecté (si présent) */
export async function getMyCv(): Promise<DocumentApi | null> {
  const res = await api.get("/apprenants/me");
  return extractApiData<{ cvDocument?: DocumentApi | null }>(res)?.cvDocument ?? null;
}

// ============================================
// UTILITAIRES
// ============================================

/** Extrait le nom du fichier depuis un chemin */
export function extractFileName(path: string): string {
  if (!path) return "Document";

  // Les URLs signées (B2/S3/R2) contiennent des query params techniques.
  // On les retire pour n'afficher que le vrai nom du fichier dans l'UI.
  const cleanPath = path.split("?")[0] || path;
  const chunks = cleanPath.split("/");
  return chunks[chunks.length - 1] || cleanPath;
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
