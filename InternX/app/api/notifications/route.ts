import { type NextRequest, NextResponse } from "next/server"
import { getUserNotifications, executeQuery } from "@/lib/db"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const notifications = await getUserNotifications(user.userId, 20)
    return NextResponse.json(notifications)
  } catch (error) {
    console.error("Get notifications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { notificationId } = await request.json()

    // Mark notification as read
    await executeQuery("UPDATE notifications SET is_read = 1 WHERE notif_id = ? AND user_id = ?", [
      notificationId,
      user.userId,
    ])

    return NextResponse.json({ message: "Notification marked as read" })
  } catch (error) {
    console.error("Mark notification read error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
