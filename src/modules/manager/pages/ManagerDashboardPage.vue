<script setup lang="ts">
import ManagerLayout from '@/modules/manager/layouts/ManagerLayout.vue'

// ── Stat cards ──
const stats = [
  {
    label: 'Total Apprenants',
    value: '6',
    badge: '+5 ce mois',
    badgeClass: 'bg-emerald-50 text-emerald-600',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-400',
    icon: 'graduation',
  },
  {
    label: 'Coaches actifs',
    value: '2',
    badge: 'Stable',
    badgeClass: 'bg-slate-100 text-slate-500',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    icon: 'coach',
  },
  {
    label: 'Situations validées',
    value: '4',
    badge: '+3 cette semaine',
    badgeClass: 'bg-emerald-50 text-emerald-600',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-400',
    icon: 'check',
  },
  {
    label: "Taux d'insertion",
    value: '78.5%',
    badge: '+2.3% vs mois dernier',
    badgeClass: 'bg-emerald-50 text-emerald-600',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-400',
    icon: 'trend',
  },
]

// ── Alert banners ──
const alerts = [
  {
    type: 'warning',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-400',
    text: '3 situations en attente de validation Pôle Emploi',
  },
  {
    type: 'info',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-400',
    text: '2 apprenants sans situation déclarée depuis 30 jours',
  },
  {
    type: 'success',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    text: 'Promo 2024 : 78% de taux d\'insertion atteint',
  },
]

// ── Activité récente ──
const activities = [
  {
    id: 1,
    name: 'Moussa Ba',
    action: 'Nouvelle situation déclarée',
    tag: 'Stage',
    tagClass: 'bg-orange-100 text-orange-600',
    time: 'Il y a 15 min',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    icon: 'briefcase',
  },
  {
    id: 2,
    name: 'Mariama Sarr',
    action: 'Document uploadé',
    tag: 'Contrat',
    tagClass: 'bg-blue-100 text-blue-600',
    time: 'Il y a 1h',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    icon: 'document',
  },
  {
    id: 3,
    name: 'Omar Thiam',
    action: 'Situation validée',
    tag: 'CDI',
    tagClass: 'bg-emerald-100 text-emerald-600',
    time: 'Il y a 2h',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-500',
    icon: 'check',
  },
  {
    id: 4,
    name: 'Aminata Diallo',
    action: 'Profil mis à jour',
    tag: '',
    tagClass: '',
    time: 'Il y a 3h',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-400',
    icon: 'person',
  },
]

// ── Coaches ──
const coaches = [
  { initials: 'I', name: 'Ibrahima Sow',  apprenants: 3, taux: 85 },
  { initials: 'A', name: 'Aissatou Fall', apprenants: 3, taux: 72 },
]

// ── Promotions ──
const promotions = [
  {
    name: 'Promo 2024',
    status: 'En cours',
    statusClass: 'border-emerald-400 text-emerald-600 bg-emerald-50',
    apprenants: 45,
    taux: 78,
    hasTaux: true,
  },
  {
    name: 'Promo 2023',
    status: 'Terminée',
    statusClass: 'border-slate-300 text-slate-500 bg-slate-50',
    apprenants: 38,
    taux: 91,
    hasTaux: true,
  },
  {
    name: 'Promo 2025',
    status: 'À venir',
    statusClass: 'border-amber-400 text-amber-600 bg-amber-50',
    apprenants: 0,
    taux: 0,
    hasTaux: false,
  },
]
</script>

