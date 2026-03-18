import '../App.css'
import { useNavigate } from 'react-router-dom'
import {
  getCompletedModuleCount,
  getNextUnlockedModule,
  getUnlockedModuleCount,
  getModulePassed,
  isModuleUnlocked,
  moduleSummaries,
} from '../lib/courseProgress'

export default function Course() {
  const navigate = useNavigate()
  const completedModules = getCompletedModuleCount()
  const unlockedModules = getUnlockedModuleCount()
  const nextModule = getNextUnlockedModule()
  const completionPercent = Math.round((completedModules / moduleSummaries.length) * 100)

  return (
    <div className="course-page-root">
      <header className="course-hero">
        <div className="course-hero-top">
          <button className="back-link" onClick={() => navigate('/home')}>
            Back to Courses
          </button>

          <div className="course-hero-title">Recognising AI Content in Finance</div>
          <div />
        </div>

        <div className="course-hero-main">
          <div className="course-hero-card primary">
            <div className="course-hero-heading">Course roadmap</div>
            <p className="course-hero-text">
              Work through the modules in sequence. Each completed module unlocks the next one, so the course opens up
              as you build confidence.
            </p>
            <button className="hero-button" onClick={() => navigate(nextModule.path)}>
              Continue with Module {nextModule.number}
            </button>
          </div>

          <div className="course-hero-stats">
            <div className="stat-card">
              <h3>Modules Completed</h3>
              <p className="stat-number">{completedModules}/{moduleSummaries.length}</p>
              <p className="stat-sub">{completionPercent}% of the course completed</p>
              <div className="overall-bar">
                <div className="overall-bar-fill" style={{ width: `${completionPercent}%` }} />
              </div>
            </div>

            <div className="stat-card">
              <h3>Currently Unlocked</h3>
              <p className="stat-number">{unlockedModules}</p>
              <p className="stat-sub">Modules available to open right now</p>
            </div>

            <div className="stat-card">
              <h3>Next Focus</h3>
              <p className="stat-number">Module {nextModule.number}</p>
              <p className="stat-sub">{nextModule.title}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="course-modules-wrapper">
        <h2 className="course-modules-title">Course Modules</h2>

        {moduleSummaries.map(module => {
          const unlocked = isModuleUnlocked(module.number)
          const completed = getModulePassed(module.number)
          const isCurrent = unlocked && !completed

          if (!unlocked) {
            return (
              <section key={module.number} className="locked-card">
                <div className="locked-icon">Lock</div>
                <div className="locked-content">
                  <h3>
                    Module {module.number}: {module.title}
                  </h3>
                  <p className="module-meta">
                    {module.lessons} lessons | {module.duration}
                  </p>
                </div>
                <span className="locked-badge">Complete Module {module.number - 1}</span>
              </section>
            )
          }

          return (
            <section key={module.number} className="module-card" onClick={() => navigate(module.path)}>
              <div className={['module-icon', isCurrent ? 'playing' : ''].join(' ')}>
                {completed ? 'Done' : 'Open'}
              </div>
              <div className="module-content">
                <div className="module-header">
                  <h3>
                    Module {module.number}: {module.title}
                  </h3>
                  <span className={['module-badge', completed ? 'available' : isCurrent ? 'in-progress' : 'available'].join(' ')}>
                    {completed ? 'Completed' : isCurrent ? 'Available Now' : 'Unlocked'}
                  </span>
                </div>
                <p className="module-meta">
                  {module.lessons} lessons | {module.duration}
                </p>

                <div className="module-progress">
                  <span>Status</span>
                  <div className="module-progress-bar">
                    <div className={['module-progress-fill', completed ? 'dark' : ''].join(' ')} style={{ width: completed ? '100%' : '18%' }} />
                  </div>
                  <span className="module-progress-text">{completed ? 'Assessment passed' : 'Ready to begin'}</span>
                </div>
              </div>
            </section>
          )
        })}
      </main>
    </div>
  )
}
