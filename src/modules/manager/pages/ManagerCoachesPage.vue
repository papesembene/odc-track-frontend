<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ManagerLayout from '@/modules/manager/layouts/ManagerLayout.vue'
import { getCoaches, createCoach, type CoachItem, type CreateCoachDto } from '@/modules/manager/api/coaches.api'
import { getReferentiels, type ReferentielItem } from '@/modules/manager/api/promotions.api'
import PageLoadingState from '@/shared/components/PageLoadingState.vue'

// ── State ──
const coaches = ref<CoachItem[]>([])
const referentiels = ref<ReferentielItem[]>([])
const loading = ref(true)
const referentielsLoading = ref(false)
const error = ref<string | null>(null)
const showModal = ref(false)
const submitting = ref(false)
const formError = ref<string | null>(null)

// ── Form ──
const form = ref<CreateCoachDto>({
  nom: '',
  prenom: '',
  email: '',
  referentielId: '',
  specialite: '',
})

// ── Fetch coaches ──
async function fetchCoaches() {
  loading.value = true
  error.value = null
  try {
    coaches.value = await getCoaches()
    console.log('coach',coaches);
    
  } catch (e: any) {
    error.value = e.message || 'Erreur lors du chargement des coaches'
    console.error('Erreur:', e)
  } finally {
    loading.value = false
  }
}

// ── Fetch referentiels ──
async function fetchReferentiels() {
  referentielsLoading.value = true
  try {
    referentiels.value = await getReferentiels()
  } catch (e: any) {
    console.error('Erreur chargement référentiels:', e)
  } finally {
    referentielsLoading.value = false
  }
}

// ── Submit ──
async function handleSubmit() {
  if (!form.value.nom || !form.value.prenom || !form.value.email || !form.value.referentielId) {
    formError.value = 'Veuillez remplir tous les champs obligatoires'
    return
  }

  submitting.value = true
  formError.value = null
  
  try {
    await createCoach(form.value)
    showModal.value = false
    form.value = { nom: '', prenom: '', email: '', referentielId: '', specialite: '' }
    await fetchCoaches()
  } catch (e: any) {
    formError.value = e.message || 'Erreur lors de la création du coach'
    console.error('Erreur:', e)
  } finally {
    submitting.value = false
  }
}

// ── Reset form on close ──
async function openModal() {
  form.value = { nom: '', prenom: '', email: '', referentielId: '', specialite: '' }
  formError.value = null
  showModal.value = true
  await fetchReferentiels()
}

function closeModal() {
  showModal.value = false
}

// ── Init ──
onMounted(fetchCoaches)
</script>

<template>
  <ManagerLayout title="Gestion des Coaches" active-menu="coaches">
    <div class="space-y-5">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Coaches</h1>
          <p class="text-slate-500">Gérez les coaches de la plateforme</p>
        </div>
        <button
          @click="openModal"
          class="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nouveau coach
        </button>
      </div>

      <!-- Loading -->
      <PageLoadingState v-if="loading" />

      <!-- Error -->
      <div v-else-if="error" class="rounded-2xl bg-red-50 p-4 text-red-600">
        {{ error }}
      </div>

      <!-- Table -->
      <div v-else class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table class="w-full">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Coach</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Referentiel</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Statut</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Créé le</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="coach in coaches" :key="coach.id" class="hover:bg-slate-50">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                    {{ coach.prenom?.[0] || '' }}{{ coach.nom?.[0] || '' }}
                  </div>
                  <span class="font-medium text-slate-900">{{ coach.prenom }} {{ coach.nom }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">{{ coach.email }}</td>
              <td class="px-6 py-4">
                <span v-if="coach.referentiel" class="text-sm text-slate-900">
                  {{ coach.referentiel.nom }}
                </span>
                <span v-else class="text-sm text-slate-400">-</span>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'rounded-full px-2.5 py-0.5 text-xs font-medium',
                    coach.actif 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'bg-slate-100 text-slate-500'
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

        <!-- Empty -->
        <div v-if="coaches.length === 0" class="py-12 text-center text-slate-400">
          <p>Aucun coach trouvé</p>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>
        
        <!-- Modal -->
        <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <h2 class="text-lg font-bold text-slate-900">Nouveau Coach</h2>
          
          <form @submit.prevent="handleSubmit" class="mt-5 space-y-4">
            <div v-if="formError" class="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {{ formError }}
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700">Prénom</label>
              <input
                v-model="form.prenom"
                type="text"
                required
                class="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Prénom du coach"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700">Nom</label>
              <input
                v-model="form.nom"
                type="text"
                required
                class="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Nom du coach"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700">Email</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="email@exemple.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700">
                Référentiel <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.referentielId"
                required
                :disabled="referentielsLoading"
                class="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="" disabled>
                  {{ referentielsLoading ? 'Chargement...' : 'Sélectionner un référentiel' }}
                </option>
                <option v-for="ref in referentiels" :key="ref.id" :value="ref.id">
                  {{ ref.nom }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700">Spécialité (optionnel)</label>
              <input
                v-model="form.specialite"
                type="text"
                class="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Ex: Développement Web, Data, etc."
              />
            </div>

            <div class="flex gap-3 pt-2">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="submitting"
                class="flex-1 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
              >
                {{ submitting ? 'Création...' : 'Créer' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </ManagerLayout>
</template>
