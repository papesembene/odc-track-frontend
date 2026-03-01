import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/modules/auth/pages/LoginPage.vue'
import PoleEmploiDashboardPage from '@/modules/pole-emploi/pages/PoleEmploiDashboardPage.vue'
import ValidationsPage from '@/modules/pole-emploi/pages/ValidationsPage.vue'
import PlaceholderBackofficePage from '@/modules/pole-emploi/pages/PlaceholderBackofficePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/dashboard', name: 'dashboard', component: PoleEmploiDashboardPage },
    { path: '/validations', name: 'validations', component: ValidationsPage },
    {
      path: '/apprenants',
      name: 'apprenants',
      component: PlaceholderBackofficePage,
      props: { title: 'Apprenants', activeMenu: 'apprenants' },
    },
    {
      path: '/statistiques',
      name: 'statistiques',
      component: PlaceholderBackofficePage,
      props: { title: 'Statistiques', activeMenu: 'statistiques' },
    },
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
