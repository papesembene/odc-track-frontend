<script setup lang="ts">
import { RouterLink } from 'vue-router'
import StatCard  from '../../dashboard/components/StatCard.vue'
import { computed, onMounted, ref } from "vue";
import { showToast } from "../../../core/ui/toast";
import { useCurrentUser } from '../../../core/auth/useCurrentUser'
import {
  formatDate,
  getMesSituations,
  mapStatus,
  mapType,
  type SituationApi,
  type UiStatus,
} from "../../apprenant/api/situations.api";

type RecentSituation = {
  id: string;
  title: string;
  status: UiStatus;
  statusClass: string;
  company: string;
  description: string;
  start: string;
  end: string;
};

const situations = ref<SituationApi[]>([]);
const isLoading = ref(false);

const getUiStatus = (item: SituationApi): UiStatus => mapStatus(item);

const statusClassByStatus: Record<UiStatus, string> = {
  Validée: "bg-emerald-100 text-emerald-700",
  "En cours": "bg-blue-100 text-blue-700",
  "En attente": "bg-amber-100 text-amber-700",
  Rejetée: "bg-red-100 text-red-700",
};

const stats = computed(() => {
  const total = situations.value.length;
  const valides = situations.value.filter((item) => item.valide).length;
  const enCours = situations.value.filter((item) => getUiStatus(item) === "En cours").length;
  const enAttente = situations.value.filter((item) => getUiStatus(item) === "En attente").length;

  return { total, enCours, valides, enAttente };
});

const recentSituations = computed<RecentSituation[]>(() =>
  situations.value.slice(0, 3).map((item) => {
    const status = getUiStatus(item);
    return {
      id: item.id,
      title: mapType(item.statut),
      status,
      statusClass: statusClassByStatus[status],
      company: item.entreprise?.nom || item.nomEntrepriseLibre || "—",
      description: item.commentaire || "Aucune description",
      start: formatDate(item.dateDebut),
      end: formatDate(item.dateFin),
    };
  }),
);
const loadSituations = async () => {
  isLoading.value = true;
  try {
    situations.value = await getMesSituations();
  } catch (error: any) {
    const apiMessage = error?.response?.data?.message;
    const message = Array.isArray(apiMessage)
      ? apiMessage.join(", ")
      : apiMessage || "Impossible de charger le dashboard apprenant";
    showToast(message, "error");
  } finally {
    isLoading.value = false;
  }
};
const { userName, hydrateCurrentUser } = useCurrentUser()

onMounted(() => {
  loadSituations()
  hydrateCurrentUser()
})
</script>

