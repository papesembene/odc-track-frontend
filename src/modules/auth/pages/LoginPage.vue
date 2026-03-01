<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { tokenStorage } from '@/core/auth/token-storage'
import { sessionStorage } from '@/core/auth/session-storage'
import type { DashboardUser } from '@/modules/dashboard/types'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const demoAccounts = [
  { email: 'apprenant@odc.sn', role: 'Apprenant' },
  { email: 'poleemploi@odc.sn', role: 'Pôle Emploi' },
  { email: 'manager@odc.sn', role: 'Manager/Coach' },
]

const mapUserFromEmail = (value: string): DashboardUser => {
  const normalized = value.trim().toLowerCase()

  if (normalized.includes('pole')) {
    return { fullName: 'Moussa Ba', role: 'POLE_EMPLOI', initials: 'M' }
  }

  if (normalized.includes('manager')) {
    return { fullName: 'Moussa Ba', role: 'MANAGER', initials: 'M' }
  }

  return { fullName: 'Amadou Diop', role: 'APPRENANT', initials: 'A' }
}

const onSubmit = () => {
  const user = mapUserFromEmail(email.value)
  tokenStorage.setAccessToken('demo-token')
  sessionStorage.setCurrentUser(user)
  router.push('/dashboard')
}
</script>

<template>
  <main class="min-h-screen bg-white text-slate-900">
    <div class="grid min-h-screen lg:grid-cols-2">
      <section class="flex items-center justify-center px-8 py-12 sm:px-12 lg:px-16 bg-white">
        <div class="w-full max-w-[480px]">
          <div class="flex items-center gap-3">
            <div class="h-11 w-11 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
              <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="4 4 4 20 20 20" />
                <polyline points="7 14 11 10 14 13 19 7" />
              </svg>
            </div>
            <span class="text-2xl font-bold tracking-tight text-slate-900">ODC Track</span>
          </div>
          <p class="mt-2 text-sm text-slate-500">Plateforme de suivi d'insertion professionnelle</p>

          <h2 class="mt-10 text-3xl font-bold text-slate-900">Bienvenue</h2>
          <p class="mt-2 text-sm text-slate-500">Connectez-vous pour accéder à votre espace</p>

          <form class="mt-8 space-y-5" @submit.prevent="onSubmit">
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-800">Adresse email</label>
              <div class="flex h-12 items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                <svg class="h-4 w-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
                <input
                  v-model="email"
                  type="email"
                  required
                  placeholder="votre.email@odc.sn"
                  class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-800">Mot de passe</label>
              <div class="flex h-12 items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                <svg class="h-4 w-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••"
                  class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900"
                />
                <button type="button" class="text-slate-400 hover:text-slate-600 transition-colors" @click="showPassword = !showPassword">
                  <svg v-if="!showPassword" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <div class="mt-2 text-right">
                <button type="button" class="text-sm text-orange-500 hover:underline font-medium">
                  Mot de passe oublié ?
                </button>
              </div>
            </div>

            <button
              type="submit"
              class="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600 active:bg-orange-700 transition-colors"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Se connecter
            </button>
          </form>

          <div class="mt-7 rounded-xl bg-slate-100 px-5 py-4">
            <p class="text-sm font-semibold text-slate-700">Comptes de démonstration :</p>
            <ul class="mt-2 space-y-1">
              <li v-for="account in demoAccounts" :key="account.email" class="text-sm text-slate-500">
                • {{ account.email }} ({{ account.role }})
              </li>
            </ul>
          </div>

          <p class="mt-8 text-center text-xs text-slate-400">© 2024 Orange Digital Center. Tous droits réservés.</p>
        </div>
      </section>

      <section class="hidden lg:flex flex-col justify-center bg-orange-500 px-16 py-12">
        <div class="mx-auto w-full max-w-[520px]">
          <div class="mb-8 h-20 w-20 rounded-2xl bg-orange-400/40 flex items-center justify-center">
            <svg class="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="4" height="18" rx="1"/>
              <rect x="10" y="8" width="4" height="13" rx="1"/>
              <rect x="17" y="13" width="4" height="8" rx="1"/>
            </svg>
          </div>

          <h3 class="text-4xl font-bold text-white leading-tight">Suivez votre parcours<br />professionnel</h3>
          <p class="mt-5 text-base text-orange-100 leading-relaxed">
            ODC Track vous accompagne dans votre insertion professionnelle avec des outils de suivi performants et une interface intuitive.
          </p>

          <div class="mt-10 space-y-7">
            <div class="flex items-start gap-4">
              <div class="h-12 w-12 shrink-0 rounded-xl bg-orange-400/40 flex items-center justify-center">
                <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <p class="text-base font-semibold text-white">Gestion simplifiée</p>
                <p class="mt-0.5 text-sm text-orange-100">Déclarez et suivez vos situations professionnelles en quelques clics</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="h-12 w-12 shrink-0 rounded-xl bg-orange-400/40 flex items-center justify-center">
                <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div>
                <p class="text-base font-semibold text-white">Documents centralisés</p>
                <p class="mt-0.5 text-sm text-orange-100">Téléchargez et gérez tous vos documents au même endroit</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="h-12 w-12 shrink-0 rounded-xl bg-orange-400/40 flex items-center justify-center">
                <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="4 4 4 20 20 20" />
                  <polyline points="7 14 11 10 14 13 19 7" />
                </svg>
              </div>
              <div>
                <p class="text-base font-semibold text-white">Statistiques en temps réel</p>
                <p class="mt-0.5 text-sm text-orange-100">Visualisez votre progression et vos performances</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
