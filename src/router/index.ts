import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/modules/auth/pages/LoginPage.vue'
import DashboardPage from '@/modules/dashboard/pages/DashboardPage.vue'
import PlaceholderPage from '@/shared/pages/PlaceholderPage.vue'
import { tokenStorage } from '@/core/auth/token-storage'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginPage, meta: { public: true } },
    { path: '/dashboard', name: 'dashboard', component: DashboardPage },
    { path: '/apprenants', component: PlaceholderPage, meta: { title: 'Apprenants' } },
    { path: '/validations', component: PlaceholderPage, meta: { title: 'Validations' } },
    { path: '/statistiques', component: PlaceholderPage, meta: { title: 'Statistiques' } },
    { path: '/situations', component: PlaceholderPage, meta: { title: 'Mes situations' } },
    { path: '/documents', component: PlaceholderPage, meta: { title: 'Mes documents' } },
    { path: '/profil', component: PlaceholderPage, meta: { title: 'Mon profil' } },
    { path: '/parametres', component: PlaceholderPage, meta: { title: 'Parametres' } },
    { path: '/', redirect: '/login' },
  ],
})

router.beforeEach((to) => {
  const isPublic = Boolean(to.meta.public)
  const isAuthenticated = Boolean(tokenStorage.getAccessToken())

  if (!isPublic && !isAuthenticated) {
    return '/login'
  }

  if (to.path === '/login' && isAuthenticated) {
    return '/dashboard'
  }

  return true
})

export default router
