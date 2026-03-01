<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  iconBgClass?: string
}>()
</script>

<template>
  <article class="flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-orange-300 hover:shadow-md">
    <div :class="['flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', iconBgClass ?? 'bg-orange-50']">
      <slot />
    </div>
    <div>
      <p class="text-base font-semibold text-slate-900">{{ title }}</p>
      <p class="mt-0.5 text-sm text-slate-500">{{ subtitle }}</p>
    </div>
  </article>
</template>
