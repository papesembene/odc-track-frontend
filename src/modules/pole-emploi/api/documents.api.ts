import { api } from "../../../core/api/axios";

/**
 * Type pour un document
 */
export type Document = {
  id: string;
  type: string;
  fichier: string;
  situationId: string | null;
  createdAt: string;
};

/**
 * Type pour une situation avec info de contexte
 */
export type SituationContext = {
  id: string;
  statut: string;
  entreprise?: {
    nom: string;
  };
};

/**
 * Récupère les documents d'un apprenant
 * @param apprenantId - ID de l'apprenant
 * @returns Liste des documents avec situationId
 */
export async function getDocumentsByApprenant(
  apprenantId: string,
): Promise<Document[]> {
  const res = await api.get(`/apprenants/${apprenantId}/documents`);
  // API returns { items: [...], pagination: {...} }
  return res?.data?.data?.items ?? [];
}

/**
 * Récupère les documents d'une situation
 * @param situationId - ID de la situation
 * @returns Liste des documents
 */
export async function getDocumentsBySituation(
  situationId: string,
): Promise<Document[]> {
  const res = await api.get(`/situations/${situationId}/documents`);
  return res?.data?.data ?? [];
}
