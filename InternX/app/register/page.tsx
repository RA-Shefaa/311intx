"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Register() {
  const [formData, setFormData] = useState({
    role: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentID: "",
    companyName: "",
    website: "",
    industry: "",
    companyInfo: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
        setIsLoading(false)
        return
      }

      alert(data.message)
      router.push("/login")
    } catch (error) {
      setError("Network error. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-800 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-cyan-400">Create Account</CardTitle>
          <CardDescription className="text-gray-400 text-lg">Join InternX today</CardDescription>
        </CardHeader>

        <form onSubmit={handleRegister}>
          <CardContent className="space-y-6 px-8">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-300 text-base font-medium">
                I am a
              </Label>
              <Select value={formData.role} onValueChange={(value) => handleChange("role", value)} required>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="student" className="text-white hover:bg-gray-700">
                    Student
                  </SelectItem>
                  <SelectItem value="company" className="text-white hover:bg-gray-700">
                    Company
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-300 text-base font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-300 text-base font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300 text-base font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 text-base font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 h-12"
              />
            </div>

            {formData.role === "student" && (
              <div className="space-y-2">
                <Label htmlFor="studentID" className="text-gray-300 text-base font-medium">
                  Student ID
                </Label>
                <Input
                  id="studentID"
                  type="text"
                  placeholder="Enter your student ID"
                  value={formData.studentID}
                  onChange={(e) => handleChange("studentID", e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 h-12"
                />
              </div>
            )}

            {formData.role === "company" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-gray-300 text-base font-medium">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 h-12"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-gray-300 text-base font-medium">
                      Website (Optional)
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourcompany.com"
                      value={formData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-gray-300 text-base font-medium">
                      Industry (Optional)
                    </Label>
                    <Input
                      id="industry"
                      type="text"
                      placeholder="e.g., Technology, Finance"
                      value={formData.industry}
                      onChange={(e) => handleChange("industry", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyInfo" className="text-gray-300 text-base font-medium">
                    Company Description (Optional)
                  </Label>
                  <Textarea
                    id="companyInfo"
                    placeholder="Tell us about your company..."
                    value={formData.companyInfo}
                    onChange={(e) => handleChange("companyInfo", e.target.value)}
                    rows={3}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400"
                  />
                </div>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 text-base font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300 text-base font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 h-12"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-6 px-8 pb-8">
            <Button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold h-12 text-base"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center space-y-4">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                  Sign In
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
