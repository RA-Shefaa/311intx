import { Link } from "react-router-dom"
import "./Dashboard.css"

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>
            Welcome back, <span className="text-cyan">John</span>!
          </h1>
          <p>Here's what's happening with your internship journey</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Applications</span>
              <span className="stat-icon">💼</span>
            </div>
            <div className="stat-value">12</div>
            <div className="stat-change">+2 from last week</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Interviews</span>
              <span className="stat-icon">👤</span>
            </div>
            <div className="stat-value">3</div>
            <div className="stat-change">+1 scheduled</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Companies</span>
              <span className="stat-icon">🏢</span>
            </div>
            <div className="stat-value">8</div>
            <div className="stat-change">Following</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Success Rate</span>
              <span className="stat-icon">📈</span>
            </div>
            <div className="stat-value">25%</div>
            <div className="stat-change">Above average</div>
          </div>
        </div>

        {/* Recent Applications & Recommendations */}
        <div className="dashboard-content">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Applications</h2>
              <p>Your latest internship applications</p>
            </div>
            <div className="applications-list">
              <div className="application-item">
                <div className="application-info">
                  <h3>Software Engineering Intern</h3>
                  <p>TechCorp Solutions</p>
                </div>
                <span className="badge status-pending">Pending</span>
              </div>

              <div className="application-item">
                <div className="application-info">
                  <h3>Data Science Intern</h3>
                  <p>DataMinds</p>
                </div>
                <span className="badge status-interview">Interview</span>
              </div>

              <div className="application-item">
                <div className="application-info">
                  <h3>Marketing Intern</h3>
                  <p>MarketGenius Inc.</p>
                </div>
                <span className="badge status-rejected">Rejected</span>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recommended for You</h2>
              <p>Based on your profile and interests</p>
            </div>
            <div className="recommendations-list">
              <div className="recommendation-item">
                <h3>UX/UI Design Intern</h3>
                <p>DesignHub Studio • Austin, TX</p>
                <button className="btn btn-primary btn-sm">Apply Now</button>
              </div>

              <div className="recommendation-item">
                <h3>Finance Intern</h3>
                <p>Capital Ventures • Chicago, IL</p>
                <button className="btn btn-primary btn-sm">Apply Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <Link to="/internships" className="btn btn-primary">
            Browse All Internships
          </Link>
          <Link to="/profile" className="btn btn-secondary">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
