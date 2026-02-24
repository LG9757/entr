import { useState } from 'react'
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
  totalLessons: number
  completedCount: number
  lessons: Lesson[]
  backPath: string
}

export default function ModulePage({
  moduleTitle,
  moduleNumber,
  totalLessons,
  completedCount,
  lessons,
  backPath,
}: ModulePageProps) {
  const navigate = useNavigate()
  const [activeLessonId, setActiveLessonId] = useState<number>(lessons[0]?.id ?? 1)

  const activeLesson = lessons.find((l) => l.id === activeLessonId) ?? lessons[0]

  return (
    <div className="lesson-page-root">
      <header className="lesson-header">
        <button
          className="back-link"
          onClick={() => navigate(backPath)}
        >
          ← Back to Course
        </button>

        <div className="lesson-header-middle">
          <div className="lesson-header-title">
            Module {moduleNumber}: {moduleTitle}
          </div>
          <div className="lesson-header-sub">
            Lesson {activeLesson?.id} of {totalLessons}
          </div>
        </div>

        <div className="lesson-header-progress">
          {completedCount}/{totalLessons} completed
        </div>
      </header>

      <main className="lesson-layout">
        {/* Sidebar */}
        <aside className="lesson-sidebar">
          <h2 className="sidebar-title">Lessons</h2>
          <ul className="lesson-list">
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <button
                  className={
                    'lesson-list-item ' +
                    (lesson.id === activeLessonId ? 'active ' : '') +
                    (lesson.status === 'locked' ? 'locked' : '')
                  }
                  onClick={() => {
                    if (lesson.status !== 'locked') {
                      setActiveLessonId(lesson.id)
                    }
                  }}
                >
                  <div className="lesson-list-icon">
                    {lesson.status === 'completed'
                      ? '✓'
                      : lesson.status === 'locked'
                      ? '🔒'
                      : '○'}
                  </div>
                  <div className="lesson-list-text">
                    <div className="lesson-list-title">{lesson.title}</div>
                    <div className="lesson-list-meta">{lesson.duration}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Active lesson */}
        <section className="lesson-content">
          {activeLesson?.content}
        </section>
      </main>
    </div>
  )
}
