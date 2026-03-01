export type UserRole = 'APPRENANT' | 'POLE_EMPLOI' | 'MANAGER'

export interface DashboardUser {
  fullName: string
  role: UserRole
  initials: string
}

export interface DashboardMenuItem {
  key: string
  label: string
  to: string
}
