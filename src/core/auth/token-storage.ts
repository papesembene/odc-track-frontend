const ACCESS_TOKEN_KEY = 'odc_access_token'

type AccessTokenPayload = {
  sub?: string
  email?: string
  role?: string
  nom?: string
  prenom?: string
}

const decodeBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    '=',
  )
  return atob(padded)
}

const parseAccessToken = (token: string): AccessTokenPayload | null => {
  try {
    const payloadBase64 = token.split('.')[1]
    if (!payloadBase64) return null
    return JSON.parse(decodeBase64Url(payloadBase64)) as AccessTokenPayload
  } catch {
    return null
  }
}

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  setAccessToken: (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token),
  getAccessTokenPayload: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    return token ? parseAccessToken(token) : null
  },
  getAccessTokenRole: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    return token ? parseAccessToken(token)?.role ?? null : null
  },
  clear: () => localStorage.removeItem(ACCESS_TOKEN_KEY),
}
