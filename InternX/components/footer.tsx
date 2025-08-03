import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Sparkles } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-lg blur opacity-30 animate-pulse"></div>
                <div className="relative bg-gray-900 px-3 py-1 rounded-lg border border-cyan-400/30">
                  <div className="flex items-center space-x-1">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                      Intern
                    </span>
                    <span className="text-xl font-bold text-yellow-400">X</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The X-Factor to Your Future. Connecting students with amazing internship opportunities and helping
              companies find tomorrow's talent.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/internships" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Browse Internships
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Partner Companies
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">For Students</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Student Login
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/career-tips" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Career Tips
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span className="text-sm">hello@internx.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-medium text-white mb-2">For Companies</h4>
              <Link
                href="/company-signup"
                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
              >
                Post Internships →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">© 2025 InternX. All rights reserved. Built with ❤️ for students.</div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