<template>
  <ManagerLayout title="Tableau de bord Manager" active-menu="dashboard">
    <div class="space-y-5">

      <!-- ── Stat cards ── -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div class="flex items-start justify-between">
            <div :class="['flex h-11 w-11 items-center justify-center rounded-xl', stat.iconBg]">
              <!-- graduation cap -->
              <svg v-if="stat.icon === 'graduation'" :class="['h-5 w-5', stat.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <!-- coach star -->
              <svg v-else-if="stat.icon === 'coach'" :class="['h-5 w-5', stat.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                <polyline points="15 3 16.5 6 20 6.5 17.5 9 18 12.5 15 11 12 12.5 12.5 9 10 6.5 13.5 6"/>
              </svg>
              <!-- check circle -->
              <svg v-else-if="stat.icon === 'check'" :class="['h-5 w-5', stat.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <polyline points="9 12 11.5 14.5 15.5 10"/>
              </svg>
              <!-- trend chart -->
              <svg v-else :class="['h-5 w-5', stat.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="4 4 4 20 20 20"/>
                <polyline points="7 14 11 10 14 13 19 7"/>
              </svg>
            </div>
            <span :class="['rounded-full px-2.5 py-0.5 text-xs font-medium', stat.badgeClass]">{{ stat.badge }}</span>
          </div>
          <p class="mt-4 text-3xl font-bold text-slate-900">{{ stat.value }}</p>
          <p class="mt-1 text-sm text-slate-500">{{ stat.label }}</p>
        </article>
      </div>

      <!-- ── Alert banners ── -->
      <div class="grid gap-4 sm:grid-cols-3">
        <div
          v-for="alert in alerts"
          :key="alert.text"
          :class="['rounded-2xl p-4', alert.bg]"
        >
          <div class="flex items-start gap-3">
            <!-- warning -->
            <svg v-if="alert.type === 'warning'" :class="['mt-0.5 h-5 w-5 shrink-0', alert.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <!-- info -->
            <svg v-else-if="alert.type === 'info'" :class="['mt-0.5 h-5 w-5 shrink-0', alert.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <!-- success check -->
            <svg v-else :class="['mt-0.5 h-5 w-5 shrink-0', alert.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <polyline points="9 12 11.5 14.5 15.5 10"/>
            </svg>
            <p class="text-sm text-slate-700 font-medium leading-snug">{{ alert.text }}</p>
          </div>
          <button class="mt-3 text-sm font-semibold text-orange-500 hover:underline">Voir le détail →</button>
        </div>
      </div>

      <!-- ── Activité récente + Coaches ── -->
      <div class="grid gap-5 xl:grid-cols-[1fr_320px]">

        <!-- Activité récente -->
        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center justify-between px-6 py-4">
            <h2 class="text-base font-bold text-slate-900">Activité récente</h2>
            <button class="text-sm font-semibold text-orange-500 hover:underline">Voir tout</button>
          </div>
          <div class="divide-y divide-slate-100 px-6">
            <article v-for="item in activities" :key="item.id" class="flex items-start gap-4 py-4">
              <div :class="['flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', item.iconBg]">
                <!-- briefcase -->
                <svg v-if="item.icon === 'briefcase'" :class="['h-4 w-4', item.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                </svg>
                <!-- document -->
                <svg v-else-if="item.icon === 'document'" :class="['h-4 w-4', item.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <!-- check -->
                <svg v-else-if="item.icon === 'check'" :class="['h-4 w-4', item.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <polyline points="9 12 11.5 14.5 15.5 10"/>
                </svg>
                <!-- person -->
                <svg v-else :class="['h-4 w-4', item.iconColor]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-sm font-semibold text-slate-900">{{ item.name }}</span>
                  <span class="text-sm text-slate-500">— {{ item.action }}</span>
                  <span
                    v-if="item.tag"
                    :class="['rounded-full px-2.5 py-0.5 text-xs font-semibold', item.tagClass]"
                  >{{ item.tag }}</span>
                </div>
                <p class="mt-0.5 text-xs text-slate-400">{{ item.time }}</p>
              </div>
            </article>
          </div>
        </div>

        <!-- Coaches -->
        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center justify-between px-6 py-4">
            <h2 class="text-base font-bold text-slate-900">Coaches</h2>
            <button class="text-sm font-semibold text-orange-500 hover:underline">Voir tout</button>
          </div>
          <div class="divide-y divide-slate-100 px-6">
            <div v-for="coach in coaches" :key="coach.name" class="py-4">
              <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                  {{ coach.initials }}
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold text-slate-900">{{ coach.name }}</p>
                  <p class="text-xs text-slate-500">{{ coach.apprenants }} apprenants</p>
                </div>
              </div>
              <div class="mt-3">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs text-slate-500">Taux d'insertion</span>
                  <span class="text-xs font-bold text-emerald-600">{{ coach.taux }}%</span>
                </div>
                <div class="h-1.5 rounded-full bg-slate-100">
                  <div
                    class="h-1.5 rounded-full bg-emerald-500 transition-all"
                    :style="{ width: coach.taux + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Promotions en cours ── -->
      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm px-6 py-5">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 class="text-base font-bold text-slate-900">Promotions en cours</h2>
          <button class="text-sm font-semibold text-orange-500 hover:underline">Voir les stats</button>
        </div>

        <div class="mt-5 grid gap-4 sm:grid-cols-3">
          <div
            v-for="promo in promotions"
            :key="promo.name"
            class="rounded-xl border border-slate-200 p-4"
          >
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm font-bold text-slate-900">{{ promo.name }}</p>
              <span :class="['rounded-full border px-2.5 py-0.5 text-xs font-medium', promo.statusClass]">
                {{ promo.status }}
              </span>
            </div>
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-slate-500">Apprenants</span>
              <span class="font-semibold text-slate-900">{{ promo.apprenants }}</span>
            </div>
            <template v-if="promo.hasTaux">
              <div class="flex items-center justify-between text-sm mt-2 mb-2">
                <span class="text-slate-500">Taux d'insertion</span>
                <span class="font-bold text-emerald-600">{{ promo.taux }}%</span>
              </div>
              <div class="h-1.5 rounded-full bg-slate-100">
                <div
                  class="h-1.5 rounded-full bg-orange-500 transition-all"
                  :style="{ width: promo.taux + '%' }"
                ></div>
              </div>
            </template>
          </div>
        </div>
      </div>

    </div>
  </ManagerLayout>
</template>
