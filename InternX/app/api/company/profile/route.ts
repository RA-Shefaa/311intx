import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { getUserFromRequest, requireCompany } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    requireCompany(user)

    // Get company profile with company data (name, website, logo, etc.)
    const profile = await executeQuery(
      `
      SELECT c.*, cp.*
      FROM companies c
      LEFT JOIN company_profile cp ON c.company_id = cp.company_id
      WHERE c.user_id = ?
    `,
      [user.userId],
    )

    if (profile.length === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json(profile[0])
  } catch (error) {
    console.error("Get company profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    requireCompany(user)

    const { company_name, website, logo_url } = await request.json()

    // Update company profile data in the database
    await executeQuery(
      `
      UPDATE companies 
      SET company_name = ?, website = ?, logo_url = ? 
      WHERE user_id = ?
    `,
      [company_name, website, logo_url, user.userId],
    )

    return NextResponse.json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("Update company profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
