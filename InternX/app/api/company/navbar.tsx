'use client'

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function CompanyNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")
    setCurrentUser(user)
  }, [])

  const logout = () => {
    fetch("/api/auth/logout", { method: "POST" })
      .then(() => {
        localStorage.removeItem("currentUser")
        setCurrentUser(null)
        window.location.href = "/login"
      })
      .catch((error) => {
        console.error("Logout failed:", error)
      })
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/90">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <div className="relative bg-black px-3 py-1 rounded-lg border border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-300">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-bold text-cyan-400">InternX</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Company Dropdown */}
        <div className="relative group">
          <button className="flex items-center space-x-1 text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400 focus:outline-none py-2">
            <span>Companies</span>
            <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 duration-200" />
          </button>

          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-1 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
            <div className="p-2">
              {currentUser?.role === "company" && (
                <Link
                  href="/company/dashboard/profile"
                  className="flex items-center px-3 py-3 rounded-md text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-all duration-150"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">Company Profile</div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Welcome, {currentUser.name}</span>
              <Button onClick={logout} variant="ghost" className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800">
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
