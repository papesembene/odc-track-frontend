<script setup lang="ts">
import BackofficeLayout from '@/shared/layouts/BackofficeLayout.vue'

type Segment = { label: string; value: number; color: string }

const maxStatut = 98
const maxType   = 68

const statutSegments: Segment[] = [
  { label: 'Validées',   value: 98, color: 'bg-emerald-600' },
  { label: 'En cours',   value: 42, color: 'bg-blue-500' },
  { label: 'En attente', value: 16, color: 'bg-amber-400' },
]

const typeSegments: Segment[] = [
  { label: 'Stage',      value: 68, color: 'bg-orange-500' },
  { label: 'Emploi',     value: 45, color: 'bg-blue-500' },
  { label: 'Alternance', value: 28, color: 'bg-emerald-600' },
  { label: 'Projet',     value: 15, color: 'bg-amber-400' },
]

const promotions = [
  { label: 'Promo 2024', value: 45 },
  { label: 'Promo 2023', value: 38 },
]

const referentiels = [
  { label: 'Développement Web', value: 28 },
  { label: 'Data Science',      value: 18 },
  { label: 'Cybersécurité',     value: 15 },
]

const barWidth = (value: number, max: number) =>
  `${Math.max(5, Math.round((value / max) * 100))}%`
</script>

<template>
  <BackofficeLayout title="Statistiques" active-menu="statistiques">
    <div class="space-y-5">

      <!-- ── Stats Row ── -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <!-- Total apprenants -->
        <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500">Total apprenants</p>
              <p class="mt-1 text-3xl font-bold text-slate-900">83</p>
              <p class="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
                +12% ce mois
              </p>
            </div>
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
              <svg class="h-5 w-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
          </div>
        </article>

        <!-- Total situations -->
        <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500">Total situations</p>
              <p class="mt-1 text-3xl font-bold text-slate-900">156</p>
              <p class="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
                +8% ce mois
              </p>
            </div>
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <svg class="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="7" width="18" height="14" rx="2"/>
                <path d="M8 7V5a4 4 0 0 1 8 0v2"/>
              </svg>
            </div>
          </div>
        </article>

        <!-- Taux d'insertion -->
        <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500">Taux d'insertion</p>
              <p class="mt-1 text-3xl font-bold text-emerald-600">78.5%</p>
              <p class="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
                +3.2% ce mois
              </p>
            </div>
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <svg class="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="4 4 4 20 20 20"/>
                <polyline points="7 14 11 10 14 13 19 7"/>
              </svg>
            </div>
          </div>
        </article>

        <!-- En attente -->
        <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500">En attente</p>
              <p class="mt-1 text-3xl font-bold text-amber-500">16</p>
              <p class="mt-2 text-xs text-slate-400">À valider</p>
            </div>
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">
              <svg class="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
          </div>
        </article>

      </div>

      <!-- ── Bar charts row ── -->
      <div class="grid gap-5 xl:grid-cols-2">

        <!-- Répartition par statut -->
        <section class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 class="text-base font-semibold text-slate-900">Répartition par statut</h2>
          <div class="mt-5 space-y-4">
            <div v-for="seg in statutSegments" :key="seg.label">
              <div class="mb-1.5 flex items-center justify-between">
                <span class="text-sm text-slate-500">{{ seg.label }}</span>
                <span class="text-sm font-semibold text-slate-800">{{ seg.value }}</span>
              </div>
              <div class="h-3 w-full rounded-full bg-slate-100">
                <div
                  class="h-3 rounded-full transition-all duration-500"
                  :class="seg.color"
                  :style="{ width: barWidth(seg.value, maxStatut) }"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Répartition par type -->
        <section class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 class="text-base font-semibold text-slate-900">Répartition par type</h2>
          <div class="mt-5 space-y-4">
            <div v-for="seg in typeSegments" :key="seg.label">
              <div class="mb-1.5 flex items-center justify-between">
                <span class="text-sm text-slate-500">{{ seg.label }}</span>
                <span class="text-sm font-semibold text-slate-800">{{ seg.value }}</span>
              </div>
              <div class="h-3 w-full rounded-full bg-slate-100">
                <div
                  class="h-3 rounded-full transition-all duration-500"
                  :class="seg.color"
                  :style="{ width: barWidth(seg.value, maxType) }"
                />
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- ── Lists row ── -->
      <div class="grid gap-5 xl:grid-cols-2">

        <!-- Situations par promotion -->
        <section class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 class="text-base font-semibold text-slate-900">Situations par promotion</h2>
          <div class="mt-4 space-y-3">
            <div
              v-for="item in promotions"
              :key="item.label"
              class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100">
                  <!-- Graduation cap -->
                  <svg class="h-4 w-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-slate-700">{{ item.label }}</span>
              </div>
              <span class="text-lg font-bold text-orange-500">{{ item.value }}</span>
            </div>
          </div>
        </section>

        <!-- Situations par référentiel -->
        <section class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 class="text-base font-semibold text-slate-900">Situations par référentiel</h2>
          <div class="mt-4 space-y-3">
            <div
              v-for="item in referentiels"
              :key="item.label"
              class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <!-- Monitor/screen icon -->
                  <svg class="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-slate-700">{{ item.label }}</span>
              </div>
              <span class="text-lg font-bold text-blue-600">{{ item.value }}</span>
            </div>
          </div>
        </section>

      </div>

    </div>
  </BackofficeLayout>
</template>
