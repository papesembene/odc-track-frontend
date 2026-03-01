<script setup lang="ts">
import BackofficeLayout from '@/shared/layouts/BackofficeLayout.vue'

defineProps<{
  title: string
  activeMenu: 'dashboard' | 'validations' | 'apprenants' | 'statistiques'
}>()
</script>

<template>
  <BackofficeLayout :title="title" :active-menu="activeMenu">
    <section class="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
      <h2 class="text-4xl font-semibold text-slate-900">{{ title }}</h2>
      <p class="mt-3 text-xl text-slate-500">Page en cours d'implémentation.</p>
    </section>
  </BackofficeLayout>
</template>
