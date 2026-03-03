import {api} from '../../../core/api/axios'

export type ChangePasswordPayload = {
  currentPassword: string
  newPassword: string
}

export async function changePassword(payload: ChangePasswordPayload) {
  const { data } = await api.patch('/auth/change-password', payload)
  return data
}
