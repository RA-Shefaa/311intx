import { type NextRequest, NextResponse } from "next/server"
import { getStudentApplications } from "@/lib/db"
import { getUserFromRequest, requireStudent } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    requireStudent(user)

    // Get student ID
    const { executeQuery } = await import("@/lib/db")
    const students = await executeQuery("SELECT student_id FROM students WHERE user_id = ?", [user.userId])

    if (students.length === 0) {
      return NextResponse.json({ error: "Student profile not found" }, { status: 404 })
    }

    const applications = await getStudentApplications(students[0].student_id)
    return NextResponse.json(applications)
  } catch (error) {
    console.error("Get student applications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
