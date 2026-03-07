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
    class="flex items-center justify-center"
    :class="compact ? 'py-8' : 'py-12'"
  >
    <div class="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
    <span class="ml-3 text-slate-500">{{ message }}</span>
  </div>
</template>
