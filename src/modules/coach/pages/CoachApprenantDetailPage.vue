<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import CoachLayout from '@/modules/coach/layouts/CoachLayout.vue'
import {
  formatCoachDate,
  getCoachApprenantDetail,
  type CoachApprenantDetail,
} from '@/modules/coach/api/coach.api'
import { extractFileName, resolveFileUrl } from '@/modules/apprenant/api/documents.api'
import EmptyState from '@/shared/components/EmptyState.vue'
import PageLoadingState from '@/shared/components/PageLoadingState.vue'

const route = useRoute()
const loading = ref(true)
const error = ref<string | null>(null)
const detail = ref<CoachApprenantDetail | null>(null)
const activeTab = ref<'situations' | 'documents' | 'informations'>('situations')

const apprenantId = computed(() => String(route.params.id ?? ''))
const promotionId = computed(() => String(route.query.promotionId ?? ''))

const apprenant = computed(() => {
  if (!detail.value) return null

  return {
    fullName: `${detail.value.user.prenom} ${detail.value.user.nom}`,
    initials: `${detail.value.user.prenom?.[0] || ''}${detail.value.user.nom?.[0] || ''}`.toUpperCase(),
    email: detail.value.user.email,
    telephone: detail.value.telephone || '—',
    referentiel: detail.value.referentiel.nom,
    promotion: `${detail.value.promotion.nom} ${detail.value.promotion.annee}`,
    totalSituations: detail.value.situations.length,
  }
})

const documents = computed(() => {
  if (!detail.value) return []

  return detail.value.situations.flatMap((situation) =>
    (situation.documents ?? []).map((document) => ({
      ...document,
      name: extractFileName(document.fichier),
      url: resolveFileUrl(document.fichier),
      context: situation.entreprise?.nom || situation.nomEntrepriseLibre || situation.statut,
      situationStatut: situation.statut,
      uploadedAt: formatCoachDate(document.dateUpload || document.createdAt),
    })),
  )
})

