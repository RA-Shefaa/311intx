import { type NextRequest, NextResponse } from "next/server"
import { executeQuery, createNotification } from "@/lib/db"
import { getUserFromRequest, requireCompany } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    requireCompany(user)

    const { title, description, requirements, type, deadline, salary } = await request.json()

    if (!title || !description || !requirements || !type || !deadline) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Insert internship
    await executeQuery(
      `INSERT INTO internships (company_id, title, description, requirements, type, deadline, salary, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [user.userId, title, description, requirements, type, deadline, salary || null],
    )

    // Get company name
    const companies = await executeQuery("SELECT company_name FROM companies WHERE user_id = ?", [user.userId])
    const companyName = companies[0]?.company_name || "Unknown Company"

    // Notify admin
    await createNotification(1, `New internship posted by ${companyName} awaiting approval: ${title}.`)

    // Notify company
    await createNotification(user.userId, `Your internship "${title}" is currently pending admin review.`)

    return NextResponse.json({ message: "Internship posted successfully! Awaiting admin approval." })
  } catch (error) {
    console.error("Post internship error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
