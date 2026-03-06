<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ApprenantLayout from "../../../shared/layouts/ApprenantLayout.vue";
import DocumentGroup from "../components/DocumentGroup.vue";
import AddDocumentModal from "../components/AddDocumentModal.vue";
import type { DocumentItem } from "../components/DocumentGroup.vue";
import { showToast } from "../../../core/ui/toast";
import Swal from "sweetalert2";
import { api } from "../../../core/api/axios";
import {
  getSituationsAvecDocuments,
  getDocumentPath,
  deleteDocument,
  extractFileName,
  mapType,
  mapStatus,
  formatDate,
  type SituationType,
  type DocStatus,
} from "../api/documents.api";

type SituationGroup = {
  id: string;
  type: SituationType;
  status: DocStatus;
  entreprise?: string;
  dateDebut: string;
  dateFin?: string;
  description: string;
  documents: DocumentItem[];
};

const showModal = ref(false);
const isLoading = ref(false);
const isDownloading = ref(false);
const deletingDocumentId = ref<string | null>(null);
const groups = ref<SituationGroup[]>([]);

const loadGroups = async () => {
  isLoading.value = true;
  try {
    const situations = await getSituationsAvecDocuments();

    groups.value = situations.map((situation) => ({
      id: situation.id,
      type: mapType(situation.statut as any),
      status: mapStatus(situation as any),
      entreprise:
        situation.entreprise?.nom || situation.nomEntrepriseLibre || undefined,
      dateDebut: formatDate(situation.dateDebut),
      dateFin: formatDate(situation.dateFin) || undefined,
      description: situation.commentaire || "Aucune description",
      documents: (situation.documents ?? []).map((doc) => ({
        id: doc.id,
        name: extractFileName(doc.fichier),
        type: doc.type,
        date: formatDate(doc.dateUpload ?? doc.createdAt),
      })),
    }));
  } catch (error: any) {
    const apiMessage = error?.response?.data?.message;
    const message = Array.isArray(apiMessage)
      ? apiMessage.join(", ")
      : apiMessage || "Impossible de charger les documents";
    showToast(message, "error");
  } finally {
    isLoading.value = false;
  }
};

const stats = computed(() => ({
  total: groups.value.reduce((acc, g) => acc + g.documents.length, 0),
  situations: groups.value.length,
  validees: groups.value.filter((g) => g.status === "Validée").length,
}));

const situationOptions = computed(() =>
  groups.value.map((group) => ({
    id: group.id,
    label: `${group.type} - ${group.entreprise ?? "Entreprise"} (${group.dateDebut})`,
  })),
);

// Transforme le chemin stocke en URL exploitable par le navigateur.
const resolveFileUrl = (filePath: string) => {
  if (!filePath) return "";
  if (filePath.startsWith("http://") || filePath.startsWith("https://"))
    return filePath;
  const baseUrl = String(api.defaults.baseURL ?? "");
  const origin = baseUrl.replace(/\/api\/v\d+\/?$/, "");
  const normalizedPath = filePath.startsWith("/") ? filePath : `/${filePath}`;
  return `${origin}${normalizedPath}`;
};

const getFilePathByDocumentId = async (documentId: string) => {
  return await getDocumentPath(documentId);
};

