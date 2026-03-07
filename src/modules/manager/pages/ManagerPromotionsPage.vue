<script setup lang="ts">
import { ref, onMounted } from "vue";
import ManagerLayout from "@/modules/manager/layouts/ManagerLayout.vue";
import {
  getPromotions,
  type PromotionItem,
  activatePromotion,
} from "@/modules/manager/api/promotions.api";
import PageLoadingState from '@/shared/components/PageLoadingState.vue';
import EmptyState from '@/shared/components/EmptyState.vue';

interface PromotionWithStats extends PromotionItem {
  totalApprenants: number;
  enEmploi: number;
  tauxInsertion: number;
}

const promotions = ref<PromotionWithStats[]>([]);
const loading = ref(true);
const activatingId = ref<string | null>(null);
const error = ref<string | null>(null);

async function fetchData() {
  loading.value = true;
  error.value = null;
  try {
    const promosData = await getPromotions();

    // Cette page ne depend plus des statistiques globales.
    promotions.value = promosData.map((p: PromotionItem) => ({
      ...p,
      totalApprenants: 0,
      enEmploi: 0,
      tauxInsertion: 0,
    }));
  } catch (e: any) {
    error.value = e.message || "Erreur lors du chargement des promotions";
    console.error("Erreur:", e);
  } finally {
    loading.value = false;
  }
}

async function handleActivate(promoId: string) {
  activatingId.value = promoId;
  error.value = null;
  try {
    await activatePromotion(promoId);
    await fetchData();
  } catch (e: any) {
    error.value = e.message || "Erreur lors de l'activation de la promotion";
    console.error("Erreur activation:", e);
  } finally {
    activatingId.value = null;
  }
}

onMounted(fetchData);
</script>

<template>
  <ManagerLayout title="Promotions" active-menu="promotions">
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Promotions</h1>
          <p class="text-slate-500">Gérez et activez vos promotions</p>
        </div>
      </div>

      <!-- Loading -->
      <PageLoadingState v-if="loading" />

      <div
        v-else-if="error"
        class="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700"
      >
        <p class="font-semibold">Chargement impossible</p>
        <p class="mt-1 text-sm">{{ error }}</p>
        <button
          class="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          @click="fetchData"
        >
          Reessayer
        </button>
      </div>

      <!-- Cards Grid -->
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="promo in promotions"
          :key="promo.id"
          :class="[
            'relative rounded-2xl border-2 p-6 shadow-sm transition-all',
            promo.estActive
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-slate-200 bg-white hover:border-orange-300',
          ]"
        >
          <!-- Active Badge -->
          <div
            v-if="promo.estActive"
            class="absolute -top-3 left-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white"
          >
            ACTIVE
          </div>

          <!-- Promo Info -->
          <div class="mb-4">
            <h3 class="text-xl font-bold text-slate-900">{{ promo.nom }}</h3>
            <p class="text-sm text-slate-500">Année {{ promo.annee }}</p>
          </div>

          <!-- Stats -->
          <div class="mb-4 grid grid-cols-2 gap-4">
            <div class="text-center">
              <p class="text-2xl font-bold text-slate-900">
                {{ promo.totalApprenants }}
              </p>
              <p class="text-xs text-slate-500">Apprenants</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-emerald-600">
                {{ promo.tauxInsertion }}%
              </p>
              <p class="text-xs text-slate-500">Emploi</p>
            </div>
          </div>

          <!-- Action Button -->
          <button
            v-if="!promo.estActive"
            @click="handleActivate(promo.id)"
            :disabled="activatingId === promo.id"
            class="w-full rounded-xl bg-orange-500 py-2.5 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {{
              activatingId === promo.id
                ? "Activation..."
                : "Activer cette promotion"
            }}
          </button>
          <div
            v-else
            class="w-full rounded-xl bg-emerald-500 py-2.5 text-center font-semibold text-white"
          >
            ✓ Promotion active
          </div>
        </div>

        <!-- Empty State -->
        <EmptyState
          v-if="promotions.length === 0"
          class="col-span-full"
          title="Aucune promotion trouvée"
        />
      </div>

      <!-- Info Box -->
      <div class="rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
        <strong>Comment ça marche:</strong> Activez une promotion pour définir
        quella sera affichée par défaut dans le dashboard Pole Emploi. Les
        autres promotions restent accessibles via les filtres.
      </div>
    </div>
  </ManagerLayout>
</template>
