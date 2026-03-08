<script setup lang="ts">
import BackofficeLayout from '@/shared/layouts/BackofficeLayout.vue'
import PlaceholderPage from '@/shared/pages/PlaceholderPage.vue'

defineProps<{
  title: string
  activeMenu: 'dashboard' | 'validations' | 'apprenants' | 'statistiques'
}>()
</script>

<template>
  <BackofficeLayout :title="title" :active-menu="activeMenu">
    <PlaceholderPage :title="title" />
  </BackofficeLayout>
</template>
