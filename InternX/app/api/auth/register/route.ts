import { type NextRequest, NextResponse } from "next/server"
import { executeQuery, createNotification } from "@/lib/db"
import { hashPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const {
      role,
      firstName,
      lastName,
      username,
      email,
      password,
      studentID,
      companyName,
      website,
      industry,
      companyInfo,
    } = formData

    // Validate required fields
    if (!role || !firstName || !lastName || !username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUsers = await executeQuery("SELECT * FROM users WHERE email = ? OR username = ?", [email, username])

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "User with this email or username already exists" }, { status: 400 })
    }

    // Hash password (for new registrations)
    const hashedPassword = await hashPassword(password)

    // Insert into users table
    const userResult = (await executeQuery("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)", [
      username,
      hashedPassword,
      email,
      role,
    ])) as any

    const userId = userResult.insertId

    // Insert into role-specific table
    if (role === "student") {
      if (!studentID) {
        return NextResponse.json({ error: "Student ID is required" }, { status: 400 })
      }

      await executeQuery("INSERT INTO students (user_id, student_name, student_id, status) VALUES (?, ?, ?, ?)", [
        userId,
        `${firstName} ${lastName}`,
        studentID,
        "pending",
      ])

      // Notify admin
      await createNotification(1, `New student registered: ${firstName} ${lastName}`)
    } else if (role === "company") {
      if (!companyName) {
        return NextResponse.json({ error: "Company name is required" }, { status: 400 })
      }

      await executeQuery(
        "INSERT INTO companies (user_id, company_name, website, industry, company_info, status) VALUES (?, ?, ?, ?, ?, ?)",
        [userId, companyName, website || null, industry || null, companyInfo || null, "pending"],
      )

      // Notify admin
      await createNotification(1, `New company registered: ${companyName}`)
    }

    return NextResponse.json({
      message: "Registration successful! Your account is pending admin approval.",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
