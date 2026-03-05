import { api } from "../../../core/api/axios";
import { extractItems } from "./helpers";

/**
 * Récupère la liste des situations professionnelles en attente de validation.
 * @returns Tableau de situations en attente
 */
export async function getSituationsEnAttente() {
  const res = await api.get("/situations/attentes");
  return extractItems(res);
}

/**
 * Récupère la liste de toutes les promotions.
 * @returns Tableau de promotions
 */
export async function getPromotions() {
  const res = await api.get("/promotions");
  return extractItems(res);
}

/**
 * Récupère la liste de tous les référentiels.
 * @returns Tableau de référentiels
 */
export async function getReferentiels() {
  const res = await api.get("/referentiels");
  return extractItems(res);
}
