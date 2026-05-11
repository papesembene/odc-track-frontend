/**
 * API pour l'import des apprenants
 */
import { api } from "../../../core/api/axios";

/**
 * Types pour l'import
 */
export interface RowError {
  line: number;
  message: string;
}

export interface CreatedHistoricalAccount {
  prenom: string;
  nom: string;
  email: string;
  temporaryPassword: string;
}

export interface ImportResult {
  totalRows: number;
  createdCount: number;
  failedCount: number;
  errors: RowError[];
  createdPromotions?: number;
  createdReferentiels?: number;
  createdSituations?: number;
  createdAccounts?: CreatedHistoricalAccount[];
}

/**
 * Importe des apprenants depuis un fichier (par promotion)
 * @param promotionId - ID de la promotion
 * @param file - Fichier CSV ou Excel
 * @returns Résultat de l'import
 */
export async function importApprenantsByPromotion(
  promotionId: string,
  file: File,
): Promise<ImportResult> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.postForm(
    `/promotions/${promotionId}/apprenants/import`,
    formData,
  );

  return res.data.data;
}

/**
 * Importe des apprenants depuis un fichier (par référentiel)
 * @param referentielId - ID du référentiel
 * @param file - Fichier CSV ou Excel
 * @returns Résultat de l'import
 */
export async function importApprenantsByReferentiel(
  referentielId: string,
  file: File,
): Promise<ImportResult> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.postForm(
    `/referentiels/${referentielId}/apprenants/import`,
    formData,
  );

  return res.data.data;
}

export async function importApprenantsHistorique(
  promotionName: string,
  referentialName: string,
  file: File,
): Promise<ImportResult> {
  const formData = new FormData();
  formData.append("promotionName", promotionName);
  formData.append("referentialName", referentialName);
  formData.append("file", file);

  const res = await api.postForm("/apprenants/import/historique", formData);
  return res.data.data;
}

export async function downloadHistoricalImportTemplate(): Promise<Blob> {
  const res = await api.get("/apprenants/import/historique/template", {
    responseType: "blob",
  });

  return res.data as Blob;
}
