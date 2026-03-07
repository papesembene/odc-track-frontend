<script setup lang="ts">
import { useToastStore, removeToast } from "@/core/ui/toast";

const { toasts } = useToastStore();

const config = (type: string) => {
  if (type === "success") {
    return {
      wrapper: "border-emerald-200 bg-white shadow-lg shadow-emerald-500/10",
      icon: "text-emerald-500",
      text: "text-slate-800",
      sub: "text-emerald-600",
    };
  }
  if (type === "error") {
    return {
      wrapper: "border-red-200 bg-white shadow-lg shadow-red-500/10",
      icon: "text-red-500",
      text: "text-slate-800",
      sub: "text-red-600",
    };
  }
  return {
    wrapper: "border-blue-200 bg-white shadow-lg shadow-blue-500/10",
    icon: "text-blue-500",
    text: "text-slate-800",
    sub: "text-blue-600",
  };
};
</script>

<template>
  <div class="pointer-events-none fixed right-4 top-4 z-[1000] flex w-full max-w-sm flex-col gap-2.5">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3.5"
        :class="config(toast.type).wrapper"
      >
        <!-- Icon -->
        <div class="mt-0.5 shrink-0" :class="config(toast.type).icon">
          <svg v-if="toast.type === 'success'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9" /><polyline points="9 12 11.5 14.5 15.5 10" />
          </svg>
          <svg v-else-if="toast.type === 'error'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <!-- Text -->
        <p class="flex-1 text-sm font-medium leading-snug" :class="config(toast.type).text">{{ toast.message }}</p>

        <!-- Close -->
        <button
          type="button"
          class="shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          @click="removeToast(toast.id)"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}
</style>
