import { computed, ref } from 'vue'
import { tokenStorage } from './token-storage'
import { api } from '../api/axios'

type JwtPayload = {
  sub?: string
  email?: string
  role?: string
  nom?: string
  prenom?: string
}

type CurrentUser = {
  id: string | null
  email: string | null
  role: string | null
  nom: string | null
  prenom: string | null
  updatedAt: string | null
  passwordChangedAt: string | null
}

// State partagé entre pages pour éviter de refaire les mêmes requêtes partout.
const currentUser = ref<CurrentUser>({
  id: null,
  email: null,
  role: null,
  nom: null,
  prenom: null,
  updatedAt: null,
passwordChangedAt: null,

})
const isLoadingUser = ref(false)
let hasHydratedFromApi = false

const decodeBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=')
  return atob(padded)
}

const parseJwt = (token: string): JwtPayload | null => {
  try {
    const payloadBase64 = token.split('.')[1]
    if (!payloadBase64) return null
    const json = decodeBase64Url(payloadBase64)
    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

const applyJwtPayload = (payload: JwtPayload | null) => {
  currentUser.value = {
    id: payload?.sub ?? null,
    email: payload?.email ?? null,
    role: payload?.role ?? null,
    nom: payload?.nom ?? null,
    prenom: payload?.prenom ?? null,
    updatedAt: null,
    passwordChangedAt: null,

  }
}

const hydrateCurrentUser = async (force = false) => {
  const token = tokenStorage.getAccessToken()
  if (!token) {
    hasHydratedFromApi = false
    applyJwtPayload(null)
    return
  }

  const payload = parseJwt(token)
  applyJwtPayload(payload)

  if (!force && hasHydratedFromApi) return
  if (payload?.role !== 'APPRENANT') {
    hasHydratedFromApi = true
    return
  }

  isLoadingUser.value = true
  try {
    // Récupère les vraies infos profil pour nom/prénom réels.
    const { data } = await api.get('/apprenants/me')
    const me = data?.data
    currentUser.value = {
      id: me?.user?.id ?? currentUser.value.id,
      email: me?.user?.email ?? currentUser.value.email,
      role: me?.user?.role ?? currentUser.value.role,
      nom: me?.user?.nom ?? currentUser.value.nom,
      prenom: me?.user?.prenom ?? currentUser.value.prenom,
      updatedAt: me?.user?.updatedAt ?? currentUser.value.updatedAt,
      passwordChangedAt: me?.user?.passwordChangedAt ?? currentUser.value.passwordChangedAt,

    }
  } catch {
    // On garde le fallback JWT si l'API ne répond pas.
  } finally {
    hasHydratedFromApi = true
    isLoadingUser.value = false
  }
}

export const useCurrentUser = () => {
  const payload = computed(() => {
    const token = tokenStorage.getAccessToken()
    if (!token) return null
    return parseJwt(token)
  })

  const role = computed(() => currentUser.value.role ?? payload.value?.role ?? null)
  const userId = computed(() => currentUser.value.id ?? payload.value?.sub ?? null)
  const user = computed(() => currentUser.value)

  const userName = computed(() => {
    const prenom = user.value.prenom?.trim()
    const nom = user.value.nom?.trim()
    if (prenom || nom) return [prenom, nom].filter(Boolean).join(' ')

    const email = user.value.email ?? payload.value?.email
    if (email) return email.split('@')[0]

    return 'Utilisateur'
  })

  return {
    payload,
    role,
    userId,
    user,
    userName,
    isLoadingUser,
    hydrateCurrentUser,
  }
}
