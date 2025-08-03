import { type NextRequest, NextResponse } from "next/server"
import { executeQuery, createNotification } from "@/lib/db"
import { getUserFromRequest, requireStudent } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Get user from the request (via token)
    const user = await getUserFromRequest(request)
    requireStudent(user)

    const { internshipId } = await request.json()

    if (!internshipId) {
      return NextResponse.json({ error: "Internship ID is required" }, { status: 400 })
    }

    // Get student details
    const students = await executeQuery("SELECT * FROM students WHERE user_id = ?", [user.userId])
    if (students.length === 0) {
      return NextResponse.json({ error: "Student profile not found" }, { status: 404 })
    }

    const student = students[0]

    // Check if the student has already applied
    const existingApplication = await executeQuery(
      "SELECT * FROM applications WHERE student_id = ? AND internship_id = ?",
      [student.student_id, internshipId]
    )

    if (existingApplication.length > 0) {
      return NextResponse.json({ error: "You have already applied for this internship" }, { status: 400 })
    }

    // Get internship details
    const internships = await executeQuery(
      `
      SELECT i.*, c.company_name, c.user_id as company_user_id
      FROM internships i
      JOIN companies c ON i.company_id = c.user_id
      WHERE i.internship_id = ?`,
      [internshipId]
    )

    if (internships.length === 0) {
      return NextResponse.json({ error: "Internship not found" }, { status: 404 })
    }

    const internship = internships[0]

    // Create application
    await executeQuery(
      "INSERT INTO applications (student_id, internship_id, apply_date, status) VALUES (?, ?, CURDATE(), 'pending')",
      [student.student_id, internshipId]
    )

    // Notify student and company
    await createNotification(user.userId, `Your application for "${internship.title}" has been submitted.`)
    await createNotification(
      internship.company_user_id,
      `New application received from ${student.student_name} for ${internship.title}.`
    )

    return NextResponse.json({ message: "Application submitted successfully!" })
  } catch (error) {
    console.error("Apply internship error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
