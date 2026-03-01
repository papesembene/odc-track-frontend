<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BackofficeLayout from '@/shared/layouts/BackofficeLayout.vue'
import StatCard from '@/modules/pole-emploi/components/StatCard.vue'
import QuickAccessCard from '@/modules/pole-emploi/components/QuickAccessCard.vue'

const recentActivity = [
  {
    id: 1,
    name: 'Moussa Ba',
    statut: 'Validée',
    detail: 'Stage -',
    date: 'Invalid Date',
  },
]
</script>

<template>
  <BackofficeLayout title="Tableau de bord Pôle Emploi" active-menu="dashboard">
    <div class="space-y-5">

      <!-- ── Stats Row ── -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <!-- Total apprenants -->
        <StatCard label="Total apprenants" value="6" value-class="text-slate-900" icon-bg-class="bg-orange-50">
          <svg class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </StatCard>

        <!-- En attente -->
        <StatCard label="En attente" value="3" value-class="text-amber-500" icon-bg-class="bg-amber-50">
          <svg class="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </StatCard>

        <!-- Validées -->
        <StatCard label="Validées" value="4" value-class="text-emerald-600" icon-bg-class="bg-emerald-50">
          <svg class="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <polyline points="9 12 11.5 14.5 15.5 10"/>
          </svg>
        </StatCard>

        <!-- Taux validation -->
        <StatCard label="Taux validation" value="50.0%" value-class="text-blue-600" icon-bg-class="bg-blue-50">
          <svg class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 4 4 20 20 20"/>
            <polyline points="7 14 11 10 14 13 19 7"/>
          </svg>
        </StatCard>

      </div>

      <!-- ── Alert Banner ── -->
      <section class="flex flex-col gap-4 rounded-xl border-2 border-orange-400 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-start gap-4">
          <!-- Warning icon -->
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">
            <svg class="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <p class="text-base font-semibold text-slate-900">3 situations en attente de validation</p>
            <p class="mt-1 text-sm text-slate-500">Des situations professionnelles nécessitent votre validation</p>
          </div>
        </div>
        <RouterLink
          to="/validations"
          class="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
        >
          Voir les validations
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="13 6 19 12 13 18"/>
          </svg>
        </RouterLink>
      </section>

      <!-- ── Quick Access Cards ── -->
      <div class="grid gap-4 sm:grid-cols-3">

        <RouterLink to="/validations">
          <QuickAccessCard title="Validations" subtitle="Gérer les validations" icon-bg-class="bg-orange-50">
            <svg class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <polyline points="9 12 11.5 14.5 15.5 10"/>
            </svg>
          </QuickAccessCard>
        </RouterLink>

        <RouterLink to="/apprenants">
          <QuickAccessCard title="Apprenants" subtitle="Liste des apprenants" icon-bg-class="bg-orange-50">
            <svg class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </QuickAccessCard>
        </RouterLink>

        <RouterLink to="/statistiques">
          <QuickAccessCard title="Statistiques" subtitle="Voir les statistiques" icon-bg-class="bg-blue-50">
            <svg class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6"  y1="20" x2="6"  y2="14"/>
            </svg>
          </QuickAccessCard>
        </RouterLink>

      </div>

      <!-- ── Activité récente ── -->
      <section class="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-200 px-6 py-4">
          <h2 class="text-base font-semibold text-slate-900">Activité récente</h2>
        </div>

        <article
          v-for="item in recentActivity"
          :key="item.id"
          class="border-b border-slate-200 px-6 py-4 last:border-b-0"
        >
          <div class="flex flex-wrap items-center gap-2">
            <p class="text-sm font-semibold text-slate-900">{{ item.name }}</p>
            <span class="rounded-full border border-emerald-400 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
              {{ item.statut }}
            </span>
          </div>
          <p class="mt-1 text-xs text-slate-500">{{ item.detail }}</p>
          <p class="mt-0.5 text-xs text-slate-400">Créée le {{ item.date }}</p>
        </article>
      </section>

    </div>
  </BackofficeLayout>
</template>
