// Database connection and query utilities
// This provides a clean interface for database operations

export interface DatabaseConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
}

// Mock database operations for development
// In production, replace with actual database client (e.g., pg, prisma, etc.)
export class Database {
  private config: DatabaseConfig

  constructor(config: DatabaseConfig) {
    this.config = config
  }

  async connect(): Promise<void> {
    // In a real app, establish database connection
    console.log("Database connected")
  }

  async disconnect(): Promise<void> {
    // In a real app, close database connection
    console.log("Database disconnected")
  }

  async query(sql: string, params: any[] = []): Promise<any[]> {
    // Mock query execution
    console.log("Executing query:", sql, params)
    return []
  }

  async transaction<T>(callback: (db: Database) => Promise<T>): Promise<T> {
    // Mock transaction
    console.log("Starting transaction")
    try {
      const result = await callback(this)
      console.log("Transaction committed")
      return result
    } catch (error) {
      console.log("Transaction rolled back")
      throw error
    }
  }
}

// Database queries for user management
export const userQueries = {
  // Create a new user
  createUser: `
    INSERT INTO users (email, password_hash, name, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email, name, role, created_at
  `,

  // Find user by email
  findUserByEmail: `
    SELECT u.*, 
           sp.student_id, sp.admin_id,
           ap.college_name, ap.college_id,
           tp.license_number, tp.specialties, tp.years_experience, tp.bio, tp.photo_url, tp.rating
    FROM users u
    LEFT JOIN student_profiles sp ON u.id = sp.user_id
    LEFT JOIN admin_profiles ap ON u.id = ap.user_id  
    LEFT JOIN therapist_profiles tp ON u.id = tp.user_id
    WHERE u.email = $1 AND u.is_active = true
  `,

  // Find user by ID
  findUserById: `
    SELECT u.*, 
           sp.student_id, sp.admin_id,
           ap.college_name, ap.college_id,
           tp.license_number, tp.specialties, tp.years_experience, tp.bio, tp.photo_url, tp.rating
    FROM users u
    LEFT JOIN student_profiles sp ON u.id = sp.user_id
    LEFT JOIN admin_profiles ap ON u.id = ap.user_id
    LEFT JOIN therapist_profiles tp ON u.id = tp.user_id
    WHERE u.id = $1 AND u.is_active = true
  `,

  // Update user profile
  updateUser: `
    UPDATE users 
    SET name = $2, email = $3, updated_at = NOW()
    WHERE id = $1
    RETURNING id, email, name, role, updated_at
  `,

  // Update last login
  updateLastLogin: `
    UPDATE users 
    SET last_login = NOW()
    WHERE id = $1
  `,

  // Create student profile
  createStudentProfile: `
    INSERT INTO student_profiles (user_id, student_id, admin_id, enrollment_date, major)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,

  // Create admin profile
  createAdminProfile: `
    INSERT INTO admin_profiles (user_id, college_name, college_id, position, department)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,

  // Create therapist profile
  createTherapistProfile: `
    INSERT INTO therapist_profiles (user_id, license_number, specialties, years_experience, bio, photo_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,
}

// Database queries for sessions
export const sessionQueries = {
  // Create session
  createSession: `
    INSERT INTO user_sessions (user_id, session_token, refresh_token, expires_at, ip_address, user_agent)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,

  // Find session by token
  findSessionByToken: `
    SELECT s.*, u.id as user_id, u.email, u.name, u.role
    FROM user_sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.session_token = $1 AND s.is_active = true AND s.expires_at > NOW()
  `,

  // Update session last accessed
  updateSessionAccess: `
    UPDATE user_sessions 
    SET last_accessed = NOW()
    WHERE session_token = $1
  `,

  // Deactivate session
  deactivateSession: `
    UPDATE user_sessions 
    SET is_active = false
    WHERE session_token = $1
  `,

  // Clean expired sessions
  cleanExpiredSessions: `
    DELETE FROM user_sessions 
    WHERE expires_at < NOW()
  `,
}

// Database queries for appointments
export const appointmentQueries = {
  // Create appointment
  createAppointment: `
    INSERT INTO appointments (student_id, therapist_id, appointment_date, appointment_time, session_type, urgency_level, is_first_session, notes)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `,

  // Get user appointments
  getUserAppointments: `
    SELECT a.*, 
           s.name as student_name, s.email as student_email,
           t.name as therapist_name, t.email as therapist_email,
           tp.specialties, tp.rating
    FROM appointments a
    JOIN users s ON a.student_id = s.id
    JOIN users t ON a.therapist_id = t.id
    LEFT JOIN therapist_profiles tp ON t.id = tp.user_id
    WHERE (a.student_id = $1 OR a.therapist_id = $1)
    ORDER BY a.appointment_date DESC, a.appointment_time DESC
  `,

  // Get available therapists
  getAvailableTherapists: `
    SELECT u.id, u.name, u.email,
           tp.specialties, tp.years_experience, tp.bio, tp.photo_url, tp.rating, tp.total_reviews
    FROM users u
    JOIN therapist_profiles tp ON u.id = tp.user_id
    WHERE u.role = 'therapist' AND u.is_verified = true AND tp.is_accepting_patients = true
    ORDER BY tp.rating DESC, tp.total_reviews DESC
  `,

  // Update appointment status
  updateAppointmentStatus: `
    UPDATE appointments 
    SET status = $2, updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `,
}

// Initialize database connection
export const initializeDatabase = async (): Promise<Database> => {
  const config: DatabaseConfig = {
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "soul_support_db",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
  }

  const db = new Database(config)
  await db.connect()
  return db
}
