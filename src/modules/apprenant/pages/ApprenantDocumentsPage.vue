<script setup lang="ts">
import { computed, ref } from 'vue'
import ApprenantLayout from '@/shared/layouts/ApprenantLayout.vue'
import DocumentGroup from '@/modules/apprenant/components/DocumentGroup.vue'
import AddDocumentModal from '@/modules/apprenant/components/AddDocumentModal.vue'
import type { DocumentItem } from '@/modules/apprenant/components/DocumentGroup.vue'

type DocStatus = 'Validée' | 'En attente' | 'En cours' | 'Rejetée'
type SituationType = 'Stage' | 'Emploi' | 'Alternance' | 'Projet'

type SituationGroup = {
  id: string
  type: SituationType
  status: DocStatus
  entreprise?: string
  dateDebut: string
  dateFin?: string
  description: string
  documents: DocumentItem[]
}

const showModal = ref(false)

const groups = ref<SituationGroup[]>([
  {
    id: '1',
    type: 'Stage',
    status: 'Validée',
    dateDebut: '15/01/2024',
    dateFin: '15/04/2024',
    description: 'Stage de développement web chez Sonatel, travail sur des applications React et Node.js',
    documents: [
      { id: 'd1', name: 'Convention de stage Sonatel.pdf', type: 'Convention', date: '12/01/2024' },
      { id: 'd2', name: 'Attestation de stage.pdf', type: 'Attestation', date: '16/04/2024' },
      { id: 'd3', name: 'Rapport de stage final.pdf', type: 'Rapport', date: '18/04/2024' },
    ],
  },
  {
    id: '2',
    type: 'Emploi',
    status: 'En attente',
    entreprise: 'WebCorp Sénégal',
    dateDebut: '20/04/2024',
    description: "CDI développeur full-stack, maintenance et évolution d'applications web clients",
    documents: [
      { id: 'd4', name: 'Contrat CDI WebCorp.pdf', type: 'Contrat', date: '20/04/2024' },
    ],
  },
])

const stats = computed(() => ({
  total: groups.value.reduce((acc, g) => acc + g.documents.length, 0),
  situations: groups.value.length,
  validees: groups.value.filter(g => g.status === 'Validée').length,
}))
</script>

<template>
  <ApprenantLayout title="Mes documents" active-menu="documents">
    <section class="space-y-5">

      <!-- Header -->
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">Mes documents</h2>
          <p class="mt-1 text-sm text-slate-500">Gérez tous vos documents liés à vos situations professionnelles</p>
        </div>
        <button
          class="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          @click="showModal = true"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Ajouter un document
        </button>
      </div>

      <!-- Stats -->
      <div class="grid gap-4 sm:grid-cols-3">
        <!-- Documents totaux -->
        <article class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100">
            <svg class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-900">{{ stats.total }}</p>
            <p class="text-sm text-slate-500">Documents totaux</p>
          </div>
        </article>

        <!-- Situations -->
        <article class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
            <svg class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
          <div>
            <p class="text-3xl font-bold text-blue-600">{{ stats.situations }}</p>
            <p class="text-sm text-slate-500">Situations</p>
          </div>
        </article>

        <!-- Situations validées -->
        <article class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
            <svg class="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div>
            <p class="text-3xl font-bold text-emerald-600">{{ stats.validees }}</p>
            <p class="text-sm text-slate-500">Situations validées</p>
          </div>
        </article>
      </div>

      <!-- Document groups -->
      <div class="space-y-4">
        <DocumentGroup
          v-for="group in groups"
          :key="group.id"
          :type="group.type"
          :status="group.status"
          :entreprise="group.entreprise"
          :date-debut="group.dateDebut"
          :date-fin="group.dateFin"
          :description="group.description"
          :documents="group.documents"
        />
      </div>

    </section>

    <!-- Modal -->
    <AddDocumentModal :open="showModal" @close="showModal = false" />
  </ApprenantLayout>
</template>
