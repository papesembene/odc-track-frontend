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

export interface ImportResult {
  totalRows: number;
  createdCount: number;
  failedCount: number;
  errors: RowError[];
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
