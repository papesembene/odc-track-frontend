import type { DashboardUser } from "@/modules/dashboard/types";

const ROLE_KEY = "role";
const USER_KEY = "odc_current_user";

export const sessionStorage = {
  getCurrentUser(): DashboardUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as DashboardUser;
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }

    const role = localStorage.getItem(ROLE_KEY);
    if (role === "APPRENANT" || role === "POLE_EMPLOI" || role === "MANAGER") {
      return {
        fullName: "Utilisateur",
        role,
        initials: "U",
      };
    }

    return null;
  },

  setCurrentUser(user: DashboardUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getRole() {
    return localStorage.getItem(ROLE_KEY);
  },

  setRole(role: DashboardUser["role"]) {
    localStorage.setItem(ROLE_KEY, role);
  },

  clearCurrentUser() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ROLE_KEY);
  },
};
