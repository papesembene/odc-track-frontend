import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/modules/auth/pages/LoginPage.vue'
import ValidationsPage from '@/modules/pole-emploi/pages/ValidationsPage.vue'
import BackofficePageWrapper from '@/modules/pole-emploi/pages/BackofficePageWrapper.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginPage },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: BackofficePageWrapper,
      props: { title: 'Tableau de bord', activeMenu: 'dashboard' },
    },
    { path: '/validations', name: 'validations', component: ValidationsPage },
    {
      path: '/apprenants',
      name: 'apprenants',
      component: BackofficePageWrapper,
      props: { title: 'Apprenants', activeMenu: 'apprenants' },
    },
    {
      path: '/statistiques',
      name: 'statistiques',
      component: BackofficePageWrapper,
      props: { title: 'Statistiques', activeMenu: 'statistiques' },
    },
    {
      path: '/parametres',
      name: 'parametres',
      component: BackofficePageWrapper,
      props: { title: 'Paramètres', activeMenu: 'dashboard' },
    },
    { path: '/', redirect: '/login' },
  ],
})

export default router
