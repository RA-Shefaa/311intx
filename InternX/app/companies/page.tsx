"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, Star, Briefcase } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Company {
  user_id: number
  company_name: string
  industry: string
  company_info: string
  website: string
  logo_url: string
  total_internships: number
  avg_rating: number
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    try {
      const response = await fetch("/api/companies")
      if (response.ok) {
        const data = await response.json()
        setCompanies(data)
      }
    } catch (error) {
      console.error("Failed to load companies:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading companies...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Partner <span className="text-cyan-400">Companies</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover amazing companies offering internship opportunities, ranked by their ratings
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-400">No companies available at the moment.</p>
            </div>
          ) : (
            companies.map((company) => (
              <Card
                key={company.user_id}
                className="bg-gray-900 border-gray-800 hover:border-cyan-400 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-4 border border-cyan-400/30 overflow-hidden">
                      {company.logo_url ? (
                        <img
                          src={company.logo_url || "/placeholder.svg"}
                          alt={company.company_name}
                          className="w-14 h-14 object-contain"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-cyan-400">{company.company_name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-white">{company.company_name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-400">
                          {company.industry}
                        </Badge>
                        {company.avg_rating > 0 && (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400">
                            <Star className="h-3 w-3 mr-1" />
                            {Number(company.avg_rating).toFixed(1)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-300">{company.company_info}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {company.website && (
                    <div className="flex items-center text-gray-300">
                      <Building2 className="h-4 w-4 mr-2 text-cyan-400" />
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}

                  <div className="flex items-center text-gray-300">
                    <Briefcase className="h-4 w-4 mr-2 text-cyan-400" />
                    <span>
                      {company.total_internships} internship{company.total_internships !== 1 ? "s" : ""} available
                    </span>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <Users className="h-4 w-4 mr-2 text-cyan-400" />
                    <span>Industry: {company.industry}</span>
                  </div>

                  {company.avg_rating > 0 && (
                    <div className="flex items-center text-gray-300">
                      <Star className="h-4 w-4 mr-2 text-yellow-400" />
                      <span>Average Rating: {Number(company.avg_rating).toFixed(1)}/5.0</span>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button asChild className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-medium">
                    <Link href={`/company/${company.user_id}`}>View Profile</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent"
                  >
                    <Link href="/internships">View Jobs</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
