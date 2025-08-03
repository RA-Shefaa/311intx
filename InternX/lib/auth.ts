import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Generate JWT token
export function generateToken(userId: number, role: string, email: string): string {
  const payload = {
    userId,
    role,
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
  }

  return jwt.sign(payload, JWT_SECRET)
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Extract user from request headers
export function getUserFromRequest(request: Request): any {
  const authHeader = request.headers.get("authorization")
  const cookieHeader = request.headers.get("cookie")

  let token = null

  // Try to get token from Authorization header
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7)
  }

  // Try to get token from cookies
  if (!token && cookieHeader) {
    const cookies = cookieHeader.split(";").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split("=")
        acc[key] = value
        return acc
      },
      {} as Record<string, string>,
    )

    token = cookies.token
  }

  if (!token) return null

  return verifyToken(token)
}

// Middleware functions
export function requireAdmin(user: any) {
  if (!user || user.role !== "admin") {
    throw new Error("Admin access required")
  }
}

export function requireCompany(user: any) {
  if (!user || user.role !== "company") {
    throw new Error("Company access required")
  }
}

export function requireStudent(user: any) {
  if (!user || user.role !== "student") {
    throw new Error("Student access required")
  }
}
