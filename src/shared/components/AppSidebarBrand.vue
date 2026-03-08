<script setup lang="ts">
defineProps<{
  compact?: boolean
  light?: boolean
}>()
</script>

<template>
  <div
    :class="compact ? 'gap-2' : 'gap-3'"
    class="flex items-center"
  >
    <div class="min-w-0">
      <p
        :class="compact ? 'text-[9px]' : 'text-[10px]'"
        class="font-semibold uppercase tracking-[0.16em] text-orange-400"
      >
        Orange Digital Center
      </p>
      <div class="mt-1 flex items-end gap-2">
        <p
          :class="compact ? 'text-[1.7rem] leading-none' : 'text-[1.95rem] leading-none'"
          class="sidebar-brand-wordmark font-semibold"
          :style="{ color: light ? '#0f172a' : '#ffffff' }"
        >
          sonatel
        </p>
        <div class="mb-1 flex items-end gap-2">
          <span
            :class="compact ? 'h-6 w-[2px]' : 'h-7 w-[2px]'"
            class="block"
            :style="{ backgroundColor: light ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.7)' }"
          ></span>
          <span
            :class="compact ? 'h-6 w-6' : 'h-7 w-7'"
            class="relative block bg-orange-500"
          >
            <span
              class="absolute bottom-1 left-1 right-1 h-1"
              :style="{ backgroundColor: light ? '#ffffff' : '#ffffff' }"
            ></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-brand-wordmark {
  font-family: Georgia, "Times New Roman", serif;
  letter-spacing: -0.04em;
}
</style>
