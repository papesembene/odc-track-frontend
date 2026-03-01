<script setup lang="ts">
import BackofficeLayout from '@/shared/layouts/BackofficeLayout.vue'

const rows = [
  {
    id: '1',
    initials: 'AD',
    name: 'Amadou Diop',
    email: 'amadou.diop@odc.sn',
    promo: 'Promo 2024',
    ref: 'Développement Web et Mobile',
    situations: 2,
    pendingCount: 1,
    status: 'En attente',
    statusClass: 'bg-amber-100 text-amber-700',
  },
  {
    id: '2',
    initials: 'FN',
    name: 'Fatou Ndiaye',
    email: 'fatou.ndiaye@odc.sn',
    promo: 'Promo 2024',
    ref: 'Data Science',
    situations: 1,
    pendingCount: 1,
    status: 'En attente',
    statusClass: 'bg-amber-100 text-amber-700',
  },
  {
    id: '3',
    initials: 'IS',
    name: 'Ibrahima Sow',
    email: 'ibrahima.sow@odc.sn',
    promo: 'Promo 2023',
    ref: 'Cybersécurité',
    situations: 1,
    pendingCount: 0,
    status: 'En cours',
    statusClass: 'bg-blue-100 text-blue-700',
  },
]
</script>

<template>
  <BackofficeLayout title="Liste des apprenants" active-menu="apprenants">
    <div class="space-y-5">
      <!-- Stat cards -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-500">Total apprenants</p>
            <p class="mt-1.5 text-3xl font-bold text-slate-900">3</p>
          </div>
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
            <svg class="h-5 w-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </article>
        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-500">Situations en attente</p>
            <p class="mt-1.5 text-3xl font-bold text-amber-500">2</p>
          </div>
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
            <svg class="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
        </article>
        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-500">Situations validées</p>
            <p class="mt-1.5 text-3xl font-bold text-emerald-600">1</p>
          </div>
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
            <svg class="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
        </article>
        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-500">Taux d'insertion</p>
            <p class="mt-1.5 text-3xl font-bold text-blue-600">72.5%</p>
          </div>
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <svg class="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 4 4 20 20 20"/><polyline points="7 14 11 10 14 13 19 7"/></svg>
          </div>
        </article>
      </div>

      <!-- Table section -->
      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="flex flex-wrap items-center gap-3 p-5">
          <!-- Search -->
          <div class="flex h-10 flex-1 min-w-52 items-center gap-2 rounded-xl border border-slate-300 px-3">
            <svg class="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Rechercher par nom, prénom ou email..." class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
          </div>
          <!-- Filters -->
          <div class="relative flex h-10 items-center gap-1.5 rounded-xl border border-slate-300 px-3 min-w-40">
            <select class="w-full appearance-none bg-transparent text-sm text-slate-700 outline-none pr-5">
              <option>Toutes les promotions</option>
              <option>Promo 2024</option>
              <option>Promo 2023</option>
            </select>
            <svg class="pointer-events-none absolute right-3 h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="relative flex h-10 items-center gap-1.5 rounded-xl border border-slate-300 px-3 min-w-40">
            <select class="w-full appearance-none bg-transparent text-sm text-slate-700 outline-none pr-5">
              <option>Tous les référentiels</option>
              <option>Développement Web et Mobile</option>
              <option>Data Science</option>
              <option>Cybersécurité</option>
            </select>
            <svg class="pointer-events-none absolute right-3 h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>

        <div class="overflow-x-auto rounded-b-2xl border-t border-slate-200">
          <table class="w-full min-w-[800px] text-left">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Apprenant</th>
                <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Promotion</th>
                <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Référentiel</th>
                <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Situations</th>
                <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Statut</th>
                <th class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="row in rows" :key="row.id" class="hover:bg-slate-50 transition-colors">
                <td class="px-5 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">{{ row.initials }}</div>
                    <div>
                      <p class="text-sm font-semibold text-slate-900">{{ row.name }}</p>
                      <p class="text-xs text-slate-500">{{ row.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-4 text-sm text-slate-700">{{ row.promo }}</td>
                <td class="px-5 py-4 text-sm text-slate-700">{{ row.ref }}</td>
                <td class="px-5 py-4 text-sm text-slate-700">
                  <span>{{ row.situations }}</span>
                  <span v-if="row.pendingCount > 0" class="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">{{ row.pendingCount }} en attente</span>
                </td>
                <td class="px-5 py-4">
                  <span :class="['rounded-full px-2.5 py-0.5 text-xs font-medium', row.statusClass]">{{ row.status }}</span>
                </td>
                <td class="px-5 py-4 text-sm text-slate-500">
                  <RouterLink :to="`/apprenants/${row.id}`" class="flex items-center gap-1 hover:text-orange-500 transition-colors">
                    Voir détails
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </BackofficeLayout>
</template>
