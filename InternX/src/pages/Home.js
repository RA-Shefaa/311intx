import { Link } from "react-router-dom"
import "./Home.css"

function Home() {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-content">
          {/* Hero Image */}
          <div className="hero-image">
            <img
              src="/api/placeholder/800/600"
              alt="InternX - Unlock Your Internship Experience"
              className="hero-img"
            />
          </div>

          {/* Call to Action */}
          <div className="hero-text">
            <h1 className="hero-title">
              Your <span className="text-cyan">Internship</span> Journey Starts Here
            </h1>
            <p className="hero-subtitle">
              The <span className="text-yellow">X-Factor</span> to Your Future.
            </p>
            <div className="hero-buttons">
              <Link to="/internships" className="btn btn-primary btn-lg">
                Find Internships
              </Link>
              <Link to="/register" className="btn btn-secondary btn-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
