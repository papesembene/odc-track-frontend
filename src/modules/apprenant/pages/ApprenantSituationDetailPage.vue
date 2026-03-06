<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import ApprenantLayout from "../../../shared/layouts/ApprenantLayout.vue";
import { showToast } from "../../../core/ui/toast";
import {
  getSituationById,
  getSituationDocuments,
  type SituationApi,
  type DocumentApi,
} from "../api/situations.api";

const route = useRoute();
const situation = ref<SituationApi | null>(null);
const documents = ref<DocumentApi[]>([]);
const isLoading = ref(false);

const situationId = computed(() => String(route.params.id ?? ""));

const formatDateDisplay = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("fr-FR");
};

const typeLabel = computed(() => {
  const statut = situation.value?.statut;
  if (!statut) return "Situation";
  if (statut === "EN_STAGE") return "Stage";
  if (statut === "EN_EMPLOI") return "Emploi";
  if (statut === "POURSUITE_ETUDES") return "Alternance";
  if (statut === "PROJET_PERSO") return "Projet";
  return "Recherche emploi";
});

const statusLabel = computed(() => {
  const s = situation.value;
  if (!s) return "—";
  if (s.valide) return "Validée";
  if (!s.dateFin) return "En cours";

  const end = new Date(s.dateFin);
  if (!Number.isNaN(end.getTime()) && end >= new Date()) return "En cours";
  return "En attente";
});

const statusClass = computed(() => {
  if (statusLabel.value === "Validée")
    return "bg-emerald-50 text-emerald-600 border-emerald-200";
  if (statusLabel.value === "En cours")
    return "bg-blue-50 text-blue-600 border-blue-200";
  if (statusLabel.value === "En attente")
    return "bg-amber-50 text-amber-600 border-amber-200";
  return "bg-slate-50 text-slate-600 border-slate-200";
});

const entrepriseNom = computed(
  () =>
    situation.value?.entreprise?.nom ||
    situation.value?.nomEntrepriseLibre ||
    "—",
);

const entrepriseSecteur = computed(
  () =>
    situation.value?.entreprise?.secteur ||
    situation.value?.secteurEntrepriseLibre ||
    "—",
);

const entrepriseAdresse = computed(
  () =>
    situation.value?.entreprise?.adresse ||
    situation.value?.adresseEntrepriseLibre ||
    "—",
);

const loadSituationDetail = async () => {
  if (!situationId.value) return;

  isLoading.value = true;
  try {
    // 1) Détail de la situation.
    const data = await getSituationById(situationId.value);
    situation.value = data;

    // 2) Documents rattachés à la situation (si dispo côté backend).
    try {
      documents.value = await getSituationDocuments(situationId.value);
    } catch {
      documents.value = [];
    }
  } catch (error: any) {
    const apiMessage = error?.response?.data?.message;
    const message = Array.isArray(apiMessage)
      ? apiMessage.join(", ")
      : apiMessage || "Impossible de charger le détail de la situation";
    showToast(message, "error");
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadSituationDetail);
</script>

<template>
  <ApprenantLayout title="Détail situation" active-menu="situations">
    <section class="space-y-5">
      <div class="flex items-center gap-2 text-sm text-slate-500">
        <RouterLink to="/situations" class="hover:text-slate-700"
          >Mes situations</RouterLink
        >
        <span>/</span>
        <span class="font-semibold text-slate-700">Détail</span>
      </div>

      <div
        v-if="isLoading"
        class="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm"
      >
        Chargement du détail...
      </div>

      <div
        v-else-if="!situation"
        class="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm"
      >
        Situation introuvable.
      </div>

      <template v-else>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex flex-wrap items-center gap-3">
            <h2 class="text-xl font-bold text-slate-900">{{ typeLabel }}</h2>
            <span
              class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              :class="statusClass"
            >
              {{ statusLabel }}
            </span>
          </div>

          <p class="mt-3 text-sm text-slate-600">
            {{ situation.commentaire || "Aucune description" }}
          </p>

          <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">
                Entreprise
              </p>
              <p class="mt-1 text-sm font-semibold text-slate-800">
                {{ entrepriseNom }}
              </p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">
                Secteur
              </p>
              <p class="mt-1 text-sm font-semibold text-slate-800">
                {{ entrepriseSecteur }}
              </p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">
                Adresse
              </p>
              <p class="mt-1 text-sm font-semibold text-slate-800">
                {{ entrepriseAdresse }}
              </p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">
                Date début
              </p>
              <p class="mt-1 text-sm font-semibold text-slate-800">
                {{ formatDateDisplay(situation.dateDebut) }}
              </p>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">
                Date fin
              </p>
              <p class="mt-1 text-sm font-semibold text-slate-800">
                {{ formatDateDisplay(situation.dateFin) }}
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-base font-bold text-slate-900">Documents liés</h3>
          <div
            v-if="documents.length === 0"
            class="mt-3 text-sm text-slate-500"
          >
            Aucun document lié à cette situation.
          </div>
          <div v-else class="mt-3 space-y-2">
            <div
              v-for="doc in documents"
              :key="doc.id"
              class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <div>
                <p class="text-sm font-semibold text-slate-800">
                  {{ doc.type }}
                </p>
                <p class="text-xs text-slate-500">
                  {{ formatDateDisplay(doc.dateUpload || doc.createdAt) }}
                </p>
              </div>
              <span class="text-xs text-slate-400">{{
                doc.fichier?.split("/").pop()
              }}</span>
            </div>
          </div>
        </div>
      </template>
    </section>
  </ApprenantLayout>
</template>
