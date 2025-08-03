import { Link } from "react-router-dom"
import "./About.css"

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-content">
          <div className="about-card">
            <h1 className="about-title">
              Welcome to <span className="text-cyan italic">InternX</span>!
            </h1>

            <div className="about-text">
              <p>
                Say hello to <span className="text-cyan italic">InternX</span> — the smartest and coolest way to land
                internships.
                <br />
                <span className="font-bold text-white">
                  InternX is where opportunity meets ambition — built for students, powered by universities, and trusted
                  by companies.
                </span>
              </p>

              <p>
                Whether you're a student chasing your first big break or a company scouting fresh talent,{" "}
                <span className="text-cyan italic">InternX</span> brings you together.
                <br />
                Designed to bridge the gap between classrooms and careers, our platform helps students discover
                internships aligned with their goals, while making it easy for companies to connect with tomorrow's
                talent — today.
              </p>

              <p>
                <span className="font-bold text-white">
                  No spam, no chaos — just a smooth, smart, and student-friendly experience.
                </span>
                <br />
                Because sometimes, all you need is the <span className="text-yellow font-bold">X-Factor</span> to your
                future.
              </p>
            </div>

            <div className="about-cta">
              <span className="cta-text">Ready to start your adventure? 🚀</span>
            </div>

            <div className="about-buttons">
              <Link to="/register" className="btn btn-primary btn-lg">
                Join InternX
              </Link>
              <Link to="/internships" className="btn btn-secondary btn-lg">
                Browse Internships
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