<template>
  <section class="space-y-6">

    <!-- ── Welcome Hero ── -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-xl shadow-orange-500/20 lg:p-8">
      <!-- Decorative circles -->
      <div class="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/10"></div>
      <div class="pointer-events-none absolute -bottom-10 right-10 h-40 w-40 rounded-full bg-white/10"></div>
      <div class="pointer-events-none absolute bottom-8 right-52 h-20 w-20 rounded-full bg-white/5"></div>
      <div class="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1">
            <span class="h-2 w-2 rounded-full bg-green-400 ring-2 ring-green-400/30"></span>
            <span class="text-xs font-medium text-white">Espace actif</span>
          </div>
          <h2 class="text-2xl font-extrabold leading-tight lg:text-3xl">Bonjour, {{ userName }} 👋</h2>
          <p class="mt-1.5 max-w-md text-sm leading-relaxed text-orange-100">
            Bienvenue sur votre espace de suivi d'insertion professionnelle. Déclarez et gérez vos situations ici.
          </p>
        </div>
        <RouterLink
          to="/situations/nouvelle"
          class="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-orange-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:self-auto"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nouvelle situation
        </RouterLink>
      </div>
    </div>

    <!-- ── Stats ── -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total situations" :value="String(stats.total)" icon-bg="bg-orange-100">
        <template #icon>
          <svg class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"></rect>
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
          </svg>
        </template>
      </StatCard>

      <StatCard label="En cours" :value="String(stats.enCours)" icon-bg="bg-blue-100" value-class="text-blue-600">
        <template #icon>
          <svg class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </template>
      </StatCard>

      <StatCard label="Validées" :value="String(stats.valides)" icon-bg="bg-emerald-100" value-class="text-emerald-600">
        <template #icon>
          <svg class="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </template>
      </StatCard>

      <StatCard label="En attente" :value="String(stats.enAttente)" icon-bg="bg-amber-100" value-class="text-amber-500">
        <template #icon>
          <svg class="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </template>
      </StatCard>
    </div>

    <!-- ── Quick Actions ── -->
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex items-center gap-2">
        <h3 class="text-base font-bold text-slate-900">Actions rapides</h3>
        <span class="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">3</span>
      </div>
      <div class="mt-4 grid gap-3 md:grid-cols-3">

        <RouterLink
          to="/situations/nouvelle"
          class="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50/60 hover:shadow-md"
        >
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 transition-all duration-200 group-hover:bg-orange-500 group-hover:shadow-lg group-hover:shadow-orange-500/30">
            <svg class="h-5 w-5 text-orange-500 transition-colors group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-slate-900 transition-colors group-hover:text-orange-700">Nouvelle situation</p>
            <p class="mt-0.5 text-xs text-slate-500">Déclarer une situation</p>
          </div>
        </RouterLink>

        <RouterLink
          to="/documents"
          class="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/60 hover:shadow-md"
        >
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 transition-all duration-200 group-hover:bg-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/30">
            <svg class="h-5 w-5 text-blue-500 transition-colors group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-700">Télécharger documents</p>
            <p class="mt-0.5 text-xs text-slate-500">Ajouter des fichiers</p>
          </div>
        </RouterLink>

        <RouterLink
          to="/profil"
          class="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
        >
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition-all duration-200 group-hover:bg-slate-700 group-hover:shadow-lg group-hover:shadow-slate-500/20">
            <svg class="h-5 w-5 text-slate-500 transition-colors group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-slate-900 transition-colors group-hover:text-slate-700">Mettre à jour profil</p>
            <p class="mt-0.5 text-xs text-slate-500">Modifier vos informations</p>
          </div>
        </RouterLink>

      </div>
    </div>

    <!-- ── Recent Situations ── -->
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-slate-900">Situations récentes</h3>
        <RouterLink
          to="/situations"
          class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          Voir tout
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </RouterLink>
      </div>

      <!-- Loading skeleton -->
      <div v-if="isLoading" class="mt-4 space-y-3">
        <div v-for="i in 3" :key="i" class="animate-pulse rounded-2xl border border-slate-100 p-4">
          <div class="flex gap-3">
            <div class="h-10 w-24 rounded-lg bg-slate-100"></div>
            <div class="flex-1 space-y-2">
              <div class="h-3.5 w-32 rounded bg-slate-100"></div>
              <div class="h-3 w-48 rounded bg-slate-100"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="recentSituations.length === 0" class="mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-10 text-center">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
          <svg class="h-6 w-6 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          </svg>
        </div>
        <p class="mt-3 text-sm font-semibold text-slate-600">Aucune situation disponible</p>
        <p class="mt-1 text-xs text-slate-400">Commencez par déclarer votre première situation</p>
      </div>

      <!-- Situation cards -->
      <div v-else class="mt-4 space-y-3">
        <article
          v-for="item in recentSituations"
          :key="item.id"
          class="group cursor-pointer rounded-2xl border border-slate-200 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <h4 class="text-sm font-bold text-slate-900">{{ item.title }}</h4>
                <span :class="['rounded-full px-2.5 py-0.5 text-xs font-semibold', item.statusClass]">{{ item.status }}</span>
              </div>
              <p class="mt-1.5 text-sm font-medium text-slate-700">{{ item.company }}</p>
              <p class="mt-0.5 line-clamp-1 text-xs text-slate-500">{{ item.description }}</p>
              <div class="mt-2.5 flex items-center gap-4 text-xs text-slate-400">
                <span class="flex items-center gap-1">
                  <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  Début : <span class="font-medium text-slate-600">{{ item.start }}</span>
                </span>
                <span class="flex items-center gap-1">
                  Fin : <span class="font-medium text-slate-600">{{ item.end }}</span>
                </span>
              </div>
            </div>
            <svg class="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
