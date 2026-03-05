/**
 * Simple SweetAlert2 wrapper for confirm dialogs
 * Install SweetAlert2: npm install sweetalert2
 *
 * Usage:
 * import { confirm } from '@/core/ui/sweet-alert'
 * const result = await confirm('Êtes-vous sûr?')
 */

import Swal from "sweetalert2";

/**
 * Show a confirmation dialog
 * @param text - The message to display
 * @param title - Optional title
 * @returns Promise<boolean> - true if confirmed, false if cancelled
 */
export async function confirm(
  text: string,
  title: string = "Êtes-vous sûr ?",
): Promise<boolean> {
  try {
    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, confirmer",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#f97316", // orange-500
      cancelButtonColor: "#64748b", // slate-500
      reverseButtons: true,
    });
    return result.isConfirmed;
  } catch {
    // Fallback to native confirm if SweetAlert2 is not installed
    return nativeConfirm(text);
  }
}

/**
 * Show a success toast/message
 */
export function success(message: string, title: string = "Succès") {
  Swal.fire({
    title,
    text: message,
    icon: "success",
    confirmButtonColor: "#f97316",
  }).catch(() => {
    // Silent fail
  });
}

/**
 * Show an error toast/message
 */
export function error(message: string, title: string = "Erreur") {
  Swal.fire({
    title,
    text: message,
    icon: "error",
    confirmButtonColor: "#f97316",
  }).catch(() => {
    // Silent fail
  });
}

/**
 * Native browser confirm fallback
 */
function nativeConfirm(text: string): boolean {
  return window.confirm(text);
}
