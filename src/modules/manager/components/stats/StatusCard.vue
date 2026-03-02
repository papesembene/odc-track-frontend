<script setup lang="ts">
defineProps<{
  count: number
  label: string
  percentage: number
  color: 'blue' | 'orange' | 'green'
}>()

const colorMap = {
  blue:   { text: 'text-blue-500',   bar: 'bg-blue-500',   track: 'bg-blue-100' },
  orange: { text: 'text-orange-500', bar: 'bg-orange-500', track: 'bg-orange-100' },
  green:  { text: 'text-green-500',  bar: 'bg-green-500',  track: 'bg-green-100' },
}
</script>

<template>
  <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <p :class="['text-4xl font-bold mb-1', colorMap[color].text]">{{ count }}</p>
    <p class="text-sm text-slate-600 font-medium mb-4">{{ label }}</p>
    <div :class="['h-1.5 w-full rounded-full', colorMap[color].track]">
      <div
        :class="['h-1.5 rounded-full transition-all duration-500', colorMap[color].bar]"
        :style="{ width: percentage + '%' }"
      ></div>
    </div>
    <p class="mt-2 text-xs text-slate-400">{{ percentage }}% du total</p>
  </article>
</template>
