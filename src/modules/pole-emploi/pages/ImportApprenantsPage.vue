<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import BackofficeLayout from "@/shared/layouts/BackofficeLayout.vue";
import { getPromotions, getReferentiels } from "../api/situations.api";
import { showToast } from "../../../core/ui/toast";
import { confirm } from "../../../core/ui/sweet-alert";

/**
 * Types
 */
interface Promotion {
  id: string;
  nom: string;
  createdAt: string;
}

interface Referentiel {
  id: string;
  nom: string;
  createdAt: string;
}

interface ImportResult {
  totalRows: number;
  createdCount: number;
  failedCount: number;
  errors: { line: number; message: string }[];
}

/**
 * État
 */
const router = useRouter();
const importType = ref<"promotion" | "referentiel">("promotion");
const selectedPromotionId = ref("");
const selectedReferentielId = ref("");
const promotions = ref<Promotion[]>([]);
const referentiels = ref<Referentiel[]>([]);
const isLoading = ref(false);
const isImporting = ref(false);
const selectedFile = ref<File | null>(null);
const dragOver = ref(false);
const importResult = ref<ImportResult | null>(null);

/**
 * Computed
 */
const canImport = computed(() => {
  if (!selectedFile.value) return false;
  if (importType.value === "promotion" && !selectedPromotionId.value)
    return false;
  if (importType.value === "referentiel" && !selectedReferentielId.value)
    return false;
  return true;
});

const allowedFormats = computed(() => [".csv", ".xlsx", ".xls"]);

/**
 * Charge les promotions et référentiels
 */
async function loadData() {
  isLoading.value = true;
  try {
    const [promoData, refData] = await Promise.all([
      getPromotions(),
      getReferentiels(),
    ]);
    promotions.value = promoData;
    referentiels.value = refData;
  } catch (error: any) {
    showToast(
      error?.response?.data?.message || "Erreur de chargement",
      "error",
    );
  } finally {
    isLoading.value = false;
  }
}

/**
 * Gère le changement de fichier
 */
function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    validateAndSetFile(file);
  }
}

/**
 * Gère le drag & drop
 */
function handleDrop(event: DragEvent) {
  dragOver.value = false;
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    const file = event.dataTransfer.files[0];
    validateAndSetFile(file);
  }
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
  dragOver.value = true;
}

function handleDragLeave() {
  dragOver.value = false;
}

/**
 * Valide et définit le fichier
 */
function validateAndSetFile(file: File) {
  const fileName = file.name.toLowerCase();
  const isValidFormat =
    fileName.endsWith(".csv") ||
    fileName.endsWith(".xlsx") ||
    fileName.endsWith(".xls");

  if (!isValidFormat) {
    showToast(
      "Format non supporté. Utilisez un fichier .csv, .xls ou .xlsx",
      "error",
    );
    return;
  }

  selectedFile.value = file;
  importResult.value = null;
}

/**
 * Supprime le fichier sélectionné
 */
function removeFile() {
  selectedFile.value = null;
}

/**
 * Effectue l'import
 */
async function handleImport() {
  if (!canImport.value || !selectedFile.value) return;

  const confirmed = await confirm(
    "Voulez-vous vraiment importer ces apprenants ?",
    "Confirmer l'import",
  );

  if (!confirmed) return;

  isImporting.value = true;
  importResult.value = null;

  try {
    let result: ImportResult;

    if (importType.value === "promotion") {
      const { importApprenantsByPromotion } =
        await import("../api/import.apprenants.api");
      result = await importApprenantsByPromotion(
        selectedPromotionId.value,
        selectedFile.value,
      );
    } else {
      const { importApprenantsByReferentiel } =
        await import("../api/import.apprenants.api");
      result = await importApprenantsByReferentiel(
        selectedReferentielId.value,
        selectedFile.value,
      );
    }

    importResult.value = result;

    // Affichage du résultat
    if (result.errors && result.errors.length > 0) {
      // SweetAlert d'avertissement avec détails des erreurs
      const errorsHtml = result.errors
        .slice(0, 10)
        .map((e) => `• Ligne ${e.line}: ${e.message}`)
        .join("<br>");
      const moreErrors =
        result.errors.length > 10
          ? `<br><em>...et ${result.errors.length - 10} autres erreurs</em>`
          : "";

      await import("sweetalert2").then((Sweetalert2) => {
        Sweetalert2.default.fire({
          icon: "warning",
          title: "Import terminé avec erreurs",
          html: `
            <div style="text-align: left; font-size: 14px;">
              <p><strong>Importés:</strong> ${result.createdCount}</p>
              <p><strong>Erreurs:</strong> ${result.errors.length}</p>
              <hr style="margin: 10px 0;">
              <p><strong>Détails des erreurs:</strong></p>
              <div style="max-height: 200px; overflow-y: auto; background: #fef2f2; padding: 10px; border-radius: 5px;">
                ${errorsHtml}${moreErrors}
              </div>
            </div>
          `,
          confirmButtonText: "OK",
          confirmButtonColor: "#f97316",
        });
      });
    } else {
      // SweetAlert de succès
      await import("sweetalert2").then((Sweetalert2) => {
        Sweetalert2.default.fire({
          icon: "success",
          title: "Import réussi !",
          text: `${result.createdCount} apprenant(s) importé(s) avec succès`,
          confirmButtonText: "OK",
          confirmButtonColor: "#f97316",
        });
      });
    }

    // Vidage du fichier après import pour éviter une double importation
    selectedFile.value = null;
    importResult.value = null;

    // Réinitialiser les selections
    selectedPromotionId.value = "";
    selectedReferentielId.value = "";
  } catch (error: any) {
    showToast(
      error?.response?.data?.message || "Erreur lors de l'import",
      "error",
    );
  } finally {
    isImporting.value = false;
  }
}

