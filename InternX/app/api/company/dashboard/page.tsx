'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CompanyDashboard() {
  const [applications, setApplications] = useState<any[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Fetch applications for the company
    const fetchApplications = async () => {
      const response = await fetch("/api/company/applications")  // Fetch company-specific applications
      const data = await response.json()
      setApplications(data)
    }
    fetchApplications()

    // Check if the company is logged in
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleAccept = async (applicationId: string) => {
    // Accept the application (send a request to your API)
    const response = await fetch(`/api/company/accept-application/${applicationId}`, {
      method: 'POST'
    })
    const data = await response.json()
    if (response.ok) {
      alert('Application accepted!')
      setApplications(applications.filter((app) => app.id !== applicationId)) // Remove from the list
    } else {
      alert(data.error || 'Error accepting application')
    }
  }

  const handleReject = async (applicationId: string) => {
    // Reject the application
    const response = await fetch(`/api/company/reject-application/${applicationId}`, {
      method: 'POST'
    })
    const data = await response.json()
    if (response.ok) {
      alert('Application rejected!')
      setApplications(applications.filter((app) => app.id !== applicationId)) // Remove from the list
    } else {
      alert(data.error || 'Error rejecting application')
    }
  }

  if (!isLoggedIn) {
    router.push('/login') // Redirect to login page if not logged in
    return null
  }

  return (
    <div>
      <h2>Applications</h2>
      {applications.map((application) => (
        <div key={application.id}>
          <h3>{application.student_name}</h3>
          <p>{application.internship_title}</p>
          <button onClick={() => handleAccept(application.id)}>Accept</button>
          <button onClick={() => handleReject(application.id)}>Reject</button>
        </div>
      ))}
    </div>
  )
}
