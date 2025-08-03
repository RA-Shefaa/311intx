import { Link } from "react-router-dom"
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo-container">
              <div className="footer-logo-glow"></div>
              <div className="footer-logo-content">
                <span className="footer-sparkle">✨</span>
                <span className="footer-logo-intern">Intern</span>
                <span className="footer-logo-x">X</span>
              </div>
            </div>
            <p className="footer-description">
              The X-Factor to Your Future. Connecting students with amazing internship opportunities and helping
              companies find tomorrow's talent.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                📘
              </a>
              <a href="#" className="social-link">
                🐦
              </a>
              <a href="#" className="social-link">
                💼
              </a>
              <a href="#" className="social-link">
                📷
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/internships">Browse Internships</Link>
              </li>
              <li>
                <Link to="/companies">Partner Companies</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div className="footer-section">
            <h3 className="footer-title">For Students</h3>
            <ul className="footer-links">
              <li>
                <Link to="/register">Create Account</Link>
              </li>
              <li>
                <Link to="/login">Student Login</Link>
              </li>
              <li>
                <Link to="/how-it-works">How It Works</Link>
              </li>
              <li>
                <Link to="/career-tips">Career Tips</Link>
              </li>
              <li>
                <Link to="/success-stories">Success Stories</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>hello@internx.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="company-cta">
              <h4 className="company-title">For Companies</h4>
              <Link to="/company-signup" className="company-link">
                Post Internships →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">© 2025 InternX. All rights reserved. Built with ❤️ for students.</div>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
