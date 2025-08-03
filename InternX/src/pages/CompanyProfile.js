"use client"
import { useParams, Link } from "react-router-dom"
import "./CompanyProfile.css"

const companies = {
  abc: {
    name: "Company ABC",
    industry: "Tech",
    email: "contact@abc.com",
    description: "Company ABC is a leading company in the tech industry, providing innovative solutions.",
    location: "New York, USA",
  },
  xyz: {
    name: "Company XYZ",
    industry: "Finance",
    email: "contact@xyz.com",
    description: "Company XYZ offers financial services and solutions to both individuals and businesses.",
    location: "London, UK",
  },
  123: {
    name: "Company 123",
    industry: "Marketing",
    email: "contact@123.com",
    description: "Company 123 is a global marketing agency.",
    location: "Sydney, Australia",
  },
  456: {
    name: "Company 456",
    industry: "Retail",
    email: "contact@456.com",
    description: "Company 456 is a leading retailer with multiple locations worldwide.",
    location: "Paris, France",
  },
  789: {
    name: "Company 789",
    industry: "Healthcare",
    email: "contact@789.com",
    description: "Company 789 is a healthcare provider focused on wellness.",
    location: "Berlin, Germany",
  },
}

function CompanyProfile() {
  const { companyId } = useParams()
  const company = companies[companyId]

  if (!company) {
    return (
      <div className="company-profile-page">
        <div className="company-profile-container">
          <div className="not-found">
            <h2>Company Not Found</h2>
            <p>The company you're looking for doesn't exist or has been moved.</p>
            <Link to="/" className="btn btn-primary">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="company-profile-page">
      <div className="company-profile-container">
        <div className="company-profile-card">
          {/* Company Header */}
          <div className="company-profile-header">
            <div className="company-avatar-xl">{company.name.charAt(0)}</div>
            <h1 className="company-title">{company.name}</h1>
            <p className="company-industry">{company.industry}</p>
          </div>

          {/* Company Details */}
          <div className="company-profile-details">
            <div className="details-section">
              <div className="detail-group">
                <h3 className="detail-label">Description</h3>
                <p className="detail-value description">{company.description}</p>
              </div>

              <div className="detail-group">
                <h3 className="detail-label">Location</h3>
                <p className="detail-value">{company.location}</p>
              </div>
            </div>

            <div className="details-section">
              <div className="detail-group">
                <h3 className="detail-label">Industry</h3>
                <p className="detail-value">{company.industry}</p>
              </div>

              <div className="detail-group">
                <h3 className="detail-label">Contact</h3>
                <a href={`mailto:${company.email}`} className="detail-value contact-link">
                  {company.email}
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="company-profile-actions">
            <Link to="/internships" className="btn btn-primary">
              View Internships
            </Link>
            <a href={`mailto:${company.email}`} className="btn btn-secondary">
              Contact Company
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyProfile
