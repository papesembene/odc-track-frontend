<script setup lang="ts">
import DocumentCard from './DocumentCard.vue'

type DocStatus = 'Validée' | 'En attente' | 'En cours' | 'Rejetée'
type SituationType = 'Stage' | 'Emploi' | 'Alternance' | 'Projet'

export type DocumentItem = {
  id: string
  name: string
  type: string
  date: string
}

defineProps<{
  type: SituationType
  status: DocStatus
  entreprise?: string
  dateDebut: string
  dateFin?: string
  description: string
  documents: DocumentItem[]
}>()

const statusClass = (status: DocStatus) => {
  if (status === 'Validée') return 'bg-emerald-50 text-emerald-600 border-emerald-200'
  if (status === 'En attente') return 'bg-amber-50 text-amber-600 border-amber-200'
  if (status === 'En cours') return 'bg-blue-50 text-blue-600 border-blue-200'
  return 'bg-red-50 text-red-600 border-red-200'
}

const typeIconBg = (type: SituationType) => {
  if (type === 'Stage') return 'bg-orange-100 text-orange-500'
  if (type === 'Emploi') return 'bg-emerald-100 text-emerald-600'
  if (type === 'Alternance') return 'bg-blue-100 text-blue-600'
  return 'bg-violet-100 text-violet-600'
}
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
    <!-- Group header -->
    <div class="flex items-start gap-3">
      <!-- Type icon -->
      <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" :class="typeIconBg(type)">
        <svg v-if="type === 'Stage'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
        <svg v-else-if="type === 'Emploi'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
        <svg v-else-if="type === 'Alternance'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        </svg>
      </div>

      <!-- Situation info -->
      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap items-center gap-2">
          <p v-if="entreprise" class="text-base font-bold text-slate-900">{{ entreprise }}</p>
          <span
            class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
            :class="statusClass(status)"
          >{{ status }}</span>
        </div>
        <p class="mt-0.5 text-sm text-slate-500">
          {{ type }} • Du {{ dateDebut }}<span v-if="dateFin"> au {{ dateFin }}</span>
        </p>
        <p class="mt-1 text-sm text-slate-600">{{ description }}</p>
      </div>

      <!-- Voir détails -->
      <a href="#" class="shrink-0 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors whitespace-nowrap">
        Voir détails
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>

    <!-- Divider -->
    <div class="border-t border-slate-100" />

    <!-- Document cards grid -->
    <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <DocumentCard
        v-for="doc in documents"
        :key="doc.id"
        :name="doc.name"
        :type="doc.type"
        :date="doc.date"
      />
    </div>
  </div>
</template>
