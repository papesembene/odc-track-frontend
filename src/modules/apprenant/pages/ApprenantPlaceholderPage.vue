<script setup lang="ts">
import ApprenantLayout from '@/shared/layouts/ApprenantLayout.vue'

defineProps<{
  title: string
  activeMenu: 'dashboard' | 'situations' | 'documents' | 'profil'
}>()
</script>

<template>
  <ApprenantLayout :title="title" :active-menu="activeMenu">
    <section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-2xl font-bold text-slate-900">{{ title }}</h2>
      <p class="mt-1 text-slate-500">Écran en cours d'implémentation.</p>
    </section>
  </ApprenantLayout>
</template>
