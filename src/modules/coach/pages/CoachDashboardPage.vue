<script setup lang="ts">
import CoachLayout from '@/modules/coach/layouts/CoachLayout.vue'

// ── Stat cards ──
const stats = [
  {
    label: 'Apprenants suivis',
    value: '3',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-400',
    icon: 'person',
  },
  {
    label: 'Situations en cours',
    value: '2',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-400',
    icon: 'briefcase',
  },
  {
    label: "Taux d'insertion",
    value: '60%',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    icon: 'trend',
  },
  {
    label: 'Alertes',
    value: '2',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-400',
    icon: 'warning',
  },
]

// ── Students ──
interface Student {
  initials: string
  name: string
  promo: string
  track: string
  situationCount: number
  situationLabel: string
  status: 'En attente' | 'En cours' | 'Validée'
}

const students: Student[] = [
  {
    initials: 'MB',
    name: 'Moussa Ba',
    promo: 'Promo 2024',
    track: 'Développement Web',
    situationCount: 2,
    situationLabel: '2 situations',
    status: 'En attente',
  },
  {
    initials: 'MS',
    name: 'Mariama Sarr',
    promo: 'Promo 2024',
    track: 'Data Science',
    situationCount: 2,
    situationLabel: '2 situations',
    status: 'En cours',
  },
  {
    initials: 'OT',
    name: 'Omar Thiam',
    promo: 'Promo 2023',
    track: 'Développement Web',
    situationCount: 1,
    situationLabel: '1 situation',
    status: 'Validée',
  },
]

const statusClass = (status: Student['status']) => {
  if (status === 'En attente') return 'bg-orange-100 text-orange-600'
  if (status === 'En cours')   return 'bg-blue-100 text-blue-600'
  return 'bg-emerald-100 text-emerald-600'
}

// ── Alerts ──
interface AlertItem {
  type: 'warning' | 'info'
  text: string
  date: string
}

const alerts: AlertItem[] = [
  {
    type: 'warning',
    text: "Mariama Sarr n'a pas déclaré de situation depuis 30 jours",
    date: '15/01/2024',
  },
  {
    type: 'info',
    text: "3 situations en attente de validation par Pôle Emploi",
    date: '14/01/2024',
  },
]

// ── Recent activity ──
interface ActivityItem {
  name: string
  action: string
  detail: string
  date: string
}

const activities: ActivityItem[] = [
  {
    name: 'Moussa Ba',
    action: 'Nouvelle situation déclarée',
    detail: 'Stage',
    date: '2024-01-15 14:30',
  },
  {
    name: 'Mariama Sarr',
    action: 'Document uploadé',
    detail: 'Contrat',
    date: '2024-01-15 11:00',
  },
  {
    name: 'Omar Thiam',
    action: 'Situation validée',
    detail: 'CDI',
    date: '2024-01-14 16:45',
  },
]
</script>

<template>
  <CoachLayout title="Tableau de bord Coach" active-menu="dashboard">
    <div class="space-y-5">

      <!-- ── Stat cards ── -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500">{{ stat.label }}</p>
              <p class="mt-1 text-3xl font-bold text-slate-900">{{ stat.value }}</p>
            </div>
            <div :class="['flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', stat.iconBg]">
              <!-- person -->
              <svg v-if="stat.icon === 'person'" :class="['h-5 w-5', stat.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              <!-- briefcase -->
              <svg v-else-if="stat.icon === 'briefcase'" :class="['h-5 w-5', stat.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
              <!-- trend chart -->
              <svg v-else-if="stat.icon === 'trend'" :class="['h-5 w-5', stat.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="4 4 4 20 20 20"/>
                <polyline points="7 14 11 10 14 13 19 7"/>
              </svg>
              <!-- warning triangle -->
              <svg v-else :class="['h-5 w-5', stat.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
          </div>
        </article>
      </div>

      <!-- ── Main grid: students list + right panel ── -->
      <div class="grid gap-5 xl:grid-cols-[1fr_340px]">

        <!-- Mes apprenants -->
        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h2 class="text-base font-bold text-slate-900">Mes apprenants</h2>
            <RouterLink to="/coach/apprenants" class="text-sm font-semibold text-orange-500 hover:underline">
              Voir tout
            </RouterLink>
          </div>

          <div class="divide-y divide-slate-100 px-4 py-2">
            <div
              v-for="student in students"
              :key="student.name"
              class="flex items-center gap-4 rounded-xl px-2 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <!-- Avatar -->
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                {{ student.initials }}
              </div>

              <!-- Info -->
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-slate-900">{{ student.name }}</p>
                <p class="text-xs text-slate-500">{{ student.promo }} • {{ student.track }}</p>
              </div>

              <!-- Status + chevron -->
              <div class="flex items-center gap-3 shrink-0">
                <div class="text-right">
                  <p class="text-xs text-slate-500 mb-1">{{ student.situationLabel }}</p>
                  <span :class="['rounded-full px-2.5 py-0.5 text-xs font-semibold', statusClass(student.status)]">
                    {{ student.status }}
                  </span>
                </div>
                <svg class="h-4 w-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column -->
        <div class="flex flex-col gap-5">

          <!-- Alertes -->
          <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="px-6 py-5 border-b border-slate-100">
              <h2 class="text-base font-bold text-slate-900">Alertes</h2>
            </div>
            <div class="divide-y divide-slate-100 px-5">
              <div
                v-for="alert in alerts"
                :key="alert.text"
                class="flex items-start gap-3 py-4"
              >
                <!-- warning icon -->
                <svg v-if="alert.type === 'warning'" class="mt-0.5 h-5 w-5 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <!-- info icon -->
                <svg v-else class="mt-0.5 h-5 w-5 shrink-0 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-slate-700 leading-snug">{{ alert.text }}</p>
                  <p class="mt-1 text-xs text-slate-400">{{ alert.date }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Activité récente -->
          <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="px-6 py-5 border-b border-slate-100">
              <h2 class="text-base font-bold text-slate-900">Activité récente</h2>
            </div>
            <div class="divide-y divide-slate-100 px-5">
              <div
                v-for="activity in activities"
                :key="activity.name + activity.date"
                class="flex items-start gap-3 py-4"
              >
                <!-- dot -->
                <span class="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500"></span>
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-slate-900">{{ activity.name }}</p>
                  <p class="text-xs text-slate-500">{{ activity.action }} • {{ activity.detail }}</p>
                  <p class="mt-1 text-xs text-slate-400">{{ activity.date }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </CoachLayout>
</template>
