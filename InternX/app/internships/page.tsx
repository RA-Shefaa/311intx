'use client'

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'

export default function InternshipsPage() {
  const [internships, setInternships] = useState<any[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchInternships = async () => {
      const response = await fetch("/api/internships")
      const data = await response.json()
      setInternships(data)
    }
    fetchInternships()

    // Check if user is logged in and get user ID from localStorage
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))
    const currentUser = localStorage.getItem('currentUser')
    if (token && currentUser) {
      setIsLoggedIn(true)
      setUserId(JSON.parse(currentUser).id)
    }
  }, [])

  const handleApply = async (internshipId: string) => {
    if (!userId) {
      router.push('/login')
      return
    }

    // Apply for the internship
    const response = await fetch('/api/internships/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ internshipId, userId })
    })

    const data = await response.json()
    if (response.ok) {
      alert('Application submitted successfully!')
    } else {
      alert(data.error || 'Error submitting application')
    }
  }

  return (
    <div>
      <h2>Internships</h2>
      {internships.map((internship) => (
        <div key={internship.id}>
          <h3>{internship.title}</h3>
          <p>{internship.description}</p>

          <div>
            <span>{internship.company_name}</span>
            <span>{internship.requirements}</span>

            {/* Only show salary and dates if logged in */}
            {isLoggedIn ? (
              <>
                <p>Salary: {internship.salary}</p>
                <p>Deadline: {internship.deadline}</p>
                <button onClick={() => handleApply(internship.id)}>Apply</button>
              </>
            ) : (
              <p>Log in to apply for this internship</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
