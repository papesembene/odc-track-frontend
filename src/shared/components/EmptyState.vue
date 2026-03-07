<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description?: string
    compact?: boolean
  }>(),
  {
    description: '',
    compact: false,
  },
)
</script>

<template>
  <div
    class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-center"
    :class="compact ? 'px-4 py-8' : 'px-6 py-12'"
  >
    <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200">
      <svg
        class="h-6 w-6 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M9 10h.01" stroke-width="2.5"/>
        <path d="M15 10h.01" stroke-width="2.5"/>
        <path d="M8.5 15c1-.9 2.15-1.35 3.5-1.35S14.5 14.1 15.5 15" />
      </svg>
    </div>
    <p class="mt-4 text-sm font-semibold text-slate-700">{{ title }}</p>
    <p v-if="description" class="mt-1 text-xs leading-relaxed text-slate-400">{{ description }}</p>
  </div>
</template>
