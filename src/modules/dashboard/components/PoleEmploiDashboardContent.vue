<script setup lang="ts">
import { ref } from 'vue'
import StatCard from './StatCard.vue'

const search = ref('')
const selectedPromo = ref('')
const selectedRef = ref('')

const rows = [
  {
    initials: 'AD',
    name: 'Amadou Diop',
    email: 'amadou.diop@odc.sn',
    promo: 'Promo 2024',
    ref: 'Développement Web et Mobile',
    situations: 2,
    pendingBadge: '1 en attente',
    status: 'En attente',
    statusClass: 'bg-amber-100 text-amber-700',
  },
  {
    initials: 'FN',
    name: 'Fatou Ndiaye',
    email: 'fatou.ndiaye@odc.sn',
    promo: 'Promo 2024',
    ref: 'Data Science',
    situations: 1,
    pendingBadge: '1 en attente',
    status: 'En attente',
    statusClass: 'bg-amber-100 text-amber-700',
  },
  {
    initials: 'IS',
    name: 'Ibrahima Sow',
    email: 'ibrahima.sow@odc.sn',
    promo: 'Promo 2023',
    ref: 'Cybersécurité',
    situations: 1,
    pendingBadge: null,
    status: 'En cours',
    statusClass: 'bg-blue-100 text-blue-700',
  },
]
</script>

<template>
  <section class="space-y-6">

    <!-- Stat cards -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total apprenants" value="3" icon-bg="bg-orange-100">
        <template #icon>
          <svg class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </template>
      </StatCard>

      <StatCard label="Situations en attente" value="2" icon-bg="bg-amber-100" value-class="text-amber-500">
        <template #icon>
          <svg class="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </template>
      </StatCard>

      <StatCard label="Situations validées" value="1" icon-bg="bg-emerald-100" value-class="text-emerald-600">
        <template #icon>
          <svg class="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </template>
      </StatCard>

      <StatCard label="Taux d'insertion" value="72.5%" icon-bg="bg-blue-100" value-class="text-blue-600">
        <template #icon>
          <svg class="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 4 4 20 20 20"></polyline>
            <polyline points="7 14 11 10 14 13 19 7"></polyline>
          </svg>
        </template>
      </StatCard>
    </div>

    <!-- Search & filters + Table -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

      <!-- Filters -->
      <div class="flex flex-col gap-3 lg:flex-row">
        <div class="flex h-10 flex-1 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 focus-within:border-slate-400 transition-colors">
          <svg class="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Rechercher par nom, prénom ou email..."
            class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900"
          />
        </div>

        <div class="relative">
          <select
            v-model="selectedPromo"
            class="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-9 text-sm text-slate-700 outline-none focus:border-slate-400 transition-colors lg:w-52"
          >
            <option value="">Toutes les promotions</option>
            <option>Promo 2024</option>
            <option>Promo 2023</option>
          </select>
          <svg class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div class="relative">
          <select
            v-model="selectedRef"
            class="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-9 text-sm text-slate-700 outline-none focus:border-slate-400 transition-colors lg:w-52"
          >
            <option value="">Tous les référentiels</option>
            <option>Développement Web et Mobile</option>
            <option>Data Science</option>
            <option>Cybersécurité</option>
          </select>
          <svg class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <!-- Table -->
      <div class="mt-5 overflow-x-auto rounded-xl border border-slate-200">
        <table class="min-w-[900px] w-full text-left">
          <thead class="border-b border-slate-200 bg-slate-50">
            <tr>
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Apprenant</th>
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Promotion</th>
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Référentiel</th>
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Situations</th>
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Statut</th>
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-for="row in rows" :key="row.email" class="hover:bg-slate-50/60 transition-colors">
              <!-- Apprenant -->
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    {{ row.initials }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-slate-900">{{ row.name }}</p>
                    <p class="text-xs text-slate-500 mt-0.5">{{ row.email }}</p>
                  </div>
                </div>
              </td>
              <!-- Promotion -->
              <td class="px-4 py-3.5 text-sm text-slate-600">{{ row.promo }}</td>
              <!-- Référentiel -->
              <td class="px-4 py-3.5 text-sm text-slate-600">{{ row.ref }}</td>
              <!-- Situations -->
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-2">
                  <span class="text-sm text-slate-700">{{ row.situations }}</span>
                  <span v-if="row.pendingBadge" class="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">{{ row.pendingBadge }}</span>
                </div>
              </td>
              <!-- Statut -->
              <td class="px-4 py-3.5">
                <span :class="['rounded-full px-2.5 py-0.5 text-xs font-medium', row.statusClass]">{{ row.status }}</span>
              </td>
              <!-- Actions -->
              <td class="px-4 py-3.5">
                <button class="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors">
                  Voir détails
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </section>
</template>
