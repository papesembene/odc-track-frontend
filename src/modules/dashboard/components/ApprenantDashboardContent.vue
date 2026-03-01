<script setup lang="ts">
import StatCard from '@/modules/dashboard/components/StatCard.vue'

const recentSituations = [
  {
    title: 'Stage',
    status: 'Validée',
    statusClass: 'bg-emerald-100 text-emerald-700',
    company: 'Orange Digital Center',
    description: "Stage de développement web au sein de l'équipe technique ODC",
    start: '15/01/2024',
    end: '15/06/2024',
  },
]
</script>

<template>
  <section class="space-y-6">

    <!-- Greeting -->
    <div>
      <h2 class="text-2xl font-bold text-slate-900">Bonjour Amadou 👋</h2>
      <p class="mt-1 text-sm text-slate-500">Bienvenue sur votre espace de suivi d'insertion professionnelle</p>
    </div>

    <!-- Stat cards -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total situations" value="2" icon-bg="bg-orange-100">
        <template #icon>
          <svg class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"></rect>
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
          </svg>
        </template>
      </StatCard>

      <StatCard label="En cours" value="0" icon-bg="bg-blue-100" value-class="text-blue-600">
        <template #icon>
          <svg class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </template>
      </StatCard>

      <StatCard label="Validées" value="1" icon-bg="bg-emerald-100" value-class="text-emerald-600">
        <template #icon>
          <svg class="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </template>
      </StatCard>

      <StatCard label="En attente" value="1" icon-bg="bg-amber-100" value-class="text-amber-500">
        <template #icon>
          <svg class="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </template>
      </StatCard>
    </div>

    <!-- Quick actions -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 class="text-base font-semibold text-slate-900">Actions rapides</h3>
      <div class="mt-4 grid gap-3 md:grid-cols-3">

        <button class="flex items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 p-4 text-left hover:border-orange-300 hover:bg-orange-50/30 transition-colors">
          <div class="h-10 w-10 shrink-0 rounded-lg bg-orange-100 flex items-center justify-center">
            <svg class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900">Nouvelle situation</p>
            <p class="text-xs text-slate-500 mt-0.5">Déclarer une situation</p>
          </div>
        </button>

        <button class="flex items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
          <div class="h-10 w-10 shrink-0 rounded-lg bg-blue-100 flex items-center justify-center">
            <svg class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900">Télécharger documents</p>
            <p class="text-xs text-slate-500 mt-0.5">Ajouter des fichiers</p>
          </div>
        </button>

        <button class="flex items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 p-4 text-left hover:border-slate-300 hover:bg-slate-50 transition-colors">
          <div class="h-10 w-10 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center">
            <svg class="h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900">Mettre à jour profil</p>
            <p class="text-xs text-slate-500 mt-0.5">Modifier vos informations</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Recent situations -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold text-slate-900">Mes situations récentes</h3>
        <button class="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          Voir tout
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div class="mt-4 space-y-3">
        <article
          v-for="item in recentSituations"
          :key="item.title"
          class="rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5 flex-wrap">
              <h4 class="text-sm font-semibold text-slate-900">{{ item.title }}</h4>
              <span :class="['rounded-full px-2.5 py-0.5 text-xs font-medium', item.statusClass]">{{ item.status }}</span>
            </div>
            <svg class="h-4 w-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
          <p class="mt-2.5 text-sm text-slate-700 font-medium">{{ item.company }}</p>
          <p class="mt-1 text-sm text-slate-500">{{ item.description }}</p>
          <div class="mt-3 flex items-center gap-4 text-xs text-slate-400">
            <span class="flex items-center gap-1.5">
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Début : {{ item.start }}
            </span>
            <span class="flex items-center gap-1.5">
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Fin : {{ item.end }}
            </span>
          </div>
        </article>
      </div>
    </div>

  </section>
</template>
