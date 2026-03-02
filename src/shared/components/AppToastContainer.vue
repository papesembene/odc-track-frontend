<script setup lang="ts">
import { useToastStore, removeToast } from "@/core/ui/toast";

const { toasts } = useToastStore();

const toastClass = (type: string) => {
  if (type === "success") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }
  if (type === "error") {
    return "border-red-200 bg-red-50 text-red-800";
  }
  return "border-sky-200 bg-sky-50 text-sky-800";
};
</script>

<template>
  <div class="pointer-events-none fixed right-4 top-4 z-[1000] flex w-full max-w-sm flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-start justify-between gap-3 rounded-lg border px-4 py-3 shadow-sm"
        :class="toastClass(toast.type)"
      >
        <p class="text-sm font-medium">{{ toast.message }}</p>
        <button
          type="button"
          class="text-xs font-semibold opacity-70 hover:opacity-100"
          @click="removeToast(toast.id)"
        >
          Fermer
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

