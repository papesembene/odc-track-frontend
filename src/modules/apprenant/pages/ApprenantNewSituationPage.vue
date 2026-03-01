<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
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

const selectedTypeConfig = computed(() =>
  typeOptions.find((t) => t.key === selectedType.value) ?? typeOptions[0],
)

const payloadPreview = computed(() => {
  const base = {
    statut: selectedTypeConfig.value.backendStatut,
    dateDebut: form.dateDebut,
    dateFin: form.dateFin || undefined,
    commentaire: form.commentaire,
  }

  if (companyMode.value === 'PARTNER') {
    return {
      ...base,
      entrepriseId: form.entrepriseId || undefined,
    }
  }

  return {
    ...base,
    nomEntrepriseLibre: form.nomEntrepriseLibre || undefined,
    secteurEntrepriseLibre: form.secteurEntrepriseLibre || undefined,
    adresseEntrepriseLibre: form.adresseEntrepriseLibre || undefined,
  }
})

const onCancel = () => router.push('/situations')

const onSave = () => {
  console.log('CreateSituationDto payload', payloadPreview.value)
  router.push('/situations')
}
</script>

<template>
  <ApprenantLayout title="Nouvelle situation" active-menu="situations">
    <section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-4xl font-bold text-slate-900">Déclarer une nouvelle situation</h2>
      <p class="mt-1 text-slate-500">Remplissez les informations concernant votre situation professionnelle</p>

      <div class="mt-6 space-y-5">
        <div>
          <p class="mb-2 text-sm font-semibold text-slate-800">Type de situation *</p>
          <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <button
              v-for="opt in typeOptions"
              :key="opt.key"
              type="button"
              class="rounded-xl border px-4 py-4 text-left transition-colors"
              :class="selectedType === opt.key ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-300 hover:border-slate-400'"
              @click="selectedType = opt.key"
            >
              <p class="text-sm font-semibold">{{ opt.label }}</p>
            </button>
          </div>
        </div>

        <div>
          <p class="mb-2 text-sm font-semibold text-slate-800">Type d'entreprise *</p>
          <div class="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              class="rounded-xl border px-4 py-4 text-left transition-colors"
              :class="companyMode === 'PARTNER' ? 'border-orange-500 bg-orange-50' : 'border-slate-300 hover:border-slate-400'"
              @click="companyMode = 'PARTNER'"
            >
              <p class="font-semibold text-orange-600">Entreprise partenaire</p>
              <p class="text-sm text-slate-500">Sélectionner dans la liste</p>
            </button>
            <button
              type="button"
              class="rounded-xl border px-4 py-4 text-left transition-colors"
              :class="companyMode === 'EXTERNAL' ? 'border-orange-500 bg-orange-50' : 'border-slate-300 hover:border-slate-400'"
              @click="companyMode = 'EXTERNAL'"
            >
              <p class="font-semibold text-slate-800">Entreprise externe</p>
              <p class="text-sm text-slate-500">Saisir manuellement</p>
            </button>
          </div>
        </div>

        <div v-if="companyMode === 'PARTNER'">
          <label class="mb-2 block text-sm font-semibold text-slate-800">Entreprise partenaire *</label>
          <select v-model="form.entrepriseId" class="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-orange-400">
            <option value="">Sélectionner une entreprise</option>
            <option v-for="item in partners" :key="item.id" :value="item.id">{{ item.nom }}</option>
          </select>
        </div>

        <div v-else class="grid gap-3 sm:grid-cols-3">
          <div class="sm:col-span-3">
            <label class="mb-2 block text-sm font-semibold text-slate-800">Nom de l'entreprise *</label>
            <input v-model="form.nomEntrepriseLibre" type="text" class="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-orange-400" placeholder="Ex: WebCorp Sénégal" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-800">Secteur</label>
            <input v-model="form.secteurEntrepriseLibre" type="text" class="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-orange-400" placeholder="Ex: Services Web" />
          </div>
          <div class="sm:col-span-2">
            <label class="mb-2 block text-sm font-semibold text-slate-800">Adresse</label>
            <input v-model="form.adresseEntrepriseLibre" type="text" class="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-orange-400" placeholder="Ex: Sacré-Coeur, Dakar" />
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-800">Date de début *</label>
            <input v-model="form.dateDebut" type="date" class="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-orange-400" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-800">Date de fin (optionnelle)</label>
            <input v-model="form.dateFin" type="date" class="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-orange-400" />
            <p class="mt-1 text-xs text-slate-500">Laisser vide si la situation est en cours</p>
          </div>
        </div>

        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-800">Description *</label>
          <textarea
            v-model="form.commentaire"
            rows="5"
            class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400"
            placeholder="Décrivez votre situation professionnelle, vos missions, vos responsabilités..."
          />
          <p class="mt-1 text-xs text-slate-500">Minimum 50 caractères</p>
        </div>

        <div class="border-t border-slate-200 pt-4">
          <details class="rounded-lg bg-slate-50 p-3">
            <summary class="cursor-pointer text-sm font-semibold text-slate-700">Aperçu payload backend (CreateSituationDto)</summary>
            <pre class="mt-2 overflow-auto rounded bg-slate-900 p-3 text-xs text-slate-100">{{ JSON.stringify(payloadPreview, null, 2) }}</pre>
          </details>
        </div>

        <div class="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <button type="button" class="rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-slate-100" @click="onCancel">Annuler</button>
          <button type="button" class="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600" @click="onSave">Enregistrer la situation</button>
        </div>
      </div>
    </section>
  </ApprenantLayout>
</template>
