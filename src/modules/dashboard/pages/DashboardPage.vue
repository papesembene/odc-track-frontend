<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/shared/layouts/DashboardLayout.vue'
import { sessionStorage } from '@/core/auth/session-storage'
import type { DashboardMenuItem, DashboardUser } from '@/modules/dashboard/types'
import ApprenantDashboardContent from '@/modules/dashboard/components/ApprenantDashboardContent.vue'
import PoleEmploiDashboardContent from '@/modules/dashboard/components/PoleEmploiDashboardContent.vue'
import ManagerDashboardContent from '@/modules/dashboard/components/ManagerDashboardContent.vue'
import { tokenStorage } from '@/core/auth/token-storage'

const router = useRouter()

const fallbackUser: DashboardUser = {
  fullName: 'Amadou Diop',
  role: 'APPRENANT',
  initials: 'A',
}

const currentUser = computed(() => sessionStorage.getCurrentUser() || fallbackUser)

const menuItems = computed<DashboardMenuItem[]>(() => {
  if (currentUser.value.role === 'APPRENANT') {
    return [
      { key: 'dashboard', label: 'Tableau de bord', to: '/dashboard' },
      { key: 'situations', label: 'Mes situations', to: '/situations' },
      { key: 'documents', label: 'Mes documents', to: '/documents' },
      { key: 'profil', label: 'Mon profil', to: '/profil' },
    ]
  }

  return [
    { key: 'dashboard', label: 'Tableau de bord', to: '/dashboard' },
    { key: 'apprenants', label: 'Apprenants', to: '/apprenants' },
    { key: 'validations', label: 'Validations', to: '/validations' },
    { key: 'statistiques', label: 'Statistiques', to: '/statistiques' },
  ]
})

const pageTitle = computed(() => {
  if (currentUser.value.role === 'POLE_EMPLOI') {
    return 'Liste des apprenants'
  }

  if (currentUser.value.role === 'MANAGER') {
    return 'Statistiques'
  }

  return 'Tableau de bord'
})

const activeKey = computed(() => 'dashboard')

const dashboardComponent = computed(() => {
  if (currentUser.value.role === 'POLE_EMPLOI') {
    return PoleEmploiDashboardContent
  }

  if (currentUser.value.role === 'MANAGER') {
    return ManagerDashboardContent
  }

  return ApprenantDashboardContent
})

const onLogout = () => {
  tokenStorage.clear()
  sessionStorage.clearCurrentUser()
  router.push('/login')
}
</script>

<template>
  <DashboardLayout
    :page-title="pageTitle"
    :user="currentUser"
    :menu-items="menuItems"
    :active-key="activeKey"
    @logout="onLogout"
  >
    <component :is="dashboardComponent" />
  </DashboardLayout>
</template>
