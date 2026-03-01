<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

type ApprenantMenuKey = 'dashboard' | 'situations' | 'documents' | 'profil'

const props = defineProps<{
  title: string
  activeMenu: ApprenantMenuKey
}>()

const mobileOpen = ref(false)

const menu: Array<{ key: ApprenantMenuKey; label: string; to: string }> = [
  { key: 'dashboard', label: 'Tableau de bord', to: '/dashboard-apprenant' },
  { key: 'situations', label: 'Mes situations', to: '/situations' },
  { key: 'documents', label: 'Documents', to: '/documents' },
  { key: 'profil', label: 'Mon profil', to: '/profil' },
]

const itemClass = (key: ApprenantMenuKey) => {
  const base =
    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors'
  return key === props.activeMenu
    ? `${base} bg-orange-500 text-white`
    : `${base} text-slate-500 hover:bg-slate-100`
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <div class="flex min-h-screen">
      <aside class="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div class="border-b border-slate-200 px-5 py-5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
              <svg
                class="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="4 4 4 20 20 20" />
                <polyline points="7 14 11 10 14 13 19 7" />
              </svg>
            </div>
            <div>
              <p class="text-3xl font-bold leading-none">ODC Track</p>
              <p class="mt-1 text-xl text-slate-400">Suivi d'insertion</p>
            </div>
          </div>
        </div>

        <nav class="flex-1 space-y-2 px-3 py-5">
          <RouterLink
            v-for="item in menu"
            :key="item.key"
            :to="item.to"
            :class="itemClass(item.key)"
          >
            <svg
              v-if="item.key === 'dashboard'"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <svg
              v-else-if="item.key === 'situations'"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
            </svg>
            <svg
              v-else-if="item.key === 'documents'"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <svg
              v-else
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>

        <div class="border-t border-slate-200 px-3 py-4">
          <RouterLink
            to="/login"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
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
            <button
              class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 lg:hidden"
              @click="mobileOpen = true"
            >
              ☰
            </button>
            <h1 class="text-2xl font-bold text-slate-900">{{ props.title }}</h1>
          </div>
          <div class="flex items-center gap-5">
            <button class="relative text-slate-400">
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span class="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div class="hidden h-8 w-px bg-slate-200 lg:block"></div>
            <div class="hidden text-right lg:block">
              <p class="text-sm font-semibold text-slate-900">Moussa Ba</p>
              <p class="text-xs text-slate-500">Apprenant</p>
            </div>
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">M</div>
          </div>
        </header>

        <main class="flex-1 p-4 lg:p-6">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
