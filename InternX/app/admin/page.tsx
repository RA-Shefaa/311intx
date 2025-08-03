"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Building, FileText, CheckCircle, XCircle, UserCheck } from "lucide-react"

interface AdminData {
  pendingStudents: any[]
  pendingCompanies: any[]
  pendingInternships: any[]
  pendingApplications: any[]
  allStudents: any[]
  allCompanies: any[]
  allInternships: any[]
}

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")
    if (!user || user.role !== "admin") {
      router.push("/login")
      return
    }
    setCurrentUser(user)
    loadAdminData()
  }, [router])

  const loadAdminData = async () => {
    try {
      const response = await fetch("/api/admin")
      if (response.ok) {
        const data = await response.json()
        setAdminData(data)
      }
    } catch (error) {
      console.error("Failed to load admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (type: string, id: number, status: string) => {
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, id, status }),
      })

      if (response.ok) {
        loadAdminData() // Reload data
        alert(`${type} ${status} successfully!`)
      } else {
        alert("Action failed. Please try again.")
      }
    } catch (error) {
      console.error("Action failed:", error)
      alert("Action failed. Please try again.")
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      localStorage.removeItem("currentUser")
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!adminData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Failed to load admin data</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300">Welcome back, {currentUser?.name}</p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent"
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Pending Students</CardTitle>
              <Users className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{adminData.pendingStudents.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Pending Companies</CardTitle>
              <Building className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{adminData.pendingCompanies.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Pending Internships</CardTitle>
              <FileText className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{adminData.pendingInternships.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
              <UserCheck className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {adminData.allStudents.length + adminData.allCompanies.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="pending" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              Pending Approvals
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              All Students ({adminData.allStudents.length})
            </TabsTrigger>
            <TabsTrigger value="companies" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              All Companies ({adminData.allCompanies.length})
            </TabsTrigger>
            <TabsTrigger value="internships" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              All Internships ({adminData.allInternships.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Approvals */}
          <TabsContent value="pending" className="space-y-6">
            {/* Pending Students */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Pending Student Registrations</CardTitle>
                <CardDescription className="text-gray-400">
                  Review and approve new student registrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminData.pendingStudents.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No pending student registrations</p>
                ) : (
                  adminData.pendingStudents.map((student) => (
                    <div key={student.user_id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-white">{student.student_name}</h3>
                          <Badge className="bg-blue-500/20 text-blue-400">Student</Badge>
                        </div>
                        <p className="text-sm text-gray-400">
                          @{student.username} • {student.email}
                        </p>
                        <p className="text-sm text-gray-400">Student ID: {student.student_id}</p>
                        <p className="text-sm text-gray-400">Department: {student.department || "Not specified"}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAction("student", student.user_id, "approved")}
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleAction("student", student.user_id, "rejected")}
                          size="sm"
                          variant="destructive"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Pending Companies */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Pending Company Registrations</CardTitle>
                <CardDescription className="text-gray-400">
                  Review and approve new company registrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminData.pendingCompanies.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No pending company registrations</p>
                ) : (
                  adminData.pendingCompanies.map((company) => (
                    <div key={company.user_id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-white">{company.company_name}</h3>
                          <Badge className="bg-green-500/20 text-green-400">Company</Badge>
                        </div>
                        <p className="text-sm text-gray-400">
                          @{company.username} • {company.email}
                        </p>
                        <p className="text-sm text-gray-400">Industry: {company.industry || "Not specified"}</p>
                        {company.website && <p className="text-sm text-gray-400">Website: {company.website}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAction("company", company.user_id, "approved")}
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleAction("company", company.user_id, "rejected")}
                          size="sm"
                          variant="destructive"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Pending Internships */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Pending Internship Approvals</CardTitle>
                <CardDescription className="text-gray-400">Review and approve internship postings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminData.pendingInternships.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No pending internship approvals</p>
                ) : (
                  adminData.pendingInternships.map((internship) => (
                    <div
                      key={internship.internship_id}
                      className="flex items-start justify-between p-4 bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-white">{internship.title}</h3>
                          <Badge className="bg-cyan-500/20 text-cyan-400">{internship.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          {internship.company_name} • Deadline: {new Date(internship.deadline).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-300 mb-2">{internship.description}</p>
                        <p className="text-sm text-gray-400">Requirements: {internship.requirements}</p>
                        {internship.salary && <p className="text-sm text-gray-400">Salary: {internship.salary}</p>}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => handleAction("internship", internship.internship_id, "approved")}
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleAction("internship", internship.internship_id, "rejected")}
                          size="sm"
                          variant="destructive"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Students */}
          <TabsContent value="students" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">All Students</CardTitle>
                <CardDescription className="text-gray-400">
                  View all approved students and their profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminData.allStudents.map((student) => (
                  <div key={student.user_id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-white">{student.student_name}</h3>
                        <Badge className="bg-blue-500/20 text-blue-400">{student.department}</Badge>
                        <Badge className="bg-green-500/20 text-green-400">Approved</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                      <div>
                        <p>Email: {student.email}</p>
                        <p>Student ID: {student.student_id}</p>
                        <p>Major: {student.major || "Not specified"}</p>
                      </div>
                      <div>
                        <p>University: {student.uni_name || "Not specified"}</p>
                        <p>CGPA: {student.cgpa || "Not specified"}</p>
                        <p>Semester: {student.current_semester || "Not specified"}</p>
                      </div>
                    </div>
                    {student.qualification && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-300">
                          <strong>Qualifications:</strong> {student.qualification}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Companies */}
          <TabsContent value="companies" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">All Companies</CardTitle>
                <CardDescription className="text-gray-400">
                  View all approved companies and their profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminData.allCompanies.map((company) => (
                  <div key={company.user_id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {company.logo_url && (
                          <img
                            src={company.logo_url || "/placeholder.svg"}
                            alt={company.company_name}
                            className="w-10 h-10 rounded-lg object-contain bg-white p-1"
                          />
                        )}
                        <h3 className="font-medium text-white">{company.company_name}</h3>
                        <Badge className="bg-green-500/20 text-green-400">{company.industry}</Badge>
                        <Badge className="bg-yellow-500/20 text-yellow-400">
                          ⭐ {Number(company.avg_rating).toFixed(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                      <div>
                        <p>Email: {company.email}</p>
                        <p>Website: {company.website || "Not specified"}</p>
                        <p>Total Internships: {company.total_internships}</p>
                      </div>
                      <div>
                        <p>Industry: {company.industry}</p>
                        <p>Average Rating: {Number(company.avg_rating).toFixed(1)}/5.0</p>
                        <p>Status: Approved</p>
                      </div>
                    </div>
                    {company.company_info && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-300">
                          <strong>About:</strong> {company.company_info}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Internships */}
          <TabsContent value="internships" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">All Internships</CardTitle>
                <CardDescription className="text-gray-400">
                  View all approved internships and applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminData.allInternships.map((internship) => (
                  <div key={internship.internship_id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-white">{internship.title}</h3>
                        <Badge className="bg-cyan-500/20 text-cyan-400">{internship.type}</Badge>
                        <Badge className="bg-green-500/20 text-green-400">Approved</Badge>
                        {internship.rating && (
                          <Badge className="bg-yellow-500/20 text-yellow-400">
                            ⭐ {Number(internship.rating).toFixed(1)}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400 mb-3">
                      <div>
                        <p>Company: {internship.company_name}</p>
                        <p>Type: {internship.type}</p>
                        <p>Deadline: {new Date(internship.deadline).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p>Total Applications: {internship.total_applications}</p>
                        <p>Accepted: {internship.accepted_applications}</p>
                        <p>Salary: {internship.salary || "Not specified"}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      <strong>Description:</strong> {internship.description}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Requirements:</strong> {internship.requirements}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
