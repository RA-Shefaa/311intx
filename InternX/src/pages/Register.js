"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Register.css"

function Register() {
  const [formData, setFormData] = useState({
    role: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentID: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Simulate registration logic
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    users.push({
      ...formData,
      approved: false,
    })
    localStorage.setItem("users", JSON.stringify(users))

    alert(`Registration submitted for ${formData.username} as ${formData.role}. Awaiting admin approval.`)
    navigate("/login")
    setIsLoading(false)
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1 className="register-title">Register</h1>
            <p className="register-subtitle">Create your InternX account</p>
          </div>

          <form onSubmit={handleRegister} className="register-form">
            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="company">Company</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            {formData.role === "student" && (
              <div className="form-group">
                <label htmlFor="studentID" className="form-label">
                  University ID
                </label>
                <input
                  id="studentID"
                  name="studentID"
                  type="text"
                  placeholder="University ID"
                  value={formData.studentID}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="register-footer">
            <p className="login-text">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
