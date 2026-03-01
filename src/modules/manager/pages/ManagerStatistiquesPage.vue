<script setup lang="ts">
import { ref, computed } from 'vue'
import ManagerLayout from '@/modules/manager/layouts/ManagerLayout.vue'
import StatCard from '@/modules/manager/components/stats/StatCard.vue'
import StatusCard from '@/modules/manager/components/stats/StatusCard.vue'
import BreakdownSection from '@/modules/manager/components/stats/BreakdownSection.vue'
import PromoCard from '@/modules/manager/components/stats/PromoCard.vue'
import MonthlyChart from '@/modules/manager/components/stats/MonthlyChart.vue'

// ── Year filter ──
type YearFilter = '2023' | '2024' | 'Tout'
const selectedYear = ref<YearFilter>('2023')
const yearFilters: YearFilter[] = ['2023', '2024', 'Tout']

// ── Overview stats per year ──
const statsData: Record<YearFilter, {
  totalApprenants: number
  situationsTotales: number
  situationsValidees: number
  tauxInsertion: string
  enCours: { count: number; pct: number }
  enAttente: { count: number; pct: number }
  validees: { count: number; pct: number }
}> = {
  '2023': {
    totalApprenants: 6,
    situationsTotales: 8,
    situationsValidees: 4,
    tauxInsertion: '78.5%',
    enCours:   { count: 1, pct: 13 },
    enAttente: { count: 3, pct: 38 },
    validees:  { count: 4, pct: 50 },
  },
  '2024': {
    totalApprenants: 45,
    situationsTotales: 12,
    situationsValidees: 6,
    tauxInsertion: '50%',
    enCours:   { count: 3, pct: 25 },
    enAttente: { count: 3, pct: 25 },
    validees:  { count: 6, pct: 50 },
  },
  'Tout': {
    totalApprenants: 83,
    situationsTotales: 20,
    situationsValidees: 10,
    tauxInsertion: '63.4%',
    enCours:   { count: 4, pct: 20 },
    enAttente: { count: 6, pct: 30 },
    validees:  { count: 10, pct: 50 },
  },
}

const currentStats = computed(() => statsData[selectedYear.value])

// ── Répartition par type ──
const typeBreakdown = [
  { label: 'Stage',       count: 68, unit: 'situations', colorClass: 'bg-orange-500' },
  { label: 'Emploi',      count: 45, unit: 'situations', colorClass: 'bg-green-500'  },
  { label: 'Alternance',  count: 28, unit: 'situations', colorClass: 'bg-blue-500'   },
  { label: 'Projet',      count: 15, unit: 'situations', colorClass: 'bg-yellow-400' },
]

// ── Par référentiel ──
const referentielBreakdown = [
  { label: 'Développement Web',    count: 28, unit: 'apprenants', colorClass: 'bg-orange-500' },
  { label: 'Data Science',         count: 18, unit: 'apprenants', colorClass: 'bg-green-500'  },
  { label: 'Cybersécurité',        count: 15, unit: 'apprenants', colorClass: 'bg-orange-400' },
  { label: 'Développement Mobile', count: 22, unit: 'apprenants', colorClass: 'bg-blue-500'   },
]

// ── Performance par promotion ──
const promotions = [
  {
    name: 'Promo 2024',
    status: 'En cours',
    statusTextClass: 'text-green-600',
    statusBgClass: 'bg-green-50',
    statusBorderClass: 'border-green-400',
    apprenants: 45,
    situations: 6,
    tauxInsertion: 50,
    progress: 50,
  },
  {
    name: 'Promo 2023',
    status: 'Terminée',
    statusTextClass: 'text-slate-500',
    statusBgClass: 'bg-slate-50',
    statusBorderClass: 'border-slate-300',
    apprenants: 38,
    situations: 2,
    tauxInsertion: 50,
    progress: 50,
  },
  {
    name: 'Promo 2025',
    status: 'À venir',
    statusTextClass: 'text-amber-600',
    statusBgClass: 'bg-amber-50',
    statusBorderClass: 'border-amber-400',
    apprenants: 0,
    situations: 0,
    tauxInsertion: 0,
    progress: 0,
  },
]
</script>

<template>
  <ManagerLayout title="Statistiques" active-menu="statistiques">
    <div class="space-y-6">

      <!-- ══════════════════════════════
           Vue d'ensemble
      ══════════════════════════════ -->
      <section>
        <!-- Title row + year filter -->
        <div class="flex flex-wrap items-start justify-between gap-4 mb-2">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Vue d'ensemble</h2>
            <p class="text-sm text-slate-500 mt-0.5">Suivi de l'insertion professionnelle</p>
          </div>
          <!-- Year filter buttons -->
          <div class="flex gap-2">
            <button
              v-for="year in yearFilters"
              :key="year"
              @click="selectedYear = year"
              :class="[
                'rounded-xl px-4 py-2 text-sm font-semibold border transition-colors',
                selectedYear === year
                  ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-500',
              ]"
            >{{ year }}</button>
          </div>
        </div>

        <!-- 4 Stat cards -->
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-5">
          <StatCard
            icon="graduation"
            :value="String(currentStats.totalApprenants)"
            label="Total apprenants"
            icon-bg="bg-orange-50"
            icon-color="text-orange-400"
          />
          <StatCard
            icon="briefcase"
            :value="String(currentStats.situationsTotales)"
            label="Situations totales"
            icon-bg="bg-blue-50"
            icon-color="text-blue-400"
          />
          <StatCard
            icon="check"
            :value="String(currentStats.situationsValidees)"
            label="Situations validées"
            icon-bg="bg-green-50"
            icon-color="text-green-500"
          />
          <StatCard
            icon="trend"
            :value="currentStats.tauxInsertion"
            label="Taux d'insertion"
            icon-bg="bg-amber-50"
            icon-color="text-amber-400"
          />
        </div>

        <!-- 3 Status cards -->
        <div class="grid gap-4 sm:grid-cols-3 mt-4">
          <StatusCard
            :count="currentStats.enCours.count"
            label="En cours"
            :percentage="currentStats.enCours.pct"
            color="blue"
          />
          <StatusCard
            :count="currentStats.enAttente.count"
            label="En attente validation"
            :percentage="currentStats.enAttente.pct"
            color="orange"
          />
          <StatusCard
            :count="currentStats.validees.count"
            label="Validées"
            :percentage="currentStats.validees.pct"
            color="green"
          />
        </div>
      </section>

      <!-- ══════════════════════════════
           Répartition + Par référentiel
      ══════════════════════════════ -->
      <div class="grid gap-5 md:grid-cols-2">
        <BreakdownSection
          title="Répartition par type"
          :items="typeBreakdown"
        />
        <BreakdownSection
          title="Par référentiel"
          :items="referentielBreakdown"
        />
      </div>

      <!-- ══════════════════════════════
           Performance par promotion
      ══════════════════════════════ -->
      <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="text-base font-bold text-slate-900 mb-5">Performance par promotion</h2>
        <div class="grid gap-4 sm:grid-cols-3">
          <PromoCard
            v-for="promo in promotions"
            :key="promo.name"
            v-bind="promo"
          />
        </div>
      </section>

      <!-- ══════════════════════════════
           Évolution mensuelle
      ══════════════════════════════ -->
      <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="text-base font-bold text-slate-900 mb-6">Évolution mensuelle 2024</h2>
        <MonthlyChart />
      </section>

    </div>
  </ManagerLayout>
</template>