const openFile = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const downloadFile = (url: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleViewDocument = async (documentId: string) => {
  try {
    const filePath = await getFilePathByDocumentId(documentId);
    if (!filePath) {
      showToast("Fichier introuvable pour ce document", "error");
      return;
    }

    const url = resolveFileUrl(filePath);
    if (!url) {
      showToast("URL du fichier invalide", "error");
      return;
    }

    openFile(url);
  } catch (error: any) {
    const apiMessage = error?.response?.data?.message;
    const message = Array.isArray(apiMessage)
      ? apiMessage.join(", ")
      : apiMessage || "Impossible d'ouvrir le document";
    showToast(message, "error");
  }
};

const handleDownloadDocument = async (documentId: string) => {
  if (isDownloading.value) return;

  isDownloading.value = true;
  try {
    const filePath = await getFilePathByDocumentId(documentId);
    if (!filePath) {
      showToast("Fichier introuvable pour ce document", "error");
      return;
    }

    const url = resolveFileUrl(filePath);
    if (!url) {
      showToast("URL du fichier invalide", "error");
      return;
    }

    downloadFile(url, extractFileName(filePath));
    showToast("Téléchargement lancé", "success");
  } catch (error: any) {
    const apiMessage = error?.response?.data?.message;
    const message = Array.isArray(apiMessage)
      ? apiMessage.join(", ")
      : apiMessage || "Impossible de télécharger le document";
    showToast(message, "error");
  } finally {
    isDownloading.value = false;
  }
};

// Confirme puis supprime un document via l'API apprenant, et recharge la liste.
const handleDeleteDocument = async (documentId: string) => {
  if (deletingDocumentId.value) return;

  const result = await Swal.fire({
    title: "Supprimer ce document ?",
    text: "Cette action est definitive.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#f97316",
    cancelButtonColor: "#94a3b8",
    confirmButtonText: "Oui, supprimer",
    cancelButtonText: "Annuler",
  });

  if (!result.isConfirmed) return;

  deletingDocumentId.value = documentId;
  try {
    await deleteDocument(documentId);
    showToast("Document supprimé avec succès", "success");
    await loadGroups();
  } catch (error: any) {
    const apiMessage = error?.response?.data?.message;
    const message = Array.isArray(apiMessage)
      ? apiMessage.join(", ")
      : apiMessage || "Impossible de supprimer le document";
    showToast(message, "error");
  } finally {
    deletingDocumentId.value = null;
  }
};

onMounted(loadGroups);
</script>

<template>
  <ApprenantLayout title="Mes documents" active-menu="documents">
    <section class="space-y-6">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 class="text-2xl font-extrabold text-slate-900">Mes documents</h2>
          <p class="mt-1 text-sm text-slate-500">
            Gérez tous vos documents liés à vos situations professionnelles
          </p>
        </div>
        <button
          class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          @click="showModal = true"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Ajouter un document
        </button>
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <article
          class="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 transition-transform group-hover:scale-110"
          >
            <svg
              class="h-5 w-5 text-orange-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
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
            <p class="text-3xl font-extrabold text-slate-900">
              {{ stats.total }}
            </p>
            <p
              class="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-400"
            >
              Documents totaux
            </p>
          </div>
        </article>

        <article
          class="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 transition-transform group-hover:scale-110"
          >
            <svg
              class="h-5 w-5 text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
          <div>
            <p class="text-3xl font-extrabold text-blue-600">
              {{ stats.situations }}
            </p>
            <p
              class="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-400"
            >
              Situations
            </p>
          </div>
        </article>

        <article
          class="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 transition-transform group-hover:scale-110"
          >
            <svg
              class="h-5 w-5 text-emerald-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div>
            <p class="text-3xl font-extrabold text-emerald-600">
              {{ stats.validees }}
            </p>
            <p
              class="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-400"
            >
              Situations validées
            </p>
          </div>
        </article>
      </div>

      <div
        v-if="isLoading"
        class="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm"
      >
        Chargement des documents...
      </div>

      <div
        v-else-if="groups.length === 0"
        class="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm"
      >
        Aucun document disponible pour le moment.
      </div>

      <div v-else class="space-y-4">
        <DocumentGroup
          v-for="group in groups"
          :key="group.id"
          :type="group.type"
          :status="group.status"
          :entreprise="group.entreprise"
          :date-debut="group.dateDebut"
          :date-fin="group.dateFin"
          :description="group.description"
          :documents="group.documents"
          :deleting-document-id="deletingDocumentId"
          @view-document="handleViewDocument"
          @download-document="handleDownloadDocument"
          @delete-document="handleDeleteDocument"
        />
      </div>

      <AddDocumentModal
        :open="showModal"
        :situation-options="situationOptions"
        @close="showModal = false"
        @uploaded="loadGroups"
      />

      <div
        v-if="isDownloading"
        class="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
      >
        <div
          class="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-xl"
        >
          <svg
            class="h-5 w-5 animate-spin text-orange-500"
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
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
            />
          </svg>
          <p class="text-sm font-medium text-slate-700">
            Téléchargement en cours...
          </p>
        </div>
      </div>
    </section>
  </ApprenantLayout>
</template>
