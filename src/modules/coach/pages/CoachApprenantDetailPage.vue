<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import CoachLayout from '@/modules/coach/layouts/CoachLayout.vue'
import {
  formatCoachDate,
  getCoachApprenantDetail,
  type CoachApprenantDetail,
} from '@/modules/coach/api/coach.api'
import PageLoadingState from '@/shared/components/PageLoadingState.vue'

const route = useRoute()
const loading = ref(true)
const error = ref<string | null>(null)
const detail = ref<CoachApprenantDetail | null>(null)

const apprenantId = computed(() => String(route.params.id ?? ''))
const promotionId = computed(() => String(route.query.promotionId ?? ''))

async function loadDetail() {
  loading.value = true
  error.value = null

  try {
    detail.value = await getCoachApprenantDetail(apprenantId.value, {
      promotionId: promotionId.value || undefined,
    })
  } catch (e: any) {
    error.value = e.message || "Erreur lors du chargement de l'apprenant"
  } finally {
    loading.value = false
  }
}

onMounted(loadDetail)
</script>

<template>
  <CoachLayout title="Détail apprenant" active-menu="apprenants">
    <div class="space-y-5">
      <div class="flex items-center gap-2 text-sm text-slate-500">
        <RouterLink to="/coach/apprenants" class="hover:text-slate-700">
          Mes apprenants
        </RouterLink>
        <span>/</span>
        <span class="font-semibold text-slate-700">Détail</span>
      </div>

      <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <PageLoadingState compact />
      </div>

      <div v-else-if="error" class="rounded-2xl bg-red-50 p-4 text-red-600">
        {{ error }}
      </div>

      <template v-else-if="detail">
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-xl font-bold text-slate-900">
            {{ detail.user.prenom }} {{ detail.user.nom }}
          </h2>
          <p class="mt-1 text-sm text-slate-500">{{ detail.user.email }}</p>

          <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div class="rounded-xl bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">Référentiel</p>
              <p class="mt-1 text-sm font-semibold text-slate-800">{{ detail.referentiel.nom }}</p>
            </div>
            <div class="rounded-xl bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">Promotion</p>
              <p class="mt-1 text-sm font-semibold text-slate-800">{{ detail.promotion.nom }} {{ detail.promotion.annee }}</p>
            </div>
            <div class="rounded-xl bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">Téléphone</p>
              <p class="mt-1 text-sm font-semibold text-slate-800">{{ detail.telephone || '—' }}</p>
            </div>
            <div class="rounded-xl bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">Situations</p>
              <p class="mt-1 text-sm font-semibold text-slate-800">{{ detail.situations.length }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 px-6 py-5">
            <h3 class="text-base font-bold text-slate-900">Historique des situations</h3>
          </div>

          <div v-if="detail.situations.length === 0" class="p-6 text-sm text-slate-500">
            Aucune situation pour cet apprenant.
          </div>

          <div v-else class="divide-y divide-slate-100">
            <article
              v-for="situation in detail.situations"
              :key="situation.id"
              class="px-6 py-5"
            >
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p class="text-sm font-semibold text-slate-900">{{ situation.statut }}</p>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ situation.entreprise?.nom || situation.nomEntrepriseLibre || 'Entreprise libre' }}
                  </p>
                </div>
                <span
                  :class="[
                    'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                    situation.valide ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                  ]"
                >
                  {{ situation.valide ? 'Validée' : 'En attente' }}
                </span>
              </div>

              <div class="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p class="text-xs uppercase tracking-wide text-slate-400">Début</p>
                  <p class="mt-1 text-sm text-slate-700">{{ formatCoachDate(situation.dateDebut) }}</p>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-wide text-slate-400">Fin</p>
                  <p class="mt-1 text-sm text-slate-700">{{ formatCoachDate(situation.dateFin) }}</p>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-wide text-slate-400">Créée le</p>
                  <p class="mt-1 text-sm text-slate-700">{{ formatCoachDate(situation.createdAt) }}</p>
                </div>
              </div>

              <p v-if="situation.commentaire" class="mt-4 text-sm text-slate-600">
                {{ situation.commentaire }}
              </p>
            </article>
          </div>
        </div>
      </template>
    </div>
  </CoachLayout>
</template>
