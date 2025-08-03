import { type NextRequest, NextResponse } from "next/server"
import { executeQuery, createNotification } from "@/lib/db"
import { getUserFromRequest, requireCompany } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    requireCompany(user)

    // Get applications for company's internships
    const applications = await executeQuery(
      `
      SELECT a.*, s.student_name, s.department, s.major, s.qualification,
             i.title as internship_title, i.description,
             sp.contact_number1, sp.email1, se.cgpa, se.uni_name
      FROM applications a
      JOIN students s ON a.student_id = s.student_id
      JOIN internships i ON a.internship_id = i.internship_id
      LEFT JOIN student_personal sp ON s.student_id = sp.student_id
      LEFT JOIN student_education se ON s.student_id = se.student_id
      WHERE i.company_id = ?
      ORDER BY a.apply_date DESC
    `,
      [user.userId],
    )

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Get company applications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    requireCompany(user)

    const { applicationId, status } = await request.json()

    if (!applicationId || !status) {
      return NextResponse.json({ error: "Application ID and status are required" }, { status: 400 })
    }

    // Update application status
    await executeQuery("UPDATE applications SET status = ? WHERE app_id = ?", [status, applicationId])

    // Get application details for notification
    const application = await executeQuery(
      `
      SELECT a.*, s.user_id, s.student_name, i.title, c.company_name
      FROM applications a
      JOIN students s ON a.student_id = s.student_id
      JOIN internships i ON a.internship_id = i.internship_id
      JOIN companies c ON i.company_id = c.user_id
      WHERE a.app_id = ?
    `,
      [applicationId],
    )

    if (application.length > 0) {
      const app = application[0]
      await createNotification(
        app.user_id,
        `Your application for "${app.title}" at ${app.company_name} has been ${status}.`,
      )
    }

    return NextResponse.json({ message: `Application ${status} successfully` })
  } catch (error) {
    console.error("Update application status error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
