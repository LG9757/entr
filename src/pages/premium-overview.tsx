import { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import { getAuthToken, getCourseAccess } from '../lib/api'
import { premiumCourse } from '../lib/premiumCourse'

export default function PremiumOverview() {
  const navigate = useNavigate()
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/')
      return
    }

    let cancelled = false
    getCourseAccess(premiumCourse.slug)
      .then(result => {
        if (!cancelled) setEnrolled(result.hasAccess)
      })
      .catch(() => {
        if (!cancelled) setEnrolled(false)
      })

    return () => {
      cancelled = true
    }
  }, [navigate])

  return (
    <div className="premium-page-root">
      <AppHeader
        title={premiumCourse.title}
        subtitle="Premium course overview"
        backLabel="Back to Courses"
        onBack={() => navigate('/home')}
      />

      <main className="premium-hero">
        <section className="premium-copy">
          <div className="premium-pill">New Course Available</div>
          <h1 className="premium-title">{premiumCourse.title}</h1>
          <p className="premium-subtitle">{premiumCourse.subtitle}</p>

          <div className="premium-cta-row">
            <button
              className="premium-primary-btn"
              onClick={() => navigate(enrolled ? '/home' : '/premium-course/payment')}
            >
              {enrolled ? 'Go to Dashboard' : 'Enroll Now'}
            </button>
            <button className="premium-secondary-btn" onClick={() => navigate('/premium-course/curriculum')}>
              View Curriculum
            </button>
          </div>

          <div className="premium-stat-row">
            <div className="premium-stat">
              <div className="premium-stat-value">{premiumCourse.hours}</div>
              <div className="premium-stat-label">Hours of Content</div>
            </div>
            <div className="premium-stat">
              <div className="premium-stat-value">{premiumCourse.modules}</div>
              <div className="premium-stat-label">Modules</div>
            </div>
            <div className="premium-stat">
              <div className="premium-stat-value">{premiumCourse.rating}</div>
              <div className="premium-stat-label">{premiumCourse.reviews} reviews</div>
            </div>
            <div className="premium-stat">
              <div className="premium-stat-value">{premiumCourse.difficulty}</div>
              <div className="premium-stat-label">Difficulty Level</div>
            </div>
          </div>
        </section>

        <section className="premium-visual" aria-hidden="true">
          <div className="premium-chip-board">
            <div className="premium-chip premium-chip-main">AI</div>
            <div className="premium-chip premium-chip-small chip-top-left" />
            <div className="premium-chip premium-chip-small chip-top-right" />
            <div className="premium-chip premium-chip-small chip-bottom-left" />
            <div className="premium-chip premium-chip-small chip-bottom-right" />
            <div className="premium-circuit premium-circuit-1" />
            <div className="premium-circuit premium-circuit-2" />
            <div className="premium-circuit premium-circuit-3" />
          </div>
        </section>
      </main>
    </div>
  )
}
