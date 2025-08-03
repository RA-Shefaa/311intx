import { NextResponse } from 'next/server'
import { executeQuery, createNotification } from '@/lib/db'

export async function POST({ params }: { params: { applicationId: string } }) {
  try {
    const { applicationId } = params

    // Update application status to 'accepted'
    await executeQuery(
      'UPDATE applications SET status = "accepted" WHERE app_id = ?',
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

      // Notify the student about the acceptance
      await createNotification(
        app.user_id,
        `Your application for "${app.title}" at ${app.company_name} has been accepted.`
      )
    }

    return NextResponse.json({ message: 'Application accepted successfully' })
  } catch (error) {
    console.error('Error accepting application:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
