<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import BackofficeLayout from "@/shared/layouts/BackofficeLayout.vue";
import ValidationCard from "@/modules/pole-emploi/components/ValidationCard.vue";
import { showToast } from "../../../core/ui/toast";
import {
  getActivePromotion,
  getSituationsEnAttente,
  getPromotions,
  getReferentiels,
} from "../api/situations.api";
import { validateSituation, rejectSituation } from "../api/validations.api";
import EmptyState from "@/shared/components/EmptyState.vue";
import PageLoadingState from "@/shared/components/PageLoadingState.vue";

/**
 * État local des données
 */
// Liste des situations professionnelles à valider
const items = ref<ValidationItem[]>([]);
// Liste des promotions pour le filtre (chargée depuis l'API)
const promotionsList = ref<{ id: string; nom: string }[]>([]);
// Liste des référentiels pour le filtre (chargée depuis l'API)
const referentielsList = ref<{ id: string; nom: string }[]>([]);
// Indicateur de chargement
const isLoading = ref(true);
const activePromotion = ref<{ id: string; nom: string; annee?: number } | null>(null);

/**
 * Charge les filtres (promotions et référentiels) depuis l'API.
 * Ces données servent à populate les dropdowns de filtrage.
 */
async function loadFilters() {
  try {
    // Requêtes parallèles pour optimiser les performances
    const [promData, refData] = await Promise.all([
      getPromotions(),
      getReferentiels(),
    ]);
    promotionsList.value = promData;
    referentielsList.value = refData;
    activePromotion.value = await getActivePromotion();

    if (!filterPromotion.value && activePromotion.value?.nom) {
      filterPromotion.value = activePromotion.value.nom;
    }
  } catch (error) {
    console.error("Erreur lors du chargement des filtres:", error);
  }
}

/**
 * Charge les situations professionnelles en attente de validation.
 * Transforme les données API en format compatible avec le composant.
 */
async function loadValidations() {
  isLoading.value = true;
  try {
    const data = await getSituationsEnAttente();

    // Transformation des données API en format pour l'affichage
    items.value = data.map((item: any) => ({
      id: item.id,
      // Concaténation du prénom et nom de l'apprenant
      name: `${item.apprenant.user.prenom} ${item.apprenant.user.nom}`,
      // Initiales pour l'avatar (premières lettres du prénom et nom)
      initials:
        `${item.apprenant.user.prenom[0]}${item.apprenant.user.nom[0]}`.toUpperCase(),
      status: "En attente",
      // On garde le code backend pour les filtres et un libellé lisible pour l'UI.
      type: formatSituationType(item.statut),
      typeCode: item.statut,
      // Nom de l'entreprise (ou nom libre si pas d'entreprise enregistrée)
      entreprise: item.entreprise?.nom || item.nomEntrepriseLibre || "-",
      promotion: item.apprenant.promotion.nom,
      referentiel: item.apprenant.referentiel.nom,
      // Formatage des dates en français
      debut: new Date(item.dateDebut).toLocaleDateString("fr-FR"),
      fin: item.dateFin
        ? new Date(item.dateFin).toLocaleDateString("fr-FR")
        : "-",
      createdAt: new Date(item.createdAt).toLocaleDateString("fr-FR"),
    }));
  } catch (error: any) {
    const msg = error?.response?.data?.message || "Erreur lors du chargement";
    showToast(msg, "error");
  } finally {
    isLoading.value = false;
  }
}

// Chargement des données au montage du composant
onMounted(async () => {
  await loadFilters();
  await loadValidations();
});

/**
 * Type TypeScript pour les données d'une situation à valider
 */
type ValidationItem = {
  id: string;
  name: string;
  initials: string;
  status: string;
  type: string;
  typeCode: string;
  entreprise: string;
  promotion: string;
  referentiel: string;
  debut: string;
  fin: string;
  createdAt: string;
};

/**
 * État des filtres
 */
// Recherche textuelle par nom d'apprenant
const searchQuery = ref("");
// Filtre par promotion (nom de la promotion)
const filterPromotion = ref("");
// Filtre par référentiel (nom du référentiel)
const filterReferentiel = ref("");
// Filtre par type de situation
const filterType = ref("");

/**
 * Correspondance avec les vrais statuts backend.
 */
