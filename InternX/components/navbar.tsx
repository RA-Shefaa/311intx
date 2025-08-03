"use client"

import { ChevronDown, Menu, Building2, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const companies = [
  { id: "2", name: "Unilever", industry: "FMCG", logo: "/logos/unilever.png" },
  { id: "3", name: "ACI PLC", industry: "Pharmaceuticals", logo: "/logos/aci-plc.png" },
  { id: "4", name: "Nestlé", industry: "Food & Beverages", logo: "/logos/nestle.png" },
  { id: "5", name: "BRAC", industry: "Development", logo: "/logos/brac.png" },
  { id: "6", name: "Marico", industry: "Consumer Goods", logo: "/logos/marico.png" },
]

export default function Navbar() {
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
        {/* Enhanced Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            {/* Animated background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-lg blur opacity-30 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></div>

            {/* Logo container */}
            <div className="relative bg-black px-3 py-1 rounded-lg border border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-300">
              <div className="flex items-center space-x-1">
                <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent tracking-wide group-hover:scale-105 transition-transform duration-300">
                  Intern
                </span>
                <span className="text-2xl font-bold text-yellow-400 group-hover:rotate-12 transition-transform duration-300 inline-block">
                  X
                </span>
              </div>
            </div>

            {/* Floating particles effect */}
            <div
              className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-300 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400">
            Home
          </Link>

          <Link href="/internships" className="text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400">
            Internships
          </Link>

          {/* Company Dropdown - Hover Trigger */}
          <div className="relative group">
            <button className="flex items-center space-x-1 text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400 focus:outline-none py-2">
              <span>Companies</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 duration-200" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-1 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div className="p-2">
                <div className="text-xs font-medium text-cyan-400 uppercase tracking-wide px-3 py-2 mb-1">
                  Featured Companies
                </div>
                {companies.map((company) => (
                  <Link
                    key={company.id}
                    href={`/company/${company.id}`}
                    className="flex items-center px-3 py-3 rounded-md text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-all duration-150 group/item"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 border border-cyan-400/30 group-hover/item:border-cyan-400/60 transition-colors overflow-hidden">
                      <img
                        src={company.logo || "/placeholder.svg"}
                        alt={company.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{company.name}</div>
                      <div className="text-xs text-gray-400">{company.industry}</div>
                    </div>
                    <div className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                      <ChevronDown className="h-4 w-4 rotate-[-90deg] text-cyan-400" />
                    </div>
                  </Link>
                ))}
                <div className="border-t border-gray-700 mt-2 pt-2">
                  <Link
                    href="/companies"
                    className="flex items-center justify-center px-3 py-2 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 rounded-md transition-colors"
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    View All Companies
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/about" className="text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400">
            About
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Welcome, {currentUser.name}</span>
              {currentUser.role === "admin" && (
                <Button asChild variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800">
                  <Link href="/admin">Admin Panel</Link>
                </Button>
              )}
              {currentUser.role === "company" && (
                <Button asChild variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800">
                  <Link href="/company-portal">Company Portal</Link>
                </Button>
              )}
              {currentUser.role === "student" && (
                <Button asChild variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              )}
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

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black border-gray-800">
            <div className="flex flex-col space-y-4 mt-6">
              <Link
                href="/"
                className="text-lg font-medium text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/internships"
                className="text-lg font-medium text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Internships
              </Link>

              {/* Mobile Company Links */}
              <div className="space-y-2">
                <span className="text-lg font-medium text-gray-400">Companies</span>
                <div className="pl-4 space-y-3">
                  {companies.map((company) => (
                    <Link
                      key={company.id}
                      href={`/company/${company.id}`}
                      className="flex items-center text-sm text-gray-300 hover:text-cyan-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 border border-cyan-400/30 overflow-hidden">
                        <img
                          src={company.logo || "/placeholder.svg"}
                          alt={company.name}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <div className="text-xs text-gray-400">{company.industry}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/companies"
                  className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors pl-4 pt-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  View All Companies
                </Link>
              </div>

              <Link
                href="/about"
                className="text-lg font-medium text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                {currentUser ? (
                  <>
                    <div className="text-sm text-gray-300 mb-2">Welcome, {currentUser.name}</div>
                    {currentUser.role === "admin" && (
                      <Button
                        asChild
                        variant="ghost"
                        className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 justify-start"
                      >
                        <Link href="/admin" onClick={() => setIsOpen(false)}>
                          Admin Panel
                        </Link>
                      </Button>
                    )}
                    {currentUser.role === "company" && (
                      <Button
                        asChild
                        variant="ghost"
                        className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 justify-start"
                      >
                        <Link href="/company-portal" onClick={() => setIsOpen(false)}>
                          Company Portal
                        </Link>
                      </Button>
                    )}
                    {currentUser.role === "student" && (
                      <Button
                        asChild
                        variant="ghost"
                        className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 justify-start"
                      >
                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                          Dashboard
                        </Link>
                      </Button>
                    )}
                    <Button
                      onClick={logout}
                      variant="ghost"
                      className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 justify-start"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      asChild
                      className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 justify-start"
                    >
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium">
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Register
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
