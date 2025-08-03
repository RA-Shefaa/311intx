import { NextResponse } from 'next/server'
import { executeQuery, createNotification } from '@/lib/db'

export async function POST({ params }: { params: { applicationId: string } }) {
  try {
    const { applicationId } = params

    // Update application status to 'rejected'
    await executeQuery(
      'UPDATE applications SET status = "rejected" WHERE app_id = ?',
      [applicationId]
    )

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
      [applicationId]
    )

    if (application.length > 0) {
      const app = application[0]

      // Notify the student about the rejection
      await createNotification(
        app.user_id,
        `Your application for "${app.title}" at ${app.company_name} has been rejected.`
      )
    }

    return NextResponse.json({ message: 'Application rejected successfully' })
  } catch (error) {
    console.error('Error rejecting application:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
