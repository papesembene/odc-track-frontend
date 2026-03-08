<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ManagerLayout from '@/modules/manager/layouts/ManagerLayout.vue'
import { getApprenants, type ApprenantListItem } from '@/modules/manager/api/apprenants.api'
import { getStatistiques, type StatistiquesGlobales } from '@/modules/manager/api/statistiques.api'
import {
  getActivePromotion,
  type PromotionWithReferentiels,
} from '@/modules/manager/api/promotions.api'
import PageLoadingState from '@/shared/components/PageLoadingState.vue'

// Router instance
const router = useRouter()

type ApprenantStatus = 'En attente' | 'En cours' | 'Validée' | 'Rejetée'

interface ApprenantUI {
  id: string
  initials: string
  name: string
  email: string
  promo: string
  referentiel: string
  situations: number
  status: ApprenantStatus
  promotionId?: string
  referentielId?: string
}

// ── Data from API ──
const apprenantsList = ref<ApprenantListItem[]>([])
const statsData = ref<StatistiquesGlobales | null>(null)
const loading = ref(true)
const hasLoaded = ref(false)
const error = ref<string | null>(null)
const totalItems = ref(0)

// ── Filters (from active promotion) ──
const refs = ref<{ id: string; nom: string }[]>([])

const search = ref('')
const refFil = ref('')

// ── Fetch data on mount ──
onMounted(async () => {
  try {
    // Fetch apprenants and stats in parallel
    // Note: Backend already filters apprenants by active promotion for MANAGER role
    const [apprenantsResult, stats, activePromotion] = await Promise.all([
      getApprenants({ limit: 100 }),
      getStatistiques({
        includePromotions: false,
        includeReferentiels: true,
        includeSituationsRecentes: false,
      }),
      getActivePromotion(),
    ])
    
    // Set apprenants (already filtered by active promotion)
    apprenantsList.value = apprenantsResult.items
    totalItems.value = apprenantsResult.pagination.totalItems
    
    // Set stats
    statsData.value = stats
    
    // Le filtre référentiel du manager doit proposer uniquement
    // les référentiels de la promotion active.
    refs.value = ((activePromotion as PromotionWithReferentiels | null)?.referentiels ?? [])
      .map(({ referentiel }) => ({ id: referentiel.id, nom: referentiel.nom }))
    hasLoaded.value = true
  } catch (e: any) {
    error.value = e.message || 'Erreur lors du chargement des données'
    console.error('Erreur:', e)
  } finally {
    loading.value = false
  }
})

// ── Transform API data to UI format ──
const apprenants = computed<ApprenantUI[]>(() => {
  return apprenantsList.value.map(a => {
    const user = a.user || { nom: '', prenom: '', email: '' }
    const promo = a.promotion || { id: '', nom: '' }
    const ref = a.referentiel || { id: '', nom: '' }
    const situations = a._count?.situations || a.situations?.length || 0
    
    // Determine status based on situations
    let status: ApprenantStatus = 'En attente'
    if (a.situations && a.situations.length > 0) {
      const hasValidated = a.situations.some(s => s.valide)
      if (hasValidated) {
        status = 'Validée'
      } else {
        status = 'En attente'
      }
    }
    
    return {
      id: String(a.id),
      initials: `${user.prenom?.[0] || ''}${user.nom?.[0] || ''}`.toUpperCase(),
      name: `${user.prenom || ''} ${user.nom || ''}`.trim(),
      email: user.email || '',
      promo: promo.nom || '',
      referentiel: ref.nom || '',
      situations,
      status,
      promotionId: promo.id,
      referentielId: ref.id,
    }
  })
})

// ── Filtered list (only by search and referentiel now) ──
const filtered = computed(() =>
  apprenants.value.filter(a => {
    const q = search.value.toLowerCase()
    const matchQ = !q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)
    // Filtre par identifiant référentiel (plus robuste que le nom).
    const matchR = !refFil.value || a.referentielId === refFil.value
    return matchQ && matchR
  })
)

// Pagination for apprenants
const apprenantsPage = ref(1)
const apprenantsPerPage = 12

const paginatedApprenants = computed(() => {
  const start = (apprenantsPage.value - 1) * apprenantsPerPage
  return filtered.value.slice(start, start + apprenantsPerPage)
})

const totalApprenantPages = computed(() => Math.ceil(filtered.value.length / apprenantsPerPage))

