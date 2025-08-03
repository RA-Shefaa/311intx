import { type NextRequest, NextResponse } from "next/server"
import { executeQuery, createNotification, logAdminAction } from "@/lib/db"
import { getUserFromRequest, requireAdmin } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    requireAdmin(user)

    // Get pending students
    const pendingStudents = await executeQuery(`
      SELECT s.*, u.username, u.email 
      FROM students s 
      JOIN users u ON s.user_id = u.user_id 
      WHERE s.status = 'pending'
      ORDER BY s.user_id DESC
    `)

    // Get pending companies
    const pendingCompanies = await executeQuery(`
      SELECT c.*, u.username, u.email 
      FROM companies c 
      JOIN users u ON c.user_id = u.user_id 
      WHERE c.status = 'pending'
      ORDER BY c.user_id DESC
    `)

    // Get pending internships
    const pendingInternships = await executeQuery(`
      SELECT i.*, c.company_name 
      FROM internships i 
      JOIN companies c ON i.company_id = c.user_id 
      WHERE i.status = 'pending'
      ORDER BY i.internship_id DESC
    `)

    // Get pending applications
    const pendingApplications = await executeQuery(`
      SELECT a.*, s.student_name, i.title as internship_title, c.company_name
      FROM applications a
      JOIN students s ON a.student_id = s.student_id
      JOIN internships i ON a.internship_id = i.internship_id
      JOIN companies c ON i.company_id = c.user_id
      WHERE a.status = 'pending'
      ORDER BY a.app_id DESC
    `)

    // Get all students
    const allStudents = await executeQuery(`
      SELECT s.*, u.username, u.email, sp.*, se.*
      FROM students s 
      JOIN users u ON s.user_id = u.user_id 
      LEFT JOIN student_personal sp ON s.student_id = sp.student_id
      LEFT JOIN student_education se ON s.student_id = se.student_id
      WHERE s.status = 'approved'
      ORDER BY s.student_name ASC
    `)

    // Get all companies
    const allCompanies = await executeQuery(`
      SELECT c.*, u.username, u.email,
             COUNT(i.internship_id) as total_internships,
             COALESCE(AVG(i.rating), 0) as avg_rating
      FROM companies c 
      JOIN users u ON c.user_id = u.user_id 
      LEFT JOIN internships i ON c.user_id = i.company_id AND i.status = 'approved'
      WHERE c.status = 'approved'
      GROUP BY c.user_id
      ORDER BY c.company_name ASC
    `)

    // Get all internships
    const allInternships = await executeQuery(`
      SELECT i.*, c.company_name,
             COUNT(a.app_id) as total_applications,
             COUNT(CASE WHEN a.status = 'accepted' THEN 1 END) as accepted_applications
      FROM internships i 
      JOIN companies c ON i.company_id = c.user_id 
      LEFT JOIN applications a ON i.internship_id = a.internship_id
      WHERE i.status = 'approved'
      GROUP BY i.internship_id
      ORDER BY i.internship_id DESC
    `)

    return NextResponse.json({
      pendingStudents,
      pendingCompanies,
      pendingInternships,
      pendingApplications,
      allStudents,
      allCompanies,
      allInternships,
    })
  } catch (error) {
    console.error("Admin dashboard error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    requireAdmin(user)

    const { action, type, id, status } = await request.json()
    const clientIP = request.headers.get("x-forwarded-for") || "unknown"

    if (type === "student") {
      await executeQuery("UPDATE students SET status = ? WHERE user_id = ?", [status, id])

      const student = await executeQuery("SELECT student_name FROM students WHERE user_id = ?", [id])

      if (student.length > 0) {
        await createNotification(id, `Your student account has been ${status} by admin.`)
        await logAdminAction(user.userId, `${status} student registration`, clientIP, "students", id.toString())
      }
    } else if (type === "company") {
      await executeQuery("UPDATE companies SET status = ? WHERE user_id = ?", [status, id])

      const company = await executeQuery("SELECT company_name FROM companies WHERE user_id = ?", [id])

      if (company.length > 0) {
        await createNotification(id, `Your company account has been ${status} by admin.`)
        await logAdminAction(user.userId, `${status} company registration`, clientIP, "companies", id.toString())
      }
    } else if (type === "internship") {
      await executeQuery("UPDATE internships SET status = ? WHERE internship_id = ?", [status, id])

      const internship = await executeQuery(
        `
        SELECT i.title, i.company_id, c.company_name
        FROM internships i
        JOIN companies c ON i.company_id = c.user_id
        WHERE i.internship_id = ?
      `,
        [id],
      )

      if (internship.length > 0) {
        await createNotification(
          internship[0].company_id,
          `Your internship "${internship[0].title}" has been ${status} by admin.`,
        )
        await logAdminAction(user.userId, `${status} internship`, clientIP, "internships", id.toString())
      }
    } else if (type === "application") {
      await executeQuery("UPDATE applications SET status = ? WHERE app_id = ?", [status, id])

      const application = await executeQuery(
        `
        SELECT a.student_id, s.user_id, i.title, c.company_name
        FROM applications a
        JOIN students s ON a.student_id = s.student_id
        JOIN internships i ON a.internship_id = i.internship_id
        JOIN companies c ON i.company_id = c.user_id
        WHERE a.app_id = ?
      `,
        [id],
      )

      if (application.length > 0) {
        await createNotification(
          application[0].user_id,
          `Your application for "${application[0].title}" at ${application[0].company_name} has been ${status}.`,
        )
        await logAdminAction(user.userId, `${status} application`, clientIP, "applications", id.toString())
      }
    }

    return NextResponse.json({ message: `${type} ${status} successfully` })
  } catch (error) {
    console.error("Admin action error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
