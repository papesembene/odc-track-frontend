import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/modules/auth/pages/LoginPage.vue'

import PoleEmploiDashboardPage from '@/modules/pole-emploi/pages/PoleEmploiDashboardPage.vue'
import ValidationsPage from '@/modules/pole-emploi/pages/ValidationsPage.vue'
import ApprenantsListPage from '@/modules/pole-emploi/pages/ApprenantsListPage.vue'
import ApprenantDetailPage from '@/modules/pole-emploi/pages/ApprenantDetailPage.vue'
import PoleEmploiStatistiquesPage from '@/modules/pole-emploi/pages/PoleEmploiStatistiquesPage.vue'
import PlaceholderBackofficePage from '@/modules/pole-emploi/pages/PlaceholderBackofficePage.vue'

import ApprenantDashboardPage from '@/modules/apprenant/pages/ApprenantDashboardPage.vue'
import ApprenantSituationsPage from '@/modules/apprenant/pages/ApprenantSituationsPage.vue'
import ApprenantNewSituationPage from '@/modules/apprenant/pages/ApprenantNewSituationPage.vue'
import ApprenantDocumentsPage from '@/modules/apprenant/pages/ApprenantDocumentsPage.vue'
import ApprenantProfilPage from '@/modules/apprenant/pages/ApprenantProfilPage.vue'
import ManagerDashboardPage from '@/modules/manager/pages/ManagerDashboardPage.vue'
import ManagerApprenantsPage from '@/modules/manager/pages/ManagerApprenantsPage.vue'
import CoachDashboardPage from '@/modules/coach/pages/CoachDashboardPage.vue'
import CoachApprenantsPage from '@/modules/coach/pages/CoachApprenantsPage.vue'
import CoachStatistiquesPage from '@/modules/coach/pages/CoachStatistiquesPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginPage },

    // Pole Emploi
    { path: '/dashboard', name: 'dashboard', component: PoleEmploiDashboardPage },
    { path: '/validations', name: 'validations', component: ValidationsPage },
    { path: '/apprenants', name: 'apprenants', component: ApprenantsListPage },
    { path: '/apprenants/:id', name: 'apprenant-detail', component: ApprenantDetailPage },
    { path: '/statistiques', name: 'statistiques', component: PoleEmploiStatistiquesPage },
    {
      path: '/parametres',
      name: 'parametres',
      component: PlaceholderBackofficePage,
      props: { title: 'Paramètres', activeMenu: 'dashboard' },
    },

    // Apprenant (UI flow)
    { path: '/dashboard-apprenant', name: 'dashboard-apprenant', component: ApprenantDashboardPage },
    { path: '/situations', name: 'apprenant-situations', component: ApprenantSituationsPage },
    {
      path: '/situations/nouvelle',
      name: 'apprenant-situation-new',
      component: ApprenantNewSituationPage,
    },
    {
      path: '/documents',
      name: 'apprenant-documents',
      component: ApprenantDocumentsPage,
    },
    {
      path: '/profil',
      name: 'apprenant-profil',
      component: ApprenantProfilPage,
    },

    // Manager (UI flow)
    { path: '/dashboard-manager', name: 'dashboard-manager', component: ManagerDashboardPage },
    { path: '/manager/apprenants', name: 'manager-apprenants', component: ManagerApprenantsPage },

    // Coach (UI flow)
    { path: '/coach/dashboard', name: 'coach-dashboard', component: CoachDashboardPage },
    { path: '/coach/apprenants', name: 'coach-apprenants', component: CoachApprenantsPage },
    { path: '/coach/statistiques', name: 'coach-statistiques', component: CoachStatistiquesPage },

    { path: '/', redirect: '/login' },
  ],
})

export default router
