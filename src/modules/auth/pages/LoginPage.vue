<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { api } from "../../../core/api/axios";
import { persistAuthenticatedSession } from "../../../core/auth/auth-session";
import { getDefaultPathByRole } from "../../../core/auth/role-redirect";
import { showToast } from "../../../core/ui/toast";

const router = useRouter();
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");
const form = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
});

const validateEmail = () => {
  if (!form.email) {
    errors.email = "L'email est obligatoire";
    return false;
  }
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  errors.email = ok ? "" : "Format email invalide";
  return ok;
};

const validatePassword = () => {
  if (!form.password) {
    errors.password = "Le mot de passe est obligatoire";
    return false;
  }
  if (form.password.length < 6) {
    errors.password = "Minimum 6 caractères";
    return false;
  }
  errors.password = "";
  return true;
};

const validateForm = () => {
  const e = validateEmail();
  const p = validatePassword();
  return e && p;
};

const onSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  if (!validateForm()) {
    showToast("Veuillez corriger les champs du formulaire", "error");
    isLoading.value = false;
    return;
  }
  try {
    const { data } = await api.post("auth/login", {
      email: form.email,
      password: form.password,
    });

    const token = data.data.accessToken;
    const authUser = data.data.user;
    const role = authUser?.role;
    const mustChangePassword = Boolean(data.data.mustChangePassword);

    if (!token) throw new Error("Token manquant dans la réponse login");
    persistAuthenticatedSession(token, authUser, { mustChangePassword });
    showToast("Connexion réussie", "success", 1800);
    router.push(
      role === "APPRENANT" && mustChangePassword
        ? "/apprenant/changer-mot-de-passe"
        : getDefaultPathByRole(role),
    );
  } catch (e: any) {
    const apiMessage = e?.response?.data?.message;
    errorMessage.value =
      Array.isArray(apiMessage)
        ? apiMessage.join(", ")
        : apiMessage || "Email ou mot de passe invalide";
    showToast(errorMessage.value, "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main class="min-h-screen bg-slate-50 text-slate-900">
    <div class="grid min-h-screen lg:grid-cols-2">

      <!-- ── Left: Form ── -->
      <section class="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14 bg-white">
        <div class="w-full max-w-[420px]">

          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30">
              <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="4 4 4 20 20 20" />
                <polyline points="7 14 11 10 14 13 19 7" />
              </svg>
            </div>
            <div>
              <span class="text-lg font-bold tracking-tight text-slate-900">ODC Track</span>
              <p class="text-xs text-slate-400">Suivi d'insertion professionnelle</p>
            </div>
          </div>

          <!-- Heading -->
          <div class="mt-10">
            <h2 class="text-2xl font-bold text-slate-900">Bienvenue 👋</h2>
            <p class="mt-1.5 text-sm text-slate-500">Connectez-vous pour accéder à votre espace</p>
          </div>

          <!-- Error banner -->
          <div v-if="errorMessage" class="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <svg class="mt-0.5 h-4 w-4 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p class="text-sm text-red-700">{{ errorMessage }}</p>
          </div>

          <!-- Form -->
          <form class="mt-8 space-y-5" @submit.prevent="onSubmit">
            <!-- Email -->
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-700">Adresse email</label>
              <div
                class="flex h-12 items-center gap-3 rounded-xl border px-4 transition-colors focus-within:border-orange-400 focus-within:ring-3 focus-within:ring-orange-500/10"
                :class="errors.email ? 'border-red-300 bg-red-50/30' : 'border-slate-200 bg-white'"
              >
                <svg class="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
                </svg>
                <input
                  v-model.trim="form.email"
                  type="email"
                  :disabled="isLoading"
                  @blur="validateEmail"
                  placeholder="votre.email@odc.sn"
                  class="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-60"
                />
              </div>
              <p v-if="errors.email" class="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                <svg class="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {{ errors.email }}
              </p>
            </div>

            <!-- Password -->
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-700">Mot de passe</label>
              <div
                class="flex h-12 items-center gap-3 rounded-xl border px-4 transition-colors focus-within:border-orange-400 focus-within:ring-3 focus-within:ring-orange-500/10"
                :class="errors.password ? 'border-red-300 bg-red-50/30' : 'border-slate-200 bg-white'"
              >
                <svg class="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  :disabled="isLoading"
                  @blur="validatePassword"
                  placeholder="••••••••"
                  class="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-60"
                />
                <button
                  type="button"
                  class="shrink-0 text-slate-400 transition-colors hover:text-slate-600"
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="showPassword" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                  <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <p v-if="errors.password" class="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                <svg class="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {{ errors.password }}
              </p>
              <div class="mt-2 text-right">
                <button type="button" class="text-xs font-medium text-orange-500 transition-colors hover:text-orange-600 hover:underline">
                  Mot de passe oublié ?
                </button>
              </div>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="isLoading"
              class="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg v-if="isLoading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              {{ isLoading ? "Connexion en cours..." : "Se connecter" }}
            </button>
          </form>

          <p class="mt-10 text-center text-xs text-slate-400">© {{ new Date().getFullYear() }} Orange Digital Center. Tous droits réservés.</p>
        </div>
      </section>

      <!-- ── Right: Visual panel ── -->
      <section class="relative hidden overflow-hidden bg-slate-900 lg:flex lg:flex-col lg:justify-between px-14 py-12">
        <!-- Background decorations -->
        <div class="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-500/10"></div>
        <div class="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-orange-500/8"></div>
        <div class="pointer-events-none absolute bottom-32 right-20 h-40 w-40 rounded-full bg-orange-500/6"></div>

        <!-- Top: Brand mark -->
        <div class="relative flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/40">
            <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 4 4 20 20 20" />
              <polyline points="7 14 11 10 14 13 19 7" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-white">ODC Track</p>
            <p class="text-xs text-slate-500">Orange Digital Center</p>
          </div>
        </div>

        <!-- Center: Main copy -->
        <div class="relative">
          <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5">
            <span class="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
            <span class="text-xs font-semibold text-orange-400">Plateforme de suivi</span>
          </div>
          <h3 class="text-4xl font-extrabold leading-tight text-white">
            Suivez chaque<br />
            <span class="text-orange-400">parcours</span><br />
            professionnel
          </h3>
          <p class="mt-5 text-base leading-relaxed text-slate-400">
            ODC Track vous accompagne dans le suivi de l'insertion professionnelle avec des outils performants et une interface intuitive.
          </p>

          <!-- Feature list -->
          <div class="mt-8 space-y-3">
            <div v-for="feature in [
              'Tableau de bord en temps réel',
              'Validation des situations professionnelles',
              'Suivi des apprenants par promotion',
            ]" :key="feature" class="flex items-center gap-3">
              <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20">
                <svg class="h-3 w-3 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span class="text-sm text-slate-400">{{ feature }}</span>
            </div>
          </div>
        </div>

        <!-- Bottom: Stats row -->
        <div class="relative flex items-center gap-6">
          <div class="rounded-2xl border border-white/8 bg-white/5 px-5 py-3 text-center backdrop-blur-sm">
            <p class="text-2xl font-extrabold text-white">100%</p>
            <p class="mt-0.5 text-xs text-slate-500">Données sécurisées</p>
          </div>
          <div class="rounded-2xl border border-white/8 bg-white/5 px-5 py-3 text-center backdrop-blur-sm">
            <p class="text-2xl font-extrabold text-orange-400">ODC</p>
            <p class="mt-0.5 text-xs text-slate-500">Orange Digital</p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
