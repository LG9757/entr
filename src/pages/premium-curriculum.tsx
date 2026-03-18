import '../App.css'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import { premiumCourse, premiumCurriculum } from '../lib/premiumCourse'

export default function PremiumCurriculum() {
  const navigate = useNavigate()

  return (
    <div className="premium-page-root premium-curriculum-root">
      <AppHeader
        title="Complete Course Curriculum"
        subtitle={premiumCourse.title}
        backLabel="Back to Course Overview"
        onBack={() => navigate('/premium-course')}
      />

      <main className="curriculum-layout">
        <section className="curriculum-hero">
          <p className="curriculum-copy">
            Explore all {premiumCourse.modules} modules, {premiumCourse.lessons} lessons, and {premiumCourse.hours} hours
            of comprehensive content designed to make you an expert at detecting AI-generated content.
          </p>

          <div className="curriculum-meta-row">
            <span>{premiumCourse.hours} Hours Total</span>
            <span>{premiumCourse.lessons} Lessons</span>
            <span>{premiumCourse.rating} Rating</span>
          </div>
        </section>

        <section className="curriculum-card-stack">
          {premiumCurriculum.map(module => (
            <article key={module.number} className="curriculum-card">
              <div className="curriculum-card-top">
                <div className="curriculum-card-badges">
                  <span className="curriculum-module-pill">Module {module.number}</span>
                  <span className="curriculum-module-time">{module.duration}</span>
                </div>
                <div className="curriculum-module-lessons">{module.lessons} lessons</div>
              </div>

              <h2 className="curriculum-module-title">{module.title}</h2>

              <div className="curriculum-objectives-title">Learning Objectives:</div>
              <ul className="curriculum-objectives">
                {module.objectives.map(objective => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
