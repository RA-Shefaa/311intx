import { NextResponse } from "next/server"
import { getCompaniesWithRatings } from "@/lib/db"

export async function GET() {
  try {
    const companies = await getCompaniesWithRatings()
    return NextResponse.json(companies)
  } catch (error) {
    console.error("Fetch companies error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
