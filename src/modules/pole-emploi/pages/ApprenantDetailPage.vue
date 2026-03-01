<script setup lang="ts">
import { ref } from 'vue'
import BackofficeLayout from '@/shared/layouts/BackofficeLayout.vue'

const activeTab = ref<'situations' | 'documents' | 'informations'>('situations')

const documents = [
  { type: 'Convention', context: 'Stage', uploadedAt: '12/01/2024' },
  { type: 'Attestation', context: 'Stage', uploadedAt: '16/04/2024' },
  { type: 'Rapport', context: 'Stage', uploadedAt: '18/04/2024' },
  { type: 'Contrat', context: 'Emploi', uploadedAt: '17/04/2024' },
]
</script>

<template>
  <BackofficeLayout title="Détail apprenant" active-menu="apprenants">
    <div class="space-y-5">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-1.5 text-sm text-slate-500">
        <span class="hover:text-slate-700 cursor-pointer">Tableau de bord</span>
        <svg class="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        <span class="hover:text-slate-700 cursor-pointer">Apprenants</span>
        <svg class="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        <span class="font-medium text-slate-800">Moussa Ba</span>
      </nav>

      <!-- Profile card -->
      <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-start justify-between gap-6">
          <div class="flex items-center gap-5">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-50 text-lg font-bold text-orange-500">MB</div>
            <div>
              <h2 class="text-2xl font-bold text-slate-900">Moussa Ba</h2>
              <div class="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span class="flex items-center gap-1.5">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  apprenant1@odc.sn
                </span>
                <span class="flex items-center gap-1.5">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
              </div>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs text-slate-600">Promo 2024</span>
                <span class="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs text-slate-600">Développement Web</span>
              </div>
            </div>
          </div>
          <div class="text-right shrink-0">
            <p class="text-xs text-slate-500">Situations</p>
            <p class="text-3xl font-bold text-slate-900">2</p>
          </div>
        </div>
      </section>

      <!-- Tabs + content -->
      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <!-- Tab bar -->
        <div class="border-b border-slate-200 px-5">
          <div class="flex">
            <button
              class="flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition-colors"
              :class="activeTab === 'situations' ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-500 hover:text-slate-700'"
              @click="activeTab = 'situations'"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              Situations
            </button>
            <button
              class="flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition-colors"
              :class="activeTab === 'documents' ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-500 hover:text-slate-700'"
              @click="activeTab = 'documents'"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Documents
            </button>
            <button
              class="flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition-colors"
              :class="activeTab === 'informations' ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-500 hover:text-slate-700'"
              @click="activeTab = 'informations'"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Informations
            </button>
          </div>
        </div>

        <!-- Situations -->
        <div v-if="activeTab === 'situations'">
          <!-- Stage – Validée -->
          <article class="border-b border-slate-200 p-6">
            <div class="flex items-center gap-3">
              <h3 class="text-base font-semibold text-slate-900">Stage</h3>
              <span class="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Validée</span>
            </div>

            <div class="mt-4 grid gap-4 rounded-xl bg-slate-50 p-4 lg:grid-cols-3">
              <div>
                <p class="text-xs text-slate-500">Date de début</p>
                <p class="mt-0.5 text-sm font-semibold text-slate-900">15/01/2024</p>
              </div>
              <div>
                <p class="text-xs text-slate-500">Date de fin</p>
                <p class="mt-0.5 text-sm font-semibold text-slate-900">15/04/2024</p>
              </div>
              <div>
                <p class="text-xs text-slate-500">Créée le</p>
                <p class="mt-0.5 text-sm font-semibold text-slate-900">Invalid Date</p>
              </div>
            </div>

            <div class="mt-4">
              <p class="text-xs text-slate-500">Description</p>
              <p class="mt-1 text-sm text-slate-800">Stage de développement web chez Sonatel, travail sur des applications React et Node.js</p>
            </div>
          </article>

          <!-- Emploi – En attente -->
          <article class="p-6">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div class="flex items-center gap-3">
                  <h3 class="text-base font-semibold text-slate-900">Emploi</h3>
                  <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">En attente</span>
                </div>
                <p class="mt-3 text-sm font-medium text-slate-800">WebCorp Sénégal</p>
                <p class="mt-1 text-xs text-slate-500">Secteur:</p>
                <p class="text-xs text-slate-500">Adresse:</p>
              </div>

              <div class="flex gap-2">
                <button class="flex items-center gap-1.5 rounded-xl border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50 transition-colors">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Rejeter
                </button>
                <button class="flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Valider
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Documents -->
        <div v-else-if="activeTab === 'documents'" class="grid gap-4 p-6 md:grid-cols-2">
          <article
            v-for="doc in documents"
            :key="`${doc.type}-${doc.uploadedAt}`"
            class="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5"
          >
            <div class="flex items-center gap-4">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                <svg class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div>
                <span class="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600">{{ doc.type }}</span>
                <p class="mt-1.5 text-sm text-slate-700">{{ doc.context }}</p>
                <p class="text-xs text-slate-500">Uploadé le {{ doc.uploadedAt }}</p>
              </div>
            </div>
            <button class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-500 text-orange-500 hover:bg-orange-50 transition-colors">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
          </article>
        </div>

        <!-- Informations -->
        <div v-else class="grid gap-8 p-6 lg:grid-cols-2">
          <section>
            <h3 class="text-sm font-semibold text-slate-900">Informations personnelles</h3>
            <div class="mt-5 space-y-5">
              <div>
                <p class="text-xs text-slate-500">Nom complet</p>
                <p class="mt-0.5 text-sm font-semibold text-slate-900">Moussa Ba</p>
              </div>
              <div>
                <p class="text-xs text-slate-500">Email</p>
                <p class="mt-0.5 text-sm font-semibold text-slate-900">apprenant1@odc.sn</p>
              </div>
              <div>
                <p class="text-xs text-slate-500">Téléphone</p>
              </div>
            </div>
          </section>

          <section>
            <h3 class="text-sm font-semibold text-slate-900">Formation</h3>
            <div class="mt-5 space-y-5">
              <div>
                <p class="text-xs text-slate-500">Promotion</p>
                <p class="mt-0.5 text-sm font-semibold text-slate-900">Promo 2024</p>
              </div>
              <div>
                <p class="text-xs text-slate-500">Référentiel</p>
                <p class="mt-0.5 text-sm font-semibold text-slate-900">Développement Web</p>
              </div>
              <div>
                <p class="text-xs text-slate-500">Rôle</p>
                <span class="mt-1 inline-block rounded-full border border-slate-300 bg-slate-50 px-3 py-0.5 text-xs text-slate-600">Apprenant</span>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  </BackofficeLayout>
</template>
