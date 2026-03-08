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
  <article class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <p class="text-xs font-medium uppercase tracking-wide text-slate-400">{{ label }}</p>
        <p :class="['mt-2 text-3xl font-extrabold leading-none tracking-tight', valueClass || 'text-slate-900']">{{ value }}</p>
        <p v-if="subtitle" :class="['mt-2 flex items-center gap-1 text-xs font-medium', subtitleClass || 'text-emerald-600']">{{ subtitle }}</p>
      </div>
      <div :class="['flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-110', iconBg]">
        <slot name="icon" />
      </div>
    </div>
  </article>
</template>
