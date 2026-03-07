<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  Megaphone,
  Plus,
  Users,
  Zap,
  Link2,
  CheckCircle2,
  BookOpen,
  CalendarDays,
  Info,
  X,
  Loader2,
  RefreshCw,
  TrendingUp,
  Briefcase,
} from 'lucide-vue-next'
import ManagerLayout from '@/modules/manager/layouts/ManagerLayout.vue'
import {
  activatePromotion,
  createPromotion,
  getPromotions,
  type PromotionInput,
  type PromotionItem,
} from '@/modules/manager/api/promotions.api'
import {
  getReferentiels,
  type ReferentielItem,
} from '@/modules/manager/api/referentiels.api'
import { getStatistiques } from '@/modules/manager/api/statistiques.api'
import PageLoadingState from '@/shared/components/PageLoadingState.vue'
import EmptyState from '@/shared/components/EmptyState.vue'

interface PromotionWithStats extends PromotionItem {
  totalApprenants: number
  enEmploi: number
  tauxInsertion: number
}

const promotions = ref<PromotionWithStats[]>([])
const referentiels = ref<ReferentielItem[]>([])
const loading = ref(true)
const hasLoaded = ref(false)
const activatingId = ref<string | null>(null)
const saving = ref(false)
const error = ref<string | null>(null)
const formError = ref<string | null>(null)
const showModal = ref(false)

const form = ref<PromotionInput>({
  nom: '',
  annee: new Date().getFullYear(),
  referentielIds: [],
})

const totalActive = computed(
  () => promotions.value.filter((promotion) => promotion.estActive).length,
)

const totalReferentielLinks = computed(() =>
  promotions.value.reduce(
    (count, promotion) => count + (promotion.referentiels?.length ?? 0),
    0,
  ),
)

async function fetchData() {
  loading.value = true
  error.value = null

  try {
    const [promotionsData, statsData, referentielsData] = await Promise.all([
      getPromotions(),
      getStatistiques({
        includePromotions: true,
        includeReferentiels: false,
        includeSituationsRecentes: false,
      }),
      getReferentiels({ page: 1, limit: 100, sortBy: 'nom', sortOrder: 'asc' }),
    ])

    const statsByPromotion = new Map(
      statsData.parPromotion.map((promotion) => [
        promotion.promotionId,
        promotion,
      ]),
    )

    promotions.value = promotionsData.items.map((promotion) => ({
      ...promotion,
      totalApprenants: statsByPromotion.get(promotion.id)?.total ?? 0,
      enEmploi: statsByPromotion.get(promotion.id)?.enEmploi ?? 0,
      tauxInsertion:
        (statsByPromotion.get(promotion.id)?.total ?? 0) > 0
          ? Math.round(
              (((statsByPromotion.get(promotion.id)?.enEmploi ?? 0) /
                (statsByPromotion.get(promotion.id)?.total ?? 1)) *
                100),
            )
          : 0,
    }))

    referentiels.value = referentielsData.items
    hasLoaded.value = true
  } catch (e: any) {
    error.value = e.message || 'Erreur lors du chargement des promotions'
  } finally {
    loading.value = false
  }
}

async function handleActivate(promoId: string) {
  activatingId.value = promoId
  error.value = null

  try {
    await activatePromotion(promoId)
    await fetchData()
  } catch (e: any) {
    error.value = e.message || "Erreur lors de l'activation de la promotion"
  } finally {
    activatingId.value = null
  }
}

function openCreateModal() {
  form.value = {
    nom: '',
    annee: new Date().getFullYear(),
    referentielIds: [],
  }
  formError.value = null
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  formError.value = null
}

function toggleReferentiel(id: string) {
  const idx = form.value.referentielIds.indexOf(id)
  if (idx === -1) {
    form.value.referentielIds.push(id)
  } else {
    form.value.referentielIds.splice(idx, 1)
  }
}

