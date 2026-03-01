<script setup lang="ts">
import { ref, computed } from 'vue'
import ManagerLayout from '@/modules/manager/layouts/ManagerLayout.vue'

type ApprenantStatus = 'En attente' | 'En cours' | 'Validée' | 'Rejetée'

interface Apprenant {
  id: number
  initials: string
  name: string
  email: string
  promo: string
  referentiel: string
  situations: number
  status: ApprenantStatus
}

const apprenants: Apprenant[] = [
  { id: 1, initials: 'MB', name: 'Moussa Ba',      email: 'apprenant1@odc.sn', promo: 'Promo 2024', referentiel: 'Développement Web',    situations: 2, status: 'En attente' },
  { id: 2, initials: 'MS', name: 'Mariama Sarr',   email: 'apprenant2@odc.sn', promo: 'Promo 2024', referentiel: 'Data Science',          situations: 2, status: 'En cours'  },
  { id: 3, initials: 'CG', name: 'Cheikh Gueye',   email: 'apprenant3@odc.sn', promo: 'Promo 2023', referentiel: 'Cybersécurité',         situations: 1, status: 'En attente' },
  { id: 4, initials: 'AD', name: 'Aminata Diallo',  email: 'apprenant4@odc.sn', promo: 'Promo 2024', referentiel: 'Développement Mobile', situations: 1, status: 'Validée'   },
  { id: 5, initials: 'OT', name: 'Omar Thiam',      email: 'apprenant5@odc.sn', promo: 'Promo 2023', referentiel: 'Développement Web',    situations: 1, status: 'Validée'   },
  { id: 6, initials: 'KC', name: 'Khady Cisse',     email: 'apprenant6@odc.sn', promo: 'Promo 2024', referentiel: 'Data Science',         situations: 1, status: 'En attente' },
]

const promos   = ['Toutes les promos', 'Promo 2024', 'Promo 2023', 'Promo 2025']
const refs     = ['Tous les référentiels', 'Développement Web', 'Data Science', 'Cybersécurité', 'Développement Mobile']

const search     = ref('')
const promoFil   = ref('Toutes les promos')
const refFil     = ref('Tous les référentiels')

const filtered = computed(() =>
  apprenants.filter(a => {
    const q = search.value.toLowerCase()
    const matchQ    = !q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)
    const matchP    = promoFil.value === 'Toutes les promos' || a.promo === promoFil.value
    const matchR    = refFil.value   === 'Tous les référentiels' || a.referentiel === refFil.value
    return matchQ && matchP && matchR
  })
)

// ── Stat counts ──
const total       = apprenants.length
const promo2024   = apprenants.filter(a => a.promo === 'Promo 2024').length
const promo2023   = apprenants.filter(a => a.promo === 'Promo 2023').length
const avecSit     = apprenants.filter(a => a.situations > 0).length

const statusClass = (s: ApprenantStatus) => {
  switch (s) {
    case 'Validée'   : return 'border border-emerald-400 text-emerald-600 bg-emerald-50'
    case 'En cours'  : return 'border border-blue-400    text-blue-600    bg-blue-50'
    case 'En attente': return 'border border-amber-400   text-amber-600   bg-amber-50'
    case 'Rejetée'   : return 'border border-red-400     text-red-600     bg-red-50'
  }
}
</script>

<template>
  <ManagerLayout title="Apprenants" active-menu="apprenants">
    <div class="space-y-5">

      <!-- ── Stat cards ── -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <!-- Total -->
        <article class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
            <svg class="h-5 w-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-900">{{ total }}</p>
            <p class="text-sm text-slate-500">Total</p>
          </div>
        </article>

        <!-- Promo 2024 -->
        <article class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <svg class="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-900">{{ promo2024 }}</p>
            <p class="text-sm text-slate-500">Promo 2024</p>
          </div>
        </article>

        <!-- Promo 2023 -->
        <article class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
            <svg class="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-900">{{ promo2023 }}</p>
            <p class="text-sm text-slate-500">Promo 2023</p>
          </div>
        </article>

        <!-- Avec situation -->
        <article class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">
            <svg class="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-900">{{ avecSit }}</p>
            <p class="text-sm text-slate-500">Avec situation</p>
          </div>
        </article>
      </div>

      <!-- ── Search & Filters ── -->
      <div class="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <!-- Search -->
        <div class="relative min-w-0 flex-1">
          <svg class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Rechercher un apprenant..."
            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-orange-400 focus:bg-white transition-colors"
          />
        </div>
        <!-- Promo filter -->
        <select
          v-model="promoFil"
          class="rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-orange-400 cursor-pointer"
        >
          <option v-for="p in promos" :key="p" :value="p">{{ p }}</option>
        </select>
        <!-- Ref filter -->
        <select
          v-model="refFil"
          class="rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-orange-400 cursor-pointer"
        >
          <option v-for="r in refs" :key="r" :value="r">{{ r }}</option>
        </select>
      </div>

      <!-- ── Apprenants grid ── -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="a in filtered"
          :key="a.id"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <!-- Avatar + nom + email -->
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
              {{ a.initials }}
            </div>
            <div class="min-w-0">
              <p class="text-sm font-bold text-slate-900 truncate">{{ a.name }}</p>
              <p class="text-xs text-slate-500 truncate">{{ a.email }}</p>
            </div>
          </div>

          <!-- Badges promo + ref -->
          <div class="mt-3 flex flex-wrap gap-1.5">
            <span class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600">{{ a.promo }}</span>
            <span class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600">{{ a.referentiel }}</span>
          </div>

          <!-- Situations + status -->
          <div class="mt-4 flex items-center justify-between">
            <span class="text-sm text-slate-500">
              {{ a.situations }} situation{{ a.situations > 1 ? 's' : '' }}
            </span>
            <span :class="['rounded-full px-3 py-0.5 text-xs font-semibold', statusClass(a.status)]">
              {{ a.status }}
            </span>
          </div>
        </article>

        <!-- Empty state -->
        <div v-if="filtered.length === 0" class="col-span-full py-12 text-center text-slate-400">
          <svg class="mx-auto mb-3 h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <p class="text-sm">Aucun apprenant trouvé</p>
        </div>
      </div>

    </div>
  </ManagerLayout>
</template>
