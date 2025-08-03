'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        setIsLoading(false)
        return
      }

      // Set token in cookies manually using `document.cookie`
      document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}` // expires in 7 days

      // Store user data in localStorage for client-side access
      localStorage.setItem('currentUser', JSON.stringify(data.user))

      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push('/admin')
      } else if (data.user.role === 'company') {
        router.push('/company-portal')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('Network error. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg bg-gray-900 border-gray-800 shadow-2xl">
        <CardHeader className="text-center pb-8 pt-8">
          <CardTitle className="text-3xl font-bold text-cyan-400 mb-2">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400 text-lg">Sign in to your InternX account</CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6 px-8">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="email" className="text-gray-300 text-base font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 h-12 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-gray-300 text-base font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 h-12 text-base"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400"
                />
                <Label htmlFor="remember" className="text-sm text-gray-400">
                  Remember me
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300">
                Forgot password?
              </Link>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-6 px-8 pb-8">
            <Button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold h-12 text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-gray-400">Or</span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                  Create Account
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
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
