"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Briefcase, Building, TrendingUp, Bell, GraduationCap, MapPin, Calendar, Clock } from "lucide-react"

interface StudentProfile {
  student_name: string
  student_id: string
  department: string
  major: string
  qualification: string
  uni_name: string
  cgpa: number
  current_semester: number
  dob: string
  age: number
  father_name: string
  mother_name: string
  contact_number1: string
  email1: string
  present_city: string
  present_district: string
}

interface Application {
  app_id: number
  internship_id: number
  title: string
  description: string
  company_name: string
  logo_url: string
  status: string
  apply_date: string
  salary: string
  type: string
  deadline: string
}

interface Notification {
  notif_id: number
  message: string
  sent_date: string
  is_read: boolean
}

export default function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [internships, setInternships] = useState<any[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")
    if (!user || user.role !== "student") {
      router.push("/login")
      return
    }
    setCurrentUser(user)
    loadStudentData()
  }, [router])

  const loadStudentData = async () => {
    try {
      // Load profile
      const profileResponse = await fetch("/api/student/profile")
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        setProfile(profileData)
      }

      // Load applications
      const applicationsResponse = await fetch("/api/student/applications")
      if (applicationsResponse.ok) {
        const applicationsData = await applicationsResponse.json()
        setApplications(applicationsData)
      }

      // Load internships
      const internshipsResponse = await fetch("/api/internships")
      if (internshipsResponse.ok) {
        const internshipsData = await internshipsResponse.json()
        setInternships(internshipsData)
      }

      // Load notifications
      const notificationsResponse = await fetch("/api/notifications")
      if (notificationsResponse.ok) {
        const notificationsData = await notificationsResponse.json()
        setNotifications(notificationsData)
      }
    } catch (error) {
      console.error("Failed to load student data:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyToInternship = async (internshipId: number) => {
    try {
      const response = await fetch("/api/internships/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ internshipId }),
      })

      const data = await response.json()

      if (response.ok) {
        alert(data.message)
        loadStudentData() // Reload data
      } else {
        alert(data.error || "Application failed")
      }
    } catch (error) {
      console.error("Apply failed:", error)
      alert("Application failed. Please try again.")
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

  const pendingApplications = applications.filter((app) => app.status === "pending")
  const acceptedApplications = applications.filter((app) => app.status === "accepted")
  const unreadNotifications = notifications.filter((notif) => !notif.is_read)

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, <span className="text-cyan-400">{profile?.student_name || currentUser?.name}</span>!
            </h1>
            <p className="text-gray-300">Here's what's happening with your internship journey</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{applications.length}</div>
              <p className="text-xs text-gray-400">{pendingApplications.length} pending</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Accepted</CardTitle>
              <User className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{acceptedApplications.length}</div>
              <p className="text-xs text-gray-400">Congratulations!</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Available Jobs</CardTitle>
              <Building className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{internships.length}</div>
              <p className="text-xs text-gray-400">Ready to apply</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{unreadNotifications.length}</div>
              <p className="text-xs text-gray-400">Unread messages</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="profile" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              My Profile
            </TabsTrigger>
            <TabsTrigger value="internships" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              Available Internships
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
            >
              My Applications
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
            >
              Notifications ({unreadNotifications.length})
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {profile && (
              <>
                {/* Basic Profile */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <User className="h-5 w-5 mr-2 text-cyan-400" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Full Name</p>
                        <p className="text-white font-medium">{profile.student_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Student ID</p>
                        <p className="text-white font-medium">{profile.student_id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Department</p>
                        <p className="text-white font-medium">{profile.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Major</p>
                        <p className="text-white font-medium">{profile.major}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Age</p>
                        <p className="text-white font-medium">{profile.age} years old</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Contact</p>
                        <p className="text-white font-medium">{profile.contact_number1}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white font-medium">{profile.email1}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="text-white font-medium">
                          {profile.present_city}, {profile.present_district}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Educational Information */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-cyan-400" />
                      Educational Background
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">University</p>
                        <p className="text-white font-medium">{profile.uni_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Current CGPA</p>
                        <p className="text-white font-medium">{profile.cgpa}/4.00</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Current Semester</p>
                        <p className="text-white font-medium">{profile.current_semester}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Father's Name</p>
                        <p className="text-white font-medium">{profile.father_name}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Qualifications */}
                {profile.qualification && (
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-cyan-400" />
                        Qualifications & Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">{profile.qualification}</p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          {/* Internships Tab */}
          <TabsContent value="internships" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Available Internships</CardTitle>
                <CardDescription className="text-gray-400">
                  Browse and apply to internship opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {internships.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No internships available at the moment</p>
                ) : (
                  internships.map((internship) => {
                    const hasApplied = applications.some((app) => app.internship_id === internship.internship_id)
                    return (
                      <div key={internship.internship_id} className="p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {internship.logo_url && (
                              <img
                                src={internship.logo_url || "/placeholder.svg"}
                                alt={internship.company_name}
                                className="w-12 h-12 rounded-lg object-contain bg-white p-1"
                              />
                            )}
                            <div>
                              <h3 className="font-medium text-white text-lg">{internship.title}</h3>
                              <p className="text-cyan-400 font-medium">{internship.company_name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-cyan-500/20 text-cyan-400">{internship.type}</Badge>
                            {internship.rating && (
                              <Badge className="bg-yellow-500/20 text-yellow-400">
                                ⭐ {Number(internship.rating).toFixed(1)}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-300 mb-3">{internship.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div className="flex items-center text-gray-400">
                            <MapPin className="h-4 w-4 mr-2 text-cyan-400" />
                            <span>{internship.type}</span>
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
                            <span>Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Clock className="h-4 w-4 mr-2 text-cyan-400" />
                            <span>Salary: {internship.salary}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-400 mb-1">Requirements:</p>
                          <p className="text-sm text-gray-300">{internship.requirements}</p>
                        </div>

                        <Button
                          onClick={() => applyToInternship(internship.internship_id)}
                          disabled={hasApplied}
                          className={
                            hasApplied
                              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                              : "bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
                          }
                        >
                          {hasApplied ? "Already Applied" : "Apply Now"}
                        </Button>
                      </div>
                    )
                  })
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">My Applications</CardTitle>
                <CardDescription className="text-gray-400">Track your internship applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No applications yet</p>
                ) : (
                  applications.map((application) => (
                    <div key={application.app_id} className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {application.logo_url && (
                            <img
                              src={application.logo_url || "/placeholder.svg"}
                              alt={application.company_name}
                              className="w-10 h-10 rounded-lg object-contain bg-white p-1"
                            />
                          )}
                          <div>
                            <h3 className="font-medium text-white">{application.title}</h3>
                            <p className="text-cyan-400 text-sm">{application.company_name}</p>
                          </div>
                        </div>
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

                      <p className="text-gray-300 text-sm mb-3">{application.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                        <div>Applied: {new Date(application.apply_date).toLocaleDateString()}</div>
                        <div>Type: {application.type}</div>
                        <div>Salary: {application.salary}</div>
                      </div>
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
                <CardDescription className="text-gray-400">Stay updated with your application status</CardDescription>
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
