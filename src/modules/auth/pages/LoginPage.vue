<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { api } from "../../../core/api/axios";
import { tokenStorage } from "../../../core/auth/token-storage";
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
    const role = data.data.user?.role ;
   
    if (!token) throw new Error("Token manquant dans la réponse login");
    tokenStorage.setAccessToken(token);
    localStorage.setItem("role", role ?? "");
    showToast("Connexion réussie", "success", 1800);
    router.push(getDefaultPathByRole(role));
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
  <main class="min-h-screen bg-white text-slate-900">
    <div class="grid min-h-screen lg:grid-cols-2">
      <section
        class="flex items-center justify-center px-8 py-12 sm:px-12 lg:px-16 bg-white"
      >
        <div class="w-full max-w-[480px]">
          <div class="flex items-center gap-3">
            <div
              class="h-11 w-11 rounded-xl bg-orange-500 flex items-center justify-center shrink-0"
            >
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
            <span class="text-2xl font-bold tracking-tight text-slate-900"
              >ODC Track</span
            >
          </div>
          <p class="mt-2 text-sm text-slate-500">
            Plateforme de suivi d'insertion professionnelle
          </p>

          <h2 class="mt-10 text-3xl font-bold text-slate-900">Bienvenue</h2>
          <p class="mt-2 text-sm text-slate-500">
            Connectez-vous pour accéder à votre espace
          </p>

          <form class="mt-8 space-y-5" @submit.prevent="onSubmit">
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-800"
                >Adresse email</label
              >
              <div
                class="flex h-12 items-center gap-3 rounded-xl border border-slate-300 bg-white px-4"
              >
                <input
                  v-model.trim="form.email"
                  type="email"
                  :disabled="isLoading"
                  @blur="validateEmail"
                  placeholder="votre.email@odc.sn"
                  class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900"
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                  {{ errors.email }}
                </p>
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-800"
                >Mot de passe</label
              >
              <div
                class="flex h-12 items-center gap-3 rounded-xl border border-slate-300 bg-white px-4"
              >
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  :disabled="isLoading"
                  @blur="validatePassword"
                  placeholder="••••••••"
                  class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900"
                />
                <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                  {{ errors.password }}
                </p>
                <button
                  type="button"
                  class="text-slate-400"
                  @click="showPassword = !showPassword"
                >
                  👁
                </button>
              </div>
              <div class="mt-2 text-right">
                <button
                  type="button"
                  class="text-sm text-orange-500 hover:underline font-medium"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600"
            >
              {{ isLoading ? "Connexion..." : "Se Connecter" }}
            </button>
          </form>
          <p v-if="errorMessage" class="text-sm text-red-600">
            {{ errorMessage }}
          </p>
          <p class="mt-8 text-center text-xs text-slate-400">
            © 2024 Orange Digital Center. Tous droits réservés.
          </p>
        </div>
      </section>

      <section
        class="hidden lg:flex flex-col justify-center bg-orange-500 px-16 py-12"
      >
        <div class="mx-auto w-full max-w-[520px]">
          <h3 class="text-4xl font-bold text-white leading-tight">
            Suivez votre parcours<br />professionnel
          </h3>
          <p class="mt-5 text-base text-orange-100 leading-relaxed">
            ODC Track vous accompagne dans votre insertion professionnelle avec
            des outils de suivi performants et une interface intuitive.
          </p>
        </div>
      </section>
    </div>
  </main>
</template>
