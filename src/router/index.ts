import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/modules/auth/pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/', redirect: '/login' },
  ],
})

export default router