// CV global (indépendant des situations) exposé sur le détail apprenant coach.
const cvDocument = computed(() => {
  const cv = detail.value?.cvDocument
  if (!cv?.fichier) return null
  return {
    ...cv,
    name: extractFileName(cv.fichier),
    url: resolveFileUrl(cv.fichier),
    uploadedAt: formatCoachDate(cv.dateUpload || cv.updatedAt || cv.createdAt),
  }
})

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
          <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div class="flex items-start gap-4">
              <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-lg font-bold text-white">
                {{ apprenant?.initials }}
              </div>
              <div>
                <h2 class="text-xl font-bold text-slate-900">
                  {{ apprenant?.fullName }}
                </h2>
                <p class="mt-1 text-sm text-slate-500">{{ apprenant?.email }}</p>
              </div>
            </div>

            <div class="rounded-2xl bg-orange-50 px-5 py-3 text-center">
              <p class="text-2xl font-bold text-orange-600">{{ apprenant?.totalSituations ?? '—' }}</p>
              <p class="text-xs font-medium uppercase tracking-wide text-orange-500">Situations</p>
            </div>
          </div>

          <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div class="rounded-xl bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">Référentiel</p>
              <p class="mt-1 text-sm font-semibold text-slate-800">{{ apprenant?.referentiel }}</p>
            </div>
            <div class="rounded-xl bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">Promotion</p>
              <p class="mt-1 text-sm font-semibold text-slate-800">{{ apprenant?.promotion }}</p>
            </div>
            <div class="rounded-xl bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">Téléphone</p>
              <p class="mt-1 text-sm font-semibold text-slate-800">{{ apprenant?.telephone }}</p>
            </div>
            <div class="rounded-xl bg-slate-50 p-4">
              <p class="text-xs uppercase tracking-wide text-slate-400">Documents</p>
              <p class="mt-1 text-sm font-semibold text-slate-800">
                {{ documents.length + (cvDocument ? 1 : 0) }}
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 px-6 pt-5">
            <div class="flex flex-wrap gap-2">
              <button
                type="button"
                class="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                :class="activeTab === 'situations' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                @click="activeTab = 'situations'"
              >
                Situations
              </button>
              <button
                type="button"
                class="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                :class="activeTab === 'documents' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                @click="activeTab = 'documents'"
              >
                Documents
              </button>
              <button
                type="button"
                class="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                :class="activeTab === 'informations' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                @click="activeTab = 'informations'"
              >
                Informations
              </button>
            </div>
          </div>

          <template v-if="activeTab === 'situations'">
          <div class="border-b border-slate-100 px-6 py-5">
            <h3 class="text-base font-bold text-slate-900">Historique des situations</h3>
          </div>

          <div v-if="detail.situations.length === 0" class="p-6">
            <EmptyState title="Aucune situation pour cet apprenant" compact />
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
          </template>

          <template v-else-if="activeTab === 'documents'">
            <div class="border-b border-slate-100 px-6 py-5">
              <h3 class="text-base font-bold text-slate-900">Documents (situations + CV)</h3>
            </div>

            <div
              v-if="!cvDocument && documents.length === 0"
              class="p-6"
            >
              <EmptyState
                title="Aucun document pour le moment"
                description="Les documents déposés sur les situations apparaîtront ici."
                compact
              />
            </div>

            <div v-else class="divide-y divide-slate-100">
              <article
                v-if="cvDocument"
                class="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between bg-orange-50/60"
              >
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-slate-900">{{ cvDocument.name }}</p>
                  <p class="mt-1 text-xs text-slate-500">CV apprenant</p>
                  <p class="mt-1 text-xs text-slate-400">Mis à jour le {{ cvDocument.uploadedAt }}</p>
                </div>

                <a
                  :href="cvDocument.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex shrink-0 items-center justify-center rounded-xl border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 transition-colors hover:bg-white"
                >
                  Ouvrir le CV
                </a>
              </article>

              <article
                v-for="document in documents"
                :key="document.id"
                class="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-slate-900">{{ document.name }}</p>
                  <p class="mt-1 text-xs text-slate-500">
                    {{ document.type }} • {{ document.context }} • {{ document.situationStatut }}
                  </p>
                  <p class="mt-1 text-xs text-slate-400">Ajouté le {{ document.uploadedAt }}</p>
                </div>

                <a
                  :href="document.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Ouvrir
                </a>
              </article>
            </div>
          </template>

          <template v-else>
            <div class="px-6 py-5">
              <h3 class="text-base font-bold text-slate-900">Informations générales</h3>
              <div class="mt-5 grid gap-4 sm:grid-cols-2">
                <div class="rounded-xl bg-slate-50 p-4">
                  <p class="text-xs uppercase tracking-wide text-slate-400">Nom complet</p>
                  <p class="mt-1 text-sm font-semibold text-slate-800">{{ apprenant?.fullName }}</p>
                </div>
                <div class="rounded-xl bg-slate-50 p-4">
                  <p class="text-xs uppercase tracking-wide text-slate-400">Email</p>
                  <p class="mt-1 text-sm font-semibold text-slate-800">{{ apprenant?.email }}</p>
                </div>
                <div class="rounded-xl bg-slate-50 p-4">
                  <p class="text-xs uppercase tracking-wide text-slate-400">Téléphone</p>
                  <p class="mt-1 text-sm font-semibold text-slate-800">{{ apprenant?.telephone }}</p>
                </div>
                <div class="rounded-xl bg-slate-50 p-4">
                  <p class="text-xs uppercase tracking-wide text-slate-400">Référentiel / Promotion</p>
                  <p class="mt-1 text-sm font-semibold text-slate-800">{{ apprenant?.referentiel }} • {{ apprenant?.promotion }}</p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </CoachLayout>
</template>
