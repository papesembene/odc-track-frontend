import type { DashboardUser } from '@/modules/dashboard/types'

const USER_KEY = 'odc_current_user'

export const sessionStorage = {
  getCurrentUser(): DashboardUser | null {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) {
      return null
    }

    try {
      return JSON.parse(raw) as DashboardUser
    } catch {
      return null
    }
  },

  setCurrentUser(user: DashboardUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  clearCurrentUser() {
    localStorage.removeItem(USER_KEY)
  },
}
