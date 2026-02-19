import '../App.css'
import { useNavigate } from 'react-router-dom'

export default function Course() {
    const navigate = useNavigate()
  return (
    <div className="course-page-root">
      {/* Top hero section */}
      <header className="course-hero">
        <div className="course-hero-top">
            <button
                className="back-link"
                onClick={() => navigate('/home')}
                >
                Back to Courses
            </button>

          <div className="course-hero-title">
            Recognising AI Content in Finance
          </div>
          <div />
        </div>

        <div className="course-hero-main">
          <div className="course-hero-card primary">
            <div className="course-hero-heading">
              Welcome Back! 👋
            </div>
            <p className="course-hero-text">
              Continue your journey in learning to identify AI-generated financial
              content. You&apos;re making great progress!
            </p>
            <button className="hero-button">
              ▶︎ Resume Learning
            </button>
          </div>

          <div className="course-hero-stats">
            <div className="stat-card">
              <h3>Overall Progress</h3>
              <p className="stat-number">35%</p>
              <p className="stat-sub">15 of 42 lessons completed</p>
              <div className="overall-bar">
                <div className="overall-bar-fill" style={{ width: '35%' }} />
              </div>
            </div>

            <div className="stat-card">
              <h3>Time Invested</h3>
              <p className="stat-number">2h 15m</p>
              <p className="stat-sub">~6 hours total content</p>
            </div>

            <div className="stat-card">
              <h3>Next Milestone</h3>
              <p className="stat-number">Complete Module 2</p>
              <p className="stat-sub">8 lessons remaining</p>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable modules section */}
      <main className="course-modules-wrapper">
        <h2 className="course-modules-title">Course Modules</h2>

        {/* Module 1 */}
        <section className="module-card">
          <div className="module-icon playing">▶︎</div>
          <div className="module-content">
            <div className="module-header">
              <h3>Module 1: Introduction to AI in Finance</h3>
              <span className="module-badge in-progress">In Progress</span>
            </div>
            <p className="module-meta">
              6 lessons • 35 min
            </p>

            <div className="module-progress">
              <span>Progress</span>
              <div className="module-progress-bar">
                <div className="module-progress-fill dark" style={{ width: '50%' }} />
              </div>
              <span className="module-progress-text">3/6 lessons</span>
            </div>
          </div>
        </section>

        {/* Module 2 */}
        <section className="module-card">
          <div className="module-icon">▶︎</div>
          <div className="module-content">
            <div className="module-header">
              <h3>Module 2: Detecting AI-Generated Reports</h3>
              <span className="module-badge available">Available</span>
            </div>
            <p className="module-meta">
              8 lessons • 50 min
            </p>

            <div className="module-progress">
              <span>Progress</span>
              <div className="module-progress-bar">
                <div className="module-progress-fill" style={{ width: '0%' }} />
              </div>
              <span className="module-progress-text">0/8 lessons</span>
            </div>
          </div>
        </section>

        {/* Module 3 */}
        <section className="module-card">
          <div className="module-icon">▶︎</div>
          <div className="module-content">
            <div className="module-header">
              <h3>Module 3: AI in Market Analysis</h3>
              <span className="module-badge available">Available</span>
            </div>
            <p className="module-meta">
              7 lessons • 45 min
            </p>

            <div className="module-progress">
              <span>Progress</span>
              <div className="module-progress-bar">
                <div className="module-progress-fill" style={{ width: '0%' }} />
              </div>
              <span className="module-progress-text">0/7 lessons</span>
            </div>
          </div>
        </section>

        {/* Locked modules list */}
        <section className="locked-modules">
          <div className="locked-card">
            <div className="locked-icon">🔒</div>
            <div className="locked-content">
              <h3>Module 4: Financial News Authentication</h3>
              <p className="module-meta">6 lessons • 40 min</p>
            </div>
            <span className="locked-badge">Locked</span>
          </div>

          <div className="locked-card">
            <div className="locked-icon">🔒</div>
            <div className="locked-content">
              <h3>Module 5: Regulatory Compliance</h3>
              <p className="module-meta">8 lessons • 55 min</p>
            </div>
            <span className="locked-badge">Locked</span>
          </div>

          <div className="locked-card">
            <div className="locked-icon">🔒</div>
            <div className="locked-content">
              <h3>Module 6: Case Studies &amp; Applications</h3>
              <p className="module-meta">7 lessons • 1h 10min</p>
            </div>
            <span className="locked-badge">Locked</span>
          </div>
        </section>
      </main>
    </div>
  )
}