const typeLabels: Record<string, string> = {
  EN_STAGE: "Stage",
  EN_EMPLOI: "Emploi",
  RECHERCHE_EMPLOI: "Recherche d'emploi",
  PROJET_PERSO: "Projet perso",
  POURSUITE_ETUDES: "Poursuite d'études",
};

// Liste des types disponibles pour le filtre
const types = Object.keys(typeLabels);

function formatSituationType(type: string): string {
  return typeLabels[type] || type;
}

/**
 * Computed: Liste des promotions pour le dropdown
 * Transforme la liste d'objets en tableau de noms
 */
const promotions = computed(() => promotionsList.value.map((p) => p.nom));

/**
 * Computed: Liste des référentiels pour le dropdown
 * Transforme la liste d'objets en tableau de noms
 */
const referentiels = computed(() => referentielsList.value.map((r) => r.nom));

/**
 * Computed: Filtre intelligent des situations
 * Applique tous les filtres actifs (recherche, promotion, référentiel, type)
 */
const filtered = computed(() => {
  return items.value.filter((item) => {
    // Filtre par nom (recherche textuelle)
    const q = searchQuery.value.toLowerCase();
    if (q && !item.name.toLowerCase().includes(q)) return false;

    // Filtre par promotion
    if (filterPromotion.value && item.promotion !== filterPromotion.value)
      return false;

    // Filtre par référentiel
    if (filterReferentiel.value && item.referentiel !== filterReferentiel.value)
      return false;

    // Filtre par type de situation
    if (filterType.value && item.typeCode !== filterType.value) return false;

    return true;
  });
});

/**
 * Valide une situation professionnelle.
 * Envoie une requête API pour marquer la situation comme validée.
 * Retire ensuite l'élément de la liste locale.
 *
 * @param id - UUID de la situation à valider
 */
async function handleValidate(id: string) {
  try {
    await validateSituation(id);
    // Retirer l'élément de la liste locale après validation
    items.value = items.value.filter((i) => i.id !== id);
    showToast("Situation validée avec succès", "success");
  } catch (error: any) {
    const msg =
      error?.response?.data?.message || "Erreur lors de la validation";
    showToast(msg, "error");
  }
}

/**
 * Ouvre le modal de rejet pour une situation.
 * Prépare le state pour le motif de rejet.
 *
 * @param id - UUID de la situation à rejeter
 */
function handleReject(id: string) {
  currentItemId.value = id;
  rejectMotif.value = "";
  showRejectModal.value = true;
}

/**
 * État du modal de rejet
 */
const showRejectModal = ref(false);
const rejectMotif = ref("");
const currentItemId = ref<string | null>(null);

/**
 * Confirme le rejet d'une situation avec un motif.
 * Envoie une requête API pour marquer la situation comme rejetée.
 *
 * @throws Affiche une erreur si le motif est vide ou si l'API échoue
 */
async function confirmReject() {
  try {
    await rejectSituation(currentItemId.value!, rejectMotif.value);
    // Retirer l'élément de la liste locale après rejet
    items.value = items.value.filter((i) => i.id !== currentItemId.value);
    showRejectModal.value = false;
    showToast("Situation rejetée", "info");
  } catch (error: any) {
    showToast(error?.response?.data?.message || "Erreur", "error");
  }
}
</script>

