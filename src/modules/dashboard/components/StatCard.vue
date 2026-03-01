<script setup lang="ts">
defineProps<{
  label: string
  value: string
  iconBg: string
  valueClass?: string
  subtitle?: string
  subtitleClass?: string
}>()
</script>

<template>
  <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <p class="text-xs text-slate-500">{{ label }}</p>
        <p :class="['mt-1.5 text-3xl font-bold leading-none', valueClass || 'text-slate-900']">{{ value }}</p>
        <p v-if="subtitle" :class="['mt-2 text-xs', subtitleClass || 'text-emerald-600']">{{ subtitle }}</p>
      </div>
      <div :class="['h-11 w-11 shrink-0 rounded-xl flex items-center justify-center', iconBg]">
        <slot name="icon" />
      </div>
    </div>
  </article>
</template>
