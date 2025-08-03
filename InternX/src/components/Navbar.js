"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

const companies = [
  { id: "abc", name: "Company ABC", industry: "Technology" },
  { id: "xyz", name: "Company XYZ", industry: "Finance" },
  { id: "123", name: "Company 123", industry: "Marketing" },
  { id: "456", name: "Company 456", industry: "Retail" },
  { id: "789", name: "Company 789", industry: "Healthcare" },
]

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Enhanced Logo */}
        <Link to="/" className="navbar-logo-container">
          <div className="logo-glow"></div>
          <div className="logo-content">
            <span className="sparkle">✨</span>
            <span className="logo-intern">Intern</span>
            <span className="logo-x">X</span>
          </div>
          <div className="floating-particle particle-1"></div>
          <div className="floating-particle particle-2"></div>
          <div className="floating-particle particle-3"></div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/internships" className="navbar-item">
              Internships
            </Link>
          </li>

          {/* Company Dropdown */}
          <li
            className="navbar-item dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="dropdown-trigger">
              Companies
              <span className={`dropdown-arrow ${isDropdownOpen ? "rotated" : ""}`}>▼</span>
            </span>
            <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
              <li className="dropdown-header">Featured Companies</li>
              {companies.map((company) => (
                <li key={company.id}>
                  <Link to={`/company/${company.id}`} className="dropdown-item">
                    <div className="company-avatar">{company.name.charAt(0)}</div>
                    <div className="company-info">
                      <div className="company-name">{company.name}</div>
                      <div className="company-industry">{company.industry}</div>
                    </div>
                    <span className="company-arrow">→</span>
                  </Link>
                </li>
              ))}
              <li className="dropdown-divider"></li>
              <li>
                <Link to="/companies" className="dropdown-item view-all">
                  🏢 View All Companies
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/about" className="navbar-item">
              About
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="navbar-auth">
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-item" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/internships" className="mobile-item" onClick={() => setIsMobileMenuOpen(false)}>
            Internships
          </Link>
          <div className="mobile-companies">
            <span className="mobile-section-title">Companies</span>
            {companies.map((company) => (
              <Link
                key={company.id}
                to={`/company/${company.id}`}
                className="mobile-company-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="company-avatar small">{company.name.charAt(0)}</div>
                <div>
                  <div className="company-name">{company.name}</div>
                  <div className="company-industry">{company.industry}</div>
                </div>
              </Link>
            ))}
            <Link to="/companies" className="mobile-item" onClick={() => setIsMobileMenuOpen(false)}>
              View All Companies
            </Link>
          </div>
          <Link to="/about" className="mobile-item" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
          <div className="mobile-auth">
            <Link to="/login" className="btn btn-ghost" onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
