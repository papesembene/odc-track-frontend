<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { DashboardMenuItem, DashboardUser } from '@/modules/dashboard/types'

const props = defineProps<{
  pageTitle: string
  user: DashboardUser
  menuItems: DashboardMenuItem[]
  activeKey: string
}>()

const emit = defineEmits<{
  (e: 'logout'): void
}>()

const mobileOpen = ref(false)

function menuIconSvg(key: string): string {
  const map: Record<string, string> = {
    dashboard:
      '<rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect>',
    situations:
      '<rect x="2" y="7" width="20" height="14" rx="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>',
    documents:
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>',
    profil:
      '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
    apprenants:
      '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
    validations:
      '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
    statistiques:
      '<line x1="3" y1="3" x2="3" y2="21"></line><line x1="3" y1="21" x2="21" y2="21"></line><rect x="6" y="13" width="4" height="8" rx="1"></rect><rect x="13" y="8" width="4" height="13" rx="1"></rect>',
  }
  return map[key] ?? '<circle cx="12" cy="12" r="3"></circle>'
}

function roleLabel(role: string) {
  if (role === 'POLE_EMPLOI') return 'Pôle Emploi'
  if (role === 'MANAGER') return 'Manager'
  return 'Apprenant'
}

const onLogout = () => {
  emit('logout')
  mobileOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-[Inter,sans-serif]">
    <div class="flex min-h-screen">

      <!-- ── SIDEBAR ── -->
      <aside class="hidden w-72 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <!-- Logo -->
        <div class="border-b border-slate-200 px-6 py-5">
          <div class="flex items-center gap-3">
            <div class="h-11 w-11 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
              <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="4 4 4 20 20 20" />
                <polyline points="7 14 11 10 14 13 19 7" />
              </svg>
            </div>
            <div>
              <p class="text-base font-bold leading-tight text-slate-900">ODC Track</p>
              <p class="text-xs text-slate-500 mt-0.5">Suivi d'insertion</p>
            </div>
          </div>
        </div>

        <!-- Nav -->
        <nav class="flex-1 space-y-1 px-3 py-5">
          <RouterLink
            v-for="item in menuItems"
            :key="item.key"
            :to="item.to"
            :class="[
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              item.key === activeKey
                ? 'bg-orange-50 text-orange-500'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
            ]"
          >
            <svg
              class="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <g v-html="menuIconSvg(item.key)"></g>
            </svg>
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>

        <!-- Bottom -->
        <div class="border-t border-slate-200 px-3 py-4 space-y-1">
          <RouterLink
            to="/parametres"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
            </svg>
            <span>Paramètres</span>
          </RouterLink>
          <button
            class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            @click="onLogout"
          >
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <!-- ── MAIN CONTENT ── -->
      <div class="flex min-w-0 flex-1 flex-col">

        <!-- Header -->
        <header class="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:px-8">
          <div class="flex items-center gap-3">
            <!-- Mobile menu button -->
            <button
              class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 lg:hidden"
              @click="mobileOpen = true"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <h1 class="text-lg font-bold text-slate-900">{{ pageTitle }}</h1>
          </div>

          <div class="flex items-center gap-4">
            <!-- Bell -->
            <button class="relative text-slate-500 hover:text-slate-700">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span class="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <!-- Divider -->
            <div class="h-6 w-px bg-slate-200"></div>

            <!-- User info -->
            <div class="hidden text-right lg:block">
              <p class="text-sm font-semibold text-slate-900 leading-tight">{{ user.fullName }}</p>
              <p class="text-xs text-slate-500 mt-0.5">{{ roleLabel(user.role) }}</p>
            </div>

            <!-- Avatar -->
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              {{ user.initials }}
            </div>
          </div>
        </header>

        <!-- Page -->
        <main class="flex-1 p-6 lg:p-8">
          <slot />
        </main>
      </div>
    </div>

    <!-- Mobile drawer -->
    <div v-if="mobileOpen" class="fixed inset-0 z-40 lg:hidden">
      <button class="absolute inset-0 bg-black/40" @click="mobileOpen = false"></button>
      <aside class="relative flex h-full w-72 flex-col bg-white shadow-xl">
        <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <p class="text-base font-bold text-slate-900">ODC Track</p>
          <button class="text-slate-400 hover:text-slate-600" @click="mobileOpen = false">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav class="flex-1 space-y-1 px-3 py-5">
          <RouterLink
            v-for="item in menuItems"
            :key="item.key"
            :to="item.to"
            :class="[
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              item.key === activeKey
                ? 'bg-orange-50 text-orange-500'
                : 'text-slate-500 hover:bg-slate-100'
            ]"
            @click="mobileOpen = false"
          >
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <g v-html="menuIconSvg(item.key)"></g>
            </svg>
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
        <div class="border-t border-slate-200 px-3 py-4">
          <button
            class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-50"
            @click="onLogout"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>
