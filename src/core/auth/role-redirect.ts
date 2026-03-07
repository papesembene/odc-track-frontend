const roleRedirectMap: Record<string, string> = {
  APPRENANT: '/dashboard-apprenant',
  POLE_EMPLOI: '/dashboard',
  COACH: '/coach/dashboard',
  MANAGER: '/dashboard-manager',
  ADMIN: '/dashboard',
}

export const getDefaultPathByRole = (role: string | null | undefined): string => {
  if (!role) return '/dashboard'
  return roleRedirectMap[role] ?? '/dashboard'
}
