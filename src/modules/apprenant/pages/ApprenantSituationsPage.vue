<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ApprenantLayout from '@/shared/layouts/ApprenantLayout.vue'

type UiType = 'Stage' | 'Emploi' | 'Alternance' | 'Projet'
type UiStatus = 'En cours' | 'En attente' | 'Validée' | 'Rejetée'

type SituationItem = {
  id: string
  type: UiType
  status: UiStatus
  entreprise: string
  isExternal: boolean
  secteur?: string
  adresse?: string
  description: string
  dateDebut: string
  dateFin?: string
  feedback?: string
}

const search = ref('')
const selectedType = ref<'Tous' | UiType>('Tous')
const selectedStatus = ref<'Tous statuts' | UiStatus>('Tous statuts')

const situations = ref<SituationItem[]>([
  {
    id: '1',
    type: 'Stage',
    status: 'Validée',
    entreprise: 'Orange Digital Center',
    isExternal: false,
    description: "Stage de développement web chez Sonatel, travail sur des applications React et Node.js",
    dateDebut: '15 janv. 2024',
    dateFin: '15 avr. 2024',
    feedback: 'Excellent parcours, tous les documents sont conformes',
  },
  {
    id: '2',
    type: 'Emploi',
    status: 'En attente',
    entreprise: 'WebCorp Sénégal',
    isExternal: true,
    secteur: 'Services Web',
    adresse: 'Sacré-Coeur, Dakar',
    description: "CDI développeur full-stack, maintenance et évolution d'applications web clients",
    dateDebut: '20 avr. 2024',
  },
])

const typeChips: Array<'Tous' | UiType> = ['Tous', 'Stage', 'Emploi', 'Alternance', 'Projet']
const statusChips: Array<'Tous statuts' | UiStatus> = [
  'Tous statuts',
  'En cours',
  'En attente',
  'Validée',
  'Rejetée',
]

const stats = computed(() => {
  const total = situations.value.length
  const enCours = situations.value.filter((s) => s.status === 'En cours').length
  const valides = situations.value.filter((s) => s.status === 'Validée').length
  const enAttente = situations.value.filter((s) => s.status === 'En attente').length
  return { total, enCours, valides, enAttente }
})

const filtered = computed(() => {
  return situations.value.filter((s) => {
    const q = search.value.trim().toLowerCase()
    const matchesSearch =
      !q ||
      s.type.toLowerCase().includes(q) ||
      s.entreprise.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)

    const matchesType = selectedType.value === 'Tous' || s.type === selectedType.value
    const matchesStatus =
      selectedStatus.value === 'Tous statuts' || s.status === selectedStatus.value

    return matchesSearch && matchesType && matchesStatus
  })
})

const statusClass = (status: UiStatus) => {
  if (status === 'Validée') return 'bg-emerald-100 text-emerald-700 border-emerald-200'
  if (status === 'En attente') return 'bg-amber-100 text-amber-700 border-amber-200'
  if (status === 'En cours') return 'bg-blue-100 text-blue-700 border-blue-200'
  return 'bg-red-100 text-red-700 border-red-200'
}

const typeIconClass = (type: UiType) => {
  if (type === 'Stage') return 'bg-orange-100 text-orange-500'
  if (type === 'Emploi') return 'bg-emerald-100 text-emerald-600'
  if (type === 'Alternance') return 'bg-blue-100 text-blue-600'
  return 'bg-violet-100 text-violet-600'
}
</script>

<template>
  <ApprenantLayout title="Mes situations" active-menu="situations">
    <section class="space-y-5">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 class="text-4xl font-bold text-slate-900">Mes situations professionnelles</h2>
          <p class="mt-1 text-slate-500">Gérez et suivez toutes vos expériences professionnelles déclarées</p>
        </div>
        <RouterLink
          to="/situations/nouvelle"
          class="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <span class="text-base">＋</span>
          Nouvelle situation
        </RouterLink>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-5xl font-bold text-slate-900">{{ stats.total }}</p>
              <p class="text-slate-500">Total</p>
            </div>
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-500">💼</div>
          </div>
        </article>
        <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-5xl font-bold text-blue-600">{{ stats.enCours }}</p>
              <p class="text-slate-500">En cours</p>
            </div>
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">🕒</div>
          </div>
        </article>
        <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-5xl font-bold text-emerald-600">{{ stats.valides }}</p>
              <p class="text-slate-500">Validées</p>
            </div>
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">✓</div>
          </div>
        </article>
        <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-5xl font-bold text-amber-500">{{ stats.enAttente }}</p>
              <p class="text-slate-500">En attente</p>
            </div>
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">⏳</div>
          </div>
        </article>
      </div>

      <section class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex flex-col gap-3 xl:flex-row">
          <div class="relative xl:w-[360px]">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
            <input
              v-model="search"
              type="text"
              placeholder="Rechercher une situation..."
              class="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-orange-400"
            />
          </div>

          <div class="flex flex-1 flex-wrap items-center gap-2 rounded-xl bg-slate-100 p-1.5">
            <button
              v-for="type in typeChips"
              :key="type"
              class="rounded-lg px-3 py-2 text-sm transition-colors"
              :class="selectedType === type ? 'bg-white text-orange-500 shadow-sm' : 'text-slate-600 hover:text-slate-800'"
              @click="selectedType = type"
            >
              {{ type }}
            </button>
          </div>

          <div class="flex flex-1 flex-wrap items-center gap-2 rounded-xl bg-slate-100 p-1.5">
            <button
              v-for="status in statusChips"
              :key="status"
              class="rounded-lg px-3 py-2 text-sm transition-colors"
              :class="selectedStatus === status ? 'bg-white text-orange-500 shadow-sm' : 'text-slate-600 hover:text-slate-800'"
              @click="selectedStatus = status"
            >
              {{ status }}
            </button>
          </div>
        </div>
      </section>

      <p class="text-sm text-slate-500"><span class="font-semibold text-slate-700">{{ filtered.length }}</span> situations trouvées</p>

      <div class="space-y-3">
        <article
          v-for="item in filtered"
          :key="item.id"
          class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div class="flex gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl" :class="typeIconClass(item.type)">
                <span class="text-xl">💼</span>
              </div>
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-4xl font-bold text-slate-900">{{ item.type }}</h3>
                  <span class="rounded-full border px-2.5 py-0.5 text-sm font-medium" :class="statusClass(item.status)">
                    {{ item.status }}
                  </span>
                  <span
                    v-if="item.isExternal"
                    class="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-0.5 text-sm text-slate-600"
                  >
                    Externe
                  </span>
                </div>

                <p class="mt-1 text-3xl font-medium text-slate-800">{{ item.entreprise }}</p>
                <p v-if="item.secteur" class="mt-0.5 text-slate-500">🏷 {{ item.secteur }}</p>
                <p v-if="item.adresse" class="text-slate-500">📍 {{ item.adresse }}</p>
                <p class="mt-2 text-slate-600">{{ item.description }}</p>

                <div v-if="item.feedback" class="mt-3 border-t border-slate-200 pt-3 text-emerald-600">
                  ☑ {{ item.feedback }}
                </div>
              </div>
            </div>

            <div class="shrink-0 space-y-1 text-right text-slate-600">
              <p>🗓 Début : <span class="font-semibold text-slate-800">{{ item.dateDebut }}</span></p>
              <p v-if="item.dateFin">🗓 Fin : <span class="font-semibold text-slate-800">{{ item.dateFin }}</span></p>
            </div>
          </div>
        </article>
      </div>
    </section>
  </ApprenantLayout>
</template>
