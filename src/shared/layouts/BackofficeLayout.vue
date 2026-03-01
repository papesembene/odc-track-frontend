<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

type MenuKey = 'dashboard' | 'validations' | 'apprenants' | 'statistiques'

const props = defineProps<{
  title: string
  activeMenu: MenuKey
}>()

const mobileOpen = ref(false)

const menu = computed(() => [
  { key: 'dashboard' as const, label: 'Tableau de bord', to: '/dashboard' },
  { key: 'validations' as const, label: 'Validations', to: '/validations' },
  { key: 'apprenants' as const, label: 'Apprenants', to: '/apprenants' },
  { key: 'statistiques' as const, label: 'Statistiques', to: '/statistiques' },
])

const linkClass = (key: MenuKey) => {
  const base = 'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors'
  if (key === props.activeMenu) return `${base} bg-orange-500 text-white`
  return `${base} text-slate-500 hover:bg-slate-100`
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <div class="flex min-h-screen">
      <aside class="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div class="border-b border-slate-200 px-5 py-5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
              <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div>
              <p class="text-3xl font-bold leading-none">ODC Track</p>
              <p class="mt-1 text-xl text-slate-400">Suivi d'insertion</p>
            </div>
          </div>
        </div>

        <nav class="flex-1 space-y-2 px-3 py-5">
          <RouterLink v-for="item in menu" :key="item.key" :to="item.to" :class="linkClass(item.key)">
            <svg v-if="item.key === 'dashboard'" class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <svg v-else-if="item.key === 'validations'" class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <polyline points="9 12 11.5 14.5 15.5 10" />
            </svg>
            <svg v-else-if="item.key === 'apprenants'" class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            <svg v-else class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>

        <div class="border-t border-slate-200 px-3 py-4">
          <RouterLink to="/login" class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50">
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Déconnexion</span>
          </RouterLink>
        </div>
      </aside>

      <div class="flex min-w-0 flex-1 flex-col">
        <header class="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:px-8">
          <div class="flex items-center gap-3">
            <button class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 lg:hidden" @click="mobileOpen = true">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 class="text-2xl font-bold text-slate-900">{{ title }}</h1>
          </div>

          <div class="flex items-center gap-5">
            <button class="relative text-slate-400 transition-colors hover:text-slate-600">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span class="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div class="hidden h-8 w-px bg-slate-200 lg:block"></div>

            <div class="hidden text-right lg:block">
              <p class="text-sm font-semibold leading-tight text-slate-900">Moussa Ba</p>
              <p class="text-xs text-slate-500">Pôle Emploi</p>
            </div>

            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">M</div>
          </div>
        </header>

        <main class="flex-1 p-4 lg:p-6">
          <slot />
        </main>
      </div>
    </div>

    <div v-if="mobileOpen" class="fixed inset-0 z-50 lg:hidden">
      <button class="absolute inset-0 bg-black/40" @click="mobileOpen = false"></button>
      <aside class="relative h-full w-72 bg-white shadow-xl">
        <div class="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <p class="text-base font-semibold">ODC Track</p>
          <button class="text-xl text-slate-500" @click="mobileOpen = false">×</button>
        </div>

        <nav class="space-y-2 px-3 py-4">
          <RouterLink
            v-for="item in menu"
            :key="item.key"
            :to="item.to"
            :class="linkClass(item.key)"
            @click="mobileOpen = false"
          >
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
      </aside>
    </div>
  </div>
</template>
