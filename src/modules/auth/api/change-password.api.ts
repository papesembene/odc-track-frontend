import {api} from '../../../core/api/axios'
import { sessionStorage } from '../../../core/auth/session-storage'

export type ChangePasswordPayload = {
  ancienPassword: string
  newPassword: string
}

export async function changePassword(payload: ChangePasswordPayload) {
  const { data } = await api.post('/auth/change-password', payload)
  sessionStorage.setMustChangePassword(false)
  return data
}
