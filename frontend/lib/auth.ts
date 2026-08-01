export type AppRole = 'student' | 'teacher' | 'admin'

const TOKEN_STORAGE_KEY = 'token'
const USER_STORAGE_KEY = 'user'

export const DASHBOARD_BY_ROLE: Record<AppRole, string> = {
  student: '/student-dashboard',
  teacher: '/teacher-dashboard',
  admin: '/admin-dashboard',
}

export function getStoredToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null

  const rawUser = localStorage.getItem(USER_STORAGE_KEY)
  if (!rawUser) return null

  try {
    return JSON.parse(rawUser)
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY)
    return null
  }
}

export function getDecodedRole(token: string | null): AppRole | null {
  if (!token) return null

  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload))
    return decoded?.role
  } catch {
    return null
  }
}

export function getAuthRole() {
  const storedUser = getStoredUser()
  if (storedUser?.role) {
    return storedUser.role as AppRole
  }

  return getDecodedRole(getStoredToken())
}

export function getDashboardPathForRole(role?: string | null) {
  if (!role) return '/student-login'
  return DASHBOARD_BY_ROLE[role as AppRole] ?? '/student-login'
}

export function saveAuthSession(token: string, user: { role?: string }) {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_STORAGE_KEY)
  localStorage.removeItem(USER_STORAGE_KEY)
}

export function redirectToRoleDashboard(router: { replace: (path: string) => void }) {
  const route = getDashboardPathForRole(getAuthRole())
  router.replace(route)
}

export function redirectToLoginIfUnauthenticated(router: { replace: (path: string) => void }) {
  const token = getStoredToken()
  const role = getAuthRole()

  if (!token || !role) {
    clearAuthSession()
    router.replace('/student-login')
    return false
  }

  return true
}
