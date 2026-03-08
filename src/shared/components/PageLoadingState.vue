<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
    compact?: boolean
  }>(),
  {
    message: 'Chargement...',
    compact: false,
  },
)
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-3"
    :class="compact ? 'py-8' : 'py-14'"
  >
    <!-- Spinner ring -->
    <div class="relative flex h-12 w-12 items-center justify-center">
      <div class="absolute inset-0 rounded-full border-4 border-slate-200"></div>
      <div class="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-orange-500"></div>
      <div class="h-2.5 w-2.5 rounded-full bg-orange-500/30"></div>
    </div>
    <p class="text-sm font-medium text-slate-500">{{ message }}</p>
  </div>
</template>
