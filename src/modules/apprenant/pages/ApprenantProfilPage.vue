<script setup lang="ts">
import { ref } from 'vue'
import ApprenantLayout from '@/shared/layouts/ApprenantLayout.vue'

const isEditing = ref(false)

const profil = ref({
  prenom: 'Moussa',
  nom: 'Ba',
  email: 'apprenant1@odc.sn',
  telephone: '+221 77 123 45 67',
  promotion: 'Promo 2024',
  referentiel: 'Développement Web',
})

const formation = {
  promotion: 'Promo 2024',
  referentiel: 'Développement Web',
  statut: 'Apprenant actif',
  dateInscription: '15 janvier 2024',
}

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}
</script>

<template>
  <ApprenantLayout title="Mon profil" active-menu="profil">
    <section class="space-y-5 max-w-3xl">

      <!-- ── Informations personnelles ── -->
      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="flex items-start justify-between px-6 pt-6 pb-5 border-b border-slate-100">
          <div>
            <h2 class="text-base font-bold text-slate-900">Informations personnelles</h2>
            <p class="mt-0.5 text-sm text-slate-500">Gérez vos informations de profil</p>
          </div>
          <button
            class="inline-flex items-center gap-2 rounded-xl border border-orange-400 px-4 py-1.5 text-sm font-semibold text-orange-500 hover:bg-orange-50 transition-colors"
            @click="toggleEdit"
          >
            <!-- pencil icon -->
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
            </svg>
            {{ isEditing ? 'Enregistrer' : 'Modifier' }}
          </button>
        </div>

        <div class="px-6 py-5 space-y-6">
          <!-- Photo de profil -->
          <div>
            <p class="mb-3 text-sm font-semibold text-slate-700">Photo de profil</p>
            <div class="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/72?u=moussa-ba"
                alt="Moussa Ba"
                class="h-[72px] w-[72px] rounded-full object-cover border-2 border-slate-200"
              />
              <div>
                <p class="text-sm font-semibold text-slate-900">Moussa Ba</p>
                <p class="text-sm text-slate-500">apprenant1@odc.sn</p>
              </div>
            </div>
          </div>

          <!-- Champs du formulaire -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <!-- Prénom -->
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Prénom</label>
              <input
                v-model="profil.prenom"
                type="text"
                :disabled="!isEditing"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-orange-400 focus:bg-white disabled:cursor-not-allowed"
              />
            </div>
            <!-- Nom -->
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Nom</label>
              <input
                v-model="profil.nom"
                type="text"
                :disabled="!isEditing"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-orange-400 focus:bg-white disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input
              v-model="profil.email"
              type="email"
              :disabled="!isEditing"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-orange-400 focus:bg-white disabled:cursor-not-allowed"
            />
          </div>

          <!-- Téléphone -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Téléphone</label>
            <input
              v-model="profil.telephone"
              type="tel"
              :disabled="!isEditing"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-orange-400 focus:bg-white disabled:cursor-not-allowed"
            />
          </div>

          <!-- Promotion & Référentiel -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Promotion</label>
              <input
                v-model="profil.promotion"
                type="text"
                disabled
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Référentiel</label>
              <input
                v-model="profil.referentiel"
                type="text"
                disabled
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- ── Informations de formation ── -->
      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm px-6 py-5">
        <h2 class="mb-5 text-base font-bold text-slate-900">Informations de formation</h2>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <!-- Promotion -->
          <div class="flex items-center gap-4">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
              <!-- graduation cap -->
              <svg class="h-5 w-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-slate-500">Promotion</p>
              <p class="text-sm font-bold text-slate-900">{{ formation.promotion }}</p>
            </div>
          </div>

          <!-- Référentiel -->
          <div class="flex items-center gap-4">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <!-- monitor / screen -->
              <svg class="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-slate-500">Référentiel</p>
              <p class="text-sm font-bold text-slate-900">{{ formation.referentiel }}</p>
            </div>
          </div>

          <!-- Statut -->
          <div class="flex items-center gap-4">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <!-- user / person -->
              <svg class="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-slate-500">Statut</p>
              <p class="text-sm font-bold text-slate-900">{{ formation.statut }}</p>
            </div>
          </div>

          <!-- Date d'inscription -->
          <div class="flex items-center gap-4">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">
              <!-- calendar -->
              <svg class="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <div>
              <p class="text-xs text-slate-500">Date d'inscription</p>
              <p class="text-sm font-bold text-slate-900">{{ formation.dateInscription }}</p>
            </div>
          </div>

        </div>
      </div>

      <!-- ── Sécurité ── -->
      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm px-6 py-5">
        <h2 class="mb-4 text-base font-bold text-slate-900">Sécurité</h2>

        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-slate-900">Mot de passe</p>
            <p class="mt-0.5 text-sm text-slate-500">Dernière modification il y a 30 jours</p>
          </div>
          <button
            class="inline-flex items-center gap-2 rounded-xl border border-orange-400 px-4 py-2 text-sm font-semibold text-orange-500 hover:bg-orange-50 transition-colors"
          >
            <!-- lock icon -->
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Changer le mot de passe
          </button>
        </div>
      </div>

    </section>
  </ApprenantLayout>
</template>
