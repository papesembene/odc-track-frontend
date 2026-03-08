import { api } from "../../../core/api/axios";

/**
 * Type pour une entreprise
 */
export type Entreprise = {
  id: string;
  nom: string;
  secteur: string | null;
  adresse: string | null;
  telephone: string | null;
  email: string | null;
  createdAt: string;
};

/**
 * Type pour la pagination des entreprises
 */
export type EntreprisesPagination = {
  items: Entreprise[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

/**
 * Paramètres de requête pour la liste des entreprises
 */
export interface EntreprisesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * Récupère la liste paginée des entreprises
 */
export async function getEntreprises(
  query?: EntreprisesQueryParams,
): Promise<EntreprisesPagination> {
  const params = new URLSearchParams();
  if (query?.page) params.append("page", String(query.page));
  if (query?.limit) params.append("limit", String(query.limit));
  if (query?.search) params.append("search", query.search);

  const queryString = params.toString();
  const url = queryString ? `/entreprises?${queryString}` : "/entreprises";

  const res = await api.get(url);
  return (
    res?.data?.data ?? {
      items: [],
      pagination: { page: 1, limit: 10, totalItems: 0, totalPages: 0 },
    }
  );
}

/**
 * Récupère une entreprise par son ID
 */
export async function getEntrepriseById(
  id: string,
): Promise<Entreprise | null> {
  const res = await api.get(`/entreprises/${id}`);
  return res?.data?.data ?? null;
}

/**
 * Crée une nouvelle entreprise
 */
export async function createEntreprise(data: {
  nom: string;
  secteur?: string;
  adresse?: string;
  telephone?: string;
  email?: string;
}): Promise<Entreprise> {
  const res = await api.post("/entreprises", data);
  return res?.data?.data;
}

/**
 * Met à jour une entreprise
 */
export async function updateEntreprise(
  id: string,
  data: {
    nom?: string;
    secteur?: string;
    adresse?: string;
    telephone?: string;
    email?: string;
  },
): Promise<Entreprise> {
  const res = await api.put(`/entreprises/${id}`, data);
  return res?.data?.data;
}

/**
 * Supprime une entreprise
 */
export async function deleteEntreprise(id: string): Promise<void> {
  await api.delete(`/entreprises/${id}`);
}
