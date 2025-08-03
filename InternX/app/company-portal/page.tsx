"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Building, MapPin, Clock, FileText, Users, CheckCircle, XCircle } from "lucide-react"

interface CompanyProfile {
  company_name: string
  website: string
  industry: string
  company_info: string
  logo_url: string
}

interface Internship {
  internship_id: number
  title: string
  description: string
  requirements: string
  type: string
  deadline: string
  salary: string
  status: string
  rating: number
}

interface Application {
  app_id: number
  student_name: string
  department: string
  major: string
  qualification: string
  contact_number1: string
  email1: string
  cgpa: number
  uni_name: string
  internship_title: string
  status: string
  apply_date: string
}

interface Notification {
  notif_id: number
  message: string
  sent_date: string
  is_read: boolean
}

export default function CompanyPortal() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [internships, setInternships] = useState<Internship[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    type: "",
    deadline: "",
    salary: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")
    if (!user || user.role !== "company") {
      router.push("/login")
      return
    }
    setCurrentUser(user)
    loadCompanyData()
  }, [router])

  const loadCompanyData = async () => {
    try {
      // Load internships
      const internshipsResponse = await fetch("/api/internships")
      if (internshipsResponse.ok) {
        const internshipsData = await internshipsResponse.json()
        setInternships(internshipsData)
      }

      // Load applications
      const applicationsResponse = await fetch("/api/company/applications")
      if (applicationsResponse.ok) {
        const applicationsData = await applicationsResponse.json()
        setApplications(applicationsData)
      }

      // Load notifications
      const notificationsResponse = await fetch("/api/notifications")
      if (notificationsResponse.ok) {
        const notificationsData = await notificationsResponse.json()
        setNotifications(notificationsData)
      }

      // Set profile from user data
      if (currentUser) {
        setProfile({
          company_name: currentUser.companyName || currentUser.name,
          website: "",
          industry: "",
          company_info: "",
          logo_url: "",
        })
      }
    } catch (error) {
      console.error("Failed to load company data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/internships/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        alert(data.message)
        setFormData({
          title: "",
          description: "",
          requirements: "",
          type: "",
          deadline: "",
          salary: "",
        })
        setShowForm(false)
        loadCompanyData() // Reload data
      } else {
        alert(data.error || "Failed to post internship")
      }
    } catch (error) {
      console.error("Post internship failed:", error)
      alert("Failed to post internship. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleApplicationAction = async (applicationId: number, status: string) => {
    try {
      const response = await fetch("/api/company/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applicationId, status }),
      })

      const data = await response.json()

      if (response.ok) {
        alert(data.message)
        loadCompanyData() // Reload data
      } else {
        alert(data.error || "Action failed")
      }
    } catch (error) {
      console.error("Application action failed:", error)
      alert("Action failed. Please try again.")
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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

  const pendingInternships = internships.filter((internship) => internship.status === "pending")
  const approvedInternships = internships.filter((internship) => internship.status === "approved")
  const pendingApplications = applications.filter((app) => app.status === "pending")
  const unreadNotifications = notifications.filter((notif) => !notif.is_read)

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            {profile?.logo_url && (
              <img
                src={profile.logo_url || "/placeholder.svg"}
                alt={profile.company_name}
                className="w-16 h-16 rounded-lg object-contain bg-white p-2"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">Company Portal</h1>
              <p className="text-gray-300">Welcome, {profile?.company_name || currentUser?.name}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post Internship
            </Button>
            <Button
              onClick={logout}
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Internships</CardTitle>
              <FileText className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{internships.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Approved</CardTitle>
              <Building className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{approvedInternships.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{pendingInternships.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Applications</CardTitle>
              <Users className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{applications.length}</div>
              <p className="text-xs text-gray-400">{pendingApplications.length} pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Post Internship Form */}
        {showForm && (
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Post New Internship</CardTitle>
              <CardDescription className="text-gray-400">Create a new internship opportunity</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300">
                      Job Title
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="e.g. Software Engineering Intern"
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-gray-300">
                      Type
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => handleChange("type", value)} required>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="onsite">On-site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline" className="text-gray-300">
                      Application Deadline
                    </Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleChange("deadline", e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary" className="text-gray-300">
                      Salary (Optional)
                    </Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => handleChange("salary", e.target.value)}
                      placeholder="e.g. 10k-15k BDT"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-300">
                    Job Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Describe the internship role and responsibilities..."
                    required
                    rows={4}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-gray-300">
                    Requirements
                  </Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => handleChange("requirements", e.target.value)}
                    placeholder="List the required skills and qualifications..."
                    required
                    rows={3}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
                  >
                    {isLoading ? "Posting..." : "Post Internship"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowForm(false)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="internships" className="space-y-4">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="internships" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              My Internships ({internships.length})
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
            >
              Applications ({applications.length})
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
            >
              Notifications ({unreadNotifications.length})
            </TabsTrigger>
          </TabsList>

          {/* Internships Tab */}
          <TabsContent value="internships" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Your Internships</CardTitle>
                <CardDescription className="text-gray-400">Manage your posted internships</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {internships.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No internships posted yet</p>
                ) : (
                  internships.map((internship) => (
                    <div key={internship.internship_id} className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-white">{internship.title}</h3>
                            <Badge className="bg-cyan-500/20 text-cyan-400">{internship.type}</Badge>
                            <Badge
                              className={
                                internship.status === "approved"
                                  ? "bg-green-500/20 text-green-400"
                                  : internship.status === "pending"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                              }
                            >
                              {internship.status}
                            </Badge>
                            {internship.rating && (
                              <Badge className="bg-yellow-500/20 text-yellow-400">
                                ⭐ {Number(internship.rating).toFixed(1)}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{internship.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {internship.type}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              Deadline: {new Date(internship.deadline).toLocaleDateString()}
                            </div>
                            {internship.salary && (
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-1" />
                                {internship.salary}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        <p>
                          <strong>Requirements:</strong> {internship.requirements}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Student Applications</CardTitle>
                <CardDescription className="text-gray-400">Review and manage student applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No applications received yet</p>
                ) : (
                  applications.map((application) => (
                    <div key={application.app_id} className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-white">{application.student_name}</h3>
                            <Badge className="bg-blue-500/20 text-blue-400">{application.department}</Badge>
                            <Badge
                              className={
                                application.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : application.status === "accepted"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                              }
                            >
                              {application.status}
                            </Badge>
                          </div>
                          <p className="text-cyan-400 text-sm mb-2">Applied for: {application.internship_title}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                            <div>
                              <p>Major: {application.major}</p>
                              <p>University: {application.uni_name}</p>
                              <p>CGPA: {application.cgpa}</p>
                            </div>
                            <div>
                              <p>Email: {application.email1}</p>
                              <p>Phone: {application.contact_number1}</p>
                              <p>Applied: {new Date(application.apply_date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          {application.qualification && (
                            <div className="mt-3">
                              <p className="text-sm text-gray-300">
                                <strong>Qualifications:</strong> {application.qualification}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      {application.status === "pending" && (
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={() => handleApplicationAction(application.app_id, "accepted")}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleApplicationAction(application.app_id, "rejected")}
                            size="sm"
                            variant="destructive"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Notifications</CardTitle>
                <CardDescription className="text-gray-400">Stay updated with your company activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.notif_id}
                      className={`p-4 rounded-lg ${
                        notification.is_read ? "bg-gray-800" : "bg-gray-700 border-l-4 border-cyan-400"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className={`${notification.is_read ? "text-gray-300" : "text-white"}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(notification.sent_date).toLocaleString()}
                          </p>
                        </div>
                        {!notification.is_read && <div className="w-2 h-2 bg-cyan-400 rounded-full ml-3 mt-2"></div>}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
