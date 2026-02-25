import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Remove: import '.. /App.css' - no longer needed

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

export default function ModulePage({ moduleTitle, moduleNumber, lessons, backPath }: ModulePageProps) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [completedIds, setCompletedIds] = useState<number[]>(
    lessons.filter(l => l.status === 'completed').map(l => l.id)
  )

  const totalLessons = lessons.length
  const activeLesson = lessons[activeIndex]
  const completedCount = completedIds.length
  const isLast = activeIndex === lessons.length - 1

  const goTo = (index: number) => {
    if (index < 0 || index >= lessons.length) return
    if (lessons[index].status === 'locked') return
    setActiveIndex(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const markCompletedAndNext = () => {
    setCompletedIds(prev => 
      prev.includes(activeLesson.id) 
        ? prev 
        : [...prev, activeLesson.id]
    )
    if (!isLast) {
      goTo(activeIndex + 1)
    }
  }

  return (
    <div className="lesson-page-root"> {/* Keep other classes if CSS loads */}
      <header className="lesson-header">
        <button 
          className="back-link" 
          onClick={() => navigate(backPath)}
          style={{
            background: 'none',
            border: 'none',
            color: '#e5e7eb',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          Back to Course
        </button>
        <div className="lesson-header-middle">
          <div className="lesson-header-title">
            Module {moduleNumber}: {moduleTitle}
          </div>
          <div className="lesson-header-sub">
            Lesson {activeLesson.id} of {totalLessons}
          </div>
          <div className="lesson-header-progress">
            {completedCount}/{totalLessons} completed
          </div>
        </div>
        {/* Empty div for flex spacing */}
        <div />
      </header>

      <main className="lesson-layout">
        <aside className="lesson-sidebar">
          <h2 className="sidebar-title">Lessons</h2>
          <ul className="lesson-list">
            {lessons.map((lesson, index) => {
              const locked = lesson.status === 'locked'
              const completed = completedIds.includes(lesson.id)
              return (
                <li key={lesson.id}>
                  <button 
                    className={`lesson-list-item ${index === activeIndex ? 'active' : ''} ${locked ? 'locked' : ''}`}
                    onClick={() => !locked && goTo(index)}
                    disabled={locked}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.7rem',
                      marginBottom: '0.5rem',
                      borderRadius: '0.75rem',
                      background: index === activeIndex ? '#e0edff' : 'transparent',
                      border: 'none',
                      cursor: locked ? 'default' : 'pointer',
                      color: index === activeIndex ? '#111827' : '#e5e7eb',
                      opacity: locked ? 0.6 : 1,
                      textAlign: 'left'
                    }}
                  >
                    <div className="lesson-list-icon" style={{width: '24px'}}>
                      {locked ? '🔒' : completed ? '✅' : '○'}
                    </div>
                    <div className="lesson-list-text">
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
          <div className="lesson-body">
            {activeLesson.content}
          </div>

          {/* INLINE STYLED NAV BUTTONS - MATCHES YOUR DESIRED DESIGN */}
          <div 
            className="lesson-nav"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '1.5rem',
              marginTop: '2rem',
              borderTop: '1px solid #e5e7eb'
            }}
          >
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '9999px',
                fontSize: '0.95rem',
                fontWeight: 600,
                border: 'none',
                cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
                backgroundColor: '#e5e7eb',
                color: '#374151',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                opacity: activeIndex === 0 ? 0.4 : 1,
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                if (activeIndex !== 0) {
                  e.currentTarget.style.backgroundColor = '#d1d5db'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb'
              }}
            >
              Previous
            </button>

            <button
              type="button"
              onClick={markCompletedAndNext}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '9999px',
                fontSize: '0.95rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: '#4f46e5',
                color: 'white',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(79, 70, 229, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4338ca'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(67, 56, 202, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4f46e5'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(79, 70, 229, 0.4)'
              }}
            >
              {isLast ? 'Mark Complete' : 'Next'}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
