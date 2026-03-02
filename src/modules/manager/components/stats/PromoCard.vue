<script setup lang="ts">
defineProps<{
  name: string
  status: string
  statusTextClass: string
  statusBgClass: string
  statusBorderClass: string
  apprenants: number
  situations: number
  tauxInsertion: number
  progress: number
}>()
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white p-5">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <p class="text-sm font-bold text-slate-900">{{ name }}</p>
      <span
        :class="[
          'rounded-full border px-2.5 py-0.5 text-xs font-medium',
          statusTextClass, statusBgClass, statusBorderClass,
        ]"
      >{{ status }}</span>
    </div>

    <!-- Stats -->
    <div class="space-y-2 mb-4">
      <div class="flex items-center justify-between text-sm">
        <span class="text-slate-500">Apprenants</span>
        <span class="font-semibold text-slate-900">{{ apprenants }}</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="text-slate-500">Situations</span>
        <span class="font-semibold text-slate-900">{{ situations }}</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="text-slate-500">Taux d'insertion</span>
        <span class="font-bold text-green-600">{{ tauxInsertion }}%</span>
      </div>
    </div>

    <!-- Progress -->
    <div class="h-1.5 w-full rounded-full bg-slate-100">
      <div
        class="h-1.5 rounded-full bg-orange-500 transition-all duration-500"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
  </div>
</template>
