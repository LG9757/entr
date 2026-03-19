import { useEffect, useMemo, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import { getAuthToken, getCourseProgress, getStoredUser } from '../lib/api'
import {
  financeCourseSlug,
  getCompletedModuleCount,
  getNextUnlockedModule,
  getUnlockedModuleCount,
  getModulePassed,
  isModuleUnlocked,
  moduleSummaries,
} from '../lib/courseProgress'

type ModuleViewState = {
  number: number
  title: string
  path: string
  lessons: number
  duration: string
  unlocked: boolean
  completed: boolean
}

export default function Course() {
  const navigate = useNavigate()
  const user = getStoredUser()
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

        setServerModules(nextState)
      })
      .catch(() => {
        if (!cancelled) {
          setServerModules(null)
        }
      })

    return () => {
      cancelled = true
    }
  }, [navigate])

  const modules: ModuleViewState[] = useMemo(
    () =>
      moduleSummaries.map(module => ({
        ...module,
        unlocked: serverModules?.[module.number]?.unlocked ?? isModuleUnlocked(module.number),
        completed: serverModules?.[module.number]?.passed ?? getModulePassed(module.number),
      })),
    [serverModules]
  )

  const completedModules = modules.filter(module => module.completed).length || getCompletedModuleCount()
  const unlockedModules = modules.filter(module => module.unlocked).length || getUnlockedModuleCount()
  const nextModule = modules.find(module => module.unlocked && !module.completed) ?? getNextUnlockedModule()
  const completionPercent = Math.round((completedModules / moduleSummaries.length) * 100)
  const availableModules = modules.filter(module => module.unlocked)
  const lockedModules = modules.filter(module => !module.unlocked)

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
              <h3>Course Progress</h3>
              <p className="stat-number">{completionPercent}%</p>
              <p className="stat-sub">
                {completedModules} of {moduleSummaries.length} modules passed
              </p>
              <div className="overall-bar">
                <div className="overall-bar-fill" style={{ width: `${completionPercent}%` }} />
              </div>
            </div>

            <div className="stat-card">
              <h3>Available Now</h3>
              <p className="stat-number">{availableModules.length}</p>
              <p className="stat-sub">Modules you can open today</p>
            </div>

            <div className="stat-card">
              <h3>Locked Ahead</h3>
              <p className="stat-number">{lockedModules.length}</p>
              <p className="stat-sub">More modules unlock as you finish each stage</p>
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
                      <span>{module.completed ? 'Finished and passed' : isCurrent ? 'Ready to continue' : 'Available to start'}</span>
                      <div className="module-progress-bar">
                        <div
                          className={['module-progress-fill', module.completed ? 'dark' : isCurrent ? 'current' : ''].join(' ')}
                          style={{ width: module.completed ? '100%' : isCurrent ? '38%' : '18%' }}
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
