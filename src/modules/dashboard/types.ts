export type UserRole =
  | 'APPRENANT'
  | 'POLE_EMPLOI'
  | 'MANAGER'
  | 'COACH'
  | 'ADMIN'

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