// ── Stat counts (from API) ──
const total = computed(() => statsData.value?.totalApprenants || apprenants.value.length)

const avecSit = computed(() => {
  return apprenants.value.filter(a => a.situations > 0).length
})

const statusClass = (s: ApprenantStatus) => {
  switch (s) {
    case 'Validée'   : return 'border border-emerald-400 text-emerald-600 bg-emerald-50'
    case 'En cours'  : return 'border border-blue-400    text-blue-600    bg-blue-50'
    case 'En attente': return 'border border-amber-400   text-amber-600   bg-amber-50'
    case 'Rejetée'   : return 'border border-red-400     text-red-600     bg-red-50'
  }
}
</script>

<template>
  <ManagerLayout title="Apprenants" active-menu="apprenants">
    <div class="space-y-5">
      <!-- Loading state -->
      <PageLoadingState
        v-if="loading && !hasLoaded"
        message="Chargement des apprenants..."
      />

      <!-- Error state -->
      <div v-else-if="error" class="rounded-2xl bg-red-50 p-4 text-red-600">
        {{ error }}
      </div>

      <template v-else>
        <!-- ── Stat cards ── -->
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <!-- Total -->
          <article class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
              <svg class="h-5 w-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <p class="text-3xl font-bold text-slate-900">{{ total }}</p>
              <p class="text-sm text-slate-500">Total</p>
            </div>
          </article>

          <!-- Avec situation -->
          <article class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">
              <svg class="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
            </div>
            <div>
              <p class="text-3xl font-bold text-slate-900">{{ avecSit }}</p>
              <p class="text-sm text-slate-500">Avec situation</p>
            </div>
          </article>
        </div>

        <!-- ── Search & Filters (only referentiel - promo is already filtered by backend) ── -->
        <div class="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <!-- Search -->
          <div class="relative min-w-0 flex-1">
            <svg class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              v-model="search"
              type="text"
              placeholder="Rechercher un apprenant..."
              class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-orange-400 focus:bg-white transition-colors"
            />
          </div>
          <!-- Ref filter (only referentiels from active promotion) -->
          <select
            v-model="refFil"
            class="rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-orange-400 cursor-pointer"
          >
            <option value="">Tous les référentiels</option>
            <option v-for="r in refs" :key="r.id" :value="r.id">{{ r.nom }}</option>
          </select>
        </div>

        <!-- ── Apprenants grid ── -->
        <div class="rounded-2xl border border-slate-200 bg-white px-6 py-4">
          <div class="flex items-center justify-between pb-4">
            <p class="text-sm text-slate-500">{{ filtered.length }} apprenant(s) trouvé(s)</p>
            <div v-if="totalApprenantPages > 1" class="flex items-center gap-2">
              <button
                @click="apprenantsPage--"
                :disabled="apprenantsPage <= 1"
                class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Précédent
              </button>
              <span class="text-sm text-slate-500">
                {{ apprenantsPage }} / {{ totalApprenantPages }}
              </span>
              <button
                @click="apprenantsPage++"
                :disabled="apprenantsPage >= totalApprenantPages"
                class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="a in paginatedApprenants"
            :key="a.id"
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            @click="router.push('/manager/apprenants/' + a.id)"
          >
            <!-- Avatar + nom + email -->
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                {{ a.initials }}
              </div>
              <div class="min-w-0">
                <p class="text-sm font-bold text-slate-900 truncate">{{ a.name }}</p>
                <p class="text-xs text-slate-500 truncate">{{ a.email }}</p>
              </div>
            </div>

            <!-- Badges promo + ref -->
            <div class="mt-3 flex flex-wrap gap-1.5">
              <span class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600">{{ a.promo }}</span>
              <span class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600">{{ a.referentiel }}</span>
            </div>

            <!-- Situations + status -->
            <div class="mt-4 flex items-center justify-between">
              <span class="text-sm text-slate-500">
                {{ a.situations }} situation{{ a.situations > 1 ? 's' : '' }}
              </span>
              <span :class="['rounded-full px-3 py-0.5 text-xs font-semibold', statusClass(a.status)]">
                {{ a.status }}
              </span>
            </div>
          </article>

          <!-- Empty state -->
          <div v-if="paginatedApprenants.length === 0" class="col-span-full py-12 text-center text-slate-400">
            <svg class="mx-auto mb-3 h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p class="text-sm">Aucun apprenant trouvé</p>
          </div>
        </div>

      </template>
    </div>
  </ManagerLayout>
</template>
