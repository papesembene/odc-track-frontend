import { api } from "../../../core/api/axios";

/**
 * Valide une situation professionnelle.
 * Une fois validée, la situation passe du statut "en attente" à "validée".
 * 
 * @param id - UUID de la situation à valider
 * @returns Réponse de l'API
 */
export async function validateSituation(id: string) {
  const res = await api.patch(`/situations/${id}/validation`, { valide: true });
  return res?.data;
}

/**
 * Rejette une situation professionnelle avec un motif de refus.
 * La situation est marquée comme non valide (valide: false) avec un commentaire.
 * 
 * @param id - UUID de la situation à rejeter
 * @param commentaire - Motif du rejet (obligatoire)
 * @returns Réponse de l'API
 */
export async function rejectSituation(id: string, commentaire: string) {
  const res = await api.patch(`/situations/${id}/validation`, {
    valide: false,
    commentaire,
  });
  return res?.data;
}
