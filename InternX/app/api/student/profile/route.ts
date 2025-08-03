import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { getUserFromRequest, requireStudent } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    requireStudent(user)

    // Get student profile with personal and educational data
    const profile = await executeQuery(
      `
      SELECT s.*, sp.*, se.*
      FROM students s
      LEFT JOIN student_personal sp ON s.student_id = sp.student_id
      LEFT JOIN student_education se ON s.student_id = se.student_id
      WHERE s.user_id = ?
    `,
      [user.userId],
    )

    if (profile.length === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json(profile[0])
  } catch (error) {
    console.error("Get student profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
