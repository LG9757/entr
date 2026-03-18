export type ModuleSummary = {
  number: number
  title: string
  path: string
  lessons: number
  duration: string
}

export const moduleSummaries: ModuleSummary[] = [
  { number: 1, title: 'Introduction to AI in Finance', path: '/course/module-1', lessons: 10, duration: '2 hr 5 min' },
  { number: 2, title: 'Detecting AI-Generated Reports', path: '/course/module-2', lessons: 8, duration: '1 hr 29 min' },
  { number: 3, title: 'AI in Market Analysis', path: '/course/module-3', lessons: 7, duration: '1 hr 18 min' },
  { number: 4, title: 'Financial News Authentication', path: '/course/module-4', lessons: 7, duration: '1 hr 12 min' },
  { number: 5, title: 'Regulatory Compliance', path: '/course/module-5', lessons: 8, duration: '1 hr 25 min' },
  { number: 6, title: 'Case Studies and Applications', path: '/course/module-6', lessons: 7, duration: '1 hr 35 min' },
]

export function getModulePassKey(moduleNumber: number) {
  return `course:module:${moduleNumber}:passed`
}

export function getModulePassed(moduleNumber: number) {
  if (typeof window === 'undefined') return false

  try {
    return window.localStorage.getItem(getModulePassKey(moduleNumber)) === 'true'
  } catch {
    return false
  }
}

export function isModuleUnlocked(moduleNumber: number) {
  if (moduleNumber <= 1) return true
  return getModulePassed(moduleNumber - 1)
}

export function getCompletedModuleCount() {
  return moduleSummaries.filter(module => getModulePassed(module.number)).length
}

export function getUnlockedModuleCount() {
  return moduleSummaries.filter(module => isModuleUnlocked(module.number)).length
}

export function getNextUnlockedModule() {
  return moduleSummaries.find(module => isModuleUnlocked(module.number) && !getModulePassed(module.number)) ?? moduleSummaries[0]
}
