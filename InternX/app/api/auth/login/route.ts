import { type NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/db'
import { generateToken, verifyPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Get user from database
    const users = await executeQuery('SELECT * FROM users WHERE email = ?', [email])

    if (users.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const user = users[0]

    // Check if password is valid
    const isValidPassword = user.password === password || (await verifyPassword(password, user.password))

    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Additional user info based on role
    let userData = { ...user }

    if (user.role === 'student') {
      const students = await executeQuery('SELECT * FROM students WHERE user_id = ?', [user.user_id])
      if (students.length === 0 || students[0].status !== 'approved') {
        return NextResponse.json({ error: 'Account pending approval or not found' }, { status: 403 })
      }
      userData = { ...userData, ...students[0] }
    } else if (user.role === 'company') {
      const companies = await executeQuery('SELECT * FROM companies WHERE user_id = ?', [user.user_id])
      if (companies.length === 0 || companies[0].status !== 'approved') {
        return NextResponse.json({ error: 'Account pending approval or not found' }, { status: 403 })
      }
      userData = { ...userData, ...companies[0] }
    }

    // Generate token
    const token = generateToken(user.user_id, user.role, user.email)

    const response = NextResponse.json({
      user: {
        id: userData.user_id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        name:
          userData.role === 'student'
            ? userData.student_name
            : userData.role === 'company'
            ? userData.company_name
            : 'Admin',
        ...(userData.role === 'student' && { studentId: userData.student_id }),
        ...(userData.role === 'company' && { companyName: userData.company_name }),
      },
    })

    // Set HTTP-only cookie (same as with `js-cookie`, but here using native Next.js cookie handling)
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure secure flag for production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
