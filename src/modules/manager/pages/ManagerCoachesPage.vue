<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ManagerLayout from '@/modules/manager/layouts/ManagerLayout.vue'
import { getCoaches, type CoachItem } from '@/modules/manager/api/coaches.api'
import PageLoadingState from '@/shared/components/PageLoadingState.vue'

const coaches = ref<CoachItem[]>([])
const loading = ref(true)
const hasLoaded = ref(false)
const error = ref<string | null>(null)

async function fetchCoaches() {
  loading.value = true
  error.value = null

  try {
    coaches.value = await getCoaches()
    hasLoaded.value = true
  } catch (e: any) {
    error.value = e.message || 'Erreur lors du chargement des coaches'
  } finally {
    loading.value = false
  }
}

onMounted(fetchCoaches)
</script>

<template>
  <ManagerLayout title="Coaches" active-menu="coaches">
    <div class="space-y-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Coaches</h1>
        </div>
        <button
          type="button"
          class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          @click="fetchCoaches"
        >
          Actualiser
        </button>
      </div>

      <PageLoadingState v-if="loading && !hasLoaded" />

      <div v-else-if="error" class="rounded-2xl bg-red-50 p-4 text-red-600">
        {{ error }}
      </div>

      <div
        v-else
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <table class="w-full">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Coach
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Référentiel
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Statut
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Créé le
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="coach in coaches"
              :key="coach.id"
              class="hover:bg-slate-50"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                    {{ coach.prenom?.[0] || '' }}{{ coach.nom?.[0] || '' }}
                  </div>
                  <span class="font-medium text-slate-900">
                    {{ coach.prenom }} {{ coach.nom }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">{{ coach.email }}</td>
              <td class="px-6 py-4 text-sm text-slate-900">
                {{ coach.referentiel?.nom || '-' }}
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'rounded-full px-2.5 py-0.5 text-xs font-medium',
                    coach.actif
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-slate-100 text-slate-500',
                  ]"
                >
                  {{ coach.actif ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-500">
                {{ new Date(coach.createdAt).toLocaleDateString('fr-FR') }}
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="coaches.length === 0" class="py-12 text-center text-slate-400">
          <p>Aucun coach trouvé</p>
        </div>
      </div>
    </div>
  </ManagerLayout>
</template>
