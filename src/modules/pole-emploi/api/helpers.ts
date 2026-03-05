/**
 * Fonction utilitaire pour extraire les données depuis les réponses API.
 * Gère différentes structures de réponse:
 * - res.data est un tableau directement
 * - res.data.data est un tableau (structure imbriquée)
 * - res.data.data.items est un tableau (structure paginée)
 *
 * @param res - Réponse HTTP de l'API
 * @returns Tableau d'éléments ou tableau vide par défaut
 */
export function extractItems(res: any): any[] {
  const data = res?.data;
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.data?.items)) return data.data.items;
  if (data.success && Array.isArray(data.data?.items)) return data.data.items;
  return [];
}
