// app/company/dashboard/route.ts
import { NextResponse } from 'next/server'
import { getUserFromRequest, requireCompany } from '@/lib/auth'
import { executeQuery } from '@/lib/db'

export async function GET(request: Request) {
  try {
    // Get authenticated company user from request
    const user = await getUserFromRequest(request)
    requireCompany(user)

    // Fetch additional dashboard data for the company (e.g., internships, applications)
    const internships = await executeQuery(
      'SELECT * FROM internships WHERE company_id = ?',
      [user.userId]
    )

    // You can extend this to fetch other data like company profile, stats, etc.

    return NextResponse.json({ internships })
  } catch (error) {
    console.error('Error fetching company dashboard data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
