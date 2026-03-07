<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useCurrentUser } from '@/core/auth/useCurrentUser'
import { clearAuthenticatedSession } from '@/core/auth/auth-session'

type CoachMenuKey = 'dashboard' | 'apprenants' | 'statistiques'

const props = defineProps<{
  title: string
  activeMenu: CoachMenuKey
}>()

const mobileOpen = ref(false)
const router = useRouter()

const { user, userName, role, hydrateCurrentUser } = useCurrentUser()

onMounted(() => {
  hydrateCurrentUser()
})

const roleLabel = computed(() => {
  if (role.value === 'COACH') return 'Coach'
  if (role.value === 'MANAGER') return 'Manager'
  if (role.value === 'POLE_EMPLOI') return 'Pôle Emploi'
  if (role.value === 'APPRENANT') return 'Apprenant'
  if (role.value === 'ADMIN') return 'Admin'
  return 'Utilisateur'
})

const userInitials = computed(() => {
  const prenom = user.value.prenom?.trim() ?? ''
  const nom = user.value.nom?.trim() ?? ''
  const source = prenom || nom || userName.value || 'U'
  return source[0]?.toUpperCase() ?? 'U'
})

const menu: Array<{ key: CoachMenuKey; label: string; to: string }> = [
  { key: 'dashboard',     label: 'Tableau de bord', to: '/coach/dashboard' },
  { key: 'apprenants',   label: 'Mes apprenants',   to: '/coach/apprenants' },
  { key: 'statistiques', label: 'Statistiques',      to: '/coach/statistiques' },
]

const linkClass = (key: CoachMenuKey) => {
  const base = 'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors'
  return key === props.activeMenu
    ? `${base} bg-orange-500 text-white`
    : `${base} text-slate-500 hover:bg-slate-100`
}

const logout = async () => {
  clearAuthenticatedSession()
  await router.push('/login')
}
</script>

<template>
  <div class="h-screen overflow-hidden bg-slate-100 text-slate-900">
    <div class="flex h-full">

      <!-- ── Sidebar ── -->
      <aside class="hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white lg:flex">

        <!-- Logo -->
        <div class="border-b border-slate-200 px-5 py-4">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500">
              <!-- graduation cap -->
              <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold leading-tight text-slate-900">ODC Track</p>
              <p class="text-xs text-slate-400">Suivi d'insertion</p>
            </div>
          </div>
        </div>

        <!-- Nav -->
        <nav class="flex-1 space-y-1 px-3 py-4">
          <RouterLink v-for="item in menu" :key="item.key" :to="item.to" :class="linkClass(item.key)">
            <!-- Tableau de bord: grid icon -->
            <svg v-if="item.key === 'dashboard'" class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <!-- Mes apprenants: people icon -->
            <svg v-else-if="item.key === 'apprenants'" class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <!-- Statistiques: bar chart icon -->
            <svg v-else class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>

        <!-- Logout -->
        <div class="border-t border-slate-200 px-3 py-4">
          <button
            type="button"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
            @click="logout"
          >
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <!-- ── Main ── -->
      <div class="flex min-w-0 min-h-0 flex-1 flex-col">

        <!-- Header -->
        <header class="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div class="flex items-center gap-3">
            <!-- Mobile menu button -->
            <button
              class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 lg:hidden"
              @click="mobileOpen = true"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <h1 class="text-xl font-bold text-slate-900">{{ title }}</h1>
          </div>

          <div class="flex items-center gap-4">
            <!-- Bell -->
            <button class="relative text-slate-400 hover:text-slate-600 transition-colors">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span class="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div class="hidden h-6 w-px bg-slate-200 lg:block"></div>

            <div class="hidden text-right lg:block">
              <p class="text-sm font-semibold leading-tight text-slate-900">{{ userName }}</p>
              <p class="text-xs text-slate-500">{{ roleLabel }}</p>
            </div>

            <!-- Avatar -->
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
              {{ userInitials }}
            </div>
          </div>
        </header>

        <!-- Content -->
        <main class="flex-1 min-h-0 overflow-y-auto p-5 lg:p-6">
          <slot />
        </main>
      </div>
    </div>

    <!-- Mobile sidebar overlay -->
    <div v-if="mobileOpen" class="fixed inset-0 z-50 lg:hidden">
      <button class="absolute inset-0 bg-black/40" @click="mobileOpen = false"></button>
      <aside class="relative h-full w-72 bg-white shadow-xl">
        <div class="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <p class="text-base font-semibold text-slate-900">ODC Track</p>
          <button class="text-xl text-slate-500" @click="mobileOpen = false">×</button>
        </div>
        <nav class="space-y-1 px-3 py-4">
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
        <div class="border-t border-slate-200 px-3 py-4">
          <button
            type="button"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
            @click="logout"
          >
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>
