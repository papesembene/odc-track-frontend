<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import ApprenantLayout from '@/shared/layouts/ApprenantLayout.vue'

type UiSituationType = 'STAGE' | 'EMPLOI' | 'ALTERNANCE' | 'PROJET'
type CompanyMode = 'PARTNER' | 'EXTERNAL'

const router = useRouter()

const typeOptions: Array<{ key: UiSituationType; label: string; backendStatut: string }> = [
  { key: 'STAGE', label: 'Stage', backendStatut: 'EN_STAGE' },
  { key: 'EMPLOI', label: 'Emploi', backendStatut: 'EN_EMPLOI' },
  { key: 'ALTERNANCE', label: 'Alternance', backendStatut: 'EN_EMPLOI' },
  { key: 'PROJET', label: 'Projet', backendStatut: 'PROJET_PERSO' },
]

const partners = [
  { id: 'b0deef77-7d6e-4f0a-8d2f-3a7fb47f1911', nom: 'Orange Digital Center' },
  { id: '4fcece50-6f6a-4b11-8e24-80f0e4f9a203', nom: 'Sonatel' },
  { id: '7fd7c0ce-1d8f-4290-8f28-08f78e08d8a2', nom: 'AI Analytics Group' },
]

const selectedType = ref<UiSituationType>('STAGE')
const companyMode = ref<CompanyMode>('PARTNER')

const form = reactive({
  entrepriseId: '',
  nomEntrepriseLibre: '',
  secteurEntrepriseLibre: '',
  adresseEntrepriseLibre: '',
  dateDebut: '',
  dateFin: '',
  commentaire: '',
})

const onCancel = () => router.push('/situations')
const onSave = () => {
  console.log('CreateSituationDto payload', form)
  router.push('/situations')
}
</script>

<template>
  <ApprenantLayout title="Nouvelle situation" active-menu="situations">
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <!-- Title -->
      <h2 class="text-xl font-bold text-slate-900">Déclarer une nouvelle situation</h2>
      <p class="mt-1 text-sm text-slate-500">Remplissez les informations concernant votre situation professionnelle</p>

      <div class="mt-7 space-y-6">

        <!-- Type de situation -->
        <div>
          <p class="mb-3 text-sm font-semibold text-slate-800">Type de situation *</p>
          <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <button
              v-for="opt in typeOptions"
              :key="opt.key"
              type="button"
              class="flex flex-col items-center gap-2.5 rounded-xl border px-4 py-5 transition-colors"
              :class="selectedType === opt.key
                ? 'border-orange-500 bg-orange-50 text-orange-500'
                : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50'"
              @click="selectedType = opt.key"
            >
              <!-- Stage: briefcase -->
              <svg v-if="opt.key === 'STAGE'" class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              <!-- Emploi: building -->
              <svg v-else-if="opt.key === 'EMPLOI'" class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <!-- Alternance: calendar -->
              <svg v-else-if="opt.key === 'ALTERNANCE'" class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <!-- Projet: lightbulb -->
              <svg v-else class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" />
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
              </svg>
              <span class="text-sm font-semibold" :class="selectedType === opt.key ? 'text-orange-500' : 'text-slate-700'">
                {{ opt.label }}
              </span>
            </button>
          </div>
        </div>

        <!-- Type d'entreprise -->
        <div>
          <p class="mb-3 text-sm font-semibold text-slate-800">Type d'entreprise *</p>
          <div class="grid gap-3 sm:grid-cols-2">
            <!-- Partenaire -->
            <button
              type="button"
              class="flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-colors"
              :class="companyMode === 'PARTNER'
                ? 'border-orange-500 bg-orange-50'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'"
              @click="companyMode = 'PARTNER'"
            >
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                :class="companyMode === 'PARTNER' ? 'bg-orange-100' : 'bg-slate-100'"
              >
                <svg
                  class="h-5 w-5"
                  :class="companyMode === 'PARTNER' ? 'text-orange-500' : 'text-slate-400'"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold" :class="companyMode === 'PARTNER' ? 'text-orange-500' : 'text-slate-800'">
                  Entreprise partenaire
                </p>
                <p class="mt-0.5 text-xs text-slate-500">Sélectionner dans la liste</p>
              </div>
            </button>

            <!-- Externe -->
            <button
              type="button"
              class="flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-colors"
              :class="companyMode === 'EXTERNAL'
                ? 'border-orange-500 bg-orange-50'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'"
              @click="companyMode = 'EXTERNAL'"
            >
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                :class="companyMode === 'EXTERNAL' ? 'bg-orange-100' : 'bg-slate-100'"
              >
                <svg
                  class="h-5 w-5"
                  :class="companyMode === 'EXTERNAL' ? 'text-orange-500' : 'text-slate-400'"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold" :class="companyMode === 'EXTERNAL' ? 'text-orange-500' : 'text-slate-800'">
                  Entreprise externe
                </p>
                <p class="mt-0.5 text-xs text-slate-500">Saisir manuellement</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Partner select -->
        <div v-if="companyMode === 'PARTNER'">
          <label class="mb-2 block text-sm font-semibold text-slate-800">Entreprise partenaire *</label>
          <div class="relative">
            <select
              v-model="form.entrepriseId"
              class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 outline-none focus:border-orange-400"
            >
              <option value="">Sélectionner une entreprise</option>
              <option v-for="item in partners" :key="item.id" :value="item.id">{{ item.nom }}</option>
            </select>
            <svg class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        <!-- External company fields -->
        <div v-else class="grid gap-3 sm:grid-cols-3">
          <div class="sm:col-span-3">
            <label class="mb-2 block text-sm font-semibold text-slate-800">Nom de l'entreprise *</label>
            <input
              v-model="form.nomEntrepriseLibre"
              type="text"
              placeholder="Ex: WebCorp Sénégal"
              class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none focus:border-orange-400"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-800">Secteur</label>
            <input
              v-model="form.secteurEntrepriseLibre"
              type="text"
              placeholder="Ex: Services Web"
              class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none focus:border-orange-400"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="mb-2 block text-sm font-semibold text-slate-800">Adresse</label>
            <input
              v-model="form.adresseEntrepriseLibre"
              type="text"
              placeholder="Ex: Sacré-Coeur, Dakar"
              class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none focus:border-orange-400"
            />
          </div>
        </div>

        <!-- Dates -->
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-800">Date de début *</label>
            <input
              v-model="form.dateDebut"
              type="date"
              class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none focus:border-orange-400"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-800">Date de fin (optionnelle)</label>
            <input
              v-model="form.dateFin"
              type="date"
              class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none focus:border-orange-400"
            />
            <p class="mt-1.5 text-xs text-slate-500">Laisser vide si la situation est en cours</p>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-800">Description *</label>
          <textarea
            v-model="form.commentaire"
            rows="5"
            placeholder="Décrivez votre situation professionnelle, vos missions, vos responsabilités..."
            class="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-orange-400"
          />
          <p class="mt-1.5 text-xs text-slate-500">Minimum 50 caractères</p>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            class="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
            @click="onCancel"
          >
            Annuler
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            @click="onSave"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
            </svg>
            Enregistrer la situation
          </button>
        </div>

      </div>
    </div>
  </ApprenantLayout>
</template>
