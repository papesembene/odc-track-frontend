<script setup lang="ts">
import { ref } from 'vue'
import { api } from '../../../core/api/axios'
import { showToast } from '../../../core/ui/toast'

type SituationOption = { id: string; label: string }
type UiDocType = 'Convention' | 'Attestation' | 'Rapport' | 'Contrat' | 'Autre'

const props = withDefaults(
  defineProps<{
    open: boolean
    situationOptions?: SituationOption[]
  }>(),
  {
    situationOptions: () => [],
  },
)

const emit = defineEmits<{
  close: []
  uploaded: []
}>()

const isUploading = ref(false)
const selectedSituation = ref('')
const selectedType = ref<UiDocType | ''>('')
const droppedFile = ref<File | null>(null)
const isDragOver = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

const typeOptions: UiDocType[] = ['Convention', 'Attestation', 'Rapport', 'Contrat', 'Autre']

// Mapping UI -> enum backend attendu par l'API documents.
const DOC_TYPE_MAP: Record<UiDocType, string> = {
  Convention: 'LETTRE_MISSION',
  Attestation: 'ATTESTATION',
  Rapport: 'AUTRE',
  Contrat: 'CONTRAT',
  Autre: 'AUTRE',
}

const resetForm = () => {
  selectedSituation.value = ''
  selectedType.value = ''
  droppedFile.value = null
  isDragOver.value = false
}

const closeModal = () => {
  resetForm()
  emit('close')
}

const browseFiles = () => fileInputRef.value?.click()

// Gère le drop du fichier dans la zone de drag & drop.
const onDrop = (event: DragEvent) => {
  isDragOver.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) droppedFile.value = file
}

const onFileInput = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) droppedFile.value = file
}

// Soumet le document (multipart/form-data) sur l'endpoint apprenant.
const onSubmit = async () => {
  if (!selectedSituation.value) {
    showToast('Sélectionnez une situation', 'error')
    return
  }
  if (!selectedType.value) {
    showToast('Sélectionnez un type de document', 'error')
    return
  }
  if (!droppedFile.value) {
    showToast('Ajoutez un fichier', 'error')
    return
  }

  isUploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', droppedFile.value)
    formData.append('situationId', selectedSituation.value)
    formData.append('type', DOC_TYPE_MAP[selectedType.value])

    await api.post('/apprenants/me/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    showToast('Document ajouté avec succès', 'success')
    emit('uploaded')
    closeModal()
  } catch (error: any) {
    const apiMessage = error?.response?.data?.message
    const message = Array.isArray(apiMessage)
      ? apiMessage.join(', ')
      : apiMessage || "Erreur lors de l'upload du document"
    showToast(message, 'error')
  } finally {
    isUploading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
        <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeModal" />

        <!-- Modal -->
        <div class="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl">
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h3 class="text-lg font-bold text-slate-900">Ajouter un document</h3>
            <button
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              @click="closeModal"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="space-y-5 px-6 py-5">
            <!-- Situation associée -->
            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-800">Situation associée *</label>
              <div class="relative">
                <select
                  v-model="selectedSituation"
                  class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 outline-none focus:border-orange-400"
                >
                  <option value="">Sélectionner une situation</option>
                  <option v-for="s in props.situationOptions" :key="s.id" :value="s.id">
                    {{ s.label }}
                  </option>
                </select>
                <svg class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            <!-- Type de document -->
            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-800">Type de document *</label>
              <div class="relative">
                <select
                  v-model="selectedType"
                  class="h-11 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-sm text-slate-700 outline-none transition-colors"
                  :class="selectedType ? 'border-orange-400' : 'border-slate-200 focus:border-orange-400'"
                >
                  <option value="">Sélectionner un type</option>
                  <option v-for="t in typeOptions" :key="t" :value="t">{{ t }}</option>
                </select>
                <svg class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            <!-- File upload -->
            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-800">Fichier *</label>
              <div
                class="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors"
                :class="isDragOver ? 'border-orange-400 bg-orange-50' : 'border-orange-300 bg-white'"
                @dragover.prevent="isDragOver = true"
                @dragleave="isDragOver = false"
                @drop.prevent="onDrop"
              >
                <!-- Cloud upload icon -->
                <div class="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <svg class="h-7 w-7 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                </div>

                <div v-if="droppedFile" class="text-sm font-medium text-slate-700">
                  📄 {{ droppedFile.name }}
                </div>
                <div v-else>
                  <p class="text-sm font-semibold text-slate-700">Glissez-déposez votre fichier ici</p>
                  <p class="mt-1 text-xs text-slate-400">ou</p>
                </div>

                <button
                  type="button"
                  class="rounded-xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                  :disabled="isUploading"
                  @click="browseFiles"
                >
                  Parcourir les fichiers
                </button>
                <p class="text-xs text-slate-400">PDF, DOC, DOCX, JPG, PNG (max 10 MB)</p>

                <input ref="fileInputRef" type="file" accept=".pdf,.doc,.docx,.jpg,.png" class="hidden" @change="onFileInput" />
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
            <button
              type="button"
              class="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
              :disabled="isUploading"
              @click="closeModal"
            >
              Annuler
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              :disabled="isUploading"
              @click="onSubmit"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              {{ isUploading ? 'Téléversement...' : 'Téléverser' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
