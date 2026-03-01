<script setup lang="ts">
defineProps<{
  name: string
  status: string
  type: string
  entreprise: string
  promotion: string
  referentiel: string
  debut: string
  fin: string
  createdAt: string
}>()

defineEmits<{
  reject: []
  validate: []
}>()
</script>

<template>
  <article class="border-b border-slate-200 px-6 py-5 last:border-b-0 lg:px-8">

    <!-- Top row: name + badge + actions -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2.5">
        <h3 class="text-base font-semibold text-slate-900">{{ name }}</h3>
        <span class="rounded-full border border-amber-400 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-600">
          {{ status }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <!-- Rejeter -->
        <button
          class="flex items-center gap-1.5 rounded-lg border border-orange-500 px-3.5 py-1.5 text-sm font-medium text-orange-500 hover:bg-orange-50 transition-colors"
          @click="$emit('reject')"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Rejeter
        </button>

        <!-- Valider -->
        <button
          class="flex items-center gap-1.5 rounded-lg bg-orange-500 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
          @click="$emit('validate')"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Valider
        </button>
      </div>
    </div>

    <!-- Meta grid -->
    <div class="mt-4 grid gap-y-3 lg:grid-cols-2">
      <div>
        <p class="text-xs text-slate-400">Type</p>
        <p class="mt-0.5 text-sm font-medium text-slate-900">{{ type }}</p>
      </div>
      <div>
        <p class="text-xs text-slate-400">Entreprise</p>
        <p class="mt-0.5 text-sm font-medium text-slate-900">{{ entreprise || '—' }}</p>
      </div>
      <div>
        <p class="text-xs text-slate-400">Promotion</p>
        <p class="mt-0.5 text-sm font-medium text-slate-900">{{ promotion }}</p>
      </div>
      <div>
        <p class="text-xs text-slate-400">Référentiel</p>
        <p class="mt-0.5 text-sm font-medium text-slate-900">{{ referentiel }}</p>
      </div>
    </div>

    <!-- Date row -->
    <div class="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-400">
      <span class="flex items-center gap-1.5">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Début: {{ debut }}
      </span>
      <span class="flex items-center gap-1.5">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Fin: {{ fin }}
      </span>
      <span class="flex items-center gap-1.5">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>
        </svg>
        Créée le {{ createdAt }}
      </span>
    </div>

  </article>
</template>