<template>
  <BackofficeLayout title="Validations" active-menu="validations">
    <div class="space-y-5">
      <!-- ── Hero Banner ── -->
      <div
        class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-xl shadow-orange-500/20 lg:p-8"
      >
        <div
          class="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/10"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-8 right-8 h-36 w-36 rounded-full bg-white/10"
        ></div>
        <div
          class="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div
              class="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-amber-300"></span>
              <span class="text-xs font-semibold"
                >{{
                  isLoading
                    ? "Chargement des validations..."
                    : `${items.length} en attente de validation`
                }}</span
              >
            </div>
            <h2 class="text-2xl font-extrabold leading-tight sm:text-3xl">
              Validations
            </h2>
            <p class="mt-1 text-sm text-orange-100">
              Gérez les situations professionnelles soumises
            </p>
            <p class="mt-2 text-xs font-medium text-orange-100/90">
              {{
                activePromotion
                  ? `Filtre initial : promotion active ${activePromotion.nom}${activePromotion.annee ? ` (${activePromotion.annee})` : ""}`
                  : "Aucune promotion active détectée"
              }}
            </p>
          </div>
          <div class="rounded-2xl bg-white/15 px-6 py-3 text-center shrink-0">
            <p v-if="isLoading" class="h-9 w-16 animate-pulse rounded bg-white/20"></p>
            <p v-else class="text-3xl font-extrabold">{{ filtered.length }}</p>
            <p class="text-xs text-orange-100 mt-0.5">
              situation{{ filtered.length > 1 ? "s" : "" }}
            </p>
          </div>
        </div>
      </div>

      <!-- ── Filters ── -->
      <section
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div class="flex flex-wrap items-center gap-3">
          <!-- Search -->
          <div
            class="flex h-10 flex-1 min-w-52 items-center gap-2 rounded-xl border border-slate-300 px-3 focus-within:border-orange-400 transition-colors"
          >
            <svg
              class="h-4 w-4 shrink-0 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher par nom..."
              class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <!-- Promotion -->
          <div
            class="relative flex h-10 min-w-40 items-center rounded-xl border border-slate-300 px-3"
          >
            <select
              v-model="filterPromotion"
              class="w-full appearance-none bg-transparent text-sm text-slate-700 outline-none pr-5"
            >
              <option value="">Toutes les promotions</option>
              <option v-for="p in promotions" :key="p" :value="p">
                {{ p }}
              </option>
            </select>
            <svg
              class="pointer-events-none absolute right-3 h-3.5 w-3.5 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          <!-- Référentiel -->
          <div
            class="relative flex h-10 min-w-44 items-center rounded-xl border border-slate-300 px-3"
          >
            <select
              v-model="filterReferentiel"
              class="w-full appearance-none bg-transparent text-sm text-slate-700 outline-none pr-5"
            >
              <option value="">Tous les référentiels</option>
              <option v-for="r in referentiels" :key="r" :value="r">
                {{ r }}
              </option>
            </select>
            <svg
              class="pointer-events-none absolute right-3 h-3.5 w-3.5 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          <!-- Type -->
          <div
            class="relative flex h-10 min-w-36 items-center rounded-xl border border-slate-300 px-3"
          >
            <select
              v-model="filterType"
              class="w-full appearance-none bg-transparent text-sm text-slate-700 outline-none pr-5"
            >
              <option value="">Tous les types</option>
              <option v-for="t in types" :key="t" :value="t">
                {{ typeLabels[t] }}
              </option>
            </select>
            <svg
              class="pointer-events-none absolute right-3 h-3.5 w-3.5 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </section>

      <!-- ── List ── -->
      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 px-6 py-5">
          <h2 class="text-base font-bold text-slate-900">
            {{
              isLoading
                ? "Chargement des situations..."
                : `${filtered.length} situation${filtered.length > 1 ? "s" : ""} en attente`
            }}
          </h2>
          <p class="mt-0.5 text-sm text-slate-500">
            Cliquez sur Valider ou Rejeter pour traiter chaque situation
          </p>
        </div>

        <PageLoadingState
          v-if="isLoading"
          compact
          message="Chargement des situations en attente..."
        />

        <!-- Empty state -->
        <EmptyState
          v-else-if="filtered.length === 0"
          title="Tout est traité !"
          description="Aucune situation ne correspond à vos filtres"
        />

        <ValidationCard
          v-for="item in filtered"
          :key="item.id"
          :name="item.name"
          :initials="item.initials"
          :status="item.status"
          :type="item.type"
          :entreprise="item.entreprise"
          :promotion="item.promotion"
          :referentiel="item.referentiel"
          :debut="item.debut"
          :fin="item.fin"
          :created-at="item.createdAt"
          @validate="handleValidate(item.id)"
          @reject="handleReject(item.id)"
        />
      </section>
    </div>

    <!-- Rejection Modal -->
    <div
      v-if="showRejectModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">Motif du rejet</h3>
        <textarea
          v-model="rejectMotif"
          class="w-full border rounded-lg p-3"
          rows="3"
          placeholder="Entrez le motif..."
        ></textarea>
        <div class="flex gap-3 mt-4">
          <button
            @click="showRejectModal = false"
            class="flex-1 py-2 border rounded-lg"
          >
            Annuler
          </button>
          <button
            @click="confirmReject"
            class="flex-1 py-2 bg-red-500 text-white rounded-lg"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  </BackofficeLayout>
</template>
