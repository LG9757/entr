import '../App.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()
  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <div className="dashboard-title">My Learning Dashboard</div>
        <button
            className="logout-button"
            onClick={() => navigate('/')}
            >
            Logout
        </button>

      </header>

      <main className="dashboard-main">
        <section className="dashboard-section">
          <h2 className="dashboard-section-title">Courses you have access to:</h2>

          <div className="course-card">
            <div className="course-icon primary">
              <span className="checkmark">✓</span>
            </div>

            <div className="course-content">
              <div className="course-header-row">
                <h3 className="course-title">
                  Recognising AI Content in Finance
                </h3>
                <span className="badge enrolled">Enrolled</span>
              </div>

              <p className="course-description">
                Learn to identify AI-generated financial reports, analysis, 
                and market commentary to make informed decisions.
              </p>

              <div className="course-meta-row">
                <span>⭐ 4.8/5</span>
                <span>👥 1,245 students</span>
                <span>⏱ 6 hours</span>
                <span>🎓 42 lessons</span>
              </div>

              <div className="progress-block">
                <div className="progress-top">
                  <span>Your Progress</span>
                  <span>35% Complete</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '35%' }} />
                </div>
              </div>

              <div className="course-actions">
                <button
                    className="primary-button"
                    onClick={() => navigate('/course')}
                    >
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
                <h3 className="course-title">
                  Real vs AI: Master the Art of Detection
                </h3>
                <span className="badge premium">Premium</span>
              </div>

              <p className="course-description">
                Comprehensive course teaching you to distinguish between real 
                and AI-generated content across text, images, video, and audio.
              </p>

              <div className="course-meta-row">
                <span>⭐ 4.9/5</span>
                <span>👥 980 students</span>
                <span>⏱ 4 hours</span>
                <span>🎓 24 lessons</span>
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
