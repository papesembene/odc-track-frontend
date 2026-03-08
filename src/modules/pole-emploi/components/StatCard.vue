<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  valueClass?: string
  iconBgClass?: string
}>()
</script>

<template>
  <article class="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
    <div>
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">{{ label }}</p>
      <p :class="['mt-1.5 text-3xl font-bold', valueClass ?? 'text-slate-900']">{{ value }}</p>
    </div>
    <div :class="['flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', iconBgClass ?? 'bg-slate-100']">
      <slot />
    </div>
  </article>
</template>
