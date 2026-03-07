import { createRouter, createWebHistory } from 'vue-router'
import { tokenStorage } from '@/core/auth/token-storage'
import { getAuthenticatedRole } from '@/core/auth/auth-session'
import { getDefaultPathByRole } from '@/core/auth/role-redirect'

const LoginPage = () => import('@/modules/auth/pages/LoginPage.vue')
const PoleEmploiDashboardPage = () => import('@/modules/pole-emploi/pages/PoleEmploiDashboardPage.vue')
const ValidationsPage = () => import('@/modules/pole-emploi/pages/ValidationsPage.vue')
const ApprenantsListPage = () => import('@/modules/pole-emploi/pages/ApprenantsListPage.vue')
const ApprenantDetailPage = () => import('@/modules/pole-emploi/pages/ApprenantDetailPage.vue')
const PoleEmploiStatistiquesPage = () => import('@/modules/pole-emploi/pages/PoleEmploiStatistiquesPage.vue')
const PlaceholderBackofficePage = () => import('@/modules/pole-emploi/pages/PlaceholderBackofficePage.vue')
const EntreprisesPage = () => import('@/modules/pole-emploi/pages/EntreprisesPage.vue')
const ImportApprenantsPage = () => import('@/modules/pole-emploi/pages/ImportApprenantsPage.vue')
const ApprenantDashboardPage = () => import('@/modules/apprenant/pages/ApprenantDashboardPage.vue')
const ApprenantSituationsPage = () => import('@/modules/apprenant/pages/ApprenantSituationsPage.vue')
const ApprenantNewSituationPage = () => import('@/modules/apprenant/pages/ApprenantNewSituationPage.vue')
const ApprenantSituationDetailPage = () => import('@/modules/apprenant/pages/ApprenantSituationDetailPage.vue')
const ApprenantDocumentsPage = () => import('@/modules/apprenant/pages/ApprenantDocumentsPage.vue')
const ApprenantProfilPage = () => import('@/modules/apprenant/pages/ApprenantProfilPage.vue')
const ManagerDashboardPage = () => import('@/modules/manager/pages/ManagerDashboardPage.vue')
const ManagerApprenantsPage = () => import('@/modules/manager/pages/ManagerApprenantsPage.vue')
const ManagerCoachesPage = () => import('@/modules/manager/pages/ManagerCoachesPage.vue')
const ManagerApprenantDetailPage = () => import('@/modules/manager/pages/ManagerApprenantDetailPage.vue')
const ManagerPromotionsPage = () => import('@/modules/manager/pages/ManagerPromotionsPage.vue')
const ManagerReferentielsPage = () => import('@/modules/manager/pages/ManagerReferentielsPage.vue')
const ManagerStatistiquesPage = () => import('@/modules/manager/pages/ManagerStatistiquesPage.vue')
const CoachDashboardPage = () => import('@/modules/coach/pages/CoachDashboardPage.vue')
const CoachApprenantsPage = () => import('@/modules/coach/pages/CoachApprenantsPage.vue')
const CoachApprenantDetailPage = () => import('@/modules/coach/pages/CoachApprenantDetailPage.vue')
const CoachStatistiquesPage = () => import('@/modules/coach/pages/CoachStatistiquesPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginPage },

    // Pole Emploi
    { path: '/dashboard', name: 'dashboard', component: PoleEmploiDashboardPage, meta: { roles: ['POLE_EMPLOI', 'ADMIN'] } },
    { path: '/validations', name: 'validations', component: ValidationsPage, meta: { roles: ['POLE_EMPLOI', 'ADMIN'] } },
    { path: '/apprenants', name: 'apprenants', component: ApprenantsListPage, meta: { roles: ['POLE_EMPLOI', 'ADMIN'] } },
    { path: '/apprenants/:id', name: 'apprenant-detail', component: ApprenantDetailPage, meta: { roles: ['POLE_EMPLOI', 'ADMIN'] } },
    { path: '/statistiques', name: 'statistiques', component: PoleEmploiStatistiquesPage, meta: { roles: ['POLE_EMPLOI', 'ADMIN'] } },
    { path: '/entreprises', name: 'entreprises', component: EntreprisesPage, meta: { roles: ['POLE_EMPLOI', 'ADMIN'] } },
    { path: '/import-apprenants', name: 'import-apprenants', component: ImportApprenantsPage, meta: { roles: ['POLE_EMPLOI', 'ADMIN'] } },
    {
      path: '/parametres',
      name: 'parametres',
      component: PlaceholderBackofficePage,
      props: { title: 'Paramètres', activeMenu: 'dashboard' },
      meta: { roles: ['POLE_EMPLOI', 'ADMIN'] },
    },

    // Apprenant (UI flow)
    { path: '/dashboard-apprenant', name: 'dashboard-apprenant', component: ApprenantDashboardPage, meta: { roles: ['APPRENANT'] } },
    { path: '/situations', name: 'apprenant-situations', component: ApprenantSituationsPage, meta: { roles: ['APPRENANT'] } },
    {
      path: '/situations/nouvelle',
      name: 'apprenant-situation-new',
      component: ApprenantNewSituationPage,
      meta: { roles: ['APPRENANT'] },
    },

    {
      path: '/situations/:id',
      name: 'apprenant-situation-detail',
      component: ApprenantSituationDetailPage,
      meta: { roles: ['APPRENANT'] },
    },
    {
      path: '/documents',
      name: 'apprenant-documents',
      component: ApprenantDocumentsPage,
      meta: { roles: ['APPRENANT'] },
    },
    {
      path: '/profil',
      name: 'apprenant-profil',
      component: ApprenantProfilPage,
      meta: { roles: ['APPRENANT'] },
    },

    // Manager (UI flow)
    { path: '/dashboard-manager', name: 'dashboard-manager', component: ManagerDashboardPage, meta: { roles: ['MANAGER', 'ADMIN'] } },
    { path: '/manager/apprenants', name: 'manager-apprenants', component: ManagerApprenantsPage, meta: { roles: ['MANAGER', 'ADMIN'] } },
    { path: '/manager/apprenants/:id', name: 'manager-apprenant-detail', component: ManagerApprenantDetailPage, meta: { roles: ['MANAGER', 'ADMIN'] } },
    { path: '/manager/coaches', name: 'manager-coaches', component: ManagerCoachesPage, meta: { roles: ['MANAGER', 'ADMIN'] } },
    { path: '/manager/promotions', name: 'manager-promotions', component: ManagerPromotionsPage, meta: { roles: ['MANAGER', 'ADMIN'] } },
    { path: '/manager/referentiels', name: 'manager-referentiels', component: ManagerReferentielsPage, meta: { roles: ['MANAGER', 'ADMIN'] } },
    { path: '/manager/statistiques', name: 'manager-statistiques', component: ManagerStatistiquesPage, meta: { roles: ['MANAGER', 'ADMIN'] } },

    // Coach (UI flow)
    { path: '/coach/dashboard', name: 'coach-dashboard', component: CoachDashboardPage, meta: { roles: ['COACH', 'ADMIN'] } },
    { path: '/coach/apprenants', name: 'coach-apprenants', component: CoachApprenantsPage, meta: { roles: ['COACH', 'ADMIN'] } },
    { path: '/coach/apprenants/:id', name: 'coach-apprenant-detail', component: CoachApprenantDetailPage, meta: { roles: ['COACH', 'ADMIN'] } },
    { path: '/coach/statistiques', name: 'coach-statistiques', component: CoachStatistiquesPage, meta: { roles: ['COACH', 'ADMIN'] } },

    { path: '/', redirect: '/login' },
  ],
})

router.beforeEach((to) => {
  const isAuthenticated = Boolean(tokenStorage.getAccessToken())
  const isLoginPage = to.path === '/login'
  const role = getAuthenticatedRole()

  if (!isAuthenticated && !isLoginPage) {
    return { path: '/login' }
  }

  if (isAuthenticated && isLoginPage) {
    return { path: getDefaultPathByRole(role) }
  }

  const allowedRoles = Array.isArray(to.meta.roles)
    ? (to.meta.roles as string[])
    : null

  if (isAuthenticated && allowedRoles && role && !allowedRoles.includes(role)) {
    return { path: getDefaultPathByRole(role) }
  }

  return true
})

export default router
