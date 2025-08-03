'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CompanyProfilePage() {
  const [company, setCompany] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isCompany, setIsCompany] = useState(false) // Check if logged-in user is a company
  const router = useRouter()

  // Fetch company profile data
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      const response = await fetch('/api/company/profile')
      const data = await response.json()
      setCompany(data)
    }
    fetchCompanyProfile()

    // Check if user is logged in and if they are a company
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (user) {
      setIsLoggedIn(true)
      if (user.role === 'company') {
        setIsCompany(true)
      }
    }
  }, [])

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    router.push('/login')
    return null
  }

  // Handle form submission to update company profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch('/api/company/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(company),
    })

    if (response.ok) {
      alert('Profile updated successfully!')
    } else {
      alert('Error updating profile')
    }
  }

  if (!company) return <div>Loading...</div>

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Company Profile</h2>
      <p className="mt-4">{company.company_name}</p>
      <p className="mt-2">{company.website}</p>
      <img src={company.logo_url} alt={company.company_name} className="w-40 h-40 object-contain" />

      {isCompany && (
        <div className="mt-6">
          <h3 className="text-xl">Edit Profile</h3>
          <form onSubmit={handleSubmit}>
            <label className="block">Company Name:</label>
            <input
              type="text"
              value={company.company_name}
              onChange={(e) => setCompany({ ...company, company_name: e.target.value })}
              className="input"
            />

            <label className="block">Website:</label>
            <input
              type="text"
              value={company.website}
              onChange={(e) => setCompany({ ...company, website: e.target.value })}
              className="input"
            />

            <label className="block">Logo URL:</label>
            <input
              type="text"
              value={company.logo_url}
              onChange={(e) => setCompany({ ...company, logo_url: e.target.value })}
              className="input"
            />

            <button type="submit" className="mt-4">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  )
}
