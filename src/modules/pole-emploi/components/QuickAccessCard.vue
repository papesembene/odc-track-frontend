<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  iconBgClass?: string
}>()
</script>

<template>
  <article class="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5">
    <div :class="['flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', iconBgClass ?? 'bg-orange-50']">
      <slot />
    </div>
    <div>
      <p class="text-sm font-bold text-slate-900">{{ title }}</p>
      <p class="mt-0.5 text-sm text-slate-500">{{ subtitle }}</p>
    </div>
    <svg class="ml-auto h-4 w-4 shrink-0 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  </article>
</template>
