import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/modules/auth/pages/LoginPage.vue'
import ApprenantsListPage from '@/modules/pole-emploi/pages/ApprenantsListPage.vue'
import ApprenantDetailPage from '@/modules/pole-emploi/pages/ApprenantDetailPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/dashboard', name: 'dashboard', component: ApprenantsListPage },
    { path: '/apprenants/:id', name: 'apprenant-detail', component: ApprenantDetailPage },
    { path: '/validations', redirect: '/dashboard' },
    { path: '/statistiques', redirect: '/dashboard' },
    { path: '/parametres', redirect: '/dashboard' },
    { path: '/', redirect: '/login' },
  ],
})

export default router
