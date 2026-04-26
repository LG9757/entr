import { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import { clearAuthSession, getAuthToken, getCourseAccess, getStoredUser } from '../lib/api'
import { premiumCourse } from '../lib/premiumCourse'

export default function Home() {
  const navigate = useNavigate()
  const [premiumEnrolled, setPremiumEnrolled] = useState(false)
  const [designerExpanded, setDesignerExpanded] = useState(false)
  const user = getStoredUser()

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/')
      return
    }

    let cancelled = false

    getCourseAccess(premiumCourse.slug)
      .then(result => {
        if (!cancelled) {
          setPremiumEnrolled(result.hasAccess)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPremiumEnrolled(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [navigate])

  return (
    <div className="dashboard-root">
      <AppHeader
        className="app-header-shell-home"
        title="My Learning Dashboard"
        subtitle={user ? `Signed in as ${user.name}. Your enrolled courses, premium options, and latest progress live here.` : 'Your enrolled courses, premium options, and latest progress in one place.'}
        rightSlot={
          <div className="home-header-actions">
            <button className="home-team-link" onClick={() => navigate('/our-team')}>
              Our Team
            </button>
            <button
              className="logout-button"
              onClick={() => {
                clearAuthSession()
                navigate('/')
              }}
            >
              Logout
            </button>
          </div>
        }
      />

      <main className="dashboard-main">
        <section className="dashboard-section">
          <h2 className="dashboard-section-title">Courses you have access to:</h2>

          <div className="course-card">
            <div className="course-icon primary">
              <span className="checkmark">AI</span>
            </div>

            <div className="course-content">
              <div className="course-header-row">
                <h3 className="course-title">Recognising AI Content in Finance</h3>
                <span className="badge enrolled">Enrolled</span>
              </div>

              <p className="course-description">
                Learn to identify AI-generated financial reports, market commentary, synthetic news signals, and the
                compliance risks that come with automated drafting.
              </p>

              <div className="course-meta-row">
                <span>4.8/5 rating</span>
                <span>1,245 learners</span>
                <span>About 8 hours</span>
                <span>47 lessons</span>
              </div>

              <div className="course-actions">
                <button className="primary-button" onClick={() => navigate('/course')}>
                  Continue Course
                </button>
              </div>
            </div>
          </div>

          {premiumEnrolled && (
            <div className="course-card">
              <div className="course-icon secondary">
                <span className="course-icon-text">AI</span>
              </div>

              <div className="course-content">
                <div className="course-header-row">
                  <h3 className="course-title">Real vs AI: Master the Art of Detection</h3>
                  <span className="badge enrolled">Enrolled</span>
                </div>

                <p className="course-description">
                  A broader programme covering text, image, video, and audio authenticity across consumer and professional
                  settings.
                </p>

                <div className="course-meta-row">
                  <span>4.9/5 rating</span>
                  <span>980 learners</span>
                  <span>12+ hours</span>
                  <span>69 lessons</span>
                </div>

                <div className="course-actions">
                  <button className="primary-button" onClick={() => navigate('/premium-course')}>
                    Open Course
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {!premiumEnrolled && (
          <section className="dashboard-section">
          <h2 className="dashboard-section-title">Other Courses</h2>

          <div className="course-card">
            <div className="course-icon secondary">
              <span className="course-icon-text">AI</span>
            </div>

            <div className="course-content">
              <div className="course-header-row">
                <h3 className="course-title">Real vs AI: Master the Art of Detection</h3>
                <span className={['badge', premiumEnrolled ? 'enrolled' : 'premium'].join(' ')}>
                  {premiumEnrolled ? 'Enrolled' : 'Premium'}
                </span>
              </div>

              <p className="course-description">
                A broader programme covering text, image, video, and audio authenticity across consumer and professional
                settings.
              </p>

              <div className="course-meta-row">
                <span>4.9/5 rating</span>
                <span>980 learners</span>
                <span>12+ hours</span>
                <span>69 lessons</span>
              </div>

              <div className="course-designer-block">
                <button
                  type="button"
                  className="course-designer-toggle"
                  onClick={() => setDesignerExpanded(value => !value)}
                  aria-expanded={designerExpanded}
                >
                  Designed by: Sophie Patel (Lloyds Banking Group)
                </button>

                <div className={['course-designer-expand', designerExpanded ? 'open' : ''].join(' ')}>
                  <article className="team-card team-card-mini">
                    <div className="team-avatar" aria-hidden="true">
                      <div className="team-avatar-head" />
                      <div className="team-avatar-body" />
                    </div>
                    <div className="team-person-name">Sophie Patel</div>
                    <div className="team-person-role">Learning & Capability Manager, Lloyds Banking Group</div>
                    <p className="team-person-bio">
                      Works with enterprise learning teams to improve digital skills adoption, contributing practical
                      insight into workforce upskilling and measurable training impact.
                    </p>
                  </article>
                </div>
              </div>

              <div className="course-actions">
                <button className="secondary-button" onClick={() => navigate('/premium-course')}>
                  {premiumEnrolled ? 'Open Course' : 'View Details'}
                </button>
              </div>
            </div>
          </div>
          </section>
        )}
      </main>
    </div>
  )
}
