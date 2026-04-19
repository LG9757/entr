const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4010'
const authTokenKey = 'auth:token'
const authUserKey = 'auth:user'
const devBypassToken = 'dev-bypass-token'
const financeCourseSlug = 'recognising-ai-content-in-finance'
const premiumCourseSlug = 'real-vs-ai'
const financeModules = [
  { moduleNumber: 1, title: 'Introduction to AI in Finance', lessons: 10 },
  { moduleNumber: 2, title: 'Detecting AI-Generated Reports', lessons: 8 },
  { moduleNumber: 3, title: 'AI in Market Analysis', lessons: 7 },
  { moduleNumber: 4, title: 'Financial News Authentication', lessons: 7 },
  { moduleNumber: 5, title: 'Regulatory Compliance', lessons: 8 },
  { moduleNumber: 6, title: 'Case Studies and Applications', lessons: 7 },
] as const

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

type LessonProgressEntry = {
  moduleNumber: number
  lessonId: number
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

function getProgressScope() {
  return getStoredUser()?.id ?? 'guest'
}

function getModulePassKey(moduleNumber: number) {
  return `user:${getProgressScope()}:course:module:${moduleNumber}:passed`
}

function getModuleLessonKey(moduleNumber: number) {
  return `user:${getProgressScope()}:course:module:${moduleNumber}:completedIds`
}

function getPremiumAccessKey() {
  return `user:${getProgressScope()}:course:${premiumCourseSlug}:access`
}

function isDevBypassSession() {
  return import.meta.env.DEV && getAuthToken() === devBypassToken
}

export function startDevBypassSession() {
  const mockUser: AuthUser = {
    id: 'dev-user',
    name: 'Dev User',
    email: 'dev@example.com',
  }

  setAuthSession(devBypassToken, mockUser)
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

function readCompletedLessonIds(moduleNumber: number) {
  const raw = readJson<number[]>(getModuleLessonKey(moduleNumber))
  return Array.isArray(raw) ? raw.filter((value): value is number => typeof value === 'number') : []
}

function buildMockCourseProgress(courseSlug: string): CourseProgressResponse {
  if (courseSlug !== financeCourseSlug) {
    return {
      courseSlug,
      completedLessons: 0,
      totalLessons: 0,
      passedModules: 0,
      totalModules: 0,
      lessonProgress: [],
      modules: [],
    }
  }

  const passedModuleNumbers = new Set<number>()
  const lessonProgress: LessonProgressEntry[] = []

  financeModules.forEach(module => {
    const passed = readJson<string>(getModulePassKey(module.moduleNumber)) === 'true'
    if (passed) {
      passedModuleNumbers.add(module.moduleNumber)
    }

    const lessonIds = passed
      ? Array.from({ length: module.lessons }, (_, index) => index + 1)
      : readCompletedLessonIds(module.moduleNumber)

    lessonIds.forEach(lessonId => {
      lessonProgress.push({ moduleNumber: module.moduleNumber, lessonId })
    })
  })

  return {
    courseSlug,
    completedLessons: lessonProgress.length,
    totalLessons: financeModules.reduce((sum, module) => sum + module.lessons, 0),
    passedModules: passedModuleNumbers.size,
    totalModules: financeModules.length,
    lessonProgress,
    modules: financeModules.map(module => ({
      moduleNumber: module.moduleNumber,
      title: module.title,
      lessons: module.lessons,
      unlocked: module.moduleNumber === 1 || passedModuleNumbers.has(module.moduleNumber - 1),
      passed: passedModuleNumbers.has(module.moduleNumber),
    })),
  }
}

async function mockApiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const method = init?.method ?? 'GET'

  if (path === '/me') {
    return { user: getStoredUser() } as T
  }

  const accessMatch = path.match(/^\/courses\/([^/]+)\/access$/)
  if (method === 'GET' && accessMatch) {
    const courseSlug = accessMatch[1]
    const hasAccess = courseSlug === financeCourseSlug || window.localStorage.getItem(getPremiumAccessKey()) === 'true'
    return { courseSlug, hasAccess } as T
  }

  const enrollMatch = path.match(/^\/courses\/([^/]+)\/enroll$/)
  if (method === 'POST' && enrollMatch) {
    const courseSlug = enrollMatch[1]
    if (courseSlug === premiumCourseSlug) {
      window.localStorage.setItem(getPremiumAccessKey(), 'true')
    }
    return { courseSlug, hasAccess: true } as T
  }

  const unenrollMatch = path.match(/^\/courses\/([^/]+)\/unenroll$/)
  if (method === 'POST' && unenrollMatch) {
    const courseSlug = unenrollMatch[1]
    if (courseSlug === premiumCourseSlug) {
      window.localStorage.removeItem(getPremiumAccessKey())
    }
    return { courseSlug, hasAccess: false } as T
  }

  const progressMatch = path.match(/^\/courses\/([^/]+)\/progress$/)
  if (method === 'GET' && progressMatch) {
    return buildMockCourseProgress(progressMatch[1]) as T
  }

  const lessonMatch = path.match(/^\/courses\/([^/]+)\/lessons\/([^/]+)\/complete$/)
  if (method === 'POST' && lessonMatch) {
    const courseSlug = lessonMatch[1]
    const lessonId = Number(lessonMatch[2])
    const body = init?.body ? (JSON.parse(String(init.body)) as { moduleNumber?: number }) : {}
    const moduleNumber = Number(body.moduleNumber)

    if (courseSlug === financeCourseSlug && Number.isFinite(moduleNumber) && Number.isFinite(lessonId)) {
      const key = getModuleLessonKey(moduleNumber)
      const current = new Set(readCompletedLessonIds(moduleNumber))
      current.add(lessonId)
      writeJson(key, Array.from(current).sort((left, right) => left - right))
    }

    return buildMockCourseProgress(courseSlug) as T
  }

  const passMatch = path.match(/^\/courses\/([^/]+)\/modules\/([^/]+)\/pass$/)
  if (method === 'POST' && passMatch) {
    const courseSlug = passMatch[1]
    const moduleNumber = Number(passMatch[2])

    if (courseSlug === financeCourseSlug && Number.isFinite(moduleNumber)) {
      window.localStorage.setItem(getModulePassKey(moduleNumber), 'true')
      const module = financeModules.find(item => item.moduleNumber === moduleNumber)
      if (module) {
        writeJson(
          getModuleLessonKey(moduleNumber),
          Array.from({ length: module.lessons }, (_, index) => index + 1)
        )
      }
    }

    return buildMockCourseProgress(courseSlug) as T
  }

  const resetMatch = path.match(/^\/courses\/([^/]+)\/modules\/([^/]+)\/reset-progress$/)
  if (method === 'POST' && resetMatch) {
    const courseSlug = resetMatch[1]
    const moduleNumber = Number(resetMatch[2])

    if (courseSlug === financeCourseSlug && Number.isFinite(moduleNumber)) {
      financeModules
        .filter(module => module.moduleNumber >= moduleNumber)
        .forEach(module => {
          window.localStorage.removeItem(getModuleLessonKey(module.moduleNumber))
          window.localStorage.removeItem(getModulePassKey(module.moduleNumber))
        })
    }

    return buildMockCourseProgress(courseSlug) as T
  }

  throw new Error(`Dev bypass does not support ${method} ${path} yet.`)
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (isDevBypassSession()) {
    return mockApiFetch<T>(path, init)
  }

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

export async function unenrollFromCourse(courseSlug: string) {
  return apiFetch<{ courseSlug: string; hasAccess: boolean }>(`/courses/${courseSlug}/unenroll`, {
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
