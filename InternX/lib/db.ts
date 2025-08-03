import mysql from "mysql2/promise"

export interface DatabaseConfig {
  host: string
  user: string
  password: string
  database: string
  port?: number
}

// Database configuration
const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "internx",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
}

// Create connection pool
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
})

// Execute query function
export async function executeQuery(query: string, params: any[] = []): Promise<any[]> {
  try {
    const [rows] = await pool.execute(query, params)
    return rows as any[]
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Get user with role-specific data
export async function getUserWithDetails(userId: number) {
  const userQuery = "SELECT * FROM users WHERE user_id = ?"
  const users = await executeQuery(userQuery, [userId])

  if (users.length === 0) return null

  const user = users[0]
  let userData = { ...user }

  if (user.role === "student") {
    const studentQuery = `
      SELECT s.*, sp.*, se.*
      FROM students s
      LEFT JOIN student_personal sp ON s.student_id = sp.student_id
      LEFT JOIN student_education se ON s.student_id = se.student_id
      WHERE s.user_id = ?
    `
    const students = await executeQuery(studentQuery, [userId])
    if (students.length > 0) {
      userData = { ...userData, ...students[0] }
    }
  } else if (user.role === "company") {
    const companyQuery = "SELECT * FROM companies WHERE user_id = ?"
    const companies = await executeQuery(companyQuery, [userId])
    if (companies.length > 0) {
      userData = { ...userData, ...companies[0] }
    }
  }

  return userData
}

// Get internships with company details
export async function getInternshipsWithCompany(status?: string, companyId?: number) {
  let query = `
    SELECT i.*, c.company_name, c.industry, c.logo_url
    FROM internships i
    JOIN companies c ON i.company_id = c.user_id
  `

  const params: any[] = []
  const conditions: string[] = []

  if (status) {
    conditions.push("i.status = ?")
    params.push(status)
  }

  if (companyId) {
    conditions.push("i.company_id = ?")
    params.push(companyId)
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ")
  }

  query += " ORDER BY i.rating DESC, i.internship_id DESC"

  return await executeQuery(query, params)
}

// Get companies with ratings
export async function getCompaniesWithRatings() {
  const query = `
    SELECT c.*, 
           COUNT(i.internship_id) as total_internships,
           COALESCE(AVG(i.rating), 0) as avg_rating
    FROM companies c
    LEFT JOIN internships i ON c.user_id = i.company_id AND i.status = 'approved'
    WHERE c.status = 'approved'
    GROUP BY c.user_id
    ORDER BY avg_rating DESC, c.company_name ASC
  `

  return await executeQuery(query)
}

// Create notification
export async function createNotification(userId: number, message: string) {
  const query = "INSERT INTO notifications (user_id, message) VALUES (?, ?)"
  return await executeQuery(query, [userId, message])
}

// Log admin action
export async function logAdminAction(
  userId: number,
  action: string,
  ipAddress?: string,
  targetEntity?: string,
  targetId?: string,
) {
  const query = `
    INSERT INTO admin_logs (user_id, action, ip_address, target_entity, target_id) 
    VALUES (?, ?, ?, ?, ?)
  `
  return await executeQuery(query, [userId, action, ipAddress, targetEntity, targetId])
}

// Get student applications
export async function getStudentApplications(studentId: string) {
  const query = `
    SELECT a.*, i.title, i.description, i.salary, i.type, i.deadline,
           c.company_name, c.logo_url
    FROM applications a
    JOIN internships i ON a.internship_id = i.internship_id
    JOIN companies c ON i.company_id = c.user_id
    WHERE a.student_id = ?
    ORDER BY a.apply_date DESC
  `
  return await executeQuery(query, [studentId])
}

// Get notifications for user
export async function getUserNotifications(userId: number, limit = 10) {
  const query = `
    SELECT * FROM notifications 
    WHERE user_id = ? 
    ORDER BY sent_date DESC 
    LIMIT ?
  `
  return await executeQuery(query, [userId, limit])
}

export default pool
