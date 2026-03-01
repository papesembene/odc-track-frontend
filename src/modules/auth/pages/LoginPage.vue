<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const demoAccounts = [
  { email: 'apprenant@odc.sn', role: 'Apprenant' },
  { email: 'poleemploi@odc.sn', role: 'Pôle Emploi' },
  { email: 'manager@odc.sn', role: 'Manager/Coach' },
]

const onSubmit = () => {
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
              <div class="flex h-12 items-center gap-3 rounded-xl border border-slate-300 bg-white px-4">
                <input v-model="email" type="email" required placeholder="votre.email@odc.sn" class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900" />
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-800">Mot de passe</label>
              <div class="flex h-12 items-center gap-3 rounded-xl border border-slate-300 bg-white px-4">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" required placeholder="••••••••" class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900" />
                <button type="button" class="text-slate-400" @click="showPassword = !showPassword">👁</button>
              </div>
              <div class="mt-2 text-right"><button type="button" class="text-sm text-orange-500 hover:underline font-medium">Mot de passe oublié ?</button></div>
            </div>

            <button type="submit" class="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600">
              Se connecter
            </button>
          </form>

          <div class="mt-7 rounded-xl bg-slate-100 px-5 py-4">
            <p class="text-sm font-semibold text-slate-700">Comptes de démonstration :</p>
            <ul class="mt-2 space-y-1">
              <li v-for="account in demoAccounts" :key="account.email" class="text-sm text-slate-500">• {{ account.email }} ({{ account.role }})</li>
            </ul>
          </div>

          <p class="mt-8 text-center text-xs text-slate-400">© 2024 Orange Digital Center. Tous droits réservés.</p>
        </div>
      </section>

      <section class="hidden lg:flex flex-col justify-center bg-orange-500 px-16 py-12">
        <div class="mx-auto w-full max-w-[520px]">
          <h3 class="text-4xl font-bold text-white leading-tight">Suivez votre parcours<br />professionnel</h3>
          <p class="mt-5 text-base text-orange-100 leading-relaxed">ODC Track vous accompagne dans votre insertion professionnelle avec des outils de suivi performants et une interface intuitive.</p>
        </div>
      </section>
    </div>
  </main>
</template>
