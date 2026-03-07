<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { changePassword } from '@/modules/auth/api/change-password.api'
import { showToast } from '@/core/ui/toast'

const router = useRouter()
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isSubmitting = ref(false)

const passwordStrength = computed(() => {
  const value = newPassword.value
  if (!value) return 0

  let score = 0
  if (value.length >= 8) score += 1
  if (/[A-Z]/.test(value)) score += 1
  if (/[0-9]/.test(value)) score += 1
  if (/[^A-Za-z0-9]/.test(value)) score += 1
  return score
})

async function submitChangePassword() {
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    showToast('Tous les champs sont obligatoires', 'error')
    return
  }

  if (newPassword.value.length < 8) {
    showToast('Le nouveau mot de passe doit contenir au moins 8 caractères', 'error')
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    showToast('La confirmation ne correspond pas au nouveau mot de passe', 'error')
    return
  }

  isSubmitting.value = true

  try {
    await changePassword({
      ancienPassword: currentPassword.value,
      newPassword: newPassword.value,
    })

    showToast('Mot de passe mis à jour avec succès', 'success')
    await router.replace('/dashboard-apprenant')
  } catch (error: any) {
    const apiMessage = error?.response?.data?.message
    showToast(
      Array.isArray(apiMessage)
        ? apiMessage.join(', ')
        : apiMessage || 'Impossible de modifier le mot de passe',
      'error',
    )
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 text-slate-900">
    <section class="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
      <div class="flex items-start gap-4">
        <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 17v.01" />
            <path d="M7 10V7a5 5 0 0 1 10 0v3" />
            <rect x="4" y="10" width="16" height="10" rx="2" />
          </svg>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-orange-600">
            Première connexion
          </p>
          <h1 class="mt-1 text-2xl font-bold text-slate-900">
            Changement de mot de passe obligatoire
          </h1>
          <p class="mt-2 text-sm leading-6 text-slate-500">
            Pour sécuriser votre compte, vous devez remplacer le mot de passe temporaire
            avant d'accéder à votre espace apprenant.
          </p>
        </div>
      </div>

      <div class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Mot de passe temporaire communiqué au départ : <strong>Odc@1234</strong>
      </div>

      <form class="mt-6 space-y-4" @submit.prevent="submitChangePassword">
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">Mot de passe actuel</label>
          <input
            v-model="currentPassword"
            type="password"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
            placeholder="Entrez le mot de passe temporaire"
          />
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">Nouveau mot de passe</label>
          <input
            v-model="newPassword"
            type="password"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
            placeholder="Choisissez un nouveau mot de passe"
          />
          <div class="mt-2 flex items-center gap-2">
            <div class="h-2 flex-1 rounded-full bg-slate-100">
              <div
                class="h-2 rounded-full transition-all"
                :class="
                  passwordStrength <= 1
                    ? 'bg-red-400'
                    : passwordStrength === 2
                      ? 'bg-amber-400'
                      : passwordStrength === 3
                        ? 'bg-yellow-400'
                        : 'bg-emerald-500'
                "
                :style="{ width: `${Math.max(passwordStrength * 25, 0)}%` }"
              ></div>
            </div>
            <span class="text-xs text-slate-500">{{ passwordStrength }}/4</span>
          </div>
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">Confirmer le mot de passe</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
            placeholder="Confirmez le nouveau mot de passe"
          />
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          <svg
            v-if="isSubmitting"
            class="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          {{ isSubmitting ? 'Mise à jour...' : 'Mettre à jour mon mot de passe' }}
        </button>
      </form>
    </section>
  </main>
</template>
