<script setup lang="ts">
defineProps<{
  name: string
  type: string
  date: string
}>()
</script>

<template>
  <div class="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <!-- Icon + info -->
    <div class="flex items-start gap-3">
      <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100">
        <svg class="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-semibold text-slate-800">{{ name }}</p>
        <p class="mt-0.5 text-xs text-slate-500">{{ type }} • {{ date }}</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-4">
      <button class="inline-flex items-center gap-1.5 text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
        </svg>
        Voir
      </button>
      <button class="inline-flex items-center gap-1.5 text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Télécharger
      </button>
    </div>
  </div>
</template>
