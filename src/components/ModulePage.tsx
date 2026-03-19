import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import AppHeader from './AppHeader'
import { completeLesson, getCourseProgress, resetModuleProgress } from '../lib/api'

export type LessonStatus = 'completed' | 'current' | 'locked'
export type LessonType = 'video' | 'article' | 'quiz'

export type Lesson = {
  id: number
  title: string
  duration: string
  type: LessonType
  status: LessonStatus
  content: React.ReactNode
}

type ModulePageProps = {
  moduleTitle: string
  moduleNumber: number
  lessons: Lesson[]
  backPath: string
  courseSlug: string
}

const storageKey = (moduleNumber: number) => `course:module:${moduleNumber}:completedIds`

const lessonTypeLabel: Record<LessonType, string> = {
  video: 'Video lesson',
  article: 'Reading',
  quiz: 'Knowledge check',
}

export default function ModulePage({ moduleTitle, moduleNumber, lessons, backPath, courseSlug }: ModulePageProps) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [completedIds, setCompletedIds] = useState<number[]>([])
  const [modulePassed, setModulePassed] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const finalLessonId = lessons[lessons.length - 1]?.id
  const totalLessons = lessons.length
  const activeLesson = lessons[activeIndex]
  const isLast = activeIndex === lessons.length - 1

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(moduleNumber))
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        setCompletedIds(parsed.filter((value): value is number => typeof value === 'number'))
      }
    } catch {
      setCompletedIds([])
    }
  }, [moduleNumber])

  useEffect(() => {
    let cancelled = false

    void getCourseProgress(courseSlug)
      .then(progress => {
        if (cancelled) return

        const backendLessonIds = progress.lessonProgress
          .filter(entry => entry.moduleNumber === moduleNumber)
          .map(entry => entry.lessonId)

        const passed = progress.modules.find(module => module.moduleNumber === moduleNumber)?.passed ?? false
        const localLessonIds = (() => {
          try {
            const raw = window.localStorage.getItem(storageKey(moduleNumber))
            const parsed = raw ? JSON.parse(raw) : []
            return Array.isArray(parsed) ? parsed.filter((value): value is number => typeof value === 'number') : []
          } catch {
            return []
          }
        })()

        const mergedLessonIds = Array.from(new Set([...localLessonIds, ...backendLessonIds]))

        setCompletedIds(passed ? lessons.map(lesson => lesson.id) : mergedLessonIds)
        setModulePassed(passed)

        if (!passed) {
          const backendLessonSet = new Set(backendLessonIds)
          mergedLessonIds
            .filter(lessonId => !backendLessonSet.has(lessonId))
            .forEach(lessonId => {
              void completeLesson(courseSlug, moduleNumber, lessonId).catch(() => {
                // Ignore background re-sync failures.
              })
            })
        }
      })
      .catch(() => {
        try {
          setModulePassed(window.localStorage.getItem(`course:module:${moduleNumber}:passed`) === 'true')
        } catch {
          setModulePassed(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [courseSlug, lessons, moduleNumber])

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey(moduleNumber), JSON.stringify(completedIds))
    } catch {
      // Ignore storage failures.
    }
  }, [completedIds, moduleNumber])

  useEffect(() => {
    try {
      window.localStorage.setItem(`course:module:${moduleNumber}:passed`, modulePassed ? 'true' : 'false')
    } catch {
      // Ignore storage failures.
    }
  }, [moduleNumber, modulePassed])

  const visibleCompletedIds = useMemo(() => {
    if (!finalLessonId || modulePassed) return completedIds
    return completedIds.filter(id => id !== finalLessonId)
  }, [completedIds, finalLessonId, modulePassed])

  const completedCount = visibleCompletedIds.length
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100)
  const activeLessonCompleted = visibleCompletedIds.includes(activeLesson.id)

  const isAccessible = (index: number) => {
    if (index <= 0) return true
    const lessonId = lessons[index]?.id
    const previousLessonId = lessons[index - 1]?.id
    return visibleCompletedIds.includes(lessonId) || visibleCompletedIds.includes(previousLessonId)
  }

  const goTo = (index: number) => {
    if (index < 0 || index >= lessons.length) return
    if (!isAccessible(index)) return
    setActiveIndex(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const syncCompletedLesson = (lessonId: number) => {
    setCompletedIds(previous => (previous.includes(lessonId) ? previous : [...previous, lessonId]))
    void completeLesson(courseSlug, moduleNumber, lessonId).catch(() => {
      // Keep local progress if backend sync is unavailable.
    })
  }

  const markCompleted = () => {
    if (isLast && !modulePassed) return
    syncCompletedLesson(activeLesson.id)
  }

  const markCompletedAndNext = () => {
    syncCompletedLesson(activeLesson.id)
    if (!isLast) goTo(activeIndex + 1)
  }

  const handleResetProgress = async () => {
    setIsResetting(true)

    try {
      await resetModuleProgress(courseSlug, moduleNumber)
    } catch {
      // Ignore backend reset failures and still clear local state for development.
    } finally {
      setCompletedIds([])
      setModulePassed(false)
      setActiveIndex(0)
      try {
        window.localStorage.removeItem(storageKey(moduleNumber))
        window.localStorage.removeItem(`course:module:${moduleNumber}:passed`)
      } catch {
        // Ignore storage failures.
      }
      setIsResetting(false)
    }
  }

  return (
    <div className="lesson-page-root">
      <AppHeader
        title={`Module ${moduleNumber}: ${moduleTitle}`}
        subtitle={`Lesson ${activeIndex + 1} of ${totalLessons}`}
        backLabel="Back to Course"
        onBack={() => navigate(backPath)}
        rightSlot={
          <div className="lesson-header-progress">
            <span>{completedCount}/{totalLessons} completed</span>
            <div className="lesson-header-progress-bar" aria-hidden="true">
              <div className="lesson-header-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        }
      />

      <main className="lesson-layout">
        <aside className="lesson-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-title">Module overview</div>
            <div className="sidebar-module-title">{moduleTitle}</div>
            <p className="sidebar-copy">
              Work through each lesson in order, then complete the final check to finish the module.
            </p>
            <div className="sidebar-stat-row">
              <div>
                <span className="sidebar-stat-value">{totalLessons}</span>
                <span className="sidebar-stat-label">lessons</span>
              </div>
              <div>
                <span className="sidebar-stat-value">{progressPercent}%</span>
                <span className="sidebar-stat-label">complete</span>
              </div>
            </div>

            <button type="button" className="dev-reset-button" onClick={handleResetProgress} disabled={isResetting}>
              {isResetting ? 'Resetting progress...' : 'Dev: Reset module progress'}
            </button>
          </div>

          <h2 className="sidebar-title">Lessons</h2>

          <ul className="lesson-list">
            {lessons.map((lesson, index) => {
              const locked = !isAccessible(index)
              const completed = visibleCompletedIds.includes(lesson.id)

              return (
                <li key={lesson.id}>
                  <button
                    type="button"
                    className={[
                      'lesson-list-item',
                      index === activeIndex ? 'active' : '',
                      locked ? 'locked' : '',
                      completed ? 'completed' : '',
                    ].join(' ')}
                    onClick={() => {
                      if (!locked) goTo(index)
                    }}
                    disabled={locked}
                  >
                    <div className={['lesson-list-icon', locked ? 'locked' : completed ? 'completed' : 'open'].join(' ')}>
                      <span>{completed ? '✓' : ''}</span>
                    </div>

                    <div className="lesson-list-copy">
                      <div className="lesson-list-topline">
                        <span className="lesson-list-step">Lesson {index + 1}</span>
                        <span className="lesson-list-type">{lessonTypeLabel[lesson.type]}</span>
                      </div>
                      <div className="lesson-list-title">{lesson.title}</div>
                      <div className="lesson-list-meta">{lesson.duration}</div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <section className="lesson-content">
          <div className="lesson-content-shell">
            <div className="lesson-content-hero">
              <div>
                <div className="lesson-content-kicker">{lessonTypeLabel[activeLesson.type]}</div>
                <h1 className="lesson-content-title">{activeLesson.title}</h1>
              </div>
              <div className="lesson-content-chip">{activeLesson.duration}</div>
            </div>

            <div className="lesson-body">{activeLesson.content}</div>
          </div>

          <div className="lesson-nav">
            <button
              type="button"
              className="nav-btn nav-btn-secondary"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
            >
              Previous
            </button>

            <div className="lesson-nav-actions">
              <button
                type="button"
                className={['nav-btn', activeLessonCompleted ? 'nav-btn-done' : 'nav-btn-primary'].join(' ')}
                onClick={markCompleted}
                disabled={activeLessonCompleted || (isLast && !modulePassed)}
              >
                {activeLessonCompleted
                  ? 'Marked as done'
                  : isLast && !modulePassed
                    ? 'Pass assessment to finish'
                    : 'Mark as done'}
              </button>

              {!isLast && (
                <button type="button" className="nav-btn nav-btn-primary" onClick={markCompletedAndNext}>
                  Next
                </button>
              )}
            </div>

            {isLast && modulePassed && (
              <button type="button" className="nav-btn nav-btn-primary" onClick={() => navigate('/course')}>
                Finish module
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
