const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4010'
const authTokenKey = 'auth:token'
const authUserKey = 'auth:user'

export type AuthUser = {
  id: string
  name: string
  email: string
}

export type CourseProgressResponse = {
  courseSlug: string
  completedLessons: number
  totalLessons: number
  passedModules: number
  totalModules: number
  lessonProgress: Array<{
    moduleNumber: number
    lessonId: number
  }>
  modules: Array<{
    moduleNumber: number
    title: string
    lessons: number
    unlocked: boolean
    passed: boolean
  }>
}

function readJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore storage failures.
  }
}

export function getAuthToken() {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage.getItem(authTokenKey)
  } catch {
    return null
  }
}

export function getStoredUser() {
  return readJson<AuthUser>(authUserKey)
}

export function setAuthSession(token: string, user: AuthUser) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(authTokenKey, token)
    writeJson(authUserKey, user)
  } catch {
    // Ignore storage failures.
  }
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.removeItem(authTokenKey)
    window.localStorage.removeItem(authUserKey)
  } catch {
    // Ignore storage failures.
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers)
  headers.set('Content-Type', 'application/json')

  const token = getAuthToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers,
  })

  const raw = await response.text()
  let payload: (T & { error?: string }) | null = null

  if (raw) {
    try {
      payload = JSON.parse(raw) as T & { error?: string }
    } catch {
      throw new Error(`Backend returned a non-JSON response from ${apiBaseUrl}${path}. Check that the API server is running on the expected port.`)
    }
  }

  if (!response.ok) {
    throw new Error(payload?.error ?? `Request failed with status ${response.status}`)
  }

  if (!payload) {
    throw new Error(`Backend returned an empty response from ${apiBaseUrl}${path}. Check that the API server is running correctly.`)
  }

  return payload
}

export async function registerUser(input: { name: string; email: string; password: string }) {
  return apiFetch<{ token: string; user: AuthUser }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function loginUser(input: { email: string; password: string }) {
  return apiFetch<{ token: string; user: AuthUser }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function getMyProfile() {
  return apiFetch<{ user: AuthUser }>('/me')
}

export async function getCourseAccess(courseSlug: string) {
  return apiFetch<{ courseSlug: string; hasAccess: boolean }>(`/courses/${courseSlug}/access`)
}

export async function getCourseProgress(courseSlug: string) {
  return apiFetch<CourseProgressResponse>(`/courses/${courseSlug}/progress`)
}

export async function enrollInCourse(courseSlug: string) {
  return apiFetch<{ courseSlug: string; hasAccess: boolean }>(`/courses/${courseSlug}/enroll`, {
    method: 'POST',
    body: JSON.stringify({}),
  })
}

export async function completeLesson(courseSlug: string, moduleNumber: number, lessonId: number) {
  return apiFetch<CourseProgressResponse>(`/courses/${courseSlug}/lessons/${lessonId}/complete`, {
    method: 'POST',
    body: JSON.stringify({ moduleNumber }),
  })
}

export async function passModule(courseSlug: string, moduleNumber: number) {
  return apiFetch<CourseProgressResponse>(`/courses/${courseSlug}/modules/${moduleNumber}/pass`, {
    method: 'POST',
    body: JSON.stringify({}),
  })
}

export async function resetModuleProgress(courseSlug: string, moduleNumber: number) {
  return apiFetch<CourseProgressResponse>(`/courses/${courseSlug}/modules/${moduleNumber}/reset-progress`, {
    method: 'POST',
    body: JSON.stringify({}),
  })
}
