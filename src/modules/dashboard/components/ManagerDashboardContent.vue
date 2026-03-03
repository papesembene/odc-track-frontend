<script setup lang="ts">
import StatCard from './StatCard.vue'

const byStatus = [
  { label: 'Validées', value: 98, total: 203, color: 'bg-emerald-500' },
  { label: 'En cours', value: 78, total: 203, color: 'bg-blue-600' },
  { label: 'En attente', value: 27, total: 203, color: 'bg-amber-500' },
]

const byType = [
  { label: 'Stage', value: 98, total: 203, color: 'bg-orange-500' },
  { label: 'Emploi', value: 67, total: 203, color: 'bg-blue-600' },
  { label: 'Alternance', value: 28, total: 203, color: 'bg-emerald-500' },
  { label: 'Projet', value: 10, total: 203, color: 'bg-amber-500' },
]

const byPromo = [
  { label: 'Promo 2024', value: 89, iconBg: 'bg-orange-100', valueClass: 'text-orange-500' },
]

const byRef = [
  { label: 'Développement Web et Mobile', value: 78, iconBg: 'bg-blue-100', valueClass: 'text-blue-600' },
]

function barWidth(value: number, total: number) {
  return `${Math.round((value / total) * 100)}%`
}
</script>

<template>
  <section class="space-y-6">

    <!-- Stat cards -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total apprenants" value="156" icon-bg="bg-orange-100" subtitle="↑ +12% ce mois">
        <template #icon>
          <svg class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </template>
      </StatCard>

      <StatCard label="Total situations" value="203" icon-bg="bg-blue-100" subtitle="↑ +8% ce mois">
        <template #icon>
          <svg class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"></rect>
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
          </svg>
        </template>
      </StatCard>

      <StatCard label="Taux d'insertion" value="72.5%" icon-bg="bg-emerald-100" value-class="text-emerald-600" subtitle="↑ +3.2% ce mois">
        <template #icon>
          <svg class="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 4 4 20 20 20"></polyline>
            <polyline points="7 14 11 10 14 13 19 7"></polyline>
          </svg>
        </template>
      </StatCard>

      <StatCard label="En attente" value="27" icon-bg="bg-amber-100" value-class="text-amber-500" subtitle="À valider" subtitle-class="text-slate-500">
        <template #icon>
          <svg class="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </template>
      </StatCard>
    </div>

    <!-- Distribution charts -->
    <div class="grid gap-6 xl:grid-cols-2">

      <!-- By status -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-base font-semibold text-slate-900">Répartition par statut</h3>
        <div class="mt-5 space-y-5">
          <div v-for="item in byStatus" :key="item.label">
            <div class="mb-2 flex items-center justify-between">
              <span class="text-sm text-slate-500">{{ item.label }}</span>
              <span class="text-sm font-semibold text-slate-900">{{ item.value }}</span>
            </div>
            <div class="h-2 rounded-full bg-slate-100">
              <div :class="['h-2 rounded-full transition-all', item.color]" :style="{ width: barWidth(item.value, item.total) }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- By type -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-base font-semibold text-slate-900">Répartition par type</h3>
        <div class="mt-5 space-y-5">
          <div v-for="item in byType" :key="item.label">
            <div class="mb-2 flex items-center justify-between">
              <span class="text-sm text-slate-500">{{ item.label }}</span>
              <span class="text-sm font-semibold text-slate-900">{{ item.value }}</span>
            </div>
            <div class="h-2 rounded-full bg-slate-100">
              <div :class="['h-2 rounded-full transition-all', item.color]" :style="{ width: barWidth(item.value, item.total) }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom sections -->
    <div class="grid gap-6 xl:grid-cols-2">

      <!-- By promo -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-base font-semibold text-slate-900">Situations par promotion</h3>
        <div class="mt-4 space-y-3">
          <div
            v-for="item in byPromo"
            :key="item.label"
            class="flex items-center gap-4 rounded-xl bg-slate-50 px-4 py-3.5"
          >
            <div :class="['h-10 w-10 shrink-0 rounded-xl flex items-center justify-center', item.iconBg]">
              <svg class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <span class="flex-1 text-sm font-medium text-slate-700">{{ item.label }}</span>
            <span :class="['text-2xl font-bold', item.valueClass]">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <!-- By référentiel -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-base font-semibold text-slate-900">Situations par référentiel</h3>
        <div class="mt-4 space-y-3">
          <div
            v-for="item in byRef"
            :key="item.label"
            class="flex items-center gap-4 rounded-xl bg-slate-50 px-4 py-3.5"
          >
            <div :class="['h-10 w-10 shrink-0 rounded-xl flex items-center justify-center', item.iconBg]">
              <svg class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <span class="flex-1 text-sm font-medium text-slate-700">{{ item.label }}</span>
            <span :class="['text-2xl font-bold', item.valueClass]">{{ item.value }}</span>
          </div>
        </div>
      </div>

    </div>

  </section>
</template>
