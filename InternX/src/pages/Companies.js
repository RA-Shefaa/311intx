import { Link } from "react-router-dom"
import "./Companies.css"

const allCompanies = [
  {
    id: "abc",
    name: "Company ABC",
    industry: "Technology",
    description: "Leading technology company providing innovative solutions for businesses worldwide.",
    location: "New York, USA",
    employees: "1000+",
    openPositions: 5,
  },
  {
    id: "xyz",
    name: "Company XYZ",
    industry: "Finance",
    description: "Premier financial services company offering comprehensive solutions for individuals and businesses.",
    location: "London, UK",
    employees: "500-1000",
    openPositions: 3,
  },
  {
    id: "123",
    name: "Company 123",
    industry: "Marketing",
    description: "Global marketing agency specializing in digital transformation and brand strategy.",
    location: "Sydney, Australia",
    employees: "100-500",
    openPositions: 7,
  },
  {
    id: "456",
    name: "Company 456",
    industry: "Retail",
    description: "Leading retail company with multiple locations worldwide and strong e-commerce presence.",
    location: "Paris, France",
    employees: "1000+",
    openPositions: 4,
  },
  {
    id: "789",
    name: "Company 789",
    industry: "Healthcare",
    description: "Healthcare provider focused on wellness and innovative medical solutions.",
    location: "Berlin, Germany",
    employees: "500-1000",
    openPositions: 6,
  },
]

function Companies() {
  return (
    <div className="companies-page">
      <div className="companies-container">
        {/* Header */}
        <div className="companies-header">
          <h1>
            Partner <span className="text-cyan">Companies</span>
          </h1>
          <p>Discover amazing companies offering internship opportunities across various industries</p>
        </div>

        {/* Companies Grid */}
        <div className="companies-grid">
          {allCompanies.map((company) => (
            <div key={company.id} className="company-card">
              <div className="company-header">
                <div className="company-avatar-container">
                  <div className="company-avatar-large">{company.name.charAt(0)}</div>
                  <div className="company-info">
                    <h2 className="company-name">{company.name}</h2>
                    <span className="badge">{company.industry}</span>
                  </div>
                </div>
                <p className="company-description">{company.description}</p>
              </div>

              <div className="company-details">
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span className="detail-text">{company.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">👥</span>
                  <span className="detail-text">{company.employees} employees</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🏢</span>
                  <span className="detail-text">{company.openPositions} open positions</span>
                </div>
              </div>

              <div className="company-footer">
                <Link to={`/company/${company.id}`} className="btn btn-primary">
                  View Profile
                </Link>
                <Link to={`/company/${company.id}#internships`} className="btn btn-secondary">
                  View Jobs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Companies
