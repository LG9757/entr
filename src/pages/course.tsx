import { useEffect, useMemo, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import { type CourseProgressResponse, getAuthToken, getCourseProgress, getStoredUser } from '../lib/api'
import {
  financeCourseSlug,
  getCompletedModuleCount,
  getNextUnlockedModule,
  getUnlockedModuleCount,
  getModulePassed,
  isModuleUnlocked,
  moduleSummaries,
} from '../lib/courseProgress'

function ProgressRing({
  value,
  label,
  accentClass,
}: {
  value: number
  label: string
  accentClass: string
}) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(false)
    const animationFrame = window.requestAnimationFrame(() => {
      setIsReady(true)
    })

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }
  }, [value])

  return (
    <div
      className={['progress-ring', accentClass, isReady ? 'is-ready' : ''].join(' ')}
      style={{ ['--ring-progress' as string]: String(isReady ? value : 0) }}
    >
      <div className="progress-ring-inner">
        <div className="progress-ring-value">{value}%</div>
        <div className="progress-ring-label">{label}</div>
      </div>
    </div>
  )
}

type ModuleViewState = {
  number: number
  title: string
  path: string
  lessons: number
  duration: string
  completedLessons: number
  progressPercent: number
  unlocked: boolean
  completed: boolean
}

export default function Course() {
  const navigate = useNavigate()
  const user = getStoredUser()
  const [serverProgress, setServerProgress] = useState<CourseProgressResponse | null>(null)
  const [serverModules, setServerModules] = useState<Record<number, { unlocked: boolean; passed: boolean }> | null>(null)

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/')
      return
    }

    let cancelled = false

    getCourseProgress(financeCourseSlug)
      .then(progress => {
        if (cancelled) return

        const nextState = Object.fromEntries(
          progress.modules.map(module => [
            module.moduleNumber,
            {
              unlocked: module.unlocked,
              passed: module.passed,
            },
          ])
        )

        setServerProgress(progress)
        setServerModules(nextState)
      })
      .catch(() => {
        if (!cancelled) {
          setServerProgress(null)
          setServerModules(null)
        }
      })

    return () => {
      cancelled = true
    }
  }, [navigate])

  const modules: ModuleViewState[] = useMemo(
    () => {
      const lessonCounts = new Map<number, number>()

      serverProgress?.lessonProgress.forEach(entry => {
        lessonCounts.set(entry.moduleNumber, (lessonCounts.get(entry.moduleNumber) ?? 0) + 1)
      })

      return moduleSummaries.map(module => {
        const completed = serverModules?.[module.number]?.passed ?? getModulePassed(module.number)
        const completedLessons = completed ? module.lessons : lessonCounts.get(module.number) ?? 0
        const progressPercent = module.lessons === 0 ? 0 : Math.round((completedLessons / module.lessons) * 100)

        return {
          ...module,
          completedLessons,
          progressPercent,
          unlocked: serverModules?.[module.number]?.unlocked ?? isModuleUnlocked(module.number),
          completed,
        }
      })
    },
    [serverModules, serverProgress]
  )

  const completedModules = modules.filter(module => module.completed).length || getCompletedModuleCount()
  const unlockedModules = modules.filter(module => module.unlocked).length || getUnlockedModuleCount()
  const nextModule = modules.find(module => module.unlocked && !module.completed) ?? getNextUnlockedModule()
  const totalLessons = moduleSummaries.reduce((sum, module) => sum + module.lessons, 0)
  const completedLessons = serverProgress
    ? modules.reduce((sum, module) => sum + module.completedLessons, 0)
    : modules.reduce((sum, module) => sum + (module.completed ? module.lessons : 0), 0)
  const completionPercent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100)
  const availableModules = modules.filter(module => module.unlocked)
  const lockedModules = modules.filter(module => !module.unlocked)
  const unlockedPercent = Math.round((unlockedModules / moduleSummaries.length) * 100)
  const lockedPercent = Math.round((lockedModules.length / moduleSummaries.length) * 100)

  return (
    <div className="course-page-root">
      <AppHeader
        title="Recognising AI Content in Finance"
        subtitle={
          user
            ? `${user.name}, this roadmap now reflects your tracked course progress and unlocked modules.`
            : 'A structured learning path for reviewing AI-assisted finance content safely and critically.'
        }
        backLabel="Back to Courses"
        onBack={() => navigate('/home')}
      />

      <header className="course-hero course-hero-clean">
        <div className="course-hero-clean-grid">
          <section className="course-hero-card primary course-hero-main-card">
            <div className="course-hero-label">Learning path</div>
            <h1 className="course-hero-main-title">Build sharper judgement for AI-assisted finance content.</h1>
            <p className="course-hero-text">
              Move through the modules in sequence, pass each assessment, and unlock the next stage of the course as
              you go.
            </p>

            <div className="course-hero-pills">
              <span className="course-pill">{moduleSummaries.length} modules</span>
              <span className="course-pill">{unlockedModules} unlocked</span>
              <span className="course-pill">{completedModules} completed</span>
            </div>

            <div className="course-hero-actions">
              <button className="hero-button" onClick={() => navigate(nextModule.path)}>
                Continue with Module {nextModule.number}
              </button>
              <div className="course-hero-next">
                Next up: <strong>{nextModule.title}</strong>
              </div>
            </div>
          </section>

          <section className="course-hero-stats course-hero-stats-clean">
            <div className="stat-card stat-card-emphasis">
              <div className="stat-card-topline">
                <h3>Course Progress</h3>
                <span className="stat-card-chip">{completedModules}/{moduleSummaries.length} passed</span>
              </div>
              <div className="stat-visual-layout">
                <ProgressRing value={completionPercent} label="Complete" accentClass="accent-progress" />
                <div className="stat-visual-copy">
                  <p className="stat-number">{completedLessons} lessons done</p>
                  <p className="stat-sub">
                    You&apos;ve completed {completedLessons} of {totalLessons} lessons across the full roadmap.
                  </p>
                </div>
              </div>
              <div className="overall-bar">
                <div className="overall-bar-fill" style={{ width: `${completionPercent}%` }} />
              </div>
              <div className="stat-module-strip" aria-hidden="true">
                {modules.map(module => (
                  <span
                    key={module.number}
                    className={[
                      'stat-module-dot',
                      module.completed ? 'completed' : module.unlocked ? 'unlocked' : 'locked',
                    ].join(' ')}
                  />
                ))}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-topline">
                <h3>Available Now</h3>
                <span className="stat-card-chip">{availableModules.length} modules</span>
              </div>
              <div className="stat-visual-layout">
                <ProgressRing value={unlockedPercent} label="Unlocked" accentClass="accent-unlocked" />
                <div className="stat-visual-copy">
                  <p className="stat-number">Ready to study</p>
                  <p className="stat-sub">These modules are open today, with Module {nextModule.number} as your best next step.</p>
                </div>
              </div>
              <div className="stat-mini-list">
                {availableModules.slice(0, 3).map(module => (
                  <span key={module.number} className="stat-mini-pill">
                    M{module.number}
                  </span>
                ))}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-topline">
                <h3>Locked Ahead</h3>
                <span className="stat-card-chip">{lockedModules.length} remaining</span>
              </div>
              <div className="stat-visual-layout">
                <ProgressRing value={lockedPercent} label="Pending" accentClass="accent-locked" />
                <div className="stat-visual-copy">
                  <p className="stat-number">Roadmap ahead</p>
                  <p className="stat-sub">
                    Finish the current assessment path to unlock {lockedModules.length > 0 ? `Module ${lockedModules[0].number}` : 'the final stage'} next.
                  </p>
                </div>
              </div>
              <div className="stat-roadmap-list">
                {lockedModules.slice(0, 3).map(module => (
                  <div key={module.number} className="stat-roadmap-item">
                    <span className="stat-roadmap-marker" />
                    <span>Module {module.number}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </header>

      <main className="course-modules-wrapper course-modules-wrapper-clean">
        <section className="course-section-block">
          <div className="course-section-head">
            <div>
              <div className="course-section-eyebrow">Available now</div>
              <h2 className="course-modules-title">Unlocked Modules</h2>
            </div>
            <div className="course-section-copy">
              Open any unlocked module below. Passing the current module assessment unlocks the next one.
            </div>
          </div>

          <div className="course-module-grid">
            {availableModules.map(module => {
              const isCurrent = !module.completed && module.number === nextModule.number

              return (
                <section
                  key={module.number}
                  className={['module-card', 'module-card-clean', module.completed ? 'is-complete' : '', isCurrent ? 'is-current' : ''].join(' ')}
                  onClick={() => navigate(module.path)}
                >
                  <div className="module-card-top">
                    <div className={['module-icon', isCurrent ? 'playing' : '', module.completed ? 'done' : ''].join(' ')}>
                      <span className={['module-icon-mark', module.completed ? 'check' : isCurrent ? 'play' : 'open'].join(' ')} />
                    </div>
                    <span
                      className={[
                        'module-badge',
                        module.completed ? 'completed' : isCurrent ? 'in-progress' : 'available',
                      ].join(' ')}
                    >
                      {module.completed ? 'Completed' : isCurrent ? 'Current module' : 'Unlocked'}
                    </span>
                  </div>

                  <div className="module-content">
                    <div className="module-header module-header-clean">
                      <h3>
                        Module {module.number}: {module.title}
                      </h3>
                    </div>

                    <p className="module-meta">
                      {module.lessons} lessons | {module.duration}
                    </p>

                    <div className="module-progress module-progress-clean">
                      <span>
                        {module.completed
                          ? 'Finished and passed'
                          : `${module.completedLessons} of ${module.lessons} lessons complete`}
                      </span>
                      <div className="module-progress-bar">
                        <div
                          className={['module-progress-fill', module.completed ? 'dark' : isCurrent ? 'current' : ''].join(' ')}
                          style={{ width: `${module.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )
            })}
          </div>
        </section>

        {lockedModules.length > 0 && (
          <section className="course-section-block course-section-block-muted">
            <div className="course-section-head">
              <div>
                <div className="course-section-eyebrow">Roadmap</div>
                <h2 className="course-modules-title">Locked Modules</h2>
              </div>
              <div className="course-section-copy">These open automatically as you complete the course in order.</div>
            </div>

            <div className="locked-module-list">
              {lockedModules.map(module => (
                <section key={module.number} className="locked-card locked-card-clean">
                  <div className="locked-icon">
                    <span className="module-icon-mark lock" />
                  </div>
                  <div className="locked-content">
                    <h3>
                      Module {module.number}: {module.title}
                    </h3>
                    <p className="module-meta">
                      {module.lessons} lessons | {module.duration}
                    </p>
                  </div>
                  <span className="locked-badge">Unlock after Module {module.number - 1}</span>
                </section>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
