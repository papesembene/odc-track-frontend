import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/modules/auth/pages/LoginPage.vue'
import PoleEmploiDashboardPage from '@/modules/pole-emploi/pages/PoleEmploiDashboardPage.vue'
import ValidationsPage from '@/modules/pole-emploi/pages/ValidationsPage.vue'
import ApprenantsListPage from '@/modules/pole-emploi/pages/ApprenantsListPage.vue'
import ApprenantDetailPage from '@/modules/pole-emploi/pages/ApprenantDetailPage.vue'
import PoleEmploiStatistiquesPage from '@/modules/pole-emploi/pages/PoleEmploiStatistiquesPage.vue'
import PlaceholderBackofficePage from '@/modules/pole-emploi/pages/PlaceholderBackofficePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginPage },
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
    { path: '/', redirect: '/login' },
  ],
})

export default router
