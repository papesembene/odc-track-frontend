<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
    <h2 class="text-4xl font-semibold text-slate-900">{{ route.meta?.title || 'Page' }}</h2>
    <p class="mt-3 text-xl text-slate-500">Cette page sera implementee dans l'etape suivante.</p>
  </section>
</template>
