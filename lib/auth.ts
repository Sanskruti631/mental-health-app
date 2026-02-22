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

// Mock authentication functions - in a real app, these would call your backend API
export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data based on role
    const mockUsers: Record<string, User> = {
      "student@university.edu": {
        id: "1",
        name: "John Student",
        email: "student@university.edu",
        role: "student",
        adminId: "ADM001",
        studentId: "STU12345",
        createdAt: new Date(),
        lastLogin: new Date(),
      },
      "admin@university.edu": {
        id: "2",
        name: "Jane Admin",
        email: "admin@university.edu",
        role: "admin",
        collegeName: "University of Excellence",
        collegeId: "UOE001",
        createdAt: new Date(),
        lastLogin: new Date(),
      },
      "therapistsoulsup2025@gmail.com": {
        id: "3",
        name: "Dr. Sarah Johnson",
        email: "therapistsoulsup2025@gmail.com",
        role: "therapist",
        licenseNumber: "LIC123456",
        specialties: ["Anxiety", "Depression", "Academic Stress"],
        yearsExperience: "12 years",
        bio: "Experienced clinical psychologist specializing in student mental health.",
        rating: 4.9,
        isVerified: true,
        createdAt: new Date(),
        lastLogin: new Date(),
      },
    }

    const user = mockUsers[credentials.email]
    if (!user || user.role !== credentials.userType) {
      throw new Error("Invalid credentials")
    }

    // Store password so it can be verified during change-password flow
    if (!localStorage.getItem(`password_${user.id}`)) {
      localStorage.setItem(`password_${user.id}`, credentials.password)
    }

    // Store in localStorage (in a real app, you'd use secure tokens)
    localStorage.setItem("auth_token", JSON.stringify(user))
    console.log("Saved user:", user)
    return user
  },

  async register(data: RegisterData): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      role: data.userType,
      createdAt: new Date(),
    }

    // Add role-specific fields
    if (data.userType === "student") {
      newUser.adminId = data.adminId
      newUser.studentId = `STU${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    } else if (data.userType === "admin") {
      newUser.collegeName = data.collegeName
      newUser.collegeId = data.collegeId
    } else if (data.userType === "therapist") {
      newUser.licenseNumber = data.licenseNumber
      newUser.specialties = data.specialties?.split(",").map((s) => s.trim()) || []
      newUser.yearsExperience = data.yearsExperience
      newUser.bio = data.bio
      newUser.isVerified = false // Therapists need verification
    }

    // Store password so it can be verified during change-password flow
    localStorage.setItem(`password_${newUser.id}`, data.password)

    // Store in localStorage
    localStorage.setItem("auth_token", JSON.stringify(newUser))
    return newUser
  },

  async logout(): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    localStorage.removeItem("auth_token")
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem("auth_token")
      if (!token) return null

      const user = JSON.parse(token)
      // In a real app, you'd validate the token with your backend
      return user
    } catch {
      return null
    }
  },

  async resetPassword(email: string): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Password reset email sent to:", email)
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const storedPassword = localStorage.getItem(`password_${userId}`)
    // If no stored password, use a default mock password for demo purposes
    const actualPassword = storedPassword || "password123"

    if (currentPassword !== actualPassword) {
      throw new Error("Current password is incorrect")
    }

    // In a real app, you'd hash and store the new password on the server
    localStorage.setItem(`password_${userId}`, newPassword)
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const currentUser = await this.getCurrentUser()
    if (!currentUser || currentUser.id !== userId) {
      throw new Error("Unauthorized")
    }

    const updatedUser = { ...currentUser, ...updates }
    localStorage.setItem("auth_token", JSON.stringify(updatedUser))
    return updatedUser
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

