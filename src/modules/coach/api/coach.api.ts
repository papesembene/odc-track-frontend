import { api } from "@/core/api/axios";
import {
  extractApiData,
  extractApiItems,
  extractApiPagination,
} from "@/core/api/response";

export type CoachPromotionOption = {
  id: string;
  nom: string;
  annee: number;
  estActive?: boolean;
};

export type CoachScope = {
  referentiel: {
    id: string;
    nom: string;
  };
  referentielId: string;
  selectedPromotion: CoachPromotionOption | null;
  availablePromotions: CoachPromotionOption[];
};

export type CoachApprenantListItem = {
  id: string;
  telephone: string | null;
  createdAt: string;
  user: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    actif: boolean;
  };
  referentiel: {
    id: string;
    nom: string;
  };
  promotion: {
    id: string;
    nom: string;
    annee: number;
  };
  _count: {
    situations: number;
  };
  situations: Array<{
    id: string;
    statut: string;
    valide: boolean;
    createdAt: string;
  }>;
};

export type CoachApprenantsResponse = {
  items: CoachApprenantListItem[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
  scope: CoachScope;
};

export type CoachApprenantDetail = {
  id: string;
  telephone: string | null;
  user: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    actif: boolean;
  };
  referentiel: {
    id: string;
    nom: string;
  };
  promotion: {
    id: string;
    nom: string;
    annee: number;
  };
  situations: Array<{
    id: string;
    statut: string;
    dateDebut: string;
    dateFin: string | null;
    commentaire: string | null;
    valide: boolean;
    createdAt: string;
    nomEntrepriseLibre: string | null;
    entreprise: {
      id: string;
      nom: string;
      secteur: string | null;
    } | null;
    documents: Array<{
      id: string;
      type: string;
      fichier: string;
      dateUpload?: string | null;
      createdAt?: string;
      situationId: string;
    }>;
  }>;
  cvDocument?: {
    id: string;
    type: string;
    fichier: string;
    dateUpload?: string | null;
    createdAt?: string;
    updatedAt?: string;
  } | null;
  scope: CoachScope;
};

export type CoachDashboard = {
  scope: CoachScope;
  totalApprenants: number;
  totalSituations: number;
  validees: number;
  enAttente: number;
  tauxInsertion: number;
  situationsRecentes: Array<{
    id: string;
    statut: string;
    createdAt: string;
    valide: boolean;
    apprenant: {
      user: {
        nom: string;
        prenom: string;
      };
    };
  }>;
};

export type CoachStatistiques = {
  scope: CoachScope;
  totalApprenants: number;
  totalSituations: number;
  enAttente: number;
  validees: number;
  tauxInsertion: number;
  parStatut: {
    EN_EMPLOI: number;
    EN_STAGE: number;
    RECHERCHE_EMPLOI: number;
    PROJET_PERSO: number;
    POURSUITE_ETUDES: number;
  };
};

export type CoachQuery = {
  promotionId?: string;
};

export type CoachApprenantsQuery = CoachQuery & {
  page?: number;
  limit?: number;
  search?: string;
};

function buildQuery(params?: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== "") {
      query.append(key, String(value));
    }
  }

  return query.toString();
}

// Module coach dedie pour centraliser le scope referentiel + promotion.
export async function getCoachDashboard(
  query?: CoachQuery,
): Promise<CoachDashboard> {
  const queryString = buildQuery(query);
  const res = await api.get(
    queryString
      ? `/coaches/me/dashboard?${queryString}`
      : "/coaches/me/dashboard",
  );
  return extractApiData<CoachDashboard>(res) as CoachDashboard;
}

export async function getCoachStatistiques(
  query?: CoachQuery,
): Promise<CoachStatistiques> {
  const queryString = buildQuery(query);
  const res = await api.get(
    queryString
      ? `/coaches/me/statistiques?${queryString}`
      : "/coaches/me/statistiques",
  );
  return extractApiData<CoachStatistiques>(res) as CoachStatistiques;
}

export async function getCoachApprenants(
  query?: CoachApprenantsQuery,
): Promise<CoachApprenantsResponse> {
  const queryString = buildQuery(query);
  const res = await api.get(
    queryString
      ? `/coaches/me/apprenants?${queryString}`
      : "/coaches/me/apprenants",
  );

  return {
    items: extractApiItems<CoachApprenantListItem>(res),
    pagination: extractApiPagination(res),
    scope: extractApiData<any>(res)?.scope as CoachScope,
  };
}

export async function getCoachApprenantDetail(
  apprenantId: string,
  query?: CoachQuery,
): Promise<CoachApprenantDetail> {
  const queryString = buildQuery(query);
  const res = await api.get(
    queryString
      ? `/coaches/me/apprenants/${apprenantId}?${queryString}`
      : `/coaches/me/apprenants/${apprenantId}`,
  );
  return extractApiData<CoachApprenantDetail>(res) as CoachApprenantDetail;
}

export function formatCoachDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("fr-FR");
}

export function formatCoachStatus(statut: string, valide?: boolean) {
  if (valide) return "Validée";
  if (statut === "EN_EMPLOI") return "En emploi";
  if (statut === "EN_STAGE") return "En stage";
  if (statut === "RECHERCHE_EMPLOI") return "Recherche";
  if (statut === "POURSUITE_ETUDES") return "Études";
  return "Projet";
}
