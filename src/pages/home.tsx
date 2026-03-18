import '../App.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <div className="dashboard-title">My Learning Dashboard</div>
        <button className="logout-button" onClick={() => navigate('/')}>
          Logout
        </button>
      </header>

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
        </section>

        <section className="dashboard-section">
          <h2 className="dashboard-section-title">Other Courses</h2>

          <div className="course-card">
            <div className="course-icon secondary">
              <span className="course-icon-text">AI</span>
            </div>

            <div className="course-content">
              <div className="course-header-row">
                <h3 className="course-title">Real vs AI: Master the Art of Detection</h3>
                <span className="badge premium">Premium</span>
              </div>

              <p className="course-description">
                A broader programme covering text, image, video, and audio authenticity across consumer and professional
                settings.
              </p>

              <div className="course-meta-row">
                <span>4.9/5 rating</span>
                <span>980 learners</span>
                <span>4 hours</span>
                <span>24 lessons</span>
              </div>

              <div className="course-actions">
                <button className="secondary-button">View Details</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
