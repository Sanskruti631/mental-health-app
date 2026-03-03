export interface User {
  id: string
  name: string
  email: string
  role: "student" | "admin" | "therapist"
  // Student specific fields
  adminId?: string
  studentId?: string
  // Admin specific fields
  collegeName?: string
  collegeId?: string
  // Therapist specific fields
  licenseNumber?: string
  specialties?: string[]
  yearsExperience?: string
  bio?: string
  photo?: string
  rating?: number
  isVerified?: boolean
  createdAt: Date
  lastLogin?: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  userType: "student" | "admin" | "therapist"
  // Additional fields based on user type
  adminId?: string
  collegeId?: string
}

export interface RegisterData extends LoginCredentials {
  name: string
  confirmPassword: string
  // Student fields
  studentId?: string
  // Admin fields
  collegeName?: string
  // Therapist fields
  licenseNumber?: string
  specialties?: string
  yearsExperience?: string
  bio?: string
  photo?: File
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: credentials.email }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.message || "Login failed")
    }
    const data = await res.json()
    const user = data.user as User
    if (!user) {
      throw new Error("Invalid login response")
    }
    return user
  },

  async register(data: RegisterData): Promise<User> {
    const payload = {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.userType,
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.message || "Registration failed")
    }
    const json = await res.json()
    const user = json.user as User | undefined
    if (user) return user
    return {
      id: "",
      name: data.name,
      email: data.email,
      role: data.userType,
      createdAt: new Date(),
    }
  },

  async logout(): Promise<void> {
    const res = await fetch("/api/auth/session", { method: "DELETE" })
    if (!res.ok) {
      throw new Error("Logout failed")
    }
  },

  async getCurrentUser(): Promise<User | null> {
    const res = await fetch("/api/auth/session", { method: "GET" })
    if (!res.ok) {
      return null
    }
    const json = await res.json()
    return (json.user as User) || null
  },

  async resetPassword(email: string): Promise<void> {
    return
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    return
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    const currentUser = await this.getCurrentUser()
    if (!currentUser || currentUser.id !== userId) {
      throw new Error("Unauthorized")
    }
    return { ...currentUser, ...updates }
  },
}

// Route protection utilities
export const getRequiredRole = (pathname: string): string[] => {
  const roleMap: Record<string, string[]> = {
    "/dashboard": ["admin"],
    "/admin": ["admin"],

    "/therapist-dashboard": ["therapist"],
    "/therapist": ["therapist"],

    "/chat": ["student", "therapist"],
    "/appointments": ["student", "therapist"],
    "/resources": ["student"],
    "/community": ["student"],
  }

  for (const [route, roles] of Object.entries(roleMap)) {
    if (pathname.startsWith(route)) {
      return roles
    }
  }

  return [] // means: NOT role-restricted
}


export const canAccessRoute = (user: User | null, pathname: string): boolean => {
  const requiredRoles = getRequiredRole(pathname)

  // Public routes
  if (requiredRoles.length === 0) return true

  // Protected routes require authentication
  if (!user) return false

    // Check if user has required role
    return requiredRoles.includes(user.role)
  }
