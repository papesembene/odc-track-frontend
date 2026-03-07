<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CoachLayout from '@/modules/coach/layouts/CoachLayout.vue'
import {
  formatCoachStatus,
  getCoachApprenants,
  type CoachApprenantListItem,
  type CoachPromotionOption,
  type CoachScope,
} from '@/modules/coach/api/coach.api'
import PageLoadingState from '@/shared/components/PageLoadingState.vue'
import EmptyState from '@/shared/components/EmptyState.vue'

const router = useRouter()
const route = useRoute()
const loading = ref(true)
const error = ref<string | null>(null)
const items = ref<CoachApprenantListItem[]>([])
const scope = ref<CoachScope | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)
const search = ref('')
const selectedPromotionId = ref(String(route.query.promotionId ?? ''))

const promotions = computed<CoachPromotionOption[]>(() => {
  return scope.value?.availablePromotions ?? []
})

const activePromotion = computed(() => {
  return promotions.value.find((promotion) => promotion.estActive) ?? null
})

async function loadApprenants() {
  loading.value = true
  error.value = null

  try {
    const data = await getCoachApprenants({
      page: currentPage.value,
      limit: 12,
      search: search.value || undefined,
      promotionId: selectedPromotionId.value || undefined,
    })

    items.value = data.items
    scope.value = data.scope
    totalPages.value = data.pagination.totalPages
    selectedPromotionId.value = data.scope.selectedPromotion?.id ?? selectedPromotionId.value
  } catch (e: any) {
    error.value = e.message || 'Erreur lors du chargement des apprenants'
  } finally {
    loading.value = false
  }
}

function goToDetail(id: string) {
  const suffix = selectedPromotionId.value
    ? `?promotionId=${selectedPromotionId.value}`
    : ''
  router.push(`/coach/apprenants/${id}${suffix}`)
}

function statusClass(item: CoachApprenantListItem) {
  const latest = item.situations[0]
  if (!latest) return 'bg-slate-100 text-slate-600'
  if (latest.valide) return 'bg-emerald-100 text-emerald-600'
  if (latest.statut === 'EN_STAGE' || latest.statut === 'EN_EMPLOI') {
    return 'bg-blue-100 text-blue-600'
  }
  return 'bg-amber-100 text-amber-600'
}

onMounted(loadApprenants)
</script>

<template>
  <CoachLayout title="Mes apprenants" active-menu="apprenants">
    <div class="space-y-5">
      <div v-if="error" class="rounded-2xl bg-red-50 p-4 text-red-600">
        {{ error }}
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="grid gap-4 lg:grid-cols-[1fr_280px_220px]">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">Recherche</label>
            <input
              v-model="search"
              type="text"
              placeholder="Nom ou email"
              class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-orange-400"
              @keyup.enter="loadApprenants"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">Promotion</label>
            <p
              class="mb-2 text-xs font-medium"
              :class="activePromotion ? 'text-emerald-700' : 'text-amber-700'"
            >
              {{
                loading
                  ? 'Chargement de la promotion active...'
                  : activePromotion
                    ? `Promotion active : ${activePromotion.nom} (${activePromotion.annee})`
                    : 'Aucune promotion active détectée'
              }}
            </p>
            <select
              v-model="selectedPromotionId"
              class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-orange-400"
              @change="loadApprenants"
            >
              <option value="">
                {{
                  loading
                    ? 'Chargement des promotions...'
                    : activePromotion
                      ? `Promotion active - ${activePromotion.nom} (${activePromotion.annee})`
                      : 'Promotion active'
                }}
              </option>
              <option
                v-for="promotion in promotions"
                :key="promotion.id"
                :value="promotion.id"
              >
                {{ promotion.nom }} ({{ promotion.annee }}){{ promotion.estActive ? ' · Active' : '' }}
              </option>
            </select>
          </div>

          <div class="flex items-end">
            <button
              type="button"
              class="h-11 w-full rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white hover:bg-orange-600"
              @click="loadApprenants"
            >
              Filtrer
            </button>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 px-6 py-5">
          <h2 class="text-base font-bold text-slate-900">
            {{ scope?.referentiel.nom || 'Référentiel' }} · apprenants
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            Le coach ne voit que les apprenants de son référentiel et de la promotion consultée.
          </p>
        </div>

        <PageLoadingState v-if="loading" compact message="Chargement des apprenants..." />
        <div v-else-if="items.length === 0" class="p-6">
          <EmptyState
            title="Aucun apprenant trouvé"
            description="Aucun apprenant ne correspond au périmètre sélectionné."
            compact
          />
        </div>

        <div v-else class="divide-y divide-slate-100">
          <article
            v-for="item in items"
            :key="item.id"
            class="cursor-pointer px-6 py-4 transition-colors hover:bg-slate-50"
            @click="goToDetail(item.id)"
          >
            <div class="flex items-center justify-between gap-4">
              <div class="min-w-0">
                <p class="text-sm font-semibold text-slate-900">
                  {{ item.user.prenom }} {{ item.user.nom }}
                </p>
                <p class="mt-1 text-xs text-slate-500">
                  {{ item.user.email }} · {{ item.promotion.nom }} {{ item.promotion.annee }}
                </p>
              </div>

              <div class="shrink-0 text-right">
                <p class="mb-1 text-xs text-slate-500">
                  {{ item._count.situations }} situation(s)
                </p>
                <span :class="['rounded-full px-2.5 py-0.5 text-xs font-semibold', statusClass(item)]">
                  {{ formatCoachStatus(item.situations[0]?.statut || 'RECHERCHE_EMPLOI', item.situations[0]?.valide) }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <button
          type="button"
          class="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 disabled:opacity-50"
          :disabled="currentPage <= 1"
          @click="currentPage -= 1; loadApprenants()"
        >
          Précédent
        </button>
        <span class="text-sm text-slate-500">Page {{ currentPage }} / {{ totalPages }}</span>
        <button
          type="button"
          class="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 disabled:opacity-50"
          :disabled="currentPage >= totalPages"
          @click="currentPage += 1; loadApprenants()"
        >
          Suivant
        </button>
      </div>
    </div>
  </CoachLayout>
</template>
