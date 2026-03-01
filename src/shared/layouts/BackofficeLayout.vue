<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  title: string
  activeMenu: 'dashboard' | 'apprenants' | 'validations' | 'statistiques'
}>()

const mobileOpen = ref(false)

const menu = computed(() => [
  { key: 'dashboard', label: 'Tableau de bord', to: '/dashboard' },
  { key: 'apprenants', label: 'Apprenants', to: '/dashboard' },
  { key: 'validations', label: 'Validations', to: '/validations' },
  { key: 'statistiques', label: 'Statistiques', to: '/statistiques' },
])

const itemClass = (key: string) =>
  key === props.activeMenu
    ? 'flex items-center gap-3 rounded-xl bg-orange-500 px-4 py-3 text-white font-medium text-sm'
    : 'flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100 text-sm'
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside class="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <!-- Logo -->
        <div class="border-b border-slate-200 px-5 py-5">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
              <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="4 4 4 20 20 20" />
                <polyline points="7 14 11 10 14 13 19 7" />
              </svg>
            </div>
            <div>
              <p class="text-base font-bold leading-tight text-slate-900">ODC Track</p>
              <p class="text-xs text-slate-500">Suivi d'insertion</p>
            </div>
          </div>
        </div>

        <!-- Nav -->
        <nav class="flex-1 space-y-1 px-3 py-5">
          <RouterLink v-for="item in menu" :key="item.key" :to="item.to" :class="itemClass(item.key)">
            <!-- Dashboard -->
            <svg v-if="item.key === 'dashboard'" class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <!-- Apprenants -->
            <svg v-else-if="item.key === 'apprenants'" class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <!-- Validations -->
            <svg v-else-if="item.key === 'validations'" class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            <!-- Statistiques -->
            <svg v-else-if="item.key === 'statistiques'" class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>

        <!-- Footer -->
        <div class="border-t border-slate-200 px-3 py-4 space-y-1">
          <RouterLink to="/parametres" class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-slate-100">
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            <span>Paramètres</span>
          </RouterLink>
          <button class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50">
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <div class="flex min-w-0 flex-1 flex-col">
        <!-- Header -->
        <header class="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:px-8">
          <div class="flex items-center gap-3">
            <button class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden" @click="mobileOpen = true">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <h1 class="text-xl font-semibold text-slate-900">{{ title }}</h1>
          </div>

          <div class="flex items-center gap-4">
            <button class="relative text-slate-500">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span class="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div class="hidden h-8 w-px bg-slate-200 lg:block"></div>
            <div class="hidden text-right lg:block">
              <p class="text-sm font-semibold leading-tight text-slate-900">Moussa Ba</p>
              <p class="text-xs text-slate-500">Pôle Emploi</p>
            </div>
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white">M</div>
          </div>
        </header>

        <main class="flex-1 p-4 lg:p-8">
          <slot />
        </main>
      </div>
    </div>

    <!-- Mobile drawer -->
    <div v-if="mobileOpen" class="fixed inset-0 z-40 lg:hidden">
      <button class="absolute inset-0 bg-black/40" @click="mobileOpen = false"></button>
      <aside class="relative h-full w-64 bg-white shadow-xl flex flex-col">
        <div class="border-b border-slate-200 px-5 py-4 flex items-center justify-between">
          <p class="text-sm font-semibold">ODC Track</p>
          <button class="text-slate-500 text-lg" @click="mobileOpen = false">×</button>
        </div>
        <nav class="space-y-1 px-3 py-4">
          <RouterLink v-for="item in menu" :key="item.key" :to="item.to" :class="itemClass(item.key)" @click="mobileOpen = false">
            <span class="text-sm">◻</span>
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
      </aside>
    </div>
  </div>
</template>
