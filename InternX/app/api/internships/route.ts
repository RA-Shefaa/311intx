import { type NextRequest, NextResponse } from "next/server"
import { getInternshipsWithCompany } from "@/lib/db"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    // Public users and students only see approved internships
    if (!user || user.role === "student") {
      const internships = await getInternshipsWithCompany("approved")

      // If user is not logged in, hide sensitive information
      if (!user) {
        return NextResponse.json(
          internships.map((internship) => ({
            internship_id: internship.internship_id,
            title: internship.title,
            description: internship.description,
            company_name: internship.company_name,
            industry: internship.industry,
            type: internship.type,
            logo_url: internship.logo_url,
            requirements: internship.requirements,
            // Hide salary, rating, deadline for non-logged users
          })),
        )
      }

      return NextResponse.json(internships)
    }

    // Admin sees all internships
    if (user.role === "admin") {
      const internships = await getInternshipsWithCompany(status || undefined)
      return NextResponse.json(internships)
    }

    // Companies see their own internships
    if (user.role === "company") {
      const internships = await getInternshipsWithCompany(status || undefined, user.userId)
      return NextResponse.json(internships)
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  } catch (error) {
    console.error("Fetch internships error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
