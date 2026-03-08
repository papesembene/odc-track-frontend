<script setup lang="ts">
// Monthly data 2024
const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

const declared  = [18, 24, 30, 26, 28, 26, 21, 19, 24, 30, 27, 0]
const validated = [12, 18, 22, 19, 24, 21, 16, 14, 19, 23, 21, 0]

const maxVal = Math.max(...declared, ...validated)

const pct = (v: number) => `${Math.round((v / maxVal) * 100)}%`
</script>

<template>
  <!-- Chart area -->
  <div class="w-full overflow-x-auto">
    <div class="min-w-[640px]">
      <!-- Bars -->
      <div class="flex items-end justify-between gap-1 h-52 px-2">
        <div
          v-for="(month, i) in months"
          :key="month"
          class="flex flex-col items-center gap-0.5 flex-1"
        >
          <!-- Bar group -->
          <div class="flex items-end gap-0.5 w-full justify-center h-44">
            <!-- Orange bar (declared) -->
            <div
              class="flex-1 max-w-[16px] rounded-t-sm bg-orange-500 transition-all duration-500"
              :style="{ height: declared[i] ? pct(declared[i]) : '2px' }"
            ></div>
            <!-- Green bar (validated) -->
            <div
              class="flex-1 max-w-[16px] rounded-t-sm bg-green-500 transition-all duration-500"
              :style="{ height: validated[i] ? pct(validated[i]) : '2px' }"
            ></div>
          </div>
          <!-- Month label -->
          <span class="text-xs text-slate-400 mt-1">{{ month }}</span>
        </div>
      </div>

      <!-- Legend -->
      <div class="flex items-center justify-center gap-6 mt-4">
        <div class="flex items-center gap-2">
          <span class="h-3 w-4 rounded-sm bg-orange-500 inline-block"></span>
          <span class="text-xs text-slate-500">Situations déclarées</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="h-3 w-4 rounded-sm bg-green-500 inline-block"></span>
          <span class="text-xs text-slate-500">Situations validées</span>
        </div>
      </div>
    </div>
  </div>
</template>