/**
 * Formatte la taille du fichier
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " o";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " Ko";
  return (bytes / (1024 * 1024)).toFixed(1) + " Mo";
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <BackofficeLayout title="Import apprenants" active-menu="import">
    <div class="space-y-5">
      <!-- ── Hero Banner ── -->
      <div
        class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-xl shadow-orange-500/20 lg:p-8"
      >
        <div
          class="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/10"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-8 right-8 h-36 w-36 rounded-full bg-white/10"
        ></div>
        <div
          class="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div
              class="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-green-400"></span>
              <span class="text-xs font-semibold">Pôle Emploi · Actif</span>
            </div>
            <h2 class="text-2xl font-extrabold leading-tight sm:text-3xl">
              Import apprenants
            </h2>
            <p class="mt-1 text-sm text-orange-100">
              Importez des apprenants depuis un fichier CSV ou Excel
            </p>
          </div>
        </div>
      </div>

      <!-- ── Type d'import ── -->
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="mb-4 text-sm font-bold text-slate-900">Type d'import</h3>

        <div class="grid gap-4 sm:grid-cols-2">
          <!-- Option Promotion -->
          <label
            class="relative cursor-pointer rounded-xl border-2 p-4 transition-all"
            :class="
              importType === 'promotion'
                ? 'border-orange-500 bg-orange-50'
                : 'border-slate-200 hover:border-orange-300'
            "
          >
            <input
              v-model="importType"
              type="radio"
              value="promotion"
              class="sr-only"
            />
            <div class="flex items-start gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                :class="
                  importType === 'promotion'
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-100 text-slate-500'
                "
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-slate-900">Par Promotion</p>
                <p class="mt-1 text-xs text-slate-500">
                  Importer des apprenants pour une promotion existante
                </p>
              </div>
            </div>
            <div
              v-if="importType === 'promotion'"
              class="absolute right-3 top-3 h-4 w-4 rounded-full bg-orange-500"
            >
              <svg
                class="h-4 w-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </label>

          <!-- Option Référentiel -->
          <label
            class="relative cursor-pointer rounded-xl border-2 p-4 transition-all"
            :class="
              importType === 'referentiel'
                ? 'border-orange-500 bg-orange-50'
                : 'border-slate-200 hover:border-orange-300'
            "
          >
            <input
              v-model="importType"
              type="radio"
              value="referentiel"
              class="sr-only"
            />
            <div class="flex items-start gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                :class="
                  importType === 'referentiel'
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-100 text-slate-500'
                "
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-slate-900">Par Référentiel</p>
                <p class="mt-1 text-xs text-slate-500">
                  Importer des apprenants pour un référentiel existant
                </p>
              </div>
            </div>
            <div
              v-if="importType === 'referentiel'"
              class="absolute right-3 top-3 h-4 w-4 rounded-full bg-orange-500"
            >
              <svg
                class="h-4 w-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </label>
        </div>
      </div>

      <!-- ── Sélection de la promotion/référentiel ── -->
      <div
        v-if="importType === 'promotion'"
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h3 class="mb-4 text-sm font-bold text-slate-900">
          Sélectionner une promotion
        </h3>

        <select
          v-model="selectedPromotionId"
          class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-400"
        >
          <option value="">Sélectionner une promotion...</option>
          <option v-for="promo in promotions" :key="promo.id" :value="promo.id">
            {{ promo.nom }}
          </option>
        </select>

        <p
          v-if="promotions.length === 0 && !isLoading"
          class="mt-2 text-sm text-amber-600"
        >
          Aucune promotion trouvée. Créez d'abord une promotion.
        </p>
      </div>

      <div
        v-else
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h3 class="mb-4 text-sm font-bold text-slate-900">
          Sélectionner un référentiel
        </h3>

        <select
          v-model="selectedReferentielId"
          class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-400"
        >
          <option value="">Sélectionner un référentiel...</option>
          <option v-for="ref in referentiels" :key="ref.id" :value="ref.id">
            {{ ref.nom }}
          </option>
        </select>

        <p
          v-if="referentiels.length === 0 && !isLoading"
          class="mt-2 text-sm text-amber-600"
        >
          Aucun référentiel trouvé. Créez d'abord un référentiel.
        </p>
      </div>

      <!-- ── Zone de dépôt du fichier ── -->
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="mb-4 text-sm font-bold text-slate-900">
          Fichier à importer
        </h3>

        <!-- Fichier sélectionné -->
        <div
          v-if="selectedFile"
          class="flex items-center gap-4 rounded-xl border border-green-300 bg-green-50 p-4"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100"
          >
            <svg
              class="h-6 w-6 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-slate-900 truncate">
              {{ selectedFile.name }}
            </p>
            <p class="text-sm text-slate-500">
              {{ formatFileSize(selectedFile.size) }}
            </p>
          </div>
          <button
            @click="removeFile"
            class="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-500"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Zone de dépôt -->
        <div
          v-else
          class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors"
          :class="
            dragOver
              ? 'border-orange-500 bg-orange-50'
              : 'border-slate-300 hover:border-orange-400'
          "
          @drop.prevent="handleDrop"
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
        >
          <div
            class="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4"
          >
            <svg
              class="h-8 w-8 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p class="text-center font-medium text-slate-700">
            Glissez-déposez votre fichier ici
          </p>
          <p class="mt-1 text-center text-sm text-slate-500">ou</p>
          <label
            class="mt-3 cursor-pointer rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition-colors hover:bg-orange-600"
          >
            <span>Parcourir</span>
            <input
              type="file"
              class="sr-only"
              accept=".csv,.xlsx,.xls"
              @change="handleFileChange"
            />
          </label>
          <p class="mt-3 text-xs text-slate-400">
            Formats supportés: CSV, XLSX, XLS
          </p>
        </div>
      </div>

      <!-- ── Résultat de l'import ── -->
      <div
        v-if="importResult"
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h3 class="mb-4 text-sm font-bold text-slate-900">
          Résultat de l'import
        </h3>

        <div class="grid gap-4 sm:grid-cols-3">
          <div class="rounded-xl bg-green-50 p-4 text-center">
            <p class="text-2xl font-bold text-green-600">
              {{ importResult.createdCount }}
            </p>
            <p class="text-sm text-green-700">Importés</p>
          </div>
          <div class="rounded-xl bg-blue-50 p-4 text-center">
            <p class="text-2xl font-bold text-blue-600">
              {{ importResult.totalRows - importResult.failedCount }}
            </p>
            <p class="text-sm text-blue-700">Total lignes</p>
          </div>
          <div class="rounded-xl bg-red-50 p-4 text-center">
            <p class="text-2xl font-bold text-red-600">
              {{ importResult.failedCount }}
            </p>
            <p class="text-sm text-red-700">Erreurs</p>
          </div>
        </div>

        <!-- Erreurs -->
        <div
          v-if="importResult.errors && importResult.errors.length > 0"
          class="mt-4"
        >
          <h4 class="text-sm font-semibold text-slate-900 mb-2">Erreurs:</h4>
          <ul
            class="max-h-40 overflow-y-auto space-y-1 rounded-lg bg-red-50 p-3"
          >
            <li
              v-for="(error, index) in importResult.errors"
              :key="index"
              class="text-xs text-red-600"
            >
              Ligne {{ error.line }}: {{ error.message }}
            </li>
          </ul>
        </div>
      </div>

      <!-- ── Bouton d'import ── -->
      <div class="flex justify-end">
        <button
          @click="handleImport"
          :disabled="!canImport || isImporting"
          class="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition-colors hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            v-if="isImporting"
            class="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <svg
            v-else
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {{ isImporting ? "Import en cours..." : "Importer" }}
        </button>
      </div>
    </div>
  </BackofficeLayout>
</template>
