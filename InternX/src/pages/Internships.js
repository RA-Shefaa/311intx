"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Internships.css"

const internships = [
  {
    id: 1,
    title: "Software Engineering Intern",
    description:
      "Join our dynamic engineering team and work on exciting projects! You'll be working with cutting-edge technologies and contributing to real-world applications.",
    company_name: "TechCorp Solutions",
    location: "Remote",
    date_posted: "2025-07-15",
    type: "Full-time",
    duration: "3 months",
  },
  {
    id: 2,
    title: "Marketing Intern",
    description:
      "Get hands-on experience with digital marketing strategies and campaigns. Learn about social media marketing, content creation, and analytics.",
    company_name: "MarketGenius Inc.",
    location: "New York, NY",
    date_posted: "2025-07-10",
    type: "Part-time",
    duration: "6 months",
  },
  {
    id: 3,
    title: "Data Science Intern",
    description:
      "Work with big data and help build predictive models for the future. Experience with Python, machine learning, and data visualization tools.",
    company_name: "DataMinds",
    location: "San Francisco, CA",
    date_posted: "2025-07-12",
    type: "Full-time",
    duration: "4 months",
  },
  {
    id: 4,
    title: "UX/UI Design Intern",
    description:
      "Create beautiful and intuitive user experiences. Work alongside our design team to craft engaging interfaces for web and mobile applications.",
    company_name: "DesignHub Studio",
    location: "Austin, TX",
    date_posted: "2025-07-08",
    type: "Full-time",
    duration: "3 months",
  },
  {
    id: 5,
    title: "Finance Intern",
    description:
      "Gain exposure to financial analysis, budgeting, and investment strategies. Perfect opportunity to learn from experienced financial professionals.",
    company_name: "Capital Ventures",
    location: "Chicago, IL",
    date_posted: "2025-07-05",
    type: "Full-time",
    duration: "6 months",
  },
]

function Internships() {
  const [selectedInternship, setSelectedInternship] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Simulate checking if user is logged in
  const isLoggedIn = false // Change this to true to test logged-in state

  const handleApplyClick = (internship) => {
    if (isLoggedIn) {
      alert(`Application submitted for ${internship.title} at ${internship.company_name}!`)
    } else {
      setSelectedInternship(internship)
      setShowLoginModal(true)
    }
  }

  const closeModal = () => {
    setShowLoginModal(false)
    setSelectedInternship(null)
  }

  return (
    <div className="internships-page">
      <div className="internships-container">
        {/* Header */}
        <div className="internships-header">
          <h1>
            Internship <span className="text-cyan">Opportunities</span>
          </h1>
          <p>Discover amazing internship opportunities that match your skills and career goals</p>
        </div>

        {/* Internships Grid */}
        <div className="internships-grid">
          {internships.map((internship) => (
            <div key={internship.id} className="internship-card">
              <div className="card-header">
                <div className="card-badges">
                  <span className="badge">{internship.type}</span>
                  <span className="duration">{internship.duration}</span>
                </div>
                <h2 className="internship-title">{internship.title}</h2>
                <p className="internship-description">{internship.description}</p>
              </div>

              <div className="card-details">
                <div className="detail-item">
                  <span className="detail-icon">🏢</span>
                  <span className="detail-text company">{internship.company_name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span className="detail-text">{internship.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <span className="detail-text">Posted: {new Date(internship.date_posted).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="card-footer">
                <button className="apply-btn" onClick={() => handleApplyClick(internship)}>
                  {isLoggedIn ? "Apply Now" : "🔒 Apply Now"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>🔒 Login Required</h2>
                <button className="close-btn" onClick={closeModal}>
                  ×
                </button>
              </div>

              <div className="modal-body">
                <p>
                  You need to be logged in to apply for internships. Join InternX today to unlock amazing opportunities!
                </p>

                {selectedInternship && (
                  <div className="selected-job">
                    <h3>You're applying for:</h3>
                    <div className="job-info">
                      <p className="job-title">{selectedInternship.title}</p>
                      <p className="job-company">at {selectedInternship.company_name}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <Link to="/login" className="btn btn-primary">
                  👤 Login
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  ➕ Create Account
                </Link>
              </div>

              <div className="modal-note">
                <p>
                  Already have an account? <Link to="/login">Sign in here</Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Internships