async function submitPromotion() {
  if (!form.value.nom.trim()) {
    formError.value = 'Le nom de la promotion est obligatoire'
    return
  }

  if (form.value.referentielIds.length === 0) {
    formError.value = 'Sélectionnez au moins un référentiel'
    return
  }

  saving.value = true
  formError.value = null

  try {
    await createPromotion({
      nom: form.value.nom.trim(),
      annee: Number(form.value.annee),
      referentielIds: form.value.referentielIds,
    })
    closeModal()
    await fetchData()
  } catch (e: any) {
    formError.value = e.message || 'Erreur lors de la création de la promotion'
  } finally {
    saving.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <ManagerLayout title="Promotions" active-menu="promotions">
    <div class="space-y-6">

      <!-- ── Page Header ── -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/25">
            <Megaphone class="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-slate-900">Promotions</h1>
            <p class="text-sm text-slate-500">Gérez les promotions et affectez-leur plusieurs référentiels</p>
          </div>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-600 hover:-translate-y-px active:translate-y-0"
          @click="openCreateModal"
        >
          <Plus class="h-4 w-4" />
          Nouvelle promotion
        </button>
      </div>

      <!-- ── Initial loading ── -->
      <PageLoadingState v-if="loading && !hasLoaded" message="Chargement des promotions..." />

      <!-- ── Error ── -->
      <div
        v-else-if="error"
        class="flex items-start gap-4 rounded-2xl border border-red-200 bg-red-50 p-5"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
          <X class="h-5 w-5 text-red-600" />
        </div>
        <div class="flex-1">
          <p class="font-semibold text-red-700">Chargement impossible</p>
          <p class="mt-0.5 text-sm text-red-600">{{ error }}</p>
          <button
            type="button"
            class="mt-3 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            @click="fetchData"
          >
            <RefreshCw class="h-3.5 w-3.5" />
            Réessayer
          </button>
        </div>
      </div>

      <template v-else>
        <!-- ── KPI cards ── -->
        <div class="grid gap-4 sm:grid-cols-3">
          <!-- Total -->
          <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                <Megaphone class="h-5 w-5 text-orange-500" />
              </div>
              <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">Total</span>
            </div>
            <p class="mt-4 text-3xl font-bold text-slate-900">{{ promotions.length }}</p>
            <p class="mt-1 text-sm text-slate-500">Promotions cataloguées</p>
          </article>

          <!-- Active -->
          <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2 class="h-5 w-5 text-emerald-500" />
              </div>
              <span
                :class="[
                  'rounded-full px-2 py-0.5 text-xs font-medium',
                  totalActive === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600',
                ]"
              >
                {{ totalActive === 1 ? 'Correct' : 'Attention' }}
              </span>
            </div>
            <p class="mt-4 text-3xl font-bold text-slate-900">{{ totalActive }}</p>
            <p class="mt-1 text-sm text-slate-500">Promotion active</p>
          </article>

          <!-- Affectations -->
          <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Link2 class="h-5 w-5 text-blue-500" />
              </div>
              <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">Liens</span>
            </div>
            <p class="mt-4 text-3xl font-bold text-slate-900">{{ totalReferentielLinks }}</p>
            <p class="mt-1 text-sm text-slate-500">Liens promotion ↔ référentiel</p>
          </article>
        </div>

        <!-- ── Refreshing state ── -->
        <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <PageLoadingState compact message="Actualisation des promotions..." />
        </div>

        <!-- ── Empty ── -->
        <div v-else-if="promotions.length === 0" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <EmptyState
            title="Aucune promotion trouvée"
            description="Créez une première promotion et rattachez-lui un ou plusieurs référentiels."
          />
        </div>

        <!-- ── Promotions list ── -->
        <div v-else class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div
            v-for="(promo, index) in promotions"
            :key="promo.id"
            :class="[
              'flex flex-col gap-3 px-5 py-4 transition-colors sm:flex-row sm:items-center',
              index !== 0 && 'border-t border-slate-100',
              promo.estActive ? 'bg-orange-50/60' : 'hover:bg-slate-50',
            ]"
          >
            <!-- Left: name + year + referentiels -->
            <div class="flex min-w-0 flex-1 items-center gap-4">
              <div
                :class="[
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                  promo.estActive ? 'bg-orange-100' : 'bg-slate-100',
                ]"
              >
                <Megaphone :class="['h-5 w-5', promo.estActive ? 'text-orange-500' : 'text-slate-400']" />
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-semibold text-slate-900 truncate">{{ promo.nom }}</span>
                  <span
                    v-if="promo.estActive"
                    class="inline-flex items-center gap-1 rounded-full bg-orange-500 px-2 py-0.5 text-[11px] font-bold text-white"
                  >
                    <CheckCircle2 class="h-3 w-3" />
                    ACTIVE
                  </span>
                </div>
                <div class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span class="flex items-center gap-1">
                    <CalendarDays class="h-3.5 w-3.5" />
                    {{ promo.annee }}
                  </span>
                  <span class="flex items-center gap-1">
                    <Users class="h-3.5 w-3.5" />
                    {{ promo.totalApprenants }} apprenant{{ promo.totalApprenants !== 1 ? 's' : '' }}
                  </span>
                  <span class="flex items-center gap-1">
                    <TrendingUp class="h-3.5 w-3.5" />
                    <span
                      :class="
                        promo.tauxInsertion >= 70 ? 'text-emerald-600 font-semibold' :
                        promo.tauxInsertion >= 40 ? 'text-amber-600 font-semibold' : ''
                      "
                    >{{ promo.tauxInsertion }}% emploi</span>
                  </span>
                </div>
                <div class="mt-2 flex flex-wrap gap-1.5">
                  <span
                    v-for="link in promo.referentiels ?? []"
                    :key="link.referentielId"
                    class="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600"
                  >
                    {{ link.referentiel.nom }}
                  </span>
                  <span v-if="(promo.referentiels?.length ?? 0) === 0" class="text-xs italic text-slate-400">
                    Aucun référentiel
                  </span>
                </div>
              </div>
            </div>

            <!-- Right: action -->
            <div class="shrink-0">
              <button
                v-if="!promo.estActive"
                type="button"
                :disabled="activatingId === promo.id"
                class="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 disabled:opacity-50"
                @click="handleActivate(promo.id)"
              >
                <Loader2 v-if="activatingId === promo.id" class="h-3.5 w-3.5 animate-spin" />
                <Zap v-else class="h-3.5 w-3.5" />
                {{ activatingId === promo.id ? 'Activation…' : 'Activer' }}
              </button>
              <div
                v-else
                class="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-3.5 py-2 text-xs font-semibold text-white"
              >
                <CheckCircle2 class="h-3.5 w-3.5" />
                Active
              </div>
            </div>
          </div>
        </div>

       
      </template>
    </div>

    <!-- ── Create Promotion Modal ── -->
    <Transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          @click="closeModal"
        />

        <!-- Panel -->
        <div class="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5">
          <!-- Modal header -->
          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50">
                <Megaphone class="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h2 id="modal-title" class="text-base font-bold text-slate-900">Nouvelle promotion</h2>
                <p class="text-xs text-slate-500">Remplissez les informations ci-dessous</p>
              </div>
            </div>
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              @click="closeModal"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <!-- Modal body -->
          <form class="px-6 py-5 space-y-5" @submit.prevent="submitPromotion">
            <!-- Form error -->
            <div
              v-if="formError"
              class="flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3"
            >
              <X class="h-4 w-4 shrink-0 text-red-500" />
              <p class="text-sm text-red-600">{{ formError }}</p>
            </div>

            <!-- Nom + Année -->
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  Nom de la promotion <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.nom"
                  type="text"
                  maxlength="100"
                  required
                  placeholder="Ex: Promotion 2026"
                  class="block w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  Année <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <CalendarDays class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    v-model.number="form.annee"
                    type="number"
                    min="2000"
                    required
                    class="block w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 transition-colors focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>
            </div>

            <!-- Referentiels checklist -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                Référentiels associés <span class="text-red-500">*</span>
              </label>
              <div class="max-h-52 overflow-y-auto rounded-xl border border-slate-300 bg-slate-50 p-1">
                <label
                  v-for="referentiel in referentiels"
                  :key="referentiel.id"
                  :class="[
                    'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
                    form.referentielIds.includes(referentiel.id)
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-slate-700 hover:bg-white',
                  ]"
                >
                  <div
                    :class="[
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
                      form.referentielIds.includes(referentiel.id)
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-slate-300 bg-white',
                    ]"
                  >
                    <svg
                      v-if="form.referentielIds.includes(referentiel.id)"
                      class="h-3 w-3 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <BookOpen class="h-4 w-4 shrink-0 opacity-60" />
                  <span class="text-sm font-medium">{{ referentiel.nom }}</span>
                  <input
                    type="checkbox"
                    class="sr-only"
                    :value="referentiel.id"
                    :checked="form.referentielIds.includes(referentiel.id)"
                    @change="toggleReferentiel(referentiel.id)"
                  />
                </label>
                <p v-if="referentiels.length === 0" class="py-6 text-center text-sm text-slate-400">
                  Aucun référentiel disponible
                </p>
              </div>
              <p class="mt-1.5 text-xs text-slate-500">
                {{ form.referentielIds.length }} référentiel{{ form.referentielIds.length !== 1 ? 's' : '' }} sélectionné{{ form.referentielIds.length !== 1 ? 's' : '' }}
              </p>
            </div>

            <!-- Selected tags -->
            <div v-if="form.referentielIds.length > 0" class="flex flex-wrap gap-2">
              <span
                v-for="referentielId in form.referentielIds"
                :key="referentielId"
                class="inline-flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-200 px-3 py-1 text-xs font-semibold text-orange-700"
              >
                {{ referentiels.find((item) => item.id === referentielId)?.nom || referentielId }}
                <button
                  type="button"
                  class="rounded-full hover:text-orange-900"
                  @click="toggleReferentiel(referentielId)"
                >
                  <X class="h-3 w-3" />
                </button>
              </span>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-1">
              <button
                type="button"
                class="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                @click="closeModal"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Loader2 v-if="saving" class="h-4 w-4 animate-spin" />
                <Plus v-else class="h-4 w-4" />
                {{ saving ? 'Création…' : 'Créer la promotion' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </ManagerLayout>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: translateY(12px) scale(0.98);
  opacity: 0;
}
</style>
