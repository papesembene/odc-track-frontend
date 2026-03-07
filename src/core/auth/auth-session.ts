import { sessionStorage } from "@/core/auth/session-storage";
import { tokenStorage } from "@/core/auth/token-storage";
import type { DashboardUser, UserRole } from "@/modules/dashboard/types";

type LoginUser = {
  nom?: string | null;
  prenom?: string | null;
  role?: string | null;
  email?: string | null;
};

function isUserRole(role: string | null | undefined): role is UserRole {
  return (
    role === "APPRENANT" ||
    role === "POLE_EMPLOI" ||
    role === "MANAGER" ||
    role === "COACH" ||
    role === "ADMIN"
  );
}

function toDashboardUser(user?: LoginUser | null): DashboardUser | null {
  const role = user?.role;
  if (!isUserRole(role)) {
    return null;
  }

  const fullName =
    [user?.prenom?.trim(), user?.nom?.trim()].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    "Utilisateur";

  return {
    fullName,
    role,
    initials: fullName[0]?.toUpperCase() ?? "U",
  };
}

export function persistAuthenticatedSession(accessToken: string, user?: LoginUser | null) {
  tokenStorage.setAccessToken(accessToken);

  const dashboardUser = toDashboardUser(user);
  if (dashboardUser) {
    sessionStorage.setRole(dashboardUser.role);
    sessionStorage.setCurrentUser(dashboardUser);
    return;
  }

  const roleFromToken = tokenStorage.getAccessTokenRole();
  if (isUserRole(roleFromToken)) {
    sessionStorage.setRole(roleFromToken);
  }
}

export function clearAuthenticatedSession() {
  tokenStorage.clear();
  sessionStorage.clearCurrentUser();
}

export function getAuthenticatedRole() {
  return tokenStorage.getAccessTokenRole() ?? sessionStorage.getRole();
}
