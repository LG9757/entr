import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

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

export default function ModulePage({ moduleTitle, moduleNumber, lessons, backPath }: ModulePageProps) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  // Default progress: anything that ships as "completed" in the lesson data.
  const defaultCompleted = useMemo(
    () => lessons.filter(l => l.status === 'completed').map(l => l.id),
    [lessons]
  )

  // Load saved progress once (lazy init). This avoids reading localStorage on every render. [web:34]
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

  // Keep storage in sync when progress changes. [web:34]
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey(moduleNumber), JSON.stringify(completedIds))
    } catch {
      // ignore write errors (private mode, quota, etc.)
    }
  }, [completedIds, moduleNumber])

  const totalLessons = lessons.length
  const activeLesson = lessons[activeIndex]
  const completedCount = completedIds.length
  const isLast = activeIndex === lessons.length - 1

  // Sequential unlock:
  // - lesson 0 always accessible
  // - lesson i accessible if previous lesson is completed, or if it's itself completed already
  const isAccessible = (index: number) => {
    if (index <= 0) return true
    const lessonId = lessons[index]?.id
    const prevLessonId = lessons[index - 1]?.id
    return completedIds.includes(lessonId) || completedIds.includes(prevLessonId)
  }

  const goTo = (index: number) => {
    if (index < 0 || index >= lessons.length) return
    if (!isAccessible(index)) return
    setActiveIndex(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const markCompletedAndNext = () => {
    setCompletedIds(prev => (prev.includes(activeLesson.id) ? prev : [...prev, activeLesson.id]))
    if (!isLast) goTo(activeIndex + 1)
  }

  return (
    <div className="lesson-page-root">
      <header className="lesson-header">
        <button className="back-link" onClick={() => navigate(backPath)}>
          Back to Course
        </button>

        <div className="lesson-header-middle">
          <div className="lesson-header-title">
            Module {moduleNumber}: {moduleTitle}
          </div>
          <div className="lesson-header-sub">
            Lesson {activeLesson.id} of {totalLessons}
          </div>
        </div>

        <div className="lesson-header-progress">
          {completedCount}/{totalLessons} completed
        </div>
      </header>

      <main className="lesson-layout">
        <aside className="lesson-sidebar">
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
                    ].join(' ')}
                    onClick={() => {
                      if (!locked) goTo(index)
                    }}
                    disabled={locked}
                  >
                    <div className="lesson-list-icon">{locked ? '🔒' : completed ? '✅' : '○'}</div>

                    <div>
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
          <div className="lesson-body">{activeLesson.content}</div>

          <div className="lesson-nav">
            <button
              type="button"
              className="nav-btn nav-btn-secondary"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
            >
              Previous
            </button>

            <button type="button" className="nav-btn nav-btn-primary" onClick={markCompletedAndNext}>
              {isLast ? 'Mark Complete' : 'Next'}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
