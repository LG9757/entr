import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import AppHeader from './AppHeader'

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
}

const storageKey = (moduleNumber: number) => `course:module:${moduleNumber}:completedIds`

const lessonTypeLabel: Record<LessonType, string> = {
  video: 'Video lesson',
  article: 'Reading',
  quiz: 'Knowledge check',
}

export default function ModulePage({ moduleTitle, moduleNumber, lessons, backPath }: ModulePageProps) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  const defaultCompleted = useMemo(
    () => lessons.filter(lesson => lesson.status === 'completed').map(lesson => lesson.id),
    [lessons]
  )

  const [completedIds, setCompletedIds] = useState<number[]>(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(moduleNumber))
      if (!raw) return defaultCompleted
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : defaultCompleted
    } catch {
      return defaultCompleted
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey(moduleNumber), JSON.stringify(completedIds))
    } catch {
      // Ignore storage failures such as private mode restrictions.
    }
  }, [completedIds, moduleNumber])

  const totalLessons = lessons.length
  const activeLesson = lessons[activeIndex]
  const completedCount = completedIds.length
  const isLast = activeIndex === lessons.length - 1
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100)

  const isAccessible = (index: number) => {
    if (index <= 0) return true
    const lessonId = lessons[index]?.id
    const previousLessonId = lessons[index - 1]?.id
    return completedIds.includes(lessonId) || completedIds.includes(previousLessonId)
  }

  const goTo = (index: number) => {
    if (index < 0 || index >= lessons.length) return
    if (!isAccessible(index)) return
    setActiveIndex(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const markCompletedAndNext = () => {
    setCompletedIds(previous => (previous.includes(activeLesson.id) ? previous : [...previous, activeLesson.id]))
    if (!isLast) goTo(activeIndex + 1)
  }

  const passedKey = `course:module:${moduleNumber}:passed`
  const [modulePassed, setModulePassed] = useState(() => {
    try {
      return window.localStorage.getItem(passedKey) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      setModulePassed(window.localStorage.getItem(passedKey) === 'true')
    } catch {
      setModulePassed(false)
    }
  }, [activeIndex, moduleNumber, passedKey])

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
          </div>

          <h2 className="sidebar-title">Lessons</h2>

          <ul className="lesson-list">
            {lessons.map((lesson, index) => {
              const locked = !isAccessible(index)
              const completed = completedIds.includes(lesson.id)

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
                      <span />
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

            {!isLast && (
              <button type="button" className="nav-btn nav-btn-primary" onClick={markCompletedAndNext}>
                Next
              </button>
            )}

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
